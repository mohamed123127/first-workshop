"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { databaseSlideContent, type DatabaseSlideContent } from "@/content/database";
import { SlideHeader } from "@/components/common/SlideHeader";
import { SlideBackground } from "@/components/common/decorations/SlideBackground";
import {
  Database,
  Users,
  UserCheck,
  BookOpen,
  GraduationCap,
  ArrowLeft,
} from "lucide-react";

export interface DatabaseSlideProps {
  content?: DatabaseSlideContent;
  onNextSlide?: () => void;
  onPrevSlide?: () => void;
  className?: string;
}

/* ── Simplified 4 tables ── */
const TABLES = [
  { id: "users", label: "users", Icon: Users, color: "text-amber-400", border: "border-amber-400/60", glow: "shadow-[0_0_20px_rgba(245,158,11,0.4)]", bg: "bg-amber-950/40" },
  { id: "mentors", label: "mentors", Icon: UserCheck, color: "text-cyan-400", border: "border-cyan-400/60", glow: "shadow-[0_0_20px_rgba(6,182,212,0.4)]", bg: "bg-cyan-950/40" },
  { id: "workshops", label: "workshops", Icon: BookOpen, color: "text-emerald-400", border: "border-emerald-400/60", glow: "shadow-[0_0_20px_rgba(16,185,129,0.4)]", bg: "bg-emerald-950/40" },
  { id: "courses", label: "courses", Icon: GraduationCap, color: "text-indigo-400", border: "border-indigo-400/60", glow: "shadow-[0_0_20px_rgba(99,102,241,0.4)]", bg: "bg-indigo-950/40" },
] as const;

type TableId = typeof TABLES[number]["id"];

/* ── Static rows for the users table preview ── */
const PREVIEW_ROWS = [
  { id: 1, username: "l.mohamed", email: "mohamed@devup-club.dz", password_hash: "$2b$12$e8J2Q9...", created_at: "2024-09-12" },
  { id: 2, username: "b.nazim", email: "nazim@devup-club.dz", password_hash: "$2b$12$k9L3R0...", created_at: "2024-09-15" },
  { id: 3, username: "s.amrani", email: "sarah.a@devup-club.dz", password_hash: "$2b$12$m0M4S1...", created_at: "2024-10-01" },
  { id: 4, username: "y.benali", email: "yanis.b@esi.dz", password_hash: "$2b$12$n1N5T2...", created_at: "2025-01-10" },
  { id: 5, username: "a.khelif", email: "amine.k@usthb.dz", password_hash: "$2b$12$o2O6U3...", created_at: "2025-02-04" },
];

