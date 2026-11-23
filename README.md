# ⚡ OmniSurge (JIT Flash Liquidity Rebalancer)

> **Event:** [Reactive Omni Buildathon on DoraHacks](https://dorahacks.io/hackathon/reactive-omni-buildathon)  
> **Track:** Low Latency DeFi (*Every Second Counts*)  
> **Target Ecosystems:** Reactive Network (Lasna Testnet `5318007`), Base Sepolia (200ms Flashblocks `84532`), Unichain Sepolia (1s Fast Blocks `1301`)  
> **Submission Repository:** [https://github.com/shinothelegend/OmniSurge](https://github.com/shinothelegend/OmniSurge)

---

## 🌟 Executive Summary

**OmniSurge** is an autonomous Just-In-Time (JIT) concentrated liquidity protocol engineered for sub-second cross-chain arbitrage and LP fee capture.

Traditional concentrated liquidity providers (LPs) face high impermanent loss (IL) and toxic order flow because their capital sits passively across static price ticks. By coupling the sub-second block times of Layer 2s (**Base Sepolia’s 200ms Flashblocks** and **Unichain Sepolia’s 1s blocks**) with the autonomous event-driven execution architecture of the **Reactive Network (~1s finality)**, OmniSurge listens for pending high-volume swap imbalances, pre-computes optimal concentrated liquidity ticks in ReactVM, and triggers an atomic cross-chain callback to flash-deploy liquidity right into the active tick before instantly harvesting fees and retracting back to safety—where **atomic same-block deposit-and-withdraw removes price exposure during the JIT window**.

---

## 🔗 Live Deployed Smart Contracts

| Contract Name | Chain | Contract Address | Direct Explorer Verification |
| :--- | :--- | :--- | :--- |
| **OmniSurgeReactive (RSC)** | Reactive Lasna (`5318007`) | `0x51D8D23d4ccC0020482E359eEB7dc2C2F176cc16` | [Reactscan Contract ↗](https://lasna.reactscan.net/address/0x51D8D23d4ccC0020482E359eEB7dc2C2F176cc16) |
| **DestinationCallback** | Base Sepolia (`84532`) | `0x7Efaf718667D9d8B658742d7e6Ad8AB9dD3EF064` | [Basescan Contract ↗](https://sepolia.basescan.org/address/0x7Efaf718667D9d8B658742d7e6Ad8AB9dD3EF064) |
| **MockPool (WETH/USDC)** | Base Sepolia (`84532`) | `0x4FE9DaC028D45C8895a1F1236176854E6cB67BBa` | [Basescan Contract ↗](https://sepolia.basescan.org/address/0x4FE9DaC028D45C8895a1F1236176854E6cB67BBa) |
| **Reactive System Service** | Reactive Lasna (`5318007`) | `0x8888888888888888888888888888888888888888` | [Reactscan System Service ↗](https://lasna.reactscan.net/address/0x8888888888888888888888888888888888888888) |

---

## ⚡ Proof-of-Life Execution Trail

Every step of the OmniSurge reactive pipeline has been verified on live testnets via `contracts/scripts/demo-loop.js` (see full report in [`DOCS/proof-run.md`](DOCS/proof-run.md)):

| Pipeline Stage | Network | Transaction Hash / State | Block Number | Measured Latency | Explorer Link |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Origin Swap Imbalance** | Base Sepolia (`84532`) | `0x62084cbecacdf182fa13d91ea38ca1c2a1178de21b13c1fed47252f2eb9673ef` | `62124403` | `1,607 ms` | [Basescan Tx ↗](https://sepolia.basescan.org/tx/0x62084cbecacdf182fa13d91ea38ca1c2a1178de21b13c1fed47252f2eb9673ef) |
| **2. ReactVM Log Ingestion** | Reactive Lasna (`5318007`) | Verified State on RSC `0x51D8...cc16` | `61257228` | `612 ms` | [Reactscan RSC ↗](https://lasna.reactscan.net/address/0x51D8D23d4ccC0020482E359eEB7dc2C2F176cc16) |
| **3. Destination JIT Settlement** | Base Sepolia (`84532`) | `0xe10b5fddc33dcc59458bff8f88dbffd5d4be389331eba9919c6ed52a9b9c0215` | `62124411` | `973 ms` | [Basescan Tx ↗](https://sepolia.basescan.org/tx/0xe10b5fddc33dcc59458bff8f88dbffd5d4be389331eba9919c6ed52a9b9c0215) |

**On-Chain JIT Execution Result:**
- **Volume Protected:** `5.0 ETH`
- **Liquidity Deployed:** `7.5 ETH` (150% coverage)
- **Fee Captured:** `+0.015 ETH` (30 bps)
- **Impermanent Loss Window:** `0 seconds` (atomic single-block deposit and withdrawal)
- **Measured Roundtrip Latency:** `~2,000 ms` on live testnets (includes public RPC polling overhead); sub-1.5s is the architecture target with Flashblocks

Reactive callbacks remove the human-in-the-loop bridging step entirely; see [`DOCS/proof-run.md`](DOCS/proof-run.md) for full transaction evidence.

---

## 📐 Architecture & Reactive Pipeline

```
  [ Origin Chain ]                     [ Reactive Network ]               [ Destination Chain ]
  Base / Unichain                       Lasna Testnet (5318007)            Base Sepolia (84532)
         │                                    │                                      │
 1. Swap Imbalance Event                      │                                      │
    (e.g., 5.0 ETH Swap)                      │                                      │
         │                                    │                                      │
         └───────────── Log Record ──────────►│                                      │
                     (Origin Block & Ts)      │                                      │
                                              │ 2. ReactVM Execution                 │
                                              │    - Filter volume >= threshold      │
                                              │    - Formulate 150% JIT Liquidity    │
                                              │    - Benchmark latency timestamp     │
                                              │                                      │
                                              └───────── emit Callback ─────────────►│
                                                         (Relayer Dispatch)          │
                                                                                     │ 3. DestinationCallback.sol
                                                                                     │    - Replay check (Hash)
                                                                                     │    - nonReentrant Guard
                                                                                     │    - Flash surgeDeposit()
                                                                                     │    - Fee Harvest (+0.015 ETH)
                                                                                     │    - Atomic surgeWithdraw()
                                                                                     │    - Telemetry Ring Buffer
```

### In-Contract Execution Overhead (Hardhat Local Simulation — Supplementary)

> **Important:** These figures measure smart contract EVM execution overhead in local simulation (`npx hardhat run scripts/benchmark.js`). They reflect EVM computational overhead, not live network transport latency. See [Proof-of-Life Trail](#-proof-of-life-execution-trail) above for live testnet measurements (~2,000 ms roundtrip). Reactive callbacks remove the human-in-the-loop bridging step entirely; see proof run.

Measured using `contracts/scripts/benchmark.js` over 5 consecutive local EVM iterations (full report in [`DOCS/latency-benchmark.md`](DOCS/latency-benchmark.md)):

| Benchmark Stage | Target Environment | Minimum | Median (p50) | p95 | Maximum |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Stage 1: Origin Detection** | Local EVM | `3.0 ms` | `5.0 ms` | `5.0 ms` | `5.0 ms` |
| **Stage 2: ReactVM Compute** | Local EVM | `3.0 ms` | `4.0 ms` | `6.8 ms` | `7.0 ms` |
| **Stage 3: Destination Callback** | Local EVM | `3.0 ms` | `4.0 ms` | `4.8 ms` | `5.0 ms` |
| **Total In-Contract Overhead** | Full Local Loop | `10.0 ms` | `13.0 ms` | `16.6 ms` | `17.0 ms` |

---

## 🛠️ Smart Contract Architecture (`contracts/`)

All smart contracts are written in Solidity `^0.8.24` and compiled using Hardhat:

1. **`OmniSurgeReactive.sol` (RSC)**:
   - Deployed on **Reactive Lasna Testnet** (Chain ID: `5318007`).
   - Subscribes to Uniswap V2 Swap topics (`0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822`) via the official Reactive System Contract (`0x8888888888888888888888888888888888888888`).
   - Decimal-normalized volume filtering against `minImbalanceThreshold` (converts 6-decimal USDC to 18-decimal base for fair evaluation).
   - Computes target concentrated liquidity injection (`volumeIn * 150%`).
   - Emits standard Reactive `Callback(chain_id, destinationCallback, gasLimit, payload)`.

2. **`DestinationCallback.sol`**:
   - Deployed on destination chains (Base Sepolia and Unichain Sepolia).
   - Authorized relayer & RSC caller cryptographic verification.
   - `nonReentrant` mutex protection.
   - Immutable origin event identity deduplication: `keccak256(originChainId, originPool, originTxHash, originLogIndex)` eliminates duplicate executions even under at-least-once delivery retries.
   - Atomic `surgeCycle` with measured balance-delta fee accounting (no phantom formulas) and owner fund rescue circuit.
   - Telemetry ring buffer storing latency milliseconds, blocks, and fees.

3. **`MockPool.sol`**:
   - Concentrated DEX liquidity pool simulating active tick depths, swaps, and single-block atomic JIT surge injections.

---

## 🛡️ Internal Security Review

OmniSurge includes an automated invariant test suite (`contracts/scripts/security-audit.js`):

| Invariant Vector | Target Contract | Outcome | Protection Mechanism |
| :--- | :--- | :--- | :--- |
| **Unauthorized Callback Access** | `DestinationCallback.sol` | **PASSED** | Only authorized callback relayer or contract owner can invoke |
| **Unauthorized Reactive Sender** | `DestinationCallback.sol` | **PASSED** | Validates `reactiveSender == authorizedReactiveContract` |
| **Replay Attack Resistance** | `DestinationCallback.sol` | **PASSED** | Immutable origin event identity deduplication `(originChainId, originPool, originTxHash, originLogIndex)` blocks re-delivery |
| **Reentrancy Resistance** | `DestinationCallback.sol` | **PASSED** | `nonReentrant` status mutex (1 -> 2 -> 1) |
| **Emergency Halt** | `DestinationCallback.sol` | **PASSED** | Owner pause circuit breaker halts all operations |
| **Unregistered Pool Isolation** | `DestinationCallback.sol` | **PASSED** | Reverted unregistered pool call with zero state or counter inflation |

**Self-Implemented Invariant Test Score: 6 / 6 Vectors Passing, 16 / 16 Unit & Integration Tests Passing (100%)** (see raw test output in [`DOCS/test-results.txt`](DOCS/test-results.txt)).

---

## 💻 Frontend Dashboard (`frontend/`)

Built with **Next.js 16 (App Router)** and **Tailwind CSS**:

- **Dark Editorial Aesthetic:** Implements the Kabuto & Ripar design philosophy: dark `#0A0A0A` canvas, `#111111` surfaces, 1px `#1E1E1E` hairline dividers, `#EDEDED` display headlines, `#8A8A8A` secondary labels, restrained `#E23B3B` accent, bold tabular monospace numerals, and zero decorative SaaS chrome.
- **Real-Time Multi-Chain Block Stream:** Connects live via `ethers.JsonRpcProvider` to Base Sepolia (`https://sepolia.base.org`), Unichain Sepolia (`https://sepolia.unichain.org`), and Reactive Lasna (`https://lasna-rpc.rnk.dev`), measuring real round-trip RPC pings.
- **Interactive 4-Stage Execution Loop:** Traces Mempool Detection -> ReactVM Computation -> Concentrated Injection -> Atomic Retraction with live active states.
- **Concentrated Depth Profile:** 12-tick histogram depicting active tick reinforcement during JIT surges.
- **Web3 Wallet & Flash Deposit Modal:** Connects to MetaMask/Rabby/Coinbase Wallet, tracks native balances, switches networks, and dispatches real on-chain deposit transactions with explorer verification.
- **Remotion Video Engine:** Programmatically rendered 1280x720 HD demo video embedded directly via `@remotion/player`.

---

## 📋 Resources & Judge Verification Guide

### 1. Network RPCs & Chain Configuration
- **Base Sepolia:** Chain ID `84532` | RPC: `https://sepolia.base.org` | Explorer: [Basescan](https://sepolia.basescan.org)
- **Unichain Sepolia:** Chain ID `1301` | RPC: `https://sepolia.unichain.org` | Explorer: [Uniscan](https://sepolia.uniscan.xyz)
- **Reactive Lasna:** Chain ID `5318007` | RPC: `https://lasna-rpc.rnk.dev` | Explorer: [Reactscan](https://lasna.reactscan.net)
- **Reactive System Service Contract:** `0x8888888888888888888888888888888888888888`

### 2. Testnet Gas Faucets
- **Base Sepolia ETH:** [Coinbase Base Faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet) or [Alchemy Faucet](https://www.alchemy.com/faucets/base-sepolia)
- **Unichain Sepolia ETH:** [Unichain Faucet](https://faucet.unichain.org/)
- **Reactive Lasna `lREACT`:** Bridge via faucet contract on Base Sepolia (`0x2afaFD298b23b62760711756088F75B7409f5967`)

---

## 🚀 Quick Start Guide

### 1. Smart Contracts, Benchmarks & Proof-of-Life

```bash
cd contracts

# Run unit & integration tests (11/11 passing tests)
npx hardhat test

# Run 5-iteration statistical latency benchmark
npx hardhat run scripts/benchmark.js

# Run internal security invariant review
npx hardhat run scripts/security-audit.js

# Execute live on-chain proof-of-life loop on Base Sepolia
npx hardhat run scripts/demo-loop.js --network baseSepolia
```

### 2. Frontend Dashboard

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Or build & start production server
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔮 Future Sight & Protocol Roadmap

| Phase | Horizon | Focus Area | Technical Deliverable |
| :--- | :--- | :--- | :--- |
| **Phase 1: Testnet MVP** | *Current* | Reactive Omni & L2 Fast Blocks | Deploy `OmniSurgeReactive` on Lasna with 200ms Base Sepolia and 1s Unichain Sepolia telemetry and invariant suite |
| **Phase 2: Uniswap v4 Hooks** | Q1 2027 | Native Hook Integration | Implement `beforeSwap` and `afterSwap` native Uniswap v4 pool hooks triggered directly by Reactive Network callbacks |
| **Phase 3: AI Volatility Routing** | Q2 2027 | Predictive Tick Allocation | Integrate machine learning models to dynamically calculate optimal tick spread and sizing based on pending mempool volume |
| **Phase 4: Mainnet Deployment** | Q3 2027 | Institutional JIT Vaults | Launch audited, multi-sig backed liquidity vaults on Base, Arbitrum, Unichain, and Ethereum mainnets |
