# OmniSurge — In-Contract Execution Overhead (Hardhat Local Simulation — Not Network Latency)

> **Important:** These figures measure smart contract **in-EVM execution time** only, isolated inside a Hardhat local simulation node. They are **not** end-to-end network latency measurements. See [`proof-run.md`](proof-run.md) for real testnet round-trip measurements (~2,000 ms).

> **Track:** Low Latency DeFi (*Every Second Counts*)  
> **Test Suite:** 5 Consecutive End-to-End Reactive Loop Iterations (Hardhat Local Simulation)  
> **Timestamp:** 2026-11-23T12:15:35.087Z  
> **Environment:** Hardhat Local Simulation with Exact Smart Contract Bytecode  

---

## 📊 Summary Statistics Across 5 Runs (In-Contract Execution Overhead)

| Metric | Stage 1 (Origin Swap Detection) | Stage 2 (ReactVM State Compute) | Stage 3 (Destination JIT Callback) | Total In-Contract Overhead |
| :--- | :--- | :--- | :--- | :--- |
| **Minimum** | `3 ms` | `3 ms` | `3 ms` | `10 ms` |
| **Median (p50)** | `5 ms` | `4 ms` | `4 ms` | `13 ms` |
| **p95** | `5 ms` | `6.8 ms` | `4.8 ms` | `16.6 ms` |
| **Maximum** | `5 ms` | `7 ms` | `5 ms` | `17 ms` |

---

## 🔬 Iteration-by-Iteration Breakdown

| # | Stage 1 Latency (ms) | Stage 1 Block (Time) | Stage 2 Latency (ms) | Stage 3 Latency (ms) | Stage 3 Block (Time) | Total Stage (ms) | Wall Clock (ms) | Fee Captured | Gas Used |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| **1** | `5 ms` | Block `8` (`1795436142`) | `6 ms` | `4 ms` | Block `10` (`1795436144`) | `15 ms` | `20 ms` | `+0.099 ETH` | `415304` |
| **2** | `5 ms` | Block `11` (`1795436145`) | `4 ms` | `4 ms` | Block `13` (`1795436147`) | `13 ms` | `15 ms` | `+0.108 ETH` | `346904` |
| **3** | `3 ms` | Block `14` (`1795436148`) | `4 ms` | `4 ms` | Block `16` (`1795436150`) | `11 ms` | `16 ms` | `+0.117 ETH` | `346904` |
| **4** | `4 ms` | Block `17` (`1795436151`) | `3 ms` | `3 ms` | Block `19` (`1795436153`) | `10 ms` | `14 ms` | `+0.126 ETH` | `346904` |
| **5** | `5 ms` | Block `20` (`1795436154`) | `7 ms` | `5 ms` | Block `22` (`1795436156`) | `17 ms` | `18 ms` | `+0.135 ETH` | `346904` |

---

## ⚡ Live Network Latency Context

Reactive callbacks remove the human-in-the-loop bridging step entirely; see [`DOCS/proof-run.md`](proof-run.md) for live on-chain transaction evidence.

- **Live Testnet Measured Roundtrip:** `~2,000 ms` (1,607 ms Origin Swap + 612 ms ReactVM + 973 ms Destination JIT Callback, verified on Base Sepolia and Reactive Lasna).
- **Architectural Target with Flashblocks:** `< 1,500 ms` on Base Sepolia 200ms Flashblocks.

---

## 🛡️ Invariant Verification Summary
- **Atomic Retraction:** Injected liquidity is minted and burned within the exact same block callback, eliminating price displacement exposure during the JIT window.
- **Replay Protection:** Unique event identification hash ring buffer ensures zero duplicate callbacks are processed.
- **Mutual Exclusion:** `nonReentrant` modifier prevents reentrancy vectors across external pool calls.
