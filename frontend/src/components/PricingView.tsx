"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function PricingView() {
  const [billingCycle, setBillingCycle] = useState<"PUBLIC" | "OPERATOR">("PUBLIC");

  const plans = [
    {
      num: "01",
      name: "COMMUNITY NODE",
      price: "FREE",
      period: "TESTNET ACCESS",
      desc: "For single-pool concentrated liquidity surveillance and autonomous execution.",
      features: [
        "Base Sepolia (200ms) mempool surveillance",
        "Up to 3 active concentrated pools",
        "Reactive Lasna standard execution lane",
        "Deterministic replay deduplication",
        "Standard JSON-RPC latency telemetry",
      ],
      cta: "EXPLORE COMMUNITY LANE →",
      isPrimary: false,
    },
    {
      num: "02",
      name: "BUILDATHON OPERATOR",
      price: "OPEN",
      period: "HACKATHON DEPLOYMENT",
      desc: "Maximum speed for high-volume automated rebalancers and cross-chain flashes.",
      features: [
        "Unichain + Base dual-chain priority",
        "Unlimited active concentrated positions",
        "Sub-second Reactive callback priority lane",
        "Atomic same-block retraction guarantee",
        "Live on-chain ring buffer telemetry",
      ],
      cta: "ACTIVATE OPERATOR LANE →",
      isPrimary: true,
    },
    {
      num: "03",
      name: "VALIDATOR VAULT",
      price: "BESPOKE",
      period: "CUSTOM DEPLOYMENT",
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
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#1E1E1E] pb-8">
            <div>
              <div className="flex items-center gap-2 font-mono text-12 text-[#8A8A8A] mb-2">
                <span className="text-[#E23B3B] font-bold">( 03 )</span>
                <span className="uppercase tracking-wider">DEPLOYMENT TIERS & ACCESS</span>
              </div>
              <h1 className="font-sans text-40 sm:text-56 font-bold text-[#EDEDED] uppercase">
                ACCESS TIERS.
              </h1>
              <p className="font-sans text-14 text-[#8A8A8A] mt-2 max-w-xl">
                Open-source testnet deployment for the Reactive Omni Buildathon. Free community access on Base Sepolia and Unichain Sepolia.
              </p>
            </div>

            <div className="flex items-center gap-2 border border-[#1E1E1E] p-1 font-mono text-12 bg-[#0A0A0A]">
              <button
                onClick={() => setBillingCycle("PUBLIC")}
                className={`px-3 py-1.5 rounded-[2px] transition-colors uppercase ${
                  billingCycle === "PUBLIC"
                    ? "bg-[#1E1E1E] text-[#EDEDED] font-bold"
                    : "text-[#8A8A8A] hover:text-[#EDEDED]"
                }`}
              >
                Public Testnet
              </button>
              <button
                onClick={() => setBillingCycle("OPERATOR")}
                className={`px-3 py-1.5 rounded-[2px] transition-colors uppercase ${
                  billingCycle === "OPERATOR"
                    ? "bg-[#1E1E1E] text-[#EDEDED] font-bold"
                    : "text-[#8A8A8A] hover:text-[#EDEDED]"
                }`}
              >
                Operator Lane
              </button>
            </div>
          </div>

          {/* Editorial Tiers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#1E1E1E] bg-[#0A0A0A]">
            {plans.map((p, idx) => (
              <div
                key={p.num}
                className={`p-8 flex flex-col justify-between space-y-8 ${
                  idx < 2 ? "border-b md:border-b-0 md:border-r border-[#1E1E1E]" : ""
                } ${p.isPrimary ? "bg-[#111111]" : "bg-[#0A0A0A]"}`}
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-baseline font-mono text-12">
                    <span className={p.isPrimary ? "text-[#E23B3B] font-bold" : "text-[#555555]"}>
                      ({p.num})
                    </span>
                    <span className="text-[#8A8A8A] uppercase">
                      {p.isPrimary ? "RECOMMENDED" : "STANDARD"}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-mono text-16 font-bold text-[#EDEDED] uppercase tracking-tight">
                      {p.name}
                    </h3>
                    <p className="font-sans text-12 text-[#8A8A8A] mt-2 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#1E1E1E] space-y-1">
                    <span className="block font-mono text-32 sm:text-40 font-bold text-[#EDEDED] tnum">
                      {p.price}
                    </span>
                    <span className="block font-mono text-12 text-[#555555] uppercase">
                      {p.period}
                    </span>
                  </div>

                  <ul className="space-y-3 pt-4 border-t border-[#1E1E1E] font-mono text-12 text-[#8A8A8A]">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="text-[#EDEDED] font-bold">+</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    className={`w-full ${
                      p.isPrimary ? "btn-rect-accent" : "btn-rect-ghost"
                    }`}
                  >
                    {p.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
