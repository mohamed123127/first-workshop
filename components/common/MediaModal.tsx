"use client";

import { useEffect, type ReactNode } from "react";

export interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  description?: string;
  tags?: readonly string[];
  imageSrc?: string;
  imageAlt?: string;
  placeholderLabel?: string;
  accent?: "cyan" | "indigo" | "amber";
  extraContent?: ReactNode;
}

export function MediaModal({
  isOpen,
  onClose,
  title,
  subtitle,
  description,
  tags = [],
  imageSrc,
  imageAlt = title,
  placeholderLabel = "Full Screen Mockup Preview",
  accent = "cyan",
  extraContent,
}: MediaModalProps) {
  // ESC key listener & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isCyan = accent === "cyan";
  const isAmber = accent === "amber";

  const accentColorClass = isCyan
    ? "text-[var(--accent-cyan)] border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan)]/10"
    : isAmber
    ? "text-[var(--base-amber)] border-[var(--base-amber)]/30 bg-[var(--base-amber)]/10"
    : "text-[var(--action-indigo)] border-[var(--action-indigo)]/30 bg-[var(--action-indigo)]/10";

  const topGlowLine = isCyan
    ? "via-[var(--accent-cyan)]"
    : isAmber
    ? "via-[var(--base-amber)]"
    : "via-[var(--action-indigo)]";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl backdrop-blur-2xl bg-[var(--cards-charcoal)]/95 border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top ambient glow highlight */}
        <div
          aria-hidden="true"
          className={`absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent ${topGlowLine} to-transparent opacity-80`}
        />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 sm:px-8 sm:py-6 border-b border-white/5">
          <div className="flex flex-col gap-1 pr-10">
            {subtitle && (
              <span className="text-xs font-mono font-semibold tracking-wider uppercase text-[var(--accent-cyan)]">
                {subtitle}
              </span>
            )}
            <h3 id="modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {title}
            </h3>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] shrink-0"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body / Scrollable Media Preview */}
        <div className="overflow-y-auto p-6 sm:p-8 flex flex-col gap-6">
          {/* Picture / Wireframe Canvas */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[var(--bg-deep-navy)] border border-white/10 shadow-inner flex flex-col">
            {imageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-contain"
              />
            ) : (
              /* Expanded high-fidelity interactive browser preview */
              <div className="w-full h-full flex flex-col bg-gradient-to-b from-white/[0.04] to-transparent p-5 sm:p-6 justify-between">
                {/* Mock browser window bar */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
                    <span className="w-3 h-3 rounded-full bg-green-400/80" />
                  </div>
                  <div className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-2">
                    <svg
                      className="w-3 h-3 text-[var(--accent-cyan)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <span>https://workshop-demo.local/{title.toLowerCase().replace(/[^a-z0-9]/g, "-")}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest hidden sm:inline">
                    Interactive Preview
                  </span>
                </div>

                {/* Expanded Mock Interface Layout */}
                <div className="flex-1 flex flex-col items-center justify-center gap-4 py-8 text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/[0.06] border border-white/15 text-[var(--accent-cyan)] shadow-lg shadow-[var(--accent-cyan)]/10">
                    <svg
                      className="w-8 h-8"
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
                  <div className="max-w-md">
                    <h4 className="text-lg font-bold text-white mb-1">
                      {placeholderLabel}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-400">
                      When an image path is added to <code className="text-[var(--accent-cyan)] font-mono">content/web-overview.ts</code>, your full screenshot will appear right here in this pop-up modal.
                    </p>
                  </div>
                </div>

                {/* Mock bottom status bar */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Ready for your custom screenshot
                  </span>
                  <span>1920 × 1080 (HD)</span>
                </div>
              </div>
            )}
          </div>

          {/* Description & Technical Tags */}
          {description && (
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-mono uppercase tracking-wider text-slate-400">
                About this Website Type
              </h4>
              <p className="text-base text-slate-200 leading-relaxed">
                {description}
              </p>
            </div>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-mono text-slate-400 mr-2">
                Key Stack / Concepts:
              </span>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs font-mono px-3 py-1 rounded-lg border ${accentColorClass}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {extraContent && <div>{extraContent}</div>}
        </div>
      </div>
    </div>
  );
}

