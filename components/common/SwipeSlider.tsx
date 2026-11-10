"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  PanInfo,
} from "framer-motion";
import { ArrowRight, Check, ChevronsRight } from "lucide-react";

export interface SwipeSliderProps {
  label?: string;
  onComplete: () => void;
  accent?: "cyan" | "indigo";
  size?: "sm" | "md";
  className?: string;
}

export function SwipeSlider({
  label = "Swipe to continue",
  onComplete,
  accent = "cyan",
  size = "sm",
  className = "",
}: SwipeSliderProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [travelDistance, setTravelDistance] = useState(size === "sm" ? 180 : 220);

  const trackRef = useRef<HTMLDivElement>(null);
  const isSmall = size === "sm";
  const knobSize = isSmall ? 36 : 44; // w-9 (36px) or w-11 (44px)
  const trackPadding = isSmall ? 4 : 6; // p-1 (4px) or p-1.5 (6px)

  // Motion value for smooth 60/120fps GPU-accelerated dragging
  const x = useMotionValue(0);

  // Synchronized dynamic fill width: exactly matches knob's right edge without lag
  const minFillWidth = knobSize + trackPadding * 2;
  const fillWidth = useTransform(x, (currentX) => {
    return `${Math.max(currentX + minFillWidth, minFillWidth)}px`;
  });

  // Label fades out and gently slides forward as knob advances
  const labelOpacity = useTransform(x, [0, Math.max(travelDistance * 0.55, 30)], [1, 0]);
  const labelTranslateX = useTransform(x, [0, Math.max(travelDistance * 0.55, 30)], [0, 8]);

  // Compute exact travel distance on mount and track resize
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const measure = () => {
      const available = el.clientWidth - knobSize - trackPadding * 2;
      if (available > 30) {
        setTravelDistance(available);
      }
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(el);

    return () => {
      resizeObserver.disconnect();
    };
  }, [knobSize, trackPadding]);

  // Smooth slide completion action with spring physics
  const triggerSlideCompletion = useCallback(async () => {
    if (isCompleted) return;
    setIsCompleted(true);

    // Smoothly animate from wherever the knob currently is directly to the end
    await animate(x, travelDistance, {
      type: "spring",
      stiffness: 420,
      damping: 32,
      restDelta: 0.5,
    });

    onComplete();

    // Reset smoothly back to start after a brief moment
    setTimeout(() => {
      animate(x, 0, {
        type: "spring",
        stiffness: 300,
        damping: 28,
      });
      setIsCompleted(false);
    }, 700);
  }, [isCompleted, onComplete, travelDistance, x]);

  // Drag handler: runs via Framer Motion without React re-renders!
  const handleDragEnd = async (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isCompleted) return;

    const currentX = x.get();
    const threshold = travelDistance * 0.42;
    const isFlick = info.velocity.x > 260;

    if (currentX >= threshold || isFlick) {
      await triggerSlideCompletion();
    } else {
      // Smoothly snap back to 0 with pleasant spring physics
      animate(x, 0, {
        type: "spring",
        stiffness: 480,
        damping: 30,
      });
    }
  };

  // Click on knob or right side of track triggers completion smoothly
  const handleKnobClick = async () => {
    if (isCompleted || x.get() > 5) return;
    await triggerSlideCompletion();
  };

  const isCyan = accent === "cyan";

  return (
    <div
      className={`relative select-none ${
        isSmall ? "w-full max-w-[250px]" : "w-full max-w-xs"
      } ${className}`}
    >
      {/* Slider Track Container */}
      <div
        ref={trackRef}
        onClick={(e) => {
          // If clicked in the right portion of the track, trigger smooth completion
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          if (clickX > rect.width * 0.35 && !isCompleted) {
            triggerSlideCompletion();
          }
        }}
        className={`relative w-full rounded-full bg-[var(--bg-deep-navy)]/95 border border-white/15 flex items-center shadow-inner overflow-hidden cursor-pointer ${
          isSmall ? "h-11 p-1" : "h-14 p-1.5"
        }`}
      >
        {/* Dynamic Progress Fill (Tracks knob with ZERO lag and NO CSS transition conflict) */}
        <motion.div
          className={`absolute left-0 top-0 bottom-0 rounded-full pointer-events-none ${
            isCyan
              ? "bg-gradient-to-r from-[var(--action-indigo)]/60 via-[var(--accent-cyan)]/50 to-[var(--accent-cyan)]/70 shadow-[0_0_12px_rgba(6,182,212,0.35)]"
              : "bg-gradient-to-r from-[var(--accent-cyan)]/60 via-[var(--action-indigo)]/50 to-[var(--action-indigo)]/70 shadow-[0_0_12px_rgba(99,102,241,0.35)]"
          }`}
          style={{ width: fillWidth }}
        />

        {/* Centered Hint Label (Fades out naturally as slider advances) */}
        <motion.div
          style={{
            opacity: labelOpacity,
            x: labelTranslateX,
          }}
          className={`absolute inset-0 flex items-center justify-center pointer-events-none font-mono font-semibold text-slate-300 uppercase ${
            isSmall ? "pl-9 pr-2 text-[10px] tracking-wide" : "pl-12 pr-4 text-xs tracking-wider"
          }`}
        >
          <span className="flex items-center gap-1 animate-pulse truncate">
            {label}
            <ChevronsRight
              className={`shrink-0 ${isSmall ? "w-3.5 h-3.5" : "w-4 h-4"} ${
                isCyan ? "text-[var(--accent-cyan)]" : "text-[var(--action-indigo)]"
              }`}
            />
          </span>
        </motion.div>

        {/* Smooth Draggable Arrow Knob */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: travelDistance }}
          dragElastic={{ left: 0, right: 0.08 }}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          onClick={(e) => {
            e.stopPropagation();
            handleKnobClick();
          }}
          style={{ x }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          className={`relative z-20 cursor-grab active:cursor-grabbing rounded-full text-white flex items-center justify-center border border-white/40 shrink-0 shadow-lg touch-none ${
            isSmall ? "w-9 h-9" : "w-11 h-11"
          } ${
            isCyan
              ? "bg-gradient-to-r from-[var(--action-indigo)] to-[var(--accent-cyan)] shadow-[0_0_16px_rgba(6,182,212,0.55)]"
              : "bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--action-indigo)] shadow-[0_0_16px_rgba(99,102,241,0.55)]"
          }`}
          aria-label="Drag arrow right to explore next slide"
        >
          {isCompleted ? (
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <Check className={isSmall ? "w-4 h-4 stroke-[3]" : "w-5 h-5 stroke-[3]"} />
            </motion.div>
          ) : (
            <ArrowRight
              className={`${
                isSmall ? "w-4 h-4 stroke-[2.2]" : "w-5 h-5 stroke-[2.5]"
              } transition-transform duration-150 group-hover:translate-x-0.5`}
            />
          )}
        </motion.div>
      </div>

      {/* Micro-instruction helper below */}
      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400/80 px-2 pt-1">
        <span>Slide right to proceed</span>
        <span className="text-[var(--accent-cyan)] font-semibold">Slide 05 →</span>
      </div>
    </div>
  );
}
