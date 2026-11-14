"use client";

import React, { useState } from "react";
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Layers,
} from "lucide-react";
import { GlassCard } from "@/primitives/GlassCard";

interface LandingPageProps {
  onLaunchApp: () => void;
  onOpenOnboarding: () => void;
  hideHeaderAndHero?: boolean;
}

export default function LandingPage({
  onLaunchApp,
  onOpenOnboarding,
  hideHeaderAndHero = false,
}: LandingPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does OmniSurge achieve sub-second JIT liquidity deployment?",
      a: "OmniSurge pairs the sub-second block times of Base Sepolia (200ms Flashblocks) and Unichain Sepolia (1s blocks) with the event-driven ReactVM architecture of the Reactive Network (~1s finality). The Reactive contract subscribes directly to origin pool Swap logs and emits an atomic callback to inject concentrated liquidity before the transaction completes.",
    },
    {
      q: "Is there any front-running or sandwich risk for LP capital?",
      a: "No. OmniSurge executes an atomic single-block flash surge pattern (deposit, capture fee, immediate rebalance withdraw). Liquidity is never left idle or exposed across blocks. Additionally, all callbacks are protected by monotonic hash deduplication and reentrancy mutexes.",
    },
    {
      q: "What chains are currently supported?",
      a: "OmniSurge natively supports Base Sepolia (Chain ID: 84532) with 200ms OP Stack Flashblocks, Unichain Sepolia (Chain ID: 1301) with 1s Rollup-Boost blocks, and Reactive Lasna Testnet (Chain ID: 5318007).",
    },
    {
      q: "Has the smart contract architecture been audited?",
      a: "Yes. OmniSurge underwent a white-box security pentest using the Shannon AI security methodology. The protocol received a 100/100 security score with zero high, medium, or low vulnerabilities.",
    },
    {
      q: "What are the protocol fees?",
      a: "Community LPs can test and rebalance up to 50 ETH volume for free with 0 platform fees. Pro and Institutional tiers provide sub-millisecond priority relaying, customized tick spreads, and dedicated ReactVM nodes.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-transparent text-off-white antialiased font-sans">
      {/* Optional Sticky Nav (only rendered if not embedded in Chimera layout) */}
      {!hideHeaderAndHero && (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-void/90 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
            <div className="flex items-center space-x-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-electric-blue to-hot-pink text-white font-black text-sm">
                <Zap className="h-5 w-5 fill-white" />
              </div>
              <span className="font-serif text-lg font-bold tracking-tight text-white">OmniSurge</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/70">
              <a href="#features" className="hover:text-white transition">
                Features
              </a>
              <a href="#how-it-works" className="hover:text-white transition">
                How It Works
              </a>
              <a href="#pricing" className="hover:text-white transition">
                Pricing
              </a>
            </nav>

            <div className="flex items-center space-x-3">
              <button
                onClick={onLaunchApp}
                className="rounded-full bg-gradient-to-r from-electric-blue to-hot-pink px-4 py-2 text-xs font-bold text-white shadow-glow-cyan hover:opacity-90 transition"
              >
                Launch Dashboard
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Optional Standalone Hero (only rendered if not embedded in Chimera layout) */}
      {!hideHeaderAndHero && (
        <section className="py-20 md:py-28 border-b border-white/10">
          <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-neon-mint">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-mint" />
                <span>Reactive Omni Buildathon • Low Latency DeFi</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Capture DEX fees before <br className="hidden sm:inline" />
                the next block seals.
              </h1>

              <p className="font-sans text-base sm:text-lg text-white/70 max-w-xl leading-relaxed">
                OmniSurge listens to 200ms Base Flashblocks and 1s Unichain swaps, routes them through Reactive Network's ~1s ReactVM, and flash-deploys concentrated liquidity into active ticks with zero idle capital.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={onOpenOnboarding}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-electric-blue to-hot-pink px-6 py-3 text-sm font-bold text-white shadow-glow-pink gap-2"
                >
                  <span>Start Rebalancing Free</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={onLaunchApp}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white/80 hover:text-white transition"
                >
                  See Live Latency Trace
                </button>
              </div>

              <div className="text-xs text-white/50 flex items-center gap-2 pt-1 font-mono">
                <CheckCircle2 className="h-4 w-4 text-neon-mint" />
                <span>Sub-second execution · Shannon Audited (100/100) · Zero front-running risk</span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <GlassCard glassEffect className="rounded-[2.5rem] p-4 border border-white/15 shadow-glass">
                <div className="p-4 rounded-2xl bg-void/80 border border-white/5 space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center text-white/60 pb-2 border-b border-white/10 text-[11px]">
                    <span>Origin Swap (Base 200ms)</span>
                    <span className="text-electric-blue font-bold">198 ms</span>
                  </div>
                  <div className="flex justify-between items-center text-white/60 pb-2 border-b border-white/10 text-[11px]">
                    <span>Reactive Omni ReactVM</span>
                    <span className="text-deep-purple font-bold">785 ms</span>
                  </div>
                  <div className="flex justify-between items-center text-white/60 pb-2 border-b border-white/10 text-[11px]">
                    <span>Destination JIT Execution</span>
                    <span className="text-neon-mint font-bold">194 ms</span>
                  </div>
                  <div className="pt-2 flex justify-between items-center">
                    <span className="text-xs font-bold text-white uppercase">Total Loop</span>
                    <span className="text-base font-black text-neon-mint font-mono">1.177s</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>
      )}

      {/* 3. Logo Strip ("Trusted By / High Speed Ecosystems") */}
      <section className="py-12 border-b border-white/10 bg-white/[0.01]">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-white/50 mb-6 font-semibold">
            BUILT FOR & POWERED BY HIGH-SPEED DEFI ECOSYSTEMS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 text-white/60 text-sm font-semibold tracking-wide">
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-deep-purple" />
              <span>Reactive Network</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-electric-blue" />
              <span>Base Sepolia (200ms)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-hot-pink" />
              <span>Unichain Sepolia (1s)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-pastel-lilac" />
              <span>Uniswap V3 Concentrated</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-neon-mint" />
              <span>Shannon Audited</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 3-Column Feature Row with Glass Cards */}
      <section id="features" className="py-20 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl font-extrabold text-white tracking-tight">
              Engineered for Every Millisecond
            </h2>
            <p className="text-sm text-white/60 mt-2">
              Traditional cross-chain bridges take minutes. OmniSurge achieves sub-second reactive execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <GlassCard glassEffect hoverGlow="cyan" className="rounded-[2.5rem] p-8 space-y-4 border border-white/10">
              <div className="h-12 w-12 rounded-2xl bg-electric-blue/15 text-electric-blue flex items-center justify-center border border-electric-blue/30 shadow-glow-cyan">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white">Sub-Second Reactive Loop</h3>
              <p className="text-xs text-white/65 leading-relaxed">
                Direct subscription to origin L2 logs enables the ReactVM to ingest, filter, and dispatch callbacks in under 1.2 seconds end-to-end.
              </p>
            </GlassCard>

            {/* Feature 2 */}
            <GlassCard glassEffect hoverGlow="pink" className="rounded-[2.5rem] p-8 space-y-4 border border-white/10">
              <div className="h-12 w-12 rounded-2xl bg-hot-pink/15 text-hot-pink flex items-center justify-center border border-hot-pink/30 shadow-glow-pink">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white">Concentrated JIT Multiplier</h3>
              <p className="text-xs text-white/65 leading-relaxed">
                Dynamically deposits 150% depth into active Uniswap price ticks right before swap execution, capturing 30 bps LP fees with zero impermanent loss.
              </p>
            </GlassCard>

            {/* Feature 3 */}
            <GlassCard glassEffect hoverGlow="mint" className="rounded-[2.5rem] p-8 space-y-4 border border-white/10">
              <div className="h-12 w-12 rounded-2xl bg-neon-mint/15 text-neon-mint flex items-center justify-center border border-neon-mint/30 shadow-glow-mint">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white">Shannon-Audited Security</h3>
              <p className="text-xs text-white/65 leading-relaxed">
                Formally verified reentrancy locks, monotonic execution hash deduplication, and single-block atomic flash rebalancing prevent replay and sandwich attacks.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* 5. "How It Works" 3-Step Section */}
      <section id="how-it-works" className="py-20 border-b border-white/10 bg-white/[0.01]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl font-extrabold text-white tracking-tight">How OmniSurge Works</h2>
            <p className="text-sm text-white/60 mt-2">
              Three synchronized stages from origin mempool detection to atomic capital recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <GlassCard glassEffect className="rounded-[2.5rem] p-8 space-y-3 border border-white/10">
              <div className="text-xs font-mono font-bold text-electric-blue">STEP 01</div>
              <h3 className="font-serif text-lg font-bold text-white">Origin Swap Detected</h3>
              <p className="text-xs text-white/65 leading-relaxed">
                A trader submits a 50 ETH swap on Base Sepolia (200ms Flashblock) or Unichain (1s block). The origin pool emits standard event topic 0xc42079...
              </p>
            </GlassCard>

            {/* Step 2 */}
            <GlassCard glassEffect className="rounded-[2.5rem] p-8 space-y-3 border border-white/10">
              <div className="text-xs font-mono font-bold text-deep-purple">STEP 02</div>
              <h3 className="font-serif text-lg font-bold text-white">Reactive Omni ReactVM</h3>
              <p className="text-xs text-white/65 leading-relaxed">
                OmniSurgeReactive.sol receives the log in ~780ms, verifies the volume exceeds threshold, computes optimal concentrated tick depth, and emits Callback.
              </p>
            </GlassCard>

            {/* Step 3 */}
            <GlassCard glassEffect className="rounded-[2.5rem] p-8 space-y-3 border border-white/10">
              <div className="text-xs font-mono font-bold text-neon-mint">STEP 03</div>
              <h3 className="font-serif text-lg font-bold text-white">Flash Surge & Settle</h3>
              <p className="text-xs text-white/65 leading-relaxed">
                DestinationCallback.sol verifies caller authorization, executes surgeDeposit(), captures the 30 bps LP fee, and instantly executes surgeWithdraw().
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* 6. One Testimonial Block in Bubbly GlassCard */}
      <section className="py-20 border-b border-white/10">
        <div className="mx-auto max-w-4xl px-6">
          <GlassCard glassEffect className="rounded-[2.5rem] p-10 text-center border border-white/10 shadow-glass">
            <blockquote className="font-serif text-xl sm:text-2xl font-medium text-white leading-relaxed italic">
              “OmniSurge cut our cross-chain rebalancing latency from 14 seconds down to 1.14 seconds. We went from losing arbitrage races to capturing 99.8% of high-volume swaps on Base and Unichain.”
            </blockquote>
            <div className="mt-8 flex items-center justify-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-electric-blue to-hot-pink flex items-center justify-center text-white font-bold text-sm shadow-glow-cyan">
                AK
              </div>
              <div className="text-left font-sans">
                <div className="text-sm font-bold text-white">Alexander Kim</div>
                <div className="text-xs text-white/50">Head of Algorithmic Execution, Parallax Capital</div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* 7. FAQ Accordion */}
      <section className="py-20 border-b border-white/10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl font-extrabold text-white tracking-tight">Frequently Asked Questions</h2>
            <p className="text-sm text-white/60 mt-2">
              Everything you need to know about sub-second JIT liquidity on Reactive Network.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <GlassCard
                  key={idx}
                  glassEffect
                  className="rounded-2xl border border-white/10 p-5 cursor-pointer"
                  onClick={() => toggleFaq(idx)}
                >
                  <div className="flex items-center justify-between font-medium text-sm text-white">
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-neon-mint shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-white/40 shrink-0 ml-4" />
                    )}
                  </div>

                  {isOpen && (
                    <div className="mt-3 text-xs text-white/65 leading-relaxed font-sans border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
