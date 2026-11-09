"use client";

import React from "react";

/**
 * Technical Corner Bracket (e.g. ┌, ┐, └, ┘)
 */
export function CornerBracket({
  position = "top-left",
  size = 20,
  color = "var(--accent-cyan)",
  opacity = 0.35,
  className = "",
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: number;
  color?: string;
  opacity?: number;
  className?: string;
}) {
  const dMap = {
    "top-left": `M0 ${size} L0 0 L${size} 0`,
    "top-right": `M0 0 L${size} 0 L${size} ${size}`,
    "bottom-left": `M0 0 L0 ${size} L${size} ${size}`,
    "bottom-right": `M0 ${size} L${size} ${size} L${size} 0`,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className={`pointer-events-none ${className}`}
      style={{ opacity }}
    >
      <path d={dMap[position]} stroke={color} strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

/**
 * Concentric Tech Radar / Compass Rings
 */
export function ConcentricRadarRings({
  size = 260,
  accent = "cyan",
  className = "",
}: {
  size?: number;
  accent?: "cyan" | "indigo" | "amber";
  className?: string;
}) {
  const strokeColor =
    accent === "cyan"
      ? "rgba(6, 182, 212, 0.25)"
      : accent === "amber"
      ? "rgba(245, 158, 11, 0.22)"
      : "rgba(99, 102, 241, 0.25)";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      className={`pointer-events-none select-none ${className}`}
    >
      {/* Outer Dashed Ring */}
      <circle
        cx="100"
        cy="100"
        r="92"
        stroke={strokeColor}
        strokeWidth="1"
        strokeDasharray="4 6"
        className="animate-spin-slow origin-center"
      />
      {/* Middle Ring */}
      <circle cx="100" cy="100" r="68" stroke={strokeColor} strokeWidth="0.75" opacity="0.6" />
      {/* Middle Dashed Ring */}
      <circle
        cx="100"
        cy="100"
        r="44"
        stroke={strokeColor}
        strokeWidth="1"
        strokeDasharray="2 4"
      />
      {/* Center Target Cross */}
      <circle cx="100" cy="100" r="16" stroke={strokeColor} strokeWidth="1.2" />
      <circle cx="100" cy="100" r="4" fill={strokeColor} />
      <line x1="100" y1="75" x2="100" y2="125" stroke={strokeColor} strokeWidth="0.75" />
      <line x1="75" y1="100" x2="125" y2="100" stroke={strokeColor} strokeWidth="0.75" />

      {/* Orbiting micro-dots */}
      <circle cx="170" cy="100" r="2.5" fill={strokeColor} className="animate-pulse" />
      <circle cx="100" cy="32" r="2" fill={strokeColor} />
      <circle cx="50" cy="140" r="2" fill={strokeColor} />
    </svg>
  );
}

/**
 * 3D Isometric Wireframe Cube
 */
export function IsometricWireCube({
  size = 90,
  accent = "cyan",
  className = "",
}: {
  size?: number;
  accent?: "cyan" | "indigo" | "amber";
  className?: string;
}) {
  const strokeColor =
    accent === "cyan"
      ? "rgba(6, 182, 212, 0.35)"
      : accent === "amber"
      ? "rgba(245, 158, 11, 0.3)"
      : "rgba(99, 102, 241, 0.35)";

  const fillColor =
    accent === "cyan"
      ? "rgba(6, 182, 212, 0.04)"
      : accent === "amber"
      ? "rgba(245, 158, 11, 0.03)"
      : "rgba(99, 102, 241, 0.04)";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={`pointer-events-none select-none ${className}`}
    >
      {/* Top Face */}
      <polygon
        points="50,15 82,33 50,51 18,33"
        stroke={strokeColor}
        strokeWidth="1.2"
        fill={fillColor}
      />
      {/* Left Face */}
      <polygon
        points="18,33 50,51 50,85 18,67"
        stroke={strokeColor}
        strokeWidth="1.2"
        fill={fillColor}
      />
      {/* Right Face */}
      <polygon
        points="50,51 82,33 82,67 50,85"
        stroke={strokeColor}
        strokeWidth="1.2"
        fill={fillColor}
      />
      {/* Inner Node Accent */}
      <circle cx="50" cy="51" r="2.5" fill={strokeColor} className="animate-pulse" />
    </svg>
  );
}

/**
 * Animated Frequency / Data Sine Wave
 */
