"use client";

export interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

export const TABS: Tab[] = [
  {
    id: "openai",
    label: "OpenAI",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M13 10V3L4 14h7v7l9-11h-7z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    ),
    color: "blue",
  },
  {
    id: "anthropic",
    label: "Anthropic",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    ),
    color: "orange",
  },
  {
    id: "copilot",
    label: "GitHub Copilot",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    ),
    color: "violet",
  },
  {
    id: "ollama",
    label: "Ollama",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    ),
    color: "amber",
  },
  {
    id: "local-models",
    label: "Modelos Locales",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    ),
    color: "emerald",
  },
  {
    id: "comparativa",
    label: "Comparativa",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    ),
    color: "sky",
  },
  {
    id: "recomendaciones",
    label: "Recomendaciones",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    ),
    color: "rose",
  },
];

export const TAB_COLORS: Record<
  string,
  { active: string; hover: string; border: string; bg: string; badge: string }
> = {
  violet: {
    active:
      "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300",
    hover: "hover:bg-violet-50 dark:hover:bg-violet-900/20",
    border: "border-violet-200 dark:border-violet-800",
    bg: "bg-violet-50 dark:bg-violet-950/20",
    badge:
      "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400",
  },
  blue: {
    active: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    hover: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-800",
    bg: "bg-blue-50 dark:bg-blue-950/20",
    badge: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  },
  orange: {
    active:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
    hover: "hover:bg-orange-50 dark:hover:bg-orange-900/20",
    border: "border-orange-200 dark:border-orange-800",
    bg: "bg-orange-50 dark:bg-orange-950/20",
    badge:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
  },
  amber: {
    active:
      "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
    hover: "hover:bg-amber-50 dark:hover:bg-amber-900/20",
    border: "border-amber-200 dark:border-amber-800",
    bg: "bg-amber-50 dark:bg-amber-950/20",
    badge:
      "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
  },
  emerald: {
    active:
      "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
    hover: "hover:bg-emerald-50 dark:hover:bg-emerald-900/20",
    border: "border-emerald-200 dark:border-emerald-800",
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    badge:
      "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
  },
  sky: {
    active: "bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300",
    hover: "hover:bg-sky-50 dark:hover:bg-sky-900/20",
    border: "border-sky-200 dark:border-sky-800",
    bg: "bg-sky-50 dark:bg-sky-950/20",
    badge: "bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400",
  },
  rose: {
    active: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300",
    hover: "hover:bg-rose-50 dark:hover:bg-rose-900/20",
    border: "border-rose-200 dark:border-rose-800",
    bg: "bg-rose-50 dark:bg-rose-950/20",
    badge: "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400",
  },
};

export function TabNav({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (id: string) => void;
}) {
  return (
    <nav
      className="flex flex-wrap gap-1.5 my-6 pb-2 border-b border-black/8 dark:border-white/8 overflow-x-auto"
      role="tablist"
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        const colors = TAB_COLORS[tab.color];

        return (
          <button
            key={tab.id}
            aria-selected={isActive}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
              isActive
                ? `${colors.active} shadow-sm`
                : `text-[#6e6e73] dark:text-[#86868b] ${colors.hover}`
            }`}
            role="tab"
            onClick={() => onTabChange(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
