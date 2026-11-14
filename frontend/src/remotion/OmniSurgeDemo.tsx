"use client";

import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  AbsoluteFill,
} from "remotion";

export const OmniSurgeDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene timing (30 fps)
  // Scene 1: 0 - 60 (Intro)
  // Scene 2: 60 - 130 (Origin Swap)
  // Scene 3: 130 - 200 (Reactive Network)
  // Scene 4: 200 - 270 (Destination Callback)
  // Scene 5: 270 - 330 (Final Latency Proof)

  const orbProgress = interpolate(frame, [60, 130, 200, 260], [0, 33, 66, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const latencyCounter = interpolate(frame, [60, 260], [0, 1184], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#030712",
        color: "#f3f4f6",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "60px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
        backgroundImage:
          "radial-gradient(circle at 50% 10%, rgba(168, 85, 247, 0.2), transparent 50%), radial-gradient(circle at 10% 80%, rgba(6, 182, 212, 0.15), transparent 40%)",
      }}
    >
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                fontSize: "36px",
                fontWeight: 900,
                letterSpacing: "-1px",
                background: "linear-gradient(90deg, #38bdf8, #a855f7, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              OmniSurge
            </span>
            <span
              style={{
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                padding: "6px 12px",
                borderRadius: "8px",
                background: "rgba(6, 182, 212, 0.15)",
                color: "#38bdf8",
                border: "1px solid rgba(6, 182, 212, 0.3)",
              }}
            >
              JIT Flash Liquidity Rebalancer
            </span>
          </div>
          <div style={{ fontSize: "16px", color: "#94a3b8", marginTop: "4px" }}>
            Track: Low Latency DeFi (Every Second Counts) • Reactive Omni Buildathon
          </div>
        </div>

        <div
          style={{
            padding: "10px 20px",
            borderRadius: "12px",
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            color: "#34d399",
            fontWeight: "bold",
            fontSize: "18px",
            fontFamily: "monospace",
          }}
        >
          ⏱️ LOOP: {(latencyCounter / 1000).toFixed(3)}s
        </div>
      </div>

      {/* Main Center Visualization: The 3 Stage Pipeline */}
      <div style={{ display: "flex", flexDirection: "column", gap: "30px", margin: "40px 0" }}>
        {/* Timeline Bar with traveling laser */}
        <div
          style={{
            position: "relative",
            height: "12px",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            borderRadius: "6px",
            overflow: "visible",
          }}
        >
          {/* Progress fill */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: `${orbProgress}%`,
              background: "linear-gradient(90deg, #06b6d4, #a855f7, #10b981)",
              borderRadius: "6px",
              boxShadow: "0 0 20px rgba(56, 189, 248, 0.6)",
            }}
          />

          {/* Traveling Glowing Orb */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: `${orbProgress}%`,
              transform: "translate(-50%, -50%)",
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              boxShadow: "0 0 30px 10px rgba(56, 189, 248, 0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#06b6d4",
              }}
            />
          </div>
        </div>

        {/* 3 Pipeline Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px" }}>
          {/* Card 1: Origin Event */}
          <div
            style={{
              padding: "24px",
              borderRadius: "16px",
              background: frame >= 60 ? "rgba(6, 182, 212, 0.12)" : "rgba(15, 23, 42, 0.5)",
              border: frame >= 60 ? "2px solid #06b6d4" : "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: frame >= 60 ? "0 0 30px rgba(6, 182, 212, 0.3)" : "none",
            }}
          >
            <div style={{ color: "#38bdf8", fontSize: "14px", fontWeight: "bold", fontFamily: "monospace" }}>
              STAGE 01 • BASE SEPOLIA
            </div>
            <div style={{ fontSize: "22px", fontWeight: 800, marginTop: "8px" }}>Pool Swap Imbalance</div>
            <div style={{ fontSize: "14px", color: "#94a3b8", marginTop: "4px" }}>
              50.0 ETH Swap (200ms Flashblock)
            </div>
            <div
              style={{
                marginTop: "16px",
                padding: "8px 12px",
                borderRadius: "8px",
                background: "rgba(0,0,0,0.4)",
                fontFamily: "monospace",
                fontSize: "14px",
                color: "#38bdf8",
              }}
            >
              Latency: 198 ms
            </div>
          </div>

          {/* Card 2: Reactive Network */}
          <div
            style={{
              padding: "24px",
              borderRadius: "16px",
              background: frame >= 130 ? "rgba(168, 85, 247, 0.15)" : "rgba(15, 23, 42, 0.5)",
              border: frame >= 130 ? "2px solid #a855f7" : "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: frame >= 130 ? "0 0 30px rgba(168, 85, 247, 0.3)" : "none",
            }}
          >
            <div style={{ color: "#c084fc", fontSize: "14px", fontWeight: "bold", fontFamily: "monospace" }}>
              STAGE 02 • REACTIVE OMNI
            </div>
            <div style={{ fontSize: "22px", fontWeight: 800, marginTop: "8px" }}>ReactVM Computation</div>
            <div style={{ fontSize: "14px", color: "#94a3b8", marginTop: "4px" }}>
              Log Filter + JIT 150% Formulator
            </div>
            <div
              style={{
                marginTop: "16px",
                padding: "8px 12px",
                borderRadius: "8px",
                background: "rgba(0,0,0,0.4)",
                fontFamily: "monospace",
                fontSize: "14px",
                color: "#c084fc",
              }}
            >
              Finality: 792 ms
            </div>
          </div>

          {/* Card 3: Destination Callback */}
          <div
            style={{
              padding: "24px",
              borderRadius: "16px",
              background: frame >= 200 ? "rgba(16, 185, 129, 0.15)" : "rgba(15, 23, 42, 0.5)",
              border: frame >= 200 ? "2px solid #10b981" : "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: frame >= 200 ? "0 0 30px rgba(16, 185, 129, 0.3)" : "none",
            }}
          >
            <div style={{ color: "#34d399", fontSize: "14px", fontWeight: "bold", fontFamily: "monospace" }}>
              STAGE 03 • DESTINATION JIT
            </div>
            <div style={{ fontSize: "22px", fontWeight: 800, marginTop: "8px" }}>Flash Surge & Rebalance</div>
            <div style={{ fontSize: "14px", color: "#94a3b8", marginTop: "4px" }}>
              Deployed: 75 ETH • Fee: +0.1500 ETH
            </div>
            <div
              style={{
                marginTop: "16px",
                padding: "8px 12px",
                borderRadius: "8px",
                background: "rgba(0,0,0,0.4)",
                fontFamily: "monospace",
                fontSize: "14px",
                color: "#34d399",
              }}
            >
              Execution: 194 ms
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Summary Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 30px",
          borderRadius: "16px",
          background: "rgba(15, 23, 42, 0.7)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div style={{ display: "flex", gap: "40px" }}>
          <div>
            <div style={{ fontSize: "12px", color: "#64748b", fontFamily: "monospace" }}>TOTAL ROUNDTRIP</div>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#38bdf8", fontFamily: "monospace" }}>
              1,184 ms
            </div>
          </div>
          <div>
            <div style={{ fontSize: "12px", color: "#64748b", fontFamily: "monospace" }}>LP FEE EARNED</div>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#34d399", fontFamily: "monospace" }}>
              +0.1500 ETH ($472.50)
            </div>
          </div>
          <div>
            <div style={{ fontSize: "12px", color: "#64748b", fontFamily: "monospace" }}>SHANNON AUDIT</div>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#a855f7", fontFamily: "monospace" }}>
              100/100 PASSED
            </div>
          </div>
        </div>

        <div style={{ fontSize: "14px", color: "#94a3b8" }}>
          Sub-Second Cross-Chain Reactive Protocol
        </div>
      </div>
    </AbsoluteFill>
  );
};
