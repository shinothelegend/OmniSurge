"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Activity,
  LayoutDashboard,
  DollarSign,
  Sliders,
  Globe,
  UserPlus,
  Volume2,
  VolumeX,
  Wallet,
  ShieldCheck,
} from "lucide-react";
import { isAudioMuted, toggleAudioMute } from "@/lib/soundFx";

export type AppView = "landing" | "analytics" | "reactive_engine" | "pricing" | "settings";

interface ChimeraSidebarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  onOpenOnboarding: () => void;
  onOpenContracts?: () => void;
}

export default function ChimeraSidebar({
  currentView,
  setCurrentView,
  onOpenOnboarding,
  onOpenContracts,
}: ChimeraSidebarProps) {
  const [walletConnected, setWalletConnected] = useState(true);
  const [muted, setMuted] = useState(() => (typeof window !== "undefined" ? isAudioMuted() : false));

  const handleToggleSound = () => {
    const nextState = toggleAudioMute();
    setMuted(nextState);
  };

  const navItems = [
    { id: "landing" as AppView, label: "Overview", icon: Globe, badge: "L1/L2" },
    { id: "reactive_engine" as AppView, label: "Live Trace", icon: Activity, badge: "1.14s" },
    { id: "analytics" as AppView, label: "Analytics", icon: LayoutDashboard, badge: "B2B" },
    { id: "pricing" as AppView, label: "Pricing", icon: DollarSign },
    { id: "settings" as AppView, label: "Settings", icon: Sliders },
  ];

  return (
    <aside className="w-64 shrink-0 flex flex-col bg-[#050505] border-r border-white/5 z-30 min-h-screen font-sans">
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 border-b border-white/5">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-electric-blue via-deep-purple to-hot-pink p-[1px]">
            <div className="h-full w-full rounded-[11px] bg-[#020202] flex items-center justify-center">
              <Zap className="h-4 w-4 text-neon-mint" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-lg text-white tracking-wide">
              OmniSurge
            </span>
            <span className="text-[9px] font-sans font-semibold text-neon-mint tracking-widest uppercase">
              REACTIVE OMNI
            </span>
          </div>
        </div>
      </div>

      {/* Wallet Address Pill (Rule 10 & 11) */}
      <div className="px-6 py-4">
        <button
          onClick={() => setWalletConnected(!walletConnected)}
          className="w-full flex items-center justify-between rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] px-4 py-2 text-xs transition-all duration-300"
        >
          <div className="flex items-center space-x-2">
            <Wallet className="h-3.5 w-3.5 text-gray-400" />
            <span className="font-mono text-xs text-white/90">
              {walletConnected ? "0x71C...882E" : "Connect Wallet"}
            </span>
          </div>
          <span className="h-1.5 w-1.5 rounded-full bg-neon-mint animate-pulse" />
        </button>
      </div>

      {/* Nav List (Rule 12 & 13: 24px left padding, text-gray-400 -> text-white, dim bg-white/5 active rectangle) */}
      <nav className="flex-1 px-4 py-2 space-y-1" aria-label="Main Navigation">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`relative flex w-full items-center px-5 py-3 rounded-xl text-xs font-sans font-medium transition-colors ${
                isActive ? "text-white font-semibold" : "text-gray-400 hover:text-white"
              }`}
            >
              {/* Highlight active sidebar item with dim bg-white/5 rounded rectangle */}
              {isActive && (
                <motion.div
                  layoutId="activeSidebarPill"
                  className="absolute inset-0 rounded-xl bg-white/5 border border-white/10"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}

              <item.icon
                className={`relative z-10 h-4 w-4 mr-3 shrink-0 transition-colors ${
                  isActive ? "text-neon-mint" : "text-gray-500"
                }`}
              />

              <div className="relative z-10 flex flex-1 items-center justify-between">
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${
                      isActive
                        ? "bg-neon-mint/15 text-neon-mint border border-neon-mint/30"
                        : "bg-white/5 text-gray-500"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Secondary Actions: 3-Step Onboarding */}
      <div className="px-4 py-2">
        <button
          onClick={onOpenOnboarding}
          className="flex w-full items-center space-x-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] px-4 py-2.5 text-xs text-gray-300 transition-all"
        >
          <UserPlus className="h-4 w-4 text-hot-pink shrink-0" />
          <div className="text-left flex-1">
            <div className="font-semibold text-white text-xs">Onboarding Flow</div>
            <div className="text-[10px] text-gray-500 font-sans">3-step LP vault setup</div>
          </div>
        </button>
      </div>

      {/* Secondary Actions: Shannon Audit */}
      {onOpenContracts && (
        <div className="px-4 py-1">
          <button
            onClick={onOpenContracts}
            className="flex w-full items-center space-x-3 rounded-xl border border-neon-mint/20 bg-neon-mint/[0.03] hover:bg-neon-mint/[0.07] px-4 py-2.5 text-xs text-neon-mint transition-all"
          >
            <ShieldCheck className="h-4 w-4 text-neon-mint shrink-0" />
            <div className="text-left flex-1">
              <div className="font-semibold text-xs">Shannon Audit</div>
              <div className="text-[10px] text-neon-mint/70 font-mono">100/100 White-box</div>
            </div>
          </button>
        </div>
      )}

      {/* Bottom Status & Audio Toggle */}
      <div className="p-5 border-t border-white/5 flex items-center justify-between text-xs text-gray-500 font-mono">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-neon-mint animate-ping" />
          <span className="text-[11px] text-gray-400">ReactVM Lasna</span>
        </div>

        <button
          onClick={handleToggleSound}
          className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition"
          title={muted ? "Unmute Audio Synthesis" : "Mute Audio Synthesis"}
        >
          {muted ? <VolumeX className="h-4 w-4 text-gray-600" /> : <Volume2 className="h-4 w-4 text-neon-mint" />}
        </button>
      </div>
    </aside>
  );
}
