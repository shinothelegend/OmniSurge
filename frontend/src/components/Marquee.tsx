"use client";

import { motion } from "framer-motion";

interface MarqueeProps {
  items?: string[];
  speed?: number;
}

export function Marquee({
  items = [
    "JUST-IN-TIME CONCENTRATED LIQUIDITY",
    "SUB-SECOND REACTIVE FINALITY",
    "BASE SEPOLIA 200MS BLOCKS",
    "UNICHAIN SEPOLIA 1S FLASH POOLS",
    "ATOMIC FLASH REBALANCING",
    "ZERO-SLIPPAGE MEV MITIGATION",
  ],
  speed = 35,
}: MarqueeProps) {
  return (
    <div className="relative w-full overflow-hidden border-y border-[#EDE8E0]/15 py-5 bg-[#070707] group select-none">
      <div className="flex w-max space-x-14 animate-marquee group-hover:[animation-play-state:paused]">
        {/* Render twice for continuous loop */}
        {[...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-5 text-sm md:text-base font-mono tracking-[0.08em] text-[#EDE8E0]/90 uppercase whitespace-nowrap font-medium"
          >
            <span className="text-[#D9A8CB] font-bold text-base md:text-lg">
              ( {String((idx % items.length) + 1).padStart(2, "0")} )
            </span>
            <span className="font-semibold text-[#EDE8E0]">{item}</span>
            <span className="text-[#E0342B] text-base">✦</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee ${speed}s linear infinite;
        }
      `}</style>
    </div>
  );
}
