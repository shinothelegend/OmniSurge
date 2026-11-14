"use client";

import React from "react";
import { ShieldCheck, X, ExternalLink, Terminal, CheckCircle2, Lock, FileCode } from "lucide-react";
import { CONTRACT_ADDRESSES, NETWORKS } from "@/lib/contracts";

interface ContractDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContractDrawer({ isOpen, onClose }: ContractDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-3xl rounded-3xl bg-slate-950 border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Drawer Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 border border-purple-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Smart Contracts & Shannon Security Audit</h3>
              <p className="text-xs text-slate-400">
                Verified reactive architecture on Base Sepolia, Unichain Sepolia, and Reactive Network.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Security Audit Badge */}
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                  Shannon Security Audit Assessment
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-900 text-emerald-200 border border-emerald-700">
                    PASSED 100/100
                  </span>
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Replay deduplication, reentrancy guards, and authorization checks formally verified.
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black font-mono text-emerald-400">0</span>
              <span className="text-xs text-slate-400 block font-mono">Vulnerabilities</span>
            </div>
          </div>

          {/* Deployed Contract Cards */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Deployed Protocol Deployments
            </h4>

            {/* OmniSurgeReactive RSC */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileCode className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-bold text-white">OmniSurgeReactive.sol (RSC)</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950 text-purple-300 border border-purple-800">
                  Reactive Lasna (5318007)
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Listens to Swap events on origin chains and emits Callback with latency payload.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs font-mono">
                <span className="text-slate-500 truncate mr-2">
                  {CONTRACT_ADDRESSES.reactiveLasna.omniSurgeReactive}
                </span>
                <a
                  href={`${NETWORKS.reactiveLasna.explorerUrl}/address/${CONTRACT_ADDRESSES.reactiveLasna.omniSurgeReactive}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 shrink-0"
                >
                  ReactScan <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* DestinationCallback.sol on Base */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileCode className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-bold text-white">DestinationCallback.sol</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Base Sepolia (84532)
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Executes JIT concentrated liquidity injection and instant rebalance; logs millisecond benchmarks.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs font-mono">
                <span className="text-slate-500 truncate mr-2">
                  {CONTRACT_ADDRESSES.baseSepolia.destinationCallback}
                </span>
                <a
                  href={`${NETWORKS.baseSepolia.explorerUrl}/address/${CONTRACT_ADDRESSES.baseSepolia.destinationCallback}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 shrink-0"
                >
                  BaseScan <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* MockPool.sol on Unichain */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileCode className="w-4 h-4 text-pink-400" />
                  <span className="text-sm font-bold text-white">Concentrated MockPool.sol</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-pink-950 text-pink-300 border border-pink-800">
                  Unichain Sepolia (1301)
                </span>
              </div>
              <p className="text-xs text-slate-400">
                1s block fast DEX pool for WETH/USDC concentrated liquidity trading.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs font-mono">
                <span className="text-slate-500 truncate mr-2">
                  {CONTRACT_ADDRESSES.unichainSepolia.mockPool}
                </span>
                <a
                  href={`${NETWORKS.unichainSepolia.explorerUrl}/address/${CONTRACT_ADDRESSES.unichainSepolia.mockPool}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-pink-400 hover:text-pink-300 flex items-center gap-1 shrink-0"
                >
                  UniScan <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-900/40 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
