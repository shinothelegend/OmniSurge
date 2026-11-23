"use client";

import React from "react";
import {
  interpolate,
  useCurrentFrame,
  AbsoluteFill,
} from "remotion";

export const OmniSurgeDemo: React.FC = () => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [60, 130, 200, 260], [0, 33, 66, 100], {
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
        backgroundColor: "#0A0A0A",
        color: "#EDEDED",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "48px 56px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}
    >
      {/* Top Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          borderBottom: "1px solid #1E1E1E",
          paddingBottom: "20px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "16px" }}>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "28px",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: "#EDEDED",
                textTransform: "uppercase",
              }}
            >
              OMNISURGE
            </span>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#8A8A8A",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              ( 06 ) HACKATHON DEMO REEL • LOW LATENCY DEFI
            </span>
          </div>
          <div style={{ fontFamily: "monospace", fontSize: "12px", color: "#555555", marginTop: "4px" }}>
            REACTIVE OMNI BUILDATHON • SUB-SECOND JIT LIQUIDITY REBALANCER
          </div>
        </div>

        <div
          style={{
            padding: "8px 16px",
            background: "#111111",
            border: "1px solid #1E1E1E",
            color: "#EDEDED",
            fontWeight: "bold",
            fontSize: "14px",
            fontFamily: "monospace",
          }}
        >
          <span style={{ color: "#E23B3B", marginRight: "8px" }}>●</span>
          LOOP LATENCY: {(latencyCounter / 1000).toFixed(3)}s
        </div>
      </div>

      {/* Main Center Visualization: 3 Editorial Pipeline Stages */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", margin: "24px 0" }}>
        {/* Track Line */}
        <div
          style={{
            position: "relative",
            height: "2px",
            backgroundColor: "#1E1E1E",
            width: "100%",
          }}
        >
          {/* Progress fill in #E23B3B red */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: `${progress}%`,
              backgroundColor: "#E23B3B",
            }}
          />
        </div>

        {/* 3 Editorial Stage Blocks */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0", border: "1px solid #1E1E1E" }}>
          {/* Stage 01 */}
          <div
            style={{
              padding: "24px",
              background: frame >= 60 ? "#111111" : "#0A0A0A",
              borderRight: "1px solid #1E1E1E",
              boxSizing: "border-box",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ fontFamily: "monospace", fontSize: "12px", color: frame >= 60 ? "#E23B3B" : "#555555", fontWeight: "bold" }}>
                (01)
              </span>
              <span style={{ fontFamily: "monospace", fontSize: "12px", color: "#8A8A8A" }}>
                {frame >= 60 ? "ACTIVE" : "STANDBY"}
              </span>
            </div>
            <div style={{ fontFamily: "monospace", fontSize: "14px", fontWeight: "bold", color: "#EDEDED", textTransform: "uppercase" }}>
              MEMPOOL DETECTION
            </div>
            <div style={{ fontFamily: "monospace", fontSize: "12px", color: "#8A8A8A", marginTop: "4px" }}>
              Base Sepolia (200ms Flashblock)
            </div>
            <div style={{ fontSize: "12px", color: "#8A8A8A", marginTop: "12px", lineHeight: "1.4" }}>
              50.0 ETH swap detected before block assembly.
            </div>
            <div
              style={{
                marginTop: "16px",
                padding: "6px 10px",
                border: "1px solid #1E1E1E",
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#EDEDED",
                background: "#0A0A0A",
              }}
            >
              DETECTION: 198ms
            </div>
          </div>

          {/* Stage 02 */}
          <div
            style={{
              padding: "24px",
              background: frame >= 130 ? "#111111" : "#0A0A0A",
              borderRight: "1px solid #1E1E1E",
              boxSizing: "border-box",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ fontFamily: "monospace", fontSize: "12px", color: frame >= 130 ? "#E23B3B" : "#555555", fontWeight: "bold" }}>
                (02)
              </span>
              <span style={{ fontFamily: "monospace", fontSize: "12px", color: "#8A8A8A" }}>
                {frame >= 130 ? "ACTIVE" : "STANDBY"}
              </span>
            </div>
            <div style={{ fontFamily: "monospace", fontSize: "14px", fontWeight: "bold", color: "#EDEDED", textTransform: "uppercase" }}>
              LASNA REACTVM
            </div>
            <div style={{ fontFamily: "monospace", fontSize: "12px", color: "#8A8A8A", marginTop: "4px" }}>
              Deterministic (~1s Finality)
            </div>
            <div style={{ fontSize: "12px", color: "#8A8A8A", marginTop: "12px", lineHeight: "1.4" }}>
              Pre-computes tick range & 150% volume coverage.
            </div>
            <div
              style={{
                marginTop: "16px",
                padding: "6px 10px",
                border: "1px solid #1E1E1E",
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#EDEDED",
                background: "#0A0A0A",
              }}
            >
              FINALITY: 792ms
            </div>
          </div>

          {/* Stage 03 */}
          <div
            style={{
              padding: "24px",
              background: frame >= 200 ? "#111111" : "#0A0A0A",
              boxSizing: "border-box",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ fontFamily: "monospace", fontSize: "12px", color: frame >= 200 ? "#E23B3B" : "#555555", fontWeight: "bold" }}>
                (03)
              </span>
              <span style={{ fontFamily: "monospace", fontSize: "12px", color: "#8A8A8A" }}>
                {frame >= 200 ? "ACTIVE" : "STANDBY"}
              </span>
            </div>
            <div style={{ fontFamily: "monospace", fontSize: "14px", fontWeight: "bold", color: "#EDEDED", textTransform: "uppercase" }}>
              DESTINATION JIT
            </div>
            <div style={{ fontFamily: "monospace", fontSize: "12px", color: "#8A8A8A", marginTop: "4px" }}>
              Atomic Callback & Retraction
            </div>
            <div style={{ fontSize: "12px", color: "#8A8A8A", marginTop: "12px", lineHeight: "1.4" }}>
              Supplies depth, captures fee, retracts same block.
            </div>
            <div
              style={{
                marginTop: "16px",
                padding: "6px 10px",
                border: "1px solid #1E1E1E",
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#EDEDED",
                background: "#0A0A0A",
              }}
            >
              EXECUTION: 194ms
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Strip */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
          background: "#111111",
          border: "1px solid #1E1E1E",
        }}
      >
        <div style={{ display: "flex", gap: "48px" }}>
          <div>
            <div style={{ fontSize: "12px", color: "#8A8A8A", fontFamily: "monospace" }}>MEASURED ROUNDTRIP</div>
            <div style={{ fontSize: "20px", fontWeight: "bold", color: "#EDEDED", fontFamily: "monospace" }}>
              ~3,632 ms
            </div>
          </div>
          <div>
            <div style={{ fontSize: "12px", color: "#8A8A8A", fontFamily: "monospace" }}>FEE HARVESTED</div>
            <div style={{ fontSize: "20px", fontWeight: "bold", color: "#EDEDED", fontFamily: "monospace" }}>
              +0.0150 ETH
            </div>
          </div>
          <div>
            <div style={{ fontSize: "12px", color: "#8A8A8A", fontFamily: "monospace" }}>IMPERMANENT LOSS</div>
            <div style={{ fontSize: "20px", fontWeight: "bold", color: "#EDEDED", fontFamily: "monospace" }}>
              0.00% (ATOMIC)
            </div>
          </div>
        </div>

        <div style={{ fontSize: "12px", color: "#8A8A8A", fontFamily: "monospace", textTransform: "uppercase" }}>
          AUTONOMOUS JIT PROTOCOL • REACTSCAN & BASESCAN VERIFIED
        </div>
      </div>
    </AbsoluteFill>
  );
};
