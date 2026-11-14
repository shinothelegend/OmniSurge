"use client";

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ease = {
  out: [0.16, 1, 0.3, 1],       // expo.out in cubic-bezier
  inOut: [0.76, 0, 0.24, 1],    // power3.inOut
  soft: [0.25, 1, 0.5, 1],      // power2.out
  curve: [0.22, 1, 0.36, 1],    // CSS fallback
};

export const dur = {
  micro: 0.18,
  ui: 0.35,
  reveal: 0.9,
  hero: 1.4,
  wipe: 1.1,
  page: 0.9,
};

let activeLenis: Lenis | null = null;

export function getLenis(): Lenis | null {
  return activeLenis;
}

export function initSmoothScroll(): (() => void) | undefined {
  if (typeof window === "undefined") return;

  // Check if reduced motion is requested
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    return;
  }

  // Initialize Lenis
  const lenis = new Lenis({
    lerp: 0.085,
    smoothWheel: true,
    syncTouch: false,
  });

  activeLenis = lenis;

  // Single RAF loop: Lenis is called strictly from GSAP ticker
  const tickerHandler = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(tickerHandler);
  gsap.ticker.lagSmoothing(0);

  // Sync GSAP ScrollTrigger with Lenis
  lenis.on("scroll", ScrollTrigger.update);

  ScrollTrigger.config({
    ignoreMobileResize: true,
  });

  return () => {
    gsap.ticker.remove(tickerHandler);
    lenis.destroy();
    activeLenis = null;
  };
}
