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
  TeachersCenterConnector,
  TeachersTerminalWidget,
  TeachersCloudWidget,
} from "./TeachersSlideDecorations";
import { TeacherSpotlightModal } from "./TeacherSpotlightModal";
import {
  GraduationCap,
  Briefcase,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Maximize2,
  ZoomIn,
  ZoomOut,
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
      {/* Sleek Dotted Pattern Background with Ambient Orbs and Technical Crosshairs */}
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
            opacity: "opacity-5",
          },
        ]}
      />

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
            <span>Click any card to spotlight &amp; enlarge</span>
          </div>
        }
      />

      {/* Main Slide Content Area: Fits viewport height seamlessly without vertical scrollbar */}
      <div className="relative z-10 flex-1 min-h-0 w-full max-w-[94vw] mx-auto px-4 sm:px-6 md:px-10 py-2 sm:py-3 flex flex-col justify-center overflow-hidden">
        {/* 3x3 Grid Layout: Col 1 & 3 equal, Col 2 narrower; 3 equal-height rows */}
        <div className="flex-1 min-h-0 w-full grid grid-cols-1 md:grid-cols-[1fr_0.42fr_1fr] md:grid-rows-3 md:[grid-template-rows:repeat(3,minmax(0,1fr))] gap-2.5 lg:gap-3.5 items-stretch overflow-hidden pb-1">
          {/* CARD 1: Column 1, Spans Row 1 and Row 2 (Top Left) */}
          {teacher1 && (
            <div className="md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-3 flex flex-col justify-start w-full h-full min-h-0 overflow-hidden">
              <TeacherCard
                teacher={teacher1}
                onOpenSpotlight={() => setSpotlightTeacher(teacher1)}
              />
            </div>
          )}

          {/* DECORATIVE WIDGET: Column 1, Row 3 (Directly under Mohamed's Card) */}
          <div className="md:col-start-1 md:col-end-2 md:row-start-3 md:row-end-4 flex flex-col justify-center w-full h-full min-h-0 overflow-hidden">
            <TeachersTerminalWidget />
          </div>

          {/* DECORATIVE CENTER CONNECTOR: Column 2, Spans Row 1 to Row 4 */}
          <div className="md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-4 flex flex-col justify-center w-full h-full min-h-0 overflow-hidden">
            <TeachersCenterConnector />
          </div>

          {/* DECORATIVE WIDGET: Column 3, Row 1 (Directly above Nazim's Card) */}
          <div className="md:col-start-3 md:col-end-4 md:row-start-1 md:row-end-2 flex flex-col justify-center w-full h-full min-h-0 overflow-hidden">
            <TeachersCloudWidget />
          </div>

          {/* CARD 2: Column 3, Spans Row 2 and Row 3 (Bottom Right) */}
          {teacher2 && (
            <div className="md:col-start-3 md:col-end-4 md:row-start-2 md:row-end-4 flex flex-col justify-end w-full h-full min-h-0 overflow-hidden">
              <TeacherCard
                teacher={teacher2}
                onOpenSpotlight={() => setSpotlightTeacher(teacher2)}
              />
            </div>
          )}
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

