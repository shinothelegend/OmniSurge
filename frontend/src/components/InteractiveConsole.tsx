"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Send, Sliders, RefreshCw, Zap, Copy, Check } from "lucide-react";
import { GlassCard } from "@/primitives/GlassCard";

export interface LogEntry {
  id: string;
  time: string;
  type: "SWAP_DETECTED" | "REACTIVE_LOG" | "CALLBACK_EMITTED" | "DESTINATION_SETTLED";
  message: string;
  details?: Record<string, any>;
}

interface InteractiveConsoleProps {
  logs: LogEntry[];
  activeLoop: "base" | "unichain";
  setActiveLoop: (loop: "base" | "unichain") => void;
  onFireSwap: (amount: number, pair: string) => void;
  onClearLogs: () => void;
}

export default function InteractiveConsole({
  logs,
  activeLoop,
  setActiveLoop,
  onFireSwap,
  onClearLogs,
}: InteractiveConsoleProps) {
  const [swapAmount, setSwapAmount] = useState(25);
  const [selectedPair, setSelectedPair] = useState("WETH/USDC");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 font-sans">
      {/* Left: Interactive Control Box (5 Cols) */}
      <div className="lg:col-span-5">
        <GlassCard
          glassEffect
          className="p-8 sm:p-10 rounded-[2.5rem] border border-white/10 shadow-glass flex flex-col justify-between h-full"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sliders className="w-4 h-4 text-electric-blue" />
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-electric-blue">
                Autonomous JIT Harness
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Interactive Swap Injector
            </h3>

            <p className="font-sans text-sm text-white/60 mt-2 leading-relaxed">
              Trigger simulated flash pool imbalances on Base or Unichain to stress-test reactive sub-second rebalancing.
            </p>

            <div className="space-y-6 mt-7">
              {/* Chain Selector */}
              <div>
                <label className="text-xs font-sans font-semibold text-white/60 uppercase tracking-wider block mb-2.5">
                  Origin Network Target
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveLoop("base")}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      activeLoop === "base"
                        ? "bg-electric-blue/15 border-electric-blue text-white shadow-glow-cyan"
                        : "bg-white/[0.03] border-white/10 text-white/60 hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold font-sans">Base Sepolia</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-electric-blue/20 text-electric-blue font-mono font-bold">
                        200ms
                      </span>
                    </div>
                    <span className="text-xs text-white/50 mt-1.5 font-sans">
                      OP Stack Flashblocks
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveLoop("unichain")}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      activeLoop === "unichain"
                        ? "bg-hot-pink/15 border-hot-pink text-white shadow-glow-pink"
                        : "bg-white/[0.03] border-white/10 text-white/60 hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold font-sans">Unichain Sepolia</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-hot-pink/20 text-hot-pink font-mono font-bold">
                        1s
                      </span>
                    </div>
                    <span className="text-xs text-white/50 mt-1.5 font-sans">
                      Rollup-Boost Finality
                    </span>
                  </button>
                </div>
              </div>

              {/* Trading Pair */}
              <div>
                <label className="text-xs font-sans font-semibold text-white/60 uppercase tracking-wider block mb-2.5">
                  Concentrated Pool Pair
                </label>
                <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                  {["WETH/USDC", "WBTC/USDC", "cbETH/WETH"].map((pair) => (
                    <button
                      key={pair}
                      type="button"
                      onClick={() => setSelectedPair(pair)}
                      className={`py-2.5 px-3 rounded-xl border text-center transition ${
                        selectedPair === pair
                          ? "bg-white/15 border-white text-white font-bold"
                          : "bg-white/[0.02] border-white/10 text-white/50 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {pair}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider for Volume */}
              <div>
                <div className="flex items-center justify-between text-xs font-sans mb-2">
                  <span className="text-white/60 font-semibold uppercase tracking-wider">
                    Imbalance Volume
                  </span>
                  <span className="text-white font-bold font-mono text-sm">
                    {swapAmount} ETH (${(swapAmount * 3150).toLocaleString()})
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="100"
                  step="1"
                  value={swapAmount}
                  onChange={(e) => setSwapAmount(Number(e.target.value))}
                  className="w-full accent-electric-blue cursor-pointer h-2 bg-white/10 rounded-lg"
                />
                <div className="flex justify-between text-xs text-white/40 font-mono mt-1.5">
                  <span>Min: 2 ETH</span>
                  <span>Expected JIT Surge: {swapAmount * 1.5} ETH</span>
                  <span>Max: 100 ETH</span>
                </div>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onFireSwap(swapAmount, selectedPair)}
            className="mt-8 w-full py-4 rounded-full font-sans font-bold text-sm text-white bg-gradient-to-r from-electric-blue via-deep-purple to-hot-pink shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:shadow-[0_0_35px_rgba(255,0,127,0.6)] transition flex items-center justify-center gap-2.5"
          >
            <Send className="w-4 h-4" />
            <span>Dispatch Swap & Trigger Reactive Loop</span>
          </motion.button>
        </GlassCard>
      </div>

      {/* Right: Cross-Chain Event Stream (7 Cols) */}
      <div className="lg:col-span-7">
        <GlassCard
          glassEffect
          className="p-8 sm:p-10 rounded-[2.5rem] border border-white/10 shadow-glass flex flex-col justify-between h-full"
        >
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center space-x-2.5">
                <Terminal className="w-5 h-5 text-neon-mint" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Cross-Chain Event Stream
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-white/50 text-xs font-mono">
                  ReactVM stdout
                </span>
              </div>

              <button
                onClick={onClearLogs}
                className="text-xs text-white/40 hover:text-white transition flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Clear Feed</span>
              </button>
            </div>

            {/* Scrollable Terminal List */}
            <div className="mt-5 space-y-3 max-h-[380px] overflow-y-auto pr-2">
              {logs.length === 0 ? (
                <div className="text-center py-12 text-sm text-white/40 font-mono">
                  No active logs. Dispatch a swap above to initiate telemetry.
                </div>
              ) : (
                logs.map((log) => {
                  const badgeMap = {
                    SWAP_DETECTED: "bg-electric-blue/15 text-electric-blue border-electric-blue/30",
                    REACTIVE_LOG: "bg-pastel-lilac/15 text-pastel-lilac border-pastel-lilac/30",
                    CALLBACK_EMITTED: "bg-hot-pink/15 text-hot-pink border-hot-pink/30",
                    DESTINATION_SETTLED: "bg-neon-mint/15 text-neon-mint border-neon-mint/30",
                  };

                  return (
                    <div
                      key={log.id}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all text-xs font-mono space-y-2 group"
                    >
                      <div className="flex items-center justify-between text-white/50">
                        <div className="flex items-center space-x-2">
                          <span className="text-white/40">[{log.time}]</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              badgeMap[log.type] || "bg-white/5 text-white/50"
                            }`}
                          >
                            {log.type}
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopy(log.message, log.id)}
                          className="opacity-0 group-hover:opacity-100 transition p-1 hover:text-white"
                          title="Copy Log"
                        >
                          {copiedId === log.id ? (
                            <Check className="w-3.5 h-3.5 text-neon-mint" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      <div className="text-white/90 text-sm font-sans leading-relaxed">
                        {log.message}
                      </div>

                      {log.details && (
                        <div className="pt-2 border-t border-white/5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/50">
                          {Object.entries(log.details).map(([k, v]) => (
                            <div key={k} className="flex items-center space-x-1">
                              <span className="text-white/40">{k}:</span>
                              <span className="text-white/80 font-mono">{String(v)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/40 font-mono">
            <span>Active Ingestion: Origin Swap (0xc42079...)</span>
            <span className="text-neon-mint flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-neon-mint animate-ping" />
              Callback Relay: healthy (~1.1s Avg)
            </span>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
