"use client";

import React, { useState } from "react";
import {
  Palette,
  Type,
  Layout,
  Layers,
  MousePointerClick,
  Sparkles,
  Check,
  Smartphone,
} from "lucide-react";

export function DesignSystemPreview({ className = "" }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<
    "palette" | "fonts" | "sketch" | "pages" | "buttons" | "cards"
  >("palette");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const colors = [
    { name: "Deep Navy", hex: "#0F172A", bg: "bg-[#0F172A]", text: "text-white", border: "border-white/20" },
    { name: "Action Indigo", hex: "#6366F1", bg: "bg-[#6366F1]", text: "text-white", border: "border-indigo-400" },
    { name: "Accent Cyan", hex: "#06B6D4", bg: "bg-[#06B6D4]", text: "text-[#0F172A]", border: "border-cyan-400" },
    { name: "Base Amber", hex: "#F59E0B", bg: "bg-[#F59E0B]", text: "text-[#0F172A]", border: "border-amber-400" },
    { name: "Emerald Mint", hex: "#10B981", bg: "bg-[#10B981]", text: "text-[#0F172A]", border: "border-emerald-400" },
    { name: "Card Charcoal", hex: "#1E293B", bg: "bg-[#1E293B]", text: "text-white", border: "border-white/20" },
  ];

  const handleCopyColor = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  return (
    <div
      className={`rounded-2xl bg-black/45 border border-cyan-500/25 p-3 sm:p-4 backdrop-blur-xl shadow-xl flex flex-col gap-3 ${className}`}
    >
      {/* ── TOP TABS BAR ── */}
      <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
            <Palette className="w-3.5 h-3.5 text-cyan-400" />
            UI/UX Design Kit Preview
          </span>
          <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400">
            Step 4 Component Tokens
          </span>
        </div>

        {/* Tab Switchers: Color palette, fonts, sketch, pages, button types, cards */}
        <div className="flex items-center gap-1 overflow-x-auto text-xs font-mono">
          {[
            { id: "palette", label: "Colors", icon: <Palette className="w-3 h-3" /> },
            { id: "fonts", label: "Fonts", icon: <Type className="w-3 h-3" /> },
            { id: "sketch", label: "Sketch / Wireframe", icon: <Layout className="w-3 h-3" /> },
            { id: "pages", label: "Pages", icon: <Smartphone className="w-3 h-3" /> },
            { id: "buttons", label: "Buttons", icon: <MousePointerClick className="w-3 h-3" /> },
            { id: "cards", label: "Cards", icon: <Layers className="w-3 h-3" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                  : "bg-white/5 text-slate-400 hover:text-white border border-transparent"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── TAB CONTENT DISPLAY ── */}
      <div className="min-h-[105px] flex items-center">
        {/* 1. COLOR PALETTE */}
        {activeTab === "palette" && (
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {colors.map((c) => (
              <div
                key={c.name}
                onClick={() => handleCopyColor(c.hex)}
                className="group p-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/50 transition-all cursor-pointer flex flex-col gap-1.5"
                title={`Click to copy ${c.hex}`}
              >
                <div
                  className={`w-full h-8 rounded-lg ${c.bg} border ${c.border} flex items-center justify-center shadow-inner`}
                >
                  {copiedHex === c.hex && (
                    <span className="text-[10px] font-bold font-mono bg-black/80 px-1.5 py-0.5 rounded text-white flex items-center gap-1">
                      <Check className="w-2.5 h-2.5 text-emerald-400" /> Copied!
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-300 font-semibold truncate">{c.name}</span>
                  <span className="text-slate-500 group-hover:text-cyan-400 transition-colors">
                    {c.hex}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. FONTS / TYPOGRAPHY */}
        {activeTab === "fonts" && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-left font-mono">
            {/* Display / Heading */}
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
              <span className="text-[9px] uppercase tracking-wider text-cyan-400 font-bold">
                Display Headings (Geist / Inter Extrabold)
              </span>
              <p className="text-lg font-extrabold text-white leading-tight font-sans">
                Next-Gen Software
              </p>
              <span className="text-[9px] text-slate-500">Weight: 800 • Tracking: -0.025em</span>
            </div>

            {/* Body Text */}
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
              <span className="text-[9px] uppercase tracking-wider text-indigo-400 font-bold">
                Body &amp; Subtitles (Inter Regular)
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Clean and legible across phone, tablet, and retina screens.
              </p>
              <span className="text-[9px] text-slate-500">Weight: 400 • Line-height: 1.6</span>
            </div>

            {/* Code Monospace */}
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
              <span className="text-[9px] uppercase tracking-wider text-amber-400 font-bold">
                Monospace Font (Geist Mono)
              </span>
              <p className="text-xs text-emerald-400 bg-black/40 p-1 rounded border border-white/5 truncate">
                const user = await db.auth();
              </p>
              <span className="text-[9px] text-slate-500">Tokens, tags &amp; terminal outputs</span>
            </div>
          </div>
        )}

        {/* 3. SKETCH / WIREFRAME (SCATCH) */}
        {activeTab === "sketch" && (
          <div className="w-full p-2.5 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between gap-4 font-mono">
            {/* Visual Blueprint Sketch Mockup */}
            <div className="flex-1 border border-dashed border-cyan-500/40 rounded-lg p-2 space-y-1.5 bg-[#091122]">
              <div className="flex items-center justify-between border-b border-dashed border-cyan-500/30 pb-1">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span className="text-[9px] text-cyan-300 font-bold">WIREFRAME_SKETCH.FIG</span>
                </div>
                <span className="text-[8px] text-slate-500">12-COL GRID</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                <div className="col-span-4 h-4 bg-cyan-500/10 rounded border border-dashed border-cyan-500/30 flex items-center px-1.5 text-[8px] text-slate-400">
                  Header: [Logo] ──── [Nav Items] ──── [Login CTA]
                </div>
                <div className="col-span-4 h-7 bg-indigo-500/10 rounded border border-dashed border-indigo-500/30 flex items-center justify-center text-[9px] text-slate-300">
                  Hero Section: [H1 Headline] + [Interactive Demo Box]
                </div>
                <div className="col-span-2 h-6 bg-white/5 rounded border border-dashed border-white/10 flex items-center justify-center text-[8px] text-slate-400">
                  Feature Card A
                </div>
                <div className="col-span-2 h-6 bg-white/5 rounded border border-dashed border-white/10 flex items-center justify-center text-[8px] text-slate-400">
                  Feature Card B
                </div>
              </div>
            </div>

            <div className="w-48 text-left space-y-1 text-xs">
              <span className="text-[10px] font-bold text-white uppercase tracking-wider block">
                Low-Fi to High-Fi
              </span>
              <p className="text-[10px] text-slate-400 leading-tight">
                Sketches test layout and flow before writing code or choosing final colors.
              </p>
            </div>
          </div>
        )}

        {/* 4. PAGES / SITEMAP */}
        {activeTab === "pages" && (
          <div className="w-full flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
            {[
              { path: "/", label: "Landing Page", type: "Public Vitrine" },
              { path: "/login", label: "Auth Portal", type: "Modal / Screen" },
              { path: "/dashboard", label: "User App", type: "Protected SaaS" },
              { path: "/settings", label: "Preferences", type: "Account Config" },
            ].map((p, idx) => (
              <div
                key={p.path}
                className="flex-1 min-w-[130px] p-2 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col gap-1"
              >
                <div className="flex items-center justify-between text-[9px] text-cyan-400">
                  <span className="font-bold">Page 0{idx + 1}</span>
                  <span className="text-slate-500">{p.path}</span>
                </div>
                <span className="text-white font-bold text-xs truncate">{p.label}</span>
                <span className="text-[9px] text-slate-400">{p.type}</span>
              </div>
            ))}
          </div>
        )}

        {/* 5. BUTTON TYPES */}
        {activeTab === "buttons" && (
          <div className="w-full flex flex-wrap items-center justify-around gap-2.5 font-mono text-xs">
            {/* Primary Solid */}
            <button className="px-3.5 py-1.5 rounded-xl bg-[var(--action-indigo)] text-white font-bold shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              Primary Button
            </button>

            {/* Gradient Glow */}
            <button className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[var(--action-indigo)] to-[var(--accent-cyan)] text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-cyan-200" />
              <span>Gradient CTA</span>
            </button>

            {/* Outline Button */}
            <button className="px-3 py-1.5 rounded-xl border border-white/20 text-slate-200 hover:border-cyan-400 hover:text-white transition-colors">
              Outline Button
            </button>

            {/* Ghost / Danger */}
            <button className="px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-300 border border-rose-500/30">
              Danger State
            </button>
          </div>
        )}

        {/* 6. CARDS */}
        {activeTab === "cards" && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 text-left font-mono">
            {/* Glass Card Sample */}
            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md space-y-1.5 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-cyan-400">
                  Glassmorphism Card
                </span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>
              <h5 className="text-xs font-bold text-white">Interactive Module</h5>
              <p className="text-[11px] text-slate-400 font-sans leading-tight">
                Used across all workshop slides for clean visual contrast on dark navy.
              </p>
            </div>

            {/* Featured Highlight Card */}
            <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-cyan-950/40 border border-cyan-500/30 space-y-1.5 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-emerald-400">
                  Featured Accent Card
                </span>
                <span className="text-[9px] text-slate-400">Token: card-active</span>
              </div>
              <h5 className="text-xs font-bold text-white">Production Ready</h5>
              <p className="text-[11px] text-slate-300 font-sans leading-tight">
                Includes hover elevations, border glow transitions, and responsive padding.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
