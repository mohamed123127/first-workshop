"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  teamworkGitContent,
  type TeamworkGitContent,
  type TeamPillar,
  type GitConceptStep,
} from "@/content/teamwork-git";
import { SlideHeader } from "@/components/common/SlideHeader";
import { SlideBackground } from "@/components/common/decorations/SlideBackground";
import {
  Users,
  GitBranch,
  GitCommit,
  GitPullRequest,
  UploadCloud,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  Terminal,
  Laptop,
  Target,
  Zap,
} from "lucide-react";

export interface TeamworkGitSlideProps {
  content?: TeamworkGitContent;
  onNextSlide?: () => void;
  onPrevSlide?: () => void;
  className?: string;
}

export type ActiveSection = "teamwork" | "git";

export function TeamworkGitSlide({
  content = teamworkGitContent,
  className = "",
}: TeamworkGitSlideProps) {
  const [activeSection, setActiveSection] = useState<ActiveSection>("teamwork");
  const [activeGitStep, setActiveGitStep] = useState<number>(1);
  const [selectedPillarId, setSelectedPillarId] = useState<string>("division");

  const activeStepConfig: GitConceptStep =
    content.gitSteps.find((s) => s.step === activeGitStep) ?? content.gitSteps[0];

  const getPillarIcon = (iconName: TeamPillar["icon"], accent: TeamPillar["accent"]) => {
    const iconColor =
      accent === "cyan"
        ? "text-cyan-400"
        : accent === "indigo"
        ? "text-indigo-400"
        : accent === "emerald"
        ? "text-emerald-400"
        : "text-amber-400";

    switch (iconName) {
      case "target":
        return <Target className={`w-5 h-5 ${iconColor}`} />;
      case "messageCircle":
        return <MessageCircle className={`w-5 h-5 ${iconColor}`} />;
      case "gitPullRequest":
        return <GitPullRequest className={`w-5 h-5 ${iconColor}`} />;
      case "checkCircle":
        return <CheckCircle2 className={`w-5 h-5 ${iconColor}`} />;
      default:
        return <Users className={`w-5 h-5 ${iconColor}`} />;
    }
  };

  return (
    <section
      aria-label={content.title}
      className={`relative min-h-screen w-full flex flex-col bg-[var(--bg-deep-navy)] overflow-hidden select-none ${className}`}
    >
      {/* Ambient Matrix Dotted Background */}
      <SlideBackground
        theme="cyan"
        slideTag="SLIDE_09 // TEAMWORK_AND_GIT"
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
            size: "w-[30rem] h-[20rem]",
            opacity: "opacity-10",
          },
        ]}
      />

      {/* Slide Header with Interactive Section Switcher */}
      <SlideHeader
        title={content.title}
        eyebrow={content.eyebrow}
        subtitle={content.subtitle}
        slideNumber={content.badge}
        accent="cyan"
        rightContent={
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md shadow-lg">
            <button
              type="button"
              onClick={() => setActiveSection("teamwork")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeSection === "teamwork"
                  ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.6)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>1. How to Work as a Team?</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection("git")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeSection === "git"
                  ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.6)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>2. Git &amp; GitHub</span>
            </button>
          </div>
        }
      />

      {/* Main Slide Workspace */}
      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-2.5 flex flex-col justify-between gap-3 min-h-0 overflow-y-auto">
        {/* ── TOP SECTION TITLE & CONTEXT STRIP ── */}
        <div className="w-full flex items-center justify-between p-2 sm:p-2.5 rounded-2xl bg-[#0B132B]/85 border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-slate-400 font-semibold uppercase">Current Focus:</span>
            <span className="text-white font-extrabold">
              {activeSection === "teamwork"
                ? "Engineering Collaboration, Roles & Peer Review"
                : "Version Control & GitHub Team Workflow"}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Click any module to inspect guidelines</span>
          </div>
        </div>

        {/* ── DYNAMIC SECTION BODY ── */}
        <div className="flex-1 min-h-0 flex flex-col justify-center py-1">
          <AnimatePresence mode="wait">
            {activeSection === "teamwork" ? (
              /* ══════════════════════════════════════════════════════════
                 SECTION 1: HOW TO WORK AS A TEAM? (4 PILLARS)
                 ══════════════════════════════════════════════════════════ */
              <motion.div
                key="section-teamwork"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5"
              >
                {content.pillars.map((pillar) => {
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
                    <article
                      key={pillar.id}
                      onClick={() => setSelectedPillarId(pillar.id)}
                      className={`relative rounded-2xl p-4 sm:p-4.5 bg-[#091124]/85 border-2 transition-all duration-300 flex flex-col justify-between gap-3 backdrop-blur-xl cursor-pointer ${
                        isSelected
                          ? "border-cyan-400/80 shadow-[0_0_30px_rgba(6,182,212,0.35)] -translate-y-1"
                          : `border-white/10 ${borderGlow} hover:-translate-y-0.5`
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

                      {/* Header: Number & Icon */}
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300">
                          PILLAR {pillar.number}
                        </span>
                        <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                          {getPillarIcon(pillar.icon, pillar.accent)}
                        </div>
                      </div>

                      {/* Title & Summary */}
                      <div className="space-y-1.5 flex-1 min-h-0">
                        <h4 className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-snug">
                          {pillar.title}
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">
                          {pillar.summary}
                        </p>
                      </div>

                      {/* Pro-Tip & Deliverable */}
                      <div className="space-y-2 pt-2 border-t border-white/5 text-[11px] font-mono">
                        <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                          <span className="text-cyan-400 font-bold block text-[10px] uppercase">
                            💡 Pro Tip:
                          </span>
                          <span className="text-slate-300 text-[11px] leading-snug">
                            {pillar.proTip}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span>Artifact:</span>
                          <span className="text-white font-semibold truncate">
                            {pillar.deliverable}
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </motion.div>
            ) : (
              /* ══════════════════════════════════════════════════════════
                 SECTION 2: WHAT IS GIT & GITHUB? (WORKFLOW PIPELINE)
                 ══════════════════════════════════════════════════════════ */
              <motion.div
                key="section-git"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-5xl mx-auto flex flex-col gap-3.5"
              >
                {/* 1. Comparison Header: Git (Local) vs GitHub (Cloud) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                  {/* Git Box */}
                  <div className="p-3.5 rounded-2xl bg-[#0A1329]/90 border border-cyan-400/30 flex items-start gap-3 backdrop-blur-md shadow-md">
                    <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400 shrink-0">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-300 uppercase">
                        <span>Git = Local Time Machine</span>
                        <span className="text-[10px] bg-cyan-500/20 px-1.5 py-0.2 rounded">CLI</span>
                      </div>
                      <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                        Free software installed on your laptop. Tracks your code history, snapshots changes, and lets you travel back in time to fix bugs.
                      </p>
                    </div>
                  </div>

                  {/* GitHub Box */}
                  <div className="p-3.5 rounded-2xl bg-[#0D1533]/90 border border-indigo-400/30 flex items-start gap-3 backdrop-blur-md shadow-md">
                    <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-400 shrink-0">
                      <GitPullRequest className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-300 uppercase">
                        <span>GitHub = Cloud Collaboration Hub</span>
                        <span className="text-[10px] bg-indigo-500/20 px-1.5 py-0.2 rounded">WEB</span>
                      </div>
                      <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                        Cloud platform where teams host repositories online. Enables code reviews, Pull Requests, issue tracking, and team merges.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Interactive Git Concepts Runway */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 w-full">
                  {content.gitSteps.map((item) => {
                    const isActive = activeGitStep === item.step;
                    const getConceptIcon = () => {
                      if (item.step === 1) return <GitBranch className="w-3.5 h-3.5" />;
                      if (item.step === 2) return <GitCommit className="w-3.5 h-3.5" />;
                      if (item.step === 3) return <UploadCloud className="w-3.5 h-3.5" />;
                      return <GitPullRequest className="w-3.5 h-3.5" />;
                    };

                    return (
                      <div
                        key={item.step}
                        onClick={() => setActiveGitStep(item.step)}
                        className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-2.5 backdrop-blur-md ${
                          isActive
                            ? "bg-[#0B1530] border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.4)] scale-102"
                            : "bg-black/35 border-white/10 hover:border-white/25 hover:bg-white/5 opacity-75 hover:opacity-100"
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span
                            className={`font-semibold px-2 py-0.5 rounded-md flex items-center gap-1.5 ${
                              isActive
                                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
                                : "bg-white/5 text-slate-300"
                            }`}
                          >
                            {getConceptIcon()}
                            <span>{item.label}</span>
                          </span>
                          <span className="text-[10px] text-slate-400">{item.whoRunsIt}</span>
                        </div>

                        <div className="p-1.5 rounded-lg bg-black/60 border border-white/5 text-[10px] font-mono text-cyan-300 truncate">
                          <code>{item.cmd}</code>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 3. Active Concept Deep Dive Card */}
                <div className="p-4 rounded-2xl bg-black/60 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl w-full">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      <h4 className="text-base font-extrabold text-white">
                        {activeStepConfig.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                      {activeStepConfig.desc}
                    </p>
                    <div className="flex items-center gap-2 pt-1 text-xs font-mono text-amber-300">
                      <span>💡 Analogy:</span>
                      <span className="text-slate-300">{activeStepConfig.analogy}</span>
                    </div>
                  </div>

                  {/* Terminal Command Highlight Box */}
                  <div className="w-full sm:w-auto p-3 rounded-xl bg-[#090D1A] border border-white/10 font-mono text-xs text-slate-300 shrink-0 min-w-[280px]">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1 mb-1 border-b border-white/5">
                      <span className="flex items-center gap-1 text-cyan-400">
                        <Terminal className="w-3 h-3" />
                        <span>Terminal Execution</span>
                      </span>
                      <span>bash</span>
                    </div>
                    <div className="text-emerald-400 font-bold">$ {activeStepConfig.cmd}</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── BOTTOM SUMMARY TAKEAWAY FOOTER ── */}
        <div className="p-3 rounded-2xl bg-gradient-to-r from-[#0F172A]/90 via-[#1E293B]/90 to-[#0F172A]/90 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-slate-300 shrink-0 shadow-lg">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong className="text-white">Teamwork Takeaway:</strong> Code is only half the job. Communication, clear branches, and code reviews make software succeed.
            </span>
          </div>

          <span className="text-[11px] text-slate-400 shrink-0">
            Slide 09 • Professional Engineering Skills
          </span>
        </div>
      </div>
    </section>
  );
}
