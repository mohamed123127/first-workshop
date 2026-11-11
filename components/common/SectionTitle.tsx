import type { ReactNode } from "react";

export interface SectionTitleProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
  subtitle?: ReactNode;
  size?: "default" | "sm";
}

export function SectionTitle({
  children,
  className = "",
  as: Component = "h2",
  subtitle,
  size = "default",
}: SectionTitleProps) {
  const isSm = size === "sm";

  return (
    <header className={isSm ? "mb-3 sm:mb-4" : "mb-6 sm:mb-8"}>
      {subtitle && (
        <p className={`font-mono tracking-wider uppercase text-[var(--accent-cyan)] ${isSm ? "text-[11px] mb-1" : "text-xs sm:text-sm mb-2"}`}>
          {subtitle}
        </p>
      )}
      <Component
        className={`${
          isSm
            ? "text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white"
            : "text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white"
        } ${className}`}
      >
        {children}
      </Component>
    </header>
  );
}
