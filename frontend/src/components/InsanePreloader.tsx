"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getLenis } from "@/lib/motion";

interface InsanePreloaderProps {
  onComplete?: () => void;
}

/**
 * Insane Preloader.
 * Full-screen vantablack (#000000) curtain, z-index 9999.
 * Massive percentage counter 000 -> 100 in 1.2s (matches Reactive loop).
 * At 100: glitch clip-path displacement, then black screen splits open
 * vertically to reveal the Hero.
 */
export function InsanePreloader({ onComplete }: InsanePreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [shouldShow, setShouldShow] = useState(true);
  const [timeStr, setTimeStr] = useState("--:--:--");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clockRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (clockRef.current) clearInterval(clockRef.current);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const alreadyLoaded = sessionStorage.getItem("omnisurge_preloaded");
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (alreadyLoaded || prefersReduced) {
      setShouldShow(false);
      onComplete?.();
      return;
    }

    const lenis = getLenis();
    if (lenis) lenis.stop();
    document.body.style.overflow = "hidden";

    const tickClock = () => {
      const d = new Date();
      const t = d.toLocaleTimeString("en-US", { hour12: false });
      const off = d.getTimezoneOffset();
      const sign = off <= 0 ? "+" : "-";
      const hh = Math.abs(Math.floor(off / 60));
      setTimeStr(t + " UTC" + sign + hh.toString().padStart(2, "0"));
    };
    tickClock();
    clockRef.current = setInterval(tickClock, 1000);

    const totalDuration = 1200;
    const steps = 100;
    const stepInterval = totalDuration / steps;
    let current = 0;

    const step = () => {
      current += 1;
      setProgress(current);

      if (current < 100) {
        timerRef.current = setTimeout(step, stepInterval);
      } else {
        setIsGlitching(true);
        timerRef.current = setTimeout(() => {
          setIsDone(true);
          sessionStorage.setItem("omnisurge_preloaded", "true");
          timerRef.current = setTimeout(() => {
            if (lenis) lenis.start();
            document.body.style.overflow = "auto";
            setShouldShow(false);
            onComplete?.();
          }, 700);
        }, 150);
      }
    };

    timerRef.current = setTimeout(step, stepInterval);

    return () => {
      clearTimers();
      document.body.style.overflow = "auto";
    };
  }, [onComplete, clearTimers]);

  if (!shouldShow) return null;

  const formatted = progress.toString().padStart(3, "0");

  return (
    <AnimatePresence mode="popLayout">
      {!isDone ? (
        <>
          <motion.div
            key="curtain"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-[#000000] flex flex-col justify-between p-6 md:p-10 select-none overflow-hidden"
          >
            <div className="grain pointer-events-none" />

            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f5ff] animate-pulse" />
                <span className="font-mono-brutal text-[10px] tracking-[0.2em] text-[#00f5ff] uppercase">
                  INITIALIZING REACTIVE LOOP
                </span>
              </div>
              <div className="font-mono-brutal text-[10px] tracking-[0.2em] text-[#555555] uppercase">
                BASE SEPOLIA • UNICHAIN SEPOLIA
              </div>
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-center items-center">
              <div className="relative inline-block">
                <h1
                  className="text-giga font-display text-outline uppercase tracking-tighter leading-none"
                  style={{
                    WebkitTextStroke: "1px #ffffff",
                    color: "transparent",
                  }}
                >
                  OMNISURGE
                </h1>
                <h1
                  style={{
                    position: "absolute",
                    inset: 0,
                    clipPath: `inset(${100 - progress}% 0 0 0)`,
                    WebkitTextStroke: "none",
                    color: "#ffffff",
                  }}
                  className="text-giga font-display uppercase tracking-tighter leading-none"
                >
                  OMNISURGE
                </h1>
              </div>
            </div>

            <div className="flex items-end justify-between z-10 w-full">
              <div className="flex items-baseline gap-2">
                <span
                  className={`font-display font-black text-[#ffffff] tabular-nums ${
                    progress === 100 ? "text-[12vw] md:text-[8vw]" : "text-[14vw] md:text-[10vw]"
                  } leading-none`}
                >
                  {formatted}
                </span>
                <span className="font-mono-brutal text-[#00f5ff] font-light text-[6vw] md:text-[4vw] leading-none ml-1">
                  %
                </span>
              </div>
              <div className="text-right font-mono-brutal text-[11px] tracking-[0.1em] space-y-0.5">
                <span className="text-[#00f5ff]">{timeStr}</span>
                <span className="text-[#555555] uppercase">
                  sub-second reactive finality
                </span>
              </div>
            </div>
          </motion.div>

          {isGlitching && (
            <motion.div
              key="glitch"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[10000] bg-[#000000] pointer-events-none"
            >
              <div className="absolute inset-0 flex items-center justify-center" style={{ mixBlendMode: "difference" }}>
                <h1
                  className="text-giga font-display text-[#ffffff] font-black uppercase tracking-tighter leading-none glitch-1"
                  style={{
                    WebkitTextStroke: "2px #00f5ff",
                    color: "transparent",
                    transform: "scale(1.05)",
                  }}
                >
                  OMNISURGE
                </h1>
              </div>
            </motion.div>
          )}
        </>
      ) : (
        <motion.div
          key="split"
          className="split-exit"
        >
          <div className="split-half left">
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0 bg-[#000000] origin-left"
            />
          </div>
          <div className="split-half right">
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0 bg-[#000000] origin-right"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
