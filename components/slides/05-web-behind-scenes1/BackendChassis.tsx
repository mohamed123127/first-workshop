"use client";

import React, { ReactNode } from "react";
import { type WebBehindScenesContent } from "@/content/web-behind-scenes";
import { Sparkles, Server, Cpu, Database } from "lucide-react";

export interface BackendChassisProps {
  backend: WebBehindScenesContent["backend"];
  isExplainActive: boolean;
  onToggleExplain: () => void;
  children: ReactNode;
  className?: string;
}

export function BackendChassis({
  backend,
  isExplainActive,
  onToggleExplain,
  children,
  className = "",
}: BackendChassisProps) {
  return (
    <div
      className={`relative w-full rounded-3xl border-2 border-indigo-500/35 bg-[#0B1120]/95 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Top accent glow line */}
      <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[var(--action-indigo)] to-transparent opacity-90" />

      {/* ── BACKEND TOP HEADER BAR ── */}
      <div className="px-4 sm:px-6 py-3 bg-[#0F172A]/90 border-b border-indigo-500/20 flex flex-wrap items-center justify-between gap-3 shrink-0">
        {/* TOP LEFT OF RECTANGLE: "EXPLAIN" BUTTON */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleExplain}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all shadow-lg cursor-pointer ${
              isExplainActive
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.5)] ring-2 ring-amber-300"
                : "bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]"
            }`}
            title="Toggle interactive code execution diagram"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>{isExplainActive ? "Hide Diagram" : "Explain"}</span>
          </button>

          {/* Status Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-black/40 border border-white/5 text-[11px] font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-semibold">{backend.status}</span>
          </div>
        </div>

        {/* TOP CENTER: BACKEND LABELS */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
            <Server className="w-3.5 h-3.5 text-indigo-400" />
            <span className="font-bold">{backend.name}</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-slate-400">
            <span>PORT:</span>
            <span className="text-cyan-400 font-semibold">{backend.port}</span>
          </div>
        </div>

        {/* TOP RIGHT: RUNTIME & SYSTEM TELEMETRY */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 border border-white/5">
            <Cpu className="w-3 h-3 text-cyan-400" />
            <span>{backend.runtime}</span>
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            <Database className="w-3 h-3" />
            <span>DB POOL CONNECTED</span>
          </span>
        </div>
      </div>

      {/* ── BACKEND INNER CONTENT CHASSIS ── */}
      <div className="flex-1 p-3 sm:p-4 flex flex-col gap-3 min-h-0 overflow-hidden">
        {children}
      </div>

      {/* ── BACKEND FOOTER BAR ── */}
      <div className="px-5 py-2 bg-[#0F172A]/90 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-slate-300">
            ENDPOINT: <span className="text-cyan-400 font-bold">{backend.endpoint}</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block">PROTOCOL: HTTPS / TLS 1.3</span>
          <span className="text-indigo-400 font-semibold">JSON PAYLOAD INGESTION</span>
        </div>
      </div>
    </div>
  );
}

