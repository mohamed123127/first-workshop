"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MotionType, slideContainerVariants, EASINGS } from "@/motion";
import { getAllSlidesFlow, getNextSlideFlow, getPrevSlideFlow } from "@/components/slides/flow";
import { TeachersSlide } from "@/components/slides/01-teachers";
import { IntroSlide } from "@/components/slides/02-intro";
import { WebOverviewSlide } from "@/components/slides/03-web-overview";
import { WebVsNativeSlide } from "@/components/slides/04-web-vs-native";
import { HowWebWorksSlide } from "@/components/slides/04-how-web-works";
import { Slide06Placeholder } from "@/components/slides/06-in-progress";
import { WebBehindScenesSlide } from "@/components/slides/05-web-behind-scenes";
import { ProjectLifecycleSlide } from "@/components/slides/07-project-lifecycle";
import { TeamworkGitSlide } from "@/components/slides/09-teamwork-git";
import { GrandSummarySlide } from "@/components/slides/10-summary";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [activeMotion, setActiveMotion] = useState<MotionType>("fade");

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
      <div className="w-full flex-1 relative overflow-hidden">
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
              <Slide06Placeholder
                onPrevSlide={handlePrev}
                onNextSlide={handleNext}
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
              <WebBehindScenesSlide
                onPrevSlide={handlePrev}
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
              transition={{ duration: 0.5, ease: EASINGS.snappy }}
              className="w-full"
            >
              <ProjectLifecycleSlide
                onPrevSlide={handlePrev}
                onNextSlide={handleNext}
              />
            </motion.div>
          )}

          {currentSlide === 9 && (
            <motion.div
              key="slide-9"
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

          {currentSlide === 10 && (
            <motion.div
              key="slide-10"
              variants={currentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: EASINGS.snappy }}
              className="w-full"
            >
              <GrandSummarySlide
                onPrevSlide={handlePrev}
                onNextSlide={handleNext}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Presentation Dock Controls */}
      <div className="fixed bottom-6 inset-x-0 flex items-center justify-center z-50 pointer-events-none px-4">
        <div className="pointer-events-auto flex items-center gap-2 p-2 rounded-2xl bg-[#1E293B]/90 border border-[#334155] backdrop-blur-xl shadow-2xl">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#334155] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Slide Indicator Pills */}
          <div className="flex items-center gap-1.5 px-2">
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
                  className={`relative px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "text-white"
                      : "text-slate-400 hover:text-slate-200 hover:bg-[#334155]/60"
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
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#334155] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </main>
  );
}
