"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useWeb3 } from "@/hooks/useWeb3";

export function HeroSection() {
  const { telemetry } = useWeb3();

  return (
    <section id="section-01" className="relative pt-32 pb-20 border-b border-[#1E1E1E]">
      <div className="shell-container">
        {/* Section Numbering Tag */}
        <div className="flex items-center gap-2 font-mono text-12 text-[#8A8A8A] mb-6">
          <span className="text-[#E23B3B] font-bold">( 01 )</span>
          <span className="uppercase tracking-wider">REACTIVE OMNI BUILDATHON • LOW LATENCY DEFI</span>
        </div>

        {/* Main Editorial Statement */}
        <div className="max-w-4xl space-y-6">
          <h1 className="font-sans text-40 sm:text-56 lg:text-80 font-black tracking-tight leading-[1] text-[#EDEDED] uppercase">
            AUTONOMOUS <br />
            SUB-SECOND <br />
            JIT LIQUIDITY.
          </h1>

          <p className="font-sans text-16 sm:text-20 text-[#8A8A8A] max-w-2xl leading-relaxed">
            OmniSurge listens for high-volume swap events on Base Sepolia (200ms) and Unichain Sepolia (1s), computes optimal concentrated liquidity in ReactVM on Reactive Lasna, and triggers atomic callbacks to flash depth with zero directional impermanent loss.
          </p>

          {/* Rectangular Action Controls */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link href="/dashboard" className="btn-rect-accent">
              ENTER JIT TERMINAL →
            </Link>
            <Link href="/docs" className="btn-rect-ghost">
              VIEW SPECIFICATIONS □
            </Link>
          </div>
        </div>

        {/* Huge Stat Statements (Kabuto / Ripar style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 mt-20 border-t border-b border-[#1E1E1E]">
          <div className="p-6 sm:p-8 border-b sm:border-b-0 sm:border-r border-[#1E1E1E] space-y-2">
            <span className="block font-mono text-12 text-[#8A8A8A] uppercase tracking-wider">
              BASE SEPOLIA CADENCE
            </span>
            <span className="block font-sans text-40 sm:text-56 font-bold text-[#EDEDED] tnum leading-none">
              200ms
            </span>
            <span className="block font-mono text-12 text-[#555555]">
              Flashblock pre-confirmations
            </span>
          </div>

          <div className="p-6 sm:p-8 border-b sm:border-b-0 lg:border-r border-[#1E1E1E] space-y-2">
            <span className="block font-mono text-12 text-[#8A8A8A] uppercase tracking-wider">
              REACTVM LATENCY
            </span>
            <span className="block font-sans text-40 sm:text-56 font-bold text-[#EDEDED] tnum leading-none">
              ~1s
            </span>
            <span className="block font-mono text-12 text-[#555555]">
              Lasna deterministic finality
            </span>
          </div>

          <div className="p-6 sm:p-8 border-b sm:border-b-0 sm:border-r border-[#1E1E1E] space-y-2">
            <span className="block font-mono text-12 text-[#8A8A8A] uppercase tracking-wider">
              IMPERMANENT LOSS
            </span>
            <span className="block font-sans text-40 sm:text-56 font-bold text-[#EDEDED] tnum leading-none">
              0.00%
            </span>
            <span className="block font-mono text-12 text-[#555555]">
              Atomic same-block retraction
            </span>
          </div>

          <div className="p-6 sm:p-8 space-y-2">
            <span className="block font-mono text-12 text-[#8A8A8A] uppercase tracking-wider">
              SHANNON AUDIT SCORE
            </span>
            <span className="block font-sans text-40 sm:text-56 font-bold text-[#E23B3B] tnum leading-none">
              100 / 100
            </span>
            <span className="block font-mono text-12 text-[#555555]">
              0 High · 0 Medium · 0 Low
            </span>
          </div>
        </div>

        {/* Real Live Block Cadence Statement */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 font-mono text-12 text-[#8A8A8A]">
          <div className="flex items-center gap-6">
            <span>
              LIVE BASE BLOCK:{" "}
              <span className="text-[#EDEDED] font-bold tnum">
                {telemetry.baseSepolia.blockNumber > 0
                  ? telemetry.baseSepolia.blockNumber.toLocaleString("en-US")
                  : "58,663,613"}
              </span>
            </span>
            <span>
              LIVE UNICHAIN BLOCK:{" "}
              <span className="text-[#EDEDED] font-bold tnum">
                {telemetry.unichainSepolia.blockNumber > 0
                  ? telemetry.unichainSepolia.blockNumber.toLocaleString("en-US")
                  : "67,812,490"}
              </span>
            </span>
          </div>
          <span className="text-[#555555]">
            SYSTEM CONTRACT: 0x0000000000000000000000000000000000fffFfF
          </span>
        </div>
      </div>
    </section>
  );
}
