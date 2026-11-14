# OmniSurge — Smart Contracts

## OmniSurgeReactive.sol (Reactive Network — Lasna)
Reactive Smart Contract that subscribes to Uniswap V2 Swap events on origin chains.
- Subscribes to `Swap` topic `0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67`
- Filters volume against `minImbalanceThreshold` (default 0.5 ETH)
- Computes `targetLiquidity = volumeIn * surgeMultiplierBps / 10000` (150% coverage)
- Emits Reactive `Callback(chain_id, destinationCallback, gasLimit, payload)`
- Payload encodes `triggerJITLiquidity(...)` for DestinationCallback

### Key Functions
- `subscribePool(chainId, poolAddress, networkLabel)` — owner only
- `unsubscribePool(chainId, poolAddress)` — owner only
- `react(LogRecord calldata log)` — vmOnly, Reactive entry point
- `setDestinationConfig(...)` — owner only
- `setMinImbalanceThreshold(...)` — owner only
- `setSurgeMultiplierBps(...)` — owner only (min 10000 bps = 100%)
- `getTelemetry()` — view, returns event/dispatch counters and timestamps

## DestinationCallback.sol (Base Sepolia)
Destination callback executor. Executes JIT concentrated liquidity deployment.
- `onlyAuthorized` — only relayer or authorized Reactive contract
- `nonReentrant` — reentrancy mutex
- `whenNotPaused` — emergency halt
- Replay prevention via `keccak256(originChainId, originPool, originBlock, amount0In, amount1In, originTimestamp)`
- Atomic `surgeDeposit()` → fee harvest → `surgeWithdraw()`
- Telemetry: `getProtocolMetrics()`, `getLatestExecutions(count)`

### Key Functions
- `triggerJITLiquidity(...)` — external, onlyAuthorized, nonReentrant, whenNotPaused
- `setPoolRegistration(pool, status)` — owner only
- `setDefaultFeeRateBps(rate)` — owner only (max 1000 bps = 10%)
- `getProtocolMetrics()` — view
- `getLatestExecutions(count)` — view

## MockPool.sol (Test)
Simulates a Uniswap-like liquidity pool. Emits Swap events, accepts surge deposits/withdrawals.

## MockReactiveSystem.sol (Test)
Simulates Reactive System Contract `subscribe`/`unsubscribe` for local testing.
