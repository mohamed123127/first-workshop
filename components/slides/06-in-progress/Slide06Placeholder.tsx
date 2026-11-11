"use client";

import React from "react";
import { SlideHeader } from "@/components/common/SlideHeader";
import { SlideBackground } from "@/components/common/decorations/SlideBackground";
import { ArrowRight, ArrowLeft, Wrench, Sparkles, Code2, Users } from "lucide-react";

export interface Slide06PlaceholderProps {
  onPrevSlide?: () => void;
  onNextSlide?: () => void;
  className?: string;
}

export function Slide06Placeholder({
  onPrevSlide,
  onNextSlide,
  className = "",
}: Slide06PlaceholderProps) {
  return (
    <section
      aria-label="Slide 06: In Progress"
      className={`relative min-h-screen w-full flex flex-col bg-[var(--bg-deep-navy)] overflow-hidden select-none ${className}`}
    >
      {/* Sleek Dotted Ambient Background with Amber & Cyan Orbs */}
      <SlideBackground
        theme="amber"
        slideTag="SLIDE_06 // RESERVED_WORKSPACE"
        glowOrbs={[
          {
            color: "amber",
            position: "top-left",
            size: "w-[36rem] h-[36rem]",
            opacity: "opacity-15",
          },
          {
            color: "cyan",
            position: "bottom-right",
            size: "w-[38rem] h-[38rem]",
            opacity: "opacity-15",
          },
        ]}
      />

      {/* Top Slide Header */}
      <SlideHeader
        title="Module In Development"
        eyebrow="Workshop Section · Co-Instructor Track"
        subtitle="This slide slot is reserved for your partner while they finish authoring their content."
        slideNumber="Slide 06"
        accent="amber"
        rightContent={
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-xs font-mono text-amber-300">
            <Wrench className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "6s" }} />
            <span>Workspace Active</span>
          </div>
        }
      />

      {/* Main Content: Sleek Glass Card */}
      <div className="relative z-10 flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-6 flex flex-col justify-center items-center">
        <div className="w-full max-w-xl rounded-2xl p-6 sm:p-8 backdrop-blur-xl bg-[#0B132B]/85 border border-amber-400/30 shadow-[0_0_40px_rgba(245,158,11,0.2)] flex flex-col items-center text-center gap-5">
          {/* Animated Emblem */}
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-amber-500/10 border border-amber-400/40 flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.3)]">
              <Users className="w-9 h-9 text-amber-400" />
            </div>
            <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-cyan-500 text-black shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Heading & Details */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-[11px] font-mono font-bold text-amber-300 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>Slide 06 · Reserved Space</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Partner Workspace Ready
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed max-w-md mx-auto">
              Your colleague is currently working on this module. You can seamlessly skip ahead to explore <strong className="text-white">Slide 07 (Behind the Scenes)</strong> or return here when the new slide is placed.
            </p>
          </div>

          {/* Micro Telemetry Bar */}
          <div className="w-full p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-300">
              <Code2 className="w-3.5 h-3.5" />
              <span>components/slides/06-...</span>
            </span>
            <span className="text-amber-400">PENDING_INTEGRATION</span>
          </div>

          {/* Navigation Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 w-full">
            {onPrevSlide && (
              <button
                type="button"
                onClick={onPrevSlide}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Prev (Slide 05)</span>
              </button>
            )}

            {onNextSlide && (
              <button
                type="button"
                onClick={onNextSlide}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-mono font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer flex items-center gap-2 hover:scale-[1.02]"
              >
                <span>Continue to Slide 07: Behind the Scenes</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

