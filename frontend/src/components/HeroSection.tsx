"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Hero3DVisual } from "./Hero3DVisual";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden border-b border-[var(--border-subtle)]">
      <div className="shell-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Canon Typography & Action Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)]">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-emerald)] animate-pulse" />
              <span>REACTIVE OMNI BUILDATHON • TRACK: LOW LATENCY DEFI</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-[var(--text-primary)] uppercase">
              Autonomous <br />
              <span className="text-[var(--accent-cyan)]">Sub-Second</span> <br />
              JIT Liquidity.
            </h1>

            <p className="font-sans text-base sm:text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed">
              OmniSurge listens for high-volume swap events on Base Sepolia and Unichain Sepolia, computes the exact liquidity tick in ReactVM, and triggers an atomic callback to flash-deploy concentrated depth with zero directional impermanent loss.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/dashboard"
                className="btn-solid-primary text-sm font-bold !py-3 !px-6"
              >
                ENTER JIT TERMINAL →
              </Link>
              <Link
                href="/pricing"
                className="btn-solid-secondary text-sm font-medium !py-3 !px-6"
              >
                EXPLORE POOL TIERS □
              </Link>
            </div>

            {/* Protocol Core Specifications */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[var(--border-subtle)] max-w-lg font-mono text-xs">
              <div>
                <span className="text-[var(--text-muted)] uppercase block text-[11px] mb-1">
                  BLOCK SPEED
                </span>
                <span className="text-[var(--text-primary)] font-bold text-sm">
                  200ms Base / 1s Uni
                </span>
              </div>
              <div>
                <span className="text-[var(--text-muted)] uppercase block text-[11px] mb-1">
                  IL EXPOSURE
                </span>
                <span className="text-[var(--accent-emerald)] font-bold text-sm">
                  0.00% Atomic
                </span>
              </div>
              <div>
                <span className="text-[var(--text-muted)] uppercase block text-[11px] mb-1">
                  REACTIVE NETWORK
                </span>
                <span className="text-[var(--accent-cyan)] font-bold text-sm">
                  Lasna Testnet
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Architectural Vault Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <Hero3DVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