export function DataSineWave({
  width = 240,
  height = 50,
  accent = "cyan",
  className = "",
}: {
  width?: number;
  height?: number;
  accent?: "cyan" | "indigo" | "amber";
  className?: string;
}) {
  const strokeColor =
    accent === "cyan"
      ? "rgba(6, 182, 212, 0.35)"
      : accent === "amber"
      ? "rgba(245, 158, 11, 0.3)"
      : "rgba(99, 102, 241, 0.35)";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 240 50"
      fill="none"
      className={`pointer-events-none select-none ${className}`}
    >
      <path
        d="M 0 25 Q 30 5, 60 25 T 120 25 T 180 25 T 240 25"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 0 25 Q 30 45, 60 25 T 120 25 T 180 25 T 240 25"
        stroke={strokeColor}
        strokeWidth="0.75"
        strokeDasharray="2 4"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      {/* Node pulse */}
      <circle cx="60" cy="25" r="2.5" fill={strokeColor} />
      <circle cx="120" cy="25" r="3" fill={strokeColor} className="animate-pulse" />
      <circle cx="180" cy="25" r="2.5" fill={strokeColor} />
    </svg>
  );
}

/**
 * Circuit Trace with Glowing Bus Nodes
 */
export function CircuitTrace({
  className = "",
  color = "var(--accent-cyan)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      width="180"
      height="120"
      viewBox="0 0 180 120"
      fill="none"
      className={`pointer-events-none select-none ${className}`}
    >
      <path
        d="M10 20 H60 L85 55 H130 L150 85 H170"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.3"
      />
      <path
        d="M10 50 H45 L70 85 H120"
        stroke={color}
        strokeWidth="1"
        strokeDasharray="3 4"
        strokeLinecap="round"
        opacity="0.25"
      />
      {/* Nodes */}
      <circle cx="60" cy="20" r="3" stroke={color} strokeWidth="1" fill="#0F172A" opacity="0.6" />
      <circle cx="85" cy="55" r="2.5" fill={color} opacity="0.6" />
      <circle cx="130" cy="55" r="3.5" stroke={color} strokeWidth="1" fill="#0F172A" opacity="0.7" />
      <circle cx="170" cy="85" r="3" fill={color} opacity="0.8" className="animate-pulse" />
    </svg>
  );
}

/**
 * Constellation Network Cluster (Nodes & Edges)
 */
export function NetworkConstellation({
  size = 140,
  accent = "cyan",
  className = "",
}: {
  size?: number;
  accent?: "cyan" | "indigo" | "amber";
  className?: string;
}) {
  const color =
    accent === "cyan"
      ? "#06B6D4"
      : accent === "amber"
      ? "#F59E0B"
      : "#6366F1";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      className={`pointer-events-none select-none ${className}`}
    >
      {/* Connecting edges */}
      <line x1="25" y1="35" x2="70" y2="20" stroke={color} strokeWidth="1" opacity="0.25" />
      <line x1="70" y1="20" x2="115" y2="45" stroke={color} strokeWidth="1" opacity="0.25" />
      <line x1="70" y1="20" x2="65" y2="80" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="25" y1="35" x2="65" y2="80" stroke={color} strokeWidth="1" opacity="0.2" />
      <line x1="65" y1="80" x2="35" y2="120" stroke={color} strokeWidth="1" opacity="0.25" />
      <line x1="65" y1="80" x2="110" y2="105" stroke={color} strokeWidth="1" opacity="0.25" />
      <line x1="115" y1="45" x2="110" y2="105" stroke={color} strokeWidth="1" opacity="0.2" />

      {/* Nodes */}
      <circle cx="25" cy="35" r="4" fill={color} opacity="0.5" />
      <circle cx="70" cy="20" r="5" stroke={color} strokeWidth="1.5" fill="#0F172A" opacity="0.8" />
      <circle cx="115" cy="45" r="3.5" fill={color} opacity="0.6" />
      <circle cx="65" cy="80" r="6" stroke={color} strokeWidth="1.5" fill="#0F172A" opacity="0.9" />
      <circle cx="65" cy="80" r="2.5" fill={color} className="animate-pulse" />
      <circle cx="35" cy="120" r="4.5" fill={color} opacity="0.5" />
      <circle cx="110" cy="105" r="4" stroke={color} strokeWidth="1" fill="#0F172A" opacity="0.7" />
    </svg>
  );
}

/**
 * Educational Web Foundations Glyph: Code brackets, HTML tag, and curly braces
 */
export function WebFoundationsGlyph({
  className = "",
  accent = "cyan",
}: {
  className?: string;
  accent?: "cyan" | "indigo";
}) {
  const isCyan = accent === "cyan";
  const color = isCyan ? "var(--accent-cyan)" : "var(--action-indigo)";
  const bgBadge = isCyan ? "bg-[var(--accent-cyan)]/10" : "bg-[var(--action-indigo)]/10";
  const borderBadge = isCyan ? "border-[var(--accent-cyan)]/25" : "border-[var(--action-indigo)]/25";

  return (
    <div
      className={`pointer-events-none select-none flex items-center gap-2 px-3 py-1.5 rounded-xl border backdrop-blur-md ${bgBadge} ${borderBadge} ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ color }}>
        <path
          d="M8 6L2 12L8 18M16 6L22 12L16 18M14 4L10 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[11px] font-mono tracking-wider" style={{ color }}>
        &lt;html&gt; &amp; &lbrace;css&rbrace;
      </span>
    </div>
  );
}

