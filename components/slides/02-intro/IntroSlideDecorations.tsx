"use client";

import React from "react";
import {
  ConcentricRadarRings,
  CornerBracket,
  DataSineWave,
  IsometricWireCube,
} from "@/components/common/decorations/TechDecorations";
import { GitBranch, Layers, Cpu, Code2, Globe } from "lucide-react";

/**
 * Slide 2: Left Side (Part 01) Foundations Decorative Elements
 */
export function IntroLeftDecorations() {
  return (
    <div className="pointer-events-none select-none absolute inset-0 overflow-hidden -z-10">
      {/* Top Left Floating Isometric Cube */}
      <div className="absolute top-8 left-6 opacity-35 animate-float-slow">
        <IsometricWireCube size={70} accent="cyan" />
      </div>

      {/* Background Radar Rings behind the card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25">
        <ConcentricRadarRings size={380} accent="cyan" />
      </div>

      {/* Floating Micro Tech Badge 1: DOM & Layout */}
      <div className="absolute bottom-12 left-8 hidden lg:flex items-center gap-2 px-3 py-1 rounded-xl bg-black/40 border border-[var(--accent-cyan)]/20 backdrop-blur-md text-[10px] font-mono text-[var(--accent-cyan)] opacity-70 animate-float-reverse">
        <Code2 className="w-3.5 h-3.5" />
        <span>DOM &amp; CLIENT ENGINE</span>
      </div>

      {/* Corner Brackets */}
      <CornerBracket position="top-left" size={16} color="var(--accent-cyan)" className="absolute top-4 left-4" />
      <CornerBracket position="bottom-left" size={16} color="var(--accent-cyan)" className="absolute bottom-4 left-4" />
    </div>
  );
}

/**
 * Slide 2: Right Side (Part 02) Roadmap & Lifecycle Decorative Elements
 */
export function IntroRightDecorations() {
  return (
    <div className="pointer-events-none select-none absolute inset-0 overflow-hidden -z-10">
      {/* Top Right Floating Radar */}
      <div className="absolute -top-12 -right-12 opacity-30">
        <ConcentricRadarRings size={280} accent="indigo" />
      </div>

      {/* Abstract Git Commit Branch Visual */}
      <div className="absolute top-12 right-8 hidden lg:flex items-center gap-2 px-3 py-1 rounded-xl bg-black/40 border border-[var(--action-indigo)]/20 backdrop-blur-md text-[10px] font-mono text-[var(--action-indigo)] opacity-70 animate-float-slow">
        <GitBranch className="w-3.5 h-3.5" />
        <span>CI/CD &amp; RELEASE PIPELINE</span>
      </div>

      {/* Floating Data Sine Wave at the bottom right */}
      <div className="absolute bottom-10 right-8 opacity-40 animate-float-reverse">
        <DataSineWave width={200} height={40} accent="indigo" />
      </div>

      {/* Floating Micro Tech Badge 2: Cloud Infra */}
      <div className="absolute bottom-14 left-8 hidden lg:flex items-center gap-2 px-3 py-1 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md text-[10px] font-mono text-slate-400 opacity-60">
        <Layers className="w-3.5 h-3.5 text-purple-400" />
        <span>FULLSTACK ARCHITECTURE</span>
      </div>

      {/* Corner Brackets */}
      <CornerBracket position="top-right" size={16} color="var(--action-indigo)" className="absolute top-4 right-4" />
      <CornerBracket position="bottom-right" size={16} color="var(--action-indigo)" className="absolute bottom-4 right-4" />
    </div>
  );
}

