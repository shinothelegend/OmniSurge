// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "../DestinationCallback.sol";

/**
 * @title MockPool
 * @notice Simulates a Uniswap-like liquidity pool on Base Sepolia or Unichain Sepolia.
 * Emits Swap events and accepts JIT concentrated liquidity surges.
 */
contract MockPool is IJITPool {
    string public name;
    string public symbol;
    uint256 public reserve0;
    uint256 public reserve1;
    uint256 public activeConcentratedLiquidity;
    uint256 public totalSwaps;
    uint256 public override feeRateBps = 30; // 0.30%

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
    ) {
        name = _name;
        symbol = _symbol;
        reserve0 = _initialReserve0;
        reserve1 = _initialReserve1;
        activeConcentratedLiquidity = 100 ether;
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
    function surgeDeposit(uint256 amount) external override returns (bool) {
        activeConcentratedLiquidity += amount;
        emit LiquiditySurgeInjected(amount, block.timestamp);
        return true;
    }

    /**
     * @notice Rebalances and withdraws JIT liquidity back
     */
    function surgeWithdraw(uint256 amount) external override returns (bool) {
        if (activeConcentratedLiquidity >= amount) {
            activeConcentratedLiquidity -= amount;
        }
        emit LiquiditySurgeRebalanced(amount, block.timestamp);
        return true;
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

