"use client";

import { useEffect, useState } from "react";

export function Footer() {
  const [timeStr, setTimeStr] = useState("12:00:00 UTC");

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(
        d.toLocaleTimeString("en-US", { hour12: false }) +
          " UTC" +
          (d.getTimezoneOffset() <= 0 ? "+" : "-") +
          Math.abs(Math.floor(d.getTimezoneOffset() / 60))
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const links = [
    { label: "Base Sepolia Explorer", href: "https://sepolia.basescan.org" },
    { label: "Unichain Sepolia Explorer", href: "https://sepolia.uniscan.xyz" },
    { label: "Reactive Lasna Explorer", href: "https://lasna.reactscan.net" },
    { label: "Shannon Audit (100/100)", href: "#audit" },
  ];

  return (
    <footer className="relative bg-[var(--bg-page)] text-[var(--text-primary)] pt-16 pb-10 border-t border-[var(--border-subtle)] z-20">
      <div className="shell-container">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8 border-b border-[var(--border-subtle)] gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-cyan)] flex items-center justify-center font-display font-black text-[#09090B] text-xs shadow-sm">
              Ω
            </div>
            <div>
              <span className="font-display font-bold text-base text-[var(--text-primary)]">OMNISURGE PROTOCOL</span>
              <span className="block font-mono text-xs text-[var(--text-muted)]">Autonomous Just-In-Time Liquidity Engine</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 font-mono text-xs text-[var(--text-secondary)]">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--accent-cyan)] flex items-center gap-1.5 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-emerald)]" />
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 font-mono text-xs text-[var(--accent-cyan)] hover:text-[var(--text-primary)] px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] transition-colors"
          >
            <span>BACK TO TOP</span>
            <span className="text-sm">↑</span>
          </button>
        </div>

        {/* Wordmark */}
        <div className="py-8 text-center select-none overflow-hidden">
          <h2 className="font-display text-[clamp(2.5rem,10vw,8rem)] leading-[0.85] tracking-tighter text-[var(--border-subtle)] uppercase font-black opacity-60">
            OMNISURGE
          </h2>
        </div>

        {/* Bottom Utility Strip */}
        <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between font-mono text-xs text-[var(--text-muted)] gap-3">
          <div className="flex items-center gap-3">
            <span>NETWORK CLOCK: {timeStr}</span>
            <span>•</span>
            <span className="text-[var(--accent-emerald)] font-semibold">ALL SYSTEMS OPERATIONAL</span>
          </div>
          <div>© 2026 OmniSurge Labs. Built for Sub-Second Finality.</div>
        </div>
      </div>
    </footer>
  );
}
