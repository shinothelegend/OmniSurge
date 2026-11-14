"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { OmniSurgeDemo } from "@/remotion/OmniSurgeDemo";

// Dynamically import Player with ssr: false since Remotion uses browser canvas APIs
const Player = dynamic(() => import("@remotion/player").then((mod) => mod.Player), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-video bg-[#0A0A0A] flex items-center justify-center border border-[#1E1E1E]">
      <span className="font-mono text-12 text-[#8A8A8A]">
        LOADING REMOTION ENGINE...
      </span>
    </div>
  ),
});

export default function RemotionDemoPlayer() {
  const [copied, setCopied] = useState(false);

  const copyScript = () => {
    navigator.clipboard.writeText("npm run build:video");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="section-06" className="py-16 border-b border-[#1E1E1E] space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-12 text-[#8A8A8A] mb-2">
            <span className="text-[#E23B3B] font-bold">( 06 )</span>
            <span className="uppercase tracking-wider">HACKATHON DEMO REEL</span>
          </div>
          <h2 className="font-sans text-28 sm:text-40 font-bold text-[#EDEDED] uppercase">
            LATENCY LOOP TRACE.
          </h2>
          <p className="font-sans text-14 text-[#8A8A8A] mt-1">
            Programmatic Remotion composition showcasing the sub-second reactive pipeline.
          </p>
        </div>

        <div>
          <button
            onClick={copyScript}
            className="btn-rect-ghost text-12"
          >
            {copied ? "[ COPIED COMMAND ]" : "[ NPM RUN BUILD:VIDEO ]"}
          </button>
        </div>
      </div>

      {/* Embedded Player in Hairline Frame */}
      <div className="w-full aspect-video overflow-hidden border border-[#1E1E1E] bg-[#0A0A0A]">
        <Player
          component={OmniSurgeDemo}
          durationInFrames={330}
          compositionWidth={1280}
          compositionHeight={720}
          fps={30}
          controls
          loop
          autoPlay
          acknowledgeRemotionLicense
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-12 text-[#555555]">
        <span>1280x720 HD @ 30 FPS • 11.0s COMPOSITION (330 FRAMES)</span>
        <span>PROGRAMMATIC CANVAS RENDERING VIA REMOTION REACT SDK</span>
      </div>
    </div>
  );
}
