"use client";
import { useRef, useState } from "react";

import { useT } from "@/hooks/useT";
import { useAuth } from "@/hooks/useAuth";
import { userService } from "@/services/userService";
import { useAuthStore } from "@/store/authStore";

export function AvatarUpload() {
  const { t } = useT();
  const { user } = useAuth();
  const hydrate = useAuthStore((s) => s.hydrate);
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const displayName = user?.profile?.full_name ?? user?.email ?? "";
  const initials = displayName
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setError(t("settings.avatarError"));
      return;
    }
    setUploading(true);
    setError("");
    setSuccess(false);
    try {
      await userService.uploadAvatar(file);
      await hydrate();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } catch {
      setError(t("settings.avatarError"));
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-2xl font-bold overflow-hidden flex-shrink-0">
        {user?.profile?.avatar_url ? (
          <img alt="" className="w-full h-full object-cover" src={user.profile.avatar_url} />
        ) : (
          initials
        )}
      </div>
      <div>
        <input
          ref={inputRef}
          accept="image/*"
          className="hidden"
          type="file"
          onChange={handleFile}
        />
        <button
          className="text-sm font-medium text-accent hover:underline disabled:opacity-50"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? "…" : t("settings.uploadAvatar")}
        </button>
        <p className="text-xs text-muted/60 mt-0.5">{t("settings.avatarHint")}</p>
        {success && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
            ✓ {t("settings.avatarUploaded")}
          </p>
        )}
        {error && (
          <p className="text-xs text-red-500 mt-0.5">{error}</p>
        )}
      </div>
    </div>
  );
}
