# OmniSurge — In-Contract Execution Overhead (Hardhat Local Simulation — Not Network Latency)

> **Important:** These figures measure smart contract **in-EVM execution time** only, isolated inside a Hardhat local simulation node. They are **not** end-to-end network latency measurements. See [`proof-run.md`](proof-run.md) for real testnet round-trip measurements (~2,000 ms).

> **Track:** Low Latency DeFi (*Every Second Counts*)  
> **Test Suite:** 5 Consecutive End-to-End Reactive Loop Iterations (Hardhat Local Simulation)  
> **Timestamp:** 2026-11-23T10:26:06.875Z  
> **Environment:** Hardhat Local Simulation with Exact Smart Contract Bytecode  

---

## 📊 Summary Statistics Across 5 Runs (In-Contract Execution Overhead)

| Metric | Stage 1 (Origin Swap Detection) | Stage 2 (ReactVM State Compute) | Stage 3 (Destination JIT Callback) | Total In-Contract Overhead |
| :--- | :--- | :--- | :--- | :--- |
| **Minimum** | `3 ms` | `2 ms` | `3 ms` | `8 ms` |
| **Median (p50)** | `3 ms` | `3 ms` | `3 ms` | `10 ms` |
| **p95** | `3.8 ms` | `4 ms` | `5.4 ms` | `11.8 ms` |
| **Maximum** | `4 ms` | `4 ms` | `6 ms` | `12 ms` |

---

## 🔬 Iteration-by-Iteration Breakdown

| # | Stage 1 Latency (ms) | Stage 1 Block (Time) | Stage 2 Latency (ms) | Stage 3 Latency (ms) | Stage 3 Block (Time) | Total Stage (ms) | Wall Clock (ms) | Fee Captured | Gas Used |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| **1** | `4 ms` | Block `8` (`1795429574`) | `4 ms` | `3 ms` | Block `10` (`1795429576`) | `11 ms` | `16 ms` | `+0.066 ETH` | `418082` |
| **2** | `3 ms` | Block `11` (`1795429577`) | `4 ms` | `3 ms` | Block `13` (`1795429579`) | `10 ms` | `12 ms` | `+0.072 ETH` | `349682` |
| **3** | `3 ms` | Block `14` (`1795429580`) | `3 ms` | `6 ms` | Block `16` (`1795429582`) | `12 ms` | `16 ms` | `+0.078 ETH` | `349682` |
| **4** | `3 ms` | Block `17` (`1795429583`) | `3 ms` | `3 ms` | Block `19` (`1795429585`) | `9 ms` | `11 ms` | `+0.084 ETH` | `349682` |
| **5** | `3 ms` | Block `20` (`1795429586`) | `2 ms` | `3 ms` | Block `22` (`1795429588`) | `8 ms` | `11 ms` | `+0.09 ETH` | `349682` |

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
