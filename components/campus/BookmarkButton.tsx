"use client";
import { useState, useEffect } from "react";

import { useT } from "@/hooks/useT";
import { campusService } from "@/services/campusService";

interface BookmarkButtonProps {
  tutorialSlug: string;
  initialBookmarked?: boolean;
}

export function BookmarkButton({
  tutorialSlug,
  initialBookmarked = false,
}: BookmarkButtonProps) {
  const { t } = useT();
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    campusService
      .getBookmarks()
      .then((bookmarks) => {
        setBookmarked(bookmarks.some((b) => b.tutorial_slug === tutorialSlug));
      })
      .catch(() => {});
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
      aria-label={
        bookmarked ? t("campus.bookmarks.remove") : t("campus.bookmarks.add")
      }
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
        bookmarked
          ? "bg-[var(--accent-light)] text-[var(--accent)] border border-[var(--border-hover)]"
          : "bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
      }`}
      disabled={loading}
      type="button"
      onClick={toggle}
    >
      <svg
        className="w-3.5 h-3.5"
        fill={bookmarked ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
      {bookmarked ? t("campus.bookmarks.remove") : t("campus.bookmarks.add")}
    </button>
  );
}
