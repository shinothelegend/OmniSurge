// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./abstract-base/AbstractReactive.sol";
import "./interfaces/ISystemContract.sol";

/**
 * @title OmniSurgeReactive
 * @notice Reactive Smart Contract (RSC) running on the Reactive Network.
 * Subscribes to Swap/Imbalance events on high-speed L2s (Base Sepolia 200ms blocks, Unichain Sepolia 1s blocks)
 * and dispatches low-latency JIT Concentrated Liquidity callbacks back to the destination chain.
 */
contract OmniSurgeReactive is AbstractReactive {
    uint64 public constant CALLBACK_GAS_LIMIT = 850_000;
    
    // Uniswap V2 standard Swap topic: Swap(address,uint256,uint256,uint256,uint256,address)
    uint256 public constant UNISWAP_V2_SWAP_TOPIC = 0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822;

    struct OriginPoolConfig {
        uint256 chainId;
        address poolAddress;
        bool isActive;
        uint8 token0Decimals; // e.g. 6 for USDC, 18 for WETH
        uint8 token1Decimals; // e.g. 18 for WETH
        string networkLabel;  // "Base Sepolia" or "Unichain Sepolia"
    }

    // Mapping chainId => pool => config
    mapping(uint256 => mapping(address => OriginPoolConfig)) public originPools;

    // [FIX 1] Origin event deduplication tracking to eliminate duplicate callback dispatch on re-delivery
    mapping(bytes32 => bool) public processedOriginEvents;
    
    // Destination configuration
    uint256 public destinationChainId;
    address public destinationCallback;

    // JIT Configuration
    uint256 public minImbalanceThreshold; // Minimum volume normalized to 18 decimals to trigger JIT surge (e.g. 0.1 ETH)
    uint256 public surgeMultiplierBps;    // Multiplier for JIT liquidity deployment in basis points (e.g., 15000 = 150%)

    // Telemetry & Latency Tracking
    uint256 public totalEventsDetected;
    uint256 public totalSurgesDispatched;
    uint256 public surgeCounter;
    uint256 public lastOriginTimestamp;
    uint256 public lastOriginBlock;
    uint256 public lastReactTimestamp;

    event PoolSubscribed(uint256 indexed chainId, address indexed poolAddress, string networkLabel);
    event PoolUnsubscribed(uint256 indexed chainId, address indexed poolAddress);
    event SurgeDispatched(
        uint256 indexed surgeId,
        uint256 indexed originChainId,
        address indexed originPool,
        uint256 volumeIn,
        uint256 targetLiquidity,
        uint256 originTimestamp,
        uint256 originBlock
    );
    event ConfigUpdated(address destinationCallback, uint256 destinationChainId, uint256 minImbalanceThreshold);

    constructor(
        address _serviceAddress,
        uint256 _destinationChainId,
        address _destinationCallback,
        uint256 _minImbalanceThreshold
    ) AbstractReactive(_serviceAddress) {
        destinationChainId = _destinationChainId;
        destinationCallback = _destinationCallback;
        minImbalanceThreshold = _minImbalanceThreshold > 0 ? _minImbalanceThreshold : 0.1 ether;
        surgeMultiplierBps = 15000; // 150% volume coverage
    }

    /**
     * @notice Register and subscribe to a DEX pool with explicit token decimals for volume normalization
     */
    function subscribePool(
        uint256 chainId,
        address poolAddress,
        uint8 token0Decimals,
        uint8 token1Decimals,
        string calldata networkLabel
    ) public onlyOwner {
        require(poolAddress != address(0), "OmniSurge: zero pool address");
        
        originPools[chainId][poolAddress] = OriginPoolConfig({
            chainId: chainId,
            poolAddress: poolAddress,
            isActive: true,
            token0Decimals: token0Decimals > 0 ? token0Decimals : 18,
            token1Decimals: token1Decimals > 0 ? token1Decimals : 18,
            networkLabel: networkLabel
        });

        if (!vm && address(service) != address(0)) {
            service.subscribe(
                chainId,
                poolAddress,
                UNISWAP_V2_SWAP_TOPIC,
                REACTIVE_IGNORE,
                REACTIVE_IGNORE,
                REACTIVE_IGNORE
            );
        }

        emit PoolSubscribed(chainId, poolAddress, networkLabel);
    }

    /**
     * @notice Backward-compatible 3-argument subscribePool (defaults to 18 decimals)
     */
    function subscribePool(
        uint256 chainId,
        address poolAddress,
        string calldata networkLabel
    ) external onlyOwner {
        subscribePool(chainId, poolAddress, 18, 18, networkLabel);
    }

    /**
     * @notice Unsubscribe from a DEX pool
     */
    function unsubscribePool(uint256 chainId, address poolAddress) external onlyOwner {
        originPools[chainId][poolAddress].isActive = false;

        if (!vm && address(service) != address(0)) {
            service.unsubscribe(
                chainId,
                poolAddress,
                UNISWAP_V2_SWAP_TOPIC,
                REACTIVE_IGNORE,
                REACTIVE_IGNORE,
                REACTIVE_IGNORE
            );
        }

        emit PoolUnsubscribed(chainId, poolAddress);
    }

    /**
     * @notice Core Reactive entry point invoked by the Omni system contract upon origin chain log detection
     */
    function react(LogRecord memory log_) external override vmOnly whenNotPaused {
        totalEventsDetected++;

        // Verify if the event is a Swap topic
        if (log_.topic0 != UNISWAP_V2_SWAP_TOPIC) {
            return;
        }

        // [FIX 1] Origin event deduplication: reject re-delivered identical LogRecords
        bytes32 originEventKey = (log_.txHash != 0 || log_.logIndex != 0)
            ? keccak256(abi.encodePacked(log_.chainId, log_.contractAddress, log_.txHash, log_.logIndex))
            : keccak256(abi.encodePacked(log_.chainId, log_.contractAddress, log_.blockNumber, log_.data));

        if (processedOriginEvents[originEventKey]) {
            return; // Already processed this origin event — drop duplicate delivery
        }
        processedOriginEvents[originEventKey] = true;

        // Decode swap event data: (amount0In, amount1In, amount0Out, amount1Out)
        (uint256 amount0In, uint256 amount1In, , ) = abi.decode(
            log_.data,
            (uint256, uint256, uint256, uint256)
        );

        // [FIX 4] Decimal normalization: normalize token volumes to 18-decimal scale for threshold comparison
        OriginPoolConfig memory poolCfg = originPools[log_.chainId][log_.contractAddress];
        uint8 dec0 = poolCfg.token0Decimals > 0 ? poolCfg.token0Decimals : 18;
        uint8 dec1 = poolCfg.token1Decimals > 0 ? poolCfg.token1Decimals : 18;

        uint256 norm0 = dec0 < 18 ? amount0In * (10 ** (18 - dec0)) : (dec0 > 18 ? amount0In / (10 ** (dec0 - 18)) : amount0In);
        uint256 norm1 = dec1 < 18 ? amount1In * (10 ** (18 - dec1)) : (dec1 > 18 ? amount1In / (10 ** (dec1 - 18)) : amount1In);

        uint256 normalizedVolume = norm0 > norm1 ? norm0 : norm1;

        // Verify that normalized volume exceeds minimum imbalance threshold
        if (normalizedVolume < minImbalanceThreshold) {
            return;
        }

        // Raw token volume for deployment sizing
        uint256 rawVolumeIn = amount0In > amount1In ? amount0In : amount1In;

        // Calculate concentrated liquidity size needed for optimal fee capture
        uint256 targetLiquidity = (rawVolumeIn * surgeMultiplierBps) / 10000;
        surgeCounter++;
        uint256 currentSurgeId = surgeCounter;

        lastOriginBlock = log_.blockNumber;
        lastOriginTimestamp = block.timestamp;
        lastReactTimestamp = block.timestamp;
        totalSurgesDispatched++;

        // Formulate callback payload for DestinationCallback.sol.
        // The first argument is reserved for the reactive contract address injected by the network.
        // Passes immutable origin tx identity (log_.txHash and log_.logIndex).
        bytes memory payload = abi.encodeWithSignature(
            "triggerJITLiquidity(address,uint256,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)",
            address(0),
            log_.chainId,
            log_.contractAddress,
            amount0In,
            amount1In,
            targetLiquidity,
            block.timestamp,
            log_.blockNumber,
            log_.txHash,
            log_.logIndex
        );

        service.requestCallbackV_1_0(
            ISystemContract.CallbackConfiguration_V_1_0({
                chainId: destinationChainId,
                recipient: destinationCallback,
                gasLimit: CALLBACK_GAS_LIMIT,
                payload: payload
            })
        );

        emit SurgeDispatched(
            currentSurgeId,
            log_.chainId,
            log_.contractAddress,
            rawVolumeIn,
            targetLiquidity,
            block.timestamp,
            log_.blockNumber
        );
    }

    // Governance & Parameter setters
    function setDestinationConfig(uint256 _destChainId, address _destCallback) external onlyOwner {
        require(_destCallback != address(0), "OmniSurge: zero address");
        destinationChainId = _destChainId;
        destinationCallback = _destCallback;
        emit ConfigUpdated(destinationCallback, destinationChainId, minImbalanceThreshold);
    }

    function setMinImbalanceThreshold(uint256 _threshold) external onlyOwner {
        minImbalanceThreshold = _threshold;
        emit ConfigUpdated(destinationCallback, destinationChainId, minImbalanceThreshold);
    }

    function setSurgeMultiplierBps(uint256 _multiplierBps) external onlyOwner {
        require(_multiplierBps >= 10000, "OmniSurge: multiplier must be >= 100%");
        surgeMultiplierBps = _multiplierBps;
    }

    function getTelemetry() external view returns (
        uint256 _detected,
        uint256 _dispatched,
        uint256 _lastOriginTs,
        uint256 _lastOriginBlk,
        uint256 _lastReactTs
    ) {
        return (
            totalEventsDetected,
            totalSurgesDispatched,
            lastOriginTimestamp,
            lastOriginBlock,
            lastReactTimestamp
        );
    }
}
