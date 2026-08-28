"use client";

interface ProgressBarProps {
  completed: number;
  total: number;
  showLabel?: boolean;
  size?: "sm" | "md";
}

export function ProgressBar({ completed, total, showLabel = true, size = "sm" }: ProgressBarProps) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const h = size === "sm" ? "h-1.5" : "h-2.5";

  return (
    <div className="flex items-center gap-2">
      <div className={`flex-1 ${h} rounded-full bg-black/8 dark:bg-white/10 overflow-hidden`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-[10px] text-[#aeaeb2] dark:text-[#636366] font-medium tabular-nums whitespace-nowrap">
          {completed}/{total}
        </span>
      )}
    </div>
  );
}
