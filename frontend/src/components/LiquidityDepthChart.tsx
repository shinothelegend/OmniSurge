"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, TrendingUp, ShieldCheck, Zap } from "lucide-react";

interface LiquidityDepthChartProps {
  isSurging: boolean;
  volumeEth: number;
  activeLoop: "base" | "unichain";
}

export default function LiquidityDepthChart({
  isSurging,
  volumeEth,
  activeLoop,
}: LiquidityDepthChartProps) {
  // 13 Concentrated Price Ticks
  const ticks = [
    { price: 3080, baseDepth: 45, surgeBoost: 0 },
    { price: 3090, baseDepth: 62, surgeBoost: 0 },
    { price: 3100, baseDepth: 85, surgeBoost: 10 },
    { price: 3110, baseDepth: 120, surgeBoost: 25 },
    { price: 3120, baseDepth: 180, surgeBoost: 60 },
    { price: 3130, baseDepth: 290, surgeBoost: 140 },
    { price: 3140, baseDepth: 420, surgeBoost: isSurging ? 280 : 0, isActiveTick: true }, // Current Active Tick
    { price: 3150, baseDepth: 310, surgeBoost: 150 },
    { price: 3160, baseDepth: 195, surgeBoost: 70 },
    { price: 3170, baseDepth: 130, surgeBoost: 30 },
    { price: 3180, baseDepth: 90, surgeBoost: 15 },
    { price: 3190, baseDepth: 65, surgeBoost: 0 },
    { price: 3200, baseDepth: 40, surgeBoost: 0 },
  ];

  return (
    <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 shadow-xl flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Concentrated Pool Dynamics
            </span>
          </div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" />
            JIT Liquidity Surge Profile
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time depth reinforcement on WETH/USDC active tick ($3,140.00).
          </p>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-slate-400">JIT Surge State</div>
            <div className="text-xs font-bold font-mono">
              {isSurging ? (
                <span className="text-emerald-400 flex items-center gap-1 justify-end">
                  <Zap className="w-3.5 h-3.5 fill-emerald-400" />
                  SURGE ACTIVE (+{volumeEth * 1.5} ETH)
                </span>
              ) : (
                <span className="text-slate-500">STANDBY REBALANCED</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Depth Histogram */}
      <div className="relative h-56 w-full flex items-end justify-between gap-1.5 sm:gap-2 pt-6 pb-2 border-b border-white/10">
        {/* Active Price Marker Line */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-cyan-400/60 z-20 pointer-events-none flex flex-col items-center">
          <span className="px-2 py-0.5 rounded bg-cyan-400 text-black font-mono text-[10px] font-black -mt-3 shadow-[0_0_15px_rgba(6,182,212,0.8)]">
            Active $3,140
          </span>
        </div>

        {ticks.map((t, idx) => {
          const totalDepth = t.baseDepth + (isSurging ? t.surgeBoost : 0);
          const heightPercent = Math.min(100, (totalDepth / 700) * 100);
          const surgeHeightPercent = isSurging && t.surgeBoost > 0 ? (t.surgeBoost / totalDepth) * 100 : 0;

          return (
            <div key={idx} className="flex-1 h-full flex flex-col justify-end items-center group relative">
              {/* Tooltip */}
              <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-white/10 px-2 py-1 rounded text-[10px] font-mono text-white pointer-events-none z-30 whitespace-nowrap shadow-xl">
                ${t.price} | {totalDepth} ETH
              </div>

              {/* Bar Stack */}
              <motion.div
                className="w-full rounded-t-sm relative overflow-hidden flex flex-col justify-end"
                animate={{ height: `${heightPercent}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  background: t.isActiveTick
                    ? "rgba(6, 182, 212, 0.3)"
                    : "rgba(148, 163, 184, 0.15)",
                }}
              >
                {/* JIT Concentrated Boost Portion */}
                {isSurging && t.surgeBoost > 0 && (
                  <motion.div
                    className="w-full bg-gradient-to-t from-emerald-500 to-cyan-400 shadow-[0_0_15px_rgba(52,211,153,0.6)]"
                    initial={{ height: "0%" }}
                    animate={{ height: `${surgeHeightPercent}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                )}
              </motion.div>

              {/* Tick price label */}
              <span className={`text-[9px] font-mono mt-1.5 ${t.isActiveTick ? "text-cyan-400 font-bold" : "text-slate-500"}`}>
                {t.price}
              </span>
            </div>
          );
        })}
      </div>

      {/* Chart Footer Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-2">
        <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5">
          <div className="text-[10px] uppercase font-mono text-slate-400">Slippage Mitigation</div>
          <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">-88.4%</div>
          <div className="text-[10px] text-slate-500">vs unprotected swaps</div>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5">
          <div className="text-[10px] uppercase font-mono text-slate-400">Concentration Multiplier</div>
          <div className="text-base font-bold text-cyan-400 font-mono mt-0.5">150.0%</div>
          <div className="text-[10px] text-slate-500">volume coverage bps</div>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5">
          <div className="text-[10px] uppercase font-mono text-slate-400">Rebalance Latency</div>
          <div className="text-base font-bold text-purple-400 font-mono mt-0.5">Instantaneous</div>
          <div className="text-[10px] text-slate-500">atomic flash rebalance</div>
        </div>
      </div>
    </div>
  );
}
