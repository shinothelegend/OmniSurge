"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, CheckCircle2, Clock, Zap, RefreshCw } from "lucide-react";

export interface QueueItem {
  id: string;
  chain: "Base Sepolia" | "Unichain Sepolia";
  pool: string;
  volumeIn: number;
  liquidityDeployed: number;
  feeCaptured: number;
  latencyMs: number;
  status: "Surging" | "Harvesting" | "Rebalancing" | "Completed";
  timestamp: string;
}

interface RebalanceQueueProps {
  queueItems: QueueItem[];
  completedCount: number;
}

export default function RebalanceQueue({ queueItems, completedCount }: RebalanceQueueProps) {
  return (
    <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
              Autonomous Liquidity Pipeline
            </span>
          </div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-cyan-400" />
            Live JIT Deployment & Withdrawal Queue
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Concentrated positions dynamically injected and atomically retracted back to reserves.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-xs font-mono text-slate-300">
            Total Settled: <span className="text-emerald-400 font-bold">{completedCount}</span>
          </div>
        </div>
      </div>

      {/* Dynamic Queue List with AnimatePresence */}
      <div className="min-h-[300px] flex flex-col justify-start space-y-3">
        <AnimatePresence initial={false} mode="popLayout">
          {queueItems.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-64 flex flex-col items-center justify-center text-center p-6 border border-dashed border-white/10 rounded-2xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center mb-3 text-slate-600">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-sm font-semibold text-slate-400">Queue Standby</div>
              <p className="text-xs text-slate-600 mt-1 max-w-xs">
                Awaiting origin pool imbalance swap to trigger flash liquidity surge...
              </p>
            </motion.div>
          ) : (
            queueItems.map((item) => {
              const isBase = item.chain === "Base Sepolia";
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -30, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 30, scale: 0.9, transition: { duration: 0.25 } }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="rounded-2xl p-4 bg-slate-900/70 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-cyan-500/40 transition-all shadow-md group"
                >
                  {/* Left: Chain & Pool Info */}
                  <div className="flex items-center space-x-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs border ${
                        isBase
                          ? "bg-cyan-950/80 text-cyan-400 border-cyan-800"
                          : "bg-pink-950/80 text-pink-400 border-pink-800"
                      }`}
                    >
                      {isBase ? "BASE" : "UNI"}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition">
                          {item.pool}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                          #{item.id.slice(0, 6)}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5 font-mono">
                        <span>Swap: {item.volumeIn.toFixed(1)} ETH</span>
                        <span>•</span>
                        <span className="text-cyan-400">Surge: {item.liquidityDeployed.toFixed(1)} ETH</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Latency & Fees */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-2 sm:pt-0 border-white/5">
                    <div>
                      <div className="text-[10px] uppercase font-mono text-slate-500">Latency</div>
                      <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        {item.latencyMs} ms
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] uppercase font-mono text-slate-500">Fee Earned</div>
                      <div className="text-xs font-mono font-extrabold text-emerald-400">
                        +{item.feeCaptured.toFixed(4)} ETH
                      </div>
                    </div>

                    {/* Status Pill */}
                    <div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold border ${
                          item.status === "Completed"
                            ? "bg-emerald-950/80 text-emerald-300 border-emerald-800"
                            : item.status === "Rebalancing"
                            ? "bg-purple-950/80 text-purple-300 border-purple-800 animate-pulse"
                            : "bg-cyan-950/80 text-cyan-300 border-cyan-800 animate-pulse"
                        }`}
                      >
                        {item.status === "Completed" && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                        {item.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
