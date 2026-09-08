"use client";
import type { CampusBadge } from "@/types/campus";

import { useState, useEffect } from "react";

import { useT } from "@/hooks/useT";
import { campusService } from "@/services/campusService";

export function BadgeGrid() {
  const { t } = useT();
  const [badges, setBadges] = useState<CampusBadge[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    campusService
      .getBadges()
      .then((data) => {
        setBadges(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = [
    { id: "all", label: "all" },
    { id: "milestone", label: t("campus.badges.milestone") },
    { id: "streak", label: t("campus.badges.streak") },
    { id: "quiz", label: t("campus.badges.quiz") },
    { id: "completion", label: t("campus.badges.completion") },
  ];

  const filtered =
    filter === "all" ? badges : badges.filter((b) => b.category === filter);
  const earnedCount = badges.filter((b) => b.earned).length;

  if (loading) {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-24 rounded-xl bg-[var(--bg-surface)] animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[var(--text-muted)]">
          {earnedCount}/{badges.length}{" "}
          {t("campus.badges.earned").toLowerCase()}
        </p>
      </div>

      {/* Category filter */}
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap transition-all ${
              filter === cat.id
                ? "bg-[var(--accent)] text-[var(--text-interactive)]"
                : "bg-[var(--bg-surface)] text-[var(--text-secondary)]"
            }`}
            type="button"
            onClick={() => setFilter(cat.id)}
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
                ? "bg-[var(--bg-card)] border-[var(--border-hover)] shadow-sm"
                : "bg-[var(--bg-surface)] border-[var(--border-default)] opacity-50"
            }`}
          >
            <div className="text-2xl mb-1">{badge.icon}</div>
            <p className="text-[10px] font-semibold text-[var(--text-primary)] leading-tight">
              {badge.name}
            </p>
            {badge.earned ? (
              <p className="text-[9px] text-[var(--accent)] mt-0.5">
                {t("campus.badges.unlocked")}
              </p>
            ) : (
              <p className="text-[9px] text-[var(--text-muted)] mt-0.5">
                {badge.threshold}
              </p>
            )}
            {badge.xp_reward > 0 && (
              <span className="absolute top-1.5 right-1.5 text-[8px] font-bold text-[var(--accent)] bg-[var(--accent-light)] px-1 py-0.5 rounded">
                +{badge.xp_reward}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
