"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function SettingsView() {
  const [activeTab, setActiveTab] = useState<"keys" | "gas" | "pools" | "security">("keys");
  const [reactiveAutoRebalance, setReactiveAutoRebalance] = useState(true);
  const [mevProtection, setMevProtection] = useState(true);
  const [savedToast, setSavedToast] = useState(false);

  const [oracleAddress, setOracleAddress] = useState(
    "0x0000000000000000000000000000000000fffFfF"
  );
  const [callbackGasLimit, setCallbackGasLimit] = useState("850,000");
  const [slippageTolerance, setSlippageTolerance] = useState("0.15%");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] overflow-x-hidden">
      <Header />

      {/* Floating Save Toast */}
      {savedToast && (
        <div className="fixed bottom-6 left-6 z-50 bg-[var(--bg-surface)] text-[var(--text-primary)] font-mono text-xs px-5 py-3 rounded-lg border border-[var(--accent-emerald)] flex items-center gap-2.5 font-semibold shadow-xl">
          <span className="text-[var(--accent-emerald)] text-base">✓</span>
          <span>CONFIGURATION DISPATCHED TO REACTIVE LASNA TESTNET</span>
        </div>
      )}

      <main className="relative z-10 pt-28 pb-28 shell-container space-y-8">
        {/* Top Header */}
        <div className="border-b border-[var(--border-subtle)] pb-6 pt-2">
          <h1 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight text-[var(--text-primary)] leading-[1.05]">
            Protocol <span className="text-[var(--accent-cyan)] font-normal">Parameters</span> & Keys.
          </h1>
          <p className="font-sans text-sm sm:text-base text-[var(--text-secondary)] mt-2 max-w-xl">
            Configure reactive oracle listeners, callback gas boundaries, and security parameters across Base and Unichain.
          </p>
        </div>

        {/* Two-Column Grid: Left Nav + Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Navigation Tabs */}
          <div className="lg:col-span-3 space-y-2">
            {[
              { id: "keys", label: "Reactive Keys & Oracles" },
              { id: "gas", label: "Gas Limits & Execution" },
              { id: "pools", label: "Monitored Pool Tiers" },
              { id: "security", label: "Shannon Verification" },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-mono text-xs transition-colors text-left font-medium ${
                    isActive
                      ? "bg-[var(--bg-card)] border border-[var(--accent-cyan)] text-[var(--accent-cyan)] font-bold shadow-xs"
                      : "bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && <span className="text-[var(--accent-cyan)]">→</span>}
                </button>
              );
            })}

            <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] mt-5 space-y-2 font-mono text-xs shadow-xs">
              <div className="text-[var(--text-primary)] font-bold">SECURITY ASSURANCE</div>
              <p className="text-[var(--text-secondary)] font-sans text-xs leading-relaxed">
                All parameter updates require cryptographic authorization via Lasna validator consensus.
              </p>
            </div>
          </div>

          {/* Right Content Form Area */}
          <div className="lg:col-span-9 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-7 md:p-8 space-y-6 shadow-sm">
            <form onSubmit={handleSave} className="space-y-6">
              {/* Oracle Address */}
              <div className="space-y-2">
                <label className="font-mono text-xs text-[var(--text-secondary)] uppercase font-bold block">
                  REACTIVE SYSTEM SERVICE CONTRACT (LASNA)
                </label>
                <div className="flex items-center rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] px-3.5 py-3">
                  <input
                    type="text"
                    value={oracleAddress}
                    onChange={(e) => setOracleAddress(e.target.value)}
                    className="bg-transparent font-mono text-sm text-[var(--text-primary)] w-full focus:outline-none"
                  />
                  <span className="font-mono text-xs text-[var(--accent-emerald)] font-semibold">
                    Verified
                  </span>
                </div>
              </div>

              {/* Gas Limit & Slippage Tolerance */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="font-mono text-xs text-[var(--text-secondary)] uppercase font-bold block">
                    CALLBACK GAS LIMIT (UNITS)
                  </label>
                  <input
                    type="text"
                    value={callbackGasLimit}
                    onChange={(e) => setCallbackGasLimit(e.target.value)}
                    className="w-full rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] px-3.5 py-3 font-mono text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-cyan)]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs text-[var(--text-secondary)] uppercase font-bold block">
                    MAXIMUM SLIPPAGE TOLERANCE
                  </label>
                  <input
                    type="text"
                    value={slippageTolerance}
                    onChange={(e) => setSlippageTolerance(e.target.value)}
                    className="w-full rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] px-3.5 py-3 font-mono text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-cyan)]"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-3 border-t border-[var(--border-subtle)]">
                <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                  <div>
                    <span className="font-display font-bold text-sm text-[var(--text-primary)] block">
                      Autonomous Reactive Rebalancing
                    </span>
                    <span className="font-sans text-xs text-[var(--text-secondary)]">
                      Automatically rebalance tick depth when cross-chain price spread exceeds 0.05%.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setReactiveAutoRebalance(!reactiveAutoRebalance)}
                    className={`w-12 h-6 rounded-full p-0.5 transition-colors ${
                      reactiveAutoRebalance ? "bg-[var(--accent-cyan)]" : "bg-[var(--border-subtle)]"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-[var(--bg-page)] transition-transform ${
                        reactiveAutoRebalance ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                  <div>
                    <span className="font-display font-bold text-sm text-[var(--text-primary)] block">
                      Cross-Chain MEV Defense
                    </span>
                    <span className="font-sans text-xs text-[var(--text-secondary)]">
                      Prevent sandwich attacks on Base Sepolia and Unichain Sepolia pools.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMevProtection(!mevProtection)}
                    className={`w-12 h-6 rounded-full p-0.5 transition-colors ${
                      mevProtection ? "bg-[var(--accent-emerald)]" : "bg-[var(--border-subtle)]"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-[var(--bg-page)] transition-transform ${
                        mevProtection ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  className="btn-solid-accent !py-3 !px-6 font-mono text-xs font-bold"
                >
                  SAVE CONFIGURATION →
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
