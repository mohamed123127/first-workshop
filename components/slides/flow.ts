import { MotionType } from "@/motion/types";

export interface SlideRouteConfig {
  id: number;
  label: string;
  nextId: number | null;
  prevId: number | null;
  transitionToNext: MotionType;
  transitionToPrev: MotionType;
}

export type SlideType = {
  onNextSlide?: () => void;
  onPreviousSlide?: () => void;
};

/**
 * Declarative slide sequence mapping each slide to its successor and the motion used.
 */
export const SLIDES_FLOW: Record<number, SlideRouteConfig> = {
  1: {
    id: 1,
    label: "01: Instructors",
    nextId: 2,
    prevId: null,
    transitionToNext: "scrollDown",
    transitionToPrev: "fade",
  },
  2: {
    id: 2,
    label: "02: Intro",
    nextId: 3,
    prevId: 1,
    transitionToNext: "cardExpand",
    transitionToPrev: "scrollDown",
  },
  3: {
    id: 3,
    label: "03: Web Concepts",
    nextId: 4,
    prevId: 2,
    transitionToNext: "slideRight",
    transitionToPrev: "cardExpand",
  },
  4: {
    id: 4,
    label: "04: How Web Works",
    nextId: 5,
    prevId: 3,
    transitionToNext: "zoomIn",
    transitionToPrev: "slideRight",
  },
  5: {
    id: 5,
    label: "05: Behind the Scenes",
    nextId: null,
    prevId: 4,
    transitionToNext: "fade",
    transitionToPrev: "zoomIn",
  },
};

/**
 * Helper method to retrieve slide configuration
 */
export function getSlideConfig(slideId: number): SlideRouteConfig {
  return SLIDES_FLOW[slideId] ?? SLIDES_FLOW[1];
}

/**
 * Method to link current slide with its next slide and the motion used
 */
export function getNextSlideFlow(currentId: number): {
  nextId: number;
  motion: MotionType;
} {
  const current = getSlideConfig(currentId);
  const nextId = current.nextId ?? 1;
  return {
    nextId,
    motion: current.transitionToNext,
  };
}

/**
 * Method to link current slide with its previous slide and the motion used
 */
export function getPrevSlideFlow(currentId: number): {
  prevId: number;
  motion: MotionType;
} {
  const current = getSlideConfig(currentId);
  const prevId = current.prevId ?? 5;
  return {
    prevId,
    motion: current.transitionToPrev,
  };
}

/**
 * Helper to get all registered slides for navigation docks/bars
 */
export function getAllSlidesFlow(): SlideRouteConfig[] {
  return Object.values(SLIDES_FLOW);
}
