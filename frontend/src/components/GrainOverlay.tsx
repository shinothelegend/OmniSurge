"use client";

import { motion } from "framer-motion";

interface GrainOverlayProps {
  showGlow?: boolean;
}

export function GrainOverlay({ showGlow = true }: GrainOverlayProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 12,
        overflow: "hidden",
      }}
      className="select-none"
    >
      {/* 4-6% Animated Noise Grain Simulation via SVG feTurbulence */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05] mix-blend-overlay">
        <filter id="omni-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#omni-noise)" />
      </svg>

      {/* 2px Scanlines at 5% Opacity */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)",
        }}
      />

      {/* Slow Drifting Vermilion Glow Blob (One per page as per DESIGN.md Section 6.3) */}
      {showGlow && (
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -35, 25, 0],
            scale: [1, 1.08, 0.94, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 -right-24 w-[380px] h-[380px] rounded-full bg-[#E0342B]/18 blur-[90px] pointer-events-none z-[-1]"
        />
      )}
    </div>
  );
}
