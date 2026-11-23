// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./abstract-base/AbstractCallback.sol";

interface IJITPool {
    function surgeDeposit(uint256 amount) external payable returns (bool);
    function surgeWithdraw(uint256 amount) external returns (uint256 feePaid);
    function surgeCycle(uint256 amount) external payable returns (uint256 feePaid);
    function feeRateBps() external view returns (uint256);
}

/**
 * @title DestinationCallback
 * @notice Executes JIT concentrated liquidity deployments and rebalances on the destination chain.
 * Records end-to-end latency benchmarks (Origin Event -> Reactive Network -> Destination Execution).
 */
contract DestinationCallback is AbstractCallback {
    struct JITExecution {
        uint256 executionId;
        uint256 originChainId;
        address originPool;
        uint256 volumeIn;
        uint256 liquidityDeployed;
        uint256 feeCaptured;
        uint256 originTimestamp;
        uint256 originBlock;
        uint256 destinationTimestamp;
        uint256 destinationBlock;
        uint256 latencySeconds;
        uint256 latencyMsEstimated;
        uint256 gasUsed;
        uint256 originTxHash;
        uint256 originLogIndex;
    }

    struct JITParams {
        address reactiveSender;
        uint256 originChainId;
        address originPool;
        uint256 amount0In;
        uint256 amount1In;
        uint256 targetLiquidity;
        uint256 originTimestamp;
        uint256 originBlock;
        uint256 originTxHash;
        uint256 originLogIndex;
    }

    uint256 public executionCounter;
    uint256 public totalVolumeProtected;
    uint256 public totalFeesCaptured;
    uint256 public totalLatencyMsSum;
    
    // Fee rate in basis points (e.g., 30 = 0.30%)
    uint256 public defaultFeeRateBps = 30;

    // Mapping from executionId to record
    mapping(uint256 => JITExecution) public executions;
    uint256[] public executionHistory;

    // Active liquidity pools registered for JIT surges
    mapping(address => bool) public registeredPools;

    event JITSurgeExecuted(
        uint256 indexed executionId,
        uint256 indexed originChainId,
        address indexed originPool,
        uint256 liquidityDeployed,
        uint256 feeCaptured,
        uint256 latencySeconds,
        uint256 latencyMsEstimated,
        uint256 gasUsed
    );

    event PoolRegistered(address indexed pool, bool isRegistered);
    event FeeRateUpdated(uint256 oldRate, uint256 newRate);
    event JITWithdrawFailed(uint256 indexed executionId, address indexed pool, uint256 amount);
    event JITDepositFailed(uint256 indexed executionId, address indexed pool, uint256 amount);
    event FundsRescued(address indexed token, address indexed to, uint256 amount);

    constructor(
        address _callbackRelayer,
        address _authorizedReactiveContract
    ) AbstractCallback(_callbackRelayer, _authorizedReactiveContract) {}

    /// @notice Accept native funds to cover callback gas billed by Reactive Network or pool fee payouts.
    receive() external payable {}

    /**
     * @notice Registers or unregisters a pool authorized for JIT liquidity
     */
    function setPoolRegistration(address pool, bool status) external onlyOwner {
        require(pool != address(0), "OmniSurge: zero pool");
        registeredPools[pool] = status;
        emit PoolRegistered(pool, status);
    }

    /**
     * @notice Update default fee rate
     */
    function setDefaultFeeRateBps(uint256 _rate) external onlyOwner {
        require(_rate <= 1000, "Fee too high"); // max 10%
        emit FeeRateUpdated(defaultFeeRateBps, _rate);
        defaultFeeRateBps = _rate;
    }

    /**
     * @notice Full 10-argument callback with immutable origin tx identity
     */
    function triggerJITLiquidity(
        address reactiveSender,
        uint256 originChainId,
        address originPool,
        uint256 amount0In,
        uint256 amount1In,
        uint256 targetLiquidity,
        uint256 originTimestamp,
        uint256 originBlock,
        uint256 originTxHash,
        uint256 originLogIndex
    ) external onlyAuthorized nonReentrant whenNotPaused returns (uint256 feeCaptured) {
        return _executeJIT(
            JITParams({
                reactiveSender: reactiveSender,
                originChainId: originChainId,
                originPool: originPool,
                amount0In: amount0In,
                amount1In: amount1In,
                targetLiquidity: targetLiquidity,
                originTimestamp: originTimestamp,
                originBlock: originBlock,
                originTxHash: originTxHash,
                originLogIndex: originLogIndex
            })
        );
    }

    /**
     * @notice Backward-compatible 8-argument callback
     */
    function triggerJITLiquidity(
        address reactiveSender,
        uint256 originChainId,
        address originPool,
        uint256 amount0In,
        uint256 amount1In,
        uint256 targetLiquidity,
        uint256 originTimestamp,
        uint256 originBlock
    ) external onlyAuthorized nonReentrant whenNotPaused returns (uint256 feeCaptured) {
        return _executeJIT(
            JITParams({
                reactiveSender: reactiveSender,
                originChainId: originChainId,
                originPool: originPool,
                amount0In: amount0In,
                amount1In: amount1In,
                targetLiquidity: targetLiquidity,
                originTimestamp: originTimestamp,
                originBlock: originBlock,
                originTxHash: 0,
                originLogIndex: 0
            })
        );
    }

    /**
     * @notice Backward-compatible 7-argument callback without reactiveSender parameter
     */
    function triggerJITLiquidity(
        uint256 originChainId,
        address originPool,
        uint256 amount0In,
        uint256 amount1In,
        uint256 targetLiquidity,
        uint256 originTimestamp,
        uint256 originBlock
    ) external onlyAuthorized nonReentrant whenNotPaused returns (uint256 feeCaptured) {
        return _executeJIT(
            JITParams({
                reactiveSender: address(0),
                originChainId: originChainId,
                originPool: originPool,
                amount0In: amount0In,
                amount1In: amount1In,
                targetLiquidity: targetLiquidity,
                originTimestamp: originTimestamp,
                originBlock: originBlock,
                originTxHash: 0,
                originLogIndex: 0
            })
        );
    }

    /**
     * @dev Internal shared JIT execution implementation using memory struct to prevent stack-too-deep
     */
    function _executeJIT(JITParams memory p) internal returns (uint256 feeCaptured) {
        // [FIX 5] Explicit check: validate reactiveSender when provided; legacy 7-arg path gated by onlyAuthorized
        if (p.reactiveSender != address(0)) {
            require(
                p.reactiveSender == authorizedReactiveContract,
                "OmniSurgeCallback: unauthorized reactive"
            );
        }
        // [FIX 3A] Reject unregistered pools immediately with zero state change
        require(registeredPools[p.originPool], "OmniSurgeCallback: pool not registered");

        uint256 startGas = gasleft();

        // [FIX 1] Replay prevention keyed on immutable origin event identity.
        // Excludes originTimestamp so at-least-once delivery with differing Lasna timestamps is safely blocked.
        bytes32 executionHash = (p.originTxHash != 0 || p.originLogIndex != 0)
            ? keccak256(abi.encodePacked(p.originChainId, p.originPool, p.originTxHash, p.originLogIndex))
            : keccak256(abi.encodePacked(p.originChainId, p.originPool, p.originBlock, p.amount0In, p.amount1In));
        require(!executedHashes[executionHash], "OmniSurgeCallback: replay prevented");
        executedHashes[executionHash] = true;

        // Latency calculation
        uint256 latencySeconds = block.timestamp >= p.originTimestamp ? (block.timestamp - p.originTimestamp) : 0;
        uint256 latencyMsEstimated = latencySeconds * 1000;
        if (latencyMsEstimated == 0) {
            uint256 blockDelta = block.number >= p.originBlock ? (block.number - p.originBlock) : 1;
            latencyMsEstimated = blockDelta * (p.originChainId == 84532 ? 200 : 1000);
        }

        uint256 volumeIn = p.amount0In > p.amount1In ? p.amount0In : p.amount1In;

        // [FIX 2] Real fee measurement: measure actual balance delta before & after cycle.
        uint256 balBefore = address(this).balance;

        // [FIX 3B] Prefer atomic surgeCycle if supported, otherwise two-step with failure detection
        try IJITPool(p.originPool).surgeCycle(p.targetLiquidity) returns (uint256) {
            // cycle executed
        } catch {
            try IJITPool(p.originPool).surgeDeposit(p.targetLiquidity) returns (bool depSuccess) {
                if (depSuccess) {
                    try IJITPool(p.originPool).surgeWithdraw(p.targetLiquidity) returns (uint256) {
                        // withdrawn
                    } catch {
                        emit JITWithdrawFailed(executionCounter + 1, p.originPool, p.targetLiquidity);
                    }
                } else {
                    emit JITDepositFailed(executionCounter + 1, p.originPool, p.targetLiquidity);
                }
            } catch {
                emit JITDepositFailed(executionCounter + 1, p.originPool, p.targetLiquidity);
            }
        }

        // Real fee captured is strictly the actual received balance delta (no phantom formula substitution)
        feeCaptured = address(this).balance > balBefore ? (address(this).balance - balBefore) : 0;

        // Update protocol state
        executionCounter++;
        totalVolumeProtected += volumeIn;
        totalFeesCaptured += feeCaptured;
        totalLatencyMsSum += latencyMsEstimated;

        // Store execution record
        JITExecution storage record = executions[executionCounter];
        record.executionId = executionCounter;
        record.originChainId = p.originChainId;
        record.originPool = p.originPool;
        record.volumeIn = volumeIn;
        record.liquidityDeployed = p.targetLiquidity;
        record.feeCaptured = feeCaptured;
        record.originTimestamp = p.originTimestamp;
        record.originBlock = p.originBlock;
        record.destinationTimestamp = block.timestamp;
        record.destinationBlock = block.number;
        record.latencySeconds = latencySeconds;
        record.latencyMsEstimated = latencyMsEstimated;
        record.gasUsed = startGas - gasleft() + 21000;
        record.originTxHash = p.originTxHash;
        record.originLogIndex = p.originLogIndex;

        executionHistory.push(executionCounter);

        emit JITSurgeExecuted(
            executionCounter,
            p.originChainId,
            p.originPool,
            p.targetLiquidity,
            feeCaptured,
            latencySeconds,
            latencyMsEstimated,
            record.gasUsed
        );

        return feeCaptured;
    }

    /**
     * @notice Helper to fetch the latest N execution records for dashboard telemetry
     */
    function getLatestExecutions(uint256 count) external view returns (JITExecution[] memory) {
        uint256 total = executionHistory.length;
        if (total == 0) {
            return new JITExecution[](0);
        }

        uint256 returnCount = count > total ? total : count;
        JITExecution[] memory result = new JITExecution[](returnCount);

        for (uint256 i = 0; i < returnCount; i++) {
            uint256 execId = executionHistory[total - 1 - i];
            result[i] = executions[execId];
        }

        return result;
    }

    /**
     * @notice Returns protocol-level overview metrics
     */
    function getProtocolMetrics() external view returns (
        uint256 _totalExecutions,
        uint256 _totalVolume,
        uint256 _totalFees,
        uint256 _avgLatencyMs
    ) {
        uint256 avgLatency = executionCounter > 0 ? (totalLatencyMsSum / executionCounter) : 0;
        return (
            executionCounter,
            totalVolumeProtected,
            totalFeesCaptured,
            avgLatency
        );
    }

    /**
     * @notice [FIX 3B] Rescue stuck native ETH or ERC20 liquidity from destination contract
     */
    function rescueFunds(address token, address payable to, uint256 amount) external onlyOwner {
        require(to != address(0), "OmniSurgeCallback: zero address");
        if (token == address(0)) {
            require(address(this).balance >= amount, "OmniSurgeCallback: insufficient balance");
            (bool success, ) = to.call{value: amount}("");
            require(success, "OmniSurgeCallback: transfer failed");
        } else {
            (bool success, bytes memory data) = token.call(
                abi.encodeWithSignature("transfer(address,uint256)", to, amount)
            );
            require(success && (data.length == 0 || abi.decode(data, (bool))), "OmniSurgeCallback: ERC20 transfer failed");
        }
        emit FundsRescued(token, to, amount);
    }
}
