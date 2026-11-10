"use client";

import { useState, useRef, useEffect, type MouseEvent, type UIEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PlatformDetails } from "@/content/web-vs-native";
import { SwipeSlider } from "@/components/common/SwipeSlider";

export interface ComparisonCardProps {
  platform: PlatformDetails;
  onMediaClick?: (index?: number) => void;
  onCtaClick?: () => void;
  scrollHint?: string;
  className?: string;
}

export function ComparisonCard({
  platform,
  onMediaClick,
  onCtaClick,
  scrollHint,
  className = "",
}: ComparisonCardProps) {
  // Normalize images
  const imageList =
    platform.images && platform.images.length > 0
      ? platform.images.map((img) =>
          typeof img === "string" ? { src: img, alt: platform.title } : img
        )
      : platform.imageSrc
      ? [{ src: platform.imageSrc, alt: platform.imageAlt ?? platform.title }]
      : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMultiple = imageList.length > 1;
  const currentImage = imageList[currentIndex];

  // Scroll detection to unlock the CTA on the web card
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    // If the content naturally fits without overflowing, unlock right away
    if (el.scrollHeight <= el.clientHeight + 15) {
      setHasScrolledToEnd(true);
    }
  }, []);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight <= 35) {
      setHasScrolledToEnd(true);
    }
  };

  const handleNext = (e: MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % imageList.length);
  };

  const handlePrev = (e: MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  const handleDotClick = (e: MouseEvent, index: number) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  const isCyan = platform.accent === "cyan";

  const accentColorClass = isCyan
    ? "text-[var(--accent-cyan)] border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan)]/10"
    : "text-[var(--action-indigo)] border-[var(--action-indigo)]/30 bg-[var(--action-indigo)]/10";

  const glowHoverClass = isCyan
    ? "hover:border-[var(--accent-cyan)]/40 hover:shadow-[0_20px_50px_-10px_rgba(6,182,212,0.2)]"
    : "hover:border-[var(--action-indigo)]/40 hover:shadow-[0_20px_50px_-10px_rgba(99,102,241,0.25)]";

  const topGlowLine = isCyan
    ? "via-[var(--accent-cyan)]"
    : "via-[var(--action-indigo)]";

  const dotBg = isCyan ? "bg-[var(--accent-cyan)]" : "bg-[var(--action-indigo)]";

  return (
    <article
      className={`group relative flex flex-col rounded-3xl p-6 sm:p-8 backdrop-blur-2xl bg-[var(--cards-charcoal)]/60 border border-white/10 shadow-[0_16px_40px_0_rgba(0,0,0,0.4)] transition-all duration-300 ${glowHoverClass} ${className}`}
    >
      {/* Top subtle glow accent line on hover */}
      <div
        aria-hidden="true"
        className={`absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent ${topGlowLine} to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {/* Header Eyebrow & Badges */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase border ${accentColorClass}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${dotBg} animate-pulse`} />
          <span className="opacity-75">{platform.badgeStep} ·</span>
          {platform.badge}
        </span>
      </div>

      {/* Title & Subtitle */}
      <div className="mb-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-1">
          {platform.title}
        </h2>
        <p className="text-xs sm:text-sm font-mono text-[var(--accent-cyan)]">
          {platform.subtitle}
        </p>
      </div>

      {/* Image / Mockup Preview Container with Zoom on hover & Pop-up on click */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => onMediaClick?.(currentIndex)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onMediaClick?.(currentIndex);
          }
        }}
        aria-label={`Open enlarged preview for ${platform.title}`}
        className="group/media relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-[var(--bg-deep-navy)]/90 border border-white/10 cursor-pointer shadow-inner focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)]"
      >
        {/* Multi-image counter pill */}
        {hasMultiple && (
          <div className="absolute top-3 left-3 z-20 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white flex items-center gap-1 shadow-md">
            <span>📷</span>
            <span>
              {currentIndex + 1}/{imageList.length}
            </span>
          </div>
        )}

        {/* Floating "Enlarge" indicator */}
        <div className="absolute top-3 right-3 z-20 opacity-0 group-hover/media:opacity-100 transition-all duration-200 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white flex items-center gap-1.5 shadow-lg translate-y-1 group-hover/media:translate-y-0">
          <svg
            className="w-3.5 h-3.5 text-[var(--accent-cyan)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
          <span>Enlarge</span>
        </div>

        {currentImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={currentImage.src}
            src={currentImage.src}
            alt={currentImage.alt ?? platform.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/media:scale-105"
          />
        ) : (
          /* High-Fidelity Themed Wireframe Mockup */
          <div className="w-full h-full p-4 flex flex-col justify-between transition-transform duration-500 ease-out group-hover/media:scale-105 bg-gradient-to-b from-white/[0.05] to-transparent">
            {/* Window bar */}
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                {isCyan ? "Browser Environment (PWA / Web)" : "Native OS Environment (Binary)"}
              </span>
            </div>

            {/* Visual Icon & Badge */}
            <div className="flex-1 flex flex-col items-center justify-center gap-2 py-3 text-center">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-lg ${
                  isCyan
                    ? "bg-[var(--accent-cyan)]/15 border-[var(--accent-cyan)]/30 text-[var(--accent-cyan)] shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                    : "bg-[var(--action-indigo)]/15 border-[var(--action-indigo)]/30 text-[var(--action-indigo)] shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                }`}
              >
                {isCyan ? (
                  /* Globe / Web Icon */
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                ) : (
                  /* Devices / Mobile & Desktop Icon */
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <div>
                <p className="text-xs font-mono font-medium text-white">{platform.placeholderLabel}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Click to preview in high resolution</p>
              </div>
            </div>

            {/* Bottom device spec line */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400/80 pt-1.5 border-t border-white/5">
              <span>{isCyan ? "HTTP / WebSocket / DOM" : "POSIX / Win32 / Cocoa / Android"}</span>
              <span>16 : 9</span>
            </div>
          </div>
        )}

        {/* Carousel buttons when multiple images */}
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 backdrop-blur-sm opacity-0 group-hover/media:opacity-100 transition-all duration-200 hover:scale-110 cursor-pointer shadow-md text-sm"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 backdrop-blur-sm opacity-0 group-hover/media:opacity-100 transition-all duration-200 hover:scale-110 cursor-pointer shadow-md text-sm"
            >
              ›
            </button>

            {/* Dots */}
            <div className="absolute bottom-2.5 left-0 right-0 z-20 flex items-center justify-center gap-1.5">
              {imageList.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => handleDotClick(e, idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-200 cursor-pointer ${
                    currentIndex === idx
                      ? "bg-[var(--accent-cyan)] scale-125 shadow-[0_0_6px_var(--accent-cyan)]"
                      : "bg-white/40 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Quick Stats Strip */}
      <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white/[0.03] border border-white/5 mb-6 text-center">
        {platform.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-0.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              {stat.label}
            </span>
            <span className="text-xs sm:text-sm font-bold text-white">
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Scrollable Container with smooth scrollbar & scroll detection */}
      <div className="relative flex-1 flex flex-col min-h-0">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="smooth-scroll-container max-h-[380px] overflow-y-auto pr-2 space-y-6"
        >
          {/* Benefits Section */}
          <section>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--accent-cyan)] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)]" />
              {platform.sections.benefitsTitle}
            </h3>
            <ul className="space-y-2">
              {platform.sections.benefits.map((item, idx) => (
                <li
                  key={idx}
                  className="group/item flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-[var(--accent-cyan)]/30 transition-all duration-200 hover:translate-x-1"
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)] text-xs shrink-0 mt-0.5 font-bold">
                    ✓
                  </span>
                  <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Use Cases Section */}
          <section>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--action-indigo)] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--action-indigo)]" />
              {platform.sections.useCasesTitle}
            </h3>
            <ul className="space-y-2">
              {platform.sections.useCases.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 transition-all duration-200 hover:translate-x-1"
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-lg bg-[var(--action-indigo)]/15 text-[var(--action-indigo)] text-xs shrink-0 mt-0.5 font-bold">
                    ▸
                  </span>
                  <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Limitations Section */}
          <section>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              {platform.sections.limitationsTitle}
            </h3>
            <ul className="space-y-2">
              {platform.sections.limitations.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-amber-500/[0.03] border border-amber-500/10 text-xs sm:text-sm text-slate-300"
                >
                  <span className="text-amber-400 font-bold shrink-0 mt-0.5">!</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Technologies & Ecosystem */}
          <section>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2">
              {platform.sections.ecosystemTitle}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {platform.sections.ecosystem.map((tech) => (
                <span
                  key={tech}
                  className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border ${accentColorClass}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Scroll hint visual at bottom */}
        {scrollHint && (
          <div
            aria-hidden="true"
            className="pt-2 text-center text-[11px] font-mono text-slate-400/70"
          >
            {scrollHint}
          </div>
        )}
      </div>

      {/* Prominent Compact Swipe Slider (Reveals when user finishes scrolling the Web card) */}
      {platform.cta && (
        <div className="mt-4 pt-3.5 border-t border-white/10 min-h-[60px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {hasScrolledToEnd ? (
              <motion.div
                key="cta-slider-unlocked"
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 350, damping: 26 }}
                className="flex flex-col items-center gap-1.5 w-full max-w-[250px]"
              >
                <div className="w-full flex items-center justify-between mb-0.5 px-1">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--accent-cyan)] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] animate-ping" />
                    {platform.cta.text}
                  </span>
                </div>
                <SwipeSlider
                  label={platform.cta.text}
                  onComplete={() => onCtaClick?.()}
                  accent="cyan"
                  size="sm"
                  className="w-full max-w-[250px]"
                />
              </motion.div>
            ) : (
              <motion.div
                key="cta-slider-locked"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-[320px] flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.02] border border-dashed border-white/15 text-[11px] font-mono text-slate-400"
              >
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                  Scroll to bottom to unlock
                </span>
                <span className="text-[var(--accent-cyan)] animate-bounce font-bold">
                  ↓
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </article>
  );
}
