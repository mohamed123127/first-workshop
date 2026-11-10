"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  webBehindScenesContent,
  type WebBehindScenesContent,
} from "@/content/web-behind-scenes";
import { SlideHeader } from "@/components/common/SlideHeader";
import { SlideBackground } from "@/components/common/decorations/SlideBackground";
import { BackendChassis } from "./BackendChassis";
import { ExecutionDiagram } from "./ExecutionDiagram";
import { CodeEditorWindow } from "./CodeEditorWindow";

export interface WebBehindScenesSlideProps {
  content?: WebBehindScenesContent;
  onNextSlide?: () => void;
  onPrevSlide?: () => void;
  className?: string;
}

export function WebBehindScenesSlide({
  content = webBehindScenesContent,
  className = "",
}: WebBehindScenesSlideProps) {
  const [isExplainActive, setIsExplainActive] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [maxRevealedStep, setMaxRevealedStep] = useState<number>(1);

  const handleToggleExplain = () => {
    setIsExplainActive((prev) => {
      const next = !prev;
      if (next) {
        // Reset or initialize on first explain click
        setActiveStep(1);
        setMaxRevealedStep(1);
      }
      return next;
    });
  };

  const handleNextStep = () => {
    setActiveStep((prev) => {
      const next = Math.min(prev + 1, content.diagramUnits.length);
      setMaxRevealedStep((m) => Math.max(m, next));
      return next;
    });
  };

  const handlePrevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSelectStep = (stepId: number) => {
    setActiveStep(stepId);
    setMaxRevealedStep((m) => Math.max(m, stepId));
  };

  return (
    <section
      aria-label={content.title}
      className={`relative min-h-screen w-full flex flex-col bg-[var(--bg-deep-navy)] overflow-hidden select-none ${className}`}
    >
      {/* Ambient Dotted Matrix Background */}
      <SlideBackground
        theme="indigo"
        slideTag="SLIDE_05 // BACKEND_RUNTIME"
        glowOrbs={[
          {
            color: "indigo",
            position: "top-left",
            size: "w-[38rem] h-[38rem]",
            opacity: "opacity-20",
          },
          {
            color: "cyan",
            position: "bottom-right",
            size: "w-[40rem] h-[40rem]",
            opacity: "opacity-15",
          },
          {
            color: "amber",
            position: "center",
            size: "w-[32rem] h-[24rem]",
            opacity: "opacity-5",
          },
        ]}
      />

      {/* Slide Header */}
      <SlideHeader
        title={content.title}
        eyebrow={content.eyebrow}
        slideNumber={content.badge}
        accent="indigo"
      />

      {/* Main Slide Workspace Area */}
      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-2 md:py-3 flex flex-col justify-center gap-3 min-h-0">
        {/* ══════════════════════════════════════════════════════════
            TOP DIAGRAM: OUTSIDE THE FRAME, DIRECTLY ON TOP OF THE HEADER BAR
            ══════════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {isExplainActive && (
            <motion.div
              initial={{ opacity: 0, y: -16, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -16, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="shrink-0 w-full"
            >
              <ExecutionDiagram
                units={content.diagramUnits}
                activeStep={activeStep}
                maxRevealedStep={maxRevealedStep}
                onNextStep={handleNextStep}
                onPrevStep={handlePrevStep}
                onSelectStep={handleSelectStep}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════════════════════════════════════════════════════════
            BACKEND CHASSIS (With [EXPLAIN] Header Bar on top & Code Window inside)
            ══════════════════════════════════════════════════════════ */}
        <BackendChassis
          backend={content.backend}
          isExplainActive={isExplainActive}
          onToggleExplain={handleToggleExplain}
          className={
            isExplainActive
              ? "flex-1 min-h-0 h-[440px] sm:h-[480px]"
              : "flex-1 min-h-0 h-[580px] sm:h-[630px]"
          }
        >
          {/* CODE WINDOW (Inner rectangle with title "Login Feature") */}
          <div className="flex-1 min-h-0 flex flex-col h-full">
            <CodeEditorWindow
              code={content.code}
              activeUnitId={activeStep}
              isExplainActive={isExplainActive}
              className="flex-1 min-h-0 h-full"
            />
          </div>
        </BackendChassis>
      </div>
    </section>
  );
}
