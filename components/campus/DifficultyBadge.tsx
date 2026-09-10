import type { DifficultyLevel } from "@/types/challenges";

const DIFFICULTY_CONFIG: Record<
  DifficultyLevel,
  { label: string; bg: string; fg: string; border: string }
> = {
  beginner: {
    label: "Fácil",
    bg: "var(--state-success-bg)",
    fg: "var(--state-success-fg)",
    border: "var(--state-success-border)",
  },
  intermediate: {
    label: "Medio",
    bg: "var(--state-warning-bg)",
    fg: "var(--state-warning-fg)",
    border: "var(--state-warning-border)",
  },
  advanced: {
    label: "Difícil",
    bg: "var(--state-danger-bg)",
    fg: "var(--state-danger-fg)",
    border: "var(--state-danger-border)",
  },
};

export function DifficultyBadge({ level }: { level: DifficultyLevel }) {
  const c = DIFFICULTY_CONFIG[level];

  return (
    <span
      aria-label={`Nivel: ${c.label}`}
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border"
      role="status"
      style={{
        background: c.bg,
        color: c.fg,
        borderColor: c.border,
      }}
    >
      {c.label}
    </span>
  );
}
