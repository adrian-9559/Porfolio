export interface CampusProgress {
  id: string;
  user_id: string;
  tutorial_slug: string;
  guide_slug: string | null;
  completed_at: string;
  xp_earned: number;
  time_spent_seconds: number;
}

export interface CampusQuiz {
  id: string;
  tutorialSlug: string;
  questions: {
    index: number;
    question: string;
    options: string[];
    timeLimitSeconds: number;
  }[];
  passingScore: number;
  xpReward: number;
}

export interface QuizAnswer {
  questionIndex: number;
  selectedOption: number;
  timeTakenSeconds: number;
}

export interface QuizResult {
  attemptId: string;
  score: number;
  passed: boolean;
  correct: number;
  total: number;
  xpEarned: number;
  attemptsRemaining: number;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatarUrl: string | null;
  totalXp: number;
  level: number;
  tutorialsCompleted: number;
  quizzesPassed: number;
  streakDays: number;
}

export interface LeaderboardData {
  leaderboard: LeaderboardEntry[];
  userRank: { rank: number; totalXp: number } | null;
  userXp: CampusUserXP | null;
}

export interface CampusUserXP {
  user_id: string;
  total_xp: number;
  level: number;
  streak_days: number;
  best_streak_days: number;
  last_active_date: string | null;
  tutorials_completed: number;
  quizzes_passed: number;
}

export interface StreakData {
  currentStreak: number;
  bestStreak: number;
  recentDays: string[];
}

export interface CampusBookmark {
  tutorial_slug: string;
  created_at: string;
}

export interface CampusNote {
  user_id: string;
  tutorial_slug: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface CampusBadge {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: "milestone" | "streak" | "quiz" | "completion";
  threshold: number;
  xp_reward: number;
  earned: boolean;
  earnedAt: string | null;
}
