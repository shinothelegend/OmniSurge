/**
 * OmniSurge Design Language — Motion Configuration
 * Unified Framer Motion easing curves, durations, and transitions across all 4 pages
 */

import { Variants } from "framer-motion";

export const EASING = [0.22, 1, 0.36, 1] as const; // cubic-bezier(0.22, 1, 0.36, 1)

export const DURATIONS = {
  micro: 0.16,
  standard: 0.32,
  reveal: 0.75,
  hero: 1.2,
  drift: 60,
};

export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: EASING,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.25,
      ease: EASING,
    },
  },
};

export const scrollRevealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.reveal,
      delay: customDelay,
      ease: EASING,
    },
  }),
};

export const cardHoverVariants: Variants = {
  initial: { y: 0 },
  hover: {
    y: -6,
    transition: {
      duration: DURATIONS.standard,
      ease: EASING,
    },
  },
};

export const buttonPressVariants: Variants = {
  tap: { scale: 0.98 },
};
