"use client";

import React, { useState } from "react";
import { X, ArrowRight, Check, ShieldCheck, Mail, Lock, Wallet, Zap } from "lucide-react";

interface AuthOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export default function AuthOnboardingModal({
  isOpen,
  onClose,
  onComplete,
}: AuthOnboardingModalProps) {
  const [view, setView] = useState<"signup" | "onboarding">("signup");
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Sign up fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Onboarding answers
  const [selectedNetwork, setSelectedNetwork] = useState<"base" | "unichain">("base");
  const [capitalTier, setCapitalTier] = useState<"starter" | "pro" | "institutional">("pro");
  const [relayerAuthorized, setRelayerAuthorized] = useState(true);

  if (!isOpen) return null;

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!email || !email.includes("@")) {
      setEmailError("Please enter a valid work or personal email");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!password || password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (!hasError) {
      setView("onboarding");
      setStep(1);
    }
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep((s) => (s + 1) as any);
    } else {
      onComplete();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md rounded-2xl bg-zinc-950 border border-zinc-800 p-8 shadow-2xl relative text-zinc-100 font-sans">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 rounded-lg transition"
        >
          <X className="h-5 w-5" />
        </button>

        {view === "signup" ? (
          /* Sign Up Screen */
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white font-black text-sm">
                <Zap className="h-5 w-5 fill-white" />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white">Create your OmniSurge Account</h2>
              <p className="text-xs text-zinc-400">
                Deploy autonomous JIT liquidity across Base & Unichain.
              </p>
            </div>

            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Work Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                  <input
                    type="email"
                    placeholder="alex@fund.xyz"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError("");
                    }}
                    className={`w-full rounded-lg border bg-zinc-900 py-2 pl-9 pr-3 text-xs text-white placeholder-zinc-500 focus:outline-none ${
                      emailError ? "border-rose-500" : "border-zinc-700 focus:border-indigo-500"
                    }`}
                  />
                </div>
                {emailError && <p className="text-[11px] text-rose-400 mt-1">{emailError}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) setPasswordError("");
                    }}
                    className={`w-full rounded-lg border bg-zinc-900 py-2 pl-9 pr-3 text-xs text-white placeholder-zinc-500 focus:outline-none ${
                      passwordError ? "border-rose-500" : "border-zinc-700 focus:border-indigo-500"
                    }`}
                  />
                </div>
                {passwordError && <p className="text-[11px] text-rose-400 mt-1">{passwordError}</p>}
              </div>

              {/* Primary Action Button */}
              <button
                type="submit"
                className="w-full rounded-lg bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition shadow-sm"
              >
                Create Account
              </button>
            </form>

            {/* Secondary Action: Continue with Web3 / Google */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-mono">
                <span className="bg-zinc-950 px-2 text-zinc-500">or continue with</span>
              </div>
            </div>

            <button
              onClick={() => {
                setView("onboarding");
                setStep(1);
              }}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 py-2 text-xs font-semibold text-zinc-200 hover:bg-zinc-850 hover:text-white transition flex items-center justify-center gap-2"
            >
              <Wallet className="h-4 w-4 text-indigo-400" />
              <span>Connect Web3 Wallet (MetaMask)</span>
            </button>

            <div className="text-center text-[11px] text-zinc-400">
              Already have an account?{" "}
              <button
                onClick={() => {
                  setView("onboarding");
                  setStep(1);
                }}
                className="text-indigo-400 hover:underline font-semibold"
              >
                Sign In
              </button>
            </div>
          </div>
        ) : (
          /* 3-Step Onboarding Flow */
          <div className="space-y-6">
            {/* Top Progress Stepper (1 of 3) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="text-indigo-400 font-bold">Step {step} of 3</span>
                <span>Onboarding</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-indigo-500 transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>

            {/* Step Content */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Which origin network will you rebalance first?</h3>
                <p className="text-xs text-zinc-400">
                  You can add more networks and custom RPC endpoints later in protocol settings.
                </p>

                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={() => setSelectedNetwork("base")}
                    className={`w-full rounded-xl border p-4 text-left transition flex items-center justify-between ${
                      selectedNetwork === "base"
                        ? "border-indigo-500 bg-indigo-950/20 text-white"
                        : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white">Base Sepolia</div>
                      <div className="text-[11px] text-zinc-400">200ms OP Stack Flashblocks</div>
                    </div>
                    {selectedNetwork === "base" && <Check className="h-4 w-4 text-indigo-400" />}
                  </button>

                  <button
                    onClick={() => setSelectedNetwork("unichain")}
                    className={`w-full rounded-xl border p-4 text-left transition flex items-center justify-between ${
                      selectedNetwork === "unichain"
                        ? "border-indigo-500 bg-indigo-950/20 text-white"
                        : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white">Unichain Sepolia</div>
                      <div className="text-[11px] text-zinc-400">1s Rollup-Boost Fast Blocks</div>
                    </div>
                    {selectedNetwork === "unichain" && <Check className="h-4 w-4 text-indigo-400" />}
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Select your expected liquidity volume</h3>
                <p className="text-xs text-zinc-400">
                  This determines your priority tier and ReactVM callback gas limits.
                </p>

                <div className="space-y-2.5 pt-2">
                  {[
                    { id: "starter", title: "Testing (Up to 50 ETH)", desc: "Free tier for testnet development" },
                    { id: "pro", title: "Active Trading (50 - 2,500 ETH)", desc: "Sub-second priority queue" },
                    { id: "institutional", title: "Institutional (> 2,500 ETH)", desc: "Dedicated node cluster" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setCapitalTier(t.id as any)}
                      className={`w-full rounded-xl border p-3.5 text-left transition flex items-center justify-between ${
                        capitalTier === t.id
                          ? "border-indigo-500 bg-indigo-950/20 text-white"
                          : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white"
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-white">{t.title}</div>
                        <div className="text-[11px] text-zinc-400">{t.desc}</div>
                      </div>
                      {capitalTier === t.id && <Check className="h-4 w-4 text-indigo-400" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Authorize Reactive Relayer Contract</h3>
                <p className="text-xs text-zinc-400">
                  Grants the pre-configured Reactive System relayer permission to invoke triggerJITLiquidity.
                </p>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between text-emerald-400 font-semibold">
                    <span>Reentrancy Protection</span>
                    <span>✓ Verified</span>
                  </div>
                  <div className="flex items-center justify-between text-emerald-400 font-semibold">
                    <span>Replay Deduplication</span>
                    <span>✓ Active</span>
                  </div>
                  <div className="text-[11px] text-zinc-500 pt-2 border-t border-zinc-800">
                    System Address: 0x0000000000000000000000000000000000fffFfF
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Footer Controls */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleNextStep}
                className="w-full rounded-lg bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition shadow-sm flex items-center justify-center gap-2"
              >
                <span>{step === 3 ? "Complete Setup & Launch" : "Continue"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="text-center">
                <button
                  onClick={() => {
                    onComplete();
                    onClose();
                  }}
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition"
                >
                  Skip for now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
