import type { ReactNode } from "react";

export interface SectionTitleProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
  subtitle?: ReactNode;
}

export function SectionTitle({
  children,
  className = "",
  as: Component = "h2",
  subtitle,
}: SectionTitleProps) {
  return (
    <header className="mb-6 sm:mb-8">
      {subtitle && (
        <p className="text-xs sm:text-sm font-mono tracking-wider uppercase text-[var(--accent-cyan)] mb-2">
          {subtitle}
        </p>
      )}
      <Component
        className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white ${className}`}
      >
        {children}
      </Component>
    </header>
  );
}

