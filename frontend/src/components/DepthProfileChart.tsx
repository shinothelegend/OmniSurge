"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface TickPoint {
  price: string;
  volume: number;
  isTarget?: boolean;
}

const TICKS: TickPoint[] = [
  { price: "$3,080", volume: 14 },
  { price: "$3,090", volume: 22 },
  { price: "$3,100", volume: 38 },
  { price: "$3,110", volume: 54 },
  { price: "$3,120", volume: 72 },
  { price: "$3,130", volume: 88 },
  { price: "$3,140", volume: 100, isTarget: true },
  { price: "$3,150", volume: 78 },
  { price: "$3,160", volume: 62 },
  { price: "$3,170", volume: 44 },
  { price: "$3,180", volume: 28 },
  { price: "$3,190", volume: 16 },
];

export function DepthProfileChart() {
  const [selectedTick, setSelectedTick] = useState<string>("$3,140");

  return (
    <div id="section-04" className="py-16 border-b border-[#1E1E1E] space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2">
        <div>
          <div className="flex items-center gap-2 font-mono text-12 text-[#8A8A8A] mb-2">
            <span className="text-[#E23B3B] font-bold">( 04 )</span>
            <span className="uppercase tracking-wider">CONCENTRATED TICK DEPTH PROFILE</span>
          </div>
          <h2 className="font-sans text-28 sm:text-40 font-bold text-[#EDEDED] uppercase">
            TICK DEPTH ALLOCATION.
          </h2>
          <p className="font-sans text-14 text-[#8A8A8A] mt-1">
            WETH / USDC Pool (Tick Center: {selectedTick}) on Base Sepolia.
          </p>
        </div>
        <div className="font-mono text-12 text-[#8A8A8A] flex items-center gap-4">
          <span>ACTIVE INJECTED TICK</span>
          <span className="w-2.5 h-2.5 bg-[#E23B3B] inline-block" />
        </div>
      </div>

      {/* Monospace Histogram Container with Hairline Border */}
      <div className="border border-[#1E1E1E] p-6 sm:p-8 bg-[#0A0A0A]">
        {/* Bars Container */}
        <div className="flex items-end justify-between gap-1 sm:gap-2 h-44 sm:h-56 pt-6 pb-2">
          {TICKS.map((t) => {
            const isSelected = selectedTick === t.price;
            return (
              <div
                key={t.price}
                onClick={() => setSelectedTick(t.price)}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
              >
                {/* Bar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${t.volume}%` }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`w-full rounded-[1px] transition-colors ${
                    isSelected
                      ? "bg-[#E23B3B]"
                      : "bg-[#1E1E1E] hover:bg-[#8A8A8A]/40"
                  }`}
                />
                {/* Tick Price Label */}
                <span
                  className={`mt-3 font-mono text-12 tnum transition-colors hidden sm:block ${
                    isSelected ? "text-[#EDEDED] font-bold" : "text-[#555555] group-hover:text-[#8A8A8A]"
                  }`}
                >
                  {t.price}
                </span>
              </div>
            );
          })}
        </div>

        {/* Stats Row Separated by Hairline Borders */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 mt-8 pt-6 border-t border-[#1E1E1E]">
          <div className="p-4 border-r border-[#1E1E1E] space-y-1">
            <span className="block font-mono text-12 text-[#8A8A8A] uppercase">
              SELECTED TICK
            </span>
            <span className="block font-mono text-16 sm:text-20 font-bold text-[#EDEDED] tnum">
              {selectedTick}
            </span>
          </div>

          <div className="p-4 sm:border-r border-[#1E1E1E] space-y-1">
            <span className="block font-mono text-12 text-[#8A8A8A] uppercase">
              CAPITAL EFFICIENCY
            </span>
            <span className="block font-mono text-16 sm:text-20 font-bold text-[#EDEDED] tnum">
              96.8% (12x)
            </span>
          </div>

          <div className="p-4 border-r border-[#1E1E1E] space-y-1">
            <span className="block font-mono text-12 text-[#8A8A8A] uppercase">
              SLIPPAGE MITIGATION
            </span>
            <span className="block font-mono text-16 sm:text-20 font-bold text-[#EDEDED] tnum">
              88.4%
            </span>
          </div>

          <div className="p-4 space-y-1">
            <span className="block font-mono text-12 text-[#8A8A8A] uppercase">
              HARVEST SHARE
            </span>
            <span className="block font-mono text-16 sm:text-20 font-bold text-[#E23B3B] tnum">
              0.30%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
