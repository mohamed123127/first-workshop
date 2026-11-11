"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  projectLifecycleContent,
  type ProjectLifecycleContent,
  type LifecycleStep,
} from "@/content/project-lifecycle";
import { SlideHeader } from "@/components/common/SlideHeader";
import { SlideBackground } from "@/components/common/decorations/SlideBackground";
import { SnakeFlowRoadmap } from "./SnakeFlowRoadmap";
import { DesignSystemPreview } from "./DesignSystemPreview";
import { LifecycleStepModal } from "./LifecycleStepModal";
import {
  Palette,
  ChevronDown,
  ChevronUp,
  Info,
  Zap,
  Power,
  Play,
  RotateCcw,
} from "lucide-react";

export interface ProjectLifecycleSlideProps {
  content?: ProjectLifecycleContent;
  onNextSlide?: () => void;
  onPrevSlide?: () => void;
  className?: string;
}

export function ProjectLifecycleSlide({
  content = projectLifecycleContent,
  className = "",
}: ProjectLifecycleSlideProps) {
  // Powered cards state: by default, all cards start OFF (unlit)
  const [poweredStepIds, setPoweredStepIds] = useState<Set<string>>(new Set());
  const [selectedStep, setSelectedStep] = useState<LifecycleStep | null>(null);
  const [showDesignShelf, setShowDesignShelf] = useState<boolean>(false);
  const [isSequencePlaying, setIsSequencePlaying] = useState<boolean>(false);
  const sequenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear running sequence timer on unmount
  useEffect(() => {
    return () => {
      if (sequenceTimerRef.current) {
        clearInterval(sequenceTimerRef.current);
      }
    };
  }, []);

  // Toggle card light ON/OFF
  const handleTogglePower = (stepId: string) => {
    setPoweredStepIds((prev) => {
      const next = new Set(prev);
      if (next.has(stepId)) {
        next.delete(stepId);
      } else {
        next.add(stepId);
      }
      return next;
    });
  };

  // Inspect card details & picture mockup (also turns light ON if it was OFF)
  const handleInspectStep = (step: LifecycleStep) => {
    setPoweredStepIds((prev) => {
      const next = new Set(prev);
      next.add(step.id);
      return next;
    });
    setSelectedStep(step);
  };

  // Master Power Actions
  const handlePowerAllOn = () => {
    if (sequenceTimerRef.current) clearInterval(sequenceTimerRef.current);
    setIsSequencePlaying(false);
    setPoweredStepIds(new Set(content.steps.map((s) => s.id)));
  };

  const handleTurnAllOff = () => {
    if (sequenceTimerRef.current) clearInterval(sequenceTimerRef.current);
    setIsSequencePlaying(false);
    setPoweredStepIds(new Set());
  };

  // Runway Sequence Flow: progressive step-by-step illumination
  const handlePlayRunwaySequence = () => {
    if (sequenceTimerRef.current) clearInterval(sequenceTimerRef.current);
    setIsSequencePlaying(true);
    setPoweredStepIds(new Set());

    let currentIndex = 0;
    sequenceTimerRef.current = setInterval(() => {
      if (currentIndex < content.steps.length) {
        const stepId = content.steps[currentIndex].id;
        setPoweredStepIds((prev) => new Set(prev).add(stepId));
        currentIndex++;
      } else {
        if (sequenceTimerRef.current) clearInterval(sequenceTimerRef.current);
        setIsSequencePlaying(false);
      }
    }, 450);
  };

  // Modal Next/Prev navigation
  const handleNextModalStep = () => {
    if (!selectedStep) return;
    const currentIndex = content.steps.findIndex((s) => s.id === selectedStep.id);
    if (currentIndex < content.steps.length - 1) {
      const nextStep = content.steps[currentIndex + 1];
      setPoweredStepIds((prev) => new Set(prev).add(nextStep.id));
      setSelectedStep(nextStep);
    }
  };

  const handlePrevModalStep = () => {
    if (!selectedStep) return;
    const currentIndex = content.steps.findIndex((s) => s.id === selectedStep.id);
    if (currentIndex > 0) {
      const prevStep = content.steps[currentIndex - 1];
      setPoweredStepIds((prev) => new Set(prev).add(prevStep.id));
      setSelectedStep(prevStep);
    }
  };

  const currentModalIndex = selectedStep
    ? content.steps.findIndex((s) => s.id === selectedStep.id)
    : -1;
  const hasPrev = currentModalIndex > 0;
  const hasNext = currentModalIndex < content.steps.length - 1;

  const totalPowered = poweredStepIds.size;
  const totalSteps = content.steps.length;

  return (
    <section
      aria-label={content.title}
      className={`relative min-h-screen w-full flex flex-col bg-[var(--bg-deep-navy)] overflow-hidden select-none ${className}`}
    >
      {/* Ambient Dotted Matrix Background */}
      <SlideBackground
        theme="indigo"
        slideTag="SLIDE_08 // PROJECT_LIFECYCLE"
        glowOrbs={[
          {
            color: "cyan",
            position: "top-left",
            size: "w-[36rem] h-[36rem]",
            opacity: "opacity-15",
          },
          {
            color: "indigo",
            position: "bottom-right",
            size: "w-[40rem] h-[40rem]",
            opacity: "opacity-20",
          },
          {
            color: "amber",
            position: "center",
            size: "w-[32rem] h-[22rem]",
            opacity: "opacity-10",
          },
        ]}
      />

      {/* Top Slide Header */}
      <SlideHeader
        title={content.title}
        eyebrow={content.eyebrow}
        subtitle={content.subtitle}
        slideNumber={content.badge}
        accent="cyan"
        rightContent={
          <div className="flex items-center gap-2">
            {/* Interactive Power Stats Badge */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
              <Zap
                className={`w-3.5 h-3.5 transition-colors ${
                  totalPowered > 0 ? "text-cyan-400 fill-cyan-400" : "text-slate-500"
                }`}
              />
              <span>
                <strong className={totalPowered > 0 ? "text-cyan-300" : "text-slate-400"}>
                  {totalPowered}/{totalSteps}
                </strong>{" "}
                Modules Powered
              </span>
            </div>
          </div>
        }
      />

      {/* Main Slide Content Area */}
      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-2.5 flex flex-col justify-between gap-3 min-h-0 overflow-y-auto">
        {/* ── INTERACTIVE POWER CONTROLS TOOLBAR ── */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-2xl bg-[#0B132B]/85 border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <span
              className={`w-2 h-2 rounded-full ${
                totalPowered > 0 ? "bg-cyan-400 animate-pulse" : "bg-slate-600"
              }`}
            />
            <span className="hidden sm:inline text-slate-400">Circuit State:</span>
            <span className="font-bold text-white">
              {totalPowered === 0
                ? "Dormant (Cards OFF — Click card to light up)"
                : totalPowered === totalSteps
                ? "Full Circuit Energized ⚡"
                : `${totalPowered} Active Conduit(s)`}
            </span>
          </div>

          {/* Master Control Buttons */}
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <button
              type="button"
              onClick={handlePlayRunwaySequence}
              disabled={isSequencePlaying}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border transition-all cursor-pointer font-bold ${
                isSequencePlaying
                  ? "bg-cyan-500/30 text-cyan-200 border-cyan-400 animate-pulse"
                  : "bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border-cyan-500/30 hover:border-cyan-400/50"
              }`}
              title="Automatically energizes step by step"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{isSequencePlaying ? "Energizing..." : "Runway Flow"}</span>
            </button>

            <button
              type="button"
              onClick={handlePowerAllOn}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/30 hover:border-indigo-400/50 text-indigo-300 font-bold transition-all cursor-pointer"
              title="Turn all lights ON"
            >
              <Power className="w-3 h-3" />
              <span className="hidden md:inline">Power</span> All ON
            </button>

            <button
              type="button"
              onClick={handleTurnAllOff}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-400 hover:text-white transition-all cursor-pointer"
              title="Reset all cards to unlit OFF state"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden md:inline">Turn</span> All OFF
            </button>
          </div>
        </div>

        {/* ── SNAKE FLOW ROADMAP (S-Curve connecting all 9 steps with glowing wires) ── */}
        <div className="w-full flex-1 flex flex-col justify-center min-h-0">
          <SnakeFlowRoadmap
            steps={content.steps}
            selectedStepId={selectedStep?.id ?? null}
            poweredStepIds={poweredStepIds}
            onTogglePower={handleTogglePower}
            onInspectStep={handleInspectStep}
          />
        </div>

        {/* ── EXPANDABLE DESIGN SYSTEM SHELF (Colors, Fonts, Sketches, Pages, Buttons, Cards) ── */}
        <div className="w-full shrink-0">
          <div className="flex items-center justify-between p-2 rounded-2xl bg-[#0F172A]/80 border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-white font-bold">
                Step 4 Deliverables: UI/UX Design System Kit
              </span>
              <span className="hidden sm:inline-block text-slate-400">
                (Palette, Fonts, Wireframes, Pages &amp; UI Components)
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowDesignShelf((prev) => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold transition-all cursor-pointer shadow-sm"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>{showDesignShelf ? "Hide Design Kit" : "Show Design Kit"}</span>
              {showDesignShelf ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Collapsible Design System Drawer */}
          <AnimatePresence>
            {showDesignShelf && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="pt-2 overflow-hidden"
              >
                <DesignSystemPreview />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── BOTTOM ROADMAP TAKEAWAY FOOTER ── */}
        <div className="p-2.5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-slate-300 shrink-0">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong className="text-white">Tip:</strong> Click any step card to turn its light ON and energize its output conduit.
            </span>
          </div>

          <span className="text-[11px] text-slate-400 shrink-0">
            Slide 08 • Complete Software Lifecycle
          </span>
        </div>
      </div>

      {/* ── STEP POPUP MODAL (Description + Picture Example) ── */}
      <LifecycleStepModal
        step={selectedStep}
        isOpen={Boolean(selectedStep)}
        onClose={() => setSelectedStep(null)}
        onPrev={handlePrevModalStep}
        onNext={handleNextModalStep}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />
    </section>
  );
}
