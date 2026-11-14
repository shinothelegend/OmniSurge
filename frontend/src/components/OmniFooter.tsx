"use client";

import React from "react";
import Link from "next/link";
import { Zap } from "lucide-react";

export default function OmniFooter() {
  return (
    <footer className="w-full bg-[#0A0B0D] border-t border-white/5 py-12 px-6 font-sans text-xs text-zinc-500">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Mission */}
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-[#3DDC97] to-[#FFB25B] text-black flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="font-serif font-bold text-sm text-white">OmniSurge</span>
          <span className="text-zinc-600">•</span>
          <span>Just-In-Time Concentrated Liquidity Rebalancer</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-6 text-zinc-400">
          <Link href="/" className="hover:text-white transition">
            Overview
          </Link>
          <Link href="/dashboard" className="hover:text-white transition">
            Analytics
          </Link>
          <Link href="/pricing" className="hover:text-white transition">
            Pricing
          </Link>
          <Link href="/settings" className="hover:text-white transition">
            Settings
          </Link>
          <a
            href="https://reactive.network"
            target="_blank"
            rel="noreferrer"
            className="text-[#3DDC97] hover:underline"
          >
            Reactive Network Docs
          </a>
        </div>

        {/* Copyright */}
        <div className="text-zinc-600 font-mono text-[11px]">
          © 2026 OmniSurge Protocol. Built for Reactive Omni Buildathon.
        </div>
      </div>
    </footer>
  );
}
