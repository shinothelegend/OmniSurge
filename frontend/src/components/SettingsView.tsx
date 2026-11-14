"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function SettingsView() {
  const [oracleAddress, setOracleAddress] = useState(
    "0x0000000000000000000000000000000000fffFfF"
  );
  const [gasLimit, setGasLimit] = useState("850000");
  const [slippage, setSlippage] = useState("0.15");
  const [autoRebalance, setAutoRebalance] = useState(true);
  const [mevDefense, setMevDefense] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-24">
        <div className="shell-container max-w-3xl space-y-12">
          {/* Header */}
          <div className="border-b border-[#1E1E1E] pb-8">
            <div className="flex items-center gap-2 font-mono text-12 text-[#8A8A8A] mb-2">
              <span className="text-[#E23B3B] font-bold">( 04 )</span>
              <span className="uppercase tracking-wider">PROTOCOL PARAMETERS & ORACLES</span>
            </div>
            <h1 className="font-sans text-40 sm:text-56 font-bold text-[#EDEDED] uppercase">
              CONFIGURATION.
            </h1>
            <p className="font-sans text-14 text-[#8A8A8A] mt-2">
              Configure Reactive Lasna oracle listeners, callback gas boundaries, and security latches.
            </p>
          </div>

          {/* Editorial Form */}
          <div className="border border-[#1E1E1E] p-8 sm:p-10 bg-[#0A0A0A] space-y-8">
            {/* System Contract Input */}
            <div className="space-y-2">
              <label className="block font-mono text-12 text-[#8A8A8A] uppercase">
                REACTIVE SYSTEM SERVICE CONTRACT (LASNA TESTNET)
              </label>
              <input
                type="text"
                value={oracleAddress}
                onChange={(e) => setOracleAddress(e.target.value)}
                className="w-full bg-[#111111] border border-[#1E1E1E] rounded-[2px] px-3.5 py-2.5 font-mono text-12 text-[#EDEDED] focus:border-[#E23B3B] outline-none"
              />
              <span className="block font-mono text-12 text-[#555555]">
                Verified system contract for Lasna ReactVM event dispatches.
              </span>
            </div>

            {/* Gas Limit and Slippage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block font-mono text-12 text-[#8A8A8A] uppercase">
                  CALLBACK GAS LIMIT (UNITS)
                </label>
                <input
                  type="text"
                  value={gasLimit}
                  onChange={(e) => setGasLimit(e.target.value)}
                  className="w-full bg-[#111111] border border-[#1E1E1E] rounded-[2px] px-3.5 py-2.5 font-mono text-12 text-[#EDEDED] focus:border-[#E23B3B] outline-none tnum"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-12 text-[#8A8A8A] uppercase">
                  MAX SLIPPAGE TOLERANCE (%)
                </label>
                <input
                  type="text"
                  value={slippage}
                  onChange={(e) => setSlippage(e.target.value)}
                  className="w-full bg-[#111111] border border-[#1E1E1E] rounded-[2px] px-3.5 py-2.5 font-mono text-12 text-[#EDEDED] focus:border-[#E23B3B] outline-none tnum"
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="border-t border-[#1E1E1E] pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-12 font-bold text-[#EDEDED] block uppercase">
                    AUTONOMOUS REACTIVE REBALANCING
                  </span>
                  <span className="font-mono text-12 text-[#8A8A8A] block">
                    Automatically rebalance depth when spread exceeds 0.05%
                  </span>
                </div>
                <button
                  onClick={() => setAutoRebalance(!autoRebalance)}
                  className="btn-rect-ghost text-12 !py-1 !px-3"
                >
                  {autoRebalance ? "[ ENABLED ]" : "[ DISABLED ]"}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-12 font-bold text-[#EDEDED] block uppercase">
                    CROSS-CHAIN MEV DEFENSE
                  </span>
                  <span className="font-mono text-12 text-[#8A8A8A] block">
                    Pre-empt sandwich attacks on Base and Unichain pools
                  </span>
                </div>
                <button
                  onClick={() => setMevDefense(!mevDefense)}
                  className="btn-rect-ghost text-12 !py-1 !px-3"
                >
                  {mevDefense ? "[ ENABLED ]" : "[ DISABLED ]"}
                </button>
              </div>
            </div>

            {/* Action Bar */}
            <div className="border-t border-[#1E1E1E] pt-6 flex items-center justify-between">
              {saved ? (
                <span className="font-mono text-12 text-[#E23B3B] font-bold">
                  ✓ CONFIGURATION SAVED
                </span>
              ) : (
                <span className="font-mono text-12 text-[#555555]">
                  CONSENSUS REQUIRED FOR STATE UPDATES
                </span>
              )}

              <button
                onClick={handleSave}
                className="btn-rect-accent"
              >
                SAVE CONFIGURATION
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