export function DatabaseSlide({
  content = databaseSlideContent,
  onPrevSlide,
  onNextSlide,
  className = "",
}: DatabaseSlideProps) {
  const [selectedTable, setSelectedTable] = useState<TableId>("users");

  const tableData = TABLES.find((t) => t.id === selectedTable) ?? TABLES[0];

  return (
    <section
      className={`relative w-full min-h-screen flex flex-col overflow-hidden bg-[var(--bg-deep-navy)] ${className}`}
    >
      {/* ── Background ── */}
      <SlideBackground
        theme="amber"
        slideTag="SLIDE_06 // DATABASE"
        glowOrbs={[
          { color: "amber", position: "top-right", size: "w-[42rem] h-[32rem]", opacity: "opacity-15" },
          { color: "indigo", position: "bottom-left", size: "w-[36rem] h-[28rem]", opacity: "opacity-10" },
        ]}
      />

      {/* ── Header ── */}
      <SlideHeader
        title={content.title}
        eyebrow={content.eyebrow}
        slideNumber={content.badge}
        accent="amber"
      />

      {/* ══════════════════════════════════════════════
          MAIN CONTENT
          ══════════════════════════════════════════════ */}
      <div className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pb-6 flex flex-col gap-5 min-h-0 mt-16">

        {/* ── Top Bar: DB Identity & Return Arrow Button ── */}
        <div className="flex items-center justify-between w-full gap-4">
          <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-[#0F172A]/90 border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.1)] backdrop-blur-md">
            <div className="flex gap-2">
              <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-400/40">
                <Database className="w-5 h-5 text-amber-400 animate-pulse" />
              </div>
              <div>
                <p className="text-sm font-mono font-bold text-white">{content.database.name}</p>
                <p className="text-[11px] font-mono text-slate-400">
                  {content.database.engine} v{content.database.version}
                  <span className="mx-2 text-slate-700">·</span>
                  port <span className="text-amber-300">{content.database.port}</span>
                </p>
              </div>
            </div>
            <div className="ml-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              CONNECTED
            </div>
          </div>

          {/* Return Arrow Button to Behind the Scenes */}
          <button
            type="button"
            onClick={onPrevSlide}
            className="group flex items-center gap-2 px-4 py-3 rounded-xl bg-[#0F172A]/90 hover:bg-[#1A2338] border border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-white transition-all shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:shadow-[0_0_25px_rgba(245,158,11,0.35)] font-mono text-xs font-bold cursor-pointer hover:scale-105 active:scale-95 shrink-0"
            title="Return to Behind the Scenes"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Behind the Scenes</span>
          </button>
        </div>

        {/* ── Two-column: Tables Icons | Table Preview ── */}
        <div className="flex-1 flex gap-5 min-h-0">

          {/* ══════════════════════════════
              LEFT: 4 table icon cards (vertical)
              ══════════════════════════════ */}
          <div className="flex flex-col gap-3 w-28 sm:w-32 shrink-0">
            {TABLES.map(({ id, label, Icon, color, border, glow, bg }) => {
              const isSelected = selectedTable === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelectedTable(id)}
                  className={`flex flex-col items-center justify-center gap-2 py-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${isSelected
                    ? `${border} ${bg} ${glow}`
                    : "border-white/10 bg-black/30 hover:border-white/25 hover:bg-white/5"
                    }`}
                >
                  <Icon className={`w-7 h-7 transition-all ${isSelected ? color : "text-slate-500"}`} />
                  <span className={`text-[11px] font-mono font-bold tracking-wide transition-all ${isSelected ? "text-white" : "text-slate-500"}`}>
                    {label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ══════════════════════════════
              RIGHT: Table data preview
              ══════════════════════════════ */}
          <div className="flex-1 h-[420px] min-w-0 flex flex-col rounded-2xl bg-[#0A0F1D]/90 border border-slate-800 shadow-2xl overflow-hidden">

            {/* Table header */}
            <div className="px-5 py-3 bg-[#0F172A]/80 border-b border-slate-800 flex items-center gap-3 shrink-0">
              <tableData.Icon className={`w-5 h-5 ${tableData.color}`} />
              <h2 className="text-md font-mono font-bold text-white">
                <span className={tableData.color}>{tableData.label}</span>
              </h2>
            </div>

            {/* Table data — always show users-style structure */}
            <div className="flex-1 flex flex-col p-4 overflow-auto min-h-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTable}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 flex flex-col justify-between min-h-0 h-full"
                >
                  <div className="rounded-xl border border-slate-800 overflow-hidden bg-[#070D1B]">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 bg-slate-900/90">
                          {["id", "username", "email", "password_hash", "created_at"].map((col) => (
                            <th
                              key={col}
                              className="py-3 px-4 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/70 font-mono text-xs">
                        {PREVIEW_ROWS.map((row) => {
                          const isFirst = row.id === 1;
                          return (
                            <tr
                              key={row.id}
                              className={`transition-colors ${isFirst ? "bg-amber-500/8 hover:bg-amber-500/12" : "hover:bg-slate-800/40"}`}
                            >
                              <td className="py-3 px-4 text-slate-500 font-bold">{row.id}</td>
                              <td className="py-3 px-4 text-slate-200 font-semibold">{row.username}</td>
                              <td className="py-3 px-4">
                                <span className={isFirst ? "text-amber-300 font-semibold" : "text-slate-300"}>
                                  {row.email}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400/90 text-[11px]">
                                  {row.password_hash}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-slate-500">{row.created_at}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Footer note */}
                  <p className="mt-auto pt-3 text-[11px] font-mono text-slate-500 px-1 mb-1">
                    Passwords stored as{" "}
                    <span className="text-amber-400">bcrypt</span> hashes · never in plaintext
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
