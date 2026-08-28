"use client";
import { useState, useEffect } from "react";
import { useT } from "@/hooks/useT";
import { campusService } from "@/services/campusService";

interface BookmarkButtonProps {
  tutorialSlug: string;
  initialBookmarked?: boolean;
}

export function BookmarkButton({ tutorialSlug, initialBookmarked = false }: BookmarkButtonProps) {
  const { t } = useT();
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    campusService.getBookmarks().then((bookmarks) => {
      setBookmarked(bookmarks.some((b) => b.tutorial_slug === tutorialSlug));
    }).catch(() => {});
  }, [tutorialSlug]);

  const toggle = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await campusService.toggleBookmark(tutorialSlug);
      setBookmarked(result.bookmarked);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      aria-label={bookmarked ? t("campus.bookmarks.remove") : t("campus.bookmarks.add")}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
        bookmarked
          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-300/40 dark:border-emerald-700/40"
          : "bg-black/5 dark:bg-white/8 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/10 dark:hover:bg-white/12"
      }`}
      onClick={toggle}
      type="button"
      disabled={loading}
    >
      <svg className="w-3.5 h-3.5" fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
      {bookmarked ? t("campus.bookmarks.remove") : t("campus.bookmarks.add")}
    </button>
  );
}
