"use client";

import React, { useState } from "react";
import {
  teachersSlideContent,
  type TeachersSlideContent,
  type TeacherProfile,
} from "@/content/teachers";
import { SlideHeader } from "@/components/common/SlideHeader";
import { SlideBackground } from "@/components/common/decorations/SlideBackground";
import {
  WebBrowserBar,
  WebLightingConduit,
  WebTechBadgesRow,
  FloatingWebDecorations,
} from "./TeachersSlideDecorations";
import { TeacherSpotlightModal } from "./TeacherSpotlightModal";
import {
  GraduationCap,
  Briefcase,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Maximize2,
  Code2,
  Zap,
} from "lucide-react";

export interface TeachersSlideProps {
  content?: TeachersSlideContent;
  onNextSlide?: () => void;
  className?: string;
}

export function TeachersSlide({
  content = teachersSlideContent,
  className = "",
}: TeachersSlideProps) {
  const [teacher1, teacher2] = content.teachers;
  const [spotlightTeacher, setSpotlightTeacher] = useState<TeacherProfile | null>(null);

  const handlePrevMentor = () => {
    if (!spotlightTeacher) return;
    const idx = content.teachers.findIndex((t) => t.id === spotlightTeacher.id);
    const prevIdx = (idx - 1 + content.teachers.length) % content.teachers.length;
    setSpotlightTeacher(content.teachers[prevIdx]);
  };

  const handleNextMentor = () => {
    if (!spotlightTeacher) return;
    const idx = content.teachers.findIndex((t) => t.id === spotlightTeacher.id);
    const nextIdx = (idx + 1) % content.teachers.length;
    setSpotlightTeacher(content.teachers[nextIdx]);
  };

  return (
    <section
      aria-label={content.title}
      className={`relative h-screen max-h-screen w-full flex flex-col bg-[var(--bg-deep-navy)] overflow-hidden select-none ${className}`}
    >
      {/* Ambient Dotted Matrix Background with Cyan & Indigo Glows */}
      <SlideBackground
        theme="default"
        slideTag="SLIDE_01 // INSTRUCTORS"
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

      {/* Floating Ambient Web Code Emblems */}
      <FloatingWebDecorations />

      {/* Top Slide Header with Subtitle and Quick Spotlight Prompt */}
      <SlideHeader
        title={content.title}
        eyebrow={content.eyebrow}
        subtitle={content.subtitle}
        slideNumber={content.slideNumber}
        accent="cyan"
        rightContent={
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-cyan)] animate-pulse" />
            <span>Click any mentor to open interactive spotlight</span>
          </div>
        }
      />

      {/* Main Slide Content Area: Responsive, Clean, Perfectly Proportioned */}
      <div className="relative z-10 flex-1 min-h-0 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-2 sm:py-3 flex flex-col justify-between gap-2.5 sm:gap-3.5 overflow-y-auto lg:overflow-hidden">
        {/* ── 1. ACTIVE WEB BROWSER DEVTOOLS BAR ── */}
        <div className="shrink-0 w-full">
          <WebBrowserBar />
        </div>

        {/* ── 2. CENTER STAGE: RESPONSIVE BALANCED TEACHER CARDS FLANKING WEB LIGHTING CONDUIT ── */}
        <div className="flex-1 min-h-0 w-full flex items-center justify-center py-1">
          <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center justify-items-center gap-4 lg:gap-6">
            {/* INSTRUCTOR 1: LOUAHCHI MOHAMED */}
            {teacher1 && (
              <div className="w-full flex justify-center">
                <TeacherCard
                  teacher={teacher1}
                  onOpenSpotlight={() => setSpotlightTeacher(teacher1)}
                />
              </div>
            )}

            {/* CONNECTIVE WEB CONDUIT & PHOTON STREAM */}
            <div className="hidden md:flex items-center justify-center h-full px-1">
              <WebLightingConduit />
            </div>

            {/* INSTRUCTOR 2: BENALI NAZIM */}
            {teacher2 && (
              <div className="w-full flex justify-center">
                <TeacherCard
                  teacher={teacher2}
                  onOpenSpotlight={() => setSpotlightTeacher(teacher2)}
                />
              </div>
            )}
          </div>
        </div>

        {/* ── 3. BOTTOM WEB TECH BADGES LIGHTING ROW ── */}
        <div className="shrink-0 w-full pt-1">
          <WebTechBadgesRow />
        </div>
      </div>

      {/* Cinematic Mentor Spotlight Modal */}
      <TeacherSpotlightModal
        teacher={spotlightTeacher}
        isOpen={Boolean(spotlightTeacher)}
        onClose={() => setSpotlightTeacher(null)}
        onPrevTeacher={handlePrevMentor}
        onNextTeacher={handleNextMentor}
        hasMultiple={content.teachers.length > 1}
      />
    </section>
  );
}

