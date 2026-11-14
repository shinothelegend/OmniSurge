"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OmniNavProps {
  theme?: "dark" | "sky" | "light";
}

export default function OmniNav({ theme = "dark" }: OmniNavProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinksLeft = [
    { label: "Overview", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  const navLinksRight = [
    { label: "Pricing", href: "/pricing" },
    { label: "Settings", href: "/settings" },
  ];

  // Dynamic styling based on theme
  const isSky = theme === "sky";
  const isLight = theme === "light";

  return (
    <>
      <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav
          className={`pointer-events-auto transition-all duration-300 rounded-full px-5 sm:px-7 py-3 flex items-center justify-between gap-4 sm:gap-8 max-w-[840px] w-full ${
            isSky
              ? "bg-white/20 backdrop-blur-xl border border-white/40 shadow-[0_15px_35px_rgba(11,79,196,0.15)] text-white"
              : isLight
              ? "bg-white/80 backdrop-blur-xl border border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.06)] text-zinc-800"
              : isScrolled
              ? "bg-[#0A0B0D]/85 backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.8)] text-white"
              : "bg-white/[0.04] backdrop-blur-md border border-white/10 text-white"
          }`}
          aria-label="Main Navigation"
        >
          {/* Left Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 text-xs font-sans tracking-wide">
            {navLinksLeft.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-200 ${
                    isActive
                      ? isSky
                        ? "text-white font-bold"
                        : isLight
                        ? "text-black font-bold"
                        : "text-[#3DDC97] font-semibold"
                      : isSky
                      ? "text-white/80 hover:text-white"
                      : isLight
                      ? "text-zinc-600 hover:text-black"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Centered Brand Mark (Reference 1 Voltra Style) */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center p-[1px] transition-transform group-hover:scale-105 ${
                isSky
                  ? "bg-white text-[#0B4FC4]"
                  : isLight
                  ? "bg-black text-white"
                  : "bg-gradient-to-tr from-[#3DDC97] to-[#FFB25B] text-black"
              }`}
            >
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <span
              className={`font-serif text-lg font-bold tracking-tight ${
                isSky ? "text-white" : isLight ? "text-black" : "text-white"
              }`}
            >
              OmniSurge
            </span>
          </Link>

          {/* Right Navigation Links & Launch CTA */}
          <div className="hidden md:flex items-center space-x-6 text-xs font-sans tracking-wide">
            {navLinksRight.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-200 ${
                    isActive
                      ? isSky
                        ? "text-white font-bold"
                        : isLight
                        ? "text-black font-bold"
                        : "text-[#3DDC97] font-semibold"
                      : isSky
                      ? "text-white/80 hover:text-white"
                      : isLight
                      ? "text-zinc-600 hover:text-black"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Launch App Pill */}
            <Link
              href="/dashboard"
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1 shadow-sm ${
                isSky
                  ? "bg-white text-[#0B4FC4] hover:bg-white/90 shadow-[0_4px_12px_rgba(255,255,255,0.3)]"
                  : isLight
                  ? "bg-black text-white hover:bg-zinc-800"
                  : "bg-white text-black hover:bg-zinc-100 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              }`}
            >
              <span>Launch App</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1 rounded-full text-current hover:opacity-80 transition"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#0A0B0D]/95 backdrop-blur-2xl flex flex-col justify-center px-8 text-center space-y-6 md:hidden font-sans"
          >
            {[...navLinksLeft, ...navLinksRight].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-2xl font-serif tracking-tight ${
                  pathname === link.href ? "text-[#3DDC97]" : "text-zinc-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-6">
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-block px-8 py-3 rounded-full bg-[#3DDC97] text-black font-bold text-sm tracking-wide shadow-lg"
              >
                Launch App
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
