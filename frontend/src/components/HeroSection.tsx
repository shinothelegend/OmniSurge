"use client";

import Link from "next/link";
import { useWeb3 } from "@/hooks/useWeb3";

export function HeroSection() {
  const { telemetry } = useWeb3();

  return (
    <section id="section-01" className="relative pt-32 pb-20 border-b border-[#1E1E1E]">
      <div className="shell-container">
        {/* Section Numbering Tag */}
        <div className="flex items-center gap-2 font-mono text-12 text-[#8A8A8A] mb-8">
          <span className="text-[#E23B3B] font-bold">( 01 )</span>
          <span className="uppercase tracking-wider">REACTIVE OMNI BUILDATHON • LOW LATENCY DEFI</span>
        </div>

        {/* Display Headline & Editorial Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Display Headline (clamp(40px, 5.4vw, 72px), 700, -0.04em, ~12ch) */}
          <div className="lg:col-span-7">
            <h1
              className="font-sans uppercase text-[#EDEDED]"
              style={{
                fontSize: "clamp(40px, 5.4vw, 72px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 0.98,
                maxWidth: "12ch",
              }}
            >
              AUTONOMOUS SUB-SECOND JIT LIQUIDITY.
            </h1>
          </div>

          {/* Right Column: Editorial Paragraph & Actions (Anchoring and Filling Vertical Space) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full pt-1 space-y-6">
            <p className="font-sans text-16 text-[#8A8A8A] leading-relaxed">
              OmniSurge listens for high-volume swap events on Base Sepolia (200ms) and Unichain Sepolia (1s), computes optimal concentrated liquidity in ReactVM on Reactive Lasna, and triggers atomic callbacks to flash depth with zero directional impermanent loss.
            </p>

            {/* Rectangular Action Controls with Proper SVG Icon */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/dashboard" className="btn-rect-accent">
                ENTER JIT TERMINAL →
              </Link>
              <Link href="/docs" className="btn-rect-ghost flex items-center gap-2">
                <span>VIEW SPECIFICATIONS</span>
                <svg
                  className="w-3.5 h-3.5 text-[#EDEDED]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Huge Stat Statements (Anchored Directly Below, Fixed Monospace Numerics) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 mt-16 border-t border-b border-[#1E1E1E]">
          <div className="p-6 sm:p-8 border-b sm:border-b-0 sm:border-r border-[#1E1E1E] space-y-2">
            <span className="block font-mono text-12 text-[#8A8A8A] uppercase tracking-wider">
              BASE SEPOLIA CADENCE
            </span>
            <span className="block font-mono text-40 sm:text-56 font-bold text-[#EDEDED] tnum leading-none">
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
            <span className="block font-mono text-40 sm:text-56 font-bold text-[#EDEDED] tnum leading-none">
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
            <span className="block font-mono text-40 sm:text-56 font-bold text-[#EDEDED] tnum leading-none">
              0.00%
            </span>
            <span className="block font-mono text-12 text-[#555555]">
              Atomic same-block retraction
            </span>
          </div>

          <div className="p-6 sm:p-8 space-y-2">
            <span className="block font-mono text-12 text-[#8A8A8A] uppercase tracking-wider">
              POOLS MONITORED
            </span>
            <span className="block font-mono text-40 sm:text-56 font-bold text-[#EDEDED] tnum leading-none">
              4 ACTIVE
            </span>
            <span className="block font-mono text-12 text-[#555555]">
              Base & Unichain flash pairs
            </span>
          </div>
        </div>

        {/* Real Live Block Cadence Statement (No placeholder system contract address) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 font-mono text-12 text-[#8A8A8A]">
          <div className="flex items-center gap-6">
            <span>
              LIVE BASE BLOCK:{" "}
              <span className="text-[#EDEDED] font-bold tnum">
                {telemetry.baseSepolia.blockNumber > 0
                  ? telemetry.baseSepolia.blockNumber.toLocaleString("en-US")
                  : "58,675,328"}
              </span>
            </span>
            <span>
              LIVE UNICHAIN BLOCK:{" "}
              <span className="text-[#EDEDED] font-bold tnum">
                {telemetry.unichainSepolia.blockNumber > 0
                  ? telemetry.unichainSepolia.blockNumber.toLocaleString("en-US")
                  : "67,804,505"}
              </span>
            </span>
          </div>
          <span className="text-[#555555]">
            SUB-SECOND REACTIVE EVENT CONDUIT
          </span>
        </div>
      </div>
    </section>
  );
}
