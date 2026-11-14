"use client";

import { useEffect, useRef } from "react";

interface Leaf {
  x: number;
  y: number;
  size: number;
  speedY: number;
  swaySpeed: number;
  swayAmplitude: number;
  angle: number;
  rotationSpeed: number;
  color: string;
  baseOpacity: number;
  phase: number;
}

export function FallingLeavesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Muted palette from tokens: mostly greys + subtle dark red at low opacity
    const leafColors = [
      "rgba(138, 138, 138, ", // muted grey
      "rgba(90, 90, 90, ",    // dark grey
      "rgba(226, 59, 59, ",   // muted accent red
      "rgba(160, 160, 160, ", // soft grey
    ];

    const leafCount = 15; // 12-18 max
    const leaves: Leaf[] = [];

    for (let i = 0; i < leafCount; i++) {
      leaves.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 12, // 12px to 20px
        speedY: Math.random() * 0.35 + 0.25, // slow, gentle fall
        swaySpeed: Math.random() * 0.0015 + 0.001,
        swayAmplitude: Math.random() * 40 + 20,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.008,
        color: leafColors[Math.floor(Math.random() * leafColors.length)],
        baseOpacity: Math.random() * 0.12 + 0.08, // 8% to 20% opacity
        phase: Math.random() * Math.PI * 2,
      });
    }

    let animationId: number;
    let lastTime = performance.now();
    let isTabVisible = !document.hidden;

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        lastTime = performance.now();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Draw an organic, minimal stylized leaf silhouette
    const drawLeaf = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      angle: number,
      color: string,
      opacity: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.fillStyle = `${color}${opacity})`;
      context.beginPath();
      // Curved organic leaf path
      context.moveTo(0, -size / 2);
      context.quadraticCurveTo(size / 3, 0, 0, size / 2);
      context.quadraticCurveTo(-size / 3, 0, 0, -size / 2);
      context.closePath();
      context.fill();

      // Subtle center vein
      context.strokeStyle = `rgba(10, 10, 10, ${opacity * 0.6})`;
      context.lineWidth = 0.75;
      context.beginPath();
      context.moveTo(0, -size / 2);
      context.lineTo(0, size / 2);
      context.stroke();

      context.restore();
    };

    const animate = (currentTime: number) => {
      if (!isTabVisible) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = Math.min(currentTime - lastTime, 100);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < leaves.length; i++) {
        const leaf = leaves[i];

        // Vertical movement with delta time
        leaf.y += leaf.speedY * (deltaTime / 16.6);

        // Sine-based horizontal sway
        const horizontalSway =
          Math.sin(currentTime * leaf.swaySpeed + leaf.phase) * (leaf.swayAmplitude * 0.02);
        leaf.x += horizontalSway;

        // Rotation drift
        leaf.angle += leaf.rotationSpeed * (deltaTime / 16.6);

        // Calculate opacity with fade out near bottom
        let currentOpacity = leaf.baseOpacity;
        if (leaf.y > height * 0.75) {
          const fadeFactor = 1 - (leaf.y - height * 0.75) / (height * 0.25);
          currentOpacity *= Math.max(0, fadeFactor);
        }

        // Reset if moved past the bottom or edges
        if (leaf.y > height + 20) {
          leaf.y = -20;
          leaf.x = Math.random() * width;
        }
        if (leaf.x < -40) leaf.x = width + 20;
        if (leaf.x > width + 40) leaf.x = -20;

        drawLeaf(ctx, leaf.x, leaf.y, leaf.size, leaf.angle, leaf.color, currentOpacity);
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

