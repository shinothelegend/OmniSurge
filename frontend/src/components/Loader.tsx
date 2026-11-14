"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getLenis } from "@/lib/motion";

interface LoaderProps {
  onComplete?: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [shouldShow, setShouldShow] = useState(true);
  const [timeStr, setTimeStr] = useState("12:00:00");
  const slatsCount = 8;

  useEffect(() => {
    // Check session storage
    if (typeof window !== "undefined") {
      const alreadyLoaded = sessionStorage.getItem("omnisurge_loaded_session");
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (alreadyLoaded || prefersReduced) {
        setShouldShow(false);
        onComplete?.();
        return;
      }
    }

    // Freeze scroll while loading
    const lenis = getLenis();
    if (lenis) lenis.stop();
    document.body.style.overflow = "hidden";

    // Clock update
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
    const clockInterval = setInterval(updateTime, 1000);

    // Realistic counter animation with stalls at 37% and 84%
    let current = 0;
    let timer: NodeJS.Timeout;

    const tick = () => {
      if (current < 37) {
        current += Math.floor(Math.random() * 4) + 2;
        if (current >= 37) current = 37;
        setProgress(current);
        timer = setTimeout(tick, current === 37 ? 160 : 45);
      } else if (current === 37) {
        current = 38;
        timer = setTimeout(tick, 50);
      } else if (current < 84) {
        current += Math.floor(Math.random() * 5) + 2;
        if (current >= 84) current = 84;
        setProgress(current);
        timer = setTimeout(tick, current === 84 ? 180 : 40);
      } else if (current === 84) {
        current = 85;
        timer = setTimeout(tick, 50);
      } else if (current < 100) {
        current += Math.floor(Math.random() * 6) + 3;
        if (current >= 100) current = 100;
        setProgress(current);
        timer = setTimeout(tick, 30);
      } else {
        // At 100%
        setTimeout(() => {
          setIsDone(true);
          sessionStorage.setItem("omnisurge_loaded_session", "true");
          // Re-enable scroll
          if (lenis) lenis.start();
          document.body.style.overflow = "auto";
          setTimeout(() => {
            setShouldShow(false);
            onComplete?.();
          }, 1100);
        }, 220);
      }
    };

    timer = setTimeout(tick, 60);

    return () => {
      clearTimeout(timer);
      clearInterval(clockInterval);
      document.body.style.overflow = "auto";
    };
  }, [onComplete]);

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {!isDone ? (
        <motion.div
          key="loader-curtain"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] bg-[#070707] text-[#EDE8E0] flex flex-col justify-between p-8 md:p-14 select-none overflow-hidden"
        >
          {/* Grain texture */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Halftone pulsing field on right edge */}
          <div className="absolute top-0 right-0 w-1/3 h-full halftone-dither opacity-30 pointer-events-none animate-pulse" />

          {/* Top strip */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] text-[#D9A8CB]">
              <span className="inline-block w-2.5 h-2.5 border border-[#D9A8CB] animate-ping" />
              <span>( 01 ) INITIALIZING PROTOCOL SEQUENCE</span>
            </div>
            <div className="font-mono text-[11px] tracking-[0.1em] text-white/40">
              REACTIVE OMNI BUILDATHON
            </div>
          </div>

          {/* Center: Outlined project title with pink rising fill */}
          <div className="relative w-full text-center z-10 py-12">
            <div className="relative inline-block">
              {/* Stroke-only outline background */}
              <h1 className="font-display text-[14vw] md:text-[10vw] leading-[0.85] text-outline-echo uppercase tracking-tight">
                OMNISURGE
              </h1>
              {/* Filled layer with bottom-up clip-path based on progress */}
              <h1
                style={{
                  clipPath: `inset(${100 - progress}% 0 0 0)`,
                }}
                className="absolute inset-0 font-display text-[14vw] md:text-[10vw] leading-[0.85] text-[#D9A8CB] uppercase tracking-tight transition-all duration-75"
              >
                OMNISURGE
              </h1>
            </div>
            <div className="mt-4 font-mono text-[12px] tracking-[0.2em] text-[#EDE8E0]/60 uppercase">
              LOW-LATENCY JUST-IN-TIME LIQUIDITY REBALANCER
            </div>
          </div>

          {/* Bottom row: giant percentage + local clock */}
          <div className="flex items-end justify-between z-10">
            <div>
              <div className="font-display text-[16vw] md:text-[9vw] leading-[0.8] text-[#EDE8E0] tabular-nums font-black">
                {progress}
                <span className="text-[5vw] text-[#D9A8CB] font-sans font-light ml-1">%</span>
              </div>
              <div className="font-mono text-[10px] text-white/40 tracking-[0.12em] uppercase mt-2">
                SYNCHRONIZING TICK STATE ON UNICHAIN & BASE SEPOLIA
              </div>
            </div>

            <div className="text-right font-mono text-[11px] tracking-[0.08em] space-y-1">
              <div className="text-[#D9A8CB]">{timeStr}</div>
              <div className="text-white/40">SUB-SECOND REACTIVE FINALITY</div>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Diagonal Slat Wipe on completion (8 diagonal black slats exit staggered) */
        <div key="slat-wipe-exit" className="fixed inset-0 z-[9998] pointer-events-none flex">
          {Array.from({ length: slatsCount }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{
                duration: 0.85,
                delay: i * 0.05,
                ease: [0.76, 0, 0.24, 1],
              }}
              style={{
                transformOrigin: i % 2 === 0 ? "top" : "bottom",
                transform: "skewX(-26deg)",
              }}
              className="flex-1 h-[120%] -my-[10%] bg-[#070707] border-r border-[#1C1C1C]"
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
