"use client";

import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TeacherProfile } from "@/content/teachers";
import {
  X,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export interface TeacherSpotlightModalProps {
  teacher: TeacherProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onPrevTeacher?: () => void;
  onNextTeacher?: () => void;
  hasMultiple?: boolean;
}

export function TeacherSpotlightModal({
  teacher,
  isOpen,
  onClose,
  onPrevTeacher,
  onNextTeacher,
  hasMultiple = true,
}: TeacherSpotlightModalProps) {
  // Handle ESC and Arrow keys for smooth keyboard control
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && onPrevTeacher) {
        onPrevTeacher();
      } else if (e.key === "ArrowRight" && onNextTeacher) {
        onNextTeacher();
      }
    },
    [isOpen, onClose, onPrevTeacher, onNextTeacher]
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

  if (!teacher) return null;

  const isCyan = teacher.accent === "cyan";
  const accentColorClass = isCyan
    ? "text-[var(--accent-cyan)] border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan)]/10"
    : "text-[var(--action-indigo)] border-[var(--action-indigo)]/30 bg-[var(--action-indigo)]/10";

  const glowShadow = isCyan
    ? "shadow-[0_0_50px_rgba(6,182,212,0.25)]"
    : "shadow-[0_0_50px_rgba(99,102,241,0.25)]";

  const avatarBorder = isCyan
    ? "border-[var(--accent-cyan)] shadow-[0_0_25px_rgba(6,182,212,0.5)]"
    : "border-[var(--action-indigo)] shadow-[0_0_25px_rgba(99,102,241,0.5)]";

  const buttonGradient = isCyan
    ? "bg-[var(--accent-cyan)] text-[#0F172A] shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_28px_rgba(6,182,212,0.6)]"
    : "bg-[var(--action-indigo)] text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_28px_rgba(99,102,241,0.6)]";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="teacher-spotlight-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl"
        >
          {/* Spotlight Modal Dialog */}
          <motion.div
            key={`spotlight-card-${teacher.id}`}
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-3xl rounded-3xl bg-[var(--cards-charcoal)]/95 border border-white/20 p-5 sm:p-8 ${glowShadow} overflow-hidden max-h-[92vh] flex flex-col`}
          >
            {/* Top decorative animated accent line */}
            <div
              className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                isCyan
                  ? "from-transparent via-[var(--accent-cyan)] to-transparent"
                  : "from-transparent via-[var(--action-indigo)] to-transparent"
              }`}
            />

            {/* Header: Navigation Arrows + Close Button */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-white/5 border border-white/10 text-slate-300">
                  <Sparkles className={`w-3.5 h-3.5 ${isCyan ? "text-[var(--accent-cyan)]" : "text-[var(--action-indigo)]"}`} />
                  Mentor Spotlight
                </span>
                <span className={`text-xs font-mono px-2 py-0.5 rounded border ${accentColorClass}`}>
                  {teacher.badge}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {hasMultiple && (
                  <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                    <button
                      onClick={onPrevTeacher}
                      className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                      title="Previous mentor (Left arrow)"
                      aria-label="Previous mentor"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={onNextTeacher}
                      className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                      title="Next mentor (Right arrow)"
                      aria-label="Next mentor"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 transition-all cursor-pointer"
                  title="Close spotlight (Esc)"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Scrollable if viewport is tiny */}
            <div className="flex-1 overflow-y-auto pr-1 py-4 space-y-6">
              {/* Profile Intro Row */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                {/* Large Avatar */}
                <div className="relative shrink-0">
                  <div
                    className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-3 ${avatarBorder} bg-black/40`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={teacher.imageSrc}
                      alt={teacher.imageAlt}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <span
                    className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-[var(--cards-charcoal)] ${
                      isCyan ? "bg-[var(--accent-cyan)] shadow-[0_0_10px_var(--accent-cyan)]" : "bg-[var(--action-indigo)] shadow-[0_0_10px_var(--action-indigo)]"
                    }`}
                  />
                </div>

                {/* Name, Study & Role */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1.5 min-w-0 flex-1">
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    {teacher.fullName}
                  </h3>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-0.5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border ${accentColorClass}`}
                    >
                      <GraduationCap className="w-4 h-4 shrink-0" />
                      <span>{teacher.studyLevel}</span>
                    </span>

                    <span className="text-xs sm:text-sm font-medium text-slate-300 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                      {teacher.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* HUGE, PROMINENT DESCRIPTION TEXT (User's primary request) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 shadow-inner">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className={`w-4 h-4 ${isCyan ? "text-[var(--accent-cyan)]" : "text-[var(--action-indigo)]"}`} />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
                    {teacher.combinedExperienceAndProjects.title}
                  </span>
                </div>

                {/* Enlarged high-impact description text */}
                <p className="text-base sm:text-lg md:text-xl font-medium text-slate-100 leading-relaxed">
                  {teacher.combinedExperienceAndProjects.summary}
                </p>
              </div>

              {/* Full Highlights & Achievements */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                  Key Projects &amp; Expertise Highlights
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {teacher.combinedExperienceAndProjects.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-colors"
                    >
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          isCyan ? "text-[var(--accent-cyan)]" : "text-[var(--action-indigo)]"
                        }`}
                      />
                      <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Tags in Spotlight */}
              <div>
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Technologies &amp; Domain Focus
                </h4>
                <div className="flex flex-wrap gap-2">
                  {teacher.combinedExperienceAndProjects.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg text-xs font-mono text-slate-200 bg-white/[0.06] border border-white/10 hover:border-[var(--accent-cyan)]/40 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer: Social & Portfolio Links */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 shrink-0">
              {/* GitHub & LinkedIn */}
              <div className="flex items-center gap-2">
                {teacher.githubUrl && (
                  <a
                    href={teacher.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 transition-all text-xs font-mono font-medium"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>GitHub</span>
                  </a>
                )}

                {teacher.linkedinUrl && (
                  <a
                    href={teacher.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-[#0A66C2] border border-white/10 transition-all text-xs font-mono font-medium"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>

              {/* Portfolio Link */}
              {teacher.portfolioUrl && (
                <a
                  href={teacher.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${buttonGradient}`}
                >
                  <span>Explore Portfolio</span>
                  <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

