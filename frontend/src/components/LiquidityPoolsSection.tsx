"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWeb3 } from "@/hooks/useWeb3";
import { NETWORKS } from "@/lib/contracts";

interface Pool {
  id: string;
  pair: string;
  tokens: [string, string];
  chain: string;
  chainKey: "baseSepolia" | "unichainSepolia";
  apr: string;
  tvl: string;
  vol24: string;
  fees24: string;
  flashMultiplier: string;
}

const POOLS: Pool[] = [
  {
    id: "weth-usdc",
    pair: "WETH / USDC",
    tokens: ["ETH", "USDC"],
    chain: "Unichain Sepolia (1s)",
    chainKey: "unichainSepolia",
    apr: "54.2%",
    tvl: "$1,842,500",
    vol24: "$4,210,800",
    fees24: "$12,630",
    flashMultiplier: "3.4x",
  },
  {
    id: "cbeth-eth",
    pair: "cbETH / ETH",
    tokens: ["cbETH", "ETH"],
    chain: "Base Sepolia (200ms)",
    chainKey: "baseSepolia",
    apr: "42.8%",
    tvl: "$3,120,400",
    vol24: "$6,850,200",
    fees24: "$20,550",
    flashMultiplier: "4.1x",
  },
  {
    id: "usdc-usdt",
    pair: "USDC / USDT",
    tokens: ["USDC", "USDT"],
    chain: "Base Sepolia (200ms)",
    chainKey: "baseSepolia",
    apr: "28.6%",
    tvl: "$5,400,000",
    vol24: "$11,200,000",
    fees24: "$16,800",
    flashMultiplier: "2.8x",
  },
  {
    id: "op-eth",
    pair: "OP / ETH",
    tokens: ["OP", "ETH"],
    chain: "Unichain Sepolia (1s)",
    chainKey: "unichainSepolia",
    apr: "61.4%",
    tvl: "$980,000",
    vol24: "$2,450,000",
    fees24: "$9,800",
    flashMultiplier: "3.9x",
  },
];