function TeacherCard({
  teacher,
  onOpenSpotlight,
}: {
  teacher: TeacherProfile;
  onOpenSpotlight: () => void;
}) {
  const [isTextZoomed, setIsTextZoomed] = useState(false);
  const isCyan = teacher.accent === "cyan";

  const accentColorClass = isCyan
    ? "text-[var(--accent-cyan)] border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan)]/10"
    : "text-[var(--action-indigo)] border-[var(--action-indigo)]/30 bg-[var(--action-indigo)]/10";

  const glowHoverClass = isCyan
    ? "hover:border-[var(--accent-cyan)]/40 hover:shadow-[0_16px_40px_-8px_rgba(6,182,212,0.22)]"
    : "hover:border-[var(--action-indigo)]/40 hover:shadow-[0_16px_40px_-8px_rgba(99,102,241,0.26)]";

  const topGlowLine = isCyan
    ? "via-[var(--accent-cyan)]"
    : "via-[var(--action-indigo)]";

  const iconColor = isCyan ? "text-[var(--accent-cyan)]" : "text-[var(--action-indigo)]";

  return (
    <article
      className={`relative w-full h-full max-h-full rounded-2xl p-3.5 sm:p-4 md:p-5 backdrop-blur-xl bg-[var(--cards-charcoal)]/60 border border-white/10 shadow-[0_12px_36px_0_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-0.5 ${glowHoverClass} group flex flex-col justify-between overflow-hidden`}
    >
      {/* Top subtle glow accent line */}
      <div
        aria-hidden="true"
        className={`absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent ${topGlowLine} to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {/* TOP CONTENT WRAPPER */}
      <div className="flex flex-col min-h-0 overflow-hidden">
        {/* HEADER: CIRCLE IMAGE ON LEFT + NAME & EDUCATION BESIDE IT */}
        <div className="flex items-center gap-3 sm:gap-3.5 mb-2.5 sm:mb-3 shrink-0">
          {/* CIRCULAR AVATAR WITH GLOW RING */}
          <div
            onClick={onOpenSpotlight}
            className="relative shrink-0 cursor-pointer group/avatar"
            title="Click to spotlight mentor"
          >
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 ${
                isCyan
                  ? "border-[var(--accent-cyan)] shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  : "border-[var(--action-indigo)] shadow-[0_0_15px_rgba(99,102,241,0.4)]"
              } bg-black/40`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={teacher.imageSrc}
                alt={teacher.imageAlt}
                className="w-full h-full object-cover object-top group-hover/avatar:scale-110 transition-transform duration-500"
              />
            </div>
            {/* Online / Active status dot */}
            <span
              className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-[var(--cards-charcoal)] ${
                isCyan ? "bg-[var(--accent-cyan)] shadow-[0_0_8px_var(--accent-cyan)]" : "bg-[var(--action-indigo)] shadow-[0_0_8px_var(--action-indigo)]"
              }`}
            />
          </div>

          {/* BESIDE AVATAR: FULL NAME & EDUCATION */}
          <div className="flex flex-col min-w-0 justify-center flex-1">
            <div className="flex items-center justify-between gap-1">
              <h3
                onClick={onOpenSpotlight}
                className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[var(--accent-cyan)] transition-all truncate cursor-pointer"
                title="Click to view full bio"
              >
                {teacher.fullName}
              </h3>

              {/* Spotlight quick button */}
              <button
                onClick={onOpenSpotlight}
                className="shrink-0 p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white border border-white/5 transition-all text-[10px] font-mono flex items-center gap-1 cursor-pointer"
                title="Open Spotlight modal"
                aria-label={`Spotlight ${teacher.fullName}`}
              >
                <Maximize2 className="w-3 h-3" />
                <span className="hidden sm:inline">Spotlight</span>
              </button>
            </div>

            {/* Current Study Level: Master 2 Informatique */}
            <div className="flex items-center gap-1.5 mt-1">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wide border ${accentColorClass}`}
              >
                <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{teacher.studyLevel}</span>
              </span>
            </div>

            {/* Role */}
            <span className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1 truncate">
              {teacher.role}
            </span>
          </div>
        </div>

        {/* ONE UNIFIED BLOCK FOR EXPERIENCE & PROJECTS WITH ENLARGED DESCRIPTION & IN-CARD ZOOM */}
        <div className="rounded-xl p-2.5 sm:p-3 bg-black/30 border border-white/10 flex flex-col gap-2 overflow-hidden shadow-inner">
          {/* Block Header with In-Card Text Zoom Toggle and Modal Trigger */}
          <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-1.5">
            <div
              onClick={onOpenSpotlight}
              className="flex items-center gap-1.5 cursor-pointer group/title"
              title="Click to spotlight"
            >
              <Briefcase className={`w-3.5 h-3.5 ${iconColor} shrink-0`} />
              <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-200 group-hover/title:text-white transition-colors">
                {teacher.combinedExperienceAndProjects.title}
              </h4>
            </div>

            {/* In-Card Font Zoom / Modal Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsTextZoomed((prev) => !prev);
                }}
                className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold border transition-all flex items-center gap-1 cursor-pointer ${
                  isTextZoomed
                    ? isCyan
                      ? "bg-[var(--accent-cyan)]/25 text-[var(--accent-cyan)] border-[var(--accent-cyan)]/50"
                      : "bg-[var(--action-indigo)]/25 text-[var(--action-indigo)] border-[var(--action-indigo)]/50"
                    : "bg-white/5 text-slate-400 hover:text-white border-white/10"
                }`}
                title={isTextZoomed ? "Reset text size" : "Enlarge text in card"}
              >
                {isTextZoomed ? (
                  <>
                    <ZoomOut className="w-2.5 h-2.5" />
                    <span>A-</span>
                  </>
                ) : (
                  <>
                    <ZoomIn className="w-2.5 h-2.5" />
                    <span>A+</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* PROMINENT DESCRIPTION TEXT (Clickable to enlarge/spotlight) */}
          <div
            onClick={onOpenSpotlight}
            className="group/desc p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-[var(--accent-cyan)]/30 transition-all cursor-pointer relative"
            title="Click to view full spotlight"
          >
            <p
              className={`text-slate-100 transition-all duration-200 ${
                isTextZoomed
                  ? "text-xs sm:text-sm md:text-[15px] font-medium leading-relaxed"
                  : "text-xs sm:text-[13px] font-normal leading-relaxed line-clamp-3 sm:line-clamp-2"
              }`}
            >
              {teacher.combinedExperienceAndProjects.summary}
            </p>

            <span className="opacity-0 group-hover/desc:opacity-100 transition-opacity absolute right-1.5 bottom-1 text-[9px] font-mono text-[var(--accent-cyan)]">
              Click to enlarge ↗
            </span>
          </div>

          {/* Highlights */}
          <ul className="space-y-1 overflow-hidden">
            {teacher.combinedExperienceAndProjects.highlights.slice(0, isTextZoomed ? 2 : 3).map((highlight, idx) => (
              <li
                key={idx}
                className="flex items-start gap-1.5 text-[10px] sm:text-[11px] text-slate-300 leading-snug line-clamp-1"
              >
                <CheckCircle2
                  className={`w-3 h-3 shrink-0 mt-0.5 ${iconColor}`}
                />
                <span className="truncate">{highlight}</span>
              </li>
            ))}
          </ul>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1 pt-1.5 border-t border-white/5">
            {teacher.combinedExperienceAndProjects.tags.slice(0, 5).map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-300 bg-white/5 border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CARD FOOTER: LEFT = LINKEDIN & GITHUB, RIGHT = PORTFOLIO BUTTON */}
      <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between gap-2 shrink-0">
        {/* Left Bottom: GitHub & LinkedIn Icon Buttons */}
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

        {/* Right Bottom: Portfolio Button */}
        {teacher.portfolioUrl && (
          <a
            href={teacher.portfolioUrl}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md transition-all hover:opacity-95 hover:scale-[1.02] cursor-pointer ${
              isCyan
                ? "bg-[var(--accent-cyan)] text-[#0F172A] shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                : "bg-[var(--action-indigo)] text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]"
            }`}
          >
            <span>Portfolio</span>
            <ExternalLink className="w-3 h-3 stroke-[2.5]" />
          </a>
        )}
      </div>
    </article>
  );
}
