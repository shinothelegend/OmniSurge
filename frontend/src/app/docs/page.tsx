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

            {/* Timing Breakdown Table */}
            <div className="border border-[#1E1E1E] bg-[#0A0A0A] overflow-x-auto">
              <table className="editorial-table">
                <thead>
                  <tr>
                    <th>STAGE</th>
                    <th>TARGET</th>
                    <th className="text-right">MEASURED CADENCE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-[#EDEDED] font-bold">STAGE 01: DETECTION</td>
                    <td className="text-[#8A8A8A]">Base Sepolia Flashblocks / Unichain</td>
                    <td className="text-right text-[#EDEDED] tnum font-bold">190 - 200 ms</td>
                  </tr>
                  <tr>
                    <td className="text-[#EDEDED] font-bold">STAGE 02: REACTVM</td>
                    <td className="text-[#8A8A8A]">Reactive Lasna Testnet (Chain ID 5318007)</td>
                    <td className="text-right text-[#EDEDED] tnum font-bold">740 - 790 ms</td>
                  </tr>
                  <tr>
                    <td className="text-[#EDEDED] font-bold">STAGE 03: CALLBACK</td>
                    <td className="text-[#8A8A8A]">Destination DEX Pool Flash Injection</td>
                    <td className="text-right text-[#EDEDED] tnum font-bold">180 - 200 ms</td>
                  </tr>
                  <tr className="bg-[#111111]">
                    <td className="text-[#EDEDED] font-bold">TOTAL ROUNDTRIP</td>
                    <td className="text-[#8A8A8A]">Sub-second end-to-end execution loop</td>
                    <td className="text-right text-[#E23B3B] tnum font-bold">~1.18 s</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
                    href="https://lasna.reactscan.net/address/0xA2c90BE611c9Ddcc4757B0AB0834008a71452879"
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-12 text-[#E23B3B] hover:underline"
                  >
                    0xA2c9...2879 (REACTSCAN ↗)
                  </a>
                </div>
                <p className="font-sans text-14 text-[#8A8A8A] leading-relaxed">
                  Deployed on Reactive Lasna (Chain ID 5318007). Subscribes to Uniswap swap topics (0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67), filters volume against the minimum imbalance threshold, pre-computes 150% concentrated liquidity coverage, and dispatches callbacks.
                </p>
              </div>

              <div className="p-6 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-mono text-14 font-bold text-[#EDEDED] uppercase block">
                    DestinationCallback.sol
                  </span>
                  <a
                    href="https://sepolia.basescan.org/address/0xA2c90BE611c9Ddcc4757B0AB0834008a71452879"
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-12 text-[#E23B3B] hover:underline"
                  >
                    0xA2c9...2879 (BASESCAN ↗)
                  </a>
                </div>
                <p className="font-sans text-14 text-[#8A8A8A] leading-relaxed">
                  Deployed on Base Sepolia and Unichain Sepolia. Validates authorized relayer signatures, enforces deterministic keccak256 hash deduplication to eliminate replay attacks, guards mutations with a nonReentrant mutex, and executes atomic flash liquidity injections.
                </p>
              </div>

              <div className="p-6 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-mono text-14 font-bold text-[#EDEDED] uppercase block">
                    MockPool.sol (Base Sepolia WETH-USDC)
                  </span>
                  <a
                    href="https://sepolia.basescan.org/address/0xCc5538B2F9C57Cdf075EB9C67bAcfEf8E4c2446B"
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-12 text-[#E23B3B] hover:underline"
                  >
                    0xCc55...2446B (BASESCAN ↗)
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
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default DocsPage;
