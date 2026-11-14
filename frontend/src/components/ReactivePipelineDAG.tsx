"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWeb3 } from "@/hooks/useWeb3";

interface ExecutionLog {
  id: string;
  time: string;
  pair: string;
  chain: string;
  action: string;
  latency: string;
  capturedYield: string;
  status: string;
  blockNumber?: number;
}

const INITIAL_LOGS: ExecutionLog[] = [
  {
    id: "tx-8419",
    time: "17:14:02.184",
    pair: "WETH / USDC",
    chain: "UNICHAIN SEPOLIA",
    action: "JIT Tick Defense #19204",
    latency: "182ms",
    capturedYield: "+0.142 ETH",
    status: "Retracted",
  },
  {
    id: "tx-8420",
    time: "17:14:04.912",
    pair: "cbETH / ETH",
    chain: "BASE SEPOLIA",
    action: "Sub-second Flash Liquidity",
    latency: "194ms",
    capturedYield: "+0.285 ETH",
    status: "Confirmed",
  },
  {
    id: "tx-8421",
    time: "17:14:08.310",
    pair: "USDC / USDT",
    chain: "BASE SEPOLIA",
    action: "Micro-Slippage Mitigation",
    latency: "178ms",
    capturedYield: "+$340.00",
    status: "Retracted",
  },
];

