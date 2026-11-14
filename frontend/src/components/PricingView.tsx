"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function PricingView() {
  const [billingCycle, setBillingCycle] = useState<"MONTHLY" | "ANNUAL">("MONTHLY");

  const plans = [
    {
      num: "01",
      name: "STANDARD NODE",
      price: billingCycle === "MONTHLY" ? "$15" : "$12",
      period: "PER MONTH",
      desc: "For single-pool concentrated liquidity surveillance and autonomous execution.",
      features: [
        "Base Sepolia (200ms) mempool surveillance",
        "Up to 3 active concentrated pools",
        "Reactive Lasna standard execution lane",
        "Slippage mitigation up to 50%",
        "Standard JSON-RPC latency telemetry",
      ],
      cta: "START STANDARD NODE →",
      isPrimary: false,
    },
    {
      num: "02",
      name: "PROFESSIONAL PRO",
      price: billingCycle === "MONTHLY" ? "$28" : "$22",
      period: "PER MONTH",
      desc: "Maximum speed for high-volume automated rebalancers and cross-chain flashes.",
      features: [
        "Unichain + Base dual-chain priority",
        "Unlimited active concentrated positions",
        "Sub-second Reactive callback priority lane",
        "Slippage mitigation up to 88.4%",
        "Instant atomic flash rebalancing",
        "Automated Telegram & Discord alerts",
      ],
      cta: "ACTIVATE PRO LANE →",
      isPrimary: true,
    },
    {
      num: "03",
      name: "INSTITUTIONAL ENTERPRISE",
      price: "CUSTOM",
      period: "BESPOKE AGREEMENT",
      desc: "Dedicated infrastructure for market makers and institutional vaults.",
      features: [
        "Co-located Reactive Network validator node",
        "Private mempool flash liquidity hooks",
        "Custom MEV arbitrage routing logic",
        "Custom SLA guarantee & zero-loss audit backing",
        "Direct integration with institutional custody",
      ],
      cta: "CONTACT PROTOCOL TEAM →",
      isPrimary: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-24">
        <div className="shell-container space-y-16">
          {/* Header & Billing Cycle Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#1E1E1E] pb-8">
            <div>
              <div className="flex items-center gap-2 font-mono text-12 text-[#8A8A8A] mb-2">
                <span className="text-[#E23B3B] font-bold">( 03 )</span>
                <span className="uppercase tracking-wider">DEPLOYMENT TIERS & ACCESS</span>
              </div>
              <h1 className="font-sans text-40 sm:text-56 font-bold text-[#EDEDED] uppercase">
                CHOOSE YOUR TIER.
              </h1>
              <p className="font-sans text-14 text-[#8A8A8A] mt-2 max-w-xl">
                Scale concentrated liquidity injection with sub-second finality on Base Sepolia and Unichain.
              </p>
            </div>

            {/* Rectangular Billing Cycle Switcher */}
            <div className="flex items-center border border-[#1E1E1E] p-1 font-mono text-12 bg-[#0A0A0A]">
              <button
                onClick={() => setBillingCycle("MONTHLY")}
                className={`px-3 py-1.5 rounded-[2px] transition-colors uppercase ${
                  billingCycle === "MONTHLY"
                    ? "bg-[#1E1E1E] text-[#EDEDED] font-bold"
                    : "text-[#8A8A8A] hover:text-[#EDEDED]"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("ANNUAL")}
                className={`px-3 py-1.5 rounded-[2px] transition-colors uppercase ${
                  billingCycle === "ANNUAL"
                    ? "bg-[#1E1E1E] text-[#EDEDED] font-bold"
                    : "text-[#8A8A8A] hover:text-[#EDEDED]"
                }`}
              >
                Annual (20% Off)
              </button>
            </div>
          </div>

          {/* Editorial Tier Columns Separated by Hairline Borders */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-[#1E1E1E] bg-[#0A0A0A]">
            {plans.map((plan, idx) => (
              <div
                key={plan.name}
                className={`p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 ${
                  idx < 2 ? "lg:border-r border-[#1E1E1E]" : ""
                } ${plan.isPrimary ? "bg-[#111111]" : "bg-[#0A0A0A]"}`}
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-baseline font-mono text-12">
                    <span className="text-[#E23B3B] font-bold">({plan.num})</span>
                    <span className="text-[#8A8A8A] uppercase">{plan.name}</span>
                  </div>

                  <div>
                    <span className="font-mono text-40 font-bold text-[#EDEDED] tnum leading-none block">
                      {plan.price}
                    </span>
                    <span className="font-mono text-12 text-[#8A8A8A] uppercase mt-2 block">
                      {plan.period}
                    </span>
                  </div>

                  <p className="font-sans text-14 text-[#8A8A8A] leading-relaxed border-t border-b border-[#1E1E1E] py-4">
                    {plan.desc}
                  </p>

                  <div className="space-y-3 font-mono text-12 text-[#8A8A8A]">
                    <span className="text-[#EDEDED] font-bold block uppercase">
                      INCLUDED CAPABILITIES:
                    </span>
                    {plan.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2">
                        <span className="text-[#E23B3B] font-bold">+</span>
                        <span className="text-[#EDEDED]">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    className={`w-full ${plan.isPrimary ? "btn-rect-accent" : "btn-rect-ghost"}`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Monospace FAQ Table */}
          <div className="space-y-6 pt-10 border-t border-[#1E1E1E]">
            <div className="flex items-center gap-2 font-mono text-12 text-[#8A8A8A]">
              <span className="text-[#E23B3B] font-bold">( FAQ )</span>
              <span className="uppercase tracking-wider">FREQUENTLY ANSWERED QUESTIONS</span>
            </div>

            <div className="border border-[#1E1E1E] divide-y divide-[#1E1E1E] font-mono text-12 bg-[#0A0A0A]">
              <div className="p-6 space-y-2">
                <span className="text-[#EDEDED] font-bold block">
                  Q: HOW DOES OMNISURGE ELIMINATE IMPERMANENT LOSS?
                </span>
                <p className="text-[#8A8A8A] font-sans text-14">
                  OmniSurge deploys concentrated liquidity only for the duration of the swap execution block and withdraws both the principal and harvested LP fees within the same block cycle, leaving zero capital exposed to directional price drift.
                </p>
              </div>

              <div className="p-6 space-y-2">
                <span className="text-[#EDEDED] font-bold block">
                  Q: CAN I DEPLOY ON CUSTOM LIQUIDITY POOLS?
                </span>
                <p className="text-[#8A8A8A] font-sans text-14">
                  Yes. Custom Uniswap v3/v4 pools on Base Sepolia and Unichain Sepolia can be registered through the DestinationCallback contract by authorized owners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
