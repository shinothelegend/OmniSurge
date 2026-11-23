"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function DocsPage() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#EDEDED] overflow-x-clip flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-24">
        <div className="shell-container max-w-4xl space-y-16">
          {/* Header */}
          <div className="border-b border-[#1E1E1E] pb-8 space-y-4">
            <div className="flex items-center gap-2 font-mono text-12 text-[#8A8A8A]">
              <span className="text-[#E23B3B] font-bold">( 05 )</span>
              <span className="uppercase tracking-wider">TECHNICAL SPECIFICATIONS & ARCHITECTURE</span>
            </div>
            <h1 className="font-sans text-40 sm:text-56 font-bold text-[#EDEDED] uppercase">
              DOCUMENTATION.
            </h1>
            <p className="font-sans text-16 text-[#8A8A8A] leading-relaxed max-w-2xl">
              Autonomous Just-In-Time concentrated liquidity rebalancer designed for sub-second cross-chain arbitrage and LP fee capture on Base Sepolia and Unichain Sepolia, coordinated via Reactive Lasna.
            </p>
          </div>

          {/* Section 01: Architecture & Execution Loop */}
          <section className="space-y-6">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-16 font-bold text-[#E23B3B]">( 01 )</span>
              <h2 className="font-sans text-20 sm:text-28 font-bold text-[#EDEDED] uppercase">
                ARCHITECTURE & EXECUTION LOOP
              </h2>
            </div>
            <p className="font-sans text-14 text-[#8A8A8A] leading-relaxed">
              By pairing ultra-fast Layer 2 block times (Base Sepolia’s 200ms Flashblocks and Unichain Sepolia’s 1s blocks) with the event-driven execution architecture of the Reactive Network (~1s finality), OmniSurge listens for pool imbalance swap events, computes the optimal concentrated liquidity tick range in ReactVM, and triggers an atomic callback to flash-deploy liquidity right into the active tick before instantly rebalancing out to safe reserves.
            </p>

            {/* Timing Breakdown Table — source: DOCS/proof-run.md (Live Testnet) */}
            <div className="border border-[#1E1E1E] bg-[#0A0A0A] overflow-x-auto">
              <table className="editorial-table">
                <thead>
                  <tr>
                    <th>STAGE</th>
                    <th>TARGET</th>
                    <th className="text-right">MEASURED LATENCY (TESTNET)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-[#EDEDED] font-bold">STAGE 01: ORIGIN SWAP</td>
                    <td className="text-[#8A8A8A]">Base Sepolia (Tx: 0x62084c... Block 62124403)</td>
                    <td className="text-right text-[#EDEDED] tnum font-bold">1,607 ms</td>
                  </tr>
                  <tr>
                    <td className="text-[#EDEDED] font-bold">STAGE 02: REACTVM</td>
                    <td className="text-[#8A8A8A]">Reactive Lasna (RSC 0x51D8... Block 61257228)</td>
                    <td className="text-right text-[#EDEDED] tnum font-bold">612 ms</td>
                  </tr>
                  <tr>
                    <td className="text-[#EDEDED] font-bold">STAGE 03: CALLBACK</td>
                    <td className="text-[#8A8A8A]">Base Sepolia JIT (Tx: 0xe10b5f... Block 62124411)</td>
                    <td className="text-right text-[#EDEDED] tnum font-bold">973 ms</td>
                  </tr>
                  <tr className="bg-[#111111]">
                    <td className="text-[#EDEDED] font-bold">TOTAL MEASURED ROUNDTRIP</td>
                    <td className="text-[#8A8A8A]">Live testnets (includes public RPC polling)</td>
                    <td className="text-right text-[#E23B3B] tnum font-bold">~2,000 ms</td>
                  </tr>
                  <tr>
                    <td className="text-[#8A8A8A]">ARCHITECTURAL TARGET</td>
                    <td className="text-[#8A8A8A]">Base Flashblocks (200ms) + Fast Reactive Lane</td>
                    <td className="text-right text-[#8A8A8A] tnum font-bold">&lt; 1,500 ms (Target)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="font-mono text-12 text-[#555555]">
              Reactive callbacks remove the human-in-the-loop bridging step entirely; see DOCS/proof-run.md for transaction proofs.
            </p>
          </section>

          {/* Section 02: Smart Contract Suite */}
          <section className="space-y-6">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-16 font-bold text-[#E23B3B]">( 02 )</span>
              <h2 className="font-sans text-20 sm:text-28 font-bold text-[#EDEDED] uppercase">
                SMART CONTRACT SUITE
              </h2>
            </div>

            <div className="border border-[#1E1E1E] divide-y divide-[#1E1E1E] bg-[#0A0A0A]">
              <div className="p-6 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-mono text-14 font-bold text-[#EDEDED] uppercase block">
                    OmniSurgeReactive.sol (RSC)
                  </span>
                  <a
                    href="https://lasna.reactscan.net/address/0x51D8D23d4ccC0020482E359eEB7dc2C2F176cc16"
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-12 text-[#E23B3B] hover:underline"
                  >
                    0x51D8...cc16 (REACTSCAN ↗)
                  </a>
                </div>
                <p className="font-sans text-14 text-[#8A8A8A] leading-relaxed">
                  Deployed on Reactive Lasna (Chain ID 5318007). Subscribes via the official Omni System Contract (0x8888888888888888888888888888888888888888) to Uniswap swap topics (0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822), filters volume against the minimum imbalance threshold, pre-computes 150% concentrated liquidity coverage, and dispatches callbacks.
                </p>
              </div>

              <div className="p-6 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-mono text-14 font-bold text-[#EDEDED] uppercase block">
                    DestinationCallback.sol
                  </span>
                  <a
                    href="https://sepolia.basescan.org/address/0x7Efaf718667D9d8B658742d7e6Ad8AB9dD3EF064"
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-12 text-[#E23B3B] hover:underline"
                  >
                    0x7Efa...F064 (BASESCAN ↗)
                  </a>
                </div>
                <p className="font-sans text-14 text-[#8A8A8A] leading-relaxed">
                  Deployed on Base Sepolia and Unichain Sepolia. Authorized to receive callbacks from the Base Sepolia callback proxy (0x476F44b11F5C942c58f4c8E3d0300E5710743585), validates reactive identity injection, enforces deterministic keccak256 hash deduplication to eliminate replay attacks, guards mutations with a nonReentrant mutex, and executes atomic flash liquidity injections.
                </p>
              </div>

              <div className="p-6 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-mono text-14 font-bold text-[#EDEDED] uppercase block">
                    MockPool.sol (Base Sepolia WETH-USDC)
                  </span>
                  <a
                    href="https://sepolia.basescan.org/address/0x4FE9DaC028D45C8895a1F1236176854E6cB67BBa"
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-12 text-[#E23B3B] hover:underline"
                  >
                    0x4FE9...7BBa (BASESCAN ↗)
                  </a>
                </div>
                <p className="font-sans text-14 text-[#8A8A8A] leading-relaxed">
                  Concentrated liquidity DEX emulator with tick reserves, volume-driven slippage calculation, and single-block atomic JIT deposit-withdraw flash loops.
                </p>
              </div>
            </div>
          </section>

          {/* Section 03: Runtime Safety & Invariant Verification */}
          <section className="space-y-6">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-16 font-bold text-[#E23B3B]">( 03 )</span>
              <h2 className="font-sans text-20 sm:text-28 font-bold text-[#EDEDED] uppercase">
                RUNTIME SAFETY & SMART CONTRACT INVARIANTS
              </h2>
            </div>

            <div className="border border-[#1E1E1E] p-6 bg-[#0A0A0A] font-mono text-12 space-y-3">
              <div className="flex justify-between items-baseline border-b border-[#1E1E1E] pb-3">
                <span className="text-[#8A8A8A] uppercase">ON-CHAIN INVARIANT STATUS</span>
                <span className="text-[#EDEDED] font-bold text-16">VERIFIED & ENFORCED</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#8A8A8A] pt-2">
                <div>
                  <span className="text-[#EDEDED] font-bold block">REPLAY ATTACK RESISTANCE:</span>
                  <span>Deterministic hash deduplication verified</span>
                </div>
                <div>
                  <span className="text-[#EDEDED] font-bold block">REENTRANCY GUARD:</span>
                  <span>nonReentrant mutex status check active</span>
                </div>
                <div>
                  <span className="text-[#EDEDED] font-bold block">CALLBACK AUTHENTICATION:</span>
                  <span>Cryptographic relayer verification enforced</span>
                </div>
                <div>
                  <span className="text-[#EDEDED] font-bold block">EMERGENCY CIRCUIT BREAKER:</span>
                  <span>Owner pause switch blocks unauthorized execution</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 04: Judge Reproduction & Verification Guide */}
          <section className="space-y-6">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-16 font-bold text-[#E23B3B]">( 04 )</span>
              <h2 className="font-sans text-20 sm:text-28 font-bold text-[#EDEDED] uppercase">
                JUDGE MODE • HOW TO REPRODUCE & VERIFY
              </h2>
            </div>

            <div className="border border-[#1E1E1E] p-6 sm:p-8 bg-[#0A0A0A] space-y-6">
              <p className="font-sans text-14 text-[#8A8A8A] leading-relaxed">
                OmniSurge is deployed and active on live testnets. Judges can reproduce the entire end-to-end reactive cycle locally or on-chain with the commands below:
              </p>

              {/* Steps */}
              <div className="space-y-4 font-mono text-12">
                <div className="p-4 border border-[#1E1E1E] bg-[#111111] space-y-2">
                  <span className="text-[#EDEDED] font-bold block">1. RUN COMPLETE UNIT & INVARIANT TEST SUITE (11/11 PASSING)</span>
                  <div className="text-[#E23B3B] bg-[#0A0A0A] p-2 border border-[#1E1E1E]">
                    cd contracts && npx hardhat test
                  </div>
                  <span className="text-[#8A8A8A] block">
                    Executes all 11 invariant, reactive callback, replay protection, and latency estimation tests.
                  </span>
                </div>

                <div className="p-4 border border-[#1E1E1E] bg-[#111111] space-y-2">
                  <span className="text-[#EDEDED] font-bold block">2. RUN 5-ITERATION STATISTICAL LATENCY BENCHMARK</span>
                  <div className="text-[#E23B3B] bg-[#0A0A0A] p-2 border border-[#1E1E1E]">
                    cd contracts && npx hardhat run scripts/benchmark.js
                  </div>
                  <span className="text-[#8A8A8A] block">
                    Measures Origin Swap, ReactVM compute, and Destination Callback across 5 runs, outputting p50/p95 metrics.
                  </span>
                </div>

                <div className="p-4 border border-[#1E1E1E] bg-[#111111] space-y-2">
                  <span className="text-[#EDEDED] font-bold block">3. LIVE ON-CHAIN PROOF-OF-LIFE DEMO LOOP</span>
                  <div className="text-[#E23B3B] bg-[#0A0A0A] p-2 border border-[#1E1E1E]">
                    cd contracts && npx hardhat run scripts/demo-loop.js --network baseSepolia
                  </div>
                  <span className="text-[#8A8A8A] block">
                    Submits a live swap to Base Sepolia MockPool, verifies Lasna ReactVM state, triggers atomic JIT callback, and generates DOCS/proof-run.md.
                  </span>
                </div>
              </div>

              {/* Live Contract Reference Grid */}
              <div className="border-t border-[#1E1E1E] pt-4 font-mono text-12 space-y-2">
                <span className="text-[#EDEDED] font-bold block uppercase">VERIFIED LIVE TESTNET DEPLOYMENTS:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#8A8A8A]">
                  <div>
                    <span className="text-[#EDEDED] block">BASE SEPOLIA CALLBACK:</span>
                    <a
                      href="https://sepolia.basescan.org/address/0x7Efaf718667D9d8B658742d7e6Ad8AB9dD3EF064"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#E23B3B] hover:underline break-all"
                    >
                      0x7Efaf718667D9d8B658742d7e6Ad8AB9dD3EF064 ↗
                    </a>
                  </div>
                  <div>
                    <span className="text-[#EDEDED] block">REACTIVE LASNA RSC:</span>
                    <a
                      href="https://lasna.reactscan.net/address/0x51D8D23d4ccC0020482E359eEB7dc2C2F176cc16"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#E23B3B] hover:underline break-all"
                    >
                      0x51D8D23d4ccC0020482E359eEB7dc2C2F176cc16 ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default DocsPage;
