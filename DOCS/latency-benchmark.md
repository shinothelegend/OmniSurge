# OmniSurge — In-Contract Execution Overhead (Hardhat Local Simulation — Not Network Latency)

> **Important:** These figures measure smart contract **in-EVM execution time** only, isolated inside a Hardhat local simulation node. They are **not** end-to-end network latency measurements. See [`proof-run.md`](proof-run.md) for real testnet round-trip measurements (~3,690 ms).

> **Track:** Low Latency DeFi (*Every Second Counts*)  
> **Test Suite:** 5 Consecutive End-to-End Reactive Loop Iterations (Hardhat Local Simulation)  
> **Timestamp:** 2026-11-23T13:33:48.193Z  
> **Environment:** Hardhat Local Simulation with Exact Smart Contract Bytecode  

---

## 📊 Summary Statistics Across 5 Runs (In-Contract Execution Overhead)

| Metric | Stage 1 (Origin Swap Detection) | Stage 2 (ReactVM State Compute) | Stage 3 (Destination JIT Callback) | Total In-Contract Overhead |
| :--- | :--- | :--- | :--- | :--- |
| **Minimum** | `1 ms` | `2 ms` | `1 ms` | `7 ms` |
| **Median (p50)** | `2 ms` | `4 ms` | `2 ms` | `7 ms` |
| **p95** | `3.6 ms` | `4.8 ms` | `2.8 ms` | `8.8 ms` |
| **Maximum** | `4 ms` | `5 ms` | `3 ms` | `9 ms` |

---

## 🔬 Iteration-by-Iteration Breakdown

| # | Stage 1 Latency (ms) | Stage 1 Block (Time) | Stage 2 Latency (ms) | Stage 3 Latency (ms) | Stage 3 Block (Time) | Total Stage (ms) | Wall Clock (ms) | Fee Captured | Gas Used |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| **1** | `2 ms` | Block `8` (`1795440835`) | `5 ms` | `2 ms` | Block `10` (`1795440837`) | `9 ms` | `11 ms` | `+0.099 ETH` | `415304` |
| **2** | `2 ms` | Block `11` (`1795440838`) | `4 ms` | `1 ms` | Block `13` (`1795440840`) | `7 ms` | `8 ms` | `+0.108 ETH` | `346904` |
| **3** | `2 ms` | Block `14` (`1795440841`) | `2 ms` | `3 ms` | Block `16` (`1795440843`) | `7 ms` | `7 ms` | `+0.117 ETH` | `346904` |
| **4** | `1 ms` | Block `17` (`1795440844`) | `4 ms` | `2 ms` | Block `19` (`1795440846`) | `7 ms` | `8 ms` | `+0.126 ETH` | `346904` |
| **5** | `4 ms` | Block `20` (`1795440847`) | `3 ms` | `1 ms` | Block `22` (`1795440849`) | `8 ms` | `10 ms` | `+0.135 ETH` | `346904` |

---

## ⚡ Live Network Latency Context

Reactive callbacks remove the human-in-the-loop bridging step entirely; see [`DOCS/proof-run.md`](proof-run.md) for live on-chain transaction evidence.

- **Live Testnet Measured Roundtrip:** `~3,690 ms` on live testnets (includes public RPC submission overhead; see [`DOCS/proof-run.md`](proof-run.md)).
- **Architectural Target with Flashblocks:** `< 1,500 ms` on Base Sepolia 200ms Flashblocks.

---

## 🛡️ Invariant Verification Summary
- **Atomic Retraction:** Injected liquidity is minted and burned within the exact same block callback, eliminating price displacement exposure during the JIT window.
- **Replay Protection:** Unique event identification hash ring buffer ensures zero duplicate callbacks are processed.
- **Mutual Exclusion:** `nonReentrant` modifier prevents reentrancy vectors across external pool calls.
