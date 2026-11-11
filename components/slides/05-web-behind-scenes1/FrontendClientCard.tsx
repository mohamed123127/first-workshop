"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Laptop,
  Lock,
  Send,
  CheckCircle2,
  FileJson,
  Cookie,
  User,
  KeyRound,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

export type FlowPhase =
  | "idle"
  | "request_sending"
  | "server_processing"
  | "database_query"
  | "response_sending"
  | "success";

export interface FrontendClientCardProps {
  currentPhase: FlowPhase;
  onTriggerLogin: () => void;
  onReset: () => void;
  className?: string;
}

export function FrontendClientCard({
  currentPhase,
  onTriggerLogin,
  onReset,
  className = "",
}: FrontendClientCardProps) {
  const [showPayload, setShowPayload] = useState(false);

  const isSending = currentPhase === "request_sending";
  const isBusy =
    currentPhase === "request_sending" ||
    currentPhase === "server_processing" ||
    currentPhase === "database_query" ||
    currentPhase === "response_sending";
  const isSuccess = currentPhase === "success";

  return (
    <div
      className={`relative rounded-3xl border-2 transition-all duration-300 flex flex-col overflow-hidden bg-[#0B1120]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] ${
        isSuccess
          ? "border-emerald-500/50 shadow-[0_0_35px_rgba(16,185,129,0.25)]"
          : isBusy
          ? "border-cyan-500/50 shadow-[0_0_35px_rgba(6,182,212,0.25)]"
          : "border-white/10 hover:border-cyan-500/30"
      } ${className}`}
    >
      {/* Top accent glow line */}
      <div
        className={`absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent ${
          isSuccess
            ? "via-emerald-400"
            : isBusy
            ? "via-[var(--accent-cyan)]"
            : "via-white/20"
        } to-transparent opacity-80`}
      />

      {/* ── BROWSER / CLIENT TOP CHROME ── */}
      <div className="px-4 py-2.5 bg-[#0F172A]/90 border-b border-white/10 flex items-center justify-between gap-2 shrink-0">
        {/* Mac-style traffic dots */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>

        {/* Client Tag */}
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-cyan-300">
          <Laptop className="w-3 h-3 text-cyan-400" />
          <span className="font-semibold">FRONTEND // CLIENT</span>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-1 text-[10px] font-mono">
          <span
            className={`w-2 h-2 rounded-full ${
              isSuccess
                ? "bg-emerald-400 shadow-[0_0_8px_#34d399]"
                : isBusy
                ? "bg-cyan-400 animate-ping"
                : "bg-slate-500"
            }`}
          />
          <span
            className={
              isSuccess
                ? "text-emerald-400 font-bold"
                : isBusy
                ? "text-cyan-400 font-semibold"
                : "text-slate-400"
            }
          >
            {isSuccess ? "200 OK" : isBusy ? "AWAITING..." : "IDLE"}
          </span>
        </div>
      </div>

      {/* URL mini address bar */}
      <div className="px-3 py-1.5 bg-[#141E33]/70 border-b border-white/5 flex items-center justify-between gap-2 text-[11px] font-mono text-slate-300">
        <div className="flex items-center gap-1.5 truncate">
          <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
          <span className="text-slate-500">https://</span>
          <span className="font-semibold text-white">devup-club.dz</span>
          <span className="text-cyan-400 font-semibold">/login</span>
        </div>

        <button
          type="button"
          onClick={() => setShowPayload((prev) => !prev)}
          className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono border transition-all cursor-pointer ${
            showPayload
              ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
              : "bg-white/5 text-slate-400 hover:text-white border-white/10"
          }`}
          title="Inspect HTTP request JSON payload"
        >
          <FileJson className="w-3 h-3" />
          <span>Payload</span>
        </button>
      </div>

      {/* ── CARD BODY: LOGIN FORM / USER STATE ── */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3 overflow-y-auto min-h-0">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            /* Login Form View */
            <motion.div
              key="login-form-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                    <span>DevUp Club Portal</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      v2.4
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-400 font-mono">
                    User inputs credentials to authenticate
                  </p>
                </div>
              </div>

              {/* Form Inputs Mockup */}
              <div className="space-y-2">
                {/* Email Field */}
                <div className="rounded-xl p-2 bg-black/40 border border-white/10 flex items-center gap-2">
                  <div className="p-1 rounded-lg bg-white/5 text-slate-400">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] font-mono uppercase text-slate-400 tracking-wider">
                      Email Address
                    </div>
                    <div className="text-xs font-mono font-semibold text-white truncate">
                      mohamed@devup-club.dz
                    </div>
                  </div>
                </div>

                {/* Password Field */}
                <div className="rounded-xl p-2 bg-black/40 border border-white/10 flex items-center gap-2">
                  <div className="p-1 rounded-lg bg-white/5 text-slate-400">
                    <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] font-mono uppercase text-slate-400 tracking-wider">
                      Password (Raw Client Text)
                    </div>
                    <div className="text-xs font-mono tracking-widest text-slate-200">
                      ••••••••••••
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500">
                    workshop2026
                  </span>
                </div>
              </div>

              {/* Collapsible HTTP Payload Inspector */}
              {showPayload && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-xl p-2.5 bg-black/60 border border-cyan-500/30 text-[10px] font-mono text-slate-300 space-y-1 shadow-inner"
                >
                  <div className="flex items-center justify-between text-cyan-300 text-[9px] font-bold">
                    <span>POST /api/v1/auth/login</span>
                    <span>Content-Type: application/json</span>
                  </div>
                  <pre className="text-emerald-300 leading-tight">
{`{
  "email": "mohamed@devup-club.dz",
  "password": "workshop2026"
}`}
                  </pre>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* Authenticated Success View */
            <motion.div
              key="authenticated-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-3 py-1"
            >
              <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-start gap-3 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 tracking-wider">
                    Authentication Succeeded
                  </span>
                  <h4 className="text-sm font-bold text-white truncate">
                    Welcome, Mohamed Louahchi!
                  </h4>
                  <p className="text-[11px] text-slate-300 font-mono mt-0.5">
                    Role: <span className="text-cyan-400 font-semibold">Instructor • Full-Stack Lead</span>
                  </p>
                </div>
              </div>

              {/* Minted Session Cookie Info */}
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-1.5 font-mono text-[10px]">
                <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                  <Cookie className="w-3.5 h-3.5" />
                  <span>Session Cookie Stored</span>
                </div>
                <div className="text-slate-300 bg-white/5 p-1.5 rounded border border-white/5 truncate">
                  session_token=eyJhbGciOiJIUzI1NiIsInR5...
                </div>
                <div className="text-[9px] text-slate-400 flex items-center justify-between">
                  <span>HttpOnly: true</span>
                  <span>Secure: true</span>
                  <span>SameSite: Strict</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── ACTION TRIGGER BUTTON ── */}
        <div className="pt-2 border-t border-white/10 flex items-center gap-2">
          {!isSuccess ? (
            <button
              type="button"
              onClick={onTriggerLogin}
              disabled={isBusy}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-mono text-xs font-bold transition-all shadow-lg cursor-pointer ${
                isBusy
                  ? "bg-cyan-500/30 text-cyan-200 border border-cyan-400/40 cursor-wait animate-pulse"
                  : "bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_28px_rgba(6,182,212,0.6)] active:scale-[0.98]"
              }`}
              title="Dispatch HTTP POST Login Request"
            >
              {isBusy ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-300" />
                  <span>
                    {isSending
                      ? "Dispatching POST Request..."
                      : currentPhase === "server_processing"
                      ? "Server Routing & Validating..."
                      : currentPhase === "database_query"
                      ? "Querying User in Database..."
                      : "Receiving Auth Response..."}
                  </span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-cyan-200" />
                  <span>Dispatch Login Request</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={onReset}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 font-mono text-xs transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Simulate Again (Reset)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
