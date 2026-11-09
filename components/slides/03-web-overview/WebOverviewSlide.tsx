"use client";

import { useState } from "react";
import {
  webOverviewContent,
  type WebOverviewContent,
  type WebsiteTypeItem,
} from "@/content/web-overview";
import { SectionTitle } from "@/components/common/SectionTitle";
import { MediaCard } from "@/components/common/MediaCard";
import { MediaModal } from "@/components/common/MediaModal";
import { SlideHeader } from "@/components/common/SlideHeader";

export interface WebOverviewSlideProps {
  content?: WebOverviewContent;
  className?: string;
}

export function WebOverviewSlide({
  content = webOverviewContent,
  className = "",
}: WebOverviewSlideProps) {
  const [selectedType, setSelectedType] = useState<WebsiteTypeItem | null>(null);

  return (
    <section
      aria-label={content.title}
      className={`relative min-h-screen w-full flex flex-col bg-[var(--bg-deep-navy)] overflow-hidden ${className}`}
    >
      {/* Creative ambient background glow orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 w-[34rem] h-[34rem] rounded-full bg-[var(--accent-cyan)]/10 blur-[140px] animate-pulse"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 w-[38rem] h-[38rem] rounded-full bg-[var(--action-indigo)]/15 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-1/4 w-[28rem] h-[28rem] rounded-full bg-[var(--base-amber)]/5 blur-[120px]"
      />

      {/* Top Header Bar */}
      <SlideHeader
        title={content.title}
        eyebrow={content.eyebrow}
        slideNumber={content.badge}
        accent="cyan"
      />

      {/* Slide Content Body */}
      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 py-8 sm:px-10 md:px-16 md:py-12 flex flex-col gap-10">
        {/* Intro Banner */}
        <div className="rounded-2xl p-6 sm:p-8 backdrop-blur-xl bg-[var(--cards-charcoal)]/40 border border-white/5 shadow-xl">
          <SectionTitle
            as="h2"
            subtitle="Overview & Definition"
            className="mb-3"
          >
            {content.title}
          </SectionTitle>
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
      </div>

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
