"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface TickData {
  tick: string;
  price: string;
  height: number;
  active?: boolean;
}

const INITIAL_TICKS: TickData[] = [
  { tick: "#01", price: "$3,080", height: 22 },
  { tick: "#02", price: "$3,090", height: 35 },
  { tick: "#03", price: "$3,100", height: 48 },
  { tick: "#04", price: "$3,110", height: 65 },
  { tick: "#05", price: "$3,120", height: 82 },
  { tick: "#06", price: "$3,130", height: 94 },
  { tick: "#07", price: "$3,140", height: 100, active: true },
  { tick: "#08", price: "$3,150", height: 86 },
  { tick: "#09", price: "$3,160", height: 68 },
  { tick: "#10", price: "$3,170", height: 52 },
  { tick: "#11", price: "$3,180", height: 36 },
  { tick: "#12", price: "$3,190", height: 20 },
];

export function DepthProfileChart() {
  const [selectedTick, setSelectedTick] = useState<number>(6);

  return (
    <div className="w-full rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 md:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
            Concentrated Tick Depth Allocation
          </h3>
          <p className="font-mono text-xs text-[var(--accent-cyan)] mt-0.5">
            WETH / USDC Pool • Active Tick Focus: {INITIAL_TICKS[selectedTick].price}
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent-emerald)] font-semibold">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-emerald)] animate-pulse" />
          <span>Active Injected JIT Depth</span>
        </div>
      </div>

      {/* Visual Depth Bars with 60fps Animation */}
      <div className="h-60 flex items-end justify-between gap-1.5 md:gap-3 pt-6 pb-2 px-1">
        {INITIAL_TICKS.map((pt, idx) => {
          const isSelected = selectedTick === idx;
          return (
            <div
              key={pt.tick}
              onClick={() => setSelectedTick(idx)}
              className="flex-1 flex flex-col items-center h-full justify-end cursor-pointer group"
            >
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${pt.height}%` }}
                transition={{ duration: 0.8, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full rounded-t transition-colors ${
                  pt.active
                    ? "bg-[var(--accent-cyan)] shadow-sm"
                    : isSelected
                    ? "bg-[var(--accent-emerald)]"
                    : "bg-[var(--bg-card)] group-hover:bg-[var(--border-card)]"
                }`}
              />
              <span className="font-mono text-[10px] text-[var(--text-muted)] mt-2 hidden md:block">
                {pt.price}
              </span>
            </div>
          );
        })}
      </div>

      {/* Depth Summary Footer */}
      <div className="pt-4 border-t border-[var(--border-subtle)] grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs text-[var(--text-secondary)]">
        <div>
          <span className="text-[var(--text-muted)] block text-[10px] uppercase">SELECTED TICK</span>
          <span className="font-bold text-[var(--text-primary)] text-sm">
            {INITIAL_TICKS[selectedTick].price}
          </span>
        </div>
        <div>
          <span className="text-[var(--text-muted)] block text-[10px] uppercase">CAPITAL EFFICIENCY</span>
          <span className="font-bold text-[var(--accent-emerald)] text-sm">96.8% (12x)</span>
        </div>
        <div>
          <span className="text-[var(--text-muted)] block text-[10px] uppercase">SLIPPAGE MITIGATION</span>
          <span className="font-bold text-[var(--accent-cyan)] text-sm">88.4%</span>
        </div>
        <div>
          <span className="text-[var(--text-muted)] block text-[10px] uppercase">ATOMIC HARVEST</span>
          <span className="font-bold text-[var(--text-primary)] text-sm">0.30% Swap Share</span>
        </div>
      </div>
    </div>
  );
}
