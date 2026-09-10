"use client";
import { useT } from "@/hooks/useT";

interface XpBadgeProps {
  xp: number;
  level: number;
  compact?: boolean;
}

export function XpBadge({ xp, level, compact }: XpBadgeProps) {
  const { t } = useT();
  const xpForNext = (level + 1) * (level + 1) * 50;
  const progress = Math.min(
    ((xp % ((level + 1) * (level + 1) * 50)) /
      (xpForNext - level * level * 50)) *
      100,
    100,
  );

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 text-xs">
        <span className="px-1.5 py-0.5 rounded-md bg-[var(--accent-light)] text-[var(--accent)] font-bold text-[10px]">
          Lv.{level}
        </span>
        <span className="text-[var(--text-muted)] font-medium">
          {xp.toLocaleString()} XP
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-brand-from)] via-[var(--color-brand-via)] to-[var(--color-brand-to)] flex items-center justify-center text-white font-bold text-sm shadow-md shadow-[var(--accent)]/20">
          {level}
        </div>
        <div>
          <p className="text-xs font-bold text-[var(--text-primary)]">
            {t("campus.xp.level")} {level}
          </p>
          <p className="text-[10px] text-[var(--text-muted)]">
            {xp.toLocaleString()} {t("campus.xp.total")}
          </p>
        </div>
      </div>
      <div className="flex-1 max-w-[120px]">
        <div className="h-1.5 rounded-full bg-[var(--bg-surface)] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--color-brand-from)] via-[var(--color-brand-via)] to-[var(--color-brand-to)] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[9px] text-[var(--text-muted)] mt-0.5">
          {xpForNext - xp} {t("campus.xp.nextLevel")}
        </p>
      </div>
    </div>
  );
}
