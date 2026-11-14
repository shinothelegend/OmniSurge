"use client";

import { motion } from "framer-motion";

export function Hero3DVisual() {
  return (
    <div className="w-full max-w-[480px] mx-auto select-none">
      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="rounded-2xl p-7 bg-[var(--bg-surface)] border border-[var(--border-card)] shadow-lg space-y-6"
      >
        {/* Card Header: Brand Monogram & Subhead */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[var(--accent-cyan)] flex items-center justify-center text-[#09090B] font-display font-black text-base shadow-sm">
              Ω
            </div>
            <div>
              <span className="font-display text-sm tracking-wider text-[var(--text-primary)] font-bold block">
                OMNISURGE VAULT
              </span>
              <span className="font-mono text-[11px] text-[var(--text-secondary)] uppercase">
                Base & Unichain Liquidity
              </span>
            </div>
          </div>

          <span className="font-mono text-xs text-[var(--accent-emerald)] font-semibold">
            184ms Finality
          </span>
        </div>

        {/* Center: Hardware Chip & Telemetry */}
        <div className="py-2 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
            {/* Solid Gold EMV Chip */}
            <div className="w-12 h-9 rounded bg-[#D97706] border border-[#F59E0B] p-1 flex flex-col justify-between shadow-xs">
              <div className="h-[1px] bg-[#78350F] w-full" />
              <div className="h-[1px] bg-[#78350F] w-full" />
              <div className="h-[1px] bg-[#78350F] w-full" />
            </div>

            <div className="font-mono text-xs text-[var(--text-secondary)]">
              Reactive Lasna Route
            </div>
          </div>

          {/* Active Pool Info Box */}
          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-[var(--text-secondary)]">
              <span>ACTIVE PAIR</span>
              <span className="text-[var(--accent-emerald)] font-semibold">Atomic Cycle</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="font-display text-xl text-[var(--text-primary)] font-bold">
                WETH / USDC
              </span>
              <span className="font-mono text-xl text-[var(--accent-emerald)] font-bold">
                +48.6% APY
              </span>
            </div>
            <div className="h-1.5 w-full bg-[var(--border-subtle)] rounded-full overflow-hidden mt-1">
              <div className="h-full bg-[var(--accent-cyan)] rounded-full w-[85%]" />
            </div>
          </div>

          {/* Telemetry Stats Grid */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
              <span className="block font-mono text-[10px] text-[var(--text-muted)] uppercase">
                BASE SEPOLIA
              </span>
              <span className="font-mono text-xs text-[var(--text-primary)] font-semibold">
                200ms Flashblocks
              </span>
            </div>
            <div className="p-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
              <span className="block font-mono text-[10px] text-[var(--text-muted)] uppercase">
                UNICHAIN SEPOLIA
              </span>
              <span className="font-mono text-xs text-[var(--text-primary)] font-semibold">
                1s Fast Blocks
              </span>
            </div>
          </div>
        </div>

        {/* Card Footer: Address & Audit Score */}
        <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between font-mono text-xs text-[var(--text-secondary)]">
          <div>
            <span className="block text-[10px] text-[var(--text-muted)] uppercase">VAULT ADDRESS</span>
            <span className="text-[var(--text-primary)] font-medium">0x71C...882E</span>
          </div>
          <div className="text-right">
            <span className="block text-[10px] text-[var(--text-muted)] uppercase">AUDIT VERIFICATION</span>
            <span className="text-[var(--accent-cyan)] font-semibold">Shannon 100/100</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
