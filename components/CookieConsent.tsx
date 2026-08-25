"use client";
import { useState } from "react";

import { useT } from "@/hooks/useT";
import { useCookieConsentStore } from "@/store/cookieConsentStore";

export default function CookieConsent() {
  const { t } = useT();
  const { hydrated, hasConsented, setConsent, rejectAll, acceptAll } =
    useCookieConsentStore();

  const [analytics, setAnalytics] = useState(false);
  const [preferences, setPreferences] = useState(false);

  if (!hydrated || hasConsented) return null;

  const handleSave = () => {
    clearStorageOnReject(analytics, preferences);
    setConsent({ analytics, preferences });
  };

  const handleRejectAll = () => {
    clearStorageOnReject(false, false);
    rejectAll();
  };

  const handleAcceptAll = () => {
    acceptAll();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none">
      <div className="max-w-2xl mx-auto pointer-events-auto">
        <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 shadow-2xl shadow-black/20 dark:shadow-black/50 overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
          {/* Header */}
          <div className="relative px-5 pt-4 pb-3 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-pink-500/5 to-transparent" />
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-violet-400/10 to-pink-400/5 blur-3xl" />
            <div className="relative flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1d1d1f] dark:text-white">
                  {t("cookie.title")}
                </h3>
              </div>
            </div>
            <p className="relative text-xs text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
              {t("cookie.desc")}
            </p>
          </div>

          {/* Categories */}
          <div className="px-5 pb-3 space-y-2">
            {/* Essential */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
              <div className="flex-1 min-w-0 mr-3">
                <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white">
                  {t("cookie.essential")}
                </p>
                <p className="text-[11px] text-[#6e6e73] dark:text-[#86868b] mt-0.5">
                  {t("cookie.essentialDesc")}
                </p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 whitespace-nowrap">
                {t("cookie.essentialBadge")}
              </span>
            </div>

            {/* Analytics */}
            <ToggleRow
              checked={analytics}
              onChange={setAnalytics}
              label={t("cookie.analytics")}
              description={t("cookie.analyticsDesc")}
            />

            {/* Preferences */}
            <ToggleRow
              checked={preferences}
              onChange={setPreferences}
              label={t("cookie.preferences")}
              description={t("cookie.preferencesDesc")}
            />
          </div>

          {/* Actions */}
          <div className="px-5 pb-4 flex gap-2">
            <button
              className="flex-1 px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 text-xs font-medium text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              onClick={handleRejectAll}
              type="button"
            >
              {t("cookie.rejectAll")}
            </button>
            <button
              className="flex-1 px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 text-xs font-medium text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              onClick={handleSave}
              type="button"
            >
              {t("cookie.save")}
            </button>
            <button
              className="flex-1 px-3 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white text-xs font-semibold shadow-md shadow-violet-500/20 hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-300"
              onClick={handleAcceptAll}
              type="button"
            >
              {t("cookie.acceptAll")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Toggle row ────────────────────────────────────────────────────────────────

function ToggleRow({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
      <div className="flex-1 min-w-0 mr-3">
        <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white">
          {label}
        </p>
        <p className="text-[11px] text-[#6e6e73] dark:text-[#86868b] mt-0.5">
          {description}
        </p>
      </div>
      <button
        className={`relative w-9 h-[20px] rounded-full transition-colors duration-200 flex-shrink-0 ${
          checked
            ? "bg-gradient-to-r from-violet-500 to-pink-500"
            : "bg-black/15 dark:bg-white/15"
        }`}
        onClick={() => onChange(!checked)}
        type="button"
        role="switch"
        aria-checked={checked}
      >
        <span
          className={`absolute top-[2px] left-[2px] w-[16px] h-[16px] rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? "translate-x-[16px]" : ""
          }`}
        />
      </button>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function clearStorageOnReject(analytics: boolean, preferences: boolean) {
  try {
    if (!analytics) {
      localStorage.removeItem("analytics_visitor_id");
      localStorage.removeItem("analytics_visited");
    }
    if (!preferences) {
      localStorage.removeItem("app-locale");
      localStorage.removeItem("theme");
    }
  } catch {}
}