/**
 * Responsive, High-Tech Teacher Card
 * Well-proportioned, illuminated with modern web styling, not overly big
 */
function TeacherCard({
  teacher,
  onOpenSpotlight,
}: {
  teacher: TeacherProfile;
  onOpenSpotlight: () => void;
}) {
  const isCyan = teacher.accent === "cyan";

  const accentColorClass = isCyan
    ? "text-[var(--accent-cyan)] border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan)]/10"
    : "text-[var(--action-indigo)] border-[var(--action-indigo)]/30 bg-[var(--action-indigo)]/10";

  const glowHoverClass = isCyan
    ? "hover:border-[var(--accent-cyan)]/50 hover:shadow-[0_16px_40px_-8px_rgba(6,182,212,0.3)]"
    : "hover:border-[var(--action-indigo)]/50 hover:shadow-[0_16px_40px_-8px_rgba(99,102,241,0.35)]";

  const topGlowLine = isCyan
    ? "via-[var(--accent-cyan)]"
    : "via-[var(--action-indigo)]";

  const iconColor = isCyan ? "text-[var(--accent-cyan)]" : "text-[var(--action-indigo)]";

  return (
    <article
      onClick={onOpenSpotlight}
      className={`relative w-full max-w-[460px] rounded-2xl p-3.5 sm:p-4 md:p-4.5 backdrop-blur-xl bg-[#091124]/80 border border-white/10 shadow-[0_12px_36px_0_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 ${glowHoverClass} group flex flex-col justify-between gap-3 cursor-pointer overflow-hidden`}
    >
      {/* Top subtle neon glow accent line */}
      <div
        aria-hidden="true"
        className={`absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent ${topGlowLine} to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {/* HEADER: AVATAR WITH NEON WEB ORBIT + NAME & STUDY LEVEL */}
      <div className="flex items-center gap-3 sm:gap-3.5 shrink-0">
        {/* Circular Avatar with Glowing Ring */}
        <div className="relative shrink-0 group/avatar">
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 ${
              isCyan
                ? "border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.45)]"
                : "border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.45)]"
            } bg-black/50`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={teacher.imageSrc}
              alt={teacher.imageAlt}
              className="w-full h-full object-cover object-top group-hover/avatar:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Glowing Active Status Pulse */}
          <span
            className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-[#091124] ${
              isCyan
                ? "bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                : "bg-indigo-400 shadow-[0_0_8px_#818cf8]"
            }`}
          />
        </div>

        {/* Name, Role & Degree */}
        <div className="flex flex-col min-w-0 justify-center flex-1">
          <div className="flex items-center justify-between gap-1">
            <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-white group-hover:text-cyan-300 transition-colors truncate">
              {teacher.fullName}
            </h3>

            {/* Quick Spotlight Button */}
            <span className="shrink-0 p-1 px-1.5 rounded-md bg-white/5 hover:bg-white/15 text-slate-400 group-hover:text-white border border-white/5 transition-all text-[10px] font-mono flex items-center gap-1">
              <Maximize2 className="w-2.5 h-2.5 text-cyan-400" />
              <span className="hidden sm:inline">Bio</span>
            </span>
          </div>

          {/* Study Level Pill */}
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide border ${accentColorClass}`}
            >
              <GraduationCap className="w-3 h-3 shrink-0" />
              <span className="truncate">{teacher.studyLevel}</span>
            </span>
          </div>

          {/* Role */}
          <span className="text-[11px] sm:text-xs text-slate-300 font-medium mt-0.5 flex items-center gap-1 truncate">
            <Code2 className="w-3 h-3 text-cyan-400 shrink-0" />
            <span className="truncate">{teacher.role}</span>
          </span>
        </div>
      </div>

      {/* CARD BODY: EXPERIENCE & BIO SUMMARY */}
      <div className="rounded-xl p-2.5 sm:p-3 bg-black/40 border border-white/10 flex flex-col gap-2 shadow-inner">
        {/* Title */}
        <div className="flex items-center justify-between border-b border-white/5 pb-1">
          <div className="flex items-center gap-1.5">
            <Briefcase className={`w-3.5 h-3.5 ${iconColor} shrink-0`} />
            <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-200">
              {teacher.combinedExperienceAndProjects.title}
            </h4>
          </div>
          <span className="text-[9px] font-mono text-cyan-400 flex items-center gap-0.5">
            <Zap className="w-2.5 h-2.5" />
            <span>Verified</span>
          </span>
        </div>

        {/* Summary Description */}
        <p className="text-xs sm:text-[13px] font-normal leading-relaxed text-slate-100 line-clamp-2">
          {teacher.combinedExperienceAndProjects.summary}
        </p>

        {/* 2 Key Highlights */}
        <ul className="space-y-1">
          {teacher.combinedExperienceAndProjects.highlights.slice(0, 2).map((highlight, idx) => (
            <li
              key={idx}
              className="flex items-start gap-1.5 text-[10px] sm:text-[11px] text-slate-300 leading-snug line-clamp-1"
            >
              <CheckCircle2 className={`w-3 h-3 shrink-0 mt-0.5 ${iconColor}`} />
              <span className="truncate">{highlight}</span>
            </li>
          ))}
        </ul>

        {/* Web Stack Tags */}
        <div className="flex flex-wrap gap-1 pt-1.5 border-t border-white/5">
          {teacher.combinedExperienceAndProjects.tags.slice(0, 5).map((tag, tIdx) => (
            <span
              key={tIdx}
              className="px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-300 bg-white/5 border border-white/5 group-hover:border-cyan-400/20 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* FOOTER: SOCIAL PROFILES & PORTFOLIO TRIGGER */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="pt-1 border-t border-white/5 flex items-center justify-between gap-2 shrink-0"
      >
        {/* Left: GitHub & LinkedIn */}
        <div className="flex items-center gap-1.5">
          {teacher.githubUrl && (
            <a
              href={teacher.githubUrl}
              target="_blank"
              rel="noreferrer"
              title="GitHub Profile"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white border border-white/5 hover:border-white/20 transition-all cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          )}

          {teacher.linkedinUrl && (
            <a
              href={teacher.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              title="LinkedIn Profile"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-400 hover:text-[#0A66C2] border border-white/5 hover:border-[#0A66C2]/40 transition-all cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          )}
        </div>

        {/* Right: Portfolio Link or Spotlight Modal Trigger */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onOpenSpotlight}
            className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 transition-all cursor-pointer flex items-center gap-1"
          >
            <Maximize2 className="w-3 h-3 text-cyan-400" />
            <span>Spotlight</span>
          </button>

          {teacher.portfolioUrl && (
            <a
              href={teacher.portfolioUrl}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold shadow-md transition-all hover:opacity-95 hover:scale-[1.02] cursor-pointer ${
                isCyan
                  ? "bg-cyan-500 text-[#0F172A] shadow-[0_0_12px_rgba(6,182,212,0.35)]"
                  : "bg-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.35)]"
              }`}
            >
              <span>Portfolio</span>
              <ExternalLink className="w-3 h-3 stroke-[2.5]" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
