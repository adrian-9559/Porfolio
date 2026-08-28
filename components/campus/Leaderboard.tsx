"use client";
import { useState, useEffect } from "react";
import { useT } from "@/hooks/useT";
import { useAuth } from "@/hooks/useAuth";
import { campusService } from "@/services/campusService";
import type { LeaderboardEntry } from "@/types/campus";

export function Leaderboard() {
  const { t } = useT();
  const { user } = useAuth();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<{ rank: number; totalXp: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    campusService.getLeaderboard().then((data) => {
      setEntries(data.leaderboard);
      setUserRank(data.userRank);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-14 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] animate-pulse" />
        ))}
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">{t("campus.leaderboard.noData")}</p>
      </div>
    );
  }

  const podium = entries.slice(0, 3);
  const rest = entries.slice(3);
  const medals = ["🥇", "🥈", "🥉"];
  const podiumOrder = [1, 0, 2];

  return (
    <div className="space-y-6">
      {/* Podium */}
      <div className="flex items-end justify-center gap-4 py-6">
        {podiumOrder.map((idx) => {
          const entry = podium[idx];
          if (!entry) return <div key={idx} className="w-24" />;
          const height = idx === 0 ? "h-28" : idx === 1 ? "h-20" : "h-16";
          return (
            <div key={entry.userId} className="flex flex-col items-center gap-2 w-24">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-emerald-500/20 overflow-hidden`}>
                {entry.avatarUrl ? (
                  <img alt="" className="w-full h-full object-cover" src={entry.avatarUrl} />
                ) : (
                  entry.name.charAt(0).toUpperCase()
                )}
              </div>
              <p className="text-[10px] font-semibold text-[#1d1d1f] dark:text-white text-center truncate w-full">{entry.name}</p>
              <div className={`w-full ${height} rounded-t-xl bg-gradient-to-b from-emerald-500/10 to-emerald-500/5 border border-emerald-300/30 dark:border-emerald-700/30 flex flex-col items-center justify-center gap-0.5`}>
                <span className="text-lg">{medals[idx]}</span>
                <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">{entry.totalXp.toLocaleString()} XP</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* User rank */}
      {userRank && (
        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-300/30 dark:border-emerald-700/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                #{userRank.rank}
              </span>
              <span className="text-sm font-semibold text-[#1d1d1f] dark:text-white">{t("campus.leaderboard.yourRank")}</span>
            </div>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{userRank.totalXp.toLocaleString()} XP</span>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="space-y-1">
        {rest.map((entry) => (
          <div
            key={entry.userId}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              entry.userId === user?.id
                ? "bg-emerald-500/5 border border-emerald-300/20 dark:border-emerald-700/20"
                : "hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"
            }`}
          >
            <span className="w-6 text-center text-xs font-bold text-[#aeaeb2] dark:text-[#636366] tabular-nums">
              {entry.rank}
            </span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold overflow-hidden flex-shrink-0">
              {entry.avatarUrl ? (
                <img alt="" className="w-full h-full object-cover" src={entry.avatarUrl} />
              ) : (
                entry.name.charAt(0).toUpperCase()
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white truncate">{entry.name}</p>
              <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">
                {entry.tutorialsCompleted} {t("campus.leaderboard.tutorials").toLowerCase()} · {t("campus.leaderboard.level")} {entry.level}
              </p>
            </div>
            <span className="text-xs font-bold text-[#1d1d1f] dark:text-white tabular-nums">{entry.totalXp.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
