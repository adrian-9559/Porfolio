"use client";
import { useState, useEffect } from "react";
import { useT } from "@/hooks/useT";
import { campusService } from "@/services/campusService";
import type { CampusBadge } from "@/types/campus";

export function BadgeGrid() {
  const { t } = useT();
  const [badges, setBadges] = useState<CampusBadge[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    campusService.getBadges().then((data) => {
      setBadges(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const categories = [
    { id: "all", label: "all" },
    { id: "milestone", label: t("campus.badges.milestone") },
    { id: "streak", label: t("campus.badges.streak") },
    { id: "quiz", label: t("campus.badges.quiz") },
    { id: "completion", label: t("campus.badges.completion") },
  ];

  const filtered = filter === "all" ? badges : badges.filter((b) => b.category === filter);
  const earnedCount = badges.filter((b) => b.earned).length;

  if (loading) {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-24 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#aeaeb2] dark:text-[#636366]">
          {earnedCount}/{badges.length} {t("campus.badges.earned").toLowerCase()}
        </p>
      </div>

      {/* Category filter */}
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap transition-all ${
              filter === cat.id
                ? "bg-emerald-500 text-white"
                : "bg-black/5 dark:bg-white/8 text-[#6e6e73] dark:text-[#86868b]"
            }`}
            onClick={() => setFilter(cat.id)}
            type="button"
          >
            {cat.label === "all" ? t("campus.badges.title") : cat.label}
          </button>
        ))}
      </div>

      {/* Badge grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {filtered.map((badge) => (
          <div
            key={badge.id}
            className={`relative p-3 rounded-xl border text-center transition-all ${
              badge.earned
                ? "bg-white dark:bg-[#111116] border-emerald-300/40 dark:border-emerald-700/40 shadow-sm"
                : "bg-black/[0.02] dark:bg-white/[0.02] border-black/6 dark:border-white/6 opacity-50"
            }`}
          >
            <div className="text-2xl mb-1">{badge.icon}</div>
            <p className="text-[10px] font-semibold text-[#1d1d1f] dark:text-white leading-tight">{badge.name}</p>
            {badge.earned ? (
              <p className="text-[9px] text-emerald-600 dark:text-emerald-400 mt-0.5">{t("campus.badges.unlocked")}</p>
            ) : (
              <p className="text-[9px] text-[#aeaeb2] dark:text-[#636366] mt-0.5">{badge.threshold}</p>
            )}
            {badge.xp_reward > 0 && (
              <span className="absolute top-1.5 right-1.5 text-[8px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1 py-0.5 rounded">
                +{badge.xp_reward}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
