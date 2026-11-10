"use client";

import { useState } from "react";
import {
  webVsNativeContent,
  type WebVsNativeContent,
  type PlatformDetails,
} from "@/content/web-vs-native";
import { SlideHeader } from "@/components/common/SlideHeader";
import { MediaModal } from "@/components/common/MediaModal";
import { ComparisonCard } from "./ComparisonCard";

export interface WebVsNativeSlideProps {
  content?: WebVsNativeContent;
  onExploreNext?: () => void;
  className?: string;
}

export function WebVsNativeSlide({
  content = webVsNativeContent,
  onExploreNext,
  className = "",
}: WebVsNativeSlideProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformDetails | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const handleCtaClick = () => {
    if (onExploreNext) {
      onExploreNext();
    } else {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3500);
    }
  };

  return (
    <section
      aria-label={content.question}
      className={`relative min-h-screen w-full flex flex-col bg-[var(--bg-deep-navy)] overflow-hidden ${className}`}
    >
      {/* Creative ambient background glow orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 w-[36rem] h-[36rem] rounded-full bg-[var(--accent-cyan)]/10 blur-[150px] animate-pulse"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 w-[40rem] h-[40rem] rounded-full bg-[var(--action-indigo)]/15 blur-[160px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full bg-[var(--cards-charcoal)]/30 blur-[120px]"
      />

      {/* Top Header */}
      <SlideHeader
        title={content.question}
        eyebrow={content.eyebrow}
        slideNumber={content.badge}
        accent="cyan"
      />

      {/* Body Content */}
      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 py-8 sm:px-10 md:px-16 md:py-10 flex flex-col gap-8">
        {/* Intro question description banner */}
        <div className="rounded-2xl p-5 sm:p-6 backdrop-blur-xl bg-[var(--cards-charcoal)]/40 border border-white/5 shadow-xl flex items-center justify-between gap-4">
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-4xl">
            {content.description}
          </p>
          <span className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase border border-[var(--accent-cyan)]/30 text-[var(--accent-cyan)] bg-[var(--accent-cyan)]/10 shrink-0">
            Side-by-side comparison
          </span>
        </div>

        {/* 2-Column Comparison Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Web App Card */}
          <ComparisonCard
            platform={content.webPlatform}
            scrollHint={content.scrollHint}
            onMediaClick={(idx) => {
              setSelectedPlatform(content.webPlatform);
              setSelectedImageIndex(idx ?? 0);
            }}
            onCtaClick={handleCtaClick}
          />

          {/* Mobile & Desktop Native Card */}
          <ComparisonCard
            platform={content.nativePlatform}
            scrollHint={content.scrollHint}
            onMediaClick={(idx) => {
              setSelectedPlatform(content.nativePlatform);
              setSelectedImageIndex(idx ?? 0);
            }}
          />
        </div>
      </div>

      {/* Lightbox Pop-up for Mockup / Image */}
      {selectedPlatform && (
        <MediaModal
          isOpen={true}
          onClose={() => setSelectedPlatform(null)}
          title={selectedPlatform.title}
          subtitle={selectedPlatform.subtitle}
          description={selectedPlatform.description}
          tags={selectedPlatform.sections.ecosystem}
          accent={selectedPlatform.accent}
          imageSrc={selectedPlatform.imageSrc}
          imageAlt={selectedPlatform.imageAlt ?? selectedPlatform.title}
          images={selectedPlatform.images}
          initialIndex={selectedImageIndex}
          placeholderLabel={selectedPlatform.placeholderLabel}
        />
      )}

      {/* Interactive feedback toast for the "Let's explore the web" CTA */}
      {showToast && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[var(--cards-charcoal)]/95 border border-[var(--accent-cyan)]/50 text-white shadow-[0_10px_30px_rgba(6,182,212,0.3)] backdrop-blur-xl animate-in slide-in-from-bottom-5 duration-300 font-mono text-xs sm:text-sm"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-cyan)] animate-ping shrink-0" />
          <span>🚀 Ready to explore the web! Hook up slide 05 when created.</span>
        </div>
      )}
    </section>
  );
}

