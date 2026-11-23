# OmniSurge — In-Contract Execution Overhead (Hardhat Local Simulation — Not Network Latency)

> **Important:** These figures measure smart contract **in-EVM execution time** only, isolated inside a Hardhat local simulation node. They are **not** end-to-end network latency measurements. See [`proof-run.md`](proof-run.md) for real testnet round-trip measurements (~3,632 ms).

> **Track:** Low Latency DeFi (*Every Second Counts*)  
> **Test Suite:** 5 Consecutive End-to-End Reactive Loop Iterations (Hardhat Local Simulation)  
> **Timestamp:** 2026-11-23T13:47:04.756Z  
> **Environment:** Hardhat Local Simulation with Exact Smart Contract Bytecode  

---

## 📊 Summary Statistics Across 5 Runs (In-Contract Execution Overhead)

| Metric | Stage 1 (Origin Swap Detection) | Stage 2 (ReactVM State Compute) | Stage 3 (Destination JIT Callback) | Total In-Contract Overhead |
| :--- | :--- | :--- | :--- | :--- |
| **Minimum** | `4 ms` | `3 ms` | `3 ms` | `10 ms` |
| **Median (p50)** | `4 ms` | `5 ms` | `3 ms` | `14 ms` |
| **p95** | `5.8 ms` | `6 ms` | `4.8 ms` | `14.8 ms` |
| **Maximum** | `6 ms` | `6 ms` | `5 ms` | `15 ms` |

---

## 🔬 Iteration-by-Iteration Breakdown

| # | Stage 1 Latency (ms) | Stage 1 Block (Time) | Stage 2 Latency (ms) | Stage 3 Latency (ms) | Stage 3 Block (Time) | Total Stage (ms) | Wall Clock (ms) | Fee Captured | Gas Used |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| **1** | `6 ms` | Block `8` (`1795441632`) | `5 ms` | `3 ms` | Block `10` (`1795441634`) | `14 ms` | `19 ms` | `+0.099 ETH` | `415304` |
| **2** | `4 ms` | Block `11` (`1795441635`) | `3 ms` | `3 ms` | Block `13` (`1795441637`) | `10 ms` | `12 ms` | `+0.108 ETH` | `346904` |
| **3** | `4 ms` | Block `14` (`1795441638`) | `6 ms` | `4 ms` | Block `16` (`1795441640`) | `14 ms` | `17 ms` | `+0.117 ETH` | `346904` |
| **4** | `4 ms` | Block `17` (`1795441641`) | `6 ms` | `3 ms` | Block `19` (`1795441643`) | `13 ms` | `16 ms` | `+0.126 ETH` | `346904` |
| **5** | `5 ms` | Block `20` (`1795441644`) | `5 ms` | `5 ms` | Block `22` (`1795441646`) | `15 ms` | `18 ms` | `+0.135 ETH` | `346904` |

---

## ⚡ Live Network Latency Context

Reactive callbacks remove the human-in-the-loop bridging step entirely; see [`DOCS/proof-run.md`](proof-run.md) for live on-chain transaction evidence.

- **Live Testnet Measured Roundtrip:** `~3,632 ms` on live testnets (includes public RPC submission overhead; see [`DOCS/proof-run.md`](proof-run.md)).
- **Architectural Target with Flashblocks:** `< 1,500 ms` on Base Sepolia 200ms Flashblocks.

---

## 🛡️ Invariant Verification Summary
- **Atomic Retraction:** Injected liquidity is minted and burned within the exact same block callback, eliminating price displacement exposure during the JIT window.
- **Replay Protection:** Unique event identification hash ring buffer ensures zero duplicate callbacks are processed.
- **Mutual Exclusion:** `nonReentrant` modifier prevents reentrancy vectors across external pool calls.
