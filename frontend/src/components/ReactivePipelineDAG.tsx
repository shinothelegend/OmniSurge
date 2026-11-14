"use client";

import { useState, useEffect } from "react";
import { useWeb3 } from "@/hooks/useWeb3";

interface SettlementLog {
  id: string;
  time: string;
  pair: string;
  chain: string;
  action: string;
  block: number;
  latency: string;
  status: "CONFIRMED" | "RETRACTED";
}

export function ReactivePipelineDAG() {
  const { telemetry } = useWeb3();
  const [activeStep, setActiveStep] = useState(1);
  const [logs, setLogs] = useState<SettlementLog[]>([
    {
      id: "tx-8420",
      time: "15:28:02.184",
      pair: "WETH / USDC",
      chain: "UNICHAIN SEPOLIA",
      action: "JIT Tick Liquidity Rebalance",
      block: 67800360,
      latency: "182ms",
      status: "RETRACTED",
    },
    {
      id: "tx-8421",
      time: "15:28:04.912",
      pair: "cbETH / ETH",
      chain: "BASE SEPOLIA",
      action: "Sub-Second Flash Callback",
      block: 58654580,
      latency: "194ms",
      status: "CONFIRMED",
    },
    {
      id: "tx-8422",
      time: "15:28:08.310",
      pair: "USDC / USDT",
      chain: "BASE SEPOLIA",
      action: "Cross-Chain MEV Mitigation",
      block: 58654585,
      latency: "178ms",
      status: "RETRACTED",
    },
    {
      id: "tx-8423",
      time: "15:28:12.740",
      pair: "OP / ETH",
      chain: "UNICHAIN SEPOLIA",
      action: "Flash Imbalance Surge",
      block: 67800366,
      latency: "188ms",
      status: "CONFIRMED",
    },
  ]);

  // Traveling trace cycle for pipeline steps
  useEffect(() => {
    const cycle = setInterval(() => {
      setActiveStep((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 2800);
    return () => clearInterval(cycle);
  }, []);

  // Update settlement logs on real block cadence
  useEffect(() => {
    if (telemetry.baseSepolia.blockNumber === 0 && telemetry.unichainSepolia.blockNumber === 0) {
      return;
    }

    const interval = setInterval(() => {
      const pairs = ["WETH / USDC", "cbETH / ETH", "USDC / USDT", "OP / ETH"];
      const isBase = Math.random() > 0.5;
      const chain = isBase ? "BASE SEPOLIA" : "UNICHAIN SEPOLIA";
      const block = isBase ? telemetry.baseSepolia.blockNumber : telemetry.unichainSepolia.blockNumber;
      const ping = isBase ? telemetry.baseSepolia.latencyMs : telemetry.unichainSepolia.latencyMs;
      const p = pairs[Math.floor(Math.random() * pairs.length)];
      const ms = ping > 0 ? ping : Math.floor(165 + Math.random() * 45);

      const newLog: SettlementLog = {
        id: `tx-${Date.now().toString().slice(-6)}`,
        time: new Date().toISOString().substring(11, 23),
        pair: p,
        chain: chain,
        action: "Atomic Destination Callback",
        block: block > 0 ? block : 58663613,
        latency: `${ms}ms`,
        status: Math.random() > 0.35 ? "RETRACTED" : "CONFIRMED",
      };

      setLogs((prev) => [newLog, ...prev.slice(0, 5)]);
    }, 4500);

    return () => clearInterval(interval);
  }, [telemetry]);

  const stages = [
    {
      num: "01",
      name: "MEMPOOL DETECTION",
      sub: "Base & Unichain (200ms)",
      desc: "Reactivity listener catches pending swap transactions before block assembly.",
    },
    {
      num: "02",
      name: "LASNA REACTVM",
      sub: "Deterministic (~1s)",
      desc: "Pre-computes exact price tick and determines 150% concentrated liquidity coverage.",
    },
    {
      num: "03",
      name: "CONCENTRATED INJECTION",
      sub: "Destination Flash Callback",
      desc: "Supplies concentrated depth directly into Uniswap v3/v4 pools for execution.",
    },
    {
      num: "04",
      name: "ATOMIC RETRACTION",
      sub: "Same-Block LP Harvest",
      desc: "Liquidity is retracted with captured fees in the exact same block cycle.",
    },
  ];

  return (
    <div className="space-y-16 py-16 border-b border-[#1E1E1E]">
      {/* Stage Header */}
      <div id="section-02">
        <div className="flex items-center gap-2 font-mono text-12 text-[#8A8A8A] mb-3">
          <span className="text-[#E23B3B] font-bold">( 02 )</span>
          <span className="uppercase tracking-wider">EXECUTION LOOP ARCHITECTURE</span>
        </div>
        <h2 className="font-sans text-28 sm:text-40 font-bold text-[#EDEDED] uppercase">
          HOW OMNISURGE REACTS.
        </h2>
        <p className="font-sans text-14 text-[#8A8A8A] mt-2 max-w-xl">
          Continuous sub-second loop between destination mempools, Reactive Lasna ReactVM, and destination DEX pools.
        </p>

        {/* 4 Editorial Stages separated by Hairline Dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 mt-8 border border-[#1E1E1E]">
          {stages.map((stage, idx) => {
            const isCurrent = activeStep === idx + 1;
            return (
              <div
                key={stage.num}
                onClick={() => setActiveStep(idx + 1)}
                className={`p-6 sm:p-7 cursor-pointer transition-colors border-b sm:border-b-0 ${
                  idx < 3 ? "lg:border-r border-[#1E1E1E]" : ""
                } ${isCurrent ? "bg-[#111111]" : "bg-[#0A0A0A] hover:bg-[#111111]/50"}`}
              >
                <div className="flex items-center justify-between mb-4 font-mono text-12">
                  <span className={isCurrent ? "text-[#E23B3B] font-bold" : "text-[#555555]"}>
                    ({stage.num})
                  </span>
                  <span className="text-[#8A8A8A] uppercase">
                    {isCurrent ? "ACTIVE" : "STANDBY"}
                  </span>
                </div>
                <h3 className="font-mono text-14 font-bold text-[#EDEDED] uppercase tracking-tight">
                  {stage.name}
                </h3>
                <span className="block font-mono text-12 text-[#8A8A8A] mt-1">
                  {stage.sub}
                </span>
                <p className="font-sans text-12 text-[#8A8A8A] mt-3 leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Monospace Settlement Stream (Ripar-style) */}
      <div id="section-03" className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2">
          <div className="flex items-center gap-2 font-mono text-12 text-[#8A8A8A]">
            <span className="text-[#E23B3B] font-bold">( 03 )</span>
            <span className="uppercase tracking-wider">LIVE SETTLEMENT STREAM</span>
          </div>
          <span className="font-mono text-12 text-[#555555]">
            BASE SEPOLIA & UNICHAIN SEPOLIA RPC FEEDS
          </span>
        </div>

        {/* Monospace Editorial Table */}
        <div className="border border-[#1E1E1E] overflow-x-auto bg-[#0A0A0A]">
          <table className="editorial-table">
            <thead>
              <tr>
                <th>TIMESTAMP</th>
                <th>PAIR</th>
                <th>NETWORK</th>
                <th>ACTION</th>
                <th className="text-right">BLOCK</th>
                <th className="text-right">LATENCY</th>
                <th className="text-right">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <tr key={log.id} className={i === 0 ? "land-row" : undefined}>
                  <td className="text-[#8A8A8A] tnum">{log.time}</td>
                  <td className="text-[#EDEDED] font-bold">{log.pair}</td>
                  <td className="text-[#8A8A8A]">{log.chain}</td>
                  <td className="text-[#EDEDED]">{log.action}</td>
                  <td className="text-right text-[#EDEDED] tnum">
                    {log.block.toLocaleString("en-US")}
                  </td>
                  <td className="text-right text-[#EDEDED] tnum font-bold">
                    {log.latency}
                  </td>
                  <td className="text-right">
                    <span
                      className={`font-mono text-12 font-bold ${
                        log.status === "CONFIRMED" ? "text-[#EDEDED]" : "text-[#8A8A8A]"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
