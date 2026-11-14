"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface CurveLineProps {
  color?: string;
  theme?: "dark" | "paper";
}

export function CurveLine({ color = "#D9A8CB", theme = "dark" }: CurveLineProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const [pathLength, setPathLength] = useState(1000);
  const [dimensions, setDimensions] = useState({ width: 1400, height: 3200 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updateDimensions = () => {
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        window.innerHeight * 2.5
      );
      setDimensions({
        width: window.innerWidth,
        height: docHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    setPathLength(length);
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    let currentProgress = 0;
    let targetProgress = 0;

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetProgress = maxScroll > 0 ? Math.min(Math.max(window.scrollY / maxScroll, 0), 1) : 0;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Lerp ticker function running in GSAP ticker
    const ticker = () => {
      currentProgress += (targetProgress - currentProgress) * 0.08;

      if (path && length > 0) {
        const offset = length * (1 - currentProgress);
        path.style.strokeDashoffset = `${offset}`;

        // Tip glowing dot
        const pointLength = Math.max(0.1, currentProgress * length);
        if (pointLength <= length) {
          try {
            const pt = path.getPointAtLength(pointLength);
            // Move dot & glow
            if (dotRef.current) {
              dotRef.current.setAttribute("cx", `${pt.x}`);
              dotRef.current.setAttribute("cy", `${pt.y}`);
            }
            if (glowRef.current) {
              glowRef.current.setAttribute("cx", `${pt.x}`);
              glowRef.current.setAttribute("cy", `${pt.y}`);
            }
          } catch (e) {
            // SVG parsing edge case during layout resize
          }
        }
      }
    };

    gsap.ticker.add(ticker);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      gsap.ticker.remove(ticker);
    };
  }, [dimensions]);

  const { width, height } = dimensions;
  const isMobile = width < 768;

  // Generate responsive snaking Bezier path coordinates
  const p1x = width * 0.15;
  const p1y = height * 0.08;
  const p2x = width * (isMobile ? 0.8 : 0.82);
  const p2y = height * 0.22;
  const p3x = width * (isMobile ? 0.2 : 0.12);
  const p3y = height * 0.45;
  const p4x = width * (isMobile ? 0.85 : 0.78);
  const p4y = height * 0.68;
  const p5x = width * 0.5;
  const p5y = height * 0.94;

  const d = `M ${width * 0.5} 0 
    C ${width * 0.3} ${height * 0.03}, ${p1x} ${p1y * 0.7}, ${p1x} ${p1y}
    C ${p1x} ${p1y * 1.4}, ${p2x} ${p2y * 0.7}, ${p2x} ${p2y}
    C ${p2x} ${p2y * 1.3}, ${p3x} ${p3y * 0.7}, ${p3x} ${p3y}
    C ${p3x} ${p3y * 1.3}, ${p4x} ${p4y * 0.8}, ${p4x} ${p4y}
    C ${p4x} ${p4y * 1.2}, ${p5x} ${p5y * 0.9}, ${p5x} ${p5y}`;

  const strokeColor = theme === "paper" ? "#E0342B" : "#D9A8CB";

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 5,
        overflow: "hidden",
      }}
    >
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <filter id="glow-tip" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Subtle ghost guide line */}
        <path
          d={d}
          stroke={strokeColor}
          strokeWidth={isMobile ? "1" : "1.5"}
          strokeOpacity="0.08"
          strokeLinecap="round"
          strokeDasharray="4 8"
        />

        {/* Animated dynamic line */}
        <path
          ref={pathRef}
          d={d}
          stroke={strokeColor}
          strokeWidth={isMobile ? "1.5" : "2"}
          strokeLinecap="round"
          style={{
            mixBlendMode: theme === "dark" ? "screen" : "multiply",
            transition: "stroke 300ms ease",
          }}
        />

        {/* Tip glow effect */}
        {!isMobile && (
          <circle
            ref={glowRef}
            cx={width * 0.5}
            cy="0"
            r="12"
            fill={strokeColor}
            opacity="0.4"
            filter="url(#glow-tip)"
          />
        )}

        {/* Tip dot marker */}
        <circle
          ref={dotRef}
          cx={width * 0.5}
          cy="0"
          r={isMobile ? "3" : "4.5"}
          fill={theme === "paper" ? "#E0342B" : "#FFFFFF"}
          stroke={strokeColor}
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
