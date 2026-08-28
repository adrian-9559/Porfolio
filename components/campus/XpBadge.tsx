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
  const progress = Math.min(((xp % ((level + 1) * (level + 1) * 50)) / (xpForNext - level * level * 50)) * 100, 100);

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 text-xs">
        <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
          Lv.{level}
        </span>
        <span className="text-[#aeaeb2] dark:text-[#636366] font-medium">
          {xp.toLocaleString()} XP
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-emerald-500/20">
          {level}
        </div>
        <div>
          <p className="text-xs font-bold text-[#1d1d1f] dark:text-white">{t("campus.xp.level")} {level}</p>
          <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">{xp.toLocaleString()} {t("campus.xp.total")}</p>
        </div>
      </div>
      <div className="flex-1 max-w-[120px]">
        <div className="h-1.5 rounded-full bg-black/8 dark:bg-white/10 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-[9px] text-[#aeaeb2] dark:text-[#636366] mt-0.5">{xpForNext - xp} {t("campus.xp.nextLevel")}</p>
      </div>
    </div>
  );
}
