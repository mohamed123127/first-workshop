"use client";

import React from "react";
import {
  ConcentricRadarRings,
  CornerBracket,
  DataSineWave,
  IsometricWireCube,
} from "@/components/common/decorations/TechDecorations";
import { Terminal, Cloud, Cpu, Code2, Database } from "lucide-react";

/**
 * Slide 1: Middle Column Connector (Bridging Mohamed and Nazim's cards)
 */
export function TeachersCenterConnector() {
  return (
    <div className="hidden md:flex flex-col items-center justify-center h-full w-full pointer-events-none select-none relative px-2">
      {/* Vertical Data Bus Line */}
      <div className="absolute inset-y-8 w-px bg-gradient-to-b from-transparent via-[var(--accent-cyan)]/30 to-transparent" />
      <div className="absolute inset-y-16 w-px border-l border-dashed border-white/10" />

      {/* Top Node */}
      <div className="relative mb-auto mt-6 flex flex-col items-center">
        <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] shadow-[0_0_8px_var(--accent-cyan)]" />
        <span className="text-[9px] font-mono text-[var(--accent-cyan)]/70 uppercase tracking-widest mt-1">
          NODE_01
        </span>
      </div>

      {/* Center Floating Hex / Radar Emblem */}
      <div className="relative flex flex-col items-center justify-center my-auto py-4">
        {/* Radar Rings */}
        <ConcentricRadarRings size={130} accent="cyan" className="absolute -z-10 opacity-60" />

        <div className="w-12 h-12 rounded-2xl bg-[var(--cards-charcoal)]/80 border border-white/15 backdrop-blur-md shadow-[0_0_25px_rgba(6,182,212,0.25)] flex flex-col items-center justify-center relative">
          <Code2 className="w-5 h-5 text-[var(--accent-cyan)]" />
          <span className="absolute -bottom-2 px-1.5 py-0.2 rounded bg-black/70 border border-white/10 text-[8px] font-mono text-slate-300">
            TEAM
          </span>
        </div>

        {/* Small Data Sine Wave */}
        <div className="mt-3 opacity-60">
          <DataSineWave width={100} height={24} accent="cyan" />
        </div>
      </div>

      {/* Bottom Node */}
      <div className="relative mt-auto mb-6 flex flex-col items-center">
        <span className="text-[9px] font-mono text-[var(--action-indigo)]/70 uppercase tracking-widest mb-1">
          NODE_02
        </span>
        <span className="w-2 h-2 rounded-full bg-[var(--action-indigo)] shadow-[0_0_8px_var(--action-indigo)]" />
      </div>
    </div>
  );
}

/**
 * Slide 1: Column 1, Row 3 (Directly below Mohamed's Card)
 * Interactive / Technical Fullstack Terminal Card
 */
export function TeachersTerminalWidget() {
  return (
    <div className="hidden md:flex flex-col justify-center h-full w-full rounded-2xl p-3 bg-black/35 border border-white/10 backdrop-blur-md relative overflow-hidden select-none pointer-events-none">
      <CornerBracket position="top-left" size={14} color="var(--accent-cyan)" className="absolute top-2 left-2" />
      <CornerBracket position="bottom-right" size={14} color="var(--accent-cyan)" className="absolute bottom-2 right-2" />

      {/* Terminal Header */}
      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
          <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-300">
            FULLSTACK // AI TRACK
          </span>
        </div>
        <div className="flex items-center gap-1 text-[9px] font-mono text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] animate-pulse" />
          <span>ACTIVE</span>
        </div>
      </div>

      {/* Code Snippet Visual */}
      <div className="font-mono text-[9px] leading-relaxed text-slate-400 space-y-0.5">
        <p className="text-[var(--accent-cyan)]/90">
          <span className="text-purple-400">const</span> stack = [<span className="text-emerald-400">&quot;Next.js&quot;</span>, <span className="text-emerald-400">&quot;TypeScript&quot;</span>, <span className="text-emerald-400">&quot;PyTorch&quot;</span>];
        </p>
        <p className="text-slate-400">
          <span className="text-purple-400">interface</span> Workshop &lbrace; focus: <span className="text-amber-400">&quot;Modern Web &amp; AI&quot;</span> &rbrace;
        </p>
      </div>

      {/* Micro Metrics bar */}
      <div className="flex items-center justify-between pt-1.5 mt-1 border-t border-white/5 text-[9px] font-mono text-slate-400">
        <span>EST. 2026 // LAB</span>
        <span className="text-[var(--accent-cyan)]">01_INSTRUCTOR</span>
      </div>
    </div>
  );
}

/**
 * Slide 1: Column 3, Row 1 (Directly above Nazim's Card)
 * Cloud Architecture & DevOps Telemetry Widget
 */
export function TeachersCloudWidget() {
  return (
    <div className="hidden md:flex flex-col justify-center h-full w-full rounded-2xl p-3 bg-black/35 border border-white/10 backdrop-blur-md relative overflow-hidden select-none pointer-events-none">
      <CornerBracket position="top-right" size={14} color="var(--action-indigo)" className="absolute top-2 right-2" />
      <CornerBracket position="bottom-left" size={14} color="var(--action-indigo)" className="absolute bottom-2 left-2" />

      {/* Cloud Header */}
      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <Cloud className="w-3.5 h-3.5 text-[var(--action-indigo)]" />
          <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-300">
            CLOUD // INFRA TRACK
          </span>
        </div>
        <div className="flex items-center gap-1 text-[9px] font-mono text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--action-indigo)] animate-pulse" />
          <span>CONNECTED</span>
        </div>
      </div>

      {/* Micro Arch schematic */}
      <div className="flex items-center justify-between py-1 px-2 rounded bg-white/5 text-[9px] font-mono text-slate-300">
        <div className="flex items-center gap-1">
          <Database className="w-3 h-3 text-[var(--base-amber)]" />
          <span>DB CLUSTER</span>
        </div>
        <span className="text-white/20">───►</span>
        <div className="flex items-center gap-1">
          <Cpu className="w-3 h-3 text-[var(--action-indigo)]" />
          <span>API GATEWAY</span>
        </div>
      </div>

      {/* Micro Metrics bar */}
      <div className="flex items-center justify-between pt-1.5 mt-1 border-t border-white/5 text-[9px] font-mono text-slate-400">
        <span>REGION: GLOBAL</span>
        <span className="text-[var(--action-indigo)]">02_INSTRUCTOR</span>
      </div>
    </div>
  );
}

