"use client";

import React, { useState } from "react";
import { introContent, type IntroContent } from "@/content/intro";
import { SplitSection } from "@/components/common/SplitSection";
import { SectionTitle } from "@/components/common/SectionTitle";
import { BulletList } from "@/components/common/BulletList";
import { SlideHeader } from "@/components/common/SlideHeader";
import { SlideBackground } from "@/components/common/decorations/SlideBackground";
import {
  IntroLeftDecorations,
  IntroRightDecorations,
} from "./IntroSlideDecorations";
import { GlassCard } from "./GlassCard";
import { SlideType } from "../flow";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export interface IntroSlideProps extends SlideType {
  content?: IntroContent;
  className?: string;
}

export function IntroSlide({
  content = introContent,
  onNextSlide,
  className = "",
}: IntroSlideProps) {
  const [isPart1Chosen, setIsPart1Chosen] = useState(false);

  const handleChoosePart1 = () => {
    if (isPart1Chosen) return;
    setIsPart1Chosen(true);
    setTimeout(() => {
      onNextSlide?.();
    }, 550);
  };

  return (
    <section
      aria-label={content.heading}
      className={`relative min-h-screen w-full flex flex-col bg-[var(--bg-deep-navy)] overflow-hidden select-none ${className}`}
    >
      {/* Sleek Dotted Pattern Background with Split Accent Orbs */}
      <SlideBackground
        theme="cyan"
        slideTag="SLIDE_02 // SYLLABUS"
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
            size: "w-[38rem] h-[38rem]",
            opacity: "opacity-20",
          },
        ]}
      />

      {/* Slide Heading Header */}
      <SlideHeader
        title={content.heading}
        eyebrow="Workshop Overview"
        slideNumber="Slide 02"
        accent="cyan"
      />

      {/* Two-part split layout with Compact, Responsive Glass Cards */}
      <div className="relative z-10 flex-1 flex min-h-0">
        <SplitSection
          leftClassName="bg-transparent relative !py-3 sm:!py-5 px-4 sm:px-6 md:px-8"
          rightClassName="bg-[var(--cards-charcoal)]/20 md:border-l md:border-white/5 relative !py-3 sm:!py-5 px-4 sm:px-6 md:px-8"
          left={
            <div className="relative w-full h-full flex flex-col justify-center items-center">
              {/* Left Side Foundations Vector Decorations */}
              <IntroLeftDecorations />

              <motion.div
                onClick={handleChoosePart1}
                whileHover={!isPart1Chosen ? { scale: 1.02, y: -3 } : {}}
                whileTap={!isPart1Chosen ? { scale: 0.99 } : {}}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isPart1Chosen
                    ? {
                        scale: 1.03,
                        y: -4,
                        boxShadow: "0 0 45px rgba(6, 182, 212, 0.45)",
                      }
                    : { opacity: 1, y: 0 }
                }
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[430px] lg:max-w-[460px] mx-auto py-2 cursor-pointer relative z-10"
              >
                <div
                  className={`relative rounded-2xl transition-all duration-300 ${
                    isPart1Chosen
                      ? "ring-2 ring-[var(--accent-cyan)] shadow-[0_0_35px_rgba(6,182,212,0.5)]"
                      : "ring-1 ring-white/10 hover:ring-[var(--accent-cyan)]/60"
                  }`}
                >
                  <GlassCard
                    accent="cyan"
                    size="sm"
                    badgeStep="Part 01"
                    badge="Foundations & Concepts"
                    className={
                      isPart1Chosen
                        ? "!border-[var(--accent-cyan)] bg-[var(--cards-charcoal)]/85"
                        : ""
                    }
                  >
                    <SectionTitle as="h2" size="sm">
                      {content.left.title}
                    </SectionTitle>
                    <BulletList
                      items={content.left.items}
                      variant="number"
                      accent="cyan"
                      density="compact"
                    />

                    {/* Clean Selection Status / Action Pill */}
                    <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {isPart1Chosen ? (
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--accent-cyan)]"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-cyan)] animate-bounce" />
                            <span>Selected · Starting Part 01...</span>
                          </motion.div>
                        ) : (
                          <div className="flex items-center gap-1 text-xs font-mono text-slate-300 group-hover:text-[var(--accent-cyan)] transition-colors">
                            <span>Click to start Part 01</span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </div>
                        )}
                      </div>

                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold transition-all ${
                          isPart1Chosen
                            ? "bg-[var(--accent-cyan)] text-[var(--bg-deep-navy)] shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                            : "bg-white/5 text-slate-400 group-hover:bg-[var(--accent-cyan)]/15 group-hover:text-[var(--accent-cyan)]"
                        }`}
                      >
                        {isPart1Chosen ? "Active Selection" : "Start Here"}
                      </span>
                    </div>
                  </GlassCard>
                </div>
              </motion.div>
            </div>
          }
          right={
            <div className="relative w-full h-full flex flex-col justify-center items-center">
              {/* Right Side Roadmap Vector Decorations */}
              <IntroRightDecorations />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isPart1Chosen
                    ? { opacity: 0.22, scale: 0.96, filter: "blur(1.5px)" }
                    : { opacity: 1, scale: 1, filter: "blur(0px)" }
                }
                transition={{ duration: 0.35 }}
                className="w-full max-w-[430px] lg:max-w-[460px] mx-auto py-2 relative z-10"
              >
                <GlassCard
                  accent="indigo"
                  size="sm"
                  badgeStep="Part 02"
                  badge="Roadmap & Lifecycle"
                >
                  <SectionTitle as="h2" size="sm">
                    {content.right.title}
                  </SectionTitle>
                  <BulletList
                    items={content.right.items}
                    variant="number"
                    accent="indigo"
                    density="compact"
                  />

                  <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between opacity-50">
                    <span className="text-xs font-mono text-slate-400">
                      Part 02 will follow
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase text-slate-500 bg-white/5">
                      Upcoming
                    </span>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          }
        />
      </div>
    </section>
  );
}
