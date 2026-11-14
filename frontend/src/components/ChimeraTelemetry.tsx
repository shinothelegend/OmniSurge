"use client";

import React from "react";
import { DollarSign, Award, Clock, Activity, TrendingUp } from "lucide-react";

interface ChimeraTelemetryProps {
  totalVolumeEth?: number;
  totalFeesEth?: number;
  completedExecutions?: number;
  activeLoop?: "base" | "unichain";
}

export default function ChimeraTelemetry({
  totalVolumeEth = 11045.5,
  totalFeesEth = 33.137,
  completedExecutions = 563,
  activeLoop = "unichain",
}: ChimeraTelemetryProps) {
  const isBase = activeLoop === "base";

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
      {/* Card 1: Volume Protected (Purple sparkline) */}
      <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-medium">
              Volume Protected
            </span>
            <div className="p-1.5 rounded-lg bg-white/[0.03] text-gray-400 border border-white/5">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="font-sans text-3xl sm:text-4xl font-bold text-white tabular-nums tracking-tight">
            $144,796
          </div>

          <div className="text-xs text-gray-400 mt-2 flex items-center gap-1 font-sans">
            <TrendingUp className="w-3.5 h-3.5 text-pastel-lilac" />
            <span>{totalVolumeEth.toFixed(1)} ETH routed</span>
          </div>
        </div>

        {/* Purple Gradient Sparkline clipped to absolute bottom */}
        <div className="mt-4 -mx-6 -mb-6 h-12 overflow-hidden pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 200 48" preserveAspectRatio="none">
            <defs>
              <linearGradient id="statPurpleWash" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A855F7" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#A855F7" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M0,38 Q35,32 70,24 T130,22 T170,10 L200,6 L200,48 L0,48 Z"
              fill="url(#statPurpleWash)"
            />
            <path
              d="M0,38 Q35,32 70,24 T130,22 T170,10 L200,6"
              fill="none"
              stroke="#A855F7"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Card 2: LP Fees Captured (Green/Cyan sparkline) */}
      <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-medium">
              LP Fees Captured
            </span>
            <div className="p-1.5 rounded-lg bg-white/[0.03] text-gray-400 border border-white/5">
              <Award className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="font-sans text-3xl sm:text-4xl font-bold text-emerald-400 tabular-nums tracking-tight">
            +{totalFeesEth.toFixed(3)} ETH
          </div>

          <div className="text-xs text-gray-400 mt-2 font-sans">
            ~$104,500 USD captured
          </div>
        </div>

        {/* Green/Cyan Gradient Sparkline */}
        <div className="mt-4 -mx-6 -mb-6 h-12 overflow-hidden pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 200 48" preserveAspectRatio="none">
            <defs>
              <linearGradient id="statGreenWash" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M0,36 Q40,30 80,24 T140,16 T180,6 L200,2 L200,48 L0,48 Z"
              fill="url(#statGreenWash)"
            />
            <path
              d="M0,36 Q40,30 80,24 T140,16 T180,6 L200,2"
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Card 3: Avg Reactive Latency (Orange sparkline) */}
      <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-medium">
              Avg Reactive Latency
            </span>
            <div className="p-1.5 rounded-lg bg-white/[0.03] text-gray-400 border border-white/5">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="font-sans text-3xl sm:text-4xl font-bold text-white tabular-nums tracking-tight">
            {isBase ? "1.14s" : "1.89s"}
          </div>

          <div className="text-xs text-gray-400 mt-2 font-sans">
            {isBase ? "Base 200ms Blocks" : "Unichain 1.0s Blocks"}
          </div>
        </div>

        {/* Orange Gradient Sparkline */}
        <div className="mt-4 -mx-6 -mb-6 h-12 overflow-hidden pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 200 48" preserveAspectRatio="none">
            <defs>
              <linearGradient id="statOrangeWash" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F97316" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#F97316" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M0,22 Q50,24 100,20 T160,20 L200,16 L200,48 L0,48 Z"
              fill="url(#statOrangeWash)"
            />
            <path
              d="M0,22 Q50,24 100,20 T160,20 L200,16"
              fill="none"
              stroke="#F97316"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Card 4: Rebalancing Surges (Yellow sparkline) */}
      <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-medium">
              Rebalancing Surges
            </span>
            <div className="p-1.5 rounded-lg bg-white/[0.03] text-gray-400 border border-white/5">
              <Activity className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="font-sans text-3xl sm:text-4xl font-bold text-white tabular-nums tracking-tight">
            {completedExecutions}
          </div>

          <div className="text-xs text-gray-400 mt-2 flex items-center gap-1.5 font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            <span>99.8% Success Rate</span>
          </div>
        </div>

        {/* Yellow/Amber Gradient Sparkline */}
        <div className="mt-4 -mx-6 -mb-6 h-12 overflow-hidden pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 200 48" preserveAspectRatio="none">
            <defs>
              <linearGradient id="statYellowWash" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EAB308" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#EAB308" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M0,35 Q40,30 80,26 T140,18 T180,10 L200,6 L200,48 L0,48 Z"
              fill="url(#statYellowWash)"
            />
            <path
              d="M0,35 Q40,30 80,26 T140,18 T180,10 L200,6"
              fill="none"
              stroke="#EAB308"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
