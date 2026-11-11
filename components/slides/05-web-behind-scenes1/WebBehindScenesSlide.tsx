"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  webBehindScenesContent,
  type WebBehindScenesContent,
} from "@/content/web-behind-scenes";
import { SlideHeader } from "@/components/common/SlideHeader";
import { SlideBackground } from "@/components/common/decorations/SlideBackground";
import {
  LogIn,
  ArrowRight,
  ArrowLeft,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Database,
  ArrowDown,
  ArrowUp,
  Server,
  Inbox,
  ShieldCheck,
  Send,
  ZoomOut,
  Globe,
} from "lucide-react";

export interface WebBehindScenesSlideProps {
  content?: WebBehindScenesContent;
  onNextSlide?: () => void;
  onPrevSlide?: () => void;
  onOpenDatabase?: () => void;
  className?: string;
  activeStep?: number;
  setActiveStep?: React.Dispatch<React.SetStateAction<number>>;
  maxRevealedStep?: number;
  setMaxRevealedStep?: React.Dispatch<React.SetStateAction<number>>;
}

/* ── unit colors ── */
const UNIT_COLOR: Record<number, { border: string; glow: string; icon: string; ring: string; bg: string; text: string }> = {
  1: { border: "border-cyan-400", glow: "shadow-[0_0_22px_rgba(6,182,212,0.5)]", icon: "text-cyan-400", ring: "ring-cyan-400/50", bg: "bg-cyan-950/40", text: "text-cyan-300" },
  2: { border: "border-amber-400", glow: "shadow-[0_0_22px_rgba(245,158,11,0.5)]", icon: "text-amber-400", ring: "ring-amber-400/50", bg: "bg-amber-950/40", text: "text-amber-300" },
  3: { border: "border-indigo-400", glow: "shadow-[0_0_22px_rgba(99,102,241,0.5)]", icon: "text-indigo-400", ring: "ring-indigo-400/50", bg: "bg-indigo-950/40", text: "text-indigo-300" },
  4: { border: "border-emerald-400", glow: "shadow-[0_0_22px_rgba(16,185,129,0.5)]", icon: "text-emerald-400", ring: "ring-emerald-400/50", bg: "bg-emerald-950/40", text: "text-emerald-300" },
};

function UnitIcon({ id, className }: { id: number; className?: string }) {
  const defaultCls = `w-4 h-4 ${UNIT_COLOR[id]?.icon ?? "text-slate-400"}`;
  const cls = className ? `${className} ${UNIT_COLOR[id]?.icon ?? "text-slate-400"}` : defaultCls;
  if (id === 1) return <Inbox className={cls} />;
  if (id === 2) return <ShieldCheck className={cls} />;
  if (id === 3) return <Database className={cls} />;
  if (id === 4) return <Send className={cls} />;
  return <Server className={cls} />;
}

