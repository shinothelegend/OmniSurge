"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Radio, Cpu, CheckCircle2, Flame, ArrowRight, Clock, ShieldCheck } from "lucide-react";
import { GlassCard } from "@/primitives/GlassCard";

export interface LatencyEvent {
  id: string;
  stage: number; // 0: Idle, 1: Origin Swap Detected, 2: ReactVM Computing, 3: Callback Executed
  originNetwork: "Base Sepolia" | "Unichain Sepolia";
  originBlockTimeMs: number;
  reactiveComputeMs: number;
  destinationExecMs: number;
  totalLatencyMs: number;
  volumeEth: number;
  feesCapturedEth: number;
  txHash: string;
  blockNumber: number;
}

interface LatencyVisualizerProps {
  currentEvent: LatencyEvent;
  activeLoop: "base" | "unichain";
  onTriggerManualSwap: (size: number) => void;
}

export default function LatencyVisualizer({
  currentEvent,
  activeLoop,
  onTriggerManualSwap,
}: LatencyVisualizerProps) {
  const isBase = activeLoop === "base";

  const originConfig = isBase
    ? {
        name: "Base Sepolia",
        color: "#00E5FF",
        blockTime: "200ms Flashblocks",
        desc: "OP Stack Flashblock Ingestion",
        pillClass: "text-electric-blue bg-electric-blue/10 border-electric-blue/30",
      }
    : {
        name: "Unichain Sepolia",
        color: "#FF007F",
        blockTime: "1.0s Fast Blocks",
        desc: "Rollup-Boost Fast Block Ingestion",
        pillClass: "text-hot-pink bg-hot-pink/10 border-hot-pink/30",
      };

  const stages = [
    {
      id: 1,
      title: `${originConfig.name}`,
      subtitle: originConfig.desc,
      blockSpec: originConfig.blockTime,
      icon: Radio,
      measuredMs: currentEvent.originBlockTimeMs,
      accentColor: originConfig.color,
      badgeClass: originConfig.pillClass,
    },
    {
      id: 2,
      title: "Reactive Omni ReactVM",
      subtitle: "Event Ingestion & JIT Formulator",
      blockSpec: "~1s Finality",
      icon: Cpu,
      measuredMs: currentEvent.reactiveComputeMs,
      accentColor: "#7800FF",
      badgeClass: "text-pastel-lilac bg-pastel-lilac/10 border-pastel-lilac/30",
    },
    {
      id: 3,
      title: "Destination JIT Callback",
      subtitle: "Instant Fee Capture & Rebalance",
      blockSpec: "<200ms Execution",
      icon: Zap,
      measuredMs: currentEvent.destinationExecMs,
      accentColor: "#00FFCC",
      badgeClass: "text-neon-mint bg-neon-mint/10 border-neon-mint/30",
    },
  ];

  return (
    <GlassCard
      glassEffect
      className="p-8 sm:p-10 lg:p-12 rounded-[2.5rem] border border-white/10 shadow-glass relative overflow-hidden font-sans"
    >
      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[450px] h-[450px] rounded-full blur-[120px] transition-all duration-700"
        style={{
          background: isBase ? "rgba(0, 229, 255, 0.12)" : "rgba(255, 0, 127, 0.12)",
        }}
      />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[450px] h-[450px] bg-deep-purple/10 rounded-full blur-[120px]" />

      {/* Header bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider font-sans bg-white/[0.04] border border-white/10 text-off-white">
              <span className="w-2 h-2 rounded-full bg-neon-mint animate-pulse" />
              <span>Real-Time Reactive Loop</span>
            </span>
            <span className="text-xs text-white/40 font-mono">
              Tx: {currentEvent.id.slice(0, 10)}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Sub-Second JIT Rebalancer Conduit
          </h2>

          <p className="font-sans text-sm sm:text-base text-white/70 mt-2 max-w-2xl leading-relaxed">
            Autonomous event-driven concentrated liquidity injection triggered directly through ReactVM log subscription.
          </p>
        </div>

        {/* Quick action triggers */}
        <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onTriggerManualSwap(15)}
            className="px-5 py-3 rounded-full text-xs sm:text-sm font-semibold font-sans bg-white/[0.05] hover:bg-white/[0.1] text-off-white border border-white/15 transition flex items-center gap-2 shadow-sm"
          >
            <Flame className="w-4 h-4 text-pastel-orange" />
            <span>Simulate 15 ETH Swap</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onTriggerManualSwap(50)}
            className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold font-sans bg-gradient-to-r from-electric-blue via-deep-purple to-hot-pink text-white shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:shadow-[0_0_35px_rgba(255,0,127,0.6)] transition flex items-center gap-2"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>Trigger Mega Surge (50 ETH)</span>
          </motion.button>
        </div>
      </div>

      {/* Main Conduit / Timeline Pipeline */}
      <div className="my-8">
        {/* Animated Conduit Transit Track situated cleanly above stage cards */}
        <div className="relative h-6 mb-6 hidden md:block">
          {/* Underlying Tube */}
          <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-2.5 bg-white/[0.05] rounded-full overflow-hidden border border-white/10">
            <motion.div
              className="h-full w-full bg-gradient-to-r from-electric-blue via-deep-purple to-neon-mint"
              initial={{ x: "-100%" }}
              animate={{
                x:
                  currentEvent.stage === 0
                    ? "-100%"
                    : currentEvent.stage === 1
                    ? "-50%"
                    : currentEvent.stage === 2
                    ? "0%"
                    : "100%",
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </div>

          {/* Glowing Energy Orb traversing cleanly above stage cards */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-20 flex items-center justify-center -translate-x-1/2"
            animate={{
              left:
                currentEvent.stage === 1
                  ? "16.6%"
                  : currentEvent.stage === 2
                  ? "50%"
                  : currentEvent.stage === 3
                  ? "83.3%"
                  : "0%",
              opacity: currentEvent.stage === 0 ? 0 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 160,
              damping: 20,
            }}
          >
            <div className="w-6 h-6 rounded-full bg-white shadow-[0_0_25px_8px_rgba(0,229,255,0.9)] flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-electric-blue animate-ping" />
            </div>
          </motion.div>
        </div>

        {/* The 3 Stage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {stages.map((stage) => {
            const isCurrent = currentEvent.stage === stage.id;
            const isCompleted = currentEvent.stage >= stage.id;

            return (
              <motion.div
                key={stage.id}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className={`relative rounded-[2rem] p-6 sm:p-7 border backdrop-blur-2xl transition-all duration-300 overflow-hidden ${
                  isCurrent
                    ? "bg-white/[0.07] border-white/30 shadow-[0_0_35px_rgba(0,0,0,0.8)]"
                    : isCompleted
                    ? "bg-white/[0.04] border-white/15"
                    : "bg-white/[0.02] border-white/5 opacity-60"
                }`}
                style={{
                  boxShadow: isCurrent ? `0 0 35px ${stage.accentColor}33` : "none",
                }}
              >
                {/* Active Stage Pulsing Indicator */}
                {isCurrent && (
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  />
                )}

                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border transition"
                    style={{
                      background: isCurrent ? `${stage.accentColor}25` : "rgba(255,255,255,0.03)",
                      borderColor: isCurrent ? stage.accentColor : "rgba(255,255,255,0.1)",
                      color: stage.accentColor,
                    }}
                  >
                    <stage.icon className="w-6 h-6" />
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-sans font-bold border ${stage.badgeClass}`}>
                    {stage.blockSpec}
                  </span>
                </div>

                <div className="text-xs font-semibold text-white/50 uppercase tracking-wider font-sans">
                  Stage 0{stage.id}
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                  {stage.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-white/60 mt-1 leading-relaxed">
                  {stage.subtitle}
                </p>

                {/* Stage Latency Status */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-sans">
                  <span className="text-xs text-white/50 uppercase tracking-wider font-medium">
                    Stage Benchmark
                  </span>
                  <div className="text-sm sm:text-base font-extrabold flex items-center gap-1.5 font-mono">
                    {isCompleted ? (
                      <span className="text-neon-mint flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-neon-mint" />
                        <span>{stage.measuredMs} ms</span>
                      </span>
                    ) : (
                      <span className="text-white/30 animate-pulse text-xs">Waiting...</span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Latency Summary Bar */}
      <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 font-sans">
        <div className="flex flex-wrap items-center gap-8">
          <div>
            <div className="text-xs uppercase font-sans text-white/50 tracking-wider font-medium">
              Total End-to-End Latency
            </div>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-4xl sm:text-5xl font-black tracking-tight text-neon-mint font-mono">
                {(currentEvent.totalLatencyMs / 1000).toFixed(3)}s
              </span>
              <span className="text-sm font-mono text-white/50">
                ({currentEvent.totalLatencyMs} ms)
              </span>
            </div>
          </div>

          <div className="h-12 w-[1px] bg-white/10 hidden sm:block" />

          <div>
            <div className="text-xs uppercase font-sans text-white/50 tracking-wider font-medium">
              JIT Fee Captured
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-pastel-mint font-mono">
                +{currentEvent.feesCapturedEth.toFixed(4)} ETH
              </span>
              <span className="text-xs font-mono text-white/50">
                (≈ ${(currentEvent.feesCapturedEth * 3150).toFixed(2)} USD)
              </span>
            </div>
          </div>

          <div className="h-12 w-[1px] bg-white/10 hidden lg:block" />

          <div className="hidden lg:block">
            <div className="text-xs uppercase font-sans text-white/50 tracking-wider font-medium">
              Swap Imbalance Volume
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono mt-1">
              {currentEvent.volumeEth.toFixed(1)} ETH
            </div>
          </div>
        </div>

        {/* Verification Pill */}
        <div className="flex items-center">
          <div className="px-5 py-3 rounded-2xl bg-neon-mint/10 border border-neon-mint/30 shadow-glow-mint flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neon-mint/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-neon-mint fill-neon-mint" />
            </div>
            <div>
              <div className="text-xs font-black text-neon-mint uppercase tracking-wider font-sans">
                Sub-Second Finality Verified
              </div>
              <div className="text-xs text-white/70 font-sans">
                Single-Block Atomic Flash Rebalance
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
