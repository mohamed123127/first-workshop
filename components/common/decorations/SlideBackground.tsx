"use client";

import React, { ReactNode } from "react";

export type DotTheme = "cyan" | "indigo" | "amber" | "default" | "split";

export interface GlowOrb {
  color: "cyan" | "indigo" | "amber" | "purple";
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center" | "custom";
  customClassName?: string;
  size?: string;
  opacity?: string;
}

export interface SlideBackgroundProps {
  theme?: DotTheme;
  glowOrbs?: GlowOrb[];
  children?: ReactNode;
  showCrosshairs?: boolean;
  slideTag?: string;
  className?: string;
}

export function SlideBackground({
  theme = "default",
  glowOrbs,
  children,
  showCrosshairs = true,
  slideTag,
  className = "",
}: SlideBackgroundProps) {
  // Determine dot pattern styling
  const dotClass =
    theme === "cyan"
      ? "bg-dots-cyan"
      : theme === "indigo"
      ? "bg-dots-indigo"
      : theme === "amber"
      ? "bg-dots-amber"
      : "bg-dots-pattern";

  // Default glow orbs if none provided
  const orbs: GlowOrb[] = glowOrbs ?? [
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
      size: "w-[32rem] h-[20rem]",
      opacity: "opacity-5",
    },
  ];

  const getOrbPositionClass = (orb: GlowOrb) => {
    if (orb.customClassName) return orb.customClassName;
    switch (orb.position) {
      case "top-left":
        return "-top-36 -left-36";
      case "top-right":
        return "-top-36 -right-36";
      case "bottom-left":
        return "-bottom-36 -left-36";
      case "bottom-right":
        return "-bottom-36 -right-36";
      case "center":
        return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
      default:
        return "top-0 left-0";
    }
  };

  const getOrbColorClass = (color: GlowOrb["color"]) => {
    switch (color) {
      case "cyan":
        return "bg-[var(--accent-cyan)]";
      case "indigo":
        return "bg-[var(--action-indigo)]";
      case "amber":
        return "bg-[var(--base-amber)]";
      case "purple":
        return "bg-purple-600";
    }
  };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 w-full h-full overflow-hidden select-none z-0 ${className}`}
    >
      {/* 1. LAYER: AMBIENT GLOW ORBS */}
      {orbs.map((orb, idx) => (
        <div
          key={idx}
          className={`absolute rounded-full blur-[140px] pointer-events-none transition-all duration-700 ${
            orb.size ?? "w-[34rem] h-[34rem]"
          } ${orb.opacity ?? "opacity-15"} ${getOrbColorClass(
            orb.color
          )} ${getOrbPositionClass(orb)}`}
        />
      ))}

      {/* 2. LAYER: DOTTED MATRIX PATTERN (WITH SMOOTH RADIAL VIGNETTE) */}
      <div
        className={`absolute inset-0 w-full h-full ${dotClass} mask-radial-vignette opacity-80`}
      />

      {/* 3. LAYER: TECHNICAL CROSSHAIRS & BORDER ANCHORS */}
      {showCrosshairs && (
        <>
          {/* Top-Left Crosshair */}
          <div className="absolute top-5 left-5 text-white/20 font-mono text-[10px] flex items-center gap-1 select-none">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white/25">
              <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <span className="opacity-60 text-[9px]">00_TL</span>
          </div>

          {/* Top-Right Crosshair */}
          <div className="absolute top-5 right-5 text-white/20 font-mono text-[10px] flex items-center gap-1 select-none">
            <span className="opacity-60 text-[9px]">{slideTag ?? "SYS_NODE"}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white/25">
              <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </div>

          {/* Bottom-Left Crosshair */}
          <div className="absolute bottom-5 left-5 text-white/20 font-mono text-[10px] flex items-center gap-1 select-none">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white/25">
              <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <span className="opacity-60 text-[9px]">GRID_26PX</span>
          </div>

          {/* Bottom-Right Crosshair */}
          <div className="absolute bottom-5 right-5 text-white/20 font-mono text-[10px] flex items-center gap-1 select-none">
            <span className="opacity-60 text-[9px]">ONLINE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)]/40 animate-pulse" />
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white/25">
              <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </div>
        </>
      )}

      {/* 4. LAYER: CUSTOM DECORATIVE VECTOR CHILDREN */}
      {children}
    </div>
  );
}

