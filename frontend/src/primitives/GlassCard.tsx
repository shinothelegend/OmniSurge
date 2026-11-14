"use client";

import React, { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  glassEffect?: boolean;
  hoverGlow?: "cyan" | "pink" | "purple" | "mint" | "none";
  asChild?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      children,
      className = "",
      glassEffect = true,
      hoverGlow = "none",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : "div";

    const glowClasses = {
      none: "",
      cyan: "hover:shadow-glow-cyan hover:border-electric-blue/30 transition-all duration-300",
      pink: "hover:shadow-glow-pink hover:border-hot-pink/30 transition-all duration-300",
      purple: "hover:shadow-glow-purple hover:border-deep-purple/30 transition-all duration-300",
      mint: "hover:shadow-glow-mint hover:border-neon-mint/30 transition-all duration-300",
    };

    const baseStyles = clsx(
      "relative rounded-bubbly overflow-hidden",
      glassEffect && [
        "bg-white/[0.03]",
        "backdrop-blur-2xl",
        "border border-white/10",
        "shadow-glass",
        "glass-noise",
      ],
      hoverGlow !== "none" && glowClasses[hoverGlow],
      className
    );

    return (
      <Component ref={ref} className={twMerge(baseStyles)} {...props}>
        {/* Subtle internal top highlight line */}
        <div className="pointer-events-none absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        {children}
      </Component>
    );
  }
);

GlassCard.displayName = "GlassCard";
