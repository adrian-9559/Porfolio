"use client";
import { useState } from "react";

import { useT } from "@/hooks/useT";
import { userService } from "@/services/userService";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/authStore";

export function DangerZone() {
  const { t } = useT();
  const { logout } = useAuth();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!password) {
      setError(t("settings.currentPasswordRequired"));
      return;
    }
    setLoading(true);
    setError("");
    try {
      await userService.deleteSelf(password);
      setSuccess(true);
      setTimeout(() => {
        logout();
        router.push("/");
      }, 1500);
    } catch {
      setError(t("settings.deleteAccountError"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="text-base font-bold text-foreground mb-1">
        {t("settings.deleteAccountTitle")}
      </h2>
      <p className="text-xs text-muted mb-4">{t("settings.deleteAccountDesc")}</p>
      <div className="rounded-xl border border-red-200 dark:border-red-800/40 bg-red-50/50 dark:bg-red-950/10 p-4 space-y-3">
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wider text-red-600/80 dark:text-red-400/70 block mb-1.5">
            {t("settings.deleteAccountConfirm")}
          </label>
          <input
            className="w-full px-3 py-2 rounded-xl border border-red-200 dark:border-red-800/40 bg-white dark:bg-[#111116] text-sm text-foreground placeholder:text-red-400/50 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-all"
            placeholder={t("settings.currentPassword")}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <p className="text-xs text-red-500">{error}</p>
        )}
        {success && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400">
            ✓ {t("settings.deleteAccountSuccess")}
          </p>
        )}
        <button
          className="text-xs font-semibold text-red-600 dark:text-red-400 px-3 py-1.5 rounded-lg border border-red-300 dark:border-red-700/50 hover:bg-red-100 dark:hover:bg-red-950/30 transition-colors disabled:opacity-50"
          disabled={loading || success}
          onClick={handleDelete}
        >
          {loading ? "…" : t("settings.deleteAccountBtn")}
        </button>
      </div>
    </div>
  );
}
