import type { ReactNode } from "react";

export interface SlideHeaderProps {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  slideNumber?: string;
  accent?: "cyan" | "indigo" | "amber";
  rightContent?: ReactNode;
  className?: string;
}

export function SlideHeader({
  title,
  eyebrow,
  subtitle,
  slideNumber,
  accent = "cyan",
  rightContent,
  className = "",
}: SlideHeaderProps) {
  const isCyan = accent === "cyan";
  const isAmber = accent === "amber";

  const accentColor = isCyan
    ? "text-[var(--accent-cyan)]"
    : isAmber
    ? "text-[var(--base-amber)]"
    : "text-[var(--action-indigo)]";

  const bottomGlowColor = isCyan
    ? "via-[var(--accent-cyan)]/40"
    : isAmber
    ? "via-[var(--base-amber)]/40"
    : "via-[var(--action-indigo)]/40";

  return (
    <header
      className={`relative z-20 w-full px-6 py-5 sm:px-10 md:px-16 md:py-6 border-b border-white/5 bg-[var(--bg-deep-navy)]/80 backdrop-blur-md ${className}`}
    >
      {/* Bottom glowing animated line */}
      <div
        aria-hidden="true"
        className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent ${bottomGlowColor} to-transparent opacity-80`}
      />

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Title and Eyebrow */}
        <div className="flex flex-col gap-1 min-w-0">
          {eyebrow && (
            <div className="flex items-center gap-2">
              <span
                className={`w-1.5 h-1.5 rounded-full ${isCyan ? "bg-[var(--accent-cyan)]" : isAmber ? "bg-[var(--base-amber)]" : "bg-[var(--action-indigo)]"} shadow-[0_0_8px_currentColor] animate-pulse`}
              />
              <span
                className={`text-xs uppercase tracking-widest font-mono font-medium ${accentColor} truncate`}
              >
                {eyebrow}
              </span>
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-300 font-normal truncate max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right Section: Animated Slide Number Badge or Custom Content */}
        <div className="flex items-center gap-3 shrink-0">
          {rightContent}

          {slideNumber && (
            <div className="group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase border border-[var(--action-indigo)]/50 text-[var(--accent-cyan)] bg-[var(--action-indigo)]/10 backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-300 hover:scale-105 hover:border-[var(--accent-cyan)]/70 hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] cursor-default">
              {/* Radar Ping Motion */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-cyan)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-cyan)]" />
              </span>
              <span>{slideNumber}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

