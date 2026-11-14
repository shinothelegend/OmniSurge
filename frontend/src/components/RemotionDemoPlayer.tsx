"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { OmniSurgeDemo } from "@/remotion/OmniSurgeDemo";
import { Play, Video, Film, Download, Terminal, Check } from "lucide-react";

// Dynamically import Player with ssr: false since Remotion uses browser canvas APIs
const Player = dynamic(() => import("@remotion/player").then((mod) => mod.Player), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-video rounded-2xl bg-slate-900/80 flex items-center justify-center border border-white/10">
      <div className="flex items-center gap-2 text-slate-400 font-mono text-sm">
        <Film className="w-5 h-5 animate-pulse text-purple-400" />
        Loading Remotion Engine...
      </div>
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
    <div className="rounded-2xl p-6 sm:p-7 bg-[#121215] border border-[#27272A] my-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Video className="w-5 h-5 text-[#06B6D4]" />
            Hackathon Video Demo: Latency Loop Trace
          </h3>
          <p className="text-xs text-[#A1A1AA] mt-1">
            Programmatic Remotion video composition showcasing the sub-second reactive pipeline.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyScript}
            className="px-3 py-1.5 rounded bg-[#18181C] hover:bg-[#27272A] border border-[#27272A] text-xs font-mono text-[#A1A1AA] flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Terminal className="w-3.5 h-3.5 text-purple-400" />}
            {copied ? "Copied Command!" : "npm run build:video"}
          </button>
        </div>
      </div>

      {/* Embedded Player */}
      <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
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

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-white/10 text-slate-300">
            1280x720 HD @ 30 FPS
          </span>
          <span>11.0s Composition (330 Frames)</span>
        </div>
        <span className="text-cyan-400">
          Programmatically generated using @remotion/player & Remotion React SDK
        </span>
      </div>
    </div>
  );
}
