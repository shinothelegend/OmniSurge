"use client";

import { useEffect, useState } from "react";

export function Footer() {
  const [timeStr, setTimeStr] = useState("12:00:00 UTC");

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(
        d.toLocaleTimeString("en-US", { hour12: false }) + " UTC"
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
    { label: "BASE SEPOLIA EXPLORER", href: "https://sepolia.basescan.org" },
    { label: "UNICHAIN SEPOLIA EXPLORER", href: "https://sepolia.uniscan.xyz" },
    { label: "REACTIVE LASNA EXPLORER", href: "https://lasna.reactscan.net" },
    { label: "SHANNON AUDIT (100/100)", href: "#audit" },
  ];

  return (
    <footer className="relative bg-[#0A0A0A] text-[#EDEDED] pt-16 pb-12 border-t border-[#1E1E1E] z-20">
      <div className="shell-container">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8 border-b border-[#1E1E1E] gap-6">
          <div className="space-y-1">
            <span className="font-mono text-14 font-bold text-[#EDEDED] uppercase tracking-wider block">
              OMNISURGE PROTOCOL
            </span>
            <span className="font-mono text-12 text-[#8A8A8A] block">
              Autonomous Just-In-Time Concentrated Liquidity Rebalancer
            </span>
          </div>

          {/* Plain Monospace Links with Underline on Hover Only (NO dot bullets) */}
          <div className="flex flex-wrap items-center gap-6 font-mono text-12 text-[#8A8A8A]">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="hover:underline hover:text-[#EDEDED] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            className="btn-rect-ghost text-12 !py-2 !px-4"
          >
            BACK TO TOP ↑
          </button>
        </div>

        {/* Minimal Wordmark */}
        <div className="py-12 select-none overflow-hidden text-center">
          <span className="font-sans text-56 sm:text-80 lg:text-120 leading-none tracking-tighter text-[#141414] uppercase font-black block">
            OMNISURGE
          </span>
        </div>

        {/* Bottom Utility Strip */}
        <div className="pt-6 border-t border-[#1E1E1E] flex flex-col sm:flex-row items-center justify-between font-mono text-12 text-[#555555] gap-3">
          <div className="flex items-center gap-4">
            <span>NETWORK CLOCK: {timeStr}</span>
            <span>/</span>
            <span className="text-[#8A8A8A]">SYSTEMS OPERATIONAL</span>
          </div>
          <div>© 2026 OMNISURGE LABS • LOW LATENCY DEFI</div>
        </div>
      </div>
    </footer>
  );
}
