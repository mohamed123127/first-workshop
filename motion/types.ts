import { Variants, Transition } from "framer-motion";

export type MotionType =
  | "scrollDown"
  | "cardExpand"
  | "slideRight"
  | "centerPushZoom"
  | "zoomIn"
  | "fade";

export interface MotionConfig {
  name: MotionType;
  description: string;
  variants: Variants;
  transition: Transition;
}

