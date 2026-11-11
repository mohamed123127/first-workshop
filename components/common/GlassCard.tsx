import type { ReactNode } from "react";

export interface GlassCardProps {
  children: ReactNode;
  accent?: "cyan" | "indigo" | "amber";
  badge?: string;
  badgeStep?: string;
  size?: "default" | "sm";
  className?: string;
}

export function GlassCard({
  children,
  accent = "cyan",
  badge,
  badgeStep,
  size = "default",
  className = "",
}: GlassCardProps) {
  const isSm = size === "sm";

  const accentColorClass =
    accent === "cyan"
      ? "text-[var(--accent-cyan)] border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan)]/10"
      : accent === "amber"
      ? "text-[var(--base-amber)] border-[var(--base-amber)]/30 bg-[var(--base-amber)]/10"
      : "text-[var(--action-indigo)] border-[var(--action-indigo)]/30 bg-[var(--action-indigo)]/10";

  const glowHoverClass =
    accent === "cyan"
      ? "hover:border-[var(--accent-cyan)]/40 hover:shadow-[0_20px_50px_-10px_rgba(6,182,212,0.18)]"
      : accent === "amber"
      ? "hover:border-[var(--base-amber)]/40 hover:shadow-[0_20px_50px_-10px_rgba(245,158,11,0.18)]"
      : "hover:border-[var(--action-indigo)]/40 hover:shadow-[0_20px_50px_-10px_rgba(99,102,241,0.22)]";

  const topGlowLine =
    accent === "cyan"
      ? "via-[var(--accent-cyan)]"
      : accent === "amber"
      ? "via-[var(--base-amber)]"
      : "via-[var(--action-indigo)]";

  const dotBg =
    accent === "cyan"
      ? "bg-[var(--accent-cyan)]"
      : accent === "amber"
      ? "bg-[var(--base-amber)]"
      : "bg-[var(--action-indigo)]";

  const paddingClass = isSm ? "p-4 sm:p-5 md:p-5.5" : "p-6 sm:p-8";
  const badgeSpacing = isSm ? "mb-2.5 sm:mb-3" : "mb-4";
  const badgeSize = isSm ? "px-2.5 py-0.5 text-[11px]" : "px-3 py-1 text-xs";

  return (
    <div
      className={`relative rounded-2xl ${paddingClass} backdrop-blur-xl bg-[var(--cards-charcoal)]/55 border border-white/10 shadow-[0_12px_36px_0_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 ${glowHoverClass} group ${className}`}
    >
      {/* Top subtle glow accent line */}
      <div
        aria-hidden="true"
        className={`absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent ${topGlowLine} to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {/* Eyebrow Badge */}
      {(badge || badgeStep) && (
        <div className={`flex items-center gap-2 ${badgeSpacing}`}>
          <span
            className={`inline-flex items-center gap-1.5 ${badgeSize} rounded-full font-mono font-semibold tracking-wider uppercase border ${accentColorClass}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${dotBg} animate-pulse`}
            />
            {badgeStep && <span className="opacity-75">{badgeStep} ·</span>}
            {badge}
          </span>
        </div>
      )}

      {children}
    </div>
  );
}
