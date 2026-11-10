import { Variants } from "framer-motion";
import { EASINGS } from "./easings";
import { MotionType } from "./types";

/**
 * Slide container transition variants mapped by MotionType
 */
export const slideContainerVariants: Record<MotionType, Variants> = {
  // Motion 1: Scroll down transition (Slide 1 -> Slide 2)
  scrollDown: {
    enter: () => ({ y: 80, opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: () => ({ y: -80, opacity: 0 }),
  },

  // Motion 2: Card expand / zoom forward (Slide 2 -> Slide 3)
  cardExpand: {
    enter: () => ({ scale: 0.9, opacity: 0 }),
    center: { scale: 1, opacity: 1 },
    exit: () => ({ scale: 1.08, opacity: 0 }),
  },

  // Motion 3: Slide to the right (Slide 3 -> Slide 4 via question click)
  slideRight: {
    enter: () => ({ x: 140, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: () => ({ x: -140, opacity: 0 }),
  },

  // Motion 4: Two-phase Center & Push Zoom (Slide 4 -> Slide 5)
  centerPushZoom: {
    enter: () => ({ scale: 0.75, opacity: 0 }),
    center: { scale: 1, opacity: 1 },
    exit: () => ({ scale: 1.15, opacity: 0 }),
  },

  // Motion 5: Direct Zoom In
  zoomIn: {
    enter: () => ({ scale: 0.8, opacity: 0 }),
    center: { scale: 1, opacity: 1 },
    exit: () => ({ scale: 1.2, opacity: 0 }),
  },

  // Motion 6: Subtle clean fade
  fade: {
    enter: () => ({ opacity: 0 }),
    center: { opacity: 1 },
    exit: () => ({ opacity: 0 }),
  },
};

/**
 * Component-level motion: Center card & push neighbor
 */
export const centerAndPushVariants = {
  // Center card (Web Card)
  mainCard: {
    idle: {
      x: 0,
      scale: 1,
      opacity: 1,
      zIndex: 10,
      filter: "blur(0px)",
    },
    centering: {
      x: "calc(50% + 1rem)",
      scale: 1.05,
      opacity: 1,
      zIndex: 40,
      filter: "blur(0px)",
      boxShadow: "0 0 50px rgba(99,102,241,0.45)",
      transition: { duration: 0.7, ease: EASINGS.cinematic },
    },
    zooming: {
      x: "calc(50% + 1rem)",
      scale: 4.2,
      opacity: 0,
      zIndex: 50,
      filter: "blur(3px)",
      transition: { duration: 0.85, ease: EASINGS.snappy },
    },
  },

  // Pushed card (App Card)
  pushedCard: {
    idle: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
    },
    centering: {
      x: 450,
      opacity: 0,
      scale: 0.85,
      rotate: 8,
      transition: { duration: 0.65, ease: EASINGS.gentle },
    },
    zooming: {
      x: 450,
      opacity: 0,
      scale: 0.85,
      rotate: 8,
    },
  },
};

/**
 * Arrow motion variants (flying fleche)
 */
export const arrowFlyVariants: Variants = {
  idle: { x: [0, 6, 0] },
  flying: { x: [0, 80], opacity: [1, 0] },
};

/**
 * Fade in staggered children
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export const fadeInUpItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASINGS.snappy },
  },
};

