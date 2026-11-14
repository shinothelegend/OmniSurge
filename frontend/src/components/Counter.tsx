"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  badge?: string;
}

export function Counter({
  from = 0,
  to,
  duration = 1.6,
  prefix = "",
  suffix = "",
  decimals = 0,
  badge = "% UP",
}: CounterProps) {
  const [val, setVal] = useState(from);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;

    let start = performance.now();
    let frameId: number;

    const animate = (time: number) => {
      const elapsed = (time - start) / (duration * 1000);
      const progress = Math.min(Math.max(elapsed, 0), 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = from + (to - from) * eased;
      setVal(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setVal(to);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [inView, from, to, duration]);

  return (
    <div ref={ref} className="inline-flex items-baseline gap-2 tabular-nums">
      <span className="font-display text-4xl md:text-6xl font-black text-[#EDE8E0] tracking-tight">
        {prefix}
        {val.toFixed(decimals)}
        {suffix}
      </span>
      {badge && (
        <span className="font-mono text-[11px] font-bold tracking-[0.1em] text-[#E0342B] border border-[#E0342B]/30 px-1.5 py-0.5 rounded-[2px]">
          {badge}
        </span>
      )}
    </div>
  );
}
