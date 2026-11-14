"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTextDrawingAnimation } from "@/hooks/useTextDrawingAnimation";

interface AnimatedKeywordProps {
  word: string;
  color?: string; // e.g. #FF007F (Hot Pink) or #00FFCC (Neon Mint)
  className?: string;
}

export default function AnimatedKeyword({
  word,
  color = "#FF007F",
  className = "",
}: AnimatedKeywordProps) {
  const { pathVariants } = useTextDrawingAnimation({
    duration: 2.0,
    ease: "easeInOut",
  });

  // Dedicated cursive handwriting paths for supported keywords
  if (word.toLowerCase() === "unleashed") {
    return (
      <span className={`inline-block align-middle select-none ${className}`}>
        <svg
          viewBox="0 0 340 90"
          className="h-[1.15em] w-auto overflow-visible"
          style={{ filter: `drop-shadow(0 0 16px ${color}66)` }}
        >
          {/* U */}
          <motion.path
            d="M 15 28 C 15 15 28 12 36 28 C 42 42 43 65 30 72 C 20 77 12 68 22 55 C 32 40 45 28 58 35 C 65 40 62 65 65 72"
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          />
          {/* n */}
          <motion.path
            d="M 68 45 C 72 38 82 36 86 44 C 88 48 87 64 88 71 M 86 48 C 92 38 104 36 108 44 C 110 50 109 65 112 70"
            fill="none"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          />
          {/* l */}
          <motion.path
            d="M 112 70 C 118 64 126 42 132 20 C 135 10 131 8 126 18 C 120 30 119 55 124 68 C 126 73 134 72 138 66"
            fill="none"
            stroke={color}
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
          />
          {/* e */}
          <motion.path
            d="M 138 66 C 145 60 156 50 154 42 C 152 35 142 38 140 48 C 138 58 144 69 152 70 C 158 70 162 66 166 60"
            fill="none"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
          />
          {/* a */}
          <motion.path
            d="M 182 45 C 176 38 165 40 164 52 C 163 64 172 71 180 68 C 185 66 187 58 188 44 C 188 40 188 64 192 70"
            fill="none"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
          />
          {/* s */}
          <motion.path
            d="M 192 70 C 196 64 204 46 208 42 C 213 38 219 42 216 48 C 213 54 200 60 204 68 C 206 72 214 72 220 66"
            fill="none"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={5}
          />
          {/* h */}
          <motion.path
            d="M 220 66 C 226 58 235 32 238 16 C 240 8 234 10 230 22 C 226 36 226 62 228 70 M 228 52 C 235 40 248 38 252 46 C 255 52 253 66 256 70"
            fill="none"
            stroke={color}
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={6}
          />
          {/* e */}
          <motion.path
            d="M 256 70 C 262 64 272 52 270 44 C 268 36 258 40 256 50 C 254 60 260 70 268 70 C 274 70 278 66 282 60"
            fill="none"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={7}
          />
          {/* d */}
          <motion.path
            d="M 298 44 C 292 38 282 40 280 52 C 278 64 286 71 294 68 C 298 66 302 58 304 36 C 306 18 306 14 304 16 C 302 24 302 62 308 70 C 314 74 326 68 335 60"
            fill="none"
            stroke={color}
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={8}
          />
        </svg>
      </span>
    );
  }

  // Surge / Flash Liquidity / Default cursive handwriting path
  return (
    <span className={`inline-block align-middle select-none ${className}`}>
      <svg
        viewBox="0 0 200 80"
        className="h-[1.15em] w-auto overflow-visible"
        style={{ filter: `drop-shadow(0 0 16px ${color}66)` }}
      >
        {/* S */}
        <motion.path
          d="M 18 65 C 22 55 35 30 42 22 C 48 14 58 18 52 28 C 45 40 24 48 30 62 C 34 70 48 70 58 60"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        />
        {/* u */}
        <motion.path
          d="M 58 60 C 65 48 75 38 80 44 C 84 50 82 65 86 68 C 90 70 96 66 100 58 C 104 50 102 42 102 38 M 102 44 L 104 68"
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        />
        {/* r */}
        <motion.path
          d="M 104 68 C 110 58 116 42 120 40 C 124 38 130 42 128 48 C 126 54 124 64 126 68"
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
        />
        {/* g */}
        <motion.path
          d="M 144 44 C 138 38 128 40 126 52 C 124 64 132 70 140 68 C 145 66 148 58 148 42 M 148 44 C 148 58 146 76 142 86 C 136 96 122 96 126 86 C 130 78 144 74 154 68"
          fill="none"
          stroke={color}
          strokeWidth="3.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
        />
        {/* e */}
        <motion.path
          d="M 154 68 C 160 62 170 50 168 42 C 166 35 156 38 154 48 C 152 58 158 68 166 68 C 172 68 178 64 186 56"
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={4}
        />
      </svg>
    </span>
  );
}
