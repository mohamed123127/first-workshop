"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { SlideHeader } from "@/components/common/SlideHeader";
import { SlideBackground } from "@/components/common/decorations/SlideBackground";
import {
  Laptop,
  Server,
  Database,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  User,
  KeyRound,
  RotateCcw,
  Sparkles,
  Zap,
  ShieldCheck,
  Globe,
  ShoppingBag,
  DollarSign,
  Package,
  Layers,
  Lock,
} from "lucide-react";

export interface WebBehindScenesSlideProps {
  onNextSlide?: () => void;
  onPrevSlide?: () => void;
  className?: string;
}

export type ExampleScenario = "login" | "product";

interface StepConfig {
  step: number;
  badge: string;
  title: string;
  desc: string;
  buttonLabel: string;
}

const LOGIN_STEPS: StepConfig[] = [
  {
    step: 1,
    badge: "Part 1 of 5",
    title: "1. User Fills Login Form (Frontend)",
    desc: "The user enters their email and password in the browser and clicks 'Log In'.",
    buttonLabel: "Next: Send Request Over Network →",
  },
  {
    step: 2,
    badge: "Part 2 of 5",
    title: "2. The Request Travels (Network)",
    desc: "The browser packages the credentials and sends them across the internet to the server.",
    buttonLabel: "Next: Server Checks Database →",
  },
  {
    step: 3,
    badge: "Part 3 of 5",
    title: "3. Server Checks Database (Backend)",
    desc: "The server receives the data and checks the database: 'Does Mohamed exist and does the password match?'",
    buttonLabel: "Next: Return Response to Browser →",
  },
  {
    step: 4,
    badge: "Part 4 of 5",
    title: "4. The Response Returns (Network)",
    desc: "The server answers: 'Yes! Status 200 OK — Password is correct, here is the session token.'",
    buttonLabel: "Next: Complete User Login →",
  },
  {
    step: 5,
    badge: "Part 5 of 5",
    title: "5. User Logged In! (Success)",
    desc: "The browser receives the green light, saves the session, and opens Mohamed's dashboard!",
    buttonLabel: "↺ Replay From Part 1",
  },
];

const PRODUCT_STEPS: StepConfig[] = [
  {
    step: 1,
    badge: "Part 1 of 5",
    title: "1. Store Owner Fills Product Form (Frontend)",
    desc: "The seller fills product name ('AirPods Pro Max'), price ($249.00), and inventory (45 units), then clicks 'Publish to Store'.",
    buttonLabel: "Next: Dispatch Product Data Over Network →",
  },
  {
    step: 2,
    badge: "Part 2 of 5",
    title: "2. The POST Request Travels (Network)",
    desc: "The browser packages the product details into a JSON payload and dispatches POST /api/v1/products across HTTPS to the backend.",
    buttonLabel: "Next: Server Validates & Writes to Database →",
  },
  {
    step: 3,
    badge: "Part 3 of 5",
    title: "3. Server Writes to Database (Backend)",
    desc: "The backend server validates price > 0, executes SQL INSERT INTO products, and assigns unique ID #PRD-942.",
    buttonLabel: "Next: Return 201 Created Confirmation →",
  },
  {
    step: 4,
    badge: "Part 4 of 5",
    title: "4. The 201 Created Response Returns (Network)",
    desc: "The server answers: '201 Created — Product successfully saved in database with ID #PRD-942 and URL generated.'",
    buttonLabel: "Next: Publish Live on Storefront →",
  },
  {
    step: 5,
    badge: "Part 5 of 5",
    title: "5. Product Live in Store! (Success)",
    desc: "The browser receives the green light, updates the live store catalog, and displays the product card to customers!",
    buttonLabel: "↺ Replay From Part 1",
  },
];

