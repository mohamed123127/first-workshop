"use client";

import React from "react";
import { motion } from "framer-motion";
import type { FlowPhase } from "./FrontendClientCard";
import {
  ArrowRight,
  ArrowLeft,
  Lock,
  Zap,
  Globe,
  CheckCircle2,
} from "lucide-react";

export interface NetworkFlowHighwayProps {
  currentPhase: FlowPhase;
  className?: string;
}

export function NetworkFlowHighway({
  currentPhase,
  className = "",
}: NetworkFlowHighwayProps) {
  const isRequestInFlight = currentPhase === "request_sending";
  const isResponseInFlight = currentPhase === "response_sending";
  const isCompleted = currentPhase === "success";

  return (
    <div
      className={`relative rounded-2xl bg-black/45 border border-white/10 p-3 flex flex-col justify-between gap-2.5 backdrop-blur-md overflow-hidden ${className}`}
    >
      {/* ── TOP NETWORK PROTOCOL STATUS STRIP ── */}
      <div className="flex items-center justify-between gap-2 text-[10px] font-mono select-none">
        <div className="flex items-center gap-1.5 text-slate-300">
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-bold uppercase tracking-wider text-white">
            Network Pipeline
          </span>
          <span className="hidden sm:inline-block text-slate-500">•</span>
          <span className="hidden sm:flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
            <Lock className="w-2.5 h-2.5" />
            TLS 1.3 Encrypted
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-slate-400">
          <span>Port 443</span>
          <span className="text-cyan-400 font-semibold">HTTPS</span>
        </div>
      </div>

      {/* ── DUAL DIRECTION INTERACTIVE ANIMATED ARROWS ── */}
      <div className="space-y-2 relative">
        {/* 1. REQUEST ARROW: FRONTEND ➔ BACKEND (LEFT TO RIGHT) */}
        <div className="relative rounded-xl p-2 bg-[#0C1527] border border-cyan-500/20 overflow-hidden">
          {/* Animated Glow Track */}
          <div className="flex items-center justify-between text-[10px] font-mono mb-1">
            <span className="flex items-center gap-1 font-bold text-cyan-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              1. HTTP Request (Payload)
            </span>
            <span className="text-slate-400 text-[9px]">Frontend → Backend</span>
          </div>

          {/* Flow Track with Moving Packet */}
          <div className="relative h-7 rounded-lg bg-black/60 border border-cyan-500/30 flex items-center px-2 overflow-hidden">
            {/* Background Grid / Dash Line */}
            <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-0.5 border-t border-dashed border-cyan-500/30" />

            {/* In-Flight Glowing Packet */}
            {isRequestInFlight && (
              <motion.div
                initial={{ left: "0%" }}
                animate={{ left: ["0%", "85%"] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="absolute z-20 flex items-center gap-1 px-2 py-0.5 rounded-md bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.8)] text-[9px] font-mono font-bold"
              >
                <Zap className="w-3 h-3 text-amber-300 animate-bounce" />
                <span>POST JSON</span>
              </motion.div>
            )}

            {/* Static Content / Labels along track */}
            <div className="relative z-10 w-full flex items-center justify-between text-[10px] font-mono">
              <div className="flex items-center gap-1.5 text-cyan-300">
                <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 text-[9px]">
                  POST
                </span>
                <span className="font-semibold truncate">/api/v1/auth/login</span>
              </div>

              <div className="flex items-center gap-1 text-slate-400 text-[9px] shrink-0">
                <span className="hidden sm:inline font-mono">
                  {`{ email, password }`}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* 2. RESPONSE ARROW: BACKEND ➔ FRONTEND (RIGHT TO LEFT) */}
        <div className="relative rounded-xl p-2 bg-[#0C1527] border border-emerald-500/20 overflow-hidden">
          <div className="flex items-center justify-between text-[10px] font-mono mb-1">
            <span className="flex items-center gap-1 font-bold text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              2. HTTP Response (Session Token)
            </span>
            <span className="text-slate-400 text-[9px]">Backend → Frontend</span>
          </div>

          {/* Flow Track with Moving Return Packet */}
          <div className="relative h-7 rounded-lg bg-black/60 border border-emerald-500/30 flex items-center px-2 overflow-hidden">
            {/* Background Grid / Dash Line */}
            <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-0.5 border-t border-dashed border-emerald-500/30" />

            {/* Returning Glowing Packet */}
            {isResponseInFlight && (
              <motion.div
                initial={{ right: "0%" }}
                animate={{ right: ["0%", "85%"] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="absolute z-20 flex items-center gap-1 px-2 py-0.5 rounded-md bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.8)] text-[9px] font-mono font-bold"
              >
                <CheckCircle2 className="w-3 h-3 text-white" />
                <span>200 OK + JWT</span>
              </motion.div>
            )}

            {/* Static Content / Labels along return track */}
            <div className="relative z-10 w-full flex items-center justify-between text-[10px] font-mono">
              <div className="flex items-center gap-1 text-slate-400 text-[9px] shrink-0">
                <ArrowLeft className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="hidden sm:inline font-mono">
                  Set-Cookie: session_token
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-emerald-300">
                <span className="font-semibold truncate">status: 200 OK</span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 text-[9px]">
                  JSON
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── LIVE EXECUTION STAGE BADGE ── */}
      <div className="flex items-center justify-between text-[10px] font-mono pt-1 border-t border-white/5">
        <span className="text-slate-400 flex items-center gap-1">
          <span>Active Phase:</span>
          <span className="text-white font-bold uppercase">
            {currentPhase === "idle"
              ? "Waiting for user action"
              : currentPhase === "request_sending"
              ? "1. Dispatching Request over Network"
              : currentPhase === "server_processing"
              ? "2. Express Route & Validation"
              : currentPhase === "database_query"
              ? "3. Querying Database & Bcrypt Compare"
              : currentPhase === "response_sending"
              ? "4. Signing JWT & Returning Response"
              : "5. Success: Client Authenticated"}
          </span>
        </span>

        <span className="text-cyan-400 font-semibold hidden md:inline">
          {isCompleted ? "Roundtrip complete (~45ms)" : "Ready"}
        </span>
      </div>
    </div>
  );
}
