"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  internetArchitectureContent,
  type InternetArchitectureContent,
  type AnimationJourneyStep,
} from "@/content/internet-architecture";
import { SlideHeader } from "@/components/common/SlideHeader";
import { SlideBackground } from "@/components/common/decorations/SlideBackground";
import { TerminalPopup } from "./TerminalPopup";
import {
  Laptop,
  Globe,
  Network,
  Server,
  Database,
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2,
  Cpu,
  Terminal,
  ChevronRight,
  ChevronLeft,
  Lock,
  Search,
} from "lucide-react";
import { FlashMemoryBadge } from "@/components/common";

export interface InternetSlideProps {
  content?: InternetArchitectureContent;
  onNextSlide?: () => void;
  onPrevSlide?: () => void;
  className?: string;
}

type HoverCardType = "domain" | "dns" | "ip" | "hosting" | null;

export function InternetSlide({
  content = internetArchitectureContent,
  onNextSlide,
  onPrevSlide,
  className = "",
}: InternetSlideProps) {
  // Phase state: 1 = Hosting Server only, 2 = + User, 3 = + Domain, 4 = + DNS (complete pipeline)
  const [currentPhase, setCurrentPhase] = useState<number>(1);

  // Animation Journey State (How does a website work online?)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStepId, setCurrentStepId] = useState<number>(0); // 0 = idle, 1..5 = active step

  // Hover Popover State
  const [activeHover, setActiveHover] = useState<HoverCardType>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeStep: AnimationJourneyStep | null =
    currentStepId > 0
      ? content.journeySteps.find((s) => s.id === currentStepId) ?? null
      : null;

  const currentPhaseInfo =
    content.revealPhases.find((p) => p.phase === currentPhase) ?? content.revealPhases[0];

  // Auto-play interval for request journey animation
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepId((prev) => {
          if (prev >= content.journeySteps.length) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3400);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, content.journeySteps.length]);

  const handleStartAnimation = () => {
    // Ensure all nodes are revealed for the journey
    setCurrentPhase(4);
    setCurrentStepId(1);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    if (currentStepId === 0) {
      handleStartAnimation();
    } else {
      setIsPlaying((v) => !v);
    }
  };

  const handleResetAnimation = () => {
    setIsPlaying(false);
    setCurrentStepId(0);
  };

  const handleNextStep = () => {
    setIsPlaying(false);
    setCurrentStepId((prev) => Math.min(prev + 1, content.journeySteps.length));
  };

  const handlePrevStep = () => {
    setIsPlaying(false);
    setCurrentStepId((prev) => Math.max(prev - 1, 1));
  };

  // Phase Stepper Handlers
  const handleNextPhase = () => {
    if (currentPhase < 4) {
      setCurrentPhase((prev) => prev + 1);
      setCurrentStepId(0);
      setIsPlaying(false);
    } else if (onNextSlide) {
      onNextSlide();
    }
  };

  const handlePrevPhase = () => {
    if (currentPhase > 1) {
      setCurrentPhase((prev) => prev - 1);
      setCurrentStepId(0);
      setIsPlaying(false);
    } else if (onPrevSlide) {
      onPrevSlide();
    }
  };

  const handleHoverEnter = (type: HoverCardType) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveHover(type);
  };

  const handleHoverLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveHover(null);
    }, 250);
  };

  // Visibility checks based on current progressive reveal phase
  const showHosting = currentPhase >= 1;
  const showUser = currentPhase >= 2;
  const showDomain = currentPhase >= 3;
  const showDns = currentPhase >= 4;

  const isNodeActive = (
    nodeName: "user" | "domain" | "dns" | "hosting" | "frontend" | "backend" | "db"
  ) => {
    if (!activeStep) return false;
    return activeStep.activeNodes.includes(nodeName);
  };

  return (
    <section
      aria-label={content.title}
      className={`relative min-h-screen w-full flex flex-col bg-[var(--bg-deep-navy)] overflow-hidden select-none ${className}`}
    >
      {/* Background Matrix & Auras */}
      <SlideBackground
        theme="cyan"
        slideTag="SLIDE_08 // DEPLOYMENT_NET"
        glowOrbs={[
          {
            color: "cyan",
            position: "top-right",
            size: "w-[44rem] h-[34rem]",
            opacity: "opacity-15",
          },
          {
            color: "indigo",
            position: "bottom-left",
            size: "w-[38rem] h-[30rem]",
            opacity: "opacity-15",
          },
        ]}
      />

      {/* Header */}
      <SlideHeader
        title={content.title}
        eyebrow={content.eyebrow}
        slideNumber={content.badge}
        accent="cyan"
        rightContent={
          <FlashMemoryBadge
            title="Must Remember"
            badgeLabel="KEY CONCEPT"
            description="Every website request travels: Browser → Domain → DNS → Hosting Server → Frontend/Backend → Database. This request lifecycle is fundamental to all web development."
            points={[
              "Domain names are human-friendly aliases for IP addresses (e.g. devup-club.dz → 195.154.122.89)",
              "DNS acts as the internet's phonebook — it translates domain names to IPs in < 20ms",
              "Every server has a public IP address you can discover with: curl ifconfig.me",
              "The hosting server runs your Frontend , Backend and Database",
            ]}
          />
        }
      />

      {/* Main Workspace Container */}
      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3 flex flex-col justify-between gap-3 min-h-0">
        {/* ══════════════════════════════════════════════════════════
            TOP CONTROLLER BAR: Phase Stepper & Journey Animation Button
            ══════════════════════════════════════════════════════════ */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#090F1E]/90 border border-cyan-500/30 shadow-[0_10px_35px_rgba(6,182,212,0.15)] backdrop-blur-md">
          {/* Left: Progressive Reveal Phase Stepper */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 font-mono text-xs">
              <button
                type="button"
                onClick={handlePrevPhase}
                disabled={currentPhase <= 1}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer font-bold"
                title="Previous Reveal Step"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              <div className="px-3 py-1 flex items-center gap-2">
                <span className="text-[11px] font-mono text-slate-400">Phase:</span>
                <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-bold text-xs border border-cyan-500/30">
                  {currentPhaseInfo.label} ({currentPhase}/4)
                </span>
              </div>

              <button
                type="button"
                onClick={handleNextPhase}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white font-bold transition-all cursor-pointer text-xs ${currentPhase >= 4
                  ? "bg-gradient-to-r from-emerald-600 via-cyan-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 shadow-[0_0_18px_rgba(16,185,129,0.5)] ring-1 ring-cyan-300/50"
                  : "bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                  }`}
                title={
                  currentPhase < 4
                    ? `Reveal ${content.revealPhases[currentPhase]?.label}`
                    : "Move to Slide 02: Workshop Plan"
                }
              >
                {currentPhase < 4 ? (
                  <>
                    <span>Next: {content.revealPhases[currentPhase]?.label}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    <span>Workshop Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>


            {/* Stepper Controls during Request Journey Animation */}
            {currentStepId > 0 && (
              <div className="flex items-center gap-1 p-1 rounded-xl bg-black/40 border border-white/10 font-mono text-xs">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={currentStepId <= 1}
                  className="p-1 rounded-md text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                >
                  <ArrowLeft className="w-3 h-3" />
                </button>
                <span className="px-1.5 text-cyan-300 font-bold text-[10px]">
                  Step {currentStepId}/5
                </span>
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={currentStepId >= content.journeySteps.length}
                  className="p-1 rounded-md text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                >
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={handleResetAnimation}
                  className="p-1 rounded-md text-slate-400 hover:text-rose-300 cursor-pointer ml-0.5"
                  title="Reset Journey"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Right: Stage Banner */}
          <div className="flex items-center justify-end">
            <AnimatePresence mode="wait">
              {activeStep ? (
                <motion.div
                  key={`step-${activeStep.id}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#0F172A] border border-cyan-500/40 text-left font-mono"
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {activeStep.title}
                    </span>
                    <span className="text-[10px] text-slate-300 block line-clamp-1">
                      {activeStep.description}
                    </span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={`phase-${currentPhase}`}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#0F172A]/80 border border-slate-800 text-left font-mono"
                >
                  <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {currentPhaseInfo.title}
                    </span>
                    <span className="text-[10px] text-slate-400 block line-clamp-1">
                      {currentPhaseInfo.description}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            CORE ARCHITECTURE CANVAS
            Progressively revealed:
            Phase 1: Hosting Server ONLY
            Phase 2: Client User + Hosting Server
            Phase 3: Client User + Domain + Hosting Server
            Phase 4: Client User + Domain + DNS + Hosting Server (Complete)
            ══════════════════════════════════════════════════════════ */}
        <div className="relative flex-1 rounded-3xl p-5 sm:p-8 bg-[#070D1B]/95 border-2 border-indigo-500/30 shadow-[0_20px_70px_rgba(0,0,0,0.7)] flex flex-col justify-center min-h-[460px]">
          <div className="relative w-full flex items-center justify-between gap-3 sm:gap-6">
            {/* ══════════════════════════════════════════
                1. CLIENT BROWSER: GOOGLE SEARCH (Revealed in Phase 2)
                ══════════════════════════════════════════ */}
            <AnimatePresence>
              {showUser && (
                <motion.div
                  key="node-user"
                  initial={{ opacity: 0, scale: 0.85, x: -30 }}
                  animate={{
                    opacity: 1,
                    scale: isNodeActive("user") ? 1.04 : 1,
                    x: 0,
                    boxShadow: isNodeActive("user")
                      ? "0 0 35px rgba(6,182,212,0.8)"
                      : "0 10px 30px rgba(0,0,0,0.6)",
                  }}
                  exit={{ opacity: 0, scale: 0.85, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="relative flex flex-col items-center shrink-0"
                >
                  {/* Browser chrome window */}
                  <div
                    className={`w-[250px] sm:w-[275px] rounded-2xl border-2 overflow-hidden shadow-2xl flex flex-col bg-[#202124] transition-all ${isNodeActive("user")
                      ? "border-cyan-400 ring-2 ring-cyan-400/40"
                      : "border-slate-700/80 hover:border-slate-600"
                      }`}
                  >
                    {/* Browser toolbar */}
                    <div className="bg-[#292A2D] border-b border-[#3c4043] px-3 py-1.5 flex items-center gap-2 shrink-0">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                      </div>
                      <div className="flex-1 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#202124] border border-[#3c4043] text-[10px] font-mono text-slate-300">
                        <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                        <span className="truncate text-slate-300">
                          google.com/search?q=devup+club
                        </span>
                      </div>
                    </div>

                    {/* Window body: Google Search & Results */}
                    <div className="p-3 flex flex-col gap-2.5 bg-[#202124] text-left">
                      {/* Search Bar */}
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-[#303134] border border-[#5f6368]/80 shadow-sm">
                        {/* Google colored logo */}
                        <div className="flex items-center font-bold text-xs tracking-tight select-none">
                          <span className="text-[#4285F4]">G</span>
                          <span className="text-[#EA4335]">o</span>
                          <span className="text-[#FBBC05]">o</span>
                          <span className="text-[#4285F4]">g</span>
                          <span className="text-[#34A853]">l</span>
                          <span className="text-[#EA4335]">e</span>
                        </div>
                        <div className="h-3 w-[1px] bg-[#5f6368]" />
                        <Search className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="text-[11px] font-medium text-white truncate flex-1">
                          devup club
                        </span>
                      </div>

                      {/* Results info */}
                      <div className="text-[9px] text-slate-400 px-0.5 flex items-center justify-between">
                        <span>About 1,240,000 results (0.22s)</span>
                        <span className="text-cyan-400 font-mono font-semibold">Top Result</span>
                      </div>

                      {/* Featured DevUp Club search result card */}
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#1E293B]/80 to-[#0F172A]/90 border border-indigo-500/40 shadow-sm flex flex-col gap-1 hover:border-cyan-400/60 transition-colors">
                        {/* Favicon & URL */}
                        <div className="flex items-center gap-1.5">
                          <span className="w-3.5 h-3.5 rounded-sm bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-[8px] font-black text-white shrink-0">
                            D
                          </span>
                          <span className="text-[10px] font-mono text-cyan-400 truncate">
                            https://www.devup-club.dz
                          </span>
                        </div>

                        {/* Title link */}
                        <div className="text-xs font-bold text-[#8ab4f8] hover:underline flex items-center gap-1">
                          <span className="truncate">DevUp Club — Coding Community</span>
                          <ChevronRight className="w-3 h-3 text-cyan-400 shrink-0" />
                        </div>

                        {/* Description */}
                        <p className="text-[9.5px] text-slate-300 leading-snug line-clamp-2">
                          Join Algeria&apos;s tech community for developers &amp; CS students. Workshops, hackathons &amp; web projects.
                        </p>

                        {/* Tag pills */}
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          {["Workshops", "Web Dev", "Full-Stack"].map((tag) => (
                            <span
                              key={tag}
                              className="px-1.5 py-0.5 rounded text-[8.5px] font-mono text-indigo-300 bg-indigo-500/20 border border-indigo-500/30"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Target Domain Link Badge */}
                      <div className="pt-1 border-t border-slate-700/60 flex items-center justify-between text-[9px] font-mono">
                        <span className="text-slate-400">Target Domain:</span>
                        <span className="text-cyan-300 font-bold bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30">
                          devup-club.dz
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 uppercase mt-2 font-bold tracking-wide">
                    Client Browser · Google Search
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CONDUIT: User → Domain (Revealed when both User and Domain exist) */}
            {showUser && showDomain && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                className="flex-1 flex items-center justify-center relative min-w-[24px] max-w-[80px]"
              >
                <div className="w-full h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-500 relative">
                  {activeStep?.activePath === "user-domain" && (
                    <motion.div
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#22D3EE]"
                    />
                  )}
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-indigo-400 -ml-1 shrink-0" />
              </motion.div>
            )}

            {/* ══════════════════════════════════════════
                2. DOMAIN NODE (Revealed in Phase 3)
                ══════════════════════════════════════════ */}
            <AnimatePresence>
              {showDomain && (
                <motion.div
                  key="node-domain"
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={{
                    opacity: 1,
                    scale: isNodeActive("domain") ? 1.05 : 1,
                    y: 0,
                    boxShadow: isNodeActive("domain")
                      ? "0 0 30px rgba(99,102,241,0.7)"
                      : "0 0 0px transparent",
                  }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative flex flex-col items-center shrink-0"
                  onMouseEnter={() => handleHoverEnter("domain")}
                  onMouseLeave={handleHoverLeave}
                >
                  <div
                    className={`w-[130px] sm:w-[150px] p-4 rounded-2xl border-2 flex flex-col items-center text-center gap-2.5 transition-all bg-[#0B1222] cursor-help ${isNodeActive("domain")
                      ? "border-indigo-400 ring-2 ring-indigo-400/40"
                      : "border-slate-800 hover:border-indigo-500/60"
                      }`}
                  >
                    <div className="p-3 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400">
                      <Globe className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xs font-mono font-bold text-white">Domain Name</h3>
                      <span className="text-[10px] font-mono text-indigo-300">Human Alias</span>
                    </div>
                    <div className="w-full px-2 py-1 rounded bg-indigo-500/10 border border-indigo-500/30 text-[10px] font-mono text-indigo-300 font-bold truncate">
                      {content.domain}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase mt-2 font-bold">
                    Domain
                  </span>

                  {/* DOMAIN HOVER CARD */}
                  <AnimatePresence>
                    {activeHover === "domain" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
                      >
                        <div className="w-[290px] p-3.5 rounded-2xl bg-[#090F1E] border border-indigo-500/50 shadow-[0_15px_40px_rgba(0,0,0,0.85)] text-left font-mono">
                          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-800">
                            <Globe className="w-4 h-4 text-indigo-400" />
                            <span className="text-xs font-bold text-white">
                              What is a Domain Name?
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            A human-friendly alias (like <strong className="text-cyan-300">devup-club.dz</strong>) that replaces numeric machine IP addresses so users can easily find websites.
                          </p>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CONDUIT: Domain → DNS (Revealed when both Domain and DNS exist) */}
            {showDomain && showDns && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                className="flex-1 flex items-center justify-center relative min-w-[24px] max-w-[80px]"
              >
                <div className="w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 relative">
                  {activeStep?.activePath === "domain-dns" && (
                    <motion.div
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-indigo-400 shadow-[0_0_12px_#818CF8]"
                    />
                  )}
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-purple-400 -ml-1 shrink-0" />
              </motion.div>
            )}

            {/* ══════════════════════════════════════════
                3. DNS NODE (Revealed in Phase 4)
                ══════════════════════════════════════════ */}
            <AnimatePresence>
              {showDns && (
                <motion.div
                  key="node-dns"
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={{
                    opacity: 1,
                    scale: isNodeActive("dns") ? 1.05 : 1,
                    y: 0,
                    boxShadow: isNodeActive("dns")
                      ? "0 0 30px rgba(168,85,247,0.7)"
                      : "0 0 0px transparent",
                  }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative flex flex-col items-center shrink-0"
                  onMouseEnter={() => handleHoverEnter("dns")}
                  onMouseLeave={handleHoverLeave}
                >
                  <div
                    className={`w-[130px] sm:w-[150px] p-4 rounded-2xl border-2 flex flex-col items-center text-center gap-2.5 transition-all bg-[#0B1222] cursor-help ${isNodeActive("dns")
                      ? "border-purple-400 ring-2 ring-purple-400/40"
                      : "border-slate-800 hover:border-purple-500/60"
                      }`}
                  >
                    <div className="p-3 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400">
                      <Network className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xs font-mono font-bold text-white">DNS Resolver</h3>
                      <span className="text-[10px] font-mono text-purple-300">Nameserver</span>
                    </div>
                    <div className="w-full px-2 py-1 rounded bg-purple-500/10 border border-purple-500/30 text-[10px] font-mono text-purple-300 font-bold truncate">
                      8.8.8.8 / 1.1.1.1
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase mt-2 font-bold">
                    DNS Phonebook
                  </span>

                  {/* DNS HOVER CARD */}
                  <AnimatePresence>
                    {activeHover === "dns" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
                      >
                        <div className="w-[300px] p-3.5 rounded-2xl bg-[#090F1E] border border-purple-500/50 shadow-[0_15px_40px_rgba(0,0,0,0.85)] text-left font-mono">
                          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-800">
                            <Network className="w-4 h-4 text-purple-400" />
                            <span className="text-xs font-bold text-white">
                              Domain-to-IP Resolution
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            The Internet’s phonebook: translates domain name <span className="text-cyan-300 font-bold">devup-club.dz</span> into numerical IPv4 address <span className="text-emerald-400 font-bold">{content.publicIp}</span>.
                          </p>
                          <div className="mt-2.5 p-2 rounded-lg bg-[#0F172A] border border-slate-800 text-[10px] text-slate-400 space-y-1">
                            <div>facebook.com → 157.240.22.35</div>
                            <div>youtube.com → 142.250.184.14</div>
                            <div>your Domain → [Your website IP]</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CONDUIT: DNS → Hosting Server (Revealed when DNS exists) */}
            {showDns && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                className="flex-1 flex items-center justify-center relative min-w-[24px] max-w-[80px]"
              >
                <div className="w-full h-0.5 bg-gradient-to-r from-purple-500 to-emerald-400 relative">
                  {activeStep?.activePath === "dns-hosting" && (
                    <motion.div
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_12px_#34D399]"
                    />
                  )}
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400 -ml-1 shrink-0" />
              </motion.div>
            )}

            {/* ══════════════════════════════════════════
                4. HOSTING SERVER CONTAINER (Phase 1: Always Present!)
                Inside: Frontend (Next.js) + Backend (NestJS) + Database (PostgreSQL)
                Top: Public IP Address Badge (Hover explains IP in 2 sentences + curl ifconfig.me)
                ══════════════════════════════════════════ */}
            <div
              className={`relative flex flex-col items-center transition-all duration-500 ${currentPhase === 1
                ? "flex-1 max-w-[460px] mx-auto"
                : "flex-1 min-w-[300px] max-w-[380px]"
                }`}
            >
              <motion.div
                animate={
                  isNodeActive("hosting")
                    ? {
                      scale: 1.02,
                      boxShadow: "0 0 40px rgba(16,185,129,0.5)",
                      borderColor: "#34D399",
                    }
                    : { scale: 1 }
                }
                transition={{ duration: 0.3 }}
                className={`w-full rounded-2xl border-2 p-4 sm:p-5 bg-[#0A1020]/95 flex flex-col gap-3.5 transition-all shadow-2xl ${isNodeActive("hosting")
                  ? "border-emerald-400 ring-2 ring-emerald-400/40"
                  : "border-slate-800 hover:border-emerald-500/50"
                  }`}
              >
                {/* HOSTING HEADER: Title + Interactive Public IP Address Badge */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <Server className="w-5 h-5 text-emerald-400" />
                    <div>
                      <span className="text-xs sm:text-sm font-mono font-bold text-white block">
                        Hosting Server
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 block">
                        Cloud Origin Server
                      </span>
                    </div>
                  </div>

                  {/* ── PUBLIC IP ADDRESS BADGE ──
                      Hover explains:
                      1. In 2 sentences what an IP address is
                      2. Below it, command: curl ifconfig.me
                  */}
                  <div
                    className="relative cursor-help"
                    onMouseEnter={() => handleHoverEnter("ip")}
                    onMouseLeave={handleHoverLeave}
                  >
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border-2 border-emerald-400/60 text-xs font-mono font-bold text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.35)] hover:scale-105 hover:bg-emerald-500/25 transition-all">
                      <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{content.publicIp}</span>
                    </div>

                    {/* IP TERMINAL POPUP */}
                    <AnimatePresence>
                      {activeHover === "ip" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute bottom-full mt-64 right-0 z-50 pointer-events-auto"
                        >
                          <TerminalPopup
                            publicIp={content.publicIp}
                            sentence1={content.ipExplanation.sentence1}
                            command={content.ipExplanation.command}
                            output={content.ipExplanation.output}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* INSIDE HOSTING: 3 Stacked Internal Layers */}
                <div className="space-y-2.5">
                  {/* Layer A: Frontend (Next.js) */}
                  <div
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all ${isNodeActive("frontend")
                      ? "bg-cyan-500/20 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                      : "bg-[#070D1B] border-slate-800"
                      }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-black border border-white/10 flex items-center justify-center font-bold text-xs text-white">
                        N
                      </div>
                      <div>
                        <span className="block text-xs font-mono font-bold text-white">
                          Frontend (Next.js)
                        </span>
                        <span className="block text-[10px] font-mono text-slate-400">
                          React Server Components &amp; App Router · port 3000
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                      SSR
                    </span>
                  </div>

                  {/* Layer B: Backend (NestJS) */}
                  <div
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all ${isNodeActive("backend")
                      ? "bg-rose-500/20 border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.4)]"
                      : "bg-[#070D1B] border-slate-800"
                      }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center font-bold text-xs text-rose-400">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-xs font-mono font-bold text-white">
                          Backend (NestJS)
                        </span>
                        <span className="block text-[10px] font-mono text-slate-400">
                          REST API &amp; Auth Services · port 4000
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                      API
                    </span>
                  </div>

                  {/* Layer C: Database (PostgreSQL) */}
                  <div
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all ${isNodeActive("db")
                      ? "bg-amber-500/20 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                      : "bg-[#070D1B] border-slate-800"
                      }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400">
                        <Database className="w-4 h-4 animate-pulse" />
                      </div>
                      <div>
                        <span className="block text-xs font-mono font-bold text-white">
                          Database (PostgreSQL)
                        </span>
                        <span className="block text-[10px] font-mono text-slate-400">
                          ACID Relational Storage · port 5432
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                      SQL
                    </span>
                  </div>
                </div>
              </motion.div>

              <span className="text-[10px] font-mono text-slate-500 uppercase mt-2 font-bold">
                Origin Hosting Infrastructure
              </span>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════
              RETURN PACKET FLOW BANNER (When Journey Step 5 is active)
              ══════════════════════════════════════════════════════════ */}
          {activeStep?.id === 5 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-400/40 text-center font-mono text-xs text-emerald-300 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>
                <strong>Response Cycle Complete:</strong> HTTP 200 OK returned to Client Browser. DevUp Club page painted!
              </span>
            </motion.div>
          )}
        </div>

        {/* Bottom Helper Bar */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-2">
          <span>
            {currentPhase < 4 ? (
              <>
                Click <strong className="text-cyan-300">Next ({content.revealPhases[currentPhase]?.label})</strong> to reveal the next piece of the Internet architecture.
              </>
            ) : (
              <>
                Network complete: <strong className="text-emerald-400">Client → Domain → DNS → Hosting Server</strong>. Click <strong className="text-cyan-300">Workshop Plan</strong> to return to the workshop agenda.
              </>
            )}
          </span>
          <span className="text-slate-400">
            Slide 07 · The Internet
          </span>
        </div>
      </div>
    </section>
  );
}
