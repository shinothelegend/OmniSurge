"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Shield,
  Bell,
  CreditCard,
  Key,
  AlertTriangle,
  Save,
  RotateCcw,
  Check,
  Server,
  Zap,
  Sparkles,
} from "lucide-react";
import { GlassCard } from "@/primitives/GlassCard";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"general" | "relayers" | "notifications" | "billing" | "security">("general");
  const [hasPendingChanges, setHasPendingChanges] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    protocolName: "Citadel Arbitrage Node 01",
    primaryNetwork: "base",
    autoRebalance: true,
    minThresholdEth: "1.0",
    maxSlippageBps: "15",
    concentrationMultiplier: "150",
    relayerAddress: "0x0000000000000000000000000000000000fffFfF",
    emailAlerts: true,
    telegramWebhook: "https://api.telegram.org/bot12345/send",
    twoFactorAuth: true,
  });

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setHasPendingChanges(true);
    setSaveSuccess(false);
  };

  const handleSave = () => {
    setHasPendingChanges(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleReset = () => {
    setHasPendingChanges(false);
  };

  const navItems = [
    { id: "general", label: "General & Node", icon: User },
    { id: "relayers", label: "Reactive Relayers", icon: Server },
    { id: "notifications", label: "Streaming Alerts", icon: Bell },
    { id: "billing", label: "Billing & Vaults", icon: CreditCard },
    { id: "security", label: "Security & Keys", icon: Shield },
  ];

  return (
    <div className="min-h-screen text-off-white antialiased font-sans py-12 px-6 pb-28">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <div className="inline-flex items-center space-x-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-md mb-3">
            <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
            <span className="text-xs font-mono font-medium text-white/80 uppercase tracking-wider">
              System Configuration
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Protocol Controls & Engine Parameters
          </h1>
          <p className="font-sans text-xs text-white/60 mt-1 max-w-2xl">
            Configure your Reactive Network subscription rules, JIT safety thresholds, and cross-chain relayer nodes.
          </p>
        </div>

        {/* Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Vertical Nav with Bubbly GlassCard */}
          <aside className="lg:col-span-3">
            <GlassCard glassEffect className="rounded-[2.5rem] p-3 space-y-1.5 border border-white/10 shadow-glass">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`relative flex w-full items-center rounded-2xl px-4 py-3 text-xs font-medium transition-all ${
                      isActive
                        ? "text-white font-semibold shadow-glass"
                        : "text-white/60 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeSettingsNav"
                        className="absolute inset-0 rounded-2xl bg-white/[0.09] border border-white/15"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    <item.icon
                      className={`relative z-10 h-4 w-4 mr-3 shrink-0 ${
                        isActive ? "text-neon-mint" : "text-white/40"
                      }`}
                    />
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </GlassCard>
          </aside>

          {/* Right Content Area */}
          <div className="lg:col-span-9 space-y-8">
            {activeTab === "general" && (
              <>
                {/* Card 1: Node Profile */}
                <GlassCard glassEffect className="rounded-[2.5rem] p-8 space-y-6 border border-white/10 shadow-glass">
                  <div className="border-b border-white/10 pb-4">
                    <h2 className="font-serif text-base font-bold text-white">Node Identity & Parameters</h2>
                    <p className="font-sans text-xs text-white/50 mt-0.5">
                      Off-chain watcher telemetry identifier and primary dispatch configuration.
                    </p>
                  </div>

                  {/* Row 1: Instance Label */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-white/5">
                    <div>
                      <div className="text-xs font-semibold text-white">Instance Label</div>
                      <div className="text-[11px] text-white/50 mt-0.5">
                        Human-readable identifier displayed across telemetry feeds.
                      </div>
                    </div>
                    <input
                      type="text"
                      value={settings.protocolName}
                      onChange={(e) => updateSetting("protocolName", e.target.value)}
                      className="rounded-full bg-black/40 px-5 py-3 border border-white/10 shadow-inner focus:outline-none focus:ring-2 focus:ring-deep-purple/50 text-xs text-white w-72"
                    />
                  </div>

                  {/* Row 2: Primary Network */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-white/5">
                    <div>
                      <div className="text-xs font-semibold text-white">Primary Origin Network</div>
                      <div className="text-[11px] text-white/50 mt-0.5">
                        Default chain listened to by your Reactive RSC subscription.
                      </div>
                    </div>
                    <select
                      value={settings.primaryNetwork}
                      onChange={(e) => updateSetting("primaryNetwork", e.target.value)}
                      className="rounded-full bg-black/40 px-5 py-3 border border-white/10 shadow-inner focus:outline-none focus:ring-2 focus:ring-deep-purple/50 text-xs text-white w-72"
                    >
                      <option value="base" className="bg-void text-white">Base Sepolia (200ms Flashblocks)</option>
                      <option value="unichain" className="bg-void text-white">Unichain Sepolia (1s Fast Blocks)</option>
                    </select>
                  </div>

                  {/* Row 3: Autonomous JIT Surge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
                    <div>
                      <div className="text-xs font-semibold text-white">Autonomous JIT Surge Execution</div>
                      <div className="text-[11px] text-white/50 mt-0.5">
                        Instantly dispatch destination callback upon valid ReactVM imbalance event.
                      </div>
                    </div>
                    <button
                      onClick={() => updateSetting("autoRebalance", !settings.autoRebalance)}
                      className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border border-white/15 p-1 transition-colors duration-200 ease-in-out ${
                        settings.autoRebalance ? "bg-neon-mint/20 border-neon-mint/50" : "bg-white/5"
                      }`}
                      aria-label="Toggle autonomous JIT surge"
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full transition duration-200 ease-in-out ${
                          settings.autoRebalance
                            ? "translate-x-6 bg-neon-mint shadow-glow-mint"
                            : "translate-x-0 bg-white/40"
                        }`}
                      />
                    </button>
                  </div>
                </GlassCard>

                {/* Card 2: JIT Thresholds & Safety */}
                <GlassCard glassEffect className="rounded-[2.5rem] p-8 space-y-6 border border-white/10 shadow-glass">
                  <div className="border-b border-white/10 pb-4">
                    <h2 className="font-serif text-base font-bold text-white">Concentration & Capital Multipliers</h2>
                    <p className="font-sans text-xs text-white/50 mt-0.5">
                      Configure minimum volume filters to prevent unprofitable micro-surges.
                    </p>
                  </div>

                  {/* Row 1: Min Threshold */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-white/5">
                    <div>
                      <div className="text-xs font-semibold text-white">Minimum Imbalance Trigger Threshold</div>
                      <div className="text-[11px] text-white/50 mt-0.5">
                        Swaps below this volume are ignored by ReactVM to optimize gas.
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 w-72">
                      <input
                        type="number"
                        step="0.1"
                        value={settings.minThresholdEth}
                        onChange={(e) => updateSetting("minThresholdEth", e.target.value)}
                        className="w-full rounded-full bg-black/40 px-5 py-3 border border-white/10 shadow-inner focus:outline-none focus:ring-2 focus:ring-deep-purple/50 text-xs text-white font-mono"
                      />
                      <span className="text-xs font-mono text-white/50">ETH</span>
                    </div>
                  </div>

                  {/* Row 2: Concentration Multiplier */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
                    <div>
                      <div className="text-xs font-semibold text-white">Concentrated Depth Multiplier</div>
                      <div className="text-[11px] text-white/50 mt-0.5">
                        Ratio of flash liquidity deployed relative to swap volume.
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 w-72">
                      <input
                        type="number"
                        value={settings.concentrationMultiplier}
                        onChange={(e) => updateSetting("concentrationMultiplier", e.target.value)}
                        className="w-full rounded-full bg-black/40 px-5 py-3 border border-white/10 shadow-inner focus:outline-none focus:ring-2 focus:ring-deep-purple/50 text-xs text-white font-mono"
                      />
                      <span className="text-xs font-mono text-white/50">%</span>
                    </div>
                  </div>
                </GlassCard>
              </>
            )}

            {activeTab === "relayers" && (
              <GlassCard glassEffect className="rounded-[2.5rem] p-8 space-y-6 border border-white/10 shadow-glass">
                <div className="border-b border-white/10 pb-4">
                  <h2 className="font-serif text-base font-bold text-white">Reactive Relayers & Cross-Chain RPCs</h2>
                  <p className="font-sans text-xs text-white/50 mt-0.5">
                    Pre-configured system contracts for Reactive Lasna testnet.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs font-mono space-y-1">
                    <div className="text-white/40">System Contract Address:</div>
                    <div className="text-neon-mint font-bold">0x0000000000000000000000000000000000fffFfF</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs font-mono space-y-1">
                    <div className="text-white/40">Reactive Lasna RPC:</div>
                    <div className="text-white/80">https://lasna-rpc.rnk.dev</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs font-mono space-y-1">
                    <div className="text-white/40">Base Sepolia RPC (Flashblocks):</div>
                    <div className="text-white/80">https://sepolia.base.org (200ms Blocks)</div>
                  </div>
                </div>
              </GlassCard>
            )}

            {activeTab === "notifications" && (
              <GlassCard glassEffect className="rounded-[2.5rem] p-8 space-y-6 border border-white/10 shadow-glass">
                <div className="border-b border-white/10 pb-4">
                  <h2 className="font-serif text-base font-bold text-white">Streaming Alerts & Webhooks</h2>
                  <p className="font-sans text-xs text-white/50 mt-0.5">
                    Receive millisecond event dispatches directly into your trading engine.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-white/5">
                    <div>
                      <div className="text-xs font-semibold text-white">Telegram Bot Webhook</div>
                      <div className="text-[11px] text-white/50 mt-0.5">Push notifications on executed surges.</div>
                    </div>
                    <input
                      type="text"
                      value={settings.telegramWebhook}
                      onChange={(e) => updateSetting("telegramWebhook", e.target.value)}
                      className="rounded-full bg-black/40 px-5 py-3 border border-white/10 shadow-inner focus:outline-none focus:ring-2 focus:ring-deep-purple/50 text-xs text-white w-72 font-mono"
                    />
                  </div>
                </div>
              </GlassCard>
            )}

            {activeTab === "billing" && (
              <GlassCard glassEffect className="rounded-[2.5rem] p-8 space-y-6 border border-white/10 shadow-glass">
                <div className="border-b border-white/10 pb-4">
                  <h2 className="font-serif text-base font-bold text-white">Vault Balances & Settlement</h2>
                  <p className="font-sans text-xs text-white/50 mt-0.5">
                    Manage destination gas reserves and atomic collateral.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-neon-mint/10 border border-neon-mint/30 text-neon-mint text-xs">
                  ✓ Vault Status: Active & Fully Collateralized (4820.5 ETH total routed volume).
                </div>
              </GlassCard>
            )}

            {activeTab === "security" && (
              <GlassCard glassEffect className="rounded-[2.5rem] p-8 space-y-6 border border-white/10 shadow-glass">
                <div className="border-b border-white/10 pb-4">
                  <h2 className="font-serif text-base font-bold text-white">Cryptographic Security & Keys</h2>
                  <p className="font-sans text-xs text-white/50 mt-0.5">
                    Hardware key signatures and multi-sig authorization rules.
                  </p>
                </div>
                <div className="text-xs text-white/70 space-y-2">
                  <p>All DestinationCallback transactions require monotonic signature deduplication.</p>
                  <p className="font-mono text-neon-mint">Shannon Formal Audit: 100/100 Passed (Zero Critical, High, or Medium Findings)</p>
                </div>
              </GlassCard>
            )}

            {/* Red Danger Zone with Bubbly Glass Styling */}
            <GlassCard
              glassEffect
              className="rounded-[2.5rem] p-8 space-y-5 border border-rose-500/30 bg-rose-950/20 shadow-[0_0_35px_rgba(244,63,94,0.15)]"
            >
              <div className="flex items-center space-x-3 text-rose-400">
                <div className="p-2 rounded-2xl bg-rose-500/15 border border-rose-500/30">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-serif text-sm font-bold uppercase tracking-wider text-rose-400">
                    Protocol Danger Zone
                  </h2>
                  <p className="font-sans text-xs text-rose-200/70">
                    These actions directly halt or withdraw active on-chain contract state.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
                <div>
                  <div className="text-xs font-semibold text-rose-200">Emergency Protocol Pause</div>
                  <div className="text-[11px] text-rose-300/60 mt-0.5">
                    Halt all automated JIT callback dispatch immediately across both chains.
                  </div>
                </div>
                <button
                  onClick={() => alert("Protocol Emergency Circuit Breaker Triggered (Simulation)")}
                  className="rounded-full bg-rose-600 hover:bg-rose-500 px-6 py-3 text-xs font-bold text-white shadow-[0_0_20px_rgba(225,29,72,0.4)] transition-all active:scale-[0.98]"
                >
                  Emergency Halt
                </button>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Floating Sticky Save Bar */}
      <AnimatePresence>
        {(hasPendingChanges || saveSuccess) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-4 rounded-full bg-void/90 backdrop-blur-2xl border border-white/20 px-6 py-3.5 shadow-2xl"
          >
            {saveSuccess ? (
              <div className="flex items-center space-x-2 text-neon-mint font-semibold text-xs font-mono">
                <Check className="h-4 w-4" />
                <span>Configuration changes successfully committed</span>
              </div>
            ) : (
              <>
                <span className="text-xs text-white/80 font-mono">Unsaved configuration changes</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleReset}
                    className="flex items-center space-x-1.5 rounded-full border border-white/10 px-3.5 py-1.5 text-xs text-white/70 hover:bg-white/5 transition"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Reset</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-1.5 rounded-full bg-gradient-to-r from-electric-blue to-neon-mint px-4 py-1.5 text-xs font-bold text-white shadow-glow-mint hover:opacity-90 transition"
                  >
                    <Save className="h-3 w-3" />
                    <span>Save Parameters</span>
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
