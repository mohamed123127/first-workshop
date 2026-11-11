"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Code2,
  Lock,
  Wifi,
  Radio,
  FileCode,
  Layers,
  Sparkles,
} from "lucide-react";

/**
 * Modern Interactive Web Browser Chrome Bar
 * Mimics an active browser inspection session at https://workshop.dev/instructors
 */
export function WebBrowserBar({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`w-full max-w-5xl mx-auto rounded-2xl bg-[#080E1C]/90 border border-white/10 backdrop-blur-xl p-2 sm:p-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.4)] flex flex-wrap items-center justify-between gap-2 text-xs font-mono select-none ${className}`}
    >
      {/* Left: macOS / Browser Traffic Light Window Controls */}
      <div className="flex items-center gap-1.5 pl-1 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shadow-[0_0_6px_rgba(244,63,94,0.6)]" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
        <div className="hidden sm:flex items-center gap-1 ml-2 text-[10px] text-slate-400">
          <FileCode className="w-3 h-3 text-cyan-400" />
          <span className="text-slate-300 font-semibold">mentors.tsx</span>
        </div>
      </div>

      {/* Center: Glowing HTTPS Address Bar */}
      <div className="flex-1 max-w-md mx-auto flex items-center justify-center">
        <div className="w-full flex items-center justify-between gap-2 px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-[11px] text-slate-300 shadow-inner">
          <div className="flex items-center gap-1.5 truncate">
            <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="text-emerald-400 font-bold">https://</span>
            <span className="text-white font-semibold truncate">webcraft.dev/instructors</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[9px] font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-400/20 px-1.5 py-0.5 rounded-md shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>HTTP/3</span>
          </div>
        </div>
      </div>

      {/* Right: Live Web Telemetry (200 OK, SSL, Latency) */}
      <div className="flex items-center gap-2 pr-1 text-[10px] shrink-0">
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>200 OK</span>
        </div>

        <div className="hidden md:flex items-center gap-1 text-slate-400">
          <Wifi className="w-3 h-3 text-cyan-400" />
          <span>14ms</span>
        </div>

        <div className="hidden lg:flex items-center gap-1 text-slate-400">
          <Radio className="w-3 h-3 text-indigo-400 animate-pulse" />
          <span>Edge CDN</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Creative Web Fiber Conduits & Traveling Photons
 * Visualizes electrical data flowing between Frontend & Backend mentors
 */
export function WebLightingConduit({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`hidden md:flex flex-col items-center justify-center relative w-full h-full pointer-events-none select-none px-2 ${className}`}>
      {/* Central Web Nexus Core */}
      <div className="relative flex flex-col items-center justify-center z-10">
        {/* Animated Glowing Ring */}
        <div className="relative w-14 h-14 rounded-2xl bg-[#0A1329]/90 border border-cyan-400/40 shadow-[0_0_25px_rgba(6,182,212,0.4)] flex flex-col items-center justify-center backdrop-blur-md">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-2xl border border-dashed border-cyan-400/30"
          />
          <Globe className="w-6 h-6 text-cyan-400" />
          <span className="absolute -bottom-2 px-1.5 py-0.2 rounded-full bg-black/80 border border-cyan-400/40 text-[8px] font-mono font-bold text-cyan-300 shadow-sm">
            WEB // HUB
          </span>
        </div>

        {/* Vertical Pulse Cable */}
        <div className="relative w-1 h-20 my-2 rounded-full bg-gradient-to-b from-cyan-400 via-indigo-500 to-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.6)] overflow-hidden">
          <motion.div
            initial={{ top: "-20%" }}
            animate={{ top: "120%" }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 right-0 h-4 bg-white rounded-full shadow-[0_0_8px_#ffffff]"
          />
        </div>

        {/* Data Stream Tag */}
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-[9px] font-mono text-indigo-300 font-bold shadow-sm">
          <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
          <span>FULLSTACK DUAL-ENGINE</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Creative Floating Web Lights & Badges
 * Interactive neon web pills showcasing the modern web foundation
 */
export function WebTechBadgesRow({
  className = "",
}: {
  className?: string;
}) {
  const webPills = [
    {
      label: "</> HTML5 Semantic",
      accent: "cyan",
      glow: "shadow-[0_0_15px_rgba(6,182,212,0.3)]",
      border: "border-cyan-400/40 bg-cyan-500/10 text-cyan-300",
    },
    {
      label: "{ } Modern CSS & Tailwind",
      accent: "indigo",
      glow: "shadow-[0_0_15px_rgba(99,102,241,0.3)]",
      border: "border-indigo-400/40 bg-indigo-500/10 text-indigo-300",
    },
    {
      label: "TS TypeScript 5 & React 19",
      accent: "cyan",
      glow: "shadow-[0_0_15px_rgba(6,182,212,0.3)]",
      border: "border-cyan-400/40 bg-cyan-500/10 text-cyan-300",
    },
    {
      label: "⚡ REST & GraphQL APIs",
      accent: "amber",
      glow: "shadow-[0_0_15px_rgba(245,158,11,0.3)]",
      border: "border-amber-400/40 bg-amber-500/10 text-amber-300",
    },
    {
      label: "🔒 TLS 1.3 / SSL Security",
      accent: "emerald",
      glow: "shadow-[0_0_15px_rgba(16,185,129,0.3)]",
      border: "border-emerald-400/40 bg-emerald-500/10 text-emerald-300",
    },
    {
      label: "☁️ Cloud Infrastructure",
      accent: "indigo",
      glow: "shadow-[0_0_15px_rgba(99,102,241,0.3)]",
      border: "border-indigo-400/40 bg-indigo-500/10 text-indigo-300",
    },
  ];

  return (
    <div
      className={`w-full max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 select-none ${className}`}
    >
      {webPills.map((pill, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ duration: 0.2 }}
          className={`px-2.5 py-1 rounded-xl text-[10px] sm:text-[11px] font-mono font-bold border backdrop-blur-md transition-all cursor-default flex items-center gap-1.5 ${pill.border} ${pill.glow}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          <span>{pill.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Floating Ambient Web Neon Particles
 * Soft drifting code symbols: < >, { }, TS, JSON, API
 */
export function FloatingWebDecorations() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Top Left Floating Tag */}
      <motion.div
        animate={{ y: [0, -10, 0], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-8 hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-[10px] font-mono font-bold shadow-[0_0_20px_rgba(6,182,212,0.25)]"
      >
        <Code2 className="w-3.5 h-3.5" />
        <span>&lt;section role=&quot;mentors&quot;&gt;</span>
      </motion.div>

      {/* Top Right Floating CSS Rule */}
      <motion.div
        animate={{ y: [0, 10, 0], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 right-10 hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-[10px] font-mono font-bold shadow-[0_0_20px_rgba(99,102,241,0.25)]"
      >
        <Layers className="w-3.5 h-3.5" />
        <span>.web-developer &#123; display: flex; &#125;</span>
      </motion.div>

      {/* Bottom Center Fiber Light Grid Ambient Horizon */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-cyan-950/20 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
