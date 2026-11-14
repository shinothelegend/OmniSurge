"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Scroll-Line. Absolute SVG behind content, curving like the Reactive
 * Network between origin and destination chains. Draws itself in sync
 * with scroll depth via GSAP ScrollTrigger + Lenis.
 */
export function ScrollLine() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const initLine = useCallback(() => {
    if (typeof window === "undefined") return;
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!svg || !path) return;

    const lenis = getLenis();
    if (!lenis) return;

    const pathLength: number = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength} ${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}px`;

    const update = () => {
      const progress = lenis.progress;
      const offset = pathLength * (1 - progress);
      path.style.strokeDashoffset = `${Math.max(0, offset)}px`;
    };

    lenis.on("scroll", update);
    update();

    return () => {
      lenis.off("scroll", update);
    };
  }, []);

  useEffect(() => {
    const cleanup = initLine();
    return () => cleanup?.();
  }, [initLine]);

  return (
    <svg
      ref={svgRef}
      className="scroll-line-layer"
      preserveAspectRatio="none"
      style={{ width: "100%", height: "200vh" }}
    >
      <defs>
        <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f5ff" />
          <stop offset="100%" stopColor="#00f5ff" />
        </linearGradient>
      </defs>

      <path
        ref={pathRef}
        d="M 60 0
           C 120 300, 0 600, 60 900
           C 120 1200, 0 1500, 60 1800
           C 120 2100, 0 2400, 60 2700
           C 120 3000, 0 3300, 60 3600"
        stroke="url(#neonGradient)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        style={{ willChange: "stroke-dashoffset", opacity: 0.5 }}
      />
    </svg>
  );
}
