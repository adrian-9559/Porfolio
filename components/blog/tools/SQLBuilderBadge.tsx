import React from "react";

export const BADGE_STYLES = {
  blue: {
    active: "bg-blue-500 text-white shadow-sm",
    inactive:
      "bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30",
  },
  amber: {
    active: "bg-amber-500 text-white shadow-sm",
    inactive:
      "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/30",
  },
  green: {
    active: "bg-emerald-500 text-white shadow-sm",
    inactive:
      "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30",
  },
  purple: {
    active: "bg-purple-500 text-white shadow-sm",
    inactive:
      "bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30",
  },
} as const;

export type BadgeColor = keyof typeof BADGE_STYLES;

export function Badge({
  active,
  color,
  onClick,
  label,
  children,
}: {
  active: boolean;
  color: BadgeColor;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  const s = BADGE_STYLES[color];

  return (
    <button
      aria-checked={active}
      aria-label={label}
      className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold transition-all cursor-pointer select-none leading-none ${active ? s.active : s.inactive} focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400 dark:focus:ring-blue-600`}
      role="switch"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
