"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Zap, CheckCircle2, ShieldCheck, Clock, Sparkles } from "lucide-react";
import AnimatedKeyword from "@/components/AnimatedKeyword";

interface ChimeraHeroProps {
  onLaunchLiveTrace: () => void;
  onOpenOnboarding: () => void;
  activeLoop?: "base" | "unichain";
}

export default function ChimeraHero({
  onLaunchLiveTrace,
  onOpenOnboarding,
  activeLoop = "unichain",
}: ChimeraHeroProps) {
  const isBase = activeLoop === "base";

  return (
    <section className="relative pt-6 pb-14 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: The Hero Section (Left of Image 13) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center space-x-2.5 rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-sans font-semibold text-gray-300 tracking-wider uppercase">
              Reactive Omni Buildathon • Low Latency DeFi
            </span>
          </div>

          {/* Primary NT Ubuntu Serif Headline with inline Pink Cursive "Unleashed" (Rule 3, 5, 6, 7, 14) */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white font-normal tracking-tight leading-[1.08]">
            JIT Flash Liquidity <br />
            <span className="inline-flex items-center gap-2">
              Rebalancer
              <AnimatedKeyword
                word="Unleashed"
                color="#EC4899"
                className="text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)] ml-2"
              />
            </span>
          </h1>

          {/* Description (Rule 15, 65): max-w-xl text-gray-400 */}
          <p className="font-sans text-base sm:text-lg text-gray-400 max-w-xl leading-relaxed">
            OmniSurge captures DEX swap fees before the next block seals. ReactVM subscribes to 200ms Base Flashblocks and 1s Unichain swaps, flash-injecting concentrated liquidity with zero idle capital.
          </p>

          {/* Buttons: Solid pill & Hollow pill (Rule 16) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onLaunchLiveTrace}
              className="inline-flex items-center justify-center rounded-full bg-white text-black font-sans text-sm font-bold px-7 py-3.5 hover:bg-gray-100 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] gap-2"
            >
              <span>Explore Live Reactive Trace</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenOnboarding}
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.02] hover:bg-white/[0.06] text-white font-sans text-sm font-semibold px-6 py-3.5 transition-all duration-300 gap-2"
            >
              <Zap className="h-4 w-4 text-neon-cyan" />
              <span>Simulate Rebalancer Flow</span>
            </motion.button>
          </div>

          {/* Three checkmark metrics below buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-gray-400 font-sans">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Shannon Audited (100/100)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Clock className="h-4 w-4 text-neon-cyan" />
              <span>Sub-Second Finality</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="h-4 w-4 text-pink-400" />
              <span>Replay Deduplication</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Telemetry Loop Card (Right of Image 13, Rules 17-21, 85, 87) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="w-full max-w-md bg-[#0A0A0A] border-[0.5px] border-white/10 rounded-2xl p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] relative overflow-hidden font-sans">
            {/* Card Title & Block Pill */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-white/[0.04] text-neon-cyan border border-white/10">
                  <Activity className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-white tracking-wide">
                    Live Telemetry Loop
                  </h3>
                  <div className="text-[11px] text-gray-500 font-sans">
                    {isBase ? "Base Sepolia Flashblocks" : "Unichain Rollup-Boost"}
                  </div>
                </div>
              </div>

              <div className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-neon-cyan font-medium">
                {isBase ? "200ms Blocks" : "1.0s Blocks"}
              </div>
            </div>

            {/* Rows with border-b border-white/5 and right-aligned metrics (Rule 20, 21, 85) */}
            <div className="divide-y divide-white/5 font-sans text-xs">
              {/* Row 1: Origin Swap */}
              <div className="py-3.5 flex items-center justify-between">
                <div className="flex items-center space-x-2.5 text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-neon-cyan" />
                  <span>1. Origin Swap Event</span>
                </div>
                <span className="font-mono text-xs font-bold text-neon-cyan tabular-nums">
                  {isBase ? "198 ms" : "982 ms"}
                </span>
              </div>

              {/* Row 2: ReactVM Consensus */}
              <div className="py-3.5 flex items-center justify-between">
                <div className="flex items-center space-x-2.5 text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-pastel-lilac" />
                  <span>2. ReactVM Consensus</span>
                </div>
                <span className="font-mono text-xs font-bold text-pastel-lilac tabular-nums">
                  785 ms
                </span>
              </div>

              {/* Row 3: Destination Callback */}
              <div className="py-3.5 flex items-center justify-between">
                <div className="flex items-center space-x-2.5 text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>3. JIT Flash Execution</span>
                </div>
                <span className="font-mono text-xs font-bold text-emerald-400 tabular-nums">
                  {isBase ? "194 ms" : "192 ms"}
                </span>
              </div>
            </div>

            {/* Bottom: Total Roundtrip Latency & Fee Captured (Rule 87) */}
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">
                  Total Roundtrip Latency
                </div>
                <div className="text-xs text-emerald-400 font-medium flex items-center gap-1.5 mt-0.5">
                  <Sparkles className="h-3 w-3" />
                  <span>+0.0750 ETH Fee Captured</span>
                </div>
              </div>

              <div className="text-right">
                <div className="font-mono text-3xl font-black text-white tabular-nums tracking-tight">
                  {isBase ? "1.177s" : "1.959s"}
                </div>
                <div className="text-[10px] text-gray-500 font-sans">
                  Sub-Second Finality
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
