export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export type ChallengeStatus =
  | "locked"
  | "available"
  | "in_progress"
  | "completed";

export interface Challenge {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** Narrative context for the challenge */
  narrative: string;
  /** What the user needs to build/achieve */
  objective: string;
  /** Difficulty level */
  difficulty: DifficultyLevel;
  /** Category tag */
  category: string;
  categoryColor: string;
  /** XP reward for completion */
  xpReward: number;
  /** Estimated time in minutes */
  estimatedMinutes: number;
  /** Prerequisites (other challenge slugs) */
  prerequisites: string[];
  /** Starting code template */
  starterCode: string;
  /** Test cases to validate the solution */
  tests: ChallengeTest[];
  /** Solution reference (shown after completion) */
  solution?: string;
  /** Study plan this belongs to */
  planSlug: string;
  /** Order within the plan */
  order: number;
  /** Status for current user */
  status: ChallengeStatus;
}

export interface ChallengeTest {
  name: string;
  input: string;
  expectedOutput: string;
  hidden: boolean;
}

export interface StudyPlan {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** Icon emoji or component */
  icon: string;
  /** Primary color class */
  color: string;
  /** Gradient class */
  gradient: string;
  /** Total challenges in this plan */
  totalChallenges: number;
  /** Difficulty level of the plan */
  level: DifficultyLevel;
  /** Estimated total time */
  estimatedHours: number;
  /** Challenge slugs in order */
  challengeSlugs: string[];
  /** Whether this plan is featured */
  featured: boolean;
}

export interface ChallengeSubmission {
  challengeId: string;
  code: string;
  language: string;
  passed: boolean;
  testsPassed: number;
  testsTotal: number;
  completedAt: string;
  xpEarned: number;
}