export function WebBehindScenesSlide({
  className = "",
}: WebBehindScenesSlideProps) {
  // Scenario state: "login" or "product"
  const [scenario, setScenario] = useState<ExampleScenario>("login");

  // Current active step (1 to 5)
  const [currentStep, setCurrentStep] = useState<number>(1);

  const steps = scenario === "login" ? LOGIN_STEPS : PRODUCT_STEPS;
  const activeInfo = steps[currentStep - 1];

  const handleNextPart = useCallback(() => {
    setCurrentStep((prev) => (prev < 5 ? prev + 1 : 1));
  }, []);

  const handlePrevPart = useCallback(() => {
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : 5));
  }, []);

  const handleReset = useCallback(() => {
    setCurrentStep(1);
  }, []);

  const handleSwitchScenario = (newScenario: ExampleScenario) => {
    setScenario(newScenario);
    setCurrentStep(1);
  };

  // Keyboard navigation: Space, Enter, or ArrowDown advances to the next part
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter" || e.key === "ArrowDown") {
        e.preventDefault();
        handleNextPart();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        handlePrevPart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNextPart, handlePrevPart]);

  // Visual state flags based on currentStep
  const isFrontendFocus = currentStep === 1 || currentStep === 5;
  const isRequestFlow = currentStep === 2;
  const isBackendFocus = currentStep === 3;
  const isResponseFlow = currentStep === 4;
  const isCompleted = currentStep === 5;

  return (
    <section
      aria-label="Frontend vs Backend Communication"
      className={`relative min-h-screen w-full flex flex-col bg-[var(--bg-deep-navy)] overflow-hidden select-none ${className}`}
    >
      {/* Ambient Dotted Matrix Background */}
      <SlideBackground
        theme="indigo"
        slideTag="SLIDE_07 // STEP_BY_STEP_FLOW"
        glowOrbs={[
          {
            color: scenario === "login" ? "cyan" : "amber",
            position: "top-left",
            size: "w-[36rem] h-[36rem]",
            opacity: "opacity-20",
          },
          {
            color: "indigo",
            position: "bottom-right",
            size: "w-[40rem] h-[40rem]",
            opacity: "opacity-25",
          },
          {
            color: "amber",
            position: "center",
            size: "w-[30rem] h-[20rem]",
            opacity: "opacity-10",
          },
        ]}
      />

      {/* Slide Header with Scenario Switcher */}
      <SlideHeader
        title="Frontend vs Backend Communication"
        eyebrow={`Interactive Architecture · ${
          scenario === "login" ? "Example A: User Login" : "Example B: Add Product"
        }`}
        subtitle="Click 'Next Part' to trace how the browser, network, server, and database communicate in real time."
        slideNumber="Slide 07"
        accent={scenario === "login" ? "cyan" : "amber"}
        rightContent={
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md shadow-lg">
            <button
              type="button"
              onClick={() => handleSwitchScenario("login")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                scenario === "login"
                  ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.6)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Ex 1: User Login</span>
            </button>

            <button
              type="button"
              onClick={() => handleSwitchScenario("product")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                scenario === "product"
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.6)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Ex 2: Add Product</span>
            </button>
          </div>
        }
      />

      {/* Main Slide Workspace */}
      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-2.5 flex flex-col justify-between gap-3 min-h-0">
        {/* ── TOP INTERACTIVE STEP NAVIGATION PILLS ── */}
        <div className="w-full flex items-center justify-between gap-2 p-2 rounded-2xl bg-[#0F172A]/80 border border-white/10 backdrop-blur-md shadow-lg overflow-x-auto">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {steps.map((s) => {
              const isCurrent = currentStep === s.step;
              const isPast = currentStep > s.step;
              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setCurrentStep(s.step)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    isCurrent
                      ? scenario === "login"
                        ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-[0_0_18px_rgba(6,182,212,0.6)] scale-105"
                        : "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-[0_0_18px_rgba(16,185,129,0.6)] scale-105"
                      : isPast
                      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                      : "bg-white/5 text-slate-400 hover:text-white border border-white/5 opacity-60"
                  }`}
                >
                  {isPast ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isCurrent
                          ? scenario === "login"
                            ? "bg-cyan-300 animate-ping"
                            : "bg-emerald-300 animate-ping"
                          : "bg-slate-500"
                      }`}
                    />
                  )}
                  <span>Part {s.step}</span>
                </button>
              );
            })}
          </div>

          {/* Active Step Explainer Banner */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
            <span
              className={`font-bold ${
                scenario === "login" ? "text-cyan-400" : "text-emerald-400"
              }`}
            >
              {activeInfo.badge}:
            </span>
            <span className="text-slate-200">{activeInfo.title}</span>
          </div>
        </div>

        {/* ── THE 3 INTERACTIVE PILLARS (FRONTEND ➔ ARROWS ➔ BACKEND) ── */}
        <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-[1fr_1.15fr_1fr] gap-4 lg:gap-5 items-stretch min-h-0 py-1">
          {/* ══════════════════════════════════════════════════════════
              PILLAR 1: THE FRONTEND (CLIENT / BROWSER)
              ══════════════════════════════════════════════════════════ */}
          <motion.div
            animate={{
              scale: isFrontendFocus ? 1.02 : 0.98,
              opacity: isFrontendFocus || currentStep > 1 ? 1 : 0.45,
              borderColor: isCompleted
                ? "rgba(16, 185, 129, 0.8)"
                : isFrontendFocus
                ? scenario === "login"
                  ? "rgba(6, 182, 212, 0.85)"
                  : "rgba(16, 185, 129, 0.85)"
                : "rgba(255, 255, 255, 0.1)",
            }}
            transition={{ duration: 0.35 }}
            className={`relative rounded-3xl p-5 sm:p-6 bg-[#0B1120]/95 border-2 flex flex-col justify-between shadow-2xl backdrop-blur-xl overflow-hidden transition-all ${
              isCompleted
                ? "shadow-[0_0_40px_rgba(16,185,129,0.3)] ring-2 ring-emerald-400/40"
                : isFrontendFocus
                ? scenario === "login"
                  ? "shadow-[0_0_40px_rgba(6,182,212,0.35)] ring-2 ring-cyan-400/40"
                  : "shadow-[0_0_40px_rgba(16,185,129,0.35)] ring-2 ring-emerald-400/40"
                : ""
            }`}
          >
            {/* Top Glow Accent Line */}
            <div
              className={`absolute top-0 inset-x-8 h-1 bg-gradient-to-r from-transparent ${
                isCompleted
                  ? "via-emerald-400"
                  : isFrontendFocus
                  ? scenario === "login"
                    ? "via-[var(--accent-cyan)]"
                    : "via-emerald-400"
                  : "via-white/20"
              } to-transparent`}
            />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase ${
                    scenario === "login"
                      ? "bg-cyan-500/15 border border-cyan-500/30 text-cyan-300"
                      : "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300"
                  }`}
                >
                  <Laptop className="w-4 h-4" />
                  Frontend (Client)
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Browser / Screen
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-extrabold text-white tracking-tight mb-1.5">
                What the User Sees
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed mb-3.5">
                {scenario === "login"
                  ? "The visual screen running in Chrome or Safari. It collects user credentials and displays responses."
                  : "The store management dashboard. The merchant enters product info and publishes it live to the storefront."}
              </p>

              {/* Visual Form Mockup */}
              <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 space-y-2.5 shadow-inner">
                {scenario === "login" ? (
                  /* ── SCENARIO A: LOGIN FORM ── */
                  <>
                    <div className="flex items-center justify-between text-[11px] font-mono font-semibold uppercase text-slate-400">
                      <span>DevUp Club Portal</span>
                      <span className="text-cyan-400">Form Inputs</span>
                    </div>

                    {/* Email Field */}
                    <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-2">
                      <User className="w-4 h-4 text-cyan-400 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-[9px] font-mono text-slate-400 uppercase">
                          Email Address
                        </div>
                        <div className="text-xs font-mono font-bold text-white truncate">
                          mohamed@devup-club.dz
                        </div>
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-2">
                      <KeyRound className="w-4 h-4 text-amber-400 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-[9px] font-mono text-slate-400 uppercase">
                          Password
                        </div>
                        <div className="text-xs font-mono tracking-widest text-slate-200">
                          ••••••••••••
                        </div>
                      </div>
                    </div>

                    {/* Login Action Button */}
                    <button
                      type="button"
                      onClick={handleNextPart}
                      className={`w-full py-2.5 px-3 rounded-xl font-mono text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                        isCompleted
                          ? "bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                          : currentStep === 1
                          ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.6)] animate-pulse"
                          : "bg-white/10 text-slate-300"
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-white" />
                          <span>Authenticated! Welcome Mohamed</span>
                        </>
                      ) : currentStep === 1 ? (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Click to Submit Credentials</span>
                        </>
                      ) : (
                        <span>Credentials Submitted ✓</span>
                      )}
                    </button>
                  </>
                ) : (
                  /* ── SCENARIO B: ADD PRODUCT FORM ── */
                  <>
                    <div className="flex items-center justify-between text-[11px] font-mono font-semibold uppercase text-slate-400">
                      <span>E-Commerce Admin</span>
                      <span className="text-emerald-400">New Product</span>
                    </div>

                    {!isCompleted ? (
                      /* Product Input Form */
                      <div className="space-y-2">
                        {/* Title Field */}
                        <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-2">
                          <Package className="w-4 h-4 text-emerald-400 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-[9px] font-mono text-slate-400 uppercase">
                              Product Name
                            </div>
                            <div className="text-xs font-mono font-bold text-white truncate">
                              AirPods Pro Max (Wireless)
                            </div>
                          </div>
                        </div>

                        {/* Price & Stock Grid */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-1.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-1.5">
                            <DollarSign className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <div className="min-w-0">
                              <div className="text-[8px] font-mono text-slate-400 uppercase">
                                Price
                              </div>
                              <div className="text-xs font-mono font-bold text-white">
                                $249.00
                              </div>
                            </div>
                          </div>

                          <div className="p-1.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <div className="min-w-0">
                              <div className="text-[8px] font-mono text-slate-400 uppercase">
                                Initial Stock
                              </div>
                              <div className="text-xs font-mono font-bold text-white">
                                45 units
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Publish Button */}
                        <button
                          type="button"
                          onClick={handleNextPart}
                          className={`w-full py-2.5 px-3 rounded-xl font-mono text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                            currentStep === 1
                              ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.6)] animate-pulse"
                              : "bg-white/10 text-slate-300"
                          }`}
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>
                            {currentStep === 1
                              ? "Click to Publish Product"
                              : "Product Dispatched ✓"}
                          </span>
                        </button>
                      </div>
                    ) : (
                      /* Published Live Product Card */
                      <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50 space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-emerald-300 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Live on Storefront!</span>
                          </span>
                          <span className="text-[10px] text-cyan-300 font-bold bg-cyan-500/20 px-2 py-0.5 rounded">
                            ID: #PRD-942
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <div>
                            <h5 className="text-xs font-bold text-white">
                              AirPods Pro Max (Wireless)
                            </h5>
                            <span className="text-[10px] font-mono text-slate-300">
                              45 units available in warehouse
                            </span>
                          </div>
                          <span className="text-base font-extrabold text-emerald-400 font-mono">
                            $249.00
                          </span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Teaching Bullets */}
            <div className="mt-3 pt-3 border-t border-white/10 space-y-1 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    scenario === "login" ? "bg-cyan-400" : "bg-emerald-400"
                  }`}
                />
                <span>Runs on user&apos;s phone or computer</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    scenario === "login" ? "bg-cyan-400" : "bg-emerald-400"
                  }`}
                />
                <span>Built with HTML, CSS, React / Next.js</span>
              </div>
            </div>
          </motion.div>

          {/* ══════════════════════════════════════════════════════════
              PILLAR 2 (MIDDLE): THE NETWORK & ANIMATED ARROWS
              ══════════════════════════════════════════════════════════ */}
          <div className="flex flex-col justify-center gap-3.5 relative py-1">
            {/* Network Badge */}
            <div className="text-center">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[11px] font-mono text-slate-300 shadow-md">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>The Internet Pipeline (HTTPS)</span>
              </span>
            </div>

            {/* 1. ARROW GOING FORWARD (REQUEST) */}
            <motion.div
              animate={{
                scale: isRequestFlow ? 1.04 : 0.98,
                opacity: isRequestFlow || currentStep > 2 ? 1 : 0.35,
                borderColor: isRequestFlow
                  ? scenario === "login"
                    ? "rgba(6, 182, 212, 0.9)"
                    : "rgba(16, 185, 129, 0.9)"
                  : "rgba(255, 255, 255, 0.1)",
              }}
              transition={{ duration: 0.35 }}
              className={`relative rounded-2xl p-4 bg-[#0A1222] border-2 shadow-xl flex flex-col gap-2 transition-all overflow-hidden ${
                isRequestFlow
                  ? "shadow-[0_0_35px_rgba(6,182,212,0.45)] ring-2 ring-cyan-400/50"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isRequestFlow ? "bg-cyan-400 animate-ping" : "bg-cyan-400"
                    }`}
                  />
                  1. Request (The Question / Order)
                </span>
                <span className="text-[10px] text-slate-400 uppercase">
                  Frontend ➔ Backend
                </span>
              </div>

              {/* Message Bubble */}
              <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs sm:text-[13px] text-cyan-100 font-medium leading-relaxed">
                {scenario === "login"
                  ? "“Hey Server! Here is Mohamed's email and password. Can he log in?”"
                  : "“Hey Server! Please add 'AirPods Pro Max' ($249.00, stock: 45) to our product catalog.”"}
              </div>

              {/* The Arrow Track with Moving Particle */}
              <div className="relative h-9 rounded-xl bg-black/60 border border-cyan-500/30 flex items-center px-3 overflow-hidden">
                <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 h-0.5 border-t-2 border-dashed border-cyan-500/40" />

                {isRequestFlow && (
                  <motion.div
                    initial={{ left: "5%" }}
                    animate={{ left: "85%" }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className={`absolute z-20 flex items-center gap-1.5 px-3 py-1 rounded-lg text-white text-xs font-mono font-bold shadow-lg ${
                      scenario === "login"
                        ? "bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-[0_0_20px_rgba(6,182,212,0.9)]"
                        : "bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-[0_0_20px_rgba(16,185,129,0.9)]"
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
                    <span>
                      {scenario === "login" ? "Credentials" : "Product JSON"}
                    </span>
                  </motion.div>
                )}

                <div className="relative z-10 w-full flex items-center justify-between text-xs font-mono text-slate-300">
                  <span className="font-semibold text-cyan-400">
                    {scenario === "login"
                      ? "POST /api/v1/auth/login"
                      : "POST /api/v1/products"}
                  </span>
                  <div className="flex items-center gap-1 text-cyan-400 font-bold">
                    <span>Sending</span>
                    <ArrowRight className="w-4 h-4 animate-pulse stroke-[3]" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 2. ARROW GOING BACK (RESPONSE) */}
            <motion.div
              animate={{
                scale: isResponseFlow ? 1.04 : 0.98,
                opacity: isResponseFlow || currentStep > 4 ? 1 : 0.35,
                borderColor: isResponseFlow
                  ? "rgba(16, 185, 129, 0.9)"
                  : "rgba(255, 255, 255, 0.1)",
              }}
              transition={{ duration: 0.35 }}
              className={`relative rounded-2xl p-4 bg-[#0A1222] border-2 shadow-xl flex flex-col gap-2 transition-all overflow-hidden ${
                isResponseFlow
                  ? "shadow-[0_0_35px_rgba(16,185,129,0.45)] ring-2 ring-emerald-400/50"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isResponseFlow
                        ? "bg-emerald-400 animate-ping"
                        : "bg-emerald-400"
                    }`}
                  />
                  2. Response (The Answer)
                </span>
                <span className="text-[10px] text-slate-400 uppercase">
                  Backend ➔ Frontend
                </span>
              </div>

              {/* Message Bubble */}
              <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs sm:text-[13px] text-emerald-100 font-medium leading-relaxed">
                {scenario === "login"
                  ? "“Yes! Password matches. Here is the session token, welcome in!”"
                  : "“Success! Product recorded in database with ID #PRD-942 and active URL.”"}
              </div>

              {/* The Return Arrow Track with Moving Particle */}
              <div className="relative h-9 rounded-xl bg-black/60 border border-emerald-500/30 flex items-center px-3 overflow-hidden">
                <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 h-0.5 border-t-2 border-dashed border-emerald-500/40" />

                {isResponseFlow && (
                  <motion.div
                    initial={{ right: "5%" }}
                    animate={{ right: "85%" }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute z-20 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs font-mono font-bold shadow-[0_0_20px_rgba(16,185,129,0.9)]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    <span>
                      {scenario === "login"
                        ? "200 OK Token"
                        : "201 Created #PRD-942"}
                    </span>
                  </motion.div>
                )}

                <div className="relative z-10 w-full flex items-center justify-between text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-1 text-emerald-400 font-bold">
                    <ArrowLeft className="w-4 h-4 animate-pulse stroke-[3]" />
                    <span>Returning</span>
                  </div>
                  <span className="font-semibold text-emerald-400">
                    {scenario === "login" ? "200 Success" : "201 Created"}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ══════════════════════════════════════════════════════════
              PILLAR 3: THE BACKEND & DATABASE (SERVER)
              ══════════════════════════════════════════════════════════ */}
          <motion.div
            animate={{
              scale: isBackendFocus ? 1.02 : 0.98,
              opacity: isBackendFocus || currentStep > 3 ? 1 : 0.45,
              borderColor: isBackendFocus
                ? "rgba(99, 102, 241, 0.9)"
                : "rgba(255, 255, 255, 0.1)",
            }}
            transition={{ duration: 0.35 }}
            className={`relative rounded-3xl p-5 sm:p-6 bg-[#0B1120]/95 border-2 flex flex-col justify-between shadow-2xl backdrop-blur-xl overflow-hidden transition-all ${
              isBackendFocus
                ? "shadow-[0_0_40px_rgba(99,102,241,0.35)] ring-2 ring-indigo-400/40"
                : ""
            }`}
          >
            {/* Top Glow Accent Line */}
            <div className="absolute top-0 inset-x-8 h-1 bg-gradient-to-r from-transparent via-[var(--action-indigo)] to-transparent" />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
                  <Server className="w-4 h-4 text-indigo-400" />
                  Backend (Server)
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Cloud / Data Center
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-extrabold text-white tracking-tight mb-1.5">
                Behind the Scenes
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed mb-4">
                The server is the brain and memory. It protects your secrets, verifies business logic, and writes safely to the database.
              </p>

              {/* 2 Clean Visual Sub-Blocks */}
              <div className="space-y-2.5">
                {/* 1. Server Brain Block */}
                <div
                  className={`p-3 rounded-2xl border transition-all ${
                    isBackendFocus
                      ? "bg-indigo-950/60 border-indigo-500/60 shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                      : "bg-black/40 border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold font-mono text-white">
                      1. Server (The Brain)
                    </span>
                    {isBackendFocus && (
                      <span className="ml-auto text-[10px] font-mono text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded-md animate-pulse font-bold">
                        {scenario === "login" ? "Checking Auth..." : "Validating Schema..."}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {scenario === "login"
                      ? "Receives email & password. Verifies format and applies security checks."
                      : "Checks price ($249 > 0), verifies stock is valid, and authorizes admin merchant permissions."}
                  </p>
                </div>

                {/* 2. Database Memory Block */}
                <div
                  className={`p-3 rounded-2xl border transition-all ${
                    isBackendFocus
                      ? "bg-amber-950/50 border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.25)]"
                      : "bg-black/40 border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                      <Database className="w-4 h-4 animate-pulse" />
                    </div>
                    <span className="text-xs font-bold font-mono text-white">
                      2. Database (The Memory)
                    </span>
                    {isBackendFocus && (
                      <span className="ml-auto text-[10px] font-mono text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-md font-bold">
                        {scenario === "login" ? "User Verified! ✓" : "Row Inserted! ✓"}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {scenario === "login"
                      ? "“Does Mohamed exist? Yes. Does the password match? Yes!”"
                      : "INSERT INTO products (name, price, stock) VALUES ('AirPods Pro Max', 249, 45) -> Created ID #PRD-942."}
                  </p>
                </div>
              </div>
            </div>

            {/* Teaching Bullets */}
            <div className="mt-3 pt-3 border-t border-white/10 space-y-1 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span>Runs securely on a remote cloud server</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Stores data safely in a permanent database</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            BOTTOM PRESENTATION CONTROLLER: BIG "CLICK NEXT" BAR
            ══════════════════════════════════════════════════════════ */}
        <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-[#0F172A]/90 via-[#1E293B]/90 to-[#0F172A]/90 border-2 border-cyan-500/30 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Left: Step Explainer Description */}
          <div className="flex items-center gap-3 text-left">
            <div
              className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 font-mono font-bold text-sm ${
                scenario === "login"
                  ? "bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border-cyan-500/30 text-cyan-300"
                  : "bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-emerald-500/30 text-emerald-300"
              }`}
            >
              {currentStep}/5
            </div>
            <div>
              <div
                className={`text-[11px] font-mono uppercase font-bold tracking-wider ${
                  scenario === "login" ? "text-cyan-400" : "text-emerald-400"
                }`}
              >
                {activeInfo.badge}: {activeInfo.title}
              </div>
              <div className="text-xs sm:text-sm text-slate-200 font-sans line-clamp-1 max-w-xl">
                {activeInfo.desc}
              </div>
            </div>
          </div>

          {/* Right: Controller Buttons */}
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
            {/* BIG NEXT PART BUTTON */}
            <button
              type="button"
              onClick={handleNextPart}
              className={`px-5 py-3 rounded-xl font-mono text-xs sm:text-sm font-extrabold text-white transition-all duration-300 flex items-center gap-2.5 cursor-pointer active:scale-[0.98] ${
                scenario === "login"
                  ? "bg-gradient-to-r from-cyan-500 via-indigo-600 to-cyan-500 bg-[length:200%_auto] hover:bg-right shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)]"
                  : "bg-gradient-to-r from-emerald-500 via-cyan-600 to-emerald-500 bg-[length:200%_auto] hover:bg-right shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:shadow-[0_0_35px_rgba(16,185,129,0.7)]"
              }`}
              title="Click or press Space to advance to the next part"
            >
              <span>{activeInfo.buttonLabel}</span>
              {currentStep < 5 ? (
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              ) : (
                <RotateCcw className="w-4 h-4 stroke-[2.5]" />
              )}
            </button>

            {/* Reset Button */}
            <button
              type="button"
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white border border-white/10 transition-all cursor-pointer"
              title="Reset to Part 1"
              aria-label="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
