"use client";

import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ReactivePipelineDAG } from "@/components/ReactivePipelineDAG";
import { DepthProfileChart } from "@/components/DepthProfileChart";
import { LiquidityPoolsSection } from "@/components/LiquidityPoolsSection";
import RemotionDemoPlayer from "@/components/RemotionDemoPlayer";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] overflow-x-hidden">
      {/* Persistent Navigation */}
      <Header />

      {/* Main Content Area */}
      <main className="relative z-10 space-y-20 md:space-y-28">
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Interactive 4-Stage Reactive Pipeline DAG */}
        <section className="shell-container">
          <ReactivePipelineDAG />
        </section>

        {/* Section 3: Concentrated Depth Histogram Profile */}
        <section className="shell-container">
          <DepthProfileChart />
        </section>

        {/* Section 4: Active Concentrated Liquidity Pools & Web3 Deposit */}
        <section className="shell-container">
          <LiquidityPoolsSection />
        </section>

        {/* Section 5: Hackathon Remotion Video Demo Player */}
        <section className="shell-container">
          <RemotionDemoPlayer />
        </section>

        {/* Section 6: Shannon Security Audit Verification */}
        <section id="audit" className="shell-container">
          <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-8 md:p-10 space-y-6 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[var(--border-subtle)] pb-6">
              <div>
                <span className="font-mono text-xs text-[var(--accent-cyan)] uppercase font-semibold">
                  WHITE-BOX SECURITY AUDIT REPORT
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--text-primary)] mt-1">
                  Shannon Security Verification (100 / 100)
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] font-mono text-xs text-[var(--accent-emerald)] font-bold">
                  0 HIGH • 0 MED • 0 LOW
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-1">
                <div className="text-[var(--text-muted)] text-[11px]">REPLAY PROTECTION</div>
                <div className="text-sm font-bold text-[var(--accent-emerald)]">PASSED</div>
                <div className="text-[var(--text-secondary)] text-[11px]">Deterministic hash deduplication</div>
              </div>
              <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-1">
                <div className="text-[var(--text-muted)] text-[11px]">REENTRANCY GUARD</div>
                <div className="text-sm font-bold text-[var(--accent-emerald)]">PASSED</div>
                <div className="text-[var(--text-secondary)] text-[11px]">nonReentrant mutex status 1-2-1</div>
              </div>
              <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-1">
                <div className="text-[var(--text-muted)] text-[11px]">CALLBACK AUTH</div>
                <div className="text-sm font-bold text-[var(--accent-emerald)]">PASSED</div>
                <div className="text-[var(--text-secondary)] text-[11px]">Authorized relayer check enforced</div>
              </div>
              <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-1">
                <div className="text-[var(--text-muted)] text-[11px]">EMERGENCY HALT</div>
                <div className="text-sm font-bold text-[var(--accent-emerald)]">PASSED</div>
                <div className="text-[var(--text-secondary)] text-[11px]">Owner pause circuit breaker active</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Persistent Footer */}
      <Footer />
    </div>
  );
}
