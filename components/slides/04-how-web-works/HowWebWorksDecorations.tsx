"use client";

import React from "react";
import {
  ConcentricRadarRings,
  CornerBracket,
  IsometricWireCube,
} from "@/components/common/decorations/TechDecorations";
import { Laptop, Server, Globe, ShieldCheck, Database, ArrowDown } from "lucide-react";

/**
 * Slide 4: Client Side Request Lifecycle Vector Diagram (Left Flank)
 */
export function HowWebWorksLeftDiagram() {
  return (
    <div className="hidden 2xl:flex flex-col gap-3 w-56 pointer-events-none select-none text-slate-300">
      <div className="flex items-center gap-2 pb-2 border-b border-white/10">
        <div className="w-7 h-7 rounded-lg bg-[var(--accent-cyan)]/15 border border-[var(--accent-cyan)]/30 flex items-center justify-center text-[var(--accent-cyan)] shadow-sm">
          <Laptop className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent-cyan)] font-bold block">
            Step 1 &bull; Client
          </span>
          <span className="text-xs font-semibold text-white">Browser Request</span>
        </div>
      </div>

      {/* Sequential Network Flow Steps */}
      <div className="space-y-2 text-[10px] font-mono">
        {/* Step 1: DNS */}
        <div className="p-2 rounded-xl bg-black/40 border border-white/10 backdrop-blur-sm relative overflow-hidden group">
          <div className="flex items-center justify-between text-[var(--accent-cyan)] font-semibold mb-0.5">
            <span>DNS RESOLUTION</span>
            <span className="text-[9px] opacity-75">8.8.8.8</span>
          </div>
          <p className="text-slate-400 text-[9px] leading-tight">
            google.com &rarr; 142.250.190.46
          </p>
        </div>

        {/* Step 2: TCP Handshake */}
        <div className="p-2 rounded-xl bg-black/40 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between text-indigo-400 font-semibold mb-0.5">
            <span>TCP HANDSHAKE</span>
            <span className="text-[9px] opacity-75">PORT 443</span>
          </div>
          <p className="text-slate-400 text-[9px] leading-tight">
            SYN &rarr; SYN-ACK &rarr; ACK
          </p>
        </div>

        {/* Step 3: TLS Encryption */}
        <div className="p-2 rounded-xl bg-black/40 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-0.5">
            <ShieldCheck className="w-3 h-3" />
            <span>TLS 1.3 SECURE</span>
          </div>
          <p className="text-slate-400 text-[9px] leading-tight">
            Encrypted cryptographic tunnel
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Slide 4: Server Side Processing & Response Lifecycle Vector Diagram (Right Flank)
 */
export function HowWebWorksRightDiagram() {
  return (
    <div className="hidden 2xl:flex flex-col gap-3 w-56 pointer-events-none select-none text-slate-300">
      <div className="flex items-center gap-2 pb-2 border-b border-white/10">
        <div className="w-7 h-7 rounded-lg bg-[var(--action-indigo)]/15 border border-[var(--action-indigo)]/30 flex items-center justify-center text-[var(--action-indigo)] shadow-sm">
          <Server className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--action-indigo)] font-bold block">
            Step 2 &bull; Server
          </span>
          <span className="text-xs font-semibold text-white">Google Datacenter</span>
        </div>
      </div>

      {/* Sequential Response Flow Steps */}
      <div className="space-y-2 text-[10px] font-mono">
        {/* Step 4: HTTP Request */}
        <div className="p-2 rounded-xl bg-black/40 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between text-purple-400 font-semibold mb-0.5">
            <span>HTTP/3 &bull; QUIC</span>
            <span className="text-[9px] opacity-75">GET /</span>
          </div>
          <p className="text-slate-400 text-[9px] leading-tight">
            Request routed via Edge CDN
          </p>
        </div>

        {/* Step 5: Database & Indexer */}
        <div className="p-2 rounded-xl bg-black/40 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between text-[var(--base-amber)] font-semibold mb-0.5">
            <span className="flex items-center gap-1">
              <Database className="w-3 h-3" />
              SEARCH INDEX
            </span>
            <span className="text-[9px] opacity-75">&lt; 35ms</span>
          </div>
          <p className="text-slate-400 text-[9px] leading-tight">
            Query billion-page index
          </p>
        </div>

        {/* Step 6: 200 OK HTML Stream */}
        <div className="p-2 rounded-xl bg-black/40 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between text-emerald-400 font-semibold mb-0.5">
            <span>200 OK RESPONSE</span>
            <span className="text-[9px] opacity-75">PAYLOAD</span>
          </div>
          <p className="text-slate-400 text-[9px] leading-tight">
            HTML + CSS + JS Render Tree
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Slide 4: Ambient Floating Vector Shapes
 */
export function HowWebWorksFloatingDecorations() {
  return (
    <div className="pointer-events-none select-none absolute inset-0 overflow-hidden -z-10">
      {/* Top Left Floating Radar */}
      <div className="absolute top-12 left-10 opacity-25">
        <ConcentricRadarRings size={260} accent="cyan" />
      </div>

      {/* Top Right Floating Isometric Cube */}
      <div className="absolute top-16 right-16 opacity-30 animate-float-slow">
        <IsometricWireCube size={70} accent="indigo" />
      </div>

      {/* Bottom Center Floating Radar */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 opacity-20">
        <ConcentricRadarRings size={360} accent="indigo" />
      </div>

      {/* Corner Brackets */}
      <CornerBracket position="top-left" size={16} color="var(--accent-cyan)" className="absolute top-6 left-6" />
      <CornerBracket position="top-right" size={16} color="var(--accent-cyan)" className="absolute top-6 right-6" />
      <CornerBracket position="bottom-left" size={16} color="var(--action-indigo)" className="absolute bottom-6 left-6" />
      <CornerBracket position="bottom-right" size={16} color="var(--action-indigo)" className="absolute bottom-6 right-6" />
    </div>
  );
}

