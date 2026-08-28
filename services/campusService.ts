import { apiFetch } from "./apiClient";
import type {
  CampusProgress,
  CampusQuiz,
  QuizResult,
  LeaderboardData,
  CampusUserXP,
  StreakData,
  CampusBookmark,
  CampusNote,
  CampusBadge,
} from "@/types/campus";

const API = "/api/campus";

export const campusService = {
  getProgress: () => apiFetch<CampusProgress[]>(`${API}/progress`),

  markComplete: (tutorialSlug: string, guideSlug?: string, timeSpentSeconds = 0) =>
    apiFetch<{ xpEarned: number; totalXp: number; level: number }>(`${API}/progress`, {
      method: "POST",
      body: JSON.stringify({ tutorialSlug, guideSlug: guideSlug ?? null, timeSpentSeconds }),
    }),

  getGuideProgress: (slug: string) =>
    apiFetch<{ tutorial_slug: string; completed_at: string }[]>(`${API}/progress/guide/${slug}`),

  getQuiz: (slug: string) => apiFetch<CampusQuiz>(`${API}/quiz/${slug}`),

  submitQuiz: (slug: string, answers: { questionIndex: number; selectedOption: number; timeTakenSeconds: number }[], startedAt: string) =>
    apiFetch<QuizResult>(`${API}/quiz/${slug}/submit`, {
      method: "POST",
      body: JSON.stringify({ answers, startedAt }),
    }),

  getLeaderboard: () => apiFetch<LeaderboardData>(`${API}/leaderboard`),

  getXP: () => apiFetch<CampusUserXP>(`${API}/xp`),

  getStreak: () => apiFetch<StreakData>(`${API}/streak`),

  getBookmarks: () => apiFetch<CampusBookmark[]>(`${API}/bookmarks`),

  toggleBookmark: (tutorialSlug: string) =>
    apiFetch<{ bookmarked: boolean }>(`${API}/bookmarks`, {
      method: "POST",
      body: JSON.stringify({ tutorialSlug }),
    }),

  removeBookmark: (slug: string) =>
    apiFetch<{ bookmarked: boolean }>(`${API}/bookmarks/${slug}`, {
      method: "DELETE",
    }),

  getNote: (slug: string) => apiFetch<CampusNote | null>(`${API}/notes/${slug}`),

  upsertNote: (slug: string, content: string) =>
    apiFetch<CampusNote>(`${API}/notes/${slug}`, {
      method: "PUT",
      body: JSON.stringify({ content }),
    }),

  getBadges: () => apiFetch<CampusBadge[]>(`${API}/badges`),
};
