"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { howWebWorksContent, type HowWebWorksContent } from "@/content/how-web-works";
import { SlideHeader } from "@/components/common/SlideHeader";
import { SlideBackground } from "@/components/common/decorations/SlideBackground";
import { HowWebWorksFloatingDecorations, HowWebWorksLeftDiagram, HowWebWorksRightDiagram } from "./HowWebWorksDecorations";
import {
  Lock, RotateCw, ArrowLeft as NavArrowLeft, ArrowRight as NavArrowRight,
  Search, Mic, Camera, X, ArrowUp, Globe, ExternalLink, Sparkles,
  User, Mail, KeyRound, LogIn, LogOut, Eye, EyeOff, Code2, Zap, Users, BookOpen, Terminal, ChevronRight,
} from "lucide-react";

export interface HowWebWorksSlideProps {
  content?: HowWebWorksContent;
  onNextSlide?: () => void;
  onPrevSlide?: () => void;
  className?: string;
}

type Page = "google-home" | "google-results" | "devup-site";

const DEVUP_QUERY = "devup club";
const TYPE_INTERVAL_MS = 80; // ms per character when auto-typing

export function HowWebWorksSlide({
  content = howWebWorksContent,
  onNextSlide,
  onPrevSlide,
  className = "",
}: HowWebWorksSlideProps) {
  /* ── Browser chrome state ── */
  const [urlHovered, setUrlHovered] = useState(false);
  const [page, setPage] = useState<Page>("google-home");

  /* ── Search input state ── */
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasStartedTyping = useRef(false);

  /* ── DevUp site state ── */
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState("mohamed@devup-club.dz");
  const [loginPassword, setLoginPassword] = useState("workshop2026");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [isZoomingIn, setIsZoomingIn] = useState(false);

  /* ── Auto-type "devup club" on any keypress (only on google-home) ── */
  useEffect(() => {
    const handleKey = () => {
      if (page !== "google-home") return;
      if (hasStartedTyping.current) return;
      hasStartedTyping.current = true;
      setIsTyping(true);
      let idx = 0;
      typingRef.current = setInterval(() => {
        idx++;
        setSearchQuery(DEVUP_QUERY.slice(0, idx));
        if (idx >= DEVUP_QUERY.length) {
          clearInterval(typingRef.current!);
          setIsTyping(false);
          // Auto-submit after a short pause
          setTimeout(() => setPage("google-results"), 500);
        }
      }, TYPE_INTERVAL_MS);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      if (typingRef.current) clearInterval(typingRef.current);
    };
  }, [page]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    setPage("google-results");
  };

  const handleGoHome = () => {
    setPage("google-home");
    setSearchQuery("");
    hasStartedTyping.current = false;
    setShowLogin(false);
    setIsLoggedIn(false);
  };

  const handleBack = () => {
    if (page === "devup-site" && showLogin) {
      setShowLogin(false);
    } else if (page === "devup-site") {
      setPage("google-results");
    } else if (page === "google-results") {
      handleGoHome();
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isZoomingIn) return;
    setLoginLoading(true);
    setIsZoomingIn(true);
    setTimeout(() => {
      if (onNextSlide) {
        onNextSlide();
      }
      setIsZoomingIn(false);
      setLoginLoading(false);
      setIsLoggedIn(true);
      setShowLogin(false);
    }, 700);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLogin(false);
    setLoginPassword("");
  };

  /* ── Derived URL for address bar ── */
  const addressUrl = page === "devup-site"
    ? (showLogin ? "https://www.devup-club.dz/login" : "https://www.devup-club.dz")
    : page === "google-results"
      ? `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`
      : "https://www.google.com";

  const tabTitle = page === "devup-site"
    ? (showLogin ? "Login · DevUp Club" : "DevUp Club · Algeria's Coding Community")
    : page === "google-results"
      ? `${searchQuery} - Google Search`
      : "Google";

  /* ─────────────────────────── RENDER ─────────────────────────── */
  return (
    <section
      aria-label={content.title}
      className={`relative min-h-screen w-full flex flex-col bg-[var(--bg-deep-navy)] overflow-hidden ${className}`}
    >
      <SlideBackground
        theme="indigo"
        slideTag="SLIDE_05 // BROWSER_CORE"
        glowOrbs={[
          { color: "cyan", position: "top-left", size: "w-[36rem] h-[36rem]", opacity: "opacity-15" },
          { color: "indigo", position: "bottom-right", size: "w-[40rem] h-[40rem]", opacity: "opacity-20" },
        ]}
      />

      <SlideHeader title={content.title} eyebrow={content.eyebrow} slideNumber={content.badge} accent="cyan" />

      <div className="relative z-10 flex-1 w-full -auto px-2 sm:px-6 py-4 md:py-6 flex items-center justify-center gap-6">

        {/* ═══════════════════ BROWSER CHROME ═══════════════════ */}
        <div className="flex-1 max-w-5xl h-[580px] sm:h-[640px] rounded-2xl border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.65)] backdrop-blur-2xl bg-[#202124] flex flex-col overflow-hidden relative">

          {/* ── Tab Bar ── */}
          <div className="bg-[#292A2D] px-4 py-2.5 flex items-center gap-3 border-b border-[#3c4043] shrink-0 select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
            </div>
            {/* Tab */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-t-lg bg-[#202124] text-slate-200 text-xs font-medium border-t border-x border-[#3c4043] -mb-2.5 ml-2 shadow-sm max-w-xs">
              {page === "devup-site" ? (
                <span className="w-3.5 h-3.5 rounded-sm bg-gradient-to-br from-indigo-500 to-cyan-500 shrink-0" />
              ) : (
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              )}
              <span className="truncate max-w-[180px]">{tabTitle}</span>
              <X onClick={handleGoHome} className="w-3 h-3 text-slate-400 hover:text-white cursor-pointer ml-auto shrink-0" />
            </div>
          </div>

          {/* ── Address / Nav Bar ── */}
          <div className="bg-[#202124] px-4 py-2.5 flex items-center gap-3 border-b border-[#3c4043] shrink-0 relative">
            <div className="flex items-center gap-1.5 text-slate-400">
              <button onClick={handleBack} title="Back" className="p-1 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer">
                <NavArrowLeft className="w-4 h-4" />
              </button>
              <button className="p-1 rounded-full text-slate-600 cursor-not-allowed" disabled>
                <NavArrowRight className="w-4 h-4" />
              </button>
              <button className="p-1 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer">
                <RotateCw className="w-4 h-4" />
              </button>
            </div>

            {/* URL bar */}
            <div
              onMouseEnter={() => setUrlHovered(true)}
              onMouseLeave={() => setUrlHovered(false)}
              className={`relative flex-1 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#292A2D] border transition-all text-xs font-mono select-none cursor-pointer ${urlHovered ? "border-[var(--accent-cyan)] shadow-[0_0_15px_rgba(6,182,212,0.3)] bg-[#303134]" : "border-transparent hover:border-[#5f6368]"
                }`}
            >
              <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <div className="flex items-center text-slate-300 overflow-hidden truncate">
                <span className="text-slate-500">https://www.</span>
                <span className={`font-bold transition-colors ${urlHovered ? "text-[var(--accent-cyan)] underline decoration-2 underline-offset-4" : "text-white"}`}>
                  {page === "devup-site" ? "devup-club.dz" : "google.com"}
                </span>
                {page === "devup-site" && showLogin && (
                  <span className="text-cyan-400 font-semibold">/login</span>
                )}
                {page === "google-results" && (
                  <span className="text-slate-400">/search?q={encodeURIComponent(searchQuery)}</span>
                )}
              </div>

              {/* Domain tooltip */}
              <AnimatePresence>
                {urlHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50 pointer-events-none flex flex-col items-center"
                  >
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }} className="text-[var(--accent-cyan)] -mb-1">
                      <ArrowUp className="w-5 h-5 stroke-[3]" />
                    </motion.div>
                    <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-[var(--cards-charcoal)] to-[#0F172A] border-2 border-[var(--accent-cyan)] text-white text-xs font-bold tracking-wide shadow-[0_10px_25px_rgba(6,182,212,0.4)] flex items-center gap-2 whitespace-nowrap">
                      <Sparkles className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
                      <span>{content.domainTooltip}</span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/40">
                        {page === "devup-site" ? "devup-club.dz" : content.domainName}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ═══════════════════ BROWSER VIEWPORT ═══════════════════ */}
          <div className="flex-1 bg-[#202124] text-slate-100 overflow-y-auto flex flex-col">
            <AnimatePresence mode="wait">

              {/* ───── GOOGLE HOME ───── */}
              {page === "google-home" && (
                <motion.div key="google-home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center p-6 -mt-8">
                  <div className="flex items-center font-bold text-5xl sm:text-6xl tracking-tight mb-8 select-none font-sans">
                    <span className="text-[#4285F4]">G</span><span className="text-[#EA4335]">o</span>
                    <span className="text-[#FBBC05]">o</span><span className="text-[#4285F4]">g</span>
                    <span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span>
                  </div>

                  <form onSubmit={handleSearch} className="w-full max-w-xl flex flex-col items-center gap-6">
                    <div className="relative w-full flex items-center rounded-full bg-[#303134] border border-[#5f6368] hover:border-[#8ab4f8] focus-within:border-[#8ab4f8] px-4 py-3 shadow-lg transition-all">
                      <Search className="w-4 h-4 text-slate-400 shrink-0 mr-3" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Press any key to search..."
                        className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none font-sans"
                        autoFocus
                      />
                      {/* Blinking cursor when typing */}
                      {isTyping && (
                        <span className="animate-pulse text-[var(--accent-cyan)] text-lg font-thin ml-0.5">|</span>
                      )}
                      {searchQuery && !isTyping && (
                        <button type="button" onClick={() => { setSearchQuery(""); hasStartedTyping.current = false; }} className="text-slate-400 hover:text-white p-1 cursor-pointer mr-2">
                          <X className="w-4 h-4" />
                        </button>
                      )}
                      <div className="flex items-center gap-2.5 text-slate-400 shrink-0 border-l border-[#5f6368] pl-3">
                        <Mic className="w-4 h-4 hover:text-[#4285F4] cursor-pointer" />
                        <Camera className="w-4 h-4 hover:text-[#FBBC05] cursor-pointer" />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button type="submit" className="px-4 py-2 rounded-md bg-[#303134] hover:bg-[#3c4043] text-xs font-medium text-slate-200 border border-transparent hover:border-[#5f6368] transition-colors cursor-pointer">
                        Google Search
                      </button>
                      <button type="button" onClick={() => { setSearchQuery(DEVUP_QUERY); hasStartedTyping.current = true; setTimeout(() => setPage("google-results"), 200); }} className="px-4 py-2 rounded-md bg-[#303134] hover:bg-[#3c4043] text-xs font-medium text-slate-200 border border-transparent hover:border-[#5f6368] transition-colors cursor-pointer">
                        I&apos;m Feeling Lucky
                      </button>
                    </div>
                  </form>

                  <p className="text-[11px] text-slate-500 mt-6 font-mono tracking-wider animate-pulse">
                    ⌨ Press any key to auto-search...
                  </p>
                </motion.div>
              )}

              {/* ───── GOOGLE RESULTS ───── */}
              {page === "google-results" && (
                <motion.div key="google-results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-5 max-w-4xl w-full mx-auto">
                  <form onSubmit={handleSearch} className="flex items-center gap-3 mb-5 pb-4 border-b border-[#3c4043]">
                    <div className="relative flex-1 flex items-center rounded-full bg-[#303134] border border-[#5f6368] px-4 py-2 shadow-sm">
                      <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-transparent text-xs sm:text-sm text-white focus:outline-none" />
                      <button type="button" onClick={handleGoHome} className="text-slate-400 hover:text-white p-1 cursor-pointer">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button type="submit" className="px-4 py-2 rounded-lg bg-[var(--action-indigo)] text-white text-xs font-semibold cursor-pointer hover:bg-indigo-500 transition-colors">
                      Search
                    </button>
                  </form>

                  <p className="text-[11px] text-slate-400 mb-5">
                    About 1,240,000 results (0.22 seconds) for <span className="text-white font-semibold">&quot;{searchQuery}&quot;</span>
                  </p>

                  <div className="space-y-5">
                    {/* ★ DevUp Club Result (top / featured) */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      onClick={() => setPage("devup-site")}
                      className="flex flex-col gap-1 p-3 -mx-3 rounded-xl hover:bg-white/5 cursor-pointer group border border-indigo-500/30 bg-indigo-500/5 relative overflow-hidden"
                    >
                      {/* Featured badge */}
                      <span className="absolute top-2 right-3 text-[9px] font-mono font-bold tracking-widest text-indigo-400 uppercase">Featured</span>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="w-4 h-4 rounded-sm bg-gradient-to-br from-indigo-500 to-cyan-500 inline-block shrink-0" />
                        <span className="text-cyan-400 font-mono">https://www.devup-club.dz</span>
                      </div>
                      <h4 className="text-base sm:text-lg font-semibold text-[#8ab4f8] group-hover:underline flex items-center gap-2">
                        DevUp Club — Algeria&apos;s Premier Coding Community
                        <ChevronRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        Join DevUp Club — Algeria&apos;s fastest-growing tech community for developers, designers & CS students. Workshops, hackathons, and open-source projects.
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {["Workshops", "Hackathons", "Open Source", "Web Dev", "AI & ML"].map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-mono text-indigo-300 bg-indigo-500/15 border border-indigo-500/25">{tag}</span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Generic Result 2 */}
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 }} className="flex flex-col gap-1 hover:bg-white/5 p-2 -mx-2 rounded cursor-pointer">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Globe className="w-3.5 h-3.5 text-[#4285F4]" />
                        <span>https://www.facebook.com › groups › devup</span>
                      </div>
                      <h4 className="text-base font-medium text-[#8ab4f8] hover:underline">DevUp Club - Facebook Group | 12,400 members</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">Public group for DevUp Club Algeria. Share projects, job posts, and tech news with the community.</p>
                    </motion.div>

                    {/* Generic Result 3 */}
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.26 }} className="flex flex-col gap-1 hover:bg-white/5 p-2 -mx-2 rounded cursor-pointer">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Globe className="w-3.5 h-3.5 text-[#FBBC05]" />
                        <span>https://github.com › devup-club</span>
                      </div>
                      <h4 className="text-base font-medium text-[#8ab4f8] hover:underline">devup-club · GitHub — Open source projects & contributions</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">GitHub organization hosting all DevUp Club open-source repositories, workshop starter kits, and collaborative projects.</p>
                    </motion.div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#3c4043] flex items-center justify-between">
                    <button onClick={handleGoHome} className="text-xs text-slate-400 hover:text-white cursor-pointer">← Back to Google Home</button>
                    <span className="text-[10px] font-mono text-slate-500">Click the top result to visit DevUp Club ↑</span>
                  </div>
                </motion.div>
              )}

              {/* ───── DEVUP CLUB WEBSITE ───── */}
              {page === "devup-site" && (
                <motion.div key="devup-site" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col bg-[#0A0F1E] text-white overflow-hidden">

                  {/* ── Site Nav ── */}
                  <nav className="sticky top-0 z-30 w-full bg-[#0D1526]/95 backdrop-blur-xl border-b border-white/10 px-4 sm:px-5 py-2.5 flex items-center justify-between shrink-0">
                    {/* Left: Logo & Top-Left Login Button */}
                    <div className="flex items-center gap-2.5 sm:gap-3 select-none">
                      <div
                        onClick={() => setShowLogin(false)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.6)]">
                          <Code2 className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-sm tracking-tight text-white">
                          Dev<span className="text-cyan-400">Up</span> Club
                        </span>
                      </div>


                    </div>

                    {/* Nav links */}
                    <div className="hidden sm:flex items-center gap-5 text-xs font-medium text-slate-300">
                      {["About", "Events", "Projects", "Blog", "Join Us"].map((l) => (
                        <span
                          key={l}
                          onClick={() => setShowLogin(false)}
                          className="hover:text-white cursor-pointer transition-colors"
                        >
                          {l}
                        </span>
                      ))}
                    </div>

                    {/* Right side status / login / logout button */}
                    {isLoggedIn ? (
                      <div className="flex items-center gap-2">
                        <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Mohamed</span>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-semibold border border-rose-500/40 transition-all cursor-pointer shadow-[0_0_12px_rgba(244,63,94,0.2)]"
                          title="Log Out"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Logout</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowLogin((v) => !v)}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-all shadow-[0_0_12px_rgba(99,102,241,0.4)] cursor-pointer"
                      >
                        <LogIn className="w-3.5 h-3.5" />
                        <span>Login</span>
                      </button>
                    )}
                  </nav>

                  {/* ── Site Body (switches between Home and Login View INSIDE THE FRAME) ── */}
                  <div className="flex-1 flex flex-col relative overflow-y-auto">
                    <AnimatePresence mode="wait">
                      {showLogin ? (
                        /* ───── LOGIN FORM INSIDE THE FRAME ───── */
                        <motion.div
                          key="devup-login-view"
                          initial={{ opacity: 0, y: 12, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -12, scale: 0.98 }}
                          transition={{ duration: 0.22 }}
                          className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 relative my-auto"
                        >
                          {/* Ambient glow inside frame */}
                          <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-indigo-600/15 blur-[70px] pointer-events-none" />
                          <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-cyan-500/10 blur-[70px] pointer-events-none" />

                          {/* Login Card inside frame */}
                          <div className="relative w-full max-w-sm rounded-2xl bg-[#0D1526]/95 border border-indigo-500/30 p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                            {/* Card top bar */}
                            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                              <button
                                onClick={() => setShowLogin(false)}
                                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer font-mono"
                              >
                                <NavArrowLeft className="w-3.5 h-3.5" />
                                <span>Back to Home</span>
                              </button>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/15 text-cyan-300 border border-indigo-500/30">
                                /login
                              </span>
                            </div>

                            {/* Header */}
                            <div className="flex items-center gap-2.5 mb-3">
                              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-[0_0_16px_rgba(99,102,241,0.6)]">
                                <Code2 className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <div className="text-sm font-bold text-white leading-tight">
                                  Dev<span className="text-cyan-400">Up</span> Club
                                </div>
                                <div className="text-[10px] text-slate-400 font-mono">
                                  Member Portal
                                </div>
                              </div>
                            </div>

                            <h2 className="text-base font-bold text-white mb-0.5">Welcome back 👋</h2>
                            <p className="text-xs text-slate-400 mb-4">Sign in inside the DevUp web portal</p>

                            {isLoggedIn ? (
                              <div className="flex flex-col items-center gap-3 py-3 text-center">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-lg font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                                  M
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-white">Louahchi Mohamed</div>
                                  <div className="text-xs text-cyan-400 font-mono">@louahchi.m · Member</div>
                                </div>
                                <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-400 font-mono">
                                  ✓ Logged in successfully
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <button
                                    onClick={() => setShowLogin(false)}
                                    className="text-xs text-cyan-400 hover:underline cursor-pointer"
                                  >
                                    ← Return to Homepage
                                  </button>
                                  <span className="text-white/20">•</span>
                                  <button
                                    onClick={handleLogout}
                                    className="text-xs text-rose-400 hover:underline cursor-pointer flex items-center gap-1"
                                  >
                                    <LogOut className="w-3 h-3" />
                                    <span>Log Out</span>
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <form onSubmit={handleLogin} className="flex flex-col gap-3">
                                {/* Email */}
                                <div className="flex flex-col gap-1">
                                  <label className="text-[11px] text-slate-300 font-medium">Email</label>
                                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus-within:border-indigo-500 focus-within:shadow-[0_0_10px_rgba(99,102,241,0.2)] transition-all">
                                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                    <input
                                      type="email"
                                      value={loginEmail}
                                      onChange={(e) => setLoginEmail(e.target.value)}
                                      placeholder="you@devup-club.dz"
                                      className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
                                      required
                                    />
                                  </div>
                                </div>

                                {/* Password */}
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-center justify-between">
                                    <label className="text-[11px] text-slate-300 font-medium">Password</label>
                                    <span className="text-[10px] text-indigo-400 hover:text-indigo-300 cursor-pointer">Forgot?</span>
                                  </div>
                                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus-within:border-indigo-500 focus-within:shadow-[0_0_10px_rgba(99,102,241,0.2)] transition-all">
                                    <KeyRound className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                    <input
                                      type={showPassword ? "text" : "password"}
                                      value={loginPassword}
                                      onChange={(e) => setLoginPassword(e.target.value)}
                                      placeholder="••••••••"
                                      className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
                                      required
                                    />
                                    <button
                                      type="button"
                                      onClick={() => setShowPassword((v) => !v)}
                                      className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                                    >
                                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                    </button>
                                  </div>
                                </div>

                                {/* Submit — Zooms into backend slide when clicked */}
                                <motion.button
                                  type="submit"
                                  disabled={loginLoading}
                                  animate={
                                    isZoomingIn
                                      ? {
                                        scale: [1, 2.5, 28],
                                        opacity: [1, 1, 0.9],
                                        filter: ["blur(0px)", "blur(2px)", "blur(8px)"],
                                        boxShadow: "0 0 100px 35px rgba(6, 182, 212, 0.9)",
                                      }
                                      : {}
                                  }
                                  transition={
                                    isZoomingIn
                                      ? { duration: 0.7, ease: [0.65, 0, 0.35, 1] }
                                      : undefined
                                  }
                                  className="relative z-30 mt-1 w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-cyan-600 text-white text-xs font-bold shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all cursor-zoom-in disabled:opacity-90 flex items-center justify-center gap-2 overflow-hidden"
                                >
                                  {isZoomingIn ? (
                                    <span className="font-mono text-cyan-200 tracking-wider">ENTERING BACKEND...</span>
                                  ) : loginLoading ? (
                                    <>
                                      <RotateCw className="w-3.5 h-3.5 animate-spin" />
                                      <span>Signing in...</span>
                                    </>
                                  ) : (
                                    <>
                                      <LogIn className="w-3.5 h-3.5" />
                                      <span>Sign In</span>
                                    </>
                                  )}
                                </motion.button>

                                <p className="text-center text-[10px] text-slate-400 mt-0.5">
                                  Not a member yet?{" "}
                                  <span className="text-cyan-400 hover:text-cyan-300 cursor-pointer font-semibold">Join DevUp Club</span>
                                </p>
                              </form>
                            )}
                          </div>
                        </motion.div>
                      ) : (
                        /* ── NORMAL HOMEPAGE CONTENT ── */
                        <motion.div
                          key="devup-home-view"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex-1 flex flex-col"
                        >
                          {/* ── Hero Section ── */}
                          <div className="relative px-6 py-10 flex flex-col items-center text-center overflow-hidden">
                            {/* Background gradient blobs */}
                            <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-indigo-600/15 blur-[80px] pointer-events-none" />
                            <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none" />

                            <span className="mb-4 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase text-cyan-400 bg-cyan-400/10 border border-cyan-400/25">
                              🇩🇿 Algeria&apos;s Dev Community
                            </span>

                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight mb-3 relative z-10">
                              Build. Connect. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Grow.</span>
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed mb-6 relative z-10">
                              DevUp Club is a student-led tech community dedicated to building real-world skills through workshops, hackathons, and open-source collaboration.
                            </p>

                            <div className="flex items-center gap-3 relative z-10">
                              <button
                                onClick={() => {
                                  if (!isLoggedIn) setShowLogin(true);
                                }}
                                className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-xs font-bold shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
                              >
                                {isLoggedIn ? "Explore Workshops →" : "Join the Club →"}
                              </button>
                              {isLoggedIn ? (
                                <button
                                  onClick={handleLogout}
                                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold hover:bg-rose-500/25 transition-all cursor-pointer shadow-[0_0_12px_rgba(244,63,94,0.15)]"
                                >
                                  <LogOut className="w-3.5 h-3.5" />
                                  <span>Logout</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => setShowLogin(true)}
                                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-semibold hover:bg-white/10 transition-all cursor-pointer"
                                >
                                  Member Login
                                </button>
                              )}
                            </div>

                            {/* Stats Row */}
                            <div className="flex items-center gap-6 mt-8 relative z-10">
                              {[{ n: "1,200+", l: "Members" }, { n: "48", l: "Workshops" }, { n: "12", l: "Hackathons" }].map((s) => (
                                <div key={s.l} className="text-center">
                                  <div className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">{s.n}</div>
                                  <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">{s.l}</div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* ── Feature Cards ── */}
                          <div className="px-5 pb-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                              { icon: <Zap className="w-4 h-4" />, title: "Workshops", desc: "Hands-on sessions every week", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
                              { icon: <Terminal className="w-4 h-4" />, title: "Hackathons", desc: "Build & compete with peers", color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20" },
                              { icon: <Users className="w-4 h-4" />, title: "Community", desc: "1,200+ Algerian developers", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
                              { icon: <BookOpen className="w-4 h-4" />, title: "Resources", desc: "Courses, notes & projects", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
                            ].map((card) => (
                              <div
                                key={card.title}
                                onClick={() => setShowLogin(true)}
                                className={`flex flex-col gap-2 p-3 rounded-xl border ${card.bg} backdrop-blur-sm cursor-pointer hover:scale-[1.02] transition-transform`}
                              >
                                <div className={card.color}>{card.icon}</div>
                                <div className="text-xs font-bold text-white">{card.title}</div>
                                <div className="text-[10px] text-slate-400 leading-tight">{card.desc}</div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
        {/* ─────────────────────────────────────────────────────────── */}

      </div>
    </section>
  );
}
