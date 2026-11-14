"use client";

import { useState } from "react";
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
}

const POOLS: Pool[] = [
  {
    id: "weth-usdc",
    pair: "WETH / USDC",
    tokens: ["ETH", "USDC"],
    chain: "UNICHAIN SEPOLIA (1s)",
    chainKey: "unichainSepolia",
    apr: "54.2%",
    tvl: "$1,842,500",
    vol24: "$4,210,800",
    fees24: "$12,630",
  },
  {
    id: "cbeth-eth",
    pair: "cbETH / ETH",
    tokens: ["cbETH", "ETH"],
    chain: "BASE SEPOLIA (200ms)",
    chainKey: "baseSepolia",
    apr: "42.8%",
    tvl: "$3,120,400",
    vol24: "$6,850,200",
    fees24: "$20,550",
  },
  {
    id: "usdc-usdt",
    pair: "USDC / USDT",
    tokens: ["USDC", "USDT"],
    chain: "BASE SEPOLIA (200ms)",
    chainKey: "baseSepolia",
    apr: "28.6%",
    tvl: "$5,400,000",
    vol24: "$11,200,000",
    fees24: "$16,800",
  },
  {
    id: "op-eth",
    pair: "OP / ETH",
    tokens: ["OP", "ETH"],
    chain: "UNICHAIN SEPOLIA (1s)",
    chainKey: "unichainSepolia",
    apr: "61.4%",
    tvl: "$980,000",
    vol24: "$2,450,000",
    fees24: "$9,800",
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
    if (selectedChain === "BASE") return p.chain.includes("BASE");
    if (selectedChain === "UNICHAIN") return p.chain.includes("UNICHAIN");
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
    <div id="section-05" className="py-16 border-b border-[#1E1E1E] space-y-8">
      {/* Header and Filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-12 text-[#8A8A8A] mb-2">
            <span className="text-[#E23B3B] font-bold">( 05 )</span>
            <span className="uppercase tracking-wider">ACTIVE CONCENTRATED POOLS</span>
          </div>
          <h2 className="font-sans text-28 sm:text-40 font-bold text-[#EDEDED] uppercase">
            JIT LIQUIDITY POOLS.
          </h2>
          <p className="font-sans text-14 text-[#8A8A8A] mt-1 max-w-xl">
            Deploy capital into autonomous flash pools supplying sub-second depth to Base Sepolia and Unichain swaps.
          </p>
        </div>

        {/* Rectangular Chain Filters */}
        <div className="flex items-center gap-2 border border-[#1E1E1E] p-1 font-mono text-12 bg-[#0A0A0A]">
          {(["ALL", "BASE", "UNICHAIN"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedChain(filter)}
              className={`px-3 py-1.5 rounded-[2px] transition-colors uppercase ${
                selectedChain === filter
                  ? "bg-[#1E1E1E] text-[#EDEDED] font-bold"
                  : "text-[#8A8A8A] hover:text-[#EDEDED]"
              }`}
            >
              {filter === "ALL" ? "All Chains" : filter === "BASE" ? "Base Sepolia" : "Unichain"}
            </button>
          ))}
        </div>
      </div>

      {/* Monospace Editorial Table (Ripar-style) */}
      <div className="border border-[#1E1E1E] overflow-x-auto bg-[#0A0A0A]">
        <table className="editorial-table">
          <thead>
            <tr>
              <th>POOL PAIR</th>
              <th>NETWORK</th>
              <th className="text-right">ANNUAL APY</th>
              <th className="text-right">TVL LOCKED</th>
              <th className="text-right">24H VOLUME</th>
              <th className="text-right">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredPools.map((pool) => (
              <tr key={pool.id}>
                <td className="text-[#EDEDED] font-bold">{pool.pair}</td>
                <td className="text-[#8A8A8A]">{pool.chain}</td>
                <td className="text-right text-[#EDEDED] tnum font-bold">
                  {pool.apr}
                </td>
                <td className="text-right text-[#EDEDED] tnum">
                  {pool.tvl}
                </td>
                <td className="text-right text-[#8A8A8A] tnum">
                  {pool.vol24}
                </td>
                <td className="text-right">
                  <button
                    onClick={() => {
                      setDepositModal(pool);
                      setTxReceipt(null);
                      setTxError(null);
                    }}
                    className="btn-rect-accent !py-1.5 !px-3 text-12"
                  >
                    DEPOSIT
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Editorial Web3 Deposit Modal */}
      {depositModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#111111] border border-[#1E1E1E] rounded-[2px] p-6 space-y-6">
            <div className="flex justify-between items-baseline border-b border-[#1E1E1E] pb-3">
              <span className="font-mono text-14 font-bold text-[#EDEDED] uppercase">
                DEPOSIT INTO {depositModal.pair}
              </span>
              <button
                onClick={() => setDepositModal(null)}
                className="font-mono text-12 text-[#8A8A8A] hover:text-[#E23B3B]"
              >
                [ CLOSE ]
              </button>
            </div>

            <div className="font-mono text-12 space-y-2 text-[#8A8A8A]">
              <div className="flex justify-between">
                <span>DESTINATION NETWORK:</span>
                <span className="text-[#EDEDED]">{depositModal.chain}</span>
              </div>
              <div className="flex justify-between">
                <span>PROJECTED APY:</span>
                <span className="text-[#EDEDED] font-bold">{depositModal.apr}</span>
              </div>
            </div>

            {/* Input field */}
            <div className="space-y-1">
              <label className="block font-mono text-12 text-[#8A8A8A] uppercase">
                DEPOSIT AMOUNT (ETH)
              </label>
              <input
                type="number"
                step="0.01"
                min="0.001"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#1E1E1E] rounded-[2px] px-3 py-2 font-mono text-16 text-[#EDEDED] focus:border-[#E23B3B] outline-none tnum"
              />
            </div>

            {/* Receipt / Error Feedback */}
            {txReceipt && (
              <div className="p-3 bg-[#0A0A0A] border border-[#1E1E1E] font-mono text-12 space-y-1">
                <span className="text-[#EDEDED] font-bold block">TRANSACTION CONFIRMED:</span>
                <a
                  href={txReceipt.explorerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#E23B3B] underline break-all block"
                >
                  {txReceipt.txHash}
                </a>
              </div>
            )}

            {txError && (
              <div className="p-3 bg-[#0A0A0A] border border-[#E23B3B] font-mono text-12 text-[#E23B3B]">
                {txError}
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDepositModal(null)}
                className="btn-rect-ghost"
              >
                CANCEL
              </button>
              <button
                onClick={handleDeposit}
                disabled={isSubmitting}
                className="btn-rect-accent disabled:opacity-50"
              >
                {isSubmitting
                  ? "SIGNING ON-CHAIN..."
                  : !wallet.isConnected
                  ? "CONNECT WALLET"
                  : "EXECUTE DEPOSIT"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
