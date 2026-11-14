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
    { id: "section-07", label: "07", name: "SECURITY" },
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#EDEDED] overflow-x-clip">
      {/* Left Vertical Scroll Rail with Numbered Markers (Desktop Only) */}
      <LeftScrollRail sections={sections} />

      {/* Persistent Navigation */}
      <Header />

      {/* Main Editorial Content Area */}
      <main className="relative z-10">
        {/* Section 01: Hero */}
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

        {/* Section 07: Shannon Security Audit Verification */}
        <section id="section-07" className="shell-container py-16">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2 border-b border-[#1E1E1E] pb-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-12 text-[#8A8A8A] mb-2">
                  <span className="text-[#E23B3B] font-bold">( 07 )</span>
                  <span className="uppercase tracking-wider">WHITE-BOX SECURITY AUDIT REPORT</span>
                </div>
                <h2 className="font-sans text-28 sm:text-40 font-bold text-[#EDEDED] uppercase">
                  SHANNON SECURITY VERIFICATION.
                </h2>
              </div>
              <div className="font-mono text-12 text-[#EDEDED] font-bold">
                AUDIT SCORE: 100 / 100 (0 HIGH · 0 MED · 0 LOW)
              </div>
            </div>

            {/* Editorial Security Verification Table */}
            <div className="border border-[#1E1E1E] overflow-x-auto bg-[#0A0A0A]">
              <table className="editorial-table">
                <thead>
                  <tr>
                    <th>SECURITY VECTOR</th>
                    <th>MECHANISM</th>
                    <th className="text-right">RESULT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-[#EDEDED] font-bold">REPLAY ATTACK PROTECTION</td>
                    <td className="text-[#8A8A8A]">Deterministic keccak256 hash deduplication ring buffer</td>
                    <td className="text-right text-[#EDEDED] font-bold">PASSED</td>
                  </tr>
                  <tr>
                    <td className="text-[#EDEDED] font-bold">REENTRANCY RESISTANCE</td>
                    <td className="text-[#8A8A8A]">nonReentrant mutex status check (1-2-1 sequence lock)</td>
                    <td className="text-right text-[#EDEDED] font-bold">PASSED</td>
                  </tr>
                  <tr>
                    <td className="text-[#EDEDED] font-bold">CALLBACK AUTHORIZATION</td>
                    <td className="text-[#8A8A8A]">Cryptographic relayer and authorized system caller check</td>
                    <td className="text-right text-[#EDEDED] font-bold">PASSED</td>
                  </tr>
                  <tr>
                    <td className="text-[#EDEDED] font-bold">EMERGENCY PAUSE CIRCUIT</td>
                    <td className="text-[#8A8A8A]">Owner-controlled pause latch blocking flash withdrawals</td>
                    <td className="text-right text-[#EDEDED] font-bold">PASSED</td>
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
