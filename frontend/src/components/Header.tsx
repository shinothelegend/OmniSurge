"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWeb3 } from "@/hooks/useWeb3";

export function Header() {
  const pathname = usePathname();
  const { wallet, connectWallet, disconnectWallet, switchChain, telemetry } = useWeb3();

  const navItems = [
    { num: "01", label: "PROTOCOL", href: "/" },
    { num: "02", label: "TERMINAL", href: "/dashboard" },
    { num: "03", label: "POOLS", href: "/pricing" },
    { num: "04", label: "CONFIG", href: "/settings" },
    { num: "05", label: "DOCS", href: "/docs" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#1E1E1E] flex items-center px-6 lg:px-8">
      <div className="max-w-[1240px] w-full mx-auto flex items-center justify-between">
        {/* Left: Brand Monogram & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="font-mono text-14 font-bold text-[#EDEDED] tracking-tight group-hover:text-[#E23B3B] transition-colors">
            OMNISURGE
          </span>
          <span className="hidden sm:inline-block font-mono text-12 text-[#8A8A8A]">
            ( JIT )
          </span>
        </Link>

        {/* Center: Monospace Editorial Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-mono text-12 transition-colors flex items-center gap-1.5 ${isActive
                    ? "text-[#EDEDED] font-bold"
                    : "text-[#8A8A8A] hover:text-[#EDEDED]"
                  }`}
              >
                <span className={isActive ? "text-[#E23B3B]" : "text-[#555555]"}>
                  ({item.num})
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Live Chain Block & Rectangular Web3 Action */}
        <div className="flex items-center gap-5">
          {/* Real Live Block Cadence from RPC */}
          {telemetry.baseSepolia.blockNumber > 0 && (
            <div className="hidden lg:flex items-baseline gap-2 font-mono text-12">
              <span className="text-[#8A8A8A]">BASE</span>
              <span className="text-[#EDEDED] font-bold tnum">
                {telemetry.baseSepolia.blockNumber.toLocaleString("en-US")}
              </span>
            </div>
          )}

          {/* Web3 Wallet Connect / Disconnect */}
          {wallet.isConnected ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => switchChain(wallet.chainId === 84532 ? 1301 : 84532)}
                className="hidden sm:inline-block font-mono text-12 uppercase text-[#8A8A8A] border border-[#1E1E1E] px-2.5 py-1.5 rounded-[2px] hover:text-[#EDEDED] hover:border-[#8A8A8A] transition-colors"
              >
                {wallet.networkName}
              </button>
              <div className="flex items-center gap-2 font-mono text-12 border border-[#1E1E1E] px-2.5 py-1.5 rounded-[2px] bg-[#111111]">
                <span className="text-[#EDEDED] font-bold tnum">{wallet.balanceEth} ETH</span>
                <span className="text-[#555555]">/</span>
                <span className="text-[#8A8A8A]">
                  {wallet.address?.slice(0, 6)}…{wallet.address?.slice(-4)}
                </span>
                <button
                  onClick={disconnectWallet}
                  title="Disconnect Wallet"
                  className="text-[#8A8A8A] hover:text-[#E23B3B] transition-colors ml-1"
                >
                  ✕
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="btn-rect-accent"
            >
              CONNECT WALLET
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
