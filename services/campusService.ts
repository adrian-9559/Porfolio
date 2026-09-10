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

import { apiFetch } from "./apiClient";

const API = "/api/campus";

// ── Types ────────────────────────────────────────────────────────────────────

export interface CampusExercise {
  id: string;
  tutorial_slug: string;
  type: "code" | "quiz" | "true_false" | "fill_blank" | "drag_drop";
  order_index: number;
  title: string;
  description: string | null;
  config: Record<string, unknown>;
  xp_reward: number;
  passing_score: number;
}

export interface ExerciseResult {
  score: number;
  passed: boolean;
  xpEarned: number;
  details: Record<string, unknown>;
}

export interface CodeRunResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  executionTimeMs: number;
}

export interface ExerciseProgress {
  total: number;
  passed: number;
  allPassed: boolean;
}

export interface CampusCertificate {
  id: string;
  user_id: string;
  guide_slug: string;
  certificate_code: string;
  tutorial_slugs: string[];
  exercises_passed: number;
  total_exercises: number;
  avg_score: number;
  issued_at: string;
}

export const campusService = {
  getProgress: () => apiFetch<CampusProgress[]>(`${API}/progress`),

  markComplete: (
    tutorialSlug: string,
    guideSlug?: string,
    timeSpentSeconds = 0,
  ) =>
    apiFetch<{ xpEarned: number; totalXp: number; level: number }>(
      `${API}/progress`,
      {
        method: "POST",
        body: JSON.stringify({
          tutorialSlug,
          guideSlug: guideSlug ?? null,
          timeSpentSeconds,
        }),
      },
    ),

  getGuideProgress: (slug: string) =>
    apiFetch<{ tutorial_slug: string; completed_at: string }[]>(
      `${API}/progress/guide/${slug}`,
    ),

  getAllGuideProgress: () =>
    apiFetch<Record<string, number>>(`${API}/progress/all-guides`),

  getQuiz: (slug: string) => apiFetch<CampusQuiz>(`${API}/quiz/${slug}`),

  submitQuiz: (
    slug: string,
    answers: {
      questionIndex: number;
      selectedOption: number;
      timeTakenSeconds: number;
    }[],
    startedAt: string,
  ) =>
    apiFetch<QuizResult>(`${API}/quiz/${slug}/submit`, {
      method: "POST",
      body: JSON.stringify({ answers, startedAt }),
    }),

  getLeaderboard: (period: "all" | "week" | "month" = "all") =>
    apiFetch<LeaderboardData>(`${API}/leaderboard?period=${period}`),

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

  getNote: (slug: string) =>
    apiFetch<CampusNote | null>(`${API}/notes/${slug}`),

  upsertNote: (slug: string, content: string) =>
    apiFetch<CampusNote>(`${API}/notes/${slug}`, {
      method: "PUT",
      body: JSON.stringify({ content }),
    }),

  getBadges: () => apiFetch<CampusBadge[]>(`${API}/badges`),

  // ── Exercises ────────────────────────────────────────────────────────────

  getExercises: (tutorialSlug: string) =>
    apiFetch<CampusExercise[]>(`${API}/exercises/${tutorialSlug}`),

  submitExercise: (
    exerciseId: string,
    answer: Record<string, unknown>,
    startedAt: string,
  ) =>
    apiFetch<ExerciseResult>(`${API}/exercises/${exerciseId}/submit`, {
      method: "POST",
      body: JSON.stringify({ answer, startedAt }),
    }),

  runCode: (code: string, language: string) =>
    apiFetch<CodeRunResult>(`${API}/exercises/code/run`, {
      method: "POST",
      body: JSON.stringify({ code, language }),
    }),

  getExerciseProgress: (tutorialSlug: string) =>
    apiFetch<ExerciseProgress>(`${API}/exercises/progress/${tutorialSlug}`),

  // ── Certificates ─────────────────────────────────────────────────────────

  generateCertificate: (guideSlug: string) =>
    apiFetch<{ alreadyExists: boolean; certificate: CampusCertificate }>(
      `${API}/certificates/generate`,
      {
        method: "POST",
        body: JSON.stringify({ guideSlug }),
      },
    ),

  getMyCertificates: () =>
    apiFetch<CampusCertificate[]>(`${API}/certificates`),

  verifyCertificate: (code: string) =>
    apiFetch<CampusCertificate & { userName: string }>(
      `${API}/certificates/${code}/verify`,
    ),
};
