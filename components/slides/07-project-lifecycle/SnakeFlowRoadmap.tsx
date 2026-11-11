"use client";

import React from "react";
import { motion } from "framer-motion";
import type { LifecycleStep } from "@/content/project-lifecycle";
import {
  Brain,
  Lightbulb,
  FileText,
  Palette,
  Network,
  Code2,
  ShieldCheck,
  Cloud,
  Rocket,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  Zap,
  Eye,
} from "lucide-react";

export interface SnakeFlowRoadmapProps {
  steps: LifecycleStep[];
  selectedStepId: string | null;
  poweredStepIds: Set<string>;
  onTogglePower: (stepId: string) => void;
  onInspectStep: (step: LifecycleStep) => void;
  className?: string;
}

export function SnakeFlowRoadmap({
  steps,
  selectedStepId,
  poweredStepIds,
  onTogglePower,
  onInspectStep,
  className = "",
}: SnakeFlowRoadmapProps) {
  // Find step by ID helper
  const stepMap = new Map(steps.map((s) => [s.id, s]));

  const getStepIcon = (name: LifecycleStep["iconName"], isPowered: boolean) => {
    const iconClass = isPowered ? "w-4 h-4" : "w-4 h-4 text-slate-500";
    switch (name) {
      case "brain":
        return <Brain className={isPowered ? `${iconClass} text-cyan-400` : iconClass} />;
      case "lightbulb":
        return <Lightbulb className={isPowered ? `${iconClass} text-amber-400` : iconClass} />;
      case "fileText":
        return <FileText className={isPowered ? `${iconClass} text-indigo-400` : iconClass} />;
      case "palette":
        return <Palette className={isPowered ? `${iconClass} text-cyan-400` : iconClass} />;
      case "network":
        return <Network className={isPowered ? `${iconClass} text-indigo-400` : iconClass} />;
      case "code":
        return <Code2 className={isPowered ? `${iconClass} text-emerald-400` : iconClass} />;
      case "checkCircle":
        return <ShieldCheck className={isPowered ? `${iconClass} text-amber-400` : iconClass} />;
      case "cloud":
        return <Cloud className={isPowered ? `${iconClass} text-cyan-400` : iconClass} />;
      case "rocket":
        return <Rocket className={isPowered ? `${iconClass} text-emerald-400` : iconClass} />;
      default:
        return <Sparkles className={isPowered ? `${iconClass} text-cyan-400` : iconClass} />;
    }
  };

  // Card styles for unpowered (OFF) vs powered (ON)
  const getCardPowerStyles = (
    accent: LifecycleStep["accent"],
    isPowered: boolean,
    isSelected: boolean
  ) => {
    if (isPowered) {
      switch (accent) {
        case "cyan":
          return "bg-[#091A33]/95 border-cyan-400 shadow-[0_0_35px_rgba(6,182,212,0.45)] ring-2 ring-cyan-400/50";
        case "amber":
          return "bg-[#1E1708]/95 border-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.45)] ring-2 ring-amber-400/50";
        case "indigo":
          return "bg-[#0D1533]/95 border-indigo-400 shadow-[0_0_35px_rgba(99,102,241,0.45)] ring-2 ring-indigo-400/50";
        case "emerald":
          return "bg-[#071F18]/95 border-emerald-400 shadow-[0_0_35px_rgba(16,185,129,0.45)] ring-2 ring-emerald-400/50";
      }
    }

    // OFF / Dormant state
    return isSelected
      ? "bg-[#080E1C]/90 border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.2)] opacity-85"
      : "bg-[#060B16]/80 border-white/10 hover:border-white/30 opacity-60 hover:opacity-90 shadow-sm";
  };

  // Individual Card Component
  const renderCard = (step: LifecycleStep) => {
    const isPowered = poweredStepIds.has(step.id);
    const isSelected = selectedStepId === step.id;

    const handleCardClick = () => {
      if (!isPowered) {
        // If OFF, clicking immediately powers it ON!
        onTogglePower(step.id);
      } else {
        // If already ON, clicking opens modal
        onInspectStep(step);
      }
    };

    return (
      <div
        onClick={handleCardClick}
        className={`relative p-3.5 sm:p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between gap-2.5 backdrop-blur-xl hover:-translate-y-1 ${getCardPowerStyles(
          step.accent,
          isPowered,
          isSelected
        )}`}
      >
        {/* Top Glow Accent Bar (Visible when powered ON) */}
        {isPowered && (
          <div
            className={`absolute top-0 inset-x-6 h-1 rounded-full bg-gradient-to-r from-transparent ${
              step.accent === "cyan"
                ? "via-cyan-400"
                : step.accent === "amber"
                ? "via-amber-400"
                : step.accent === "emerald"
                ? "via-emerald-400"
                : "via-indigo-400"
            } to-transparent animate-pulse`}
          />
        )}

        {/* Card Header: Step Tag + Power Toggle Switch */}
        <div className="flex items-center justify-between gap-1">
          <span
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border transition-colors ${
              isPowered
                ? "bg-white/10 text-white border-white/20"
                : "bg-white/5 text-slate-500 border-white/5"
            }`}
          >
            {`0${step.stepNumber} • ${step.badgeLabel}`}
          </span>

          {/* Light Toggle Switch */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onTogglePower(step.id);
            }}
            className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold flex items-center gap-1.5 transition-all border cursor-pointer ${
              isPowered
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_12px_rgba(6,182,212,0.4)] hover:bg-cyan-500/30"
                : "bg-white/5 text-slate-500 border-white/10 hover:text-slate-300 hover:border-white/20 hover:bg-white/10"
            }`}
            title={isPowered ? "Click to turn light OFF" : "Click to turn light ON"}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isPowered ? "bg-cyan-400 animate-ping" : "bg-slate-600"
              }`}
            />
            <Zap className={`w-2.5 h-2.5 ${isPowered ? "text-cyan-300 fill-cyan-300" : "text-slate-500"}`} />
            <span>{isPowered ? "LIT // ON" : "OFF (CLICK)"}</span>
          </button>
        </div>

        {/* Card Body: Icon & Titles */}
        <div className="flex items-start gap-2.5">
          <div
            className={`p-2 rounded-xl border transition-all shrink-0 ${
              isPowered
                ? "bg-white/10 border-white/20 shadow-md"
                : "bg-white/[0.03] border-white/5"
            }`}
          >
            {getStepIcon(step.iconName, isPowered)}
          </div>
          <div className="min-w-0 flex-1">
            <h4
              className={`text-sm font-extrabold tracking-tight truncate transition-colors ${
                isPowered ? "text-white" : "text-slate-400"
              }`}
            >
              {step.shortTitle}
            </h4>
            <p
              className={`text-[11px] font-sans line-clamp-2 leading-relaxed transition-colors ${
                isPowered ? "text-slate-200" : "text-slate-500"
              }`}
            >
              {step.summary}
            </p>
          </div>
        </div>

        {/* Footer Actions: Power Prompt & Modal Inspect Button */}
        <div className="flex items-center justify-between pt-1.5 border-t border-white/5 text-[9px] font-mono">
          <span
            className={`flex items-center gap-1 ${
              isPowered ? "text-emerald-400 font-semibold" : "text-slate-500"
            }`}
          >
            {isPowered ? "⚡ Circuit Active" : "○ Light is OFF"}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onInspectStep(step);
            }}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-md font-mono font-bold transition-all border cursor-pointer ${
              isPowered
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/40 hover:bg-cyan-500/35 hover:scale-105 shadow-sm"
                : "bg-white/5 text-slate-400 border-white/10 hover:text-white hover:border-white/25 hover:bg-white/10"
            }`}
          >
            <Eye className="w-2.5 h-2.5" />
            <span>Details &amp; Mockup ↗</span>
          </button>
        </div>
      </div>
    );
  };

  // Horizontal Cable Link between cards in a row
  const renderHorizontalWire = (
    fromStepId: string,
    direction: "right" | "left" = "right"
  ) => {
    const isWireLit = poweredStepIds.has(fromStepId);

    return (
      <div className="hidden md:flex items-center justify-center relative w-full px-1">
        {/* Physical Conduit Base */}
        <div
          className={`relative w-full h-2 rounded-full border transition-all duration-500 overflow-hidden ${
            isWireLit
              ? "bg-gradient-to-r from-cyan-500 via-indigo-500 to-cyan-500 border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
              : "bg-[#060D1A] border-white/10 border-dashed"
          }`}
        >
          {/* Animated Electrical Surge Particle when lit */}
          {isWireLit && (
            <motion.div
              initial={{ left: direction === "right" ? "0%" : "100%" }}
              animate={{ left: direction === "right" ? "100%" : "0%" }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 bottom-0 w-3 bg-white rounded-full shadow-[0_0_10px_#ffffff]"
            />
          )}
        </div>

        {/* Direction Arrow Head */}
        <div
          className={`absolute z-10 p-0.5 rounded-full border transition-all ${
            direction === "right" ? "right-0 translate-x-1" : "left-0 -translate-x-1"
          } ${
            isWireLit
              ? "bg-cyan-500 text-[#0F172A] border-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.9)]"
              : "bg-black/60 text-slate-600 border-white/10"
          }`}
        >
          {direction === "right" ? (
            <ArrowRight className="w-3 h-3 stroke-[3]" />
          ) : (
            <ArrowLeft className="w-3 h-3 stroke-[3]" />
          )}
        </div>
      </div>
    );
  };

  // Steps mapped to true snake order:
  // Row 1: [Step 1] ➔ [Step 2] ➔ [Step 3]
  const s1 = stepMap.get("idea");
  const s2 = stepMap.get("brainstorming");
  const s3 = stepMap.get("cahier-des-charges");

  // Row 2 (Right to Left): [Step 6] ◄── [Step 5] ◄── [Step 4]
  const s4 = stepMap.get("design-ui-ux");
  const s5 = stepMap.get("architecture");
  const s6 = stepMap.get("coding");

  // Row 3: [Step 7] ➔ [Step 8] ➔ [Step 9]
  const s7 = stepMap.get("testing");
  const s8 = stepMap.get("deployment");
  const s9 = stepMap.get("launch");

  const isTurn1Lit = s3 ? poweredStepIds.has(s3.id) : false;
  const isTurn2Lit = s6 ? poweredStepIds.has(s6.id) : false;

  return (
    <div className={`relative w-full flex flex-col gap-2 select-none ${className}`}>
      {/* ══════════════════════════════════════════════════════════
          ROW 1: LEFT ➔ RIGHT (1. IDEA ➔ 2. BRAINSTORM ➔ 3. CAHIER)
          ══════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr_40px_1fr] items-center gap-y-3">
        {s1 && renderCard(s1)}
        {s1 && renderHorizontalWire(s1.id, "right")}
        {s2 && renderCard(s2)}
        {s2 && renderHorizontalWire(s2.id, "right")}
        {s3 && renderCard(s3)}
      </div>

      {/* ── SNAKE TURN 1: VERTICAL CONNECTOR FROM STEP 3 (ROW 1, COL 5) DOWN TO STEP 4 (ROW 2, COL 5) ── */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr_40px_1fr] items-center">
        <div className="hidden md:block col-span-4" />
        <div className="hidden md:flex justify-center -my-1 relative z-20">
          <div className="flex flex-col items-center">
            <div
              className={`w-2.5 h-6 rounded-full border transition-all duration-500 relative overflow-hidden ${
                isTurn1Lit
                  ? "bg-gradient-to-b from-cyan-400 via-indigo-500 to-indigo-500 border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.8)]"
                  : "bg-[#060D1A] border-white/10 border-dashed"
              }`}
            >
              {isTurn1Lit && (
                <motion.div
                  initial={{ top: "0%" }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-2 bg-white rounded-full shadow-[0_0_8px_#ffffff]"
                />
              )}
            </div>
            <div
              className={`p-0.5 rounded-full border -mt-1 transition-all ${
                isTurn1Lit
                  ? "bg-indigo-500 text-white border-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.9)]"
                  : "bg-black/60 text-slate-600 border-white/10"
              }`}
            >
              <ArrowDown className="w-3 h-3 stroke-[3]" />
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          ROW 2: RIGHT ➔ LEFT (6. CODING ◄── 5. ARCHITECTURE ◄── 4. DESIGN)
          Col 1 = Step 6, Col 2 = Wire, Col 3 = Step 5, Col 4 = Wire, Col 5 = Step 4
          ══════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr_40px_1fr] items-center gap-y-3">
        {s6 && renderCard(s6)}
        {s5 && renderHorizontalWire(s5.id, "left")}
        {s5 && renderCard(s5)}
        {s4 && renderHorizontalWire(s4.id, "left")}
        {s4 && renderCard(s4)}
      </div>

      {/* ── SNAKE TURN 2: VERTICAL CONNECTOR FROM STEP 6 (ROW 2, COL 1) DOWN TO STEP 7 (ROW 3, COL 1) ── */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr_40px_1fr] items-center">
        <div className="hidden md:flex justify-center -my-1 relative z-20">
          <div className="flex flex-col items-center">
            <div
              className={`w-2.5 h-6 rounded-full border transition-all duration-500 relative overflow-hidden ${
                isTurn2Lit
                  ? "bg-gradient-to-b from-indigo-500 via-emerald-500 to-emerald-500 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.8)]"
                  : "bg-[#060D1A] border-white/10 border-dashed"
              }`}
            >
              {isTurn2Lit && (
                <motion.div
                  initial={{ top: "0%" }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-2 bg-white rounded-full shadow-[0_0_8px_#ffffff]"
                />
              )}
            </div>
            <div
              className={`p-0.5 rounded-full border -mt-1 transition-all ${
                isTurn2Lit
                  ? "bg-emerald-500 text-white border-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.9)]"
                  : "bg-black/60 text-slate-600 border-white/10"
              }`}
            >
              <ArrowDown className="w-3 h-3 stroke-[3]" />
            </div>
          </div>
        </div>
        <div className="hidden md:block col-span-4" />
      </div>

      {/* ══════════════════════════════════════════════════════════
          ROW 3: LEFT ➔ RIGHT (7. TESTING ➔ 8. DEPLOYMENT ➔ 9. LAUNCH 🚀)
          ══════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr_40px_1fr] items-center gap-y-3">
        {s7 && renderCard(s7)}
        {s7 && renderHorizontalWire(s7.id, "right")}
        {s8 && renderCard(s8)}
        {s8 && renderHorizontalWire(s8.id, "right")}
        {s9 && renderCard(s9)}
      </div>
    </div>
  );
}
