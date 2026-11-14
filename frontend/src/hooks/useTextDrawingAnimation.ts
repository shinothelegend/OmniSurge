"use client";

import { useMemo } from "react";
import { type Variants } from "framer-motion";

export type DrawingEase =
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "circIn"
  | "circOut"
  | "circInOut"
  | "backIn"
  | "backOut"
  | "backInOut"
  | "anticipate"
  | [number, number, number, number];

export interface TextDrawingOptions {
  duration?: number;
  delay?: number;
  ease?: DrawingEase;
}

export function useTextDrawingAnimation(options: TextDrawingOptions = {}) {
  const { duration = 2.0, delay = 0.2, ease = "easeInOut" } = options;

  const pathVariants: Variants = useMemo(
    () => ({
      hidden: {
        pathLength: 0,
        opacity: 0,
      },
      visible: (i: number = 0) => ({
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: {
            duration,
            delay: delay + i * 0.15,
            ease: ease as any,
          },
          opacity: {
            duration: 0.3,
            delay: delay + i * 0.15,
          },
        },
      }),
    }),
    [duration, delay, ease]
  );

  return {
    pathVariants,
  };
}
