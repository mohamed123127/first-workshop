import type { ReactNode } from "react";

export interface SplitSectionProps {
  left: ReactNode;
  right: ReactNode;
  className?: string;
  leftClassName?: string;
  rightClassName?: string;
}

export function SplitSection({
  left,
  right,
  className = "",
  leftClassName = "bg-[var(--bg-deep-navy)]",
  rightClassName = "bg-[var(--cards-charcoal)]",
}: SplitSectionProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 w-full flex-1 ${className}`}>
      <div
        className={`w-full flex flex-col justify-center px-6 py-10 sm:px-10 md:px-12 lg:px-16 ${leftClassName}`}
      >
        {left}
      </div>
      <div
        className={`w-full flex flex-col justify-center px-6 py-10 sm:px-10 md:px-12 lg:px-16 border-t md:border-t-0 md:border-l border-white/5 ${rightClassName}`}
      >
        {right}
      </div>
    </div>
  );
}

export const SplitLayout = SplitSection;

