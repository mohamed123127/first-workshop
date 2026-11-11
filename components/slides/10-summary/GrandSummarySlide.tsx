"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  grandSummaryContent,
  type GrandSummaryContent,
  type SummaryPillar,
} from "@/content/summary";
import { SlideHeader } from "@/components/common/SlideHeader";
import { SlideBackground } from "@/components/common/decorations/SlideBackground";
import {
  Globe,
  Server,
  Rocket,
  GitBranch,
  Sparkles,
  CheckCircle2,
  Quote,
  Code2,
  Hammer,
  GraduationCap,
  Award,
  RotateCcw,
} from "lucide-react";

export interface GrandSummarySlideProps {
  content?: GrandSummaryContent;
  onNextSlide?: () => void;
  onPrevSlide?: () => void;
  className?: string;
}

export function GrandSummarySlide({
  content = grandSummaryContent,
  onNextSlide,
  className = "",
}: GrandSummarySlideProps) {
  const [selectedPillarId, setSelectedPillarId] = useState<string>("web-foundations");

  const getPillarIcon = (icon: SummaryPillar["icon"], accent: SummaryPillar["accent"]) => {
    const iconClass =
      accent === "cyan"
        ? "text-cyan-400"
        : accent === "indigo"
        ? "text-indigo-400"
        : accent === "emerald"
        ? "text-emerald-400"
        : "text-amber-400";

    switch (icon) {
      case "globe":
        return <Globe className={`w-5 h-5 ${iconClass}`} />;
      case "server":
        return <Server className={`w-5 h-5 ${iconClass}`} />;
      case "rocket":
        return <Rocket className={`w-5 h-5 ${iconClass}`} />;
      case "git":
        return <GitBranch className={`w-5 h-5 ${iconClass}`} />;
      default:
        return <Sparkles className={`w-5 h-5 ${iconClass}`} />;
    }
  };

  const getNextStepIcon = (iconName: string) => {
    switch (iconName) {
      case "Hammer":
        return <Hammer className="w-3.5 h-3.5 text-cyan-400" />;
      case "GitBranch":
        return <GitBranch className="w-3.5 h-3.5 text-indigo-400" />;
      case "Code2":
        return <Code2 className="w-3.5 h-3.5 text-emerald-400" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  return (
    <section
      aria-label={content.title}
      className={`relative min-h-screen w-full flex flex-col bg-[var(--bg-deep-navy)] overflow-hidden select-none ${className}`}
    >
      {/* Ambient Dotted Matrix Background with Multi-Accent Glows */}
      <SlideBackground
        theme="indigo"
        slideTag="SLIDE_10 // GRAND_FINALE"
        glowOrbs={[
          {
            color: "cyan",
            position: "top-left",
            size: "w-[38rem] h-[38rem]",
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

      {/* Top Slide Header with Graduation Badge */}
      <SlideHeader
        title={content.title}
        eyebrow={content.eyebrow}
        subtitle={content.subtitle}
        slideNumber={content.badge}
        accent="cyan"
        rightContent={
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-xs font-mono text-emerald-300 font-bold shadow-[0_0_20px_rgba(16,185,129,0.25)]">
            <GraduationCap className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Workshop Completed · 10/10</span>
          </div>
        }
      />

      {/* Main Slide Content Area */}
      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-2.5 flex flex-col justify-between gap-3 min-h-0 overflow-y-auto">
        {/* ── TOP MILESTONES BANNER ── */}
        <div className="w-full flex items-center justify-between p-2 rounded-2xl bg-[#0B132B]/85 border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400 font-semibold uppercase">The Complete Web Journey:</span>
            <span className="text-white font-extrabold">
              Idea ➔ Design ➔ Architecture ➔ Full-Stack Code ➔ Cloud Launch
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-cyan-300">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Ready for Production</span>
          </div>
        </div>

        {/* ── 4 CORE SUMMARY PILLARS (BENTO GRID) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 flex-1 min-h-0 items-stretch py-1">
          {content.corePillars.map((pillar) => {
            const isSelected = selectedPillarId === pillar.id;
            const borderGlow =
              pillar.accent === "cyan"
                ? "hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)]"
                : pillar.accent === "indigo"
                ? "hover:border-indigo-400/50 hover:shadow-[0_0_25px_rgba(99,102,241,0.3)]"
                : pillar.accent === "emerald"
                ? "hover:border-emerald-400/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]"
                : "hover:border-amber-400/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.3)]";

            return (
              <motion.article
                key={pillar.id}
                onClick={() => setSelectedPillarId(pillar.id)}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className={`relative rounded-2xl p-4 bg-[#091124]/85 border-2 transition-all duration-300 flex flex-col justify-between gap-2.5 backdrop-blur-xl cursor-pointer ${
                  isSelected
                    ? "border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.35)] scale-101"
                    : `border-white/10 ${borderGlow}`
                }`}
              >
                {/* Top Accent Line */}
                <div
                  className={`absolute top-0 inset-x-6 h-0.5 bg-gradient-to-r from-transparent ${
                    pillar.accent === "cyan"
                      ? "via-cyan-400"
                      : pillar.accent === "indigo"
                      ? "via-indigo-400"
                      : pillar.accent === "emerald"
                      ? "via-emerald-400"
                      : "via-amber-400"
                  } to-transparent`}
                />

                {/* Pillar Header */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-cyan-300">
                      {pillar.stepRange}
                    </span>
                    <div className="p-1.5 rounded-xl bg-white/5 border border-white/10">
                      {getPillarIcon(pillar.icon, pillar.accent)}
                    </div>
                  </div>

                  <h4 className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-snug">
                    {pillar.title}
                  </h4>
                  <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                    {pillar.tagline}
                  </p>
                </div>

                {/* Key Takeaways List */}
                <ul className="space-y-1.5 flex-1 min-h-0 pt-1">
                  {pillar.keyTakeaways.map((point, pIdx) => (
                    <li
                      key={pIdx}
                      className="flex items-start gap-1.5 text-xs text-slate-300 leading-relaxed font-sans"
                    >
                      <CheckCircle2
                        className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                          pillar.accent === "cyan"
                            ? "text-cyan-400"
                            : pillar.accent === "indigo"
                            ? "text-indigo-400"
                            : pillar.accent === "emerald"
                            ? "text-emerald-400"
                            : "text-amber-400"
                        }`}
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Engineering Formula Bar */}
                <div className="p-2 rounded-xl bg-black/50 border border-white/5 text-[10px] font-mono text-slate-300">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">
                    Formula:
                  </span>
                  <code className="text-cyan-300 leading-tight block truncate">
                    {pillar.formula}
                  </code>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* ── BOTTOM ROW: INSPIRATIONAL QUOTE & WHERE TO GO NEXT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-3 shrink-0">
          {/* Left: Mindset Quote */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#0F172A]/90 via-[#1E293B]/80 to-[#0F172A]/90 border border-cyan-500/20 backdrop-blur-xl flex items-start gap-3 shadow-md">
            <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400 shrink-0 mt-0.5">
              <Quote className="w-5 h-5" />
            </div>
            <div className="space-y-1 min-w-0">
              <p className="text-xs sm:text-sm text-slate-200 font-sans italic leading-relaxed">
                &ldquo;{content.keyMindsetQuote.quote}&rdquo;
              </p>
              <div className="flex items-center gap-2 text-[11px] font-mono">
                <span className="text-white font-bold">{content.keyMindsetQuote.author}</span>
                <span className="text-slate-500">•</span>
                <span className="text-cyan-400">{content.keyMindsetQuote.role}</span>
              </div>
            </div>
          </div>

          {/* Right: Where to Go Next Action Cards */}
          <div className="p-3 rounded-2xl bg-[#091124]/90 border border-white/10 backdrop-blur-xl flex flex-col justify-between gap-1.5 shadow-md">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-white px-1">
              <span className="flex items-center gap-1.5">
                <Rocket className="w-3.5 h-3.5 text-emerald-400" />
                <span>Your Next Steps</span>
              </span>
              <span className="text-[10px] text-slate-400">Apply Your Skills</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {content.nextSteps.map((step, sIdx) => (
                <div
                  key={sIdx}
                  className="p-2 rounded-xl bg-black/40 border border-white/5 hover:border-cyan-400/30 transition-all flex flex-col justify-between gap-1"
                >
                  <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-white truncate">
                    {getNextStepIcon(step.icon)}
                    <span className="truncate">{step.title}</span>
                  </div>
                  <p className="text-[9px] text-slate-400 font-sans line-clamp-2 leading-tight">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FOOTER: PRESENTATION CONCLUSION & REPLAY BAR ── */}
        <div className="p-2.5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-slate-300 shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong className="text-white">Thank You for Attending!</strong> Questions, feedback &amp; open discussion.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">DevUp Workshop 2026</span>
            {onNextSlide && (
              <button
                type="button"
                onClick={onNextSlide}
                className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30 text-[10px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1"
              >
                <span>Replay from Slide 1</span>
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
