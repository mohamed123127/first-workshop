"use client";

import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LifecycleStep } from "@/content/project-lifecycle";
import {
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Wrench,
  Brain,
  Lightbulb,
  FileText,
  Palette,
  Network,
  Code2,
  Cloud,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { DesignSystemPreview } from "./DesignSystemPreview";

export interface LifecycleStepModalProps {
  step: LifecycleStep | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export function LifecycleStepModal({
  step,
  isOpen,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: LifecycleStepModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && hasPrev) onPrev();
      else if (e.key === "ArrowRight" && hasNext) onNext();
    },
    [isOpen, onClose, onPrev, onNext, hasPrev, hasNext]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!step) return null;

  const getStepIcon = (name: LifecycleStep["iconName"]) => {
    switch (name) {
      case "brain":
        return <Brain className="w-5 h-5 text-cyan-400" />;
      case "lightbulb":
        return <Lightbulb className="w-5 h-5 text-amber-400" />;
      case "fileText":
        return <FileText className="w-5 h-5 text-indigo-400" />;
      case "palette":
        return <Palette className="w-5 h-5 text-cyan-400" />;
      case "network":
        return <Network className="w-5 h-5 text-indigo-400" />;
      case "code":
        return <Code2 className="w-5 h-5 text-emerald-400" />;
      case "checkCircle":
        return <ShieldCheck className="w-5 h-5 text-amber-400" />;
      case "cloud":
        return <Cloud className="w-5 h-5 text-cyan-400" />;
      case "rocket":
        return <Rocket className="w-5 h-5 text-emerald-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="lifecycle-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl"
        >
          {/* Modal Container */}
          <motion.div
            key={`lifecycle-modal-${step.id}`}
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl rounded-3xl bg-[#091122]/95 border-2 border-cyan-500/30 p-5 sm:p-7 shadow-[0_25px_80px_rgba(0,0,0,0.85)] flex flex-col max-h-[92vh] overflow-hidden"
          >
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 inset-x-8 h-1 bg-gradient-to-r from-transparent via-[var(--accent-cyan)] to-transparent" />

            {/* ── MODAL HEADER ── */}
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
                  {getStepIcon(step.iconName)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                      {`Step 0${step.stepNumber} • ${step.badgeLabel}`}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                      {step.phase}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight mt-0.5">
                    {step.title}
                  </h3>
                </div>
              </div>

              {/* Navigation Arrows + Close */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={onPrev}
                    disabled={!hasPrev}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Previous step (Left Arrow)"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    disabled={!hasNext}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Next step (Right Arrow)"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 transition-all cursor-pointer"
                  title="Close modal (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* ── MODAL SCROLLABLE BODY ── */}
            <div className="flex-1 overflow-y-auto pr-1 py-4 space-y-5 min-h-0">
              {/* Detailed Description */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-slate-200 text-xs sm:text-sm leading-relaxed">
                <p className="font-sans">{step.fullDescription}</p>
              </div>

              {/* ── PICTURE / VISUAL EXAMPLE (pic exemple) ── */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    Visual Example (In Practice)
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Real-world deliverable
                  </span>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/60 p-3.5 sm:p-4 shadow-inner overflow-hidden">
                  {/* Render tailored visual based on visualType */}
                  {step.visualType === "design_system" ? (
                    <DesignSystemPreview />
                  ) : step.visualType === "idea_canvas" ? (
                    /* Idea Canvas Visual */
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider block text-amber-400">
                          📌 The Problem
                        </span>
                        <p className="text-[11px] leading-relaxed">
                          Small business owners waste 4+ hours daily tracking inventory on paper.
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider block text-cyan-400">
                          💡 The Value Prop
                        </span>
                        <p className="text-[11px] leading-relaxed">
                          A cloud POS platform that tracks stock in real-time with barcode scanning.
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider block text-emerald-400">
                          🎯 The Audience
                        </span>
                        <p className="text-[11px] leading-relaxed">
                          Retail store managers and coffee shop cashiers needing zero setup time.
                        </p>
                      </div>
                    </div>
                  ) : step.visualType === "brainstorm_board" ? (
                    /* Brainstorm Board Visual */
                    <div className="p-3 rounded-xl bg-[#091122] border border-dashed border-white/20 space-y-2.5 font-mono text-xs">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-white/10 pb-1.5">
                        <span className="font-bold text-white">Competitive Benchmark</span>
                        <span className="text-cyan-400">Feasibility Matrix: High Impact / Low Effort</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                        <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                          <span className="text-slate-400 block text-[9px]">Competitor A</span>
                          <span className="text-rose-400 font-bold">Lacks offline mode</span>
                        </div>
                        <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                          <span className="text-slate-400 block text-[9px]">Competitor B</span>
                          <span className="text-amber-400 font-bold">Too expensive ($120/m)</span>
                        </div>
                        <div className="p-2 rounded-lg bg-cyan-500/15 border border-cyan-500/30">
                          <span className="text-cyan-300 block text-[9px]">Our Advantage</span>
                          <span className="text-cyan-300 font-bold">Web + PWA offline support</span>
                        </div>
                      </div>
                    </div>
                  ) : step.visualType === "cahier_charges" ? (
                    /* Cahier des Charges & MVP Matrix */
                    <div className="space-y-2 font-mono text-xs">
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span className="font-bold text-indigo-300">MoSCoW MVP Feature Priority</span>
                        <span>Scope: Sprint 1 to 4</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200">
                          <span className="text-[9px] font-bold uppercase text-emerald-400 block mb-1">
                            Must-Have (MVP V1)
                          </span>
                          <ul className="space-y-1 text-[10px]">
                            <li>✓ User auth &amp; roles</li>
                            <li>✓ POS barcode scanner</li>
                            <li>✓ Daily sales receipt PDF</li>
                          </ul>
                        </div>
                        <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-200">
                          <span className="text-[9px] font-bold uppercase text-cyan-400 block mb-1">
                            Should-Have (V1.2)
                          </span>
                          <ul className="space-y-1 text-[10px]">
                            <li>• Multi-branch sync</li>
                            <li>• Export to Excel</li>
                            <li>• Supplier invoice alerts</li>
                          </ul>
                        </div>
                        <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-200">
                          <span className="text-[9px] font-bold uppercase text-purple-400 block mb-1">
                            Could-Have (V2.0)
                          </span>
                          <ul className="space-y-1 text-[10px]">
                            <li>• AI demand forecasting</li>
                            <li>• Loyalty mobile app</li>
                            <li>• Payment gateway widget</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : step.visualType === "architecture_diagram" ? (
                    /* System Architecture Diagram */
                    <div className="p-3 rounded-xl bg-[#070D1A] border border-indigo-500/30 font-mono text-xs space-y-2 text-center">
                      <div className="flex items-center justify-between text-[10px] text-indigo-300 border-b border-white/10 pb-1">
                        <span>FULLSTACK TOPOLOGY</span>
                        <span className="text-emerald-400">POSTGRESQL + NEXT.JS 15</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 items-center text-[10px]">
                        <div className="p-2 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                          <span>Client (Next.js)</span>
                        </div>
                        <div className="p-2 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
                          <span>API Gateway</span>
                        </div>
                        <div className="p-2 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-300">
                          <span>Auth &amp; Business</span>
                        </div>
                        <div className="p-2 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300">
                          <span>PostgreSQL (DB)</span>
                        </div>
                      </div>
                      <span className="text-[9px] text-slate-500 block pt-1">
                        Encrypted with HTTPS / TLS 1.3 • Connection Pool via Prisma ORM
                      </span>
                    </div>
                  ) : step.visualType === "coding_split" ? (
                    /* Dual-Pane Code Window */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px] text-left">
                      <div className="p-2.5 rounded-xl bg-black/60 border border-cyan-500/30 space-y-1">
                        <span className="text-[9px] text-cyan-400 font-bold block">
                          Frontend (React / Tailwind)
                        </span>
                        <pre className="text-slate-300 text-[10px] leading-tight">
{`export function LoginCard() {
  const [email, setEmail] = useState("");
  return <button onClick={submit}>Log In</button>;
}`}
                        </pre>
                      </div>
                      <div className="p-2.5 rounded-xl bg-black/60 border border-indigo-500/30 space-y-1">
                        <span className="text-[9px] text-indigo-400 font-bold block">
                          Backend (Node / Express)
                        </span>
                        <pre className="text-slate-300 text-[10px] leading-tight">
{`app.post('/api/auth', async (req, res) => {
  const user = await db.user.find(req.body);
  return res.json({ token });
});`}
                        </pre>
                      </div>
                    </div>
                  ) : step.visualType === "testing_suite" ? (
                    /* Testing Runner Suite */
                    <div className="p-3 rounded-xl bg-black/60 border border-amber-500/30 font-mono text-xs space-y-2">
                      <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold">
                        <span>✓ VITEST &amp; PLAYWRIGHT RUNNER</span>
                        <span>48 PASSED (0 FAILED)</span>
                      </div>
                      <div className="space-y-1 text-[10px] text-slate-300">
                        <div className="flex items-center justify-between">
                          <span>✓ auth.service.spec.ts (hashes password with bcrypt)</span>
                          <span className="text-emerald-400 font-bold">14ms</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>✓ cart.checkout.spec.ts (calculates total with taxes)</span>
                          <span className="text-emerald-400 font-bold">22ms</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>✓ e2e/login-flow.spec.ts (desktop &amp; mobile viewports)</span>
                          <span className="text-emerald-400 font-bold">140ms</span>
                        </div>
                      </div>
                      <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[9px] text-slate-400">
                        <span>Test Coverage: 94.6%</span>
                        <span className="text-emerald-400">All checks green for deployment!</span>
                      </div>
                    </div>
                  ) : step.visualType === "deployment_pipeline" ? (
                    /* CI/CD Deployment Pipeline */
                    <div className="p-3 rounded-xl bg-black/60 border border-cyan-500/30 font-mono text-xs space-y-2">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-cyan-400 font-bold">GITHUB ACTIONS CI/CD PIPELINE</span>
                        <span className="text-emerald-400 font-bold">LIVE ON PRODUCTION</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                        <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          1. Lint &amp; Test ✓
                        </div>
                        <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          2. Build Assets ✓
                        </div>
                        <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          3. Edge Deploy ✓
                        </div>
                        <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          4. SSL HTTPS ✓
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Launch Celebration */
                    <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-cyan-950/40 to-indigo-950/40 border border-emerald-500/40 text-center font-mono space-y-2">
                      <span className="text-xs uppercase font-bold text-emerald-400 flex items-center justify-center gap-1.5">
                        <Rocket className="w-4 h-4 text-emerald-400 animate-bounce" />
                        APPLICATION OFFICIALLY LIVE!
                      </span>
                      <p className="text-xs text-slate-300 font-sans">
                        Users are actively creating accounts, purchasing, and interacting in real-time.
                      </p>
                      <div className="flex items-center justify-center gap-4 text-[10px] text-cyan-300 pt-1">
                        <span>Uptime: 99.98%</span>
                        <span>•</span>
                        <span>Response Time: 42ms</span>
                        <span>•</span>
                        <span>Sentry Errors: 0</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ── KEY DELIVERABLES & TOOLS USED ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Deliverables */}
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Key Deliverables</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
                    {step.keyDeliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tools Used */}
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-200">
                    <Wrench className="w-4 h-4 text-cyan-400" />
                    <span>Industry Tools Used</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {step.toolsUsed.map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-cyan-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── MODAL FOOTER ── */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400 shrink-0">
              <span>Use Left/Right arrows to flip through steps</span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
