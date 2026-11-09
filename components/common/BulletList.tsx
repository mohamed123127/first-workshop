import type { ReactNode } from "react";

export interface BulletListItem {
  id?: string;
  text: string;
  icon?: ReactNode;
}

export type BulletItem = string | BulletListItem;

export interface BulletListProps {
  items: readonly BulletItem[];
  variant?: "icon" | "number" | "bullet";
  accent?: "cyan" | "indigo";
  className?: string;
  itemClassName?: string;
}

export function BulletList({
  items,
  variant = "bullet",
  accent = "cyan",
  className = "",
  itemClassName = "",
}: BulletListProps) {
  const isCyan = accent === "cyan";

  const numberColorClasses = isCyan
    ? "bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)] border-[var(--accent-cyan)]/30 group-hover:bg-[var(--accent-cyan)]/25 group-hover:border-[var(--accent-cyan)]/60"
    : "bg-[var(--action-indigo)]/20 text-[var(--accent-cyan)] border-[var(--action-indigo)]/40 group-hover:bg-[var(--action-indigo)]/30 group-hover:border-[var(--action-indigo)]";

  const hoverBorderClass = isCyan
    ? "hover:border-[var(--accent-cyan)]/35"
    : "hover:border-[var(--action-indigo)]/40";

  return (
    <ul className={`flex flex-col gap-2.5 sm:gap-3 w-full ${className}`}>
      {items.map((item, index) => {
        const text = typeof item === "string" ? item : item.text;
        const customIcon = typeof item === "string" ? undefined : item.icon;
        const key = typeof item === "string" ? `${index}-${item}` : (item.id ?? `${index}-${item.text}`);

        return (
          <li
            key={key}
            className={`group flex items-center gap-3.5 sm:gap-4 p-3 sm:p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 transition-all duration-200 hover:translate-x-1.5 cursor-default ${hoverBorderClass} ${itemClassName}`}
          >
            {customIcon ? (
              <span className="shrink-0 transition-transform duration-200 group-hover:scale-110">
                {customIcon}
              </span>
            ) : variant === "number" ? (
              <span
                aria-hidden="true"
                className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs sm:text-sm font-semibold shrink-0 border font-mono transition-all duration-200 group-hover:scale-110 ${numberColorClasses}`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            ) : variant === "icon" ? (
              <span
                aria-hidden="true"
                className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg shrink-0 bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/30 transition-all duration-200 group-hover:scale-110 group-hover:bg-[var(--accent-cyan)]/25 group-hover:border-[var(--accent-cyan)]/50"
              >
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            ) : (
              <span
                aria-hidden="true"
                className="w-2 h-2 rounded-full shrink-0 bg-[var(--accent-cyan)] transition-transform duration-200 group-hover:scale-125"
              />
            )}
            <span className="text-sm sm:text-base font-medium leading-relaxed text-slate-200 group-hover:text-white transition-colors duration-200">
              {text}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export const ItemList = BulletList;
