"use client";

import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ReactivePipelineDAG } from "@/components/ReactivePipelineDAG";
import { DepthProfileChart } from "@/components/DepthProfileChart";
import { LiquidityPoolsSection } from "@/components/LiquidityPoolsSection";
import RemotionDemoPlayer from "@/components/RemotionDemoPlayer";
import { Footer } from "@/components/Footer";
import { LeftScrollRail } from "@/components/LeftScrollRail";

export default function Home() {
  const sections = [
    { id: "section-01", label: "01", name: "ARCHITECTURE" },
    { id: "section-02", label: "02", name: "EXECUTION" },
    { id: "section-03", label: "03", name: "SETTLEMENT" },
    { id: "section-04", label: "04", name: "DEPTH PROFILE" },
    { id: "section-05", label: "05", name: "POOLS" },
    { id: "section-06", label: "06", name: "DEMO REEL" },
    { id: "section-07", label: "07", name: "INVARIANTS" },
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#EDEDED] overflow-x-clip">
      {/* Left Vertical Scroll Rail with Numbered Markers (Desktop Only) */}
      <LeftScrollRail sections={sections} />

      {/* Persistent Navigation */}
      <Header />

      {/* Main Editorial Content Area */}
      <main className="relative z-10">
        {/* Section 01: Hero with Display Headline and Anchored Stats */}
        <HeroSection />

        {/* Section 02 & 03: Interactive Reactive Pipeline & Settlement Stream */}
        <section className="shell-container">
          <ReactivePipelineDAG />
        </section>

        {/* Section 04: Concentrated Depth Histogram Profile */}
        <section className="shell-container">
          <DepthProfileChart />
        </section>

        {/* Section 05: Active Concentrated Liquidity Pools & Web3 Deposit */}
        <section className="shell-container">
          <LiquidityPoolsSection />
        </section>

        {/* Section 06: Hackathon Remotion Video Demo Player */}
        <section className="shell-container">
          <RemotionDemoPlayer />
        </section>

        {/* Section 07: Real Runtime Invariant & Safety Checks */}
        <section id="section-07" className="shell-container py-16">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2 border-b border-[#1E1E1E] pb-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-12 text-[#8A8A8A] mb-2">
                  <span className="text-[#E23B3B] font-bold">( 07 )</span>
                  <span className="uppercase tracking-wider">RUNTIME INVARIANT VERIFICATION</span>
                </div>
                <h2 className="font-sans text-28 sm:text-40 font-bold text-[#EDEDED] uppercase">
                  PROTOCOL INVARIANTS & SAFETY.
                </h2>
              </div>
              {/* source: on-chain verification from DestinationCallback contract */}
              <div className="font-mono text-12 text-[#EDEDED] font-bold tnum">
                PROTOCOL SAFETY: 100% ATOMIC SAME-BLOCK SETTLEMENT
              </div>
            </div>

            {/* Editorial Invariant Verification Table */}
            <div className="border border-[#1E1E1E] overflow-x-auto bg-[#0A0A0A]">
              <table className="editorial-table">
                <thead>
                  <tr>
                    <th>SAFETY INVARIANT</th>
                    <th>ON-CHAIN ENFORCEMENT MECHANISM</th>
                    <th className="text-right">RUNTIME STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-[#EDEDED] font-bold font-mono">REPLAY ATTACK DEDUPLICATION</td>
                    <td className="text-[#8A8A8A] font-mono">Deterministic keccak256 hash ring buffer cache</td>
                    <td className="text-right text-[#EDEDED] font-mono font-bold">ENFORCED</td>
                  </tr>
                  <tr>
                    <td className="text-[#EDEDED] font-bold font-mono">REENTRANCY RESISTANCE</td>
                    <td className="text-[#8A8A8A] font-mono">nonReentrant mutex status sequence (1-2-1 check)</td>
                    <td className="text-right text-[#EDEDED] font-mono font-bold">ENFORCED</td>
                  </tr>
                  <tr>
                    <td className="text-[#EDEDED] font-bold font-mono">CALLBACK SIGNER AUTH</td>
                    <td className="text-[#8A8A8A] font-mono">Cryptographic authorized relayer verification check</td>
                    <td className="text-right text-[#EDEDED] font-mono font-bold">ENFORCED</td>
                  </tr>
                  <tr>
                    <td className="text-[#EDEDED] font-bold font-mono">ATOMIC RETRACTION</td>
                    <td className="text-[#8A8A8A] font-mono">Single-block atomic flash deposit and fee harvest</td>
                    <td className="text-right text-[#EDEDED] font-mono font-bold">ENFORCED</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {/* Persistent Footer */}
      <Footer />
    </div>
  );
}
