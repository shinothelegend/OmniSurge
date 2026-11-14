"use client";

import React from "react";
import { Layers } from "lucide-react";
import { motion } from "framer-motion";

interface PoolDynamicsProps {
  isSurging?: boolean;
}

export default function PoolDynamics({ isSurging = true }: PoolDynamicsProps) {
  const ticks = [
    { price: 3080, height: 16 },
    { price: 3090, height: 26 },
    { price: 3100, height: 40 },
    { price: 3110, height: 58 },
    { price: 3120, height: 82 },
    { price: 3130, height: 116 },
    { price: 3140, height: 164, isActive: true }, // The active tick
    { price: 3150, height: 110 },
    { price: 3160, height: 78 },
    { price: 3170, height: 54 },
    { price: 3180, height: 38 },
    { price: 3190, height: 24 },
    { price: 3200, height: 14 },
  ];

  return (
    <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col justify-between font-sans relative">
      <div>
        {/* Header: Title & JIT Surge State (Matching Image 14 exactly) */}
        <div className="flex items-start justify-between pb-5 border-b border-white/5">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.18em] text-neon-cyan font-semibold">
              <Layers className="h-4 w-4" />
              <span>CONCENTRATED POOL DYNAMICS</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1.5 tracking-tight">
              JIT Liquidity Surge Profile
            </h3>
            <p className="text-sm text-gray-400 mt-1 font-sans">
              Real-time depth reinforcement on WETH/USDC active tick ($3,140.00).
            </p>
          </div>

          <div className="text-right font-mono shrink-0 pl-4">
            <div className="text-[10px] uppercase tracking-[0.16em] text-gray-500 font-semibold">
              JIT SURGE STATE
            </div>
            <div className="text-xs text-gray-500 mt-1">STANDBY</div>
            <div className="text-xs text-neon-cyan font-bold flex items-center justify-end gap-1.5 mt-0.5">
              <span>REBALANCED</span>
              <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_8px_#00F0FF]" />
            </div>
          </div>
        </div>

        {/* The 13-Bar Gaussian Histogram Chart */}
        <div className="pt-12 pb-4">
          <div className="h-48 flex items-end justify-between gap-2 px-1 relative border-b border-white/5 pb-2">
            {ticks.map((t, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full relative group">
                {/* Active Tooltip / Label directly above the cyan bar */}
                {t.isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute -top-14 z-20 flex flex-col items-center"
                  >
                    <div className="bg-[#00F0FF] text-black px-2.5 py-1 rounded text-xs font-mono font-extrabold shadow-[0_0_16px_rgba(0,240,255,0.6)] text-center leading-tight">
                      <div>Active</div>
                      <div>$3,140</div>
                    </div>
                    <div className="w-[1.5px] h-3 bg-[#00F0FF] shadow-[0_0_8px_rgba(0,240,255,0.5)]" />
                  </motion.div>
                )}

                {/* The Bar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${t.height}px` }}
                  transition={{ duration: 0.6, delay: idx * 0.03, ease: [0.16, 1, 0.3, 1] }}
                  className={`w-full max-w-[28px] rounded-t-sm transition-all ${
                    t.isActive
                      ? "bg-[#00F0FF] shadow-[0_0_24px_rgba(0,240,255,0.5)]"
                      : "bg-white/10 hover:bg-white/25"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Micro-typography X-Axis Labels */}
          <div className="flex justify-between px-1 pt-2.5 font-mono text-[10px] text-gray-500">
            {ticks.map((t, idx) => (
              <span
                key={idx}
                className={`w-full max-w-[28px] text-center ${
                  t.isActive ? "text-[#00F0FF] font-bold" : ""
                }`}
              >
                {t.price}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom of Card: 3 metric boxes with bg-[#050505] (Exact match to Image 14) */}
      <div className="grid grid-cols-3 gap-3 pt-4">
        <div className="bg-[#050505] rounded-xl p-3.5 border border-white/5 transition hover:border-white/10">
          <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
            Slippage Mitigation
          </div>
          <div className="text-xl sm:text-2xl font-bold text-neon-cyan font-mono mt-1 tracking-tight">
            -88.4%
          </div>
          <div className="text-xs text-gray-500 mt-1 font-sans">
            vs unprotected swaps
          </div>
        </div>

        <div className="bg-[#050505] rounded-xl p-3.5 border border-white/5 transition hover:border-white/10">
          <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
            Concentration Multiplier
          </div>
          <div className="text-xl sm:text-2xl font-bold text-neon-cyan font-mono mt-1 tracking-tight">
            150.0%
          </div>
          <div className="text-xs text-gray-500 mt-1 font-sans">
            volume coverage bps
          </div>
        </div>

        <div className="bg-[#050505] rounded-xl p-3.5 border border-white/5 transition hover:border-white/10">
          <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
            Rebalance Latency
          </div>
          <div className="text-xl sm:text-2xl font-bold text-pink-400 font-mono mt-1 tracking-tight">
            Instantaneous
          </div>
          <div className="text-xs text-gray-500 mt-1 font-sans">
            atomic flash rebalance
          </div>
        </div>
      </div>
    </div>
  );
}
