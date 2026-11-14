"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

export function PricingView() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plans = [
    {
      name: "STANDARD NODE",
      desc: "For individual arbitrageurs and single-pool concentrated liquidity providers.",
      priceMonthly: "$15",
      priceAnnual: "$12",
      featured: false,
      features: [
        "Base Sepolia (200ms) mempool surveillance",
        "Up to 3 active Uniswap V3/V4 pools",
        "Reactive Lasna standard execution lane",
        "Slippage mitigation up to 50%",
        "Standard JSON-RPC latency telemetry",
      ],
      cta: "START STANDARD NODE →",
    },
    {
      name: "PROFESSIONAL PRO",
      desc: "Maximum speed for high-volume automated market makers and flash rebalancers.",
      priceMonthly: "$28",
      priceAnnual: "$22",
      featured: true,
      features: [
        "Unichain + Base dual-chain priority",
        "Unlimited active concentrated positions",
        "Sub-second Reactive callback priority lane",
        "Slippage mitigation up to 88.4%",
        "Instant atomic flash rebalancing",
        "24/7 dedicated Telegram & Discord alerts",
      ],
      cta: "ACTIVATE PRO LANE →",
    },
    {
      name: "INSTITUTIONAL ENTERPRISE",
      desc: "Tailored private infrastructure for hedge funds and high-frequency market makers.",
      priceMonthly: "CUSTOM",
      priceAnnual: "CUSTOM",
      featured: false,
      features: [
        "Co-located Reactive Network validator node",
        "Private mempool flash liquidity hooks",
        "Custom MEV arbitrage routing logic",
        "Custom SLA guarantee & zero-loss audit backing",
        "Direct integration with institutional custody",
      ],
      cta: "CONTACT PROTOCOL TEAM →",
    },
  ];

  const faqs = [
    {
      q: "How does OmniSurge eliminate impermanent loss?",
      a: "Traditional liquidity stays in the pool exposed to market drift. OmniSurge uses Reactive Network to inject concentrated depth Just-In-Time right when a swap is pending, and immediately retracts it once the swap settles, earning fees with virtually zero market exposure.",
    },
    {
      q: "What networks are currently supported?",
      a: "OmniSurge is active on Base Sepolia (200ms blocks) and Unichain Sepolia (1s blocks), orchestrated by Reactive Lasna Testnet. Mainnet deployment will support Base, Unichain, Arbitrum, and Ethereum mainnets.",
    },
    {
      q: "Can I cancel or upgrade my tier at any time?",
      a: "Yes. All subscriptions are handled via Web3 smart contract streams. Upgrades take effect immediately across all reactive oracle listeners.",
    },
    {
      q: "How are protocol contracts verified?",
      a: "All OmniSurge contracts have undergone formal security verification by Shannon, receiving a 100/100 audit score with non-reentrant execution and zero loss guarantees.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] overflow-x-hidden">
      <Header />

      <main className="relative z-10 pt-28 pb-28 shell-container space-y-12">
        {/* Header Title & Billing Toggle */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[var(--text-primary)] leading-[1.05]">
            Choose Your <br />
            <span className="text-[var(--accent-cyan)] font-normal">Deployment</span> Tier.
          </h1>

          <p className="font-sans text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto">
            Scale your concentrated liquidity injection with sub-second finality on Base Sepolia and Unichain.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="flex items-center p-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] font-mono text-xs">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-3 py-1.5 rounded-md font-bold transition-colors ${
                  billingCycle === "monthly"
                    ? "bg-[var(--accent-cyan)] text-[#09090B]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-3 py-1.5 rounded-md font-bold transition-colors ${
                  billingCycle === "annual"
                    ? "bg-[var(--accent-cyan)] text-[#09090B]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                Annual (20% Off)
              </button>
            </div>
          </div>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`rounded-2xl p-7 flex flex-col justify-between transition-all shadow-sm ${
                plan.featured
                  ? "bg-[var(--bg-card)] border-2 border-[var(--accent-cyan)]"
                  : "bg-[var(--bg-surface)] border border-[var(--border-subtle)]"
              }`}
            >
              <div className="space-y-5">
                <div>
                  <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                    {plan.name}
                  </h3>
                  <p className="font-sans text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                    {plan.desc}
                  </p>
                </div>

                <div className="pt-2 pb-4 border-b border-[var(--border-subtle)]">
                  <div className="font-display text-4xl font-black text-[var(--text-primary)]">
                    {billingCycle === "monthly" ? plan.priceMonthly : plan.priceAnnual}
                  </div>
                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    / month, billed {billingCycle}
                  </span>
                </div>

                <div className="space-y-2.5 font-mono text-xs text-[var(--text-secondary)]">
                  <span className="text-[11px] font-bold text-[var(--text-primary)] uppercase block">
                    INCLUDED CAPABILITIES:
                  </span>
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2">
                      <span className="text-[var(--accent-emerald)] font-bold">✓</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href="/dashboard"
                  className={`w-full block text-center font-display font-bold text-xs uppercase py-3 rounded-lg transition-colors ${
                    plan.featured
                      ? "btn-solid-primary"
                      : "btn-solid-secondary"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto space-y-6 pt-10 border-t border-[var(--border-subtle)]">
          <div className="text-center space-y-1">
            <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] uppercase">
              Frequently Answered Questions
            </h2>
            <p className="font-sans text-xs text-[var(--text-secondary)]">
              Common queries regarding protocol execution and settlement.
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-4 cursor-pointer"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div className="flex justify-between items-center text-[var(--text-primary)] font-bold">
                    <span>{faq.q}</span>
                    <span className="text-[var(--accent-cyan)] text-base">{isOpen ? "−" : "+"}</span>
                  </div>
                  {isOpen && (
                    <p className="mt-3 text-[var(--text-secondary)] font-sans text-xs leading-relaxed pt-2 border-t border-[var(--border-subtle)]">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
