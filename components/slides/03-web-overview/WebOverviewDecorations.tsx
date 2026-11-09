"use client";

import React from "react";
import {
  ConcentricRadarRings,
  CornerBracket,
  DataSineWave,
  IsometricWireCube,
  NetworkConstellation,
} from "@/components/common/decorations/TechDecorations";
import { Globe, Network, Server, Cpu } from "lucide-react";

/**
 * Slide 3: Floating Technology Decorations for Web Overview
 */
export function WebOverviewDecorations() {
  return (
    <div className="pointer-events-none select-none absolute inset-0 overflow-hidden -z-10">
      {/* Top Right: Network Constellation */}
      <div className="absolute top-10 right-10 opacity-30 animate-float-slow">
        <NetworkConstellation size={160} accent="cyan" />
      </div>

      {/* Top Left: Floating Isometric Cube */}
      <div className="absolute top-24 left-10 opacity-25 animate-float-reverse">
        <IsometricWireCube size={75} accent="amber" />
      </div>

      {/* Middle Right: Radar Rings */}
      <div className="absolute top-1/2 -right-24 -translate-y-1/2 opacity-20">
        <ConcentricRadarRings size={340} accent="cyan" />
      </div>

      {/* Floating Micro Protocol Pill 1: Left */}
      <div className="absolute top-1/3 left-4 hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-[9px] font-mono text-slate-400 opacity-60">
        <Globe className="w-3 h-3 text-[var(--accent-cyan)]" />
        <span>HTTP/3 &bull; QUIC</span>
      </div>

      {/* Floating Micro Protocol Pill 2: Right */}
      <div className="absolute bottom-36 right-6 hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-[9px] font-mono text-slate-400 opacity-60">
        <Server className="w-3 h-3 text-[var(--action-indigo)]" />
        <span>EDGE &bull; CDN</span>
      </div>

      {/* Corner Brackets */}
      <CornerBracket position="top-left" size={16} color="var(--accent-cyan)" className="absolute top-6 left-6" />
      <CornerBracket position="top-right" size={16} color="var(--accent-cyan)" className="absolute top-6 right-6" />
      <CornerBracket position="bottom-left" size={16} color="var(--base-amber)" className="absolute bottom-6 left-6" />
      <CornerBracket position="bottom-right" size={16} color="var(--accent-cyan)" className="absolute bottom-6 right-6" />
    </div>
  );
}

