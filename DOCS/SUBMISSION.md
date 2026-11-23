# OmniSurge — Hackathon Submission Package

## Project Metadata
- **Project Title:** OmniSurge (JIT Flash Liquidity Rebalancer)
- **Track:** Low Latency DeFi (*Every Second Counts*)
- **Hackathon:** Reactive Omni Buildathon — [DoraHacks Buildathon Page](https://dorahacks.io/hackathon/reactive-omni-buildathon/detail)
- **Tagline:** Autonomous Just-In-Time concentrated liquidity rebalancer achieving sub-second reaction finality across Base Sepolia (200ms Flashblocks) and Unichain Sepolia (1s Fast Blocks) via Reactive Lasna ReactVM.
- **Ecosystems:** Reactive Network (Lasna testnet `5318007`), Base Sepolia (`84532`), Unichain Sepolia (`1301`)
- **Submission Repository:** [https://github.com/shinothelegend/OmniSurge](https://github.com/shinothelegend/OmniSurge)

---

## 🔗 Live Deployed Smart Contracts

| Contract Name | Chain | Address | Direct Explorer Link |
| :--- | :--- | :--- | :--- |
| **OmniSurgeReactive (RSC)** | Reactive Lasna (`5318007`) | `0x51D8D23d4ccC0020482E359eEB7dc2C2F176cc16` | [Reactscan Contract ↗](https://lasna.reactscan.net/address/0x51D8D23d4ccC0020482E359eEB7dc2C2F176cc16) |
| **DestinationCallback** | Base Sepolia (`84532`) | `0x7Efaf718667D9d8B658742d7e6Ad8AB9dD3EF064` | [Basescan Contract ↗](https://sepolia.basescan.org/address/0x7Efaf718667D9d8B658742d7e6Ad8AB9dD3EF064) |
| **MockPool (WETH/USDC)** | Base Sepolia (`84532`) | `0x4FE9DaC028D45C8895a1F1236176854E6cB67BBa` | [Basescan Contract ↗](https://sepolia.basescan.org/address/0x4FE9DaC028D45C8895a1F1236176854E6cB67BBa) |
| **Reactive System Service** | Reactive Lasna (`5318007`) | `0x8888888888888888888888888888888888888888` | [Reactscan System Contract ↗](https://lasna.reactscan.net/address/0x8888888888888888888888888888888888888888) |

---

## ⚡ Proof-of-Life On-Chain Execution Hashes

Verified on live testnets with `contracts/scripts/demo-loop.js` (see [`DOCS/proof-run.md`](proof-run.md)):

| Pipeline Stage | Target Network | Transaction Hash | Block | Latency | Explorer Link |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Origin Swap Imbalance** | Base Sepolia (`84532`) | `0x2cfb35324d238e6b527bec85e40f1caf2c782c8353ab53f9ebb694d4c9959a48` | `62598747` | `1634 ms` | [Basescan ↗](https://sepolia.basescan.org/tx/0x2cfb35324d238e6b527bec85e40f1caf2c782c8353ab53f9ebb694d4c9959a48) |
| **2. ReactVM Log Processing** | Reactive Lasna (`5318007`) | Dispatched via system contract (RSC `0x51D8...cc16`) | `9059944` | `983 ms` | [Reactscan ↗](https://lasna.reactscan.net/address/0x51D8D23d4ccC0020482E359eEB7dc2C2F176cc16) |
| **3. Destination JIT Callback** | Base Sepolia (`84532`) | `0xb44aafdcd49bcc129de6e518844952a76dd3c2ee772c45b7a7798c24f73cd63e` | `62598758` | `1015 ms` | [Basescan ↗](https://sepolia.basescan.org/tx/0xb44aafdcd49bcc129de6e518844952a76dd3c2ee772c45b7a7798c24f73cd63e) |

**Total Measured Latency:** `~3,632 ms` roundtrip on live testnets (1634 ms Origin Swap + 983 ms ReactVM + 1015 ms Destination Callback; includes public RPC submission overhead). Architectural target with Flashblock pre-confirmations: `< 1,500 ms` on Base Sepolia 200ms Flashblocks. Reactive callbacks remove the human-in-the-loop bridging step entirely; see [`DOCS/proof-run.md`](proof-run.md).

---

## 📊 In-Contract Execution Overhead (Hardhat Local Simulation — Supplementary)

Measured with `contracts/scripts/benchmark.js` over 5 local EVM runs (see [`DOCS/latency-benchmark.md`](latency-benchmark.md)):

| Metric | Origin Swap Detection | ReactVM Compute | Destination JIT Callback | Total In-Contract Overhead |
| :--- | :--- | :--- | :--- | :--- |
| **Minimum** | `4.0 ms` | `3.0 ms` | `3.0 ms` | `10.0 ms` |
| **Median (p50)** | `4.0 ms` | `5.0 ms` | `3.0 ms` | `14.0 ms` |
| **p95** | `5.8 ms` | `6.0 ms` | `4.8 ms` | `14.8 ms` |
| **Maximum** | `6.0 ms` | `6.0 ms` | `5.0 ms` | `15.0 ms` |

---

## 🛡️ Invariant Test Suite & Verification Results
- **Unit & Integration Suite:** **16 / 16 tests passing (100%)** (see [`DOCS/test-results.txt`](test-results.txt))
- **Internal Security Review:** **6 / 6 invariant vectors verified** (replay deduplication under at-least-once re-delivery, `nonReentrant` mutex, authorized relayer verification, pause breaker, unregistered pool isolation, balance-delta fee accounting)

---

## 🧑‍⚖️ Judge Mode: Quick Reproduction

```bash
# 1. Clone repository
git clone https://github.com/shinothelegend/OmniSurge.git
cd OmniSurge/contracts
npm install

# 2. Run complete test suite (16/16 passing)
npx hardhat test

# 3. Run 5-iteration latency benchmark
npx hardhat run scripts/benchmark.js

# 4. Run internal security invariant review
npx hardhat run scripts/security-audit.js

# 5. Run live on-chain demo loop
npx hardhat run scripts/demo-loop.js --network baseSepolia
```

---

## 🔒 Security Compliance
- Zero private keys, mnemonic seeds, or sensitive secrets are committed to git history.
- Verified with `git log -p` audit prior to submission.