export function LiquidityPoolsSection() {
  const { wallet, connectWallet, deposit } = useWeb3();
  const [selectedChain, setSelectedChain] = useState<"ALL" | "BASE" | "UNICHAIN">("ALL");
  const [depositModal, setDepositModal] = useState<Pool | null>(null);
  const [depositAmount, setDepositAmount] = useState("0.05");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [txReceipt, setTxReceipt] = useState<{ txHash: string; explorerUrl: string } | null>(null);
  const [txError, setTxError] = useState<string | null>(null);

  const filteredPools = POOLS.filter((p) => {
    if (selectedChain === "BASE") return p.chain.includes("Base");
    if (selectedChain === "UNICHAIN") return p.chain.includes("Unichain");
    return true;
  });

  const handleDeposit = async () => {
    if (!depositModal) return;
    if (!wallet.isConnected) {
      await connectWallet();
      return;
    }

    setIsSubmitting(true);
    setTxError(null);
    setTxReceipt(null);

    const res = await deposit(depositAmount, depositModal.chainKey);
    setIsSubmitting(false);

    if (res.success && res.txHash) {
      const explorer = NETWORKS[depositModal.chainKey].explorerUrl;
      setTxReceipt({
        txHash: res.txHash,
        explorerUrl: `${explorer}/tx/${res.txHash}`,
      });
    } else {
      setTxError(res.error || "Deposit transaction rejected or failed.");
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header and Filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[var(--border-subtle)] pb-6">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight uppercase">
            Active JIT Liquidity <span className="text-[var(--accent-cyan)] font-normal">Pools</span>.
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] font-sans mt-2 max-w-xl">
            Deploy capital into autonomous flash pools supplying sub-second depth to Base Sepolia and Unichain swaps.
          </p>
        </div>

        {/* Chain Filters */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] font-mono text-xs">
          {(["ALL", "BASE", "UNICHAIN"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedChain(filter)}
              className={`px-3.5 py-1.5 rounded-md font-bold transition-colors ${
                selectedChain === filter
                  ? "bg-[var(--accent-cyan)] text-[#09090B]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {filter === "ALL" ? "All Chains" : filter === "BASE" ? "Base Sepolia" : "Unichain"}
            </button>
          ))}
        </div>
      </div>

      {/* Pools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPools.map((pool) => (
          <motion.div
            key={pool.id}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="rounded-2xl p-6 bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-card)] space-y-4 shadow-sm"
          >
            {/* Top Row: Tokens & Chain */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-1.5">
                  <div className="w-8 h-8 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-center font-display font-bold text-xs text-[var(--text-primary)] shadow-xs">
                    {pool.tokens[0].slice(0, 3)}
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-[var(--border-subtle)] border border-[var(--border-card)] flex items-center justify-center font-display font-bold text-xs text-[var(--text-primary)] shadow-xs">
                    {pool.tokens[1].slice(0, 3)}
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                    {pool.pair}
                  </h3>
                  <span className="font-mono text-xs text-[var(--accent-cyan)] block font-medium">
                    {pool.chain}
                  </span>
                </div>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-3 gap-4 py-3 border-y border-[var(--border-subtle)] font-mono">
              <div>
                <span className="block text-[11px] text-[var(--text-muted)] uppercase">ANNUAL APY</span>
                <span className="text-xl font-bold text-[var(--accent-emerald)]">
                  {pool.apr}
                </span>
              </div>
              <div>
                <span className="block text-[11px] text-[var(--text-muted)] uppercase">TVL LOCKED</span>
                <span className="text-lg font-bold text-[var(--text-primary)]">
                  {pool.tvl}
                </span>
              </div>
              <div>
                <span className="block text-[11px] text-[var(--text-muted)] uppercase">FLASH BOOST</span>
                <span className="text-lg font-bold text-[var(--accent-cyan)]">
                  {pool.flashMultiplier}
                </span>
              </div>
            </div>

            {/* Sub-line Info and Actions */}
            <div className="flex items-center justify-between pt-1">
              <div className="font-mono text-xs text-[var(--text-muted)]">
                24H FEES: <span className="text-[var(--text-primary)] font-medium">{pool.fees24}</span>
              </div>

              <button
                onClick={() => {
                  setDepositModal(pool);
                  setTxReceipt(null);
                  setTxError(null);
                }}
                className="btn-solid-accent !py-1.5 !px-4 text-xs font-bold"
              >
                DEPOSIT JIT
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Instant Real Deposit Modal */}
      <AnimatePresence>
        {depositModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-7 space-y-5 shadow-2xl"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                  Deposit to {depositModal.pair}
                </h3>
                <button
                  onClick={() => setDepositModal(null)}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-mono text-lg transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center font-mono text-xs text-[var(--text-secondary)]">
                  <span>DEPOSIT AMOUNT ({depositModal.tokens[0]})</span>
                  {wallet.isConnected && (
                    <span>BALANCE: <span className="text-[var(--text-primary)] font-bold">{wallet.balanceEth} ETH</span></span>
                  )}
                </div>
                <div className="flex items-center rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] px-4 py-3">
                  <input
                    type="text"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="bg-transparent font-mono text-xl text-[var(--text-primary)] font-bold w-full focus:outline-none"
                  />
                  <span className="font-mono text-sm text-[var(--accent-cyan)] font-bold">
                    {depositModal.tokens[0]}
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-[var(--bg-card)] p-4 font-mono text-xs space-y-2 text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                <div className="flex justify-between">
                  <span>ESTIMATED APY:</span>
                  <span className="text-[var(--accent-emerald)] font-bold">{depositModal.apr}</span>
                </div>
                <div className="flex justify-between">
                  <span>IMPERMANENT LOSS RISK:</span>
                  <span className="text-[var(--accent-cyan)] font-bold">0.00% Atomic</span>
                </div>
                <div className="flex justify-between">
                  <span>CHAIN DESTINATION:</span>
                  <span className="text-[var(--text-primary)]">{depositModal.chain}</span>
                </div>
              </div>

              {/* Error Message */}
              {txError && (
                <div className="rounded-lg bg-[#271010] border border-[#7F1D1D] p-3 font-mono text-xs text-[#EF4444]">
                  {txError}
                </div>
              )}

              {/* Transaction Confirmed Link */}
              {txReceipt && (
                <div className="rounded-lg bg-[#062018] border border-[#065F46] p-3 font-mono text-xs text-[var(--accent-emerald)] space-y-1">
                  <div className="font-bold">✓ TRANSACTION CONFIRMED ON-CHAIN</div>
                  <div className="text-[11px] text-[var(--text-secondary)] break-all">
                    TX: {txReceipt.txHash}
                  </div>
                  <a
                    href={txReceipt.explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent-cyan)] underline font-bold inline-block pt-1"
                  >
                    View on Block Explorer →
                  </a>
                </div>
              )}

              <button
                onClick={handleDeposit}
                disabled={isSubmitting}
                className="w-full btn-solid-accent !py-3 font-display font-bold text-sm uppercase text-center"
              >
                {!wallet.isConnected
                  ? "CONNECT WALLET TO DEPOSIT"
                  : isSubmitting
                  ? "AWAITING ON-CHAIN CONFIRMATION..."
                  : "CONFIRM FLASH DEPOSIT →"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
