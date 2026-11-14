"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

export interface CounterAnimationOptions {
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  formatter?: (val: number) => string;
}

export function useCounterAnimation(
  targetValue: number,
  options: CounterAnimationOptions = {}
) {
  const {
    duration = 1.2,
    decimals = 0,
    prefix = "",
    suffix = "",
    formatter,
  } = options;

  const prevValueRef = useRef<number | null>(null);

  const format = (value: number) => {
    if (formatter) return formatter(value);
    const formatted =
      decimals > 0
        ? value.toFixed(decimals)
        : Math.round(value).toLocaleString();
    return `${prefix}${formatted}${suffix}`;
  };

  const [displayValue, setDisplayValue] = useState<string>(() => format(targetValue));

  useEffect(() => {
    const startVal = prevValueRef.current === null ? targetValue : prevValueRef.current;
    prevValueRef.current = targetValue;

    if (startVal === targetValue) {
      setDisplayValue(format(targetValue));
      return;
    }

    const controls = animate(startVal, targetValue, {
      duration,
      ease: [0.16, 1, 0.3, 1], // Smooth exponential easeOut
      onUpdate(value) {
        setDisplayValue(format(value));
      },
    });

    return () => controls.stop();
  }, [targetValue, duration, decimals, prefix, suffix, formatter]);

  return displayValue;
}
