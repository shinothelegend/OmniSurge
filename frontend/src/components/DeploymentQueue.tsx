"use client";

import React from "react";
import { CheckCircle2, RotateCcw, Zap } from "lucide-react";
import { motion } from "framer-motion";

export interface DeploymentRow {
  id: string;
  tokenBadge: string;
  pair: string;
  swapVolume: string;
  surgeVolume: string;
  surgeTag: string;
  latencyMs: number;
  feeEarned: string;
}

interface DeploymentQueueProps {
  totalSettled?: number;
}

export default function DeploymentQueue({ totalSettled = 503 }: DeploymentQueueProps) {
  const queueRows: DeploymentRow[] = [
    {
      id: "surge-101",
      tokenBadge: "UNI",
      pair: "WETH/USDC",
      swapVolume: "25.0 ETH",
      surgeVolume: "37.5 ETH",
      surgeTag: "#surge-",
      latencyMs: 1972,
      feeEarned: "+0.0750 ETH",
    },
    {
      id: "surge-102",
      tokenBadge: "UNI",
      pair: "WETH/USDC",
      swapVolume: "50.0 ETH",
      surgeVolume: "75.0 ETH",
      surgeTag: "#surge-",
      latencyMs: 2000,
      feeEarned: "+0.1500 ETH",
    },
    {
      id: "surge-103",
      tokenBadge: "UNI",
      pair: "WETH/USDC",
      swapVolume: "40.0 ETH",
      surgeVolume: "60.0 ETH",
      surgeTag: "#surge-",
      latencyMs: 1969,
      feeEarned: "+0.1200 ETH",
    },
    {
      id: "surge-104",
      tokenBadge: "UNI",
      pair: "WETH/USDC",
      swapVolume: "25.0 ETH",
      surgeVolume: "37.5 ETH",
      surgeTag: "#surge-",
      latencyMs: 1998,
      feeEarned: "+0.0750 ETH",
    },
    {
      id: "surge-105",
      tokenBadge: "UNI",
      pair: "WETH/USDC",
      swapVolume: "25.0 ETH",
      surgeVolume: "37.5 ETH",
      surgeTag: "#surge-",
      latencyMs: 1986,
      feeEarned: "+0.0750 ETH",
    },
  ];

  return (
    <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col justify-between font-sans relative">
      <div>
        {/* Header: Title & Total Settled Pill (Matching Image 14 exactly) */}
        <div className="flex items-start justify-between pb-5 border-b border-white/5">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.18em] text-neon-cyan font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block shadow-[0_0_8px_#34D399]" />
              <span>AUTONOMOUS LIQUIDITY PIPELINE</span>
            </div>
            <div className="flex items-center space-x-2 mt-1.5">
              <RotateCcw className="h-5 w-5 text-neon-cyan shrink-0 animate-[spin_12s_linear_infinite]" />
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Live JIT Deployment & Withdrawal Queue
              </h3>
            </div>
            <p className="text-sm text-gray-400 mt-1 font-sans">
              Concentrated positions dynamically injected and atomically retracted back to reserves.
            </p>
          </div>

          <div className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-gray-400 font-medium shrink-0 ml-3">
            Total Settled: <span className="text-[#38BDF8] font-bold text-sm">{totalSettled}</span>
          </div>
        </div>

        {/* Rows: 5 dark cards with smooth Framer Motion animations */}
        <div className="pt-4 space-y-3">
          {queueRows.map((row, idx) => (
            <motion.div
              key={row.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              whileHover={{ scale: 1.008, borderColor: "rgba(255, 255, 255, 0.15)" }}
              className="bg-[#0C0C0C] border border-white/5 rounded-xl p-4 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 sm:gap-4 transition-all"
            >
              {/* Col 1: Token Badge & Pair + Volumes */}
              <div className="flex items-center space-x-3.5 shrink-0">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-xs font-mono shadow-md">
                  {row.tokenBadge}
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-sans tracking-tight">
                    {row.pair}
                  </div>
                  <div className="text-xs text-gray-400 font-mono mt-0.5 flex items-center gap-1.5">
                    <span>Swap: {row.swapVolume}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-neon-cyan font-semibold">Surge: {row.surgeVolume}</span>
                  </div>
                </div>
              </div>

              {/* Col 2: Tag */}
              <div className="hidden md:block shrink-0">
                <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-xs font-mono text-gray-400">
                  {row.surgeTag}
                </span>
              </div>

              {/* Col 3: Latency */}
              <div className="text-left shrink-0">
                <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">
                  Latency
                </div>
                <div className="text-xs sm:text-sm font-semibold text-emerald-400 font-mono flex items-center gap-1 mt-0.5">
                  <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                  <span>{row.latencyMs} ms</span>
                </div>
              </div>

              {/* Col 4: Fee Earned */}
              <div className="text-right shrink-0">
                <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">
                  Fee Earned
                </div>
                <div className="text-xs sm:text-sm font-bold text-emerald-400 font-mono tabular-nums mt-0.5">
                  {row.feeEarned}
                </div>
              </div>

              {/* Col 5: Completed Button (Hollow Pill with checkmark) */}
              <div className="shrink-0">
                <div className="border border-emerald-500/40 text-emerald-400 bg-emerald-500/[0.08] text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 font-sans font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Completed</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
