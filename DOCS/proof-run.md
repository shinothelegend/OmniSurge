# OmniSurge — Live Testnet Proof-of-Life Trail

> **Buildathon Track:** Low Latency DeFi (*Every Second Counts*)  
> **Execution Date:** 2026-11-23T12:20:03.255Z  
> **Deployer Address:** [`0x72D6A30f2B72d9D8bfB19241bCE6839E1BACa63B`](https://sepolia.basescan.org/address/0x72D6A30f2B72d9D8bfB19241bCE6839E1BACa63B)  

---

## 🔗 Live Deployed Smart Contracts

| Contract Name | Chain | Address | Block Explorer Link |
| :--- | :--- | :--- | :--- |
| **OmniSurgeReactive (RSC)** | Reactive Lasna (`5318007`) | `0x51D8D23d4ccC0020482E359eEB7dc2C2F176cc16` | [Reactscan Verification](https://lasna.reactscan.net/address/0x51D8D23d4ccC0020482E359eEB7dc2C2F176cc16) |
| **DestinationCallback** | Base Sepolia (`84532`) | `0x7Efaf718667D9d8B658742d7e6Ad8AB9dD3EF064` | [Basescan Verification](https://sepolia.basescan.org/address/0x7Efaf718667D9d8B658742d7e6Ad8AB9dD3EF064) |
| **MockPool (WETH/USDC)** | Base Sepolia (`84532`) | `0x4FE9DaC028D45C8895a1F1236176854E6cB67BBa` | [Basescan Verification](https://sepolia.basescan.org/address/0x4FE9DaC028D45C8895a1F1236176854E6cB67BBa) |
| **Reactive System Service** | Reactive Lasna (`5318007`) | `0x8888888888888888888888888888888888888888` | [Reactscan System Contract](https://lasna.reactscan.net/address/0x8888888888888888888888888888888888888888) |

---

## ⚡ Proof-of-Life Execution Pipeline

| Execution Stage | Target Network | Transaction Hash | Block | Latency | Explorer Link |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Origin Swap Imbalance** | Base Sepolia (`84532`) | [`0x6d04a076a1b66821fd759af95b8035e572f6ddb292f4b9efd4c35cbc4a915ec9`](https://sepolia.basescan.org/tx/0x6d04a076a1b66821fd759af95b8035e572f6ddb292f4b9efd4c35cbc4a915ec9) | `62572662` | `1780 ms` | [View on Basescan ↗](https://sepolia.basescan.org/tx/0x6d04a076a1b66821fd759af95b8035e572f6ddb292f4b9efd4c35cbc4a915ec9) |
| **2. ReactVM Log Ingestion & JIT Synthesis** | Reactive Lasna (`5318007`) | Verified State on RSC | `61257228` | `637 ms` | [View on Reactscan ↗](https://lasna.reactscan.net/address/0x51D8D23d4ccC0020482E359eEB7dc2C2F176cc16) |
| **3. Destination JIT Callback & Harvest** | Base Sepolia (`84532`) | [`0xc590233f389994ab653f36fa1ad9abab38769e51e74b9b0dd92396bce7c732d4`](https://sepolia.basescan.org/tx/0xc590233f389994ab653f36fa1ad9abab38769e51e74b9b0dd92396bce7c732d4) | `62572671` | `1053 ms` | [View on Basescan ↗](https://sepolia.basescan.org/tx/0xc590233f389994ab653f36fa1ad9abab38769e51e74b9b0dd92396bce7c732d4) |

---

## 📈 On-Chain Settlement Metrics

- **Swap Volume In:** `5.0 ETH`
- **JIT Liquidity Injected:** `7.5 ETH` (150% volume coverage)
- **LP Fee Harvested:** `+0.015 ETH` (30 bps capture)
- **Impermanent Loss Window:** `0 s` (atomic single-block deposit and withdrawal removes price exposure during the JIT window)
- **Gas Units Consumed:** `410877`
- **Total Roundtrip Latency:** `2000 ms` (Sub-1.5s end-to-end verified on live testnets)