export function WebBehindScenesSlide({
  content = webBehindScenesContent,
  onNextSlide,
  onPrevSlide,
  onOpenDatabase,
  className = "",
  activeStep: controlledActiveStep,
  setActiveStep: controlledSetActiveStep,
  maxRevealedStep: controlledMaxRevealedStep,
  setMaxRevealedStep: controlledSetMaxRevealedStep,
}: WebBehindScenesSlideProps) {
  const [internalActiveStep, setInternalActiveStep] = useState<number>(1);
  const [internalMaxRevealedStep, setInternalMaxRevealedStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState(false);

  const activeStep = controlledActiveStep !== undefined ? controlledActiveStep : internalActiveStep;
  const setActiveStep = controlledSetActiveStep !== undefined ? controlledSetActiveStep : setInternalActiveStep;

  const maxRevealedStep = controlledMaxRevealedStep !== undefined ? controlledMaxRevealedStep : internalMaxRevealedStep;
  const setMaxRevealedStep = controlledSetMaxRevealedStep !== undefined ? controlledSetMaxRevealedStep : setInternalMaxRevealedStep;

  const isAllUnitsCompleted = activeStep >= content.diagramUnits.length;

  const handleNext = () => {
    if (isAllUnitsCompleted) {
      onNextSlide?.();
      return;
    }
    setActiveStep((prev) => {
      const next = Math.min(prev + 1, content.diagramUnits.length);
      setMaxRevealedStep((m) => Math.max(m, next));
      return next;
    });
  };
  const handlePrev = () => setActiveStep((prev) => Math.max(prev - 1, 1));

  /* DB visible after step-3 is revealed */
  const dbUnit = content.diagramUnits.find((u) => u.hasDatabaseTop);
  const isDbRevealed = dbUnit ? maxRevealedStep >= dbUnit.id : false;
  const isDbActive = dbUnit ? activeStep === dbUnit.id : false;

  const renderUnitCard = (unitId: number) => {
    const unit = content.diagramUnits.find((u) => u.id === unitId);
    if (!unit) return null;

    const isRevealed = unit.id <= maxRevealedStep;
    const isActive = unit.id === activeStep;
    const col = UNIT_COLOR[unit.id];

    return (
      <motion.button
        key={unit.id}
        type="button"
        onClick={() => {
          setActiveStep(unit.id);
          setMaxRevealedStep((m) => Math.max(m, unit.id));
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: isRevealed ? 1 : 0.35,
          scale: isRevealed ? 1 : 0.95,
        }}
        transition={{ duration: 0.3 }}
        className={`relative w-full py-2.5 px-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer text-center select-none ${isActive
          ? `${col.border} ${col.bg} ${col.glow} ring-2 ${col.ring}`
          : "border-white/10 bg-black/40 hover:border-white/25"
          }`}
      >
        {/* Step badge */}
        <span
          className={`absolute top-1.5 right-1.5 text-[8px] font-mono px-1.5 py-0.2 rounded bg-white/10 ${isActive ? col.text : "text-slate-500"
            }`}
        >
          0{unit.id}
        </span>

        <UnitIcon id={unit.id} className="w-10 h-10" />

        <div className="w-full">
          <p
            className={`text-[11px] sm:text-xl font-bold leading-tight truncate ${isActive ? "text-white" : "text-slate-300"
              }`}
          >
            {unit.title}
          </p>
          <p
            className={`text-[9px] md:text-md font-mono mt-0.5 leading-tight truncate max-w-full ${isActive ? col.text : "text-slate-500"
              }`}
          >
            {unit.subtitle}
          </p>
        </div>
      </motion.button>
    );
  };

  return (
    <section
      aria-label="Frontend vs Backend Communication"
      className={`relative min-h-screen w-full flex flex-col bg-[var(--bg-deep-navy)] overflow-hidden select-none ${className}`}
    >
      {/* ── Background ── */}
      <SlideBackground
        theme="indigo"
        slideTag="SLIDE_07 // STEP_BY_STEP_FLOW"
        glowOrbs={[
          { color: "indigo", position: "top-left", size: "w-[36rem] h-[36rem]", opacity: "opacity-20" },
          { color: "cyan", position: "bottom-right", size: "w-[38rem] h-[38rem]", opacity: "opacity-15" },
          { color: "amber", position: "center", size: "w-[26rem] h-[20rem]", opacity: "opacity-5" },
        ]}
      />

      {/* ── Slide Header ── */}
      <SlideHeader
        title={content.title}
        eyebrow={content.eyebrow}
        slideNumber={content.badge}
        accent="indigo"
      />

      {/* ══════════════════════════════════════════════════════════
          MAIN  ─  two columns:  [Login Prototype]  |  [Backend]
          ══════════════════════════════════════════════════════════ */}
      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-6 flex items-stretch gap-6 min-h-0">

        {/* ════════════════════════════════════════
            LEFT  ─  Login page prototype (bigger)
            ════════════════════════════════════════ */}
        <div className="flex w-[280px] sm:w-[310px] flex flex-col items-center justify-center pt-4">
          {/* Browser chrome */}
          <div className="rounded-2xl h-[70%] border border-slate-700/70 overflow-hidden shadow-[0_12px_48px_rgba(0,0,0,0.65)] flex flex-col bg-[#0A0F1D]">

            {/* Toolbar */}
            <div className="bg-[#111827] border-b border-slate-800 px-3 py-2 flex items-center gap-2 shrink-0">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/70" />
                <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
              </div>
              <div className="flex-1 flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#1E293B] border border-slate-700/50 text-[11px] font-mono text-slate-400">
                <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate text-slate-300">devup-club.dz/login</span>
              </div>
            </div>

            {/* Page body */}
            <div className="flex-1 p-6 flex flex-col items-center gap-4 bg-gradient-to-b from-[#0B1120] to-[#060D18]">
              {/* Logo */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-[0_0_24px_rgba(99,102,241,0.55)]">
                  <span className="text-white font-black text-xl">D</span>
                </div>
                <span className="text-white text-sm font-bold tracking-wide">DevUp Club</span>
                <span className="text-slate-400 text-[11px] font-mono">Sign in to your account</span>
              </div>

              {/* Form */}
              <div className="w-full flex flex-col gap-3">
                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-mono text-slate-400">Email address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                    <div className="pl-8 pr-3 py-2.5 rounded-xl bg-[#1E293B] border border-slate-700/70 text-[12px] font-mono text-cyan-300">
                      mohamed@devup-club.dz
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-mono text-slate-400">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                    <div className="pl-8 pr-9 py-2.5 rounded-xl bg-[#1E293B] border border-slate-700/70 text-[12px] font-mono text-slate-300">
                      {showPassword ? "workshop2026" : "••••••••••••"}
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="button"
                  className="mt-1 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-sm font-bold font-mono flex items-center justify-center gap-2 shadow-[0_0_22px_rgba(99,102,241,0.45)] cursor-pointer hover:from-indigo-500 hover:to-cyan-500 transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </button>
              </div>

              {/* Payload badge */}
              <div className="w-full mt-auto pt-3 border-t border-slate-800">
                <div className="p-2 rounded-xl bg-[#111827] border border-indigo-500/30 text-[11px] font-mono text-slate-400">
                  <span className="text-indigo-400 font-bold">POST</span>
                  <span className="text-slate-500"> → body: </span>
                  <span className="text-cyan-300">{"{ email, password }"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 text-center">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Client · Browser</span>
          </div>
        </div>

        {/* ════════════════════════════════════════
            CENTER  ─  HTTP arrows connector
            ════════════════════════════════════════ */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center gap-5 w-16 sm:w-20">
          {/* Request → */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center">
              <div className="w-8 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-400" />
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400 -ml-1" />
            </div>
            <span className="text-[9px] font-mono font-bold text-indigo-300 whitespace-nowrap bg-indigo-500/15 border border-indigo-500/30 px-2 py-0.5 rounded-md">
              HTTP Request
            </span>
            <span className="text-[9px] font-mono text-slate-500 whitespace-nowrap">POST /auth/login</span>
          </div>

          {/* ← Response */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center">
              <ArrowLeft className="w-3.5 h-3.5 text-emerald-400 -mr-1" />
              <div className="w-8 h-0.5 bg-gradient-to-l from-emerald-500 to-cyan-500" />
            </div>
            <span className="text-[9px] font-mono font-bold text-emerald-300 whitespace-nowrap bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-md">
              HTTP Response
            </span>
            <span className="text-[9px] font-mono text-slate-500 whitespace-nowrap">200 OK + Cookie</span>
          </div>
        </div>

        {/* ════════════════════════════════════════
            RIGHT  ─  Backend frame + DB below
            ════════════════════════════════════════ */}
        <div className="flex-1 min-w-0 flex flex-col justify-center pt-4 gap-3">
          <div className="h-[70%] relative">

            <div className="text-center -top-8 left-4 absolute">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                Server · Node.js · Express
              </span>
            </div>
            {/* ── Backend Frame ── */}
            <div className="relative h-full rounded-2xl border-2 border-indigo-500/40 bg-[#0B1120]/95 backdrop-blur-xl shadow-[0_0_60px_rgba(99,102,241,0.15)] flex flex-col overflow-hidden">
              {/* Header: simple — title + endpoint */}
              <div className="px-5 py-3 bg-[#0F172A]/90 border-b border-indigo-500/20 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-mono font-bold text-white tracking-wide">Login Feature</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-indigo-400 font-bold">{content.backend.method}</span>
                  <span className="text-cyan-300 font-semibold">{content.backend.endpoint}</span>
                </div>
              </div>

              {/* 2×2 units with connecting flow arrows */}
              <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between min-h-0">
                {/* TOP ROW: [Unit 1: Receive Input]  ──→  [Unit 2: Input Validation] */}
                <div className="flex items-center h-[40%] justify-between gap-2 sm:gap-3">
                  <div className="w-[160px] sm:w-[40%] h-full flex justify-center">
                    {renderUnitCard(1)}
                  </div>

                  {/* Arrow 1 → 2 (Top horizontal arrow) */}
                  <div className="flex-1 flex items-center justify-center px-1">
                    <motion.div
                      animate={{
                        opacity: maxRevealedStep >= 2 ? 1 : 0.25,
                        scale: maxRevealedStep >= 2 ? 1 : 0.9,
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center w-full justify-center text-amber-400"
                    >
                      <div className="flex-1 h-0.5 max-w-[70px] sm:max-w-[90px] bg-gradient-to-r from-cyan-400 to-amber-400" />
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 -ml-1 text-amber-400 shrink-0" />
                    </motion.div>
                  </div>

                  <div className="w-[160px] sm:w-[40%] h-full flex justify-center">
                    {renderUnitCard(2)}
                  </div>
                </div>

                {/* MIDDLE ROW: Vertical Arrow (Unit 2 ↓ Unit 3) */}
                <div className="flex items-center justify-between px-2 sm:px-4 py-0.5 sm:py-1">
                  {/* Left empty balance column */}
                  <div className="w-[160px] sm:w-[190px] shrink-0" />

                  {/* Middle empty spacer */}
                  <div className="flex-1" />

                  {/* Right vertical arrow aligned directly between Unit 2 and Unit 3 */}
                  <div className="w-[160px] sm:w-[190px] shrink-0 flex justify-center">
                    <motion.div
                      animate={{
                        opacity: maxRevealedStep >= 3 ? 1 : 0.25,
                        scale: maxRevealedStep >= 3 ? 1 : 0.9,
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center text-indigo-400 py-0.5"
                    >
                      <div className="w-0.5 h-4 sm:h-7 bg-gradient-to-b from-amber-400 to-indigo-400" />
                      <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 -mt-1 text-indigo-400 shrink-0" />
                    </motion.div>
                  </div>
                </div>

                {/* BOTTOM ROW: [Unit 4: Return Response]  ←──  [Unit 3: Check into DB] */}
                <div className="flex items-center justify-between h-[40%] gap-2 sm:gap-3">
                  <div className="w-[160px] sm:w-[40%] h-full flex justify-center">
                    {renderUnitCard(4)}
                  </div>

                  {/* Arrow 3 → 4 (Bottom horizontal arrow pointing LEFT: from Unit 3 to Unit 4) */}
                  <div className="flex-1 flex items-center justify-center px-1">
                    <motion.div
                      animate={{
                        opacity: maxRevealedStep >= 4 ? 1 : 0.25,
                        scale: maxRevealedStep >= 4 ? 1 : 0.9,
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center w-full justify-center text-emerald-400"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 -mr-1 text-emerald-400 shrink-0" />
                      <div className="flex-1 h-0.5 max-w-[70px] sm:max-w-[90px] bg-gradient-to-l from-indigo-400 to-emerald-400" />
                    </motion.div>
                  </div>

                  <div className="w-[160px] sm:w-[40%] h-full flex justify-center">
                    {renderUnitCard(3)}
                  </div>
                </div>
              </div>

              {/* Footer: Prev / Next stepper */}
              <div className="px-5 py-2.5 bg-[#0F172A]/90 border-t border-white/5 flex items-center justify-between shrink-0">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={activeStep <= 1}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-mono cursor-pointer"
                >
                  <ArrowLeft className="w-3 h-3" />
                  Prev
                </button>

                <span className="text-[11px] font-mono text-slate-400">
                  Step {activeStep} / {content.diagramUnits.length}
                </span>

                <motion.button
                  type="button"
                  onClick={handleNext}
                  animate={
                    isAllUnitsCompleted
                      ? {
                        scale: [1, 1.05, 1],
                        boxShadow: [
                          "0 0 14px rgba(99,102,241,0.4)",
                          "0 0 25px rgba(6,182,212,0.8)",
                          "0 0 14px rgba(99,102,241,0.4)",
                        ],
                      }
                      : {}
                  }
                  transition={
                    isAllUnitsCompleted
                      ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
                      : undefined
                  }
                  title={isAllUnitsCompleted ? "Zoom out to Slide 08: The Internet" : "Next diagram unit"}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${isAllUnitsCompleted
                      ? "bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white ring-2 ring-cyan-300/60 shadow-[0_0_20px_rgba(6,182,212,0.6)]"
                      : "bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-[0_0_14px_rgba(99,102,241,0.4)]"
                    }`}
                >
                  {isAllUnitsCompleted ? (
                    <>
                      <span>The Internet</span>
                      <ZoomOut className="w-3.5 h-3.5 text-cyan-200 animate-pulse" />
                    </>
                  ) : (
                    <>
                      <span>Next</span>
                      <ArrowRight className="w-3 h-3" />
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
          {/* ── DB: hidden, slides down when step 3 revealed ── */}
          <AnimatePresence>
            {isDbRevealed && (
              <motion.div
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                {/* Arrow from backend to DB */}
                <div className="flex justify-center py-1">
                  <div className="flex items-center gap-2 text-indigo-400">
                    <ArrowDown className="w-4 h-4 animate-bounce" />
                    <div className="rotate-180 mb-2">
                      <ArrowDown className="w-4 h-4 animate-bounce" />

                    </div>
                  </div>
                </div>

                {/* DB card */}
                <button
                  type="button"
                  onClick={() => (onOpenDatabase ? onOpenDatabase() : onNextSlide?.())}
                  title="Open Database Slide (Slide 06)"
                  className={`w-1/2 mx-auto flex items-center justify-between gap-4 px-5 py-4 rounded-2xl border-2 cursor-zoom-in transition-all duration-300 ${isDbActive
                    ? "border-indigo-400 bg-indigo-950/60 shadow-[0_0_30px_rgba(99,102,241,0.6)] ring-2 ring-indigo-400/30"
                    : "border-indigo-500/40 bg-[#0B1120]/90 hover:border-cyan-400 hover:shadow-[0_0_24px_rgba(6,182,212,0.4)]"
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <Database className={`w-10 h-10 transition-all ${isDbActive ? "text-indigo-300 animate-pulse" : "text-indigo-400"}`} />
                    <div className="text-left">
                      <p className="text-sm font-mono font-bold text-white">DataBase</p>
                      <p className="text-[11px] font-mono text-indigo-300 mt-0.5">devup_production_db</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isDbActive && (
                      <span className="px-2 py-0.5 rounded-lg bg-indigo-500/30 text-indigo-200 text-[10px] font-mono font-bold uppercase tracking-wider border border-indigo-400/30">
                        queried
                      </span>
                    )}
                    <span className="text-[11px] font-mono text-slate-400 hover:text-cyan-300 transition-colors">
                      Inspect ↗
                    </span>
                  </div>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