export function ReactivePipelineDAG() {
  const { telemetry } = useWeb3();
  const [activeStep, setActiveStep] = useState(1);
  const [logs, setLogs] = useState<ExecutionLog[]>(INITIAL_LOGS);

  // Automatically cycle through pipeline steps for animated live trace
  useEffect(() => {
    const cycle = setInterval(() => {
      setActiveStep((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 2800);
    return () => clearInterval(cycle);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const pairs = ["WETH / USDC", "cbETH / ETH", "USDC / USDT", "OP / ETH"];
      const isBase = Math.random() > 0.5;
      const chain = isBase ? "BASE SEPOLIA" : "UNICHAIN SEPOLIA";
      const block = isBase ? telemetry.baseSepolia.blockNumber : telemetry.unichainSepolia.blockNumber;
      const rpcPing = isBase ? telemetry.baseSepolia.latencyMs : telemetry.unichainSepolia.latencyMs;
      const p = pairs[Math.floor(Math.random() * pairs.length)];
      const ms = rpcPing > 0 ? rpcPing : Math.floor(165 + Math.random() * 45);

      const newLog: ExecutionLog = {
        id: `tx-${Math.floor(8422 + Math.random() * 9000)}`,
        time: new Date().toISOString().substring(11, 23),
        pair: p,
        chain: chain,
        action: block > 0 ? `JIT Block #${block.toLocaleString()}` : "Sub-Second Reactive Injection",
        latency: `${ms}ms`,
        capturedYield: `+${(0.08 + Math.random() * 0.25).toFixed(3)} ETH`,
        status: "Retracted",
        blockNumber: block,
      };

      setLogs((prev) => [newLog, ...prev.slice(0, 4)]);
    }, 4500);

    return () => clearInterval(interval);
  }, [telemetry]);

  const pipelineSteps = [
    {
      num: 1,
      title: "Mempool Detection",
      subtitle: "Base & Unichain (200ms)",
      desc: "Reactivity listener catches pending swap transactions in under 50ms before block assembly.",
      icon: "⚡",
    },
    {
      num: 2,
      title: "Reactive Lasna ReactVM",
      subtitle: "Deterministic Finality (~1s)",
      desc: "Pre-computes exact price tick and determines optimal liquidity depth with zero directional risk.",
      icon: "⚙",
    },
    {
      num: 3,
      title: "Concentrated Injection",
      subtitle: "Destination Flash Callback",
      desc: "Supplies tight concentrated depth directly into Uniswap v3/v4 pools for the execution block.",
      icon: "💧",
    },
    {
      num: 4,
      title: "Atomic Retraction",
      subtitle: "Same-Block LP Harvest",
      desc: "Liquidity is retracted with captured swap fees in the exact same block cycle. Capital is safe.",
      icon: "🔒",
    },
  ];

  return (
    <div className="w-full space-y-8">
      {/* Top Header */}
      <div className="border-b border-[var(--border-subtle)] pb-6">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight uppercase">
          How OmniSurge <span className="text-[var(--accent-cyan)] font-normal">Reacts</span>.
        </h2>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-sans mt-2 max-w-xl">
          Continuous sub-second execution loop between mempool events, reactive smart contracts on Lasna, and destination pools.
        </p>
      </div>

      {/* 4 Interactive Connected DAG Steps with Live Traveling Animation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pipelineSteps.map((step) => {
          const isCurrent = activeStep === step.num;
          return (
            <motion.div
              key={step.num}
              onClick={() => setActiveStep(step.num)}
              animate={{
                scale: isCurrent ? 1.02 : 1,
              }}
              transition={{ duration: 0.3 }}
              className={`cursor-pointer rounded-2xl p-6 border transition-all ${
                isCurrent
                  ? "bg-[var(--bg-card)] border-[var(--accent-cyan)] shadow-md"
                  : "bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:bg-[var(--bg-card)]"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center font-display font-bold text-base transition-colors ${
                    isCurrent
                      ? "bg-[var(--accent-cyan)] text-[#09090B]"
                      : "bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-subtle)]"
                  }`}
                >
                  {step.icon}
                </div>
                <div className="flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] uppercase font-semibold">
                  {isCurrent && (
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] animate-ping" />
                  )}
                  <span>STEP 0{step.num}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-display text-base font-bold text-[var(--text-primary)] tracking-tight">
                  {step.title}
                </h3>
                <span className="block font-mono text-[11px] text-[var(--accent-cyan)] font-medium">
                  {step.subtitle}
                </span>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans pt-1">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Execution Stream Table */}
      <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[var(--border-subtle)] pb-3 font-mono text-xs text-[var(--text-secondary)]">
          <span className="text-[var(--text-primary)] font-bold uppercase tracking-wider">
            REACTIVE SETTLEMENT STREAM
          </span>
          <span className="text-[var(--text-muted)] text-[11px]">
            Base Sepolia & Unichain Sepolia Live Feeds
          </span>
        </div>

        {/* Table of Live Executions */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs min-w-[650px]">
            <thead>
              <tr className="text-[var(--text-muted)] border-b border-[var(--border-subtle)] pb-3 uppercase text-[11px]">
                <th className="pb-3 font-semibold">TIMESTAMP</th>
                <th className="pb-3 font-semibold">PAIR</th>
                <th className="pb-3 font-semibold">CHAIN</th>
                <th className="pb-3 font-semibold">ACTION</th>
                <th className="pb-3 font-semibold">LATENCY</th>
                <th className="pb-3 font-semibold text-right">CAPTURED YIELD</th>
                <th className="pb-3 font-semibold text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              <AnimatePresence initial={false}>
                {logs.map((log) => (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-[var(--bg-card)] transition-colors"
                  >
                    <td className="py-3 text-[var(--text-secondary)]">{log.time}</td>
                    <td className="py-3 font-bold text-[var(--text-primary)]">{log.pair}</td>
                    <td className="py-3 text-[11px] text-[var(--accent-cyan)] font-medium">{log.chain}</td>
                    <td className="py-3 text-[var(--text-secondary)]">{log.action}</td>
                    <td className="py-3 text-[var(--accent-cyan)] font-bold">{log.latency}</td>
                    <td className="py-3 text-right font-bold text-[var(--accent-emerald)]">
                      {log.capturedYield}
                    </td>
                    <td className="py-3 text-right text-[var(--accent-emerald)] font-semibold">
                      {log.status}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
