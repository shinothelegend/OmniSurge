"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface ScriptWordProps {
  children: string;
  className?: string;
  color?: string;
}

export function ScriptWord({
  children,
  className = "",
  color = "#D9A8CB",
}: ScriptWordProps) {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  return (
    <span
      className={`relative inline-block font-script italic tracking-normal select-none ${className}`}
      style={{
        color: color,
        transform: "scale(1.12) translateY(-2px)",
        display: "inline-block",
        margin: "0 0.18em",
      }}
    >
      {/* SVG Stroke Draw Simulation */}
      <span className="relative">
        <motion.span
          initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="inline-block"
        >
          {children}
        </motion.span>

        {/* Dynamic hand-drawn underline arc */}
        <svg
          className="absolute -bottom-1 left-0 w-full h-[6px] overflow-visible pointer-events-none"
          viewBox="0 0 100 6"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 0,3 Q 50,7 100,2"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.75 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          />
        </svg>
      </span>
    </span>
  );
}
