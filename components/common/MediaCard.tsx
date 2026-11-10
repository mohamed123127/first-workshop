"use client";

import { useState, type ReactNode, type MouseEvent } from "react";
import type { MediaImage } from "./MediaModal";

export interface MediaCardProps {
  title: string;
  subtitle?: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  images?: readonly MediaImage[];
  placeholderLabel?: string;
  tags?: readonly string[];
  accent?: "cyan" | "indigo" | "amber";
  className?: string;
  onMediaClick?: (index?: number) => void;
  footer?: ReactNode;
}

export function MediaCard({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt = title,
  images = [],
  placeholderLabel = "Image Placeholder",
  tags = [],
  accent = "cyan",
  className = "",
  onMediaClick,
  footer,
}: MediaCardProps) {
  // Normalize images to array of { src, alt, caption }
  const imageList =
    images.length > 0
      ? images.map((img) =>
          typeof img === "string" ? { src: img, alt: title } : img
        )
      : imageSrc
      ? [{ src: imageSrc, alt: imageAlt }]
      : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMultiple = imageList.length > 1;

  const currentImage = imageList[currentIndex];

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

  const isCyan = accent === "cyan";
  const isAmber = accent === "amber";

  const accentColorClass = isCyan
    ? "text-[var(--accent-cyan)] border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan)]/10"
    : isAmber
    ? "text-[var(--base-amber)] border-[var(--base-amber)]/30 bg-[var(--base-amber)]/10"
    : "text-[var(--action-indigo)] border-[var(--action-indigo)]/30 bg-[var(--action-indigo)]/10";

  const hoverBorderClass = isCyan
    ? "hover:border-[var(--accent-cyan)]/40 hover:shadow-[0_20px_50px_-10px_rgba(6,182,212,0.2)]"
    : isAmber
    ? "hover:border-[var(--base-amber)]/40 hover:shadow-[0_20px_50px_-10px_rgba(245,158,11,0.2)]"
    : "hover:border-[var(--action-indigo)]/40 hover:shadow-[0_20px_50px_-10px_rgba(99,102,241,0.25)]";

  const topGlowLine = isCyan
    ? "via-[var(--accent-cyan)]"
    : isAmber
    ? "via-[var(--base-amber)]"
    : "via-[var(--action-indigo)]";

  return (
    <article
      className={`group relative flex flex-col rounded-2xl p-5 sm:p-6 backdrop-blur-xl bg-[var(--cards-charcoal)]/60 border border-white/10 shadow-[0_12px_36px_0_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-2 ${hoverBorderClass} ${className}`}
    >
      {/* Top subtle glow accent line on hover */}
      <div
        aria-hidden="true"
        className={`absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent ${topGlowLine} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {/* Image / Mockup Placeholder Container with zoom-on-hover & click-to-pop-up */}
      <div
        role={onMediaClick ? "button" : undefined}
        tabIndex={onMediaClick ? 0 : undefined}
        onClick={() => onMediaClick?.(currentIndex)}
        onKeyDown={
          onMediaClick
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onMediaClick(currentIndex);
                }
              }
            : undefined
        }
        aria-label={onMediaClick ? `Open enlarged preview for ${title}` : undefined}
        className={`relative w-full aspect-video rounded-xl overflow-hidden mb-5 bg-[var(--bg-deep-navy)]/80 border border-white/5 ${
          onMediaClick
            ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] group/media"
            : ""
        }`}
      >
        {/* Floating "Multi-image count" pill (top-left) */}
        {hasMultiple && (
          <div className="absolute top-2.5 left-2.5 z-20 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white flex items-center gap-1 shadow-md">
            <span>📷</span>
            <span>
              {currentIndex + 1}/{imageList.length}
            </span>
          </div>
        )}

        {/* Floating "Click to pop up" badge on hover (top-right) */}
        {onMediaClick && (
          <div className="absolute top-2.5 right-2.5 z-20 opacity-0 group-hover/media:opacity-100 transition-all duration-200 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white flex items-center gap-1.5 shadow-lg group-hover/media:translate-y-0 translate-y-1">
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
            <span>Pop up</span>
          </div>
        )}

        {currentImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={currentImage.src}
            src={currentImage.src}
            alt={currentImage.alt ?? title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/media:scale-110"
          />
        ) : (
          /* High-fidelity interactive wireframe / image placeholder */
          <div className="relative w-full h-full flex flex-col justify-between p-3.5 transition-transform duration-500 ease-out group-hover:scale-105 bg-gradient-to-b from-white/[0.04] to-transparent">
            {/* Mock browser window header */}
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400/60" />
                <span className="w-2 h-2 rounded-full bg-yellow-400/60" />
                <span className="w-2 h-2 rounded-full bg-green-400/60" />
              </div>
              <span className="text-[10px] font-mono text-slate-400/80 uppercase tracking-widest">
                16 : 9
              </span>
            </div>

            {/* Wireframe Mockup Visual */}
            <div className="flex-1 flex flex-col items-center justify-center gap-2 py-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.04] border border-white/10 text-slate-300 transition-colors duration-300 group-hover:border-[var(--accent-cyan)]/40 group-hover:text-[var(--accent-cyan)]">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.75}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-xs font-mono font-medium text-slate-300 tracking-wide">
                  {placeholderLabel}
                </p>
                <p className="text-[10px] text-slate-400/70 mt-0.5">
                  Click to open pop-up preview
                </p>
              </div>
            </div>

            {/* Mock wireframe footer bars */}
            <div className="flex items-center gap-2 pt-1 border-t border-white/5 opacity-50">
              <div className="h-1.5 w-1/3 rounded bg-white/10" />
              <div className="h-1.5 w-1/4 rounded bg-white/5" />
            </div>
          </div>
        )}

        {/* Mini Carousel Navigation Controls (on hover when multiple images) */}
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 backdrop-blur-sm opacity-0 group-hover/media:opacity-100 transition-all duration-200 hover:scale-110 cursor-pointer shadow-md"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 backdrop-blur-sm opacity-0 group-hover/media:opacity-100 transition-all duration-200 hover:scale-110 cursor-pointer shadow-md"
            >
              ›
            </button>

            {/* Bottom dot indicators */}
            <div className="absolute bottom-2 left-0 right-0 z-20 flex items-center justify-center gap-1.5">
              {imageList.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => handleDotClick(e, idx)}
                  aria-label={`Jump to image ${idx + 1}`}
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

        {/* Ambient shine overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/[0.05] opacity-80 group-hover/media:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {subtitle && (
            <p className="text-xs font-mono font-semibold tracking-wider uppercase text-[var(--accent-cyan)] mb-1.5">
              {subtitle}
            </p>
          )}
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-[var(--accent-cyan)] mb-2">
            {title}
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed line-clamp-3 mb-4">
            {description}
          </p>
        </div>

        {/* Tags / Badges */}
        {(tags.length > 0 || footer) && (
          <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-[11px] font-mono px-2 py-0.5 rounded-md border ${accentColorClass}`}
                >
                  {tag}
                </span>
              ))}
            </div>
            {footer && <div>{footer}</div>}
          </div>
        )}
      </div>
    </article>
  );
}
