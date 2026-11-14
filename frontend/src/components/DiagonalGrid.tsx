"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Diagonal Cascading Grid (image_44fc99-inspired).
 * - Grid of cards rotated exactly -15deg, breaking horizontal bounds.
 * - Monochrome + halftone filter on all cards.
 * - Massive mixed typography + abstract symbols overlay intersecting the grid.
 * - Vivid red (#ff0033) diagonal accent cutting through the black/white grid.
 * - Parallax: x-axis movement mapped to y-axis scroll via GSAP.
 * - Hover: monochrome → full color, scale 1.05, 0.3s cubic-bezier.
 */
export function DiagonalGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!gridRef.current) return;

    const grid = gridRef.current;

    // Parallax: grid translates horizontally mapped to vertical scroll
    gsap.to(grid, {
      xPercent: -40, // cascade left as user scrolls down
      ease: "none",
      scrollTrigger: {
        trigger: grid,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Red accent diagonal line also drifts opposite direction
    const accent = document.querySelector(".diagonal-accent");
    if (accent) {
      gsap.to(accent, {
        xPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: grid,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Abstract symbol pool for mixed typography overlay
  const symbols = ["∮", "Ξ", "Δ", "Ω", "∑", "∞", "≠", "∇", "∂", "⚡"];

  return (
    <section className="relative z-10 bg-[#000000] overflow-hidden py-24 md:py-32">
      {/* Background grain */}
      <div className="grain" />

      {/* Red diagonal accent cutting through the grid (vivid red line) */}
      <div
        className="diagonal-accent absolute top-1/4 left-[-10%] w-[200%] h-[1px] bg-[#ff0033] opacity-90 will-change-transform z-20"
        style={{
          transform: "rotate(-15deg) translateX(0)",
          transformOrigin: "left center",
        }}
      />

      {/* Main diagonal grid container, rotated -15deg */}
      <div
        ref={gridRef}
        className="relative z-10 will-change-transform"
        style={{ transform: "rotate(-15deg)", transformOrigin: "center center" }}
      >
        {/* Massive mixed typography intersecting the grid (English + abstract symbols) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <div className="text-center opacity-30 will-change-opacity">
            <span className="text-[clamp(4rem,20vw,16rem)] font-display font-black text-[#ffffff] leading-none">
              JIT
            </span>
            <br />
            <span className="text-[clamp(1.5rem,6vw,4rem)] font-sans font-bold text-[#444444] tracking-[0.4em] uppercase opacity-60">
              LIQUIDITY CASCADE
            </span>
            <div className="mt-4 text-[clamp(2rem,8vw,6rem)] font-display font-black text-[#ff0033] leading-none opacity-40">
              {symbols.join("  ")}
            </div>
          </div>
        </div>

        {/* Grid of cards rotated -15deg, counter-rotated content */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-8 p-8 md:p-16">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="diagonal-item aspect-square min-h-[140px] md:min-h-[200px] flex items-center justify-center group relative"
            >
              <div className="diagonal-counter text-center p-4">
                {/* Abstract monochrome symbol */}
                <span
                  className={`text-[clamp(1.5rem,4vw,3rem)] font-display font-black leading-none ${
                    i % 2 === 0 ? "text-white" : "text-[#888888]"
                  }`}
                >
                  {symbols[i % symbols.length]}
                </span>
                {/* Micro label counter-rotated */}
                <div className="mt-2 font-mono text-[10px] tracking-[0.2em] text-[#444444] uppercase">
                  vault {String(i + 1).padStart(2, "0")}
                </div>
                {/* Red accent index dot */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-[#ff0033] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
