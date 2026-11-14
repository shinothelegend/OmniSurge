"use client";

import { motion } from "framer-motion";

export function TiltedWall() {
  // 12 curated crypto/architecture/editorial abstract tiles
  const tiles = [
    { title: "LASNA TESTNET", sub: "REACTIVITY 01", height: "h-48" },
    { title: "CROSS-CHAIN MEV", sub: "SURGE DEPTH 02", height: "h-64" },
    { title: "UNICHAIN FLASH", sub: "TICK 03", height: "h-52" },
    { title: "BASE SEPOLIA", sub: "200MS BLOCKS 04", height: "h-72" },
    { title: "REACTIVE CALLBACK", sub: "ARBITRAGE 05", height: "h-56" },
    { title: "CONCENTRATED TILES", sub: "PROFIT 06", height: "h-60" },
    { title: "SHANNON 100/100", sub: "VERIFIED 07", height: "h-48" },
    { title: "ZERO SLIPPAGE", sub: "EXECUTION 08", height: "h-64" },
    { title: "UNISWAP V3 POOLS", sub: "LIQUIDITY 09", height: "h-52" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.16] z-[2]">
      <div
        className="relative w-[150%] h-[150%] -left-[25%] -top-[25%] flex gap-6"
        style={{ transform: "rotate(-26deg)" }}
      >
        {/* Column 1 drifting upward */}
        <motion.div
          animate={{ y: [0, -120, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="flex flex-col gap-6 w-1/3"
        >
          {tiles.slice(0, 3).map((tile, i) => (
            <div
              key={i}
              className={`${tile.height} bg-[#141414] border border-white/20 rounded-[8px] p-4 flex flex-col justify-between grayscale contrast-125 scanlines-overlay hover:grayscale-0 transition-all duration-500`}
            >
              <div className="font-mono text-[9px] text-[#D9A8CB] tracking-[0.15em]">
                {tile.sub}
              </div>
              <div className="font-display text-sm tracking-tight text-white/80">
                {tile.title}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Column 2 drifting downward */}
        <motion.div
          animate={{ y: [-100, 40, -100] }}
          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
          className="flex flex-col gap-6 w-1/3 pt-12"
        >
          {tiles.slice(3, 6).map((tile, i) => (
            <div
              key={i}
              className={`${tile.height} bg-[#181818] border border-white/25 rounded-[8px] p-4 flex flex-col justify-between grayscale contrast-125 scanlines-overlay hover:grayscale-0 transition-all duration-500`}
            >
              <div className="font-mono text-[9px] text-[#E0342B] tracking-[0.15em]">
                {tile.sub}
              </div>
              <div className="font-display text-sm tracking-tight text-white/90">
                {tile.title}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Column 3 drifting upward */}
        <motion.div
          animate={{ y: [0, -140, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex flex-col gap-6 w-1/3"
        >
          {tiles.slice(6, 9).map((tile, i) => (
            <div
              key={i}
              className={`${tile.height} bg-[#111111] border border-white/20 rounded-[8px] p-4 flex flex-col justify-between grayscale contrast-125 scanlines-overlay hover:grayscale-0 transition-all duration-500`}
            >
              <div className="font-mono text-[9px] text-[#D9A8CB] tracking-[0.15em]">
                {tile.sub}
              </div>
              <div className="font-display text-sm tracking-tight text-white/80">
                {tile.title}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
