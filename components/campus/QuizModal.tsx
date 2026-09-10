"use client";
import type { CampusQuiz, QuizResult } from "@/types/campus";

import { useState, useEffect, useRef, useCallback } from "react";

import { useT } from "@/hooks/useT";
import { campusService } from "@/services/campusService";
import { IconCelebration, IconSadFace } from "@/components/ui/Icons";

interface QuizModalProps {
  tutorialSlug: string;
  onClose: () => void;
  onComplete?: (result: QuizResult) => void;
}

export function QuizModal({
  tutorialSlug,
  onClose,
  onComplete,
}: QuizModalProps) {
  const { t } = useT();
  const [quiz, setQuiz] = useState<CampusQuiz | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<
    {
      questionIndex: number;
      selectedOption: number;
      timeTakenSeconds: number;
    }[]
  >([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [serverStartedAt, setServerStartedAt] = useState<string>("");
  const [questionStart, setQuestionStart] = useState(0);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const selectedRef = useRef<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useEffect(() => {
    campusService
      .getQuiz(tutorialSlug)
      .then((q) => {
        setQuiz(q);
        setServerStartedAt(q.serverStartedAt);
        setQuestionStart(Date.now());
        if (q && q.questions.length > 0) {
          setTimeLeft(q.questions[0].timeLimitSeconds);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [tutorialSlug]);

  const handleNext = useCallback(() => {
    if (!quiz || submitting) return;
    if (timerRef.current) clearInterval(timerRef.current);

    const timeTaken = Math.floor((Date.now() - questionStart) / 1000);
    const currentSelected = selectedRef.current ?? -1;
    const newAnswers = [
      ...answers,
      {
        questionIndex: currentQ,
        selectedOption: currentSelected,
        timeTakenSeconds: timeTaken,
      },
    ];

    setAnswers(newAnswers);
    setSelected(null);
    selectedRef.current = null;

    if (currentQ < quiz.questions.length - 1) {
      const nextQ = currentQ + 1;

      setCurrentQ(nextQ);
      setQuestionStart(Date.now());
      setTimeLeft(quiz.questions[nextQ].timeLimitSeconds);
    } else {
      setSubmitting(true);
      campusService
        .submitQuiz(tutorialSlug, newAnswers, serverStartedAt)
        .then((r) => {
          setResult(r);
          setSubmitting(false);
          onComplete?.(r);
        })
        .catch((e) => {
          setSubmitting(false);
          setError(e instanceof Error ? e.message : "Error al enviar quiz");
        });
    }
  }, [
    quiz,
    currentQ,
    answers,
    questionStart,
    serverStartedAt,
    tutorialSlug,
    submitting,
    onComplete,
  ]);

  useEffect(() => {
    if (timeLeft <= 0 || result) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNext();

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentQ, result, handleNext]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter" && selected !== null && !submitting) handleNext();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, selected, submitting, handleNext]);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-overlay)] backdrop-blur-sm">
        <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!quiz) return null;

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-overlay)] backdrop-blur-sm p-4">
        <div className="w-full max-w-sm bg-[var(--bg-card)] rounded-2xl border border-[var(--border-default)] shadow-2xl p-8 text-center space-y-4">
          <p className="text-sm text-[var(--state-danger-fg)]">{error}</p>
          <button
            className="px-6 py-2.5 rounded-xl bg-[var(--bg-interactive)] text-[var(--text-interactive)] text-sm font-medium hover:bg-[var(--bg-interactive-hover)] transition-colors"
            type="button"
            onClick={onClose}
          >
            {t("campus.quiz.submit")}
          </button>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-overlay)] backdrop-blur-sm p-4">
        <div className="w-full max-w-sm bg-[var(--bg-card)] rounded-2xl border border-[var(--border-default)] shadow-2xl p-8 text-center space-y-4">
          <div
            className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
              result.passed ? "bg-[var(--accent-light)] text-[var(--accent)]" : "bg-[var(--state-danger-bg)] text-red-500"
            }`}
          >
            {result.passed ? <IconCelebration className="w-8 h-8" /> : <IconSadFace className="w-8 h-8" />}
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">
            {result.passed ? t("campus.quiz.passed") : t("campus.quiz.failed")}
          </h3>
          <div className="space-y-1">
            <p className="text-3xl font-black text-[var(--text-primary)]">
              {result.score}%
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              {result.correct}/{result.total} {t("campus.quiz.of")}{" "}
              {t("campus.quiz.questions").toLowerCase()}
            </p>
          </div>
          {result.xpEarned > 0 && (
            <p className="text-sm font-semibold text-[var(--accent)]">
              +{result.xpEarned} XP
            </p>
          )}
          <div className="flex gap-2">
            {result.attemptsRemaining > 0 && !result.passed && (
              <button
                className="flex-1 py-2.5 rounded-xl bg-[var(--bg-surface)] text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors border border-[var(--border-default)]"
                type="button"
                onClick={onClose}
              >
                {t("campus.quiz.retry")} ({result.attemptsRemaining})
              </button>
            )}
            <button
              className="flex-1 py-2.5 rounded-xl bg-[var(--bg-interactive)] text-[var(--text-interactive)] text-sm font-medium hover:bg-[var(--bg-interactive-hover)] transition-colors"
              type="button"
              onClick={onClose}
            >
              {t("campus.quiz.submit")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQ];
  const pct = (currentQ / quiz.questions.length) * 100;
  const timerPct = question
    ? (timeLeft / question.timeLimitSeconds) * 100
    : 100;
  const timerColor =
    timerPct > 50
      ? "text-[var(--accent)]"
      : timerPct > 25
        ? "text-[var(--state-warning-fg)]"
        : "text-[var(--state-danger-fg)]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-overlay)] backdrop-blur-sm p-4">
      <div
        ref={modalRef}
        aria-label={t("campus.quiz.title")}
        aria-modal="true"
        className="w-full max-w-lg bg-[var(--bg-card)] rounded-2xl border border-[var(--border-default)] shadow-2xl overflow-hidden"
        role="dialog"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-[var(--border-default)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[var(--text-muted)]">
              {currentQ + 1}/{quiz.questions.length}
            </span>
            <span className={`text-sm font-bold tabular-nums ${timerColor}`}>
              {Math.floor(timeLeft / 60)}:
              {String(timeLeft % 60).padStart(2, "0")}
            </span>
          </div>
          <div className="h-1 rounded-full bg-[var(--bg-surface)] overflow-hidden">
            <div
              className="h-full rounded-full bg-[var(--accent)] transition-all duration-300"
              style={{ width: `${pct + 100 / quiz.questions.length}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="px-6 py-6">
          <p className="text-sm font-semibold text-[var(--text-primary)] mb-4">
            {question.question}
          </p>
          <div className="space-y-2">
            {question.options.map((opt, i) => (
              <button
                key={i}
                className={`w-full text-left p-3 rounded-xl text-sm font-medium transition-all duration-200 border ${
                  selected === i
                    ? "bg-[var(--accent-light)] border-[var(--border-hover)] text-[var(--accent)]"
                    : "bg-[var(--bg-surface)] border-[var(--border-default)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
                }`}
                type="button"
                onClick={() => setSelected(i)}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                      selected === i
                        ? "bg-[var(--accent)] text-[var(--text-interactive)]"
                        : "bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-default)]"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-5 flex items-center justify-between">
          <button
            className="px-4 py-2 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            type="button"
            onClick={onClose}
          >
            {t("campus.quiz.submit")}
          </button>
          <button
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-colors ${
              selected !== null
                ? "bg-[var(--bg-interactive)] text-[var(--text-interactive)] hover:bg-[var(--bg-interactive-hover)]"
                : "bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-default)] cursor-not-allowed"
            }`}
            disabled={selected === null || submitting}
            type="button"
            onClick={handleNext}
          >
            {submitting
              ? "..."
              : currentQ < quiz.questions.length - 1
                ? t("campus.quiz.submit")
                : t("campus.quiz.submit")}
          </button>
        </div>
      </div>
    </div>
  );
}
