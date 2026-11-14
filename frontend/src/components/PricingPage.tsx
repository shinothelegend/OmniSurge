"use client";

import React, { useState } from "react";
import { Check, X, ChevronDown, ChevronUp, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { GlassCard } from "@/primitives/GlassCard";
import AnimatedKeyword from "@/components/AnimatedKeyword";

interface PricingPageProps {
  onSelectTier: (tier: string) => void;
}

export default function PricingPage({ onSelectTier }: PricingPageProps) {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const plans = [
    {
      id: "starter",
      name: "Community LP",
      monthlyPrice: 0,
      annualPrice: 0,
      description: "For testing JIT rebalancing & hackathon experimentation on Base and Unichain testnets.",
      cta: "Start Free",
      isPopular: false,
      glowColor: "cyan" as const,
      features: [
        { text: "Up to 50 ETH monthly volume", included: true },
        { text: "Base Sepolia & Unichain Sepolia access", included: true },
        { text: "Public Reactive Relayer pool (~1.2s avg)", included: true },
        { text: "Web dashboard telemetry & event logs", included: true },
        { text: "Custom tick width concentration", included: false },
        { text: "Dedicated ReactVM gas relayer node", included: false },
        { text: "Sub-millisecond priority queue", included: false },
        { text: "Institutional SLA & private flash pool", included: false },
      ],
    },
    {
      id: "pro",
      name: "Pro Arbitrageur",
      monthlyPrice: 199,
      annualPrice: 159,
      description: "For active quants, MEV searchers, and high-frequency automated liquidity providers.",
      cta: "Launch Pro Vault",
      isPopular: true,
      glowColor: "pink" as const,
      features: [
        { text: "Up to 2,500 ETH monthly volume", included: true },
        { text: "Base Sepolia & Unichain Sepolia access", included: true },
        { text: "Priority sub-second ReactVM callbacks", included: true },
        { text: "Web dashboard telemetry & event logs", included: true },
        { text: "Custom tick width concentration (150% - 500%)", included: true },
        { text: "WebSocket streaming logs & telemetry", included: true },
        { text: "Sub-millisecond priority queue", included: false },
        { text: "Institutional SLA & private flash pool", included: false },
      ],
    },
    {
      id: "institutional",
      name: "Institutional Desk",
      monthlyPrice: 799,
      annualPrice: 639,
      description: "For prime brokers, market makers, and institutional cross-chain liquidity consortia.",
      cta: "Contact Enterprise",
      isPopular: false,
      glowColor: "mint" as const,
      features: [
        { text: "Unlimited cross-chain surge volume", included: true },
        { text: "Base Sepolia, Unichain & future L2s", included: true },
        { text: "Dedicated Reactive Relayer node cluster", included: true },
        { text: "Web dashboard telemetry & event logs", included: true },
        { text: "Custom tick width concentration (Unlimited)", included: true },
        { text: "WebSocket streaming logs & telemetry", included: true },
        { text: "Sub-millisecond priority queue", included: true },
        { text: "Institutional SLA & private flash pool", included: true },
      ],
    },
  ];

  const comparisonCategories = [
    {
      name: "Latency & Relaying",
      rows: [
        { feature: "Average End-to-End Latency", starter: "1.18s", pro: "1.12s", institutional: "< 1.05s" },
        { feature: "ReactVM Callback Priority", starter: "Standard", pro: "Priority Tier 1", institutional: "Dedicated Node" },
        { feature: "Replay & Deduplication Protection", starter: "✓ Included", pro: "✓ Included", institutional: "✓ Included" },
      ],
    },
    {
      name: "Capital & Concentration",
      rows: [
        { feature: "Max Monthly Surge Volume", starter: "50 ETH", pro: "2,500 ETH", institutional: "Unlimited" },
        { feature: "Concentrated Multiplier", starter: "150% Fixed", pro: "Up to 500%", institutional: "Customizable" },
        { feature: "Flash Deposit / Rebalance Fee", starter: "0 bps", pro: "1 bps", institutional: "0.25 bps" },
      ],
    },
    {
      name: "Security & Operations",
      rows: [
        { feature: "Shannon Formal Security Audit", starter: "100/100", pro: "100/100", institutional: "100/100" },
        { feature: "Private Flash Loan Liquidity Vault", starter: "—", pro: "Optional", institutional: "✓ Dedicated" },
        { feature: "API & Webhook Ingestion", starter: "—", pro: "✓ Included", institutional: "✓ Dedicated Stream" },
      ],
    },
  ];

  const faqs = [
    {
      q: "Can I cancel or switch my plan at any time?",
      a: "Yes. All plans are non-custodial and operate month-to-month. You can upgrade, downgrade, or pause your rebalancer contracts instantly via smart contract governance.",
    },
    {
      q: "How are protocol fees billed?",
      a: "Fees can be paid monthly via credit card/invoicing or streamed natively on-chain in USDC/ETH directly through our DestinationCallback contract.",
    },
    {
      q: "Do you take custody of my LP capital?",
      a: "Never. OmniSurge uses non-custodial smart contracts. All funds remain in your vault contract, and the destination callback only borrows capital within the atomic transaction block before immediately rebalancing it back.",
    },
  ];

  return (
    <div className="min-h-screen text-off-white antialiased font-sans py-16 px-6">
      <div className="mx-auto max-w-6xl space-y-16">
        {/* Short Heading & Toggle */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-neon-mint animate-pulse" />
            <span className="text-xs font-mono font-medium text-white/80 uppercase tracking-wider">
              Transparent JIT Rebalancing Tiers
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Institutional Speed. <br />
            <span className="text-off-white">
              Zero Idle Capital{" "}
              <AnimatedKeyword word="Surge" color="#00FFCC" className="ml-1" />
            </span>
          </h1>

          <p className="font-sans text-sm text-white/60">
            Choose the throughput tier tailored for your algorithmic liquidity volume.
          </p>

          {/* Monthly / Annual Toggle with Save 20% Badge */}
          <div className="pt-4 flex items-center justify-center space-x-3">
            <span className={`text-xs font-sans font-semibold ${!isAnnual ? "text-white" : "text-white/40"}`}>
              Monthly billing
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border border-white/15 bg-white/[0.06] p-1 transition-colors duration-200 ease-in-out focus:outline-none"
              aria-label="Toggle annual billing"
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-gradient-to-r from-electric-blue to-neon-mint shadow-[0_0_12px_rgba(0,255,204,0.6)] transition duration-200 ease-in-out ${
                  isAnnual ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-xs font-sans font-semibold flex items-center gap-1.5 ${isAnnual ? "text-white" : "text-white/40"}`}>
              <span>Annual billing</span>
              <span className="rounded-full bg-neon-mint/15 border border-neon-mint/30 px-2.5 py-0.5 text-[10px] font-mono font-bold text-neon-mint">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* 3 Tier Cards Side-by-Side: Pro tier scaled 1.05x (scale-105, z-10) with animated glowing border */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
          {plans.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

            if (plan.isPopular) {
              return (
                <div key={plan.id} className="relative z-10 md:scale-105 flex flex-col">
                  {/* Animated Glowing Gradient Border Wrapper */}
                  <div className="absolute -inset-[2px] rounded-[2.6rem] bg-gradient-to-r from-electric-blue via-hot-pink to-neon-mint opacity-80 blur-sm animate-pulse" />

                  <GlassCard
                    glassEffect
                    className="relative flex-1 rounded-[2.5rem] p-8 flex flex-col justify-between bg-void/90 border border-white/20 shadow-[0_0_40px_rgba(255,0,127,0.3)]"
                  >
                    {/* Bubbly Most Popular Tag */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-hot-pink to-electric-blue px-4 py-1 text-[10px] font-mono font-extrabold uppercase tracking-wider text-white shadow-glow-pink">
                      ★ Most Popular Tier
                    </div>

                    <div>
                      <div className="font-serif text-xl font-bold text-white flex items-center justify-between">
                        <span>{plan.name}</span>
                        <Sparkles className="h-4 w-4 text-hot-pink" />
                      </div>

                      <div className="mt-4 flex items-baseline gap-1.5">
                        <span className="font-sans text-4xl sm:text-5xl font-black text-white tracking-tight">
                          ${price}
                        </span>
                        <span className="text-xs text-white/50 font-mono">
                          / month {isAnnual && "(billed annually)"}
                        </span>
                      </div>

                      <p className="mt-3 text-xs text-white/70 leading-relaxed min-h-[36px]">
                        {plan.description}
                      </p>

                      <button
                        onClick={() => onSelectTier(plan.id)}
                        className="mt-6 w-full rounded-full py-3.5 px-6 font-sans text-xs font-bold text-white bg-gradient-to-r from-electric-blue via-deep-purple to-hot-pink shadow-[0_0_25px_rgba(255,0,127,0.5)] hover:shadow-[0_0_35px_rgba(0,229,255,0.7)] transition-all duration-300 active:scale-[0.98]"
                      >
                        {plan.cta}
                      </button>

                      {/* Checklist with Glowing SVG checkmarks */}
                      <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                        <div className="text-xs font-semibold text-white/80 font-mono uppercase tracking-wider">
                          Included Capabilities:
                        </div>
                        <ul className="space-y-3 text-xs font-sans">
                          {plan.features.map((f, i) => (
                            <li
                              key={i}
                              className={`flex items-start gap-2.5 ${
                                f.included ? "text-off-white" : "text-white/25 line-through"
                              }`}
                            >
                              {f.included ? (
                                <div className="p-0.5 rounded-full bg-neon-mint/20 border border-neon-mint/50 text-neon-mint shadow-[0_0_10px_rgba(0,255,204,0.4)] shrink-0 mt-0.5">
                                  <Check className="h-3.5 w-3.5" />
                                </div>
                              ) : (
                                <X className="h-4 w-4 text-white/20 shrink-0 mt-0.5" />
                              )}
                              <span>{f.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              );
            }

            // Standard Community LP or Institutional Card
            return (
              <GlassCard
                key={plan.id}
                glassEffect
                hoverGlow={plan.glowColor}
                className="rounded-[2.5rem] p-8 flex flex-col justify-between border border-white/10 shadow-glass"
              >
                <div>
                  <div className="font-serif text-xl font-bold text-white">{plan.name}</div>

                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span className="font-sans text-4xl sm:text-5xl font-black text-white tracking-tight">
                      ${price}
                    </span>
                    <span className="text-xs text-white/50 font-mono">
                      / month {isAnnual && "(billed annually)"}
                    </span>
                  </div>

                  <p className="mt-3 text-xs text-white/70 leading-relaxed min-h-[36px]">
                    {plan.description}
                  </p>

                  <button
                    onClick={() => onSelectTier(plan.id)}
                    className="mt-6 w-full rounded-full py-3.5 px-6 font-sans text-xs font-semibold text-white border border-white/15 bg-white/[0.05] hover:bg-white/[0.1] hover:border-white/30 transition-all duration-300"
                  >
                    {plan.cta}
                  </button>

                  {/* Checklist */}
                  <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                    <div className="text-xs font-semibold text-white/80 font-mono uppercase tracking-wider">
                      Included Capabilities:
                    </div>
                    <ul className="space-y-3 text-xs font-sans">
                      {plan.features.map((f, i) => (
                        <li
                          key={i}
                          className={`flex items-start gap-2.5 ${
                            f.included ? "text-off-white" : "text-white/25 line-through"
                          }`}
                        >
                          {f.included ? (
                            <div className="p-0.5 rounded-full bg-neon-mint/20 border border-neon-mint/50 text-neon-mint shrink-0 mt-0.5">
                              <Check className="h-3.5 w-3.5" />
                            </div>
                          ) : (
                            <X className="h-4 w-4 text-white/20 shrink-0 mt-0.5" />
                          )}
                          <span>{f.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Feature Comparison Table in Bubbly GlassCard */}
        <GlassCard glassEffect className="rounded-[2.5rem] p-8 border border-white/10 shadow-glass overflow-hidden">
          <h2 className="font-serif text-xl font-bold text-white mb-6">Detailed Technical Matrix</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-white/10 text-white/50 font-mono uppercase text-[11px]">
                  <th className="py-3 px-4 w-1/2">Capability</th>
                  <th className="py-3 px-4 text-center">Community LP</th>
                  <th className="py-3 px-4 text-center font-bold text-neon-mint">Pro Arbitrageur</th>
                  <th className="py-3 px-4 text-center">Institutional</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparisonCategories.map((category, catIdx) => (
                  <React.Fragment key={catIdx}>
                    <tr className="bg-white/[0.02]">
                      <td colSpan={4} className="py-2.5 px-4 font-mono font-bold text-electric-blue text-[11px]">
                        {category.name}
                      </td>
                    </tr>
                    {category.rows.map((row, rowIdx) => (
                      <tr key={rowIdx} className="hover:bg-white/[0.03] transition">
                        <td className="py-3 px-4 text-off-white font-medium">{row.feature}</td>
                        <td className="py-3 px-4 text-center text-white/60 font-mono">{row.starter}</td>
                        <td className="py-3 px-4 text-center text-neon-mint font-mono font-semibold">{row.pro}</td>
                        <td className="py-3 px-4 text-center text-white/60 font-mono">{row.institutional}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="font-serif text-2xl font-bold text-white text-center mb-6">
            Frequently Answered Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <GlassCard
                  key={index}
                  glassEffect
                  className="rounded-2xl border border-white/10 p-5 cursor-pointer"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                >
                  <div className="flex items-center justify-between font-medium text-sm text-off-white">
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-neon-mint shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-white/40 shrink-0 ml-4" />
                    )}
                  </div>
                  {isOpen && (
                    <p className="mt-3 text-xs text-white/60 leading-relaxed font-sans border-t border-white/5 pt-3">
                      {faq.a}
                    </p>
                  )}
                </GlassCard>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
