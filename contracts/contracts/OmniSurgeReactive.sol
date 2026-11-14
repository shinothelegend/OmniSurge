// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./abstract-base/AbstractReactive.sol";

/**
 * @title OmniSurgeReactive
 * @notice Reactive Smart Contract (RSC) running on the Reactive Network.
 * Subscribes to Swap/Imbalance events on high-speed L2s (Base Sepolia 200ms blocks, Unichain Sepolia 1s blocks)
 * and dispatches low-latency JIT Concentrated Liquidity callbacks back to the destination chain.
 */
contract OmniSurgeReactive is AbstractReactive {
    uint64 public constant CALLBACK_GAS_LIMIT = 850_000;
    
    // Uniswap V2 / standard Swap topic: Swap(address,uint256,uint256,uint256,uint256,address)
    uint256 public constant UNISWAP_V2_SWAP_TOPIC = 0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67;

    struct OriginPoolConfig {
        uint256 chainId;
        address poolAddress;
        bool isActive;
        string networkLabel; // "Base Sepolia" or "Unichain Sepolia"
    }

    // Mapping chainId => pool => config
    mapping(uint256 => mapping(address => OriginPoolConfig)) public originPools;
    
    // Destination configuration
    uint256 public destinationChainId;
    address public destinationCallback;

    // JIT Configuration
    uint256 public minImbalanceThreshold; // Minimum volume in wei to trigger JIT surge (e.g. 0.5 ETH)
    uint256 public surgeMultiplierBps;    // Multiplier for JIT liquidity deployment in basis points (e.g., 20000 = 200%)

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
     * @notice Register and subscribe to a DEX pool on an origin chain (Base Sepolia or Unichain Sepolia)
     */
    function subscribePool(
        uint256 chainId,
        address poolAddress,
        string calldata networkLabel
    ) external onlyOwner {
        require(poolAddress != address(0), "OmniSurge: zero pool address");
        
        originPools[chainId][poolAddress] = OriginPoolConfig({
            chainId: chainId,
            poolAddress: poolAddress,
            isActive: true,
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
     * @notice Core Reactive entry point invoked by ReactVM upon origin chain log detection
     */
    function react(LogRecord calldata log) external override vmOnly whenNotPaused {
        totalEventsDetected++;

        // Verify if the event is a Swap topic
        if (log.topic_0 != UNISWAP_V2_SWAP_TOPIC) {
            return;
        }

        // Decode swap event data: (amount0In, amount1In, amount0Out, amount1Out)
        (uint256 amount0In, uint256 amount1In, , ) = abi.decode(
            log.data,
            (uint256, uint256, uint256, uint256)
        );

        uint256 volumeIn = amount0In > amount1In ? amount0In : amount1In;

        // Verify that the volume exceeds minimum imbalance threshold
        if (volumeIn < minImbalanceThreshold) {
            return;
        }

        // Calculate concentrated liquidity size needed for optimal fee capture
        uint256 targetLiquidity = (volumeIn * surgeMultiplierBps) / 10000;
        surgeCounter++;
        uint256 currentSurgeId = surgeCounter;

        lastOriginBlock = log.block_number;
        lastOriginTimestamp = block.timestamp; // Origin timestamp recorded
        lastReactTimestamp = block.timestamp;
        totalSurgesDispatched++;

        // Formulate callback payload for DestinationCallback.sol
        bytes memory payload = abi.encodeWithSignature(
            "triggerJITLiquidity(uint256,address,uint256,uint256,uint256,uint256,uint256)",
            log.chain_id,
            log._contract,
            amount0In,
            amount1In,
            targetLiquidity,
            block.timestamp, // Origin emission timestamp benchmark
            log.block_number
        );

        // Emit Callback event to be picked up by Reactive Relayers
        emit Callback(
            destinationChainId,
            destinationCallback,
            CALLBACK_GAS_LIMIT,
            payload
        );

        emit SurgeDispatched(
            currentSurgeId,
            log.chain_id,
            log._contract,
            volumeIn,
            targetLiquidity,
            block.timestamp,
            log.block_number
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

