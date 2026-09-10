"use client";

import { useState, useCallback } from "react";

import type { CampusExercise, ExerciseResult } from "@/services/campusService";
import { campusService } from "@/services/campusService";
import { useT } from "@/hooks/useT";

interface DragDropExerciseProps {
  exercise: CampusExercise;
  result?: ExerciseResult;
  startedAt: string;
  onComplete: (result: ExerciseResult) => void;
}

interface DragItem {
  id: string;
  text: string;
}

export function DragDropExercise({
  exercise,
  result,
  startedAt,
  onComplete,
}: DragDropExerciseProps) {
  const { t } = useT();
  const config = exercise.config as {
    items?: string[];
    variant?: "sort_code" | "match_pairs";
    pairs?: { left: string; right: string }[];
    hint?: string;
  };

  const [items, setItems] = useState<DragItem[]>(() => {
    if (config.variant === "match_pairs" && config.pairs) {
      // For matching: shuffle the right side
      const rights = config.pairs.map((p, i) => ({ id: `right-${i}`, text: p.right }));
      return shuffleArray(rights);
    }
    // For sorting: shuffle the items
    return shuffleArray(
      (config.items ?? []).map((text, i) => ({ id: `item-${i}`, text })),
    );
  });

  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelect = useCallback((idx: number) => {
    setSelectedIdx((prev) => (prev === idx ? null : idx));
  }, []);

  const handleMoveUp = useCallback((idx: number) => {
    if (idx === 0) return;
    setItems((prev) => {
      const next = [...prev];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
  }, []);

  const handleMoveDown = useCallback((idx: number) => {
    setItems((prev) => {
      if (idx >= prev.length - 1) return prev;
      const next = [...prev];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next;
    });
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const res = await campusService.submitExercise(
        exercise.id,
        {
          type: "drag_drop",
          orderedIds: items.map((i) => i.id),
        },
        startedAt,
      );
      onComplete(res);
    } catch {
      // error handled by parent
    } finally {
      setIsSubmitting(false);
    }
  }, [items, exercise.id, startedAt, onComplete]);

  return (
    <div className="space-y-4">
      {config.hint && (
        <p className="text-xs text-[var(--text-muted)] italic">{config.hint}</p>
      )}

      <div className="space-y-1">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all cursor-pointer ${
              selectedIdx === idx
                ? "bg-[var(--accent-light)] border-[var(--accent)]"
                : "bg-[var(--bg-surface)] border-[var(--border-default)] hover:border-[var(--border-hover)]"
            }`}
            role="button"
            tabIndex={0}
            onClick={() => handleSelect(idx)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleSelect(idx);
            }}
          >
            <span className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-default)]">
              {idx + 1}
            </span>
            <span className="flex-1 text-sm text-[var(--text-primary)] font-mono">
              {item.text}
            </span>
            <div className="flex flex-col gap-0.5">
              <button
                aria-label={t("campus.exercises.moveUp")}
                className="w-5 h-5 flex items-center justify-center rounded text-[10px] text-[var(--text-muted)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"
                disabled={idx === 0}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMoveUp(idx);
                }}
              >
                ↑
              </button>
              <button
                aria-label={t("campus.exercises.moveDown")}
                className="w-5 h-5 flex items-center justify-center rounded text-[10px] text-[var(--text-muted)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"
                disabled={idx === items.length - 1}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMoveDown(idx);
                }}
              >
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>

      {!result && (
        <button
          className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-[var(--accent)] hover:opacity-90 transition-opacity disabled:opacity-50"
          disabled={isSubmitting}
          type="button"
          onClick={handleSubmit}
        >
          {isSubmitting ? "Enviando..." : "Enviar orden"}
        </button>
      )}

      {result && (
        <div
          className={`p-3 rounded-lg text-xs font-semibold ${
            result.passed
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "bg-red-500/10 text-red-600 dark:text-red-400"
          }`}
        >
          {result.passed
            ? `✓ Aprobado — +${result.xpEarned} XP`
            : `✗ No aprobado — Score: ${result.score}%`}
        </div>
      )}
    </div>
  );
}

function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
