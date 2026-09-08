"use client";
import { useState, useEffect, useCallback } from "react";

import { useT } from "@/hooks/useT";
import { campusService } from "@/services/campusService";

interface NotesPanelProps {
  tutorialSlug: string;
}

export function NotesPanel({ tutorialSlug }: NotesPanelProps) {
  const { t } = useT();
  const [content, setContent] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    campusService
      .getNote(tutorialSlug)
      .then((note) => {
        if (note) setContent(note.content);
      })
      .catch(() => {});
  }, [tutorialSlug]);

  const save = useCallback(async () => {
    if (saving) return;
    setSaving(true);
    try {
      await campusService.upsertNote(tutorialSlug, content);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
    } finally {
      setSaving(false);
    }
  }, [tutorialSlug, content, saving]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (content.trim()) save();
    }, 1500);

    return () => clearTimeout(timer);
  }, [content, save]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold text-[var(--text-primary)]">
          {t("campus.notes.title")}
        </h4>
        {saved && (
          <span className="text-[10px] text-[var(--accent)] font-medium animate-in fade-in">
            ✓ {t("campus.notes.saved")}
          </span>
        )}
      </div>
      <textarea
        className="w-full h-32 p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/20 transition-all resize-none"
        placeholder={t("campus.notes.placeholder")}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}
