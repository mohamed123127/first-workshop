"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { MotionType, slideContainerVariants, EASINGS } from "@/motion";
import { getAllSlidesFlow, getNextSlideFlow, getPrevSlideFlow } from "@/components/slides/flow";
import { TeachersSlide } from "@/components/slides/01-teachers";
import { IntroSlide } from "@/components/slides/02-intro";
import { WebOverviewSlide } from "@/components/slides/03-web-overview";
import { WebVsNativeSlide } from "@/components/slides/04-web-vs-native";
import { HowWebWorksSlide } from "@/components/slides/04-how-web-works";


// import { WebBehindScenesSlide } from "@/components/slides/05-web-behind-scenes";
import { DatabaseSlide } from "@/components/slides/06-database";
import { InternetSlide } from "@/components/slides/07-internet";
import { ProjectLifecycleSlide } from "@/components/slides/07-project-lifecycle";
import { TeamworkGitSlide } from "@/components/slides/09-teamwork-git";

import { WebBehindScenesSlide as WebBehindScenesSlide1 } from "@/components/slides/05-web-behind-scenes1";




export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [activeMotion, setActiveMotion] = useState<MotionType>("fade");
  const [slide6ActiveStep, setSlide6ActiveStep] = useState(1);
  const [slide6MaxRevealedStep, setSlide6MaxRevealedStep] = useState(1);
  const [isDockMinimized, setIsDockMinimized] = useState(false);

  const goToSlide = useCallback((targetId: number, motion: MotionType) => {
    setActiveMotion(motion);
    setCurrentSlide(targetId);
  }, []);

  const handleNext = useCallback(() => {
    const { nextId, motion } = getNextSlideFlow(currentSlide);
    goToSlide(nextId, motion);
  }, [currentSlide, goToSlide]);

  const handlePrev = useCallback(() => {
    const { prevId, motion } = getPrevSlideFlow(currentSlide);
    goToSlide(prevId, motion);
  }, [currentSlide, goToSlide]);

  // Keyboard navigation (Left / Right arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // ─── Scroll wheel navigation: scroll down on slide 1 → go to slide 2 ───────
  const scrollCooldown = useRef(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Only intercept on slide 1 (Teachers intro slide)
      if (currentSlide !== 1) return;
      // Only trigger on a meaningful downward scroll
      if (e.deltaY < 40) return;
      // Throttle: ignore repeated fast scroll events
      if (scrollCooldown.current) return;

      scrollCooldown.current = true;
      handleNext();
      // Release the cooldown after the slide transition finishes (~700 ms)
      setTimeout(() => {
        scrollCooldown.current = false;
      }, 700);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentSlide, handleNext]);

  const slideList = getAllSlidesFlow();
  const currentVariants = slideContainerVariants[activeMotion] ?? slideContainerVariants.fade;

  return (
    <main className="min-h-screen w-full bg-[#0F172A] text-slate-100 relative flex flex-col justify-between overflow-x-hidden">
      {/* Active Slide Display with Linked Motion Transitions */}
      <div className="w-full flex-1 relative overflow-hidden pb-14 sm:pb-16">
        <AnimatePresence mode="wait" custom={activeMotion}>
          {currentSlide === 1 && (
            <motion.div
              key="slide-1"
              variants={currentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: EASINGS.snappy }}
              className="w-full"
            >
              <TeachersSlide onNextSlide={handleNext} />
            </motion.div>
          )}

          {currentSlide === 2 && (
            <motion.div
              key="slide-2"
              variants={currentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: EASINGS.snappy }}
              className="w-full"
            >
              <IntroSlide onNextSlide={handleNext} />
            </motion.div>
          )}

          {currentSlide === 3 && (
            <motion.div
              key="slide-3"
              variants={currentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: EASINGS.snappy }}
              className="w-full"
            >
              <WebOverviewSlide onNextSlide={handleNext} />
            </motion.div>
          )}

          {currentSlide === 4 && (
            <motion.div
              key="slide-4"
              variants={currentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: EASINGS.snappy }}
              className="w-full"
            >
              <WebVsNativeSlide onExploreNext={handleNext} />
            </motion.div>
          )}

          {currentSlide === 5 && (
            <motion.div
              key="slide-5"
              variants={currentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: EASINGS.snappy }}
              className="w-full"
            >
              <HowWebWorksSlide
                onPrevSlide={handlePrev}
                onNextSlide={handleNext}
              />
            </motion.div>
          )}

          {currentSlide === 6 && (
            <motion.div
              key="slide-6"
              variants={currentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: EASINGS.snappy }}
              className="w-full"
            >
              <WebBehindScenesSlide1
                onPrevSlide={handlePrev}
                onNextSlide={handleNext}
                onOpenDatabase={() => goToSlide(7, "fade")}
                activeStep={slide6ActiveStep}
                setActiveStep={setSlide6ActiveStep}
                maxRevealedStep={slide6MaxRevealedStep}
                setMaxRevealedStep={setSlide6MaxRevealedStep}
              />
            </motion.div>
          )}

          {currentSlide === 7 && (
            <motion.div
              key="slide-7"
              variants={currentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: EASINGS.snappy }}
              className="w-full"
            >
              <DatabaseSlide
                onPrevSlide={() => goToSlide(6, "fade")}
                onNextSlide={handleNext}
              />
            </motion.div>
          )}

          {currentSlide === 8 && (
            <motion.div
              key="slide-8"
              variants={currentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: EASINGS.snappy }}
              className="w-full"
            >
              <InternetSlide
                onPrevSlide={handlePrev}
                onNextSlide={handleNext}
              />
            </motion.div>
          )}

          {currentSlide === 9 && (
            <motion.div
              key="slide-10"
              variants={currentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: EASINGS.snappy }}
              className="w-full"
            >
              <ProjectLifecycleSlide
                onPrevSlide={handlePrev}
                onNextSlide={handleNext}
              />
            </motion.div>
          )}
          {currentSlide === 10 && (
            <motion.div
              key="slide-11"
              variants={currentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: EASINGS.snappy }}
              className="w-full"
            >
              <TeamworkGitSlide
                onPrevSlide={handlePrev}
                onNextSlide={handleNext}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Presentation Dock Controls - Lowered & Collapsible */}
      <div className="fixed bottom-2 sm:bottom-3 inset-x-0 flex items-center justify-center z-50 pointer-events-none px-2 sm:px-4">
        <AnimatePresence mode="wait">
          {isDockMinimized ? (
            <motion.div
              key="dock-minimized"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F172A]/90 border border-white/10 backdrop-blur-xl shadow-2xl text-xs font-mono select-none"
            >
              <button
                onClick={handlePrev}
                aria-label="Previous slide"
                className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Previous slide (Left Arrow)"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <span className="font-bold text-white text-[11px] px-1">
                Slide {String(currentSlide).padStart(2, "0")} / {String(slideList.length).padStart(2, "0")}
              </span>

              <button
                onClick={handleNext}
                aria-label="Next slide"
                className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Next slide (Right Arrow)"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <span className="w-px h-3.5 bg-white/10 mx-0.5" />

              <button
                onClick={() => setIsDockMinimized(false)}
                className="flex items-center gap-1 text-[10px] font-mono font-semibold text-cyan-300 hover:text-cyan-200 transition-colors cursor-pointer pl-0.5"
                title="Show full slide navigation bar"
              >
                <ChevronUp className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Show Bar</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="dock-expanded"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-2xl bg-[#0F172A]/90 hover:bg-[#0F172A]/95 border border-white/10 backdrop-blur-xl shadow-2xl max-w-full overflow-x-auto select-none"
            >
              {/* Previous Button */}
              <button
                onClick={handlePrev}
                aria-label="Previous slide"
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                title="Previous slide (Left Arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Slide Indicator Pills */}
              <div className="flex items-center gap-1 px-1 overflow-x-auto">
                {slideList.map((route) => {
                  const isActive = currentSlide === route.id;
                  return (
                    <button
                      key={route.id}
                      onClick={() =>
                        goToSlide(
                          route.id,
                          route.id > currentSlide ? route.transitionToNext : route.transitionToPrev
                        )
                      }
                      className={`relative px-2 sm:px-2.5 py-1 rounded-xl text-[11px] sm:text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                        isActive
                          ? "text-white font-bold"
                          : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeSlideIndicator"
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#06B6D4] -z-10 shadow-md"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                      <span>Slide {String(route.id).padStart(2, "0")}</span>
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                aria-label="Next slide"
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                title="Next slide (Right Arrow)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <span className="w-px h-4 bg-white/10 mx-0.5 shrink-0" />

              {/* Minimize Dock Button */}
              <button
                onClick={() => setIsDockMinimized(true)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                title="Minimize bar (reveals full page)"
                aria-label="Minimize bar"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
