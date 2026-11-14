"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero3DVisual } from "@/components/Hero3DVisual";
import { ReactivePipelineDAG } from "@/components/ReactivePipelineDAG";
import { LiquidityPoolsSection } from "@/components/LiquidityPoolsSection";
import RemotionDemoPlayer from "@/components/RemotionDemoPlayer";

export function LandingView() {
  return (
    <div className="relative min-h-screen bg-[#09090B] text-[#FFFFFF] overflow-x-hidden">
      {/* Persistent Navigation */}
      <Header />

      {/* Main Content Area */}
      <main className="relative z-10 pt-28 space-y-20 md:space-y-28">
        {/* ============================================================== */}
        {/* HERO SECTION: Pure Typography & Real Data                      */}
        {/* ============================================================== */}
        <section className="px-6 md:px-12 max-w-[1600px] mx-auto pt-6 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Bold Typography & Action Controls */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl leading-[1.0] text-white font-black tracking-tight uppercase">
                SMART CAPITAL. <br />
                <span className="font-script lowercase text-[#06B6D4] font-normal">
                  sub-second
                </span>{" "}
                LIQUIDITY.
              </h1>

              <p className="font-sans text-base sm:text-lg text-[#A1A1AA] max-w-2xl leading-relaxed">
                OmniSurge is a Just-In-Time liquidity protocol that reacts to pending DEX swaps on Base Sepolia and Unichain Sepolia, deploying concentrated depth directly to the active swap tick with atomic retraction in the same block.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/dashboard"
                  className="btn-solid-primary text-sm font-bold !py-3 !px-6"
                >
                  ENTER JIT TERMINAL →
                </Link>
                <Link
                  href="/pricing"
                  className="btn-solid-secondary text-sm font-medium !py-3 !px-6"
                >
                  EXPLORE POOL TIERS □
                </Link>
              </div>

              {/* Real Protocol Specifications (Clean List, No Floating Badges) */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#27272A] max-w-xl font-mono text-xs">
                <div>
                  <span className="text-[#71717A] uppercase block">BLOCK TIME</span>
                  <span className="text-white font-bold text-sm">200ms Base / 1s Unichain</span>
                </div>
                <div>
                  <span className="text-[#71717A] uppercase block">IMPERMANENT LOSS</span>
                  <span className="text-[#10B981] font-bold text-sm">0.00% Atomic</span>
                </div>
                <div>
                  <span className="text-[#71717A] uppercase block">NETWORK ORACLE</span>
                  <span className="text-[#06B6D4] font-bold text-sm">Reactive Lasna</span>
                </div>
              </div>
            </div>

            {/* Right Column: Architectural Vault Card */}
            <div className="lg:col-span-5">
              <Hero3DVisual />
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* SECTION 2: LIVE JIT REACTIVE DAG EXECUTION PIPELINE            */}
        {/* ============================================================== */}
        <section className="px-6 md:px-12 max-w-[1600px] mx-auto">
          <ReactivePipelineDAG />
        </section>

        {/* ============================================================== */}
        {/* SECTION 3: ACTIVE CONCENTRATED LIQUIDITY POOLS                 */}
        {/* ============================================================== */}
        <section className="px-6 md:px-12 max-w-[1600px] mx-auto">
          <LiquidityPoolsSection />
        </section>

        {/* ============================================================== */}
        {/* SECTION 4: HACKATHON VIDEO DEMO & REMOTION TRACE ENGINE        */}
        {/* ============================================================== */}
        <section className="px-6 md:px-12 max-w-[1600px] mx-auto">
          <RemotionDemoPlayer />
        </section>

        {/* ============================================================== */}
        {/* SECTION 5: PROTOCOL ARCHITECTURE PILLARS                       */}
        {/* ============================================================== */}
        <section className="px-6 md:px-12 max-w-[1600px] mx-auto pb-12">
          <div className="border-b border-[#27272A] pb-6 mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
              Engineered for <span className="font-script lowercase text-[#06B6D4] font-normal">absolute</span> security.
            </h2>
            <p className="text-[#A1A1AA] font-sans text-base mt-2 max-w-xl">
              Deterministic guarantees built directly into our verified smart contracts on Base Sepolia and Unichain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-2xl bg-[#121215] border border-[#27272A] space-y-3">
              <div className="w-10 h-10 rounded bg-[#18181C] border border-[#27272A] flex items-center justify-center font-display text-sm font-bold text-[#06B6D4]">
                01
              </div>
              <h3 className="font-display text-xl font-bold text-white">
                Atomic Same-Block Retraction
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed font-sans">
                Liquidity enters the active swap tick, collects the LP fee share, and is retracted atomically within the exact same block.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#121215] border border-[#27272A] space-y-3">
              <div className="w-10 h-10 rounded bg-[#18181C] border border-[#27272A] flex items-center justify-center font-display text-sm font-bold text-[#10B981]">
                02
              </div>
              <h3 className="font-display text-xl font-bold text-white">
                100/100 Shannon Audit
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed font-sans">
                Formal verification and isolated callback execution prevent flash loan exploits, reentrancy vulnerabilities, and sandwich attacks.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#121215] border border-[#27272A] space-y-3">
              <div className="w-10 h-10 rounded bg-[#18181C] border border-[#27272A] flex items-center justify-center font-display text-sm font-bold text-white">
                03
              </div>
              <h3 className="font-display text-xl font-bold text-white">
                Deterministic Cross-Chain MEV
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed font-sans">
                Reactive Lasna Network synchronizes price feeds across Base Sepolia and Unichain, protecting pools from latency arbitrage.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
