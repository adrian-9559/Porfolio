"use client";
import { useState, useEffect } from "react";
import { useT } from "@/hooks/useT";
import { campusService } from "@/services/campusService";

export function StreakCalendar() {
  const { t } = useT();
  const [streak, setStreak] = useState<{ currentStreak: number; bestStreak: number; recentDays: string[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    campusService.getStreak().then((data) => {
      setStreak(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="h-32 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] animate-pulse" />;
  }

  if (!streak) return null;

  // Build 7 weeks of activity data
  const today = new Date();
  const weeks: { date: string; active: boolean }[][] = [];
  const daySet = new Set(streak.recentDays);

  for (let w = 6; w >= 0; w--) {
    const week: { date: string; active: boolean }[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (w * 7 + (6 - d)));
      const dateStr = date.toISOString().split("T")[0];
      week.push({ date: dateStr, active: daySet.has(dateStr) });
    }
    weeks.push(week);
  }

  const dayLabels = ["L", "M", "X", "J", "V", "S", "D"];

  return (
    <div className="space-y-3">
      {/* Stats */}
      <div className="flex gap-6">
        <div>
          <p className="text-2xl font-black text-[#1d1d1f] dark:text-white">{streak.currentStreak}</p>
          <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366] font-semibold uppercase tracking-wide">{t("campus.streak.current")}</p>
        </div>
        <div>
          <p className="text-2xl font-black text-[#aeaeb2] dark:text-[#636366]">{streak.bestStreak}</p>
          <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366] font-semibold uppercase tracking-wide">{t("campus.streak.best")}</p>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="flex gap-1">
        {/* Day labels */}
        <div className="flex flex-col gap-0.5 mr-1">
          {dayLabels.map((d, i) => (
            <span key={i} className="w-3 h-3 flex items-center justify-center text-[7px] text-[#aeaeb2] dark:text-[#636366]">
              {d}
            </span>
          ))}
        </div>

        {/* Weeks */}
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-0.5">
            {week.map((day, di) => (
              <div
                key={di}
                className={`w-3 h-3 rounded-sm transition-colors ${
                  day.active
                    ? "bg-emerald-500"
                    : "bg-black/5 dark:bg-white/8"
                }`}
                title={day.date}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
