"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Sparkles, X, CheckCircle2, Bookmark, Lightbulb } from "lucide-react";

export interface FlashMemoryBadgeProps {
  title?: string;
  badgeLabel?: string;
  description?: string;
  points?: string[];
  className?: string;
}

export function FlashMemoryBadge({
  title = "Must Remember",
  badgeLabel = "KEY CONCEPT",
  description = "This slide contains foundational principles. Commit this architecture and data flow to memory — it is essential for real-world projects and technical interviews.",
  points,
  className = "",
}: FlashMemoryBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative inline-block ${className}`}>
      {/* ── Pill Trigger Button ── */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className={`group relative inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase border backdrop-blur-xl transition-all duration-300 cursor-pointer overflow-hidden select-none ${isOpen
          ? "bg-gradient-to-r from-orange-500/30 via-amber-500/30 to-orange-500/30 border-orange-400 text-white shadow-[0_0_25px_rgba(249,115,22,0.6)] ring-2 ring-orange-400/40"
          : "bg-gradient-to-r from-amber-500/15 via-orange-500/20 to-amber-500/15 hover:from-amber-500/25 hover:to-orange-500/30 border-orange-500/50 hover:border-orange-400 text-orange-200 hover:text-white shadow-[0_0_18px_rgba(249,115,22,0.35)]"
          }`}
        title="Click to open the Memory Flashcard for this slide"
      >
        {/* Shimmer sweep animation */}
        <motion.span
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{
            repeat: Infinity,
            repeatDelay: 3.5,
            duration: 1.4,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />

        {/* Brain icon with radar pulse */}
        <div className="relative flex items-center justify-center shrink-0">
          <span className="absolute inset-0 rounded-full bg-orange-400 opacity-30 animate-ping" />
          <div className="relative w-5 h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-[0_0_10px_rgba(249,115,22,0.8)]">
            <Brain className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Label */}
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] text-amber-300 tracking-widest font-black">{badgeLabel}</span>
          <span className="text-white text-[11px] font-sans font-extrabold normal-case tracking-normal">
            {title}
          </span>
        </div>

        {/* Sparkle suffix */}
        <Sparkles className="w-3 h-3 text-amber-300 animate-pulse group-hover:rotate-12 transition-transform shrink-0" />
      </motion.button>

      {/* ── Flashcard Dropdown ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Invisible click-outside overlay */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Card — drops down from the button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute top-full right-0 mt-2 z-50 w-[380px] sm:w-[420px] rounded-3xl bg-gradient-to-b from-[#181124] via-[#0E0C18] to-[#08070F] border-2 border-orange-500/60 shadow-[0_8px_60px_rgba(249,115,22,0.45)] p-5 sm:p-6 overflow-hidden text-left"
            >
              {/* Top ambient glow */}
              <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-orange-500/20 via-amber-500/10 to-transparent pointer-events-none" />

              {/* Header bar */}
              <div className="relative z-10 flex items-center justify-between pb-4 border-b border-orange-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(249,115,22,0.6)]">
                    <Brain className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-black text-amber-300 uppercase tracking-widest bg-orange-500/20 px-2 py-0.5 rounded-full border border-orange-500/40">
                        {badgeLabel}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">FLASHCARD</span>
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">{title}</h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="relative z-10 mt-4 space-y-4">
                <div className="p-3.5 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                    {description}
                  </p>
                </div>

                {points && points.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-orange-400 font-bold block">
                      Key Points to Memorize:
                    </span>
                    <div className="space-y-2">
                      {points.map((pt, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 p-2 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                    <Bookmark className="w-3.5 h-3.5 text-orange-400" />
                    <span>Essential for Web Dev</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-mono text-xs font-bold shadow-[0_0_20px_rgba(249,115,22,0.4)] cursor-pointer transition-all active:scale-95"
                  >
                    Got It! ✓
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
