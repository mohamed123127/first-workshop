"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type DiagramUnit } from "@/content/web-behind-scenes";
import {
  ArrowRight,
  ArrowLeft,
  Database,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  Inbox,
  ShieldCheck,
  Send,
  Sparkles,
} from "lucide-react";

export interface ExecutionDiagramProps {
  units: DiagramUnit[];
  activeStep: number;
  maxRevealedStep: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  onSelectStep: (stepId: number) => void;
  onDatabaseClick?: () => void;
  className?: string;
}

export function ExecutionDiagram({
  units,
  activeStep,
  maxRevealedStep,
  onNextStep,
  onPrevStep,
  onSelectStep,
  onDatabaseClick,
  className = "",
}: ExecutionDiagramProps) {
  // Icon mapper per unit
  const getUnitIcon = (id: number) => {
    switch (id) {
      case 1:
        return <Inbox className="w-3.5 h-3.5 text-cyan-400" />;
      case 2:
        return <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />;
      case 3:
        return <Database className="w-3.5 h-3.5 text-indigo-400" />;
      case 4:
        return <Send className="w-3.5 h-3.5 text-emerald-400" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  const getUnitColorClasses = (id: number, isSelected: boolean) => {
    if (isSelected) {
      switch (id) {
        case 1:
          return "border-cyan-400 bg-cyan-950/40 shadow-[0_0_20px_rgba(6,182,212,0.45)] ring-2 ring-cyan-400/60";
        case 2:
          return "border-amber-400 bg-amber-950/40 shadow-[0_0_20px_rgba(245,158,11,0.45)] ring-2 ring-amber-400/60";
        case 3:
          return "border-indigo-400 bg-indigo-950/40 shadow-[0_0_20px_rgba(99,102,241,0.45)] ring-2 ring-indigo-400/60";
        case 4:
          return "border-emerald-400 bg-emerald-950/40 shadow-[0_0_20px_rgba(16,185,129,0.45)] ring-2 ring-emerald-400/60";
        default:
          return "border-cyan-400 bg-cyan-950/40";
      }
    }
    return "border-white/10 bg-black/40 hover:border-white/30 text-slate-300";
  };

  return (
    <div
      className={`relative w-full rounded-2xl p-3 sm:p-4 bg-[#070D1B]/95 border border-indigo-500/25 shadow-xl flex flex-col gap-2 ${className}`}
    >
      {/* ── DIAGRAM TOP CONTROLS & HEADER ── */}
      <div className="flex items-center justify-between pb-2 border-b border-white/5 select-none">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-cyan-300">
            Backend Execution Flow Diagram
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono text-slate-500">
            • Step {activeStep} of {units.length}
          </span>
        </div>

        {/* Stepper Navigation Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onPrevStep}
            disabled={activeStep <= 1}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-mono cursor-pointer"
            title="Previous diagram unit"
          >
            <ArrowLeft className="w-3 h-3" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          <button
            type="button"
            onClick={onNextStep}
            disabled={activeStep >= units.length}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] disabled:opacity-40 disabled:cursor-not-allowed transition-all text-xs font-mono font-bold cursor-pointer"
            title="Add arrow and reveal next diagram unit"
          >
            <span>Next Unit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── HORIZONTAL FLOW DIAGRAM UNITS ── */}
      <div className="relative w-full flex items-center justify-between gap-1 sm:gap-2 pt-9 pb-2 overflow-x-auto min-h-[115px]">
        {units.map((unit, idx) => {
          const isRevealed = unit.id <= maxRevealedStep;
          const isSelected = unit.id === activeStep;

          return (
            <React.Fragment key={unit.id}>
              {/* DIAGRAM UNIT CARD */}
              <div className="relative flex flex-col items-center shrink-0">
                {/* ── IF "CHECK INTO DB" UNIT: Show DB pulse indicator above ── */}
                {unit.hasDatabaseTop && isSelected && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
                  >
                    <div className="flex items-center gap-1 text-[9px] font-mono text-indigo-300">
                      <ArrowUp className="w-2.5 h-2.5 text-indigo-400 animate-bounce" />
                      <span className="font-bold">DB</span>
                    </div>
                  </motion.div>
                )}

                {/* THE UNIT RECTANGLE */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: isRevealed ? 1 : 0.35,
                    scale: isRevealed ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.3 }}
                  onClick={() => onSelectStep(unit.id)}
                  className={`w-40 sm:w-48 p-2.5 rounded-xl border transition-all cursor-pointer select-none flex flex-col justify-between ${getUnitColorClasses(
                    unit.id,
                    isSelected
                  )}`}
                >
                  <div className="flex items-center justify-between gap-1.5 mb-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      {getUnitIcon(unit.id)}
                      <span className="text-[11px] sm:text-xs font-bold text-white truncate">
                        {unit.title}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-slate-300 shrink-0">
                      0{unit.id}
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-400 font-mono truncate leading-tight">
                    {unit.subtitle}
                  </p>
                </motion.div>
              </div>

              {/* ── ARROW CONNECTING TO NEXT UNIT ── */}
              {idx < units.length - 1 && (
                <div className="flex items-center justify-center px-0.5 sm:px-1 shrink-0">
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{
                      opacity: idx + 1 < maxRevealedStep ? 1 : 0.25,
                      scaleX: idx + 1 < maxRevealedStep ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center text-cyan-400"
                  >
                    <div className="w-3 sm:w-5 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-400" />
                    <ArrowRight className="w-3 h-3 -ml-1 text-cyan-400" />
                  </motion.div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

