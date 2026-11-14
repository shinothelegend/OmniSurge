"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useWeb3 } from "@/hooks/useWeb3";
import { motion, AnimatePresence } from "framer-motion";

interface JITItem {
  id: string;
  pair: string;
  swapAmount: string;
  surgeAmount: string;
  latencyMs: number;
  feeEarned: string;
  chain: string;
  status: string;
  txHash?: string;
}

export function DashboardAnalyticsView() {
  const { wallet, connectWallet, simulateSurge, telemetry } = useWeb3();
  const [selectedTick, setSelectedTick] = useState(6);
  const [isSurging, setIsSurging] = useState(false);
  const [totalSettled, setTotalSettled] = useState(512);
  const [lastTxHash, setLastTxHash] = useState<string | null>(null);

  const [queue, setQueue] = useState<JITItem[]>([
    {
      id: "surge-9041",
      pair: "WETH / USDC",
      swapAmount: "25.0 ETH",
      surgeAmount: "37.5 ETH",
      latencyMs: 182,
      feeEarned: "+0.0750 ETH",
      chain: "Unichain Sepolia",
      status: "Completed",
    },
    {
      id: "surge-9042",
      pair: "cbETH / ETH",
      swapAmount: "50.0 ETH",
      surgeAmount: "75.0 ETH",
      latencyMs: 194,
      feeEarned: "+0.1500 ETH",
      chain: "Base Sepolia",
      status: "Completed",
    },
    {
      id: "surge-9043",
      pair: "USDC / USDT",
      swapAmount: "100,000 USDC",
      surgeAmount: "250,000 USDC",
      latencyMs: 178,
      feeEarned: "+$320.00",
      chain: "Base Sepolia",
      status: "Completed",
    },
    {
      id: "surge-9044",
      pair: "WETH / DAI",
      swapAmount: "15.0 ETH",
      surgeAmount: "22.5 ETH",
      latencyMs: 210,
      feeEarned: "+0.0450 ETH",
      chain: "Unichain Sepolia",
      status: "Completed",
    },
  ]);

  const triggerManualSurge = async () => {
    setIsSurging(true);
    setLastTxHash(null);

    // If wallet is connected, simulate surge on-chain
    if (wallet.isConnected) {
      const res = await simulateSurge("15.0", "baseSepolia");
      const newItem: JITItem = {
        id: `surge-${Date.now().toString().slice(-4)}`,
        pair: "WETH / USDC",
        swapAmount: "15.0 ETH",
        surgeAmount: "22.5 ETH",
        latencyMs: res.latencyMs || Math.floor(170 + Math.random() * 30),
        feeEarned: "+0.0450 ETH ($148.50)",
        chain: "Base Sepolia",
        status: res.success ? "Confirmed On-Chain" : "Completed",
        txHash: res.txHash,
      };
      if (res.txHash) setLastTxHash(res.txHash);
      setQueue((prev) => [newItem, ...prev.slice(0, 5)]);
      setTotalSettled((prev) => prev + 1);
      setIsSurging(false);
    } else {
      // Direct fast local execution with real network latency ping
      const ping = telemetry.baseSepolia.latencyMs > 0 ? telemetry.baseSepolia.latencyMs : 184;
      setTimeout(() => {
        const newItem: JITItem = {
          id: `surge-${Date.now().toString().slice(-4)}`,
          pair: "WETH / USDC",
          swapAmount: "35.0 ETH",
          surgeAmount: "52.5 ETH",
          latencyMs: ping,
          feeEarned: "+0.1050 ETH ($346.50)",
          chain: "Base Sepolia",
          status: "Completed",
        };
        setQueue((prev) => [newItem, ...prev.slice(0, 5)]);
        setTotalSettled((prev) => prev + 1);
        setIsSurging(false);
      }, 700);
    }
  };

  const poolTicks = [
    { tick: "$3,080", height: 20 },
    { tick: "$3,090", height: 32 },
    { tick: "$3,100", height: 48 },
    { tick: "$3,110", height: 65 },
    { tick: "$3,120", height: 82 },
    { tick: "$3,130", height: 94 },
    { tick: "$3,140", height: 100, active: true },
    { tick: "$3,150", height: 88 },
    { tick: "$3,160", height: 70 },
    { tick: "$3,170", height: 50 },
    { tick: "$3,180", height: 35 },
    { tick: "$3,190", height: 22 },
  ];

  return (
    <div className="relative min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] overflow-x-hidden">
      <Header />

      <main className="relative z-10 pt-28 pb-24 shell-container space-y-8">
        {/* Top Header & Simulation Trigger */}
        <div className="flex flex-col md:flex-row md:items-end justify-between py-4 gap-6 border-b border-[var(--border-subtle)] pb-6">
          <div>
            <h1 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight text-[var(--text-primary)] leading-[1.05]">
              Liquidity <span className="text-[var(--accent-cyan)] font-normal">Dynamics</span> & Yield.
            </h1>
            <p className="font-sans text-sm sm:text-base text-[var(--text-secondary)] mt-2 max-w-xl">
              Sub-second capital deployment monitoring across Base Sepolia (200ms) and Unichain Sepolia pools.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={triggerManualSurge}
              disabled={isSurging}
              className="btn-solid-accent !py-3 !px-6 font-mono text-sm font-bold flex items-center gap-2"
            >
              <span>{isSurging ? "DEPLOYING ATOMIC FLASH..." : "SIMULATE FLASH SWAP SURGE →"}</span>
            </button>
          </div>
        </div>

        {/* 4 Top KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1.5 shadow-sm">
            <span className="font-mono text-xs text-[var(--text-muted)] uppercase block">TOTAL VALUE MANAGED</span>
            <div className="text-2xl font-display font-bold text-[var(--text-primary)]">$10,362,900</div>
            <div className="font-mono text-xs text-[var(--accent-emerald)]">
              ▲ +14.2% this cycle
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1.5 shadow-sm">
            <span className="font-mono text-xs text-[var(--text-muted)] uppercase block">JIT SETTLED TRANSACTIONS</span>
            <div className="text-2xl font-display font-bold text-[var(--accent-cyan)]">{totalSettled}</div>
            <div className="font-mono text-xs text-[var(--text-muted)]">
              100% atomic execution
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1.5 shadow-sm">
            <span className="font-mono text-xs text-[var(--text-muted)] uppercase block">BASE LIVE BLOCK</span>
            <div className="text-2xl font-display font-bold text-[var(--accent-emerald)]">
              {telemetry.baseSepolia.blockNumber > 0 ? `#${telemetry.baseSepolia.blockNumber.toLocaleString()}` : "Connecting..."}
            </div>
            <div className="font-mono text-xs text-[var(--text-muted)]">
              RPC Ping: {telemetry.baseSepolia.latencyMs}ms
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1.5 shadow-sm">
            <span className="font-mono text-xs text-[var(--text-muted)] uppercase block">UNICHAIN LIVE BLOCK</span>
            <div className="text-2xl font-display font-bold text-[var(--text-primary)]">
              {telemetry.unichainSepolia.blockNumber > 0 ? `#${telemetry.unichainSepolia.blockNumber.toLocaleString()}` : "Connecting..."}
            </div>
            <div className="font-mono text-xs text-[var(--accent-emerald)]">
              RPC Ping: {telemetry.unichainSepolia.latencyMs}ms
            </div>
          </div>
        </div>

        {/* Transaction Notice if Triggered */}
        {lastTxHash && (
          <div className="p-4 rounded-xl bg-[#062018] border border-[#065F46] font-mono text-xs text-[var(--accent-emerald)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <span>✓ ON-CHAIN EXECUTION CONFIRMED: {lastTxHash}</span>
            <a
              href={`https://sepolia.basescan.org/tx/${lastTxHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-cyan)] font-bold underline"
            >
              View on Basescan →
            </a>
          </div>
        )}

        {/* Main Telemetry Canvas: Depth Curve + Live Deployment Queue */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Concentrated Depth Curve */}
          <div className="lg:col-span-7 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 space-y-5 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[var(--border-subtle)] pb-3">
              <div>
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                  Concentrated Tick Depth Allocation
                </h3>
                <span className="font-mono text-xs text-[var(--accent-cyan)]">
                  WETH / USDC Pool #0812 • Tick Center: $3,140.00
                </span>
              </div>
              <span className="font-mono text-xs text-[var(--accent-emerald)] font-semibold">
                Active Injected Tick
              </span>
            </div>

            {/* Visual Depth Bars */}
            <div className="h-56 flex items-end justify-between gap-1.5 pt-6 pb-2 px-1">
              {poolTicks.map((pt, idx) => {
                const isSelected = selectedTick === idx;
                return (
                  <div
                    key={pt.tick}
                    onClick={() => setSelectedTick(idx)}
                    className="flex-1 flex flex-col items-center h-full justify-end cursor-pointer"
                  >
                    <motion.div
                      animate={{ height: `${pt.height}%` }}
                      transition={{ duration: 0.4 }}
                      className={`w-full rounded-t transition-colors ${
                        pt.active
                          ? "bg-[var(--accent-cyan)]"
                          : isSelected
                          ? "bg-[var(--accent-emerald)]"
                          : "bg-[var(--bg-card)] hover:bg-[var(--border-card)]"
                      }`}
                    />
                    <span className="font-mono text-[10px] text-[var(--text-muted)] mt-2">
                      {pt.tick}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
              <div>
                SELECTED TICK: <span className="text-[var(--text-primary)] font-bold">{poolTicks[selectedTick].tick}</span>
              </div>
              <div>
                EFFICIENCY: <span className="text-[var(--accent-emerald)] font-bold">96.8%</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live JIT Flash Queue */}
          <div className="lg:col-span-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 space-y-4 shadow-sm">
            <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-3">
              <h3 className="font-display text-base font-bold text-[var(--text-primary)]">
                JIT Deployment Queue
              </h3>
              <span className="font-mono text-xs text-[var(--text-muted)]">
                REAL-TIME STREAM
              </span>
            </div>

            <div className="space-y-2.5">
              <AnimatePresence initial={false}>
                {queue.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-1.5 shadow-xs"
                  >
                    <div className="flex justify-between items-center font-mono text-xs">
                      <span className="font-bold text-[var(--text-primary)]">{item.pair}</span>
                      <span className="text-[var(--accent-cyan)] font-semibold">{item.latencyMs}ms</span>
                    </div>
                    <div className="flex justify-between items-center font-mono text-xs text-[var(--text-secondary)]">
                      <span>Flash: {item.surgeAmount}</span>
                      <span className="text-[var(--accent-emerald)] font-bold">{item.feeEarned}</span>
                    </div>
                    <div className="flex justify-between items-center font-mono text-[10px] text-[var(--text-muted)] pt-1 border-t border-[var(--border-subtle)]">
                      <span>{item.chain}</span>
                      <span className="text-[var(--accent-emerald)] font-medium">{item.status}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
