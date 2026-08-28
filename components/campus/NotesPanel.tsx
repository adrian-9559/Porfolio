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
    campusService.getNote(tutorialSlug).then((note) => {
      if (note) setContent(note.content);
    }).catch(() => {});
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
        <h4 className="text-xs font-semibold text-[#1d1d1f] dark:text-white">{t("campus.notes.title")}</h4>
        {saved && (
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium animate-in fade-in">
            ✓ {t("campus.notes.saved")}
          </span>
        )}
      </div>
      <textarea
        className="w-full h-32 p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-xs text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] dark:placeholder-[#636366] focus:outline-none focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-1 focus:ring-emerald-400/20 transition-all resize-none"
        placeholder={t("campus.notes.placeholder")}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}
