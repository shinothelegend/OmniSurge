"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWeb3 } from "@/hooks/useWeb3";
import { useTheme } from "@/hooks/useTheme";

export function Header() {
  const pathname = usePathname();
  const { wallet, connectWallet, disconnectWallet, switchChain, telemetry } = useWeb3();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { label: "Protocol", href: "/" },
    { label: "Analytics", href: "/dashboard" },
    { label: "Pool Tiers", href: "/pricing" },
    { label: "Settings", href: "/settings" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-[var(--bg-page)]/95 backdrop-blur-md border-b border-[var(--border-subtle)] flex items-center px-4 md:px-8">
      <div className="max-w-[1400px] w-full mx-auto flex items-center justify-between">
        {/* Left: Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent-cyan)] flex items-center justify-center font-display font-black text-[#09090B] text-base shadow-sm">
            Ω
          </div>
          <span className="font-display text-lg md:text-xl font-bold tracking-tight text-[var(--text-primary)]">
            OMNISURGE
          </span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[var(--bg-surface)] px-2 py-1 rounded-lg border border-[var(--border-subtle)]">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  isActive
                    ? "text-[var(--text-primary)] bg-[var(--bg-card)] shadow-xs"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]/50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Live Telemetry, Theme Toggle & Web3 Actions */}
        <div className="flex items-center gap-2.5">
          {/* Real Live Block Counter */}
          {telemetry.baseSepolia.blockNumber > 0 && (
            <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-[var(--text-muted)] border-r border-[var(--border-subtle)] pr-3">
              <span>BASE:</span>
              <span className="text-[var(--accent-cyan)] font-bold">
                #{telemetry.baseSepolia.blockNumber.toLocaleString()}
              </span>
            </div>
          )}

          {/* Theme Toggle (Dark / Light) */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark and Light Mode"
            className="w-9 h-9 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] flex items-center justify-center hover:border-[var(--accent-cyan)] transition-colors"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          >
            {theme === "dark" ? (
              <svg className="w-4 h-4 text-[var(--accent-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-[var(--text-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Web3 Wallet Connect / Disconnect */}
          {wallet.isConnected ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => switchChain(wallet.chainId === 84532 ? 1301 : 84532)}
                className="hidden sm:inline-block px-2.5 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-secondary)] hover:border-[var(--accent-cyan)] transition-colors"
                title="Toggle network"
              >
                {wallet.networkName}
              </button>
              <div className="flex items-center gap-2 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg px-2.5 py-1.5 text-xs font-mono">
                <span className="text-[var(--accent-emerald)] font-bold">{wallet.balanceEth} ETH</span>
                <span className="text-[var(--text-muted)]">|</span>
                <span className="text-[var(--text-primary)] font-medium">
                  {wallet.address?.slice(0, 5)}...{wallet.address?.slice(-3)}
                </span>
                <button
                  onClick={disconnectWallet}
                  className="text-[var(--text-muted)] hover:text-[#EF4444] ml-0.5 font-bold transition-colors"
                  title="Disconnect"
                >
                  ×
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              disabled={wallet.isConnecting}
              className="btn-solid-primary !py-1.5 !px-3.5 text-xs font-bold"
            >
              {wallet.isConnecting ? "CONNECTING..." : "CONNECT WALLET"}
            </button>
          )}

          <Link
            href="/dashboard"
            className="btn-solid-secondary hidden sm:inline-flex !py-1.5 !px-3.5 text-xs font-bold"
          >
            TERMINAL →
          </Link>
        </div>
      </div>
    </header>
  );
}
