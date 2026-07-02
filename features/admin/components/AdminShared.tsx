import { ReactNode } from "react";
import {
  Card as HeroCard,
  Chip as HeroChip,
  Spinner as HeroSpinner,
  Button as HeroButton,
  Input as HeroInput,
  TextArea as HeroTextArea,
} from "@heroui/react";

// ── Layout primitives ─────────────────────────────────────────────────────────

export function SectionHeader({
  title,
  desc,
  action,
}: {
  title: string;
  desc: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold text-[#1d1d1f] dark:text-white">
          {title}
        </h2>
        <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-0.5">
          {desc}
        </p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <HeroCard
      variant="transparent"
      className={`rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] overflow-hidden p-0 gap-0 ${className}`}
    >
      {children}
    </HeroCard>
  );
}

export function EmptyState({ text, sub }: { text: string; sub?: string }) {
  return (
    <div className="px-5 py-10 text-center">
      <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">{text}</p>
      {sub && (
        <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mt-1">{sub}</p>
      )}
    </div>
  );
}

export function Spinner() {
  return (
    <div className="px-5 py-10 flex justify-center">
      <HeroSpinner className="text-blue-600" size="sm" />
    </div>
  );
}

export function Badge({
  label,
  color = "blue",
}: {
  label: string;
  color?: "blue" | "green" | "red" | "amber" | "gray" | "purple";
}) {
  // Chip only ships 5 semantic colors (default/accent/success/warning/danger).
  // "purple" has no built-in equivalent, so it's overridden via className.
  const chipColor = {
    blue: "accent",
    green: "success",
    red: "danger",
    amber: "warning",
    gray: "default",
    purple: "default",
  } as const;

  const purpleOverride =
    color === "purple"
      ? "!bg-purple-50 dark:!bg-purple-950/30 !text-purple-600 dark:!text-purple-400 !border-transparent"
      : "";

  return (
    <HeroChip
      className={`rounded-full ${purpleOverride}`}
      color={chipColor[color]}
      size="sm"
      variant="soft"
    >
      {label}
    </HeroChip>
  );
}

export function IconBtn({
  onClick,
  title,
  icon,
  danger = false,
}: {
  onClick: () => void;
  title: string;
  icon: ReactNode;
  danger?: boolean;
}) {
  return (
    <span title={title}>
      <HeroButton
        isIconOnly
        aria-label={title}
        className={`p-1.5 h-auto w-auto min-w-0 bg-transparent rounded-lg transition-colors ${
          danger
            ? "text-[#aeaeb2] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
            : "text-[#aeaeb2] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
        }`}
        variant="ghost"
        onPress={onClick}
      >
        {icon}
      </HeroButton>
    </span>
  );
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Buscar…",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#aeaeb2] z-10"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
        viewBox="0 0 14 14"
      >
        <circle cx="6" cy="6" r="4" />
        <path d="M10 10l2.5 2.5" />
      </svg>
      <HeroInput
        className="w-full pl-8 pr-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 transition-all shadow-none"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <HeroInput
      className="flex-1 px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 transition-all shadow-none"
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function Textarea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <HeroTextArea
      className="flex-1 px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 transition-all resize-none shadow-none"
      placeholder={placeholder}
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function Btn({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
  size = "md",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "danger";
  disabled?: boolean;
  type?: "button" | "submit";
  size?: "sm" | "md";
}) {
  const sizes = { sm: "px-3 py-1.5 text-xs h-auto", md: "px-4 py-2 text-sm h-auto" };
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    ghost:
      "bg-transparent border border-black/12 dark:border-white/12 hover:bg-black/5 dark:hover:bg-white/5 text-[#1d1d1f] dark:text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <HeroButton
      className={`font-medium rounded-xl transition-colors whitespace-nowrap ${sizes[size]} ${variants[variant]}`}
      isDisabled={disabled}
      type={type}
      onPress={onClick}
    >
      {children}
    </HeroButton>
  );
}

export function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);

  if (mins < 1) return "ahora";
  if (mins < 60) return `hace ${mins}m`;
  const hrs = Math.floor(mins / 60);

  if (hrs < 24) return `hace ${hrs}h`;
  const days = Math.floor(hrs / 24);

  if (days < 30) return `hace ${days}d`;

  return new Date(iso).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
  });
}

// ── Icons ─────────────────────────────────────────────────────────────────────

export const Icons = {
  trash: (
    <svg
      fill="none"
      height="14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 14 14"
      width="14"
    >
      <path d="M2 3.5h10M5.5 3.5V2.5h3v1M4 3.5l.7 8h4.6l.7-8" />
    </svg>
  ),
  edit: (
    <svg
      fill="none"
      height="14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 14 14"
      width="14"
    >
      <path d="M9.5 1.5l3 3-8 8H1.5v-3l8-8z" />
    </svg>
  ),
  check: (
    <svg
      fill="none"
      height="14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
      viewBox="0 0 14 14"
      width="14"
    >
      <path d="M2 7l4 4 6-6" />
    </svg>
  ),
  ban: (
    <svg
      fill="none"
      height="14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 14 14"
      width="14"
    >
      <circle cx="7" cy="7" r="5.5" />
      <path d="M3.1 3.1l7.8 7.8" />
    </svg>
  ),
  send: (
    <svg
      fill="none"
      height="14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 14 14"
      width="14"
    >
      <path d="M12 2L2 6.5l4 1.5 1.5 4L12 2z" />
    </svg>
  ),
  bell: (
    <svg
      fill="none"
      height="14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 14 14"
      width="14"
    >
      <path d="M7 1.5a4 4 0 014 4v2.5l1 1.5H2L3 8V5.5a4 4 0 014-4zm-1 9h2" />
    </svg>
  ),
  key: (
    <svg
      fill="none"
      height="14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 14 14"
      width="14"
    >
      <circle cx="5.5" cy="5.5" r="3" />
      <path d="M8 8l4 4M10 10l1.5-1.5" />
    </svg>
  ),
  bot: (
    <svg
      fill="none"
      height="14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 14 14"
      width="14"
    >
      <rect height="8" rx="2" width="11" x="1.5" y="4" />
      <path d="M5 9.5h4M5 7h.01M9 7h.01M7 1.5v2.5" />
    </svg>
  ),
  mail: (
    <svg
      fill="none"
      height="14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 14 14"
      width="14"
    >
      <rect height="8" rx="1.5" width="12" x="1" y="3" />
      <path d="M1 3l6 5 6-5" />
    </svg>
  ),
  flow: (
    <svg
      fill="none"
      height="14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 14 14"
      width="14"
    >
      <circle cx="3" cy="7" r="1.5" />
      <circle cx="11" cy="3" r="1.5" />
      <circle cx="11" cy="11" r="1.5" />
      <path d="M4.5 7h3l2-3.5M9.5 7L7 7l2 3.5" />
    </svg>
  ),
};
