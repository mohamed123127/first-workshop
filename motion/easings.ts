// Reusable smooth easing curves
export const EASINGS = {
  // Ultra smooth cinematic cubic-bezier (soft on the eyes)
  cinematic: [0.25, 0.1, 0.25, 1.0] as const,
  // Snappy modern entry
  snappy: [0.16, 1, 0.3, 1] as const,
  // Gentle ease in-out
  gentle: [0.4, 0.0, 0.2, 1] as const,
};

export const DURATIONS = {
  fast: 0.35,
  normal: 0.5,
  smooth: 0.75,
  cinematic: 1.25,
};

