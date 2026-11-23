// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "../DestinationCallback.sol";

/**
 * @title MockPool
 * @notice Simulates a Uniswap-like liquidity pool on Base Sepolia or Unichain Sepolia.
 * Emits Swap events and accepts JIT concentrated liquidity surges with real fee transfers.
 */
contract MockPool is IJITPool {
    string public name;
    string public symbol;
    uint256 public reserve0;
    uint256 public reserve1;
    uint256 public activeConcentratedLiquidity;
    uint256 public totalSwaps;
    uint256 public override feeRateBps = 30; // 0.30%
    bool public failWithdraw; // test hook for simulating withdraw failure

    // Uniswap V2 standard Swap event signature:
    // Swap(address indexed sender, uint256 amount0In, uint256 amount1In, uint256 amount0Out, uint256 amount1Out, address indexed to)
    event Swap(
        address indexed sender,
        uint256 amount0In,
        uint256 amount1In,
        uint256 amount0Out,
        uint256 amount1Out,
        address indexed to
    );

    event LiquiditySurgeInjected(uint256 amount, uint256 timestamp);
    event LiquiditySurgeRebalanced(uint256 amount, uint256 timestamp);

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _initialReserve0,
        uint256 _initialReserve1
    ) payable {
        name = _name;
        symbol = _symbol;
        reserve0 = _initialReserve0;
        reserve1 = _initialReserve1;
        activeConcentratedLiquidity = 100 ether;
    }

    /// @notice Accept native ETH so pool can pay out real LP fees
    receive() external payable {}

    function setFeeRateBps(uint256 _rate) external {
        feeRateBps = _rate;
    }

    function setFailWithdraw(bool _fail) external {
        failWithdraw = _fail;
    }

    /**
     * @notice Simulates a user swap on the pool, which triggers the origin event
     */
    function swap(
        uint256 amount0In,
        uint256 amount1In,
        uint256 amount0Out,
        uint256 amount1Out,
        address to
    ) external returns (bool) {
        totalSwaps++;
        reserve0 += amount0In;
        reserve1 += amount1In;
        if (reserve0 >= amount0Out) reserve0 -= amount0Out;
        if (reserve1 >= amount1Out) reserve1 -= amount1Out;

        emit Swap(
            msg.sender,
            amount0In,
            amount1In,
            amount0Out,
            amount1Out,
            to
        );
        return true;
    }

    /**
     * @notice Accepts JIT liquidity surge
     */
    function surgeDeposit(uint256 amount) external payable override returns (bool) {
        activeConcentratedLiquidity += amount;
        emit LiquiditySurgeInjected(amount, block.timestamp);
        return true;
    }

    /**
     * @notice Rebalances and withdraws JIT liquidity back, transferring REAL fee to msg.sender
     */
    function surgeWithdraw(uint256 amount) external override returns (uint256 feePaid) {
        require(!failWithdraw, "MockPool: simulated withdraw failure");
        require(activeConcentratedLiquidity >= amount, "MockPool: insufficient active liquidity");
        activeConcentratedLiquidity -= amount;
        feePaid = (amount * feeRateBps) / 10000;
        if (feePaid > 0 && address(this).balance >= feePaid) {
            (bool sent, ) = payable(msg.sender).call{value: feePaid}("");
            require(sent, "MockPool: fee transfer failed");
        }
        emit LiquiditySurgeRebalanced(amount, block.timestamp);
        return feePaid;
    }

    /**
     * @notice Single atomic deposit + fee harvest + withdrawal cycle
     */
    function surgeCycle(uint256 amount) external payable override returns (uint256 feePaid) {
        require(!failWithdraw, "MockPool: simulated cycle failure");
        emit LiquiditySurgeInjected(amount, block.timestamp);
        feePaid = (amount * feeRateBps) / 10000;
        if (feePaid > 0 && address(this).balance >= feePaid) {
            (bool sent, ) = payable(msg.sender).call{value: feePaid}("");
            require(sent, "MockPool: fee transfer failed");
        }
        emit LiquiditySurgeRebalanced(amount, block.timestamp);
        return feePaid;
    }

    function getPoolState() external view returns (
        uint256 _reserve0,
        uint256 _reserve1,
        uint256 _activeLiquidity,
        uint256 _totalSwaps
    ) {
        return (reserve0, reserve1, activeConcentratedLiquidity, totalSwaps);
    }
}
