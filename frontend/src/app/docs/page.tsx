"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function DocsPage() {
  return (
    <div className="relative min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] overflow-x-hidden">
      <Header />

      <main className="relative z-10 pt-28 pb-28 shell-container max-w-4xl space-y-12">
        {/* Title */}
        <div className="space-y-4 border-b border-[var(--border-subtle)] pb-6">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[var(--accent-cyan)] font-semibold uppercase">
            <span>01 / PROTOCOL SPECIFICATIONS</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[var(--text-primary)] leading-[1.05]">
            OmniSurge Documentation
          </h1>
          <p className="font-sans text-base text-[var(--text-secondary)] leading-relaxed">
            Autonomous Just-In-Time concentrated liquidity rebalancer designed for sub-second cross-chain arbitrage and LP fee capture on Base Sepolia and Unichain Sepolia, coordinated via Reactive Lasna.
          </p>
        </div>

        {/* Section 1: Executive Overview */}
        <section className="space-y-4">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)] uppercase">
            01. Architecture & Execution Loop
          </h2>
          <p className="font-sans text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            By pairing ultra-fast Layer 2 block times (Base Sepolia’s 200ms Flashblocks and Unichain Sepolia’s 1s blocks) with the event-driven execution architecture of the Reactive Network (~1s finality), OmniSurge listens for pool imbalance swap events, computes the optimal concentrated liquidity tick range in ReactVM, and triggers an atomic callback to flash-deploy liquidity right into the active tick before instantly rebalancing out to safe reserves.
          </p>

          <div className="rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-5 font-mono text-xs text-[var(--text-secondary)] space-y-2">
            <div className="font-bold text-[var(--text-primary)]">PROTOCOL TIMING BREAKDOWN</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                <span className="text-[10px] text-[var(--text-muted)] block">STAGE 1: DETECTION</span>
                <span className="font-bold text-[var(--accent-cyan)]">190 - 200 ms</span>
                <span className="text-[11px] block text-[var(--text-muted)]">Base Sepolia 200ms blocks</span>
              </div>
              <div className="p-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                <span className="text-[10px] text-[var(--text-muted)] block">STAGE 2: REACTVM</span>
                <span className="font-bold text-[var(--accent-emerald)]">740 - 790 ms</span>
                <span className="text-[11px] block text-[var(--text-muted)]">Reactive Lasna finality</span>
              </div>
              <div className="p-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                <span className="text-[10px] text-[var(--text-muted)] block">STAGE 3: CALLBACK</span>
                <span className="font-bold text-[var(--accent-cyan)]">180 - 200 ms</span>
                <span className="text-[11px] block text-[var(--text-muted)]">Atomic JIT execution</span>
              </div>
            </div>
            <div className="pt-2 text-right text-[var(--accent-emerald)] font-bold">
              Total End-to-End Latency: ~1.18s
            </div>
          </div>
        </section>

        {/* Section 2: Smart Contract Suite */}
        <section className="space-y-4">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)] uppercase">
            02. Smart Contract Suite
          </h2>
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
              <h3 className="font-display font-bold text-base text-[var(--text-primary)]">
                OmniSurgeReactive.sol (RSC)
              </h3>
              <p className="font-sans text-xs text-[var(--text-secondary)] leading-relaxed">
                Deployed on the Reactive Network (Lasna Testnet, Chain ID 5318007). Subscribes to Uniswap V2/V3 Swap events (<code className="text-[var(--accent-cyan)]">0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67</code>), filters volume against minimum imbalance threshold, pre-computes target liquidity depth, and emits standard Reactive Callback event back to destination chain.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
              <h3 className="font-display font-bold text-base text-[var(--text-primary)]">
                DestinationCallback.sol
              </h3>
              <p className="font-sans text-xs text-[var(--text-secondary)] leading-relaxed">
                Deployed on destination chains (Base Sepolia and Unichain Sepolia). Validates authorized caller and relayer signatures, guards with nonReentrant mutex, verifies hash deduplication to prevent replay attacks, deposits JIT depth, harvests LP fees, and records latency benchmarks in an on-chain ring buffer.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
              <h3 className="font-display font-bold text-base text-[var(--text-primary)]">
                MockPool.sol
              </h3>
              <p className="font-sans text-xs text-[var(--text-secondary)] leading-relaxed">
                Emulates concentrated liquidity pools with active tick depths, swaps, and single-block atomic JIT deposit-withdraw flash loops.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Security & Verification */}
        <section className="space-y-4">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)] uppercase">
            03. Shannon White-Box Security Assessment
          </h2>
          <div className="p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center text-[var(--text-primary)] font-bold pb-2 border-b border-[var(--border-subtle)]">
              <span>SECURITY AUDIT RESULT</span>
              <span className="text-[var(--accent-emerald)]">100 / 100 PASSED</span>
            </div>
            <ul className="space-y-1.5 text-[var(--text-secondary)]">
              <li>✓ Unauthorized Access: Reverts with Unauthorized Caller</li>
              <li>✓ Replay Protection: Deterministic Hash Deduplication mapping</li>
              <li>✓ Reentrancy Guard: nonReentrant Status Mutex (1 -&gt; 2 -&gt; 1)</li>
              <li>✓ Circuit Breaker: Emergency Pause state immediately halts all actions</li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
