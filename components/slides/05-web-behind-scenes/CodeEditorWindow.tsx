"use client";

import React, { useRef, useEffect } from "react";
import { type WebBehindScenesContent } from "@/content/web-behind-scenes";
import { FileCode, Copy, Check, Terminal, Sparkles } from "lucide-react";

export interface CodeEditorWindowProps {
  code: WebBehindScenesContent["code"];
  activeUnitId?: number;
  isExplainActive: boolean;
  className?: string;
}

export function CodeEditorWindow({
  code,
  activeUnitId = 1,
  isExplainActive = false,
  className = "",
}: CodeEditorWindowProps) {
  const [copied, setCopied] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCopyCode = () => {
    const rawCode = code.lines
      .map((l) => l.tokens.map((t) => t.text).join(""))
      .join("\n");
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Scroll to active marked code region when activeUnitId changes
  useEffect(() => {
    if (!containerRef.current || !isExplainActive) return;
    const activeEl = containerRef.current.querySelector(
      `[data-unit="${activeUnitId}"]`
    );
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeUnitId, isExplainActive]);

  // Unit marker title badge
  const getUnitBadge = (unitId?: number) => {
    if (!unitId || !isExplainActive) return null;
    switch (unitId) {
      case 1:
        return (
          <span className="ml-auto px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-cyan-400/20 text-cyan-300 border border-cyan-400/40">
            Unit 01: Receive Input
          </span>
        );
      case 2:
        return (
          <span className="ml-auto px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/40">
            Unit 02: Input Validation
          </span>
        );
      case 3:
        return (
          <span className="ml-auto px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-indigo-400/20 text-indigo-300 border border-indigo-400/40">
            Unit 03: Check into DB
          </span>
        );
      case 4:
        return (
          <span className="ml-auto px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-emerald-400/20 text-emerald-300 border border-emerald-400/40">
            Unit 04: Return the Response
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`rounded-2xl border border-white/10 bg-[#0A0F1E]/95 backdrop-blur-xl flex flex-col overflow-hidden shadow-2xl ${className}`}
    >
      {/* ── CODE WINDOW TOP BAR: TITLE "LOGIN FEATURE" ── */}
      <div className="px-4 py-2.5 bg-[#131B2E]/90 border-b border-white/10 flex items-center justify-between select-none shrink-0">
        {/* Window controls + Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>

          <div className="h-4 w-px bg-white/10" />

          {/* Window Title */}
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide">
              {code.title}
            </h3>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-slate-400 hidden sm:inline-block">
              {code.filename}
            </span>
          </div>
        </div>

        {/* Right action / status */}
        <div className="flex items-center gap-2">
          {isExplainActive && (
            <span className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-cyan-400 animate-pulse">
              <Sparkles className="w-3 h-3" />
              <span>Marking Active Code</span>
            </span>
          )}

          <button
            type="button"
            onClick={handleCopyCode}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Copy code"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* ── CODE EDITOR LINES BODY ── */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-3 sm:p-4 font-mono text-[11px] sm:text-xs leading-relaxed select-text bg-[#070D1B]/90"
      >
        <div className="flex flex-col min-w-max">
          {code.lines.map((line) => {
            const isMarked =
              isExplainActive && line.unitId !== undefined && line.unitId === activeUnitId;

            // Highlight border and background styling per unit
            let highlightClass = "hover:bg-white/5";
            if (isMarked) {
              if (line.unitId === 1) {
                highlightClass =
                  "bg-cyan-500/15 border-l-2 border-cyan-400 text-cyan-100 font-medium shadow-[inset_0_0_12px_rgba(6,182,212,0.15)]";
              } else if (line.unitId === 2) {
                highlightClass =
                  "bg-amber-500/15 border-l-2 border-amber-400 text-amber-100 font-medium shadow-[inset_0_0_12px_rgba(245,158,11,0.15)]";
              } else if (line.unitId === 3) {
                highlightClass =
                  "bg-indigo-500/15 border-l-2 border-indigo-400 text-indigo-100 font-medium shadow-[inset_0_0_12px_rgba(99,102,241,0.15)]";
              } else if (line.unitId === 4) {
                highlightClass =
                  "bg-emerald-500/15 border-l-2 border-emerald-400 text-emerald-100 font-medium shadow-[inset_0_0_12px_rgba(16,185,129,0.15)]";
              }
            }

            return (
              <div
                key={line.num}
                data-unit={line.unitId}
                className={`flex items-center gap-3 px-2 py-0.5 rounded transition-colors ${highlightClass}`}
              >
                {/* Line number */}
                <span
                  className={`w-6 text-right select-none text-[10px] font-mono shrink-0 ${
                    isMarked ? "text-white font-bold" : "text-slate-600"
                  }`}
                >
                  {line.num}
                </span>

                {/* Tokens */}
                <div className="flex-1 whitespace-pre flex items-center">
                  {line.tokens.length === 0 ? (
                    <span>&nbsp;</span>
                  ) : (
                    line.tokens.map((token, tIdx) => (
                      <span
                        key={tIdx}
                        className={`${token.color ?? "text-slate-200"} ${
                          token.bold ? "font-bold" : ""
                        }`}
                      >
                        {token.text}
                      </span>
                    ))
                  )}

                  {/* Show unit title on the first line of the unit */}
                  {line.tokens.some((t) => t.text.includes("// 1.") || t.text.includes("// 2.") || t.text.includes("// 3.") || t.text.includes("// 4.")) &&
                    getUnitBadge(line.unitId)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

