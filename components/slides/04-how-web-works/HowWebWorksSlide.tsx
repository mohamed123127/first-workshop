"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  howWebWorksContent,
  type HowWebWorksContent,
} from "@/content/how-web-works";
import { SlideHeader } from "@/components/common/SlideHeader";
import { SlideBackground } from "@/components/common/decorations/SlideBackground";
import {
  HowWebWorksFloatingDecorations,
  HowWebWorksLeftDiagram,
  HowWebWorksRightDiagram,
} from "./HowWebWorksDecorations";
import {
  Lock,
  RotateCw,
  ArrowLeft as NavArrowLeft,
  ArrowRight as NavArrowRight,
  Search,
  Mic,
  Camera,
  X,
  ArrowUp,
  Globe,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export interface HowWebWorksSlideProps {
  content?: HowWebWorksContent;
  onNextSlide?: () => void;
  onPrevSlide?: () => void;
  className?: string;
}

export function HowWebWorksSlide({
  content = howWebWorksContent,
  className = "",
}: HowWebWorksSlideProps) {
  const [urlHovered, setUrlHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [activeQuery, setActiveQuery] = useState("");

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    setActiveQuery(searchQuery.trim());
    setHasSearched(true);
  };

  const handleClear = () => {
    setSearchQuery("");
    setHasSearched(false);
    setActiveQuery("");
  };

  return (
    <section
      aria-label={content.title}
      className={`relative min-h-screen w-full flex flex-col bg-[var(--bg-deep-navy)] overflow-hidden ${className}`}
    >
      {/* Sleek Dotted Pattern Background with Network Ambient Orbs */}
      <SlideBackground
        theme="indigo"
        slideTag="SLIDE_04 // BROWSER_CORE"
        glowOrbs={[
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
        ]}
      />

      {/* Floating Technology Vector Elements */}
      <HowWebWorksFloatingDecorations />

      {/* Slide Header */}
      <SlideHeader
        title={content.title}
        eyebrow={content.eyebrow}
        slideNumber={content.badge}
        accent="cyan"
      />

      {/* Main Container - Centered Big Frame Flanked by Educational Request/Response Diagrams */}
      <div className="relative z-10 flex-1 w-full max-w-[96vw] 2xl:max-w-7xl mx-auto px-2 sm:px-6 py-4 md:py-6 flex items-center justify-center gap-6">
        {/* Left Flank: Client Request & DNS Flow */}
        <HowWebWorksLeftDiagram />

        {/* BIG BROWSER WINDOW FRAME */}
        <div className="flex-1 max-w-5xl h-[580px] sm:h-[640px] rounded-2xl border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.65)] backdrop-blur-2xl bg-[#202124] flex flex-col overflow-hidden relative">
          {/* BROWSER TOP CHROME / TAB BAR */}
          <div className="bg-[#292A2D] px-4 py-2.5 flex items-center gap-3 border-b border-[#3c4043] shrink-0 select-none">
            {/* macOS window controls */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
            </div>

            {/* Browser Tab */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-t-lg bg-[#202124] text-slate-200 text-xs font-medium border-t border-x border-[#3c4043] -mb-2.5 ml-2 shadow-sm">
              {/* Google favicon icon */}
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="truncate max-w-[120px]">
                {hasSearched ? `${activeQuery} - Google Search` : "Google"}
              </span>
              <X
                onClick={handleClear}
                className="w-3 h-3 text-slate-400 hover:text-white cursor-pointer ml-1"
              />
            </div>
          </div>

          {/* BROWSER NAVIGATION & URL ADDRESS BAR */}
          <div className="bg-[#202124] px-4 py-2.5 flex items-center gap-3 border-b border-[#3c4043] shrink-0 relative">
            {/* Back / Forward / Refresh controls */}
            <div className="flex items-center gap-1.5 text-slate-400">
              <button
                onClick={handleClear}
                title="Back to Home"
                className="p-1 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                <NavArrowLeft className="w-4 h-4" />
              </button>
              <button
                className="p-1 rounded-full text-slate-600 cursor-not-allowed"
                disabled
              >
                <NavArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (hasSearched) handleSearch();
                }}
                title="Refresh"
                className="p-1 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>

            {/* URL ADDRESS BAR WITH HOVER ARROW CALLOUT */}
            <div
              onMouseEnter={() => setUrlHovered(true)}
              onMouseLeave={() => setUrlHovered(false)}
              className={`relative flex-1 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#292A2D] border transition-all text-xs font-mono select-none cursor-pointer ${
                urlHovered
                  ? "border-[var(--accent-cyan)] shadow-[0_0_15px_rgba(6,182,212,0.3)] bg-[#303134]"
                  : "border-transparent hover:border-[#5f6368]"
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />

              {/* URL Breakdown */}
              <div className="flex items-center text-slate-300 overflow-hidden truncate">
                <span className="text-slate-500">https://www.</span>
                {/* DOMAIN HIGHLIGHT */}
                <span
                  className={`font-bold transition-colors ${
                    urlHovered ? "text-[var(--accent-cyan)] underline decoration-2 underline-offset-4" : "text-white"
                  }`}
                >
                  {content.domainName}
                </span>
                {hasSearched && (
                  <span className="text-slate-400">
                    /search?q={encodeURIComponent(activeQuery)}
                  </span>
                )}
              </div>

              {/* FLOATING ARROW & TOOLTIP: "THIS IS THE DOMAIN" */}
              <AnimatePresence>
                {urlHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50 pointer-events-none flex flex-col items-center"
                  >
                    {/* Animated arrow pointing UP to domain */}
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                      className="text-[var(--accent-cyan)] -mb-1"
                    >
                      <ArrowUp className="w-5 h-5 stroke-[3]" />
                    </motion.div>

                    {/* Tooltip Card */}
                    <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-[var(--cards-charcoal)] to-[#0F172A] border-2 border-[var(--accent-cyan)] text-white text-xs font-bold tracking-wide shadow-[0_10px_25px_rgba(6,182,212,0.4)] flex items-center gap-2 whitespace-nowrap">
                      <Sparkles className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
                      <span>{content.domainTooltip}</span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/40">
                        {content.domainName}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* BROWSER VIEWPORT (GOOGLE SEARCH ENGINE INTERFACE) */}
          <div className="flex-1 bg-[#202124] text-slate-100 overflow-y-auto flex flex-col">
            {!hasSearched ? (
              /* GOOGLE HOME SEARCH VIEW */
              <div className="flex-1 flex flex-col items-center justify-center p-6 -mt-8">
                {/* Google Logo */}
                <div className="flex items-center font-bold text-5xl sm:text-6xl tracking-tight mb-8 select-none font-sans">
                  <span className="text-[#4285F4]">G</span>
                  <span className="text-[#EA4335]">o</span>
                  <span className="text-[#FBBC05]">o</span>
                  <span className="text-[#4285F4]">g</span>
                  <span className="text-[#34A853]">l</span>
                  <span className="text-[#EA4335]">e</span>
                </div>

                {/* Google Search Form */}
                <form
                  onSubmit={handleSearch}
                  className="w-full max-w-xl flex flex-col items-center gap-6"
                >
                  {/* Google Search Bar Input */}
                  <div className="relative w-full flex items-center rounded-full bg-[#303134] border border-[#5f6368] hover:border-[#8ab4f8] focus-within:border-[#8ab4f8] px-4 py-3 shadow-lg transition-all">
                    <Search className="w-4 h-4 text-slate-400 shrink-0 mr-3" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Google or type a URL..."
                      className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none font-sans"
                    />

                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="text-slate-400 hover:text-white p-1 cursor-pointer mr-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}

                    <div className="flex items-center gap-2.5 text-slate-400 shrink-0 border-l border-[#5f6368] pl-3">
                      <Mic className="w-4 h-4 hover:text-[#4285F4] cursor-pointer" />
                      <Camera className="w-4 h-4 hover:text-[#FBBC05] cursor-pointer" />
                    </div>
                  </div>

                  {/* Google Buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-md bg-[#303134] hover:bg-[#3c4043] text-xs font-medium text-slate-200 border border-transparent hover:border-[#5f6368] transition-colors cursor-pointer"
                    >
                      Google Search
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("how does the web work");
                        setActiveQuery("how does the web work");
                        setHasSearched(true);
                      }}
                      className="px-4 py-2 rounded-md bg-[#303134] hover:bg-[#3c4043] text-xs font-medium text-slate-200 border border-transparent hover:border-[#5f6368] transition-colors cursor-pointer"
                    >
                      I'm Feeling Lucky
                    </button>
                  </div>
                </form>

                <p className="text-xs text-slate-500 mt-8">
                  Google offered in:{" "}
                  <span className="text-[#8ab4f8] hover:underline cursor-pointer">
                    Français
                  </span>{" "}
                  •{" "}
                  <span className="text-[#8ab4f8] hover:underline cursor-pointer">
                    العربية
                  </span>
                </p>
              </div>
            ) : (
              /* GOOGLE RESULTS VIEW */
              <div className="p-6 max-w-4xl w-full mx-auto">
                {/* Search Bar on top */}
                <form
                  onSubmit={handleSearch}
                  className="flex items-center gap-3 mb-6 pb-4 border-b border-[#3c4043]"
                >
                  <div className="relative flex-1 flex items-center rounded-full bg-[#303134] border border-[#5f6368] px-4 py-2 shadow-sm">
                    <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm text-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleClear}
                      className="text-slate-400 hover:text-white p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[var(--action-indigo)] text-white text-xs font-semibold cursor-pointer"
                  >
                    Search
                  </button>
                </form>

                {/* Results Stats */}
                <p className="text-[11px] text-slate-400 mb-6">
                  About 1,840,000,000 results (0.38 seconds) for{" "}
                  <span className="text-white font-semibold">"{activeQuery}"</span>
                </p>

                {/* Simulated Google Search Results */}
                <div className="space-y-6">
                  {/* Result 1 */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Globe className="w-3.5 h-3.5 text-[#34A853]" />
                      <span>https://developer.mozilla.org › Web › Basics</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-medium text-[#8ab4f8] hover:underline cursor-pointer">
                      How the Web works - Learn web development | MDN
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      When you type a web address into your browser (like google.com), your computer connects to a server, resolves the domain name via DNS, and requests data via HTTP.
                    </p>
                  </div>

                  {/* Result 2 */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Globe className="w-3.5 h-3.5 text-[#4285F4]" />
                      <span>https://www.cloudflare.com › learning › dns</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-medium text-[#8ab4f8] hover:underline cursor-pointer">
                      What is a Domain Name? | Cloudflare Learning Center
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      A domain name is a string of text that maps to an alphanumeric IP address, used to access a website from client software. In plain English, it's the address people type in a browser.
                    </p>
                  </div>

                  {/* Result 3 */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Globe className="w-3.5 h-3.5 text-[#FBBC05]" />
                      <span>https://web.dev › articles › howbrowserswork</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-medium text-[#8ab4f8] hover:underline cursor-pointer">
                      How Browsers Work: Behind the scenes of modern web browsers
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      An in-depth look at how browsers parse HTML, build the DOM tree, execute JavaScript, compute styles, and paint web pages.
                    </p>
                  </div>
                </div>

                {/* External link action */}
                <div className="mt-8 pt-4 border-t border-[#3c4043] flex items-center justify-between">
                  <button
                    onClick={handleClear}
                    className="text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    ← Back to Google Home
                  </button>

                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(activeQuery)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#8ab4f8] hover:underline cursor-pointer"
                  >
                    <span>Open real search on Google</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
