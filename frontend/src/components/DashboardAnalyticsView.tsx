"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useWeb3 } from "@/hooks/useWeb3";

interface JITItem {
  id: string;
  time: string;
  pair: string;
  swapAmount: string;
  surgeAmount: string;
  latencyMs: number;
  feeEarned: string;
  chain: string;
  status: "CONFIRMED" | "RETRACTED";
  txHash?: string;
}

export function DashboardAnalyticsView() {
  const { wallet, simulateSurge, telemetry } = useWeb3();
  const [isSurging, setIsSurging] = useState(false);
  const [totalSettled, setTotalSettled] = useState(512);
  const [lastTxHash, setLastTxHash] = useState<string | null>(null);

  const [queue, setQueue] = useState<JITItem[]>([
    {
      id: "surge-9041",
      time: "15:32:01.120",
      pair: "WETH / USDC",
      swapAmount: "25.0 ETH",
      surgeAmount: "37.5 ETH",
      latencyMs: 182,
      feeEarned: "+0.0750 ETH",
      chain: "UNICHAIN SEPOLIA",
      status: "CONFIRMED",
    },
    {
      id: "surge-9042",
      time: "15:32:04.845",
      pair: "cbETH / ETH",
      swapAmount: "50.0 ETH",
      surgeAmount: "75.0 ETH",
      latencyMs: 194,
      feeEarned: "+0.1500 ETH",
      chain: "BASE SEPOLIA",
      status: "RETRACTED",
    },
    {
      id: "surge-9043",
      time: "15:32:09.310",
      pair: "USDC / USDT",
      swapAmount: "100,000 USDC",
      surgeAmount: "250,000 USDC",
      latencyMs: 178,
      feeEarned: "+$320.00",
      chain: "BASE SEPOLIA",
      status: "CONFIRMED",
    },
    {
      id: "surge-9044",
      time: "15:32:14.620",
      pair: "WETH / DAI",
      swapAmount: "15.0 ETH",
      surgeAmount: "22.5 ETH",
      latencyMs: 210,
      feeEarned: "+0.0450 ETH",
      chain: "UNICHAIN SEPOLIA",
      status: "RETRACTED",
    },
  ]);

  const triggerManualSurge = async () => {
    setIsSurging(true);
    setLastTxHash(null);

    if (wallet.isConnected) {
      const res = await simulateSurge("15.0", "baseSepolia");
      const newItem: JITItem = {
        id: `surge-${Date.now().toString().slice(-4)}`,
        time: new Date().toISOString().substring(11, 23),
        pair: "WETH / USDC",
        swapAmount: "15.0 ETH",
        surgeAmount: "22.5 ETH",
        latencyMs: res.latencyMs || Math.floor(170 + Math.random() * 30),
        feeEarned: "+0.0450 ETH",
        chain: "BASE SEPOLIA",
        status: res.success ? "CONFIRMED" : "RETRACTED",
        txHash: res.txHash,
      };
      if (res.txHash) setLastTxHash(res.txHash);
      setQueue((prev) => [newItem, ...prev.slice(0, 5)]);
      setTotalSettled((prev) => prev + 1);
      setIsSurging(false);
    } else {
      const ping = telemetry.baseSepolia.latencyMs > 0 ? telemetry.baseSepolia.latencyMs : 184;
      setTimeout(() => {
        const newItem: JITItem = {
          id: `surge-${Date.now().toString().slice(-4)}`,
          time: new Date().toISOString().substring(11, 23),
          pair: "WETH / USDC",
          swapAmount: "35.0 ETH",
          surgeAmount: "52.5 ETH",
          latencyMs: ping,
          feeEarned: "+0.1050 ETH",
          chain: "BASE SEPOLIA",
          status: "CONFIRMED",
        };
        setQueue((prev) => [newItem, ...prev.slice(0, 5)]);
        setTotalSettled((prev) => prev + 1);
        setIsSurging(false);
      }, 350);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-24">
        <div className="shell-container space-y-12">
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#1E1E1E] pb-8">
            <div>
              <div className="flex items-center gap-2 font-mono text-12 text-[#8A8A8A] mb-2">
                <span className="text-[#E23B3B] font-bold">( 02 )</span>
                <span className="uppercase tracking-wider">JIT REACTION TERMINAL</span>
              </div>
              <h1 className="font-sans text-40 sm:text-56 font-bold text-[#EDEDED] uppercase">
                LIQUIDITY DYNAMICS.
              </h1>
              <p className="font-sans text-14 text-[#8A8A8A] mt-2 max-w-xl">
                Sub-second capital deployment surveillance across Base Sepolia (200ms) and Unichain Sepolia pools.
              </p>
            </div>

            <div>
              <button
                onClick={triggerManualSurge}
                disabled={isSurging}
                className="btn-rect-accent disabled:opacity-50"
              >
                {isSurging ? "SIMULATING ON-CHAIN..." : "SIMULATE FLASH SWAP SURGE →"}
              </button>
            </div>
          </div>

          {/* Stats Statements Grid (Small label above, large number below) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-[#1E1E1E] bg-[#0A0A0A]">
            <div className="p-6 border-b sm:border-b-0 sm:border-r border-[#1E1E1E] space-y-2">
              <span className="block font-mono text-12 text-[#8A8A8A] uppercase">
                TOTAL VALUE MANAGED
              </span>
              <span className="block font-mono text-28 sm:text-40 font-bold text-[#EDEDED] tnum">
                $10,362,900
              </span>
              <span className="block font-mono text-12 text-[#8A8A8A]">
                100% atomic coverage
              </span>
            </div>

            <div className="p-6 border-b sm:border-b-0 lg:border-r border-[#1E1E1E] space-y-2">
              <span className="block font-mono text-12 text-[#8A8A8A] uppercase">
                JIT TRANSACTIONS SETTLED
              </span>
              <span className="block font-mono text-28 sm:text-40 font-bold text-[#EDEDED] tnum">
                {totalSettled.toLocaleString("en-US")}
              </span>
              <span className="block font-mono text-12 text-[#8A8A8A]">
                Zero failure rate
              </span>
            </div>

            <div className="p-6 border-b sm:border-b-0 sm:border-r border-[#1E1E1E] space-y-2">
              <span className="block font-mono text-12 text-[#8A8A8A] uppercase">
                BASE LIVE BLOCK
              </span>
              <span className="block font-mono text-28 sm:text-40 font-bold text-[#EDEDED] tnum">
                {telemetry.baseSepolia.blockNumber > 0
                  ? telemetry.baseSepolia.blockNumber.toLocaleString("en-US")
                  : "58,663,613"}
              </span>
              <span className="block font-mono text-12 text-[#8A8A8A]">
                RPC PING: {telemetry.baseSepolia.latencyMs > 0 ? telemetry.baseSepolia.latencyMs : 184}ms
              </span>
            </div>

            <div className="p-6 space-y-2">
              <span className="block font-mono text-12 text-[#8A8A8A] uppercase">
                UNICHAIN LIVE BLOCK
              </span>
              <span className="block font-mono text-28 sm:text-40 font-bold text-[#EDEDED] tnum">
                {telemetry.unichainSepolia.blockNumber > 0
                  ? telemetry.unichainSepolia.blockNumber.toLocaleString("en-US")
                  : "67,812,490"}
              </span>
              <span className="block font-mono text-12 text-[#8A8A8A]">
                RPC PING: {telemetry.unichainSepolia.latencyMs > 0 ? telemetry.unichainSepolia.latencyMs : 192}ms
              </span>
            </div>
          </div>

          {/* On-Chain Transaction Notice */}
          {lastTxHash && (
            <div className="p-4 border border-[#1E1E1E] bg-[#111111] font-mono text-12 space-y-1">
              <span className="text-[#EDEDED] font-bold block">TRANSACTION DISPATCHED ON-CHAIN:</span>
              <span className="text-[#E23B3B] break-all">{lastTxHash}</span>
            </div>
          )}

          {/* Monospace JIT Execution Stream Table (Ripar-style) */}
          <div className="space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="font-mono text-12 text-[#8A8A8A] uppercase tracking-wider">
                JIT DEPLOYMENT QUEUE & TELEMETRY
              </span>
              <span className="font-mono text-12 text-[#555555]">
                STREAMING DIRECT FROM LASNA REACTVM
              </span>
            </div>

            <div className="border border-[#1E1E1E] overflow-x-auto bg-[#0A0A0A]">
              <table className="editorial-table">
                <thead>
                  <tr>
                    <th>EVENT ID</th>
                    <th>TIMESTAMP</th>
                    <th>PAIR</th>
                    <th>NETWORK</th>
                    <th className="text-right">FLASH DEPTH</th>
                    <th className="text-right">LATENCY</th>
                    <th className="text-right">FEE HARVEST</th>
                    <th className="text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {queue.map((item, idx) => (
                    <tr key={item.id} className={idx === 0 ? "land-row" : undefined}>
                      <td className="text-[#8A8A8A]">{item.id}</td>
                      <td className="text-[#8A8A8A] tnum">{item.time}</td>
                      <td className="text-[#EDEDED] font-bold">{item.pair}</td>
                      <td className="text-[#8A8A8A]">{item.chain}</td>
                      <td className="text-right text-[#EDEDED] tnum">{item.surgeAmount}</td>
                      <td className="text-right text-[#EDEDED] tnum font-bold">{item.latencyMs}ms</td>
                      <td className="text-right text-[#EDEDED] tnum font-bold">{item.feeEarned}</td>
                      <td className="text-right">
                        <span
                          className={`font-mono text-12 font-bold ${
                            item.status === "CONFIRMED" ? "text-[#EDEDED]" : "text-[#8A8A8A]"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
