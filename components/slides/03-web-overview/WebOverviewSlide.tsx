"use client";

import { useState, useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import {
  webOverviewContent,
  type WebOverviewContent,
  type WebsiteTypeItem,
} from "@/content/web-overview";
import { SectionTitle } from "@/components/common/SectionTitle";
import { MediaCard } from "@/components/common/MediaCard";
import { MediaModal } from "@/components/common/MediaModal";
import { SlideHeader } from "@/components/common/SlideHeader";
import { SlideBackground } from "@/components/common/decorations/SlideBackground";
import { WebOverviewDecorations } from "./WebOverviewDecorations";
import { ArrowRight, HelpCircle, Sparkles, ChevronsRight } from "lucide-react";

export interface WebOverviewSlideProps {
  content?: WebOverviewContent;
  onNextSlide?: () => void;
  className?: string;
}

export function WebOverviewSlide({
  content = webOverviewContent,
  onNextSlide,
  className = "",
}: WebOverviewSlideProps) {
  const [selectedType, setSelectedType] = useState<WebsiteTypeItem | null>(null);
  const [isSlideCompleted, setIsSlideCompleted] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const maxDragDistance = 210; // max slider track travel distance in pixels

  // Trigger next slide transition
  const triggerSlideComplete = () => {
    if (isSlideCompleted) return;
    setIsSlideCompleted(true);
    // Slide transition triggers as screen finishes following the arrow
    setTimeout(() => {
      if (onNextSlide) onNextSlide();
    }, 600);
  };

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const progress = Math.min(Math.max(info.offset.x / maxDragDistance, 0), 1);
    setDragProgress(progress);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // If dragged more than 50% across the track or flicked with rightward velocity
    if (info.offset.x > maxDragDistance * 0.5 || info.velocity.x > 300) {
      triggerSlideComplete();
    } else {
      setDragProgress(0);
    }
  };

  return (
    <section
      aria-label={content.title}
      className={`relative min-h-screen w-full flex flex-col bg-[var(--bg-deep-navy)] overflow-hidden ${className}`}
    >
      {/* Sleek Dotted Pattern Background with Ambient Orbs */}
      <SlideBackground
        theme="cyan"
        slideTag="SLIDE_03 // TAXONOMY"
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
            size: "w-[38rem] h-[38rem]",
            opacity: "opacity-15",
          },
          {
            color: "amber",
            position: "center",
            size: "w-[28rem] h-[28rem]",
            opacity: "opacity-5",
          },
        ]}
      />

      {/* Technology Vector Decorations */}
      <WebOverviewDecorations />

      {/* Top Header Bar */}
      <SlideHeader
        title={content.title}
        eyebrow={content.eyebrow}
        slideNumber={content.badge}
        accent="cyan"
      />

      {/* Slide Content Body - Slides to the left following the arrow when slide is completed */}
      <motion.div
        animate={
          isSlideCompleted
            ? {
              x: "-100%",
              opacity: [1, 0.9, 0],
            }
            : {
              x: 0,
              opacity: 1,
            }
        }
        transition={{
          duration: 0.65,
          ease: [0.25, 0.1, 0.25, 1.0], // smooth curve so screen follows the arrow
        }}
        className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 py-8 sm:px-10 md:px-16 md:py-12 flex flex-col gap-10"
      >
        {/* Intro Banner */}
        <div className="rounded-2xl p-6 sm:p-8 backdrop-blur-xl bg-[var(--cards-charcoal)]/40 border border-white/5 shadow-xl">
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-4xl">
            {content.description}
          </p>
        </div>

        {/* Types of Websites Section */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)]" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {content.typesSectionHeading}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-400 max-w-3xl">
              {content.typesSectionSubtitle}
            </p>
          </div>

          {/* Cards Grid with click-to-pop-up and hover zoom */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.types.map((type) => (
              <MediaCard
                key={type.id}
                title={type.title}
                subtitle={type.subtitle}
                description={type.description}
                tags={type.tags}
                accent={type.accent}
                imageSrc={type.imageSrc}
                imageAlt={type.imageAlt ?? type.title}
                placeholderLabel={type.placeholderLabel}
                onMediaClick={() => setSelectedType(type)}
              />
            ))}
          </div>
        </div>

        {/* Question & "Slide the Arrow to Explore" Interactive Track Banner */}
        <div className="rounded-2xl p-6 sm:p-8 backdrop-blur-xl bg-[var(--cards-charcoal)]/55 border border-white/10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden group">
          {/* Subtle top glow line */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-cyan)] to-transparent opacity-70 group-hover:opacity-100 transition-opacity"
          />

          {/* Left: Question Teaser */}
          <div className="flex items-center gap-4 max-w-xl">
            <div className="w-12 h-12 rounded-xl bg-[var(--accent-cyan)]/15 border border-[var(--accent-cyan)]/30 flex items-center justify-center text-[var(--accent-cyan)] shrink-0 shadow-md">
              <HelpCircle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-[var(--accent-cyan)] flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3 h-3" />
                Next Step Teaser
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {content.footerTeaser.question}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                {content.footerTeaser.subquestion}
              </p>
            </div>
          </div>

          {/* Right: Interactive Slideable Arrow Track */}
          <div className="flex flex-col items-center sm:items-end gap-2 shrink-0">
            {/* The Slider Track */}
            <div
              ref={trackRef}
              className="relative w-72 sm:w-80 h-14 rounded-full bg-[var(--bg-deep-navy)]/90 border border-white/10 p-1.5 flex items-center shadow-inner overflow-hidden select-none"
            >
              {/* Dynamic Progress Fill Following the Arrow */}
              <div
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[var(--action-indigo)]/40 to-[var(--accent-cyan)]/40 rounded-full transition-all pointer-events-none"
                style={{
                  width: `${Math.max(dragProgress * 100, 15)}%`,
                }}
              />

              {/* Background Track Hint Text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none pl-12 pr-4 text-xs font-semibold text-slate-400 tracking-wider uppercase">
                <span className="flex items-center gap-1.5 animate-pulse">
                  {content.footerTeaser.buttonText}
                  <ChevronsRight className="w-4 h-4 text-[var(--accent-cyan)]" />
                </span>
              </div>

              {/* Slideable Draggable Arrow Knob */}
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: maxDragDistance }}
                dragElastic={0.1}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                onClick={triggerSlideComplete}
                animate={
                  isSlideCompleted
                    ? {
                      x: ["0px", "200px", "100vw"],
                      opacity: [1, 1, 0],
                      scale: [1, 1.3, 1.8],
                    }
                    : undefined
                }
                transition={
                  isSlideCompleted
                    ? { duration: 0.65, ease: [0.25, 0.1, 0.25, 1.0] }
                    : undefined
                }
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="z-20 cursor-grab active:cursor-grabbing w-11 h-11 rounded-full bg-gradient-to-r from-[var(--action-indigo)] to-[var(--accent-cyan)] text-white flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.6)] border border-white/30 shrink-0"
              >
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </motion.div>
            </div>

            {/* Instruction Cue */}
            <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
              <span>Slide arrow right to explore</span>
              <ArrowRight className="w-3 h-3 text-[var(--accent-cyan)]" />
            </span>
          </div>
        </div>
      </motion.div>

      {/* Pop-up Lightbox Modal */}
      {selectedType && (
        <MediaModal
          isOpen={true}
          onClose={() => setSelectedType(null)}
          title={selectedType.title}
          subtitle={selectedType.subtitle}
          description={selectedType.description}
          tags={selectedType.tags}
          accent={selectedType.accent}
          imageSrc={selectedType.imageSrc}
          imageAlt={selectedType.imageAlt ?? selectedType.title}
          placeholderLabel={selectedType.placeholderLabel}
        />
      )}
    </section>
  );
}
