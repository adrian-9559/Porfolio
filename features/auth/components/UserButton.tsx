"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

import { ThemeSwitch } from "@/components/theme-switch";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useT } from "@/hooks/useT";
import { useAuth } from "@/hooks/useAuth";

export function UserButton() {
  const { t } = useT();
  const { user, isAdmin, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const initials = user?.profile?.full_name
    ? user.profile.full_name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : (user?.email?.slice(0, 2).toUpperCase() ?? "?");

  const displayName = user?.profile?.full_name ?? user?.email ?? "";

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    router.push("/");
  };

  const navigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <div ref={ref} className="relative">
      {/* Avatar button */}
      <button
        className="relative flex items-center rounded-full p-0.5 hover:ring-2 hover:ring-violet-500/30 transition-all duration-300"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-violet-500/20">
          {user?.profile?.avatar_url ? (
            <img alt="" className="w-full h-full object-cover" src={user.profile.avatar_url} />
          ) : (
            initials
          )}
        </div>
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white dark:border-[#111116]" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 origin-top-right z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 shadow-2xl shadow-black/10 dark:shadow-black/40 overflow-hidden">
            {/* User info header */}
            <div className="relative px-4 py-4 border-b border-black/6 dark:border-white/6 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-pink-500/5 to-transparent" />
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-violet-400/10 to-pink-400/5 blur-2xl" />
              <div className="relative flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-violet-500/20">
                  {user?.profile?.avatar_url ? (
                    <img alt="" className="w-full h-full object-cover" src={user.profile.avatar_url} />
                  ) : (
                    initials
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white truncate">
                    {displayName}
                  </p>
                  <p className="text-xs text-[#6e6e73] dark:text-[#86868b] truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="relative flex items-center gap-1.5 mt-3">
                <ThemeSwitch />
                <LanguageSwitcher />
                {isAdmin && (
                  <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    ADMIN
                  </span>
                )}
              </div>
            </div>

            {/* Menu items */}
            <div className="p-1.5">
              <MenuItem
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                }
                label={t("user.myPanel")}
                onClick={() => navigate("/dashboard")}
              />
              <MenuItem
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
                label={t("user.myProfile")}
                onClick={() => navigate("/perfil")}
              />
              <MenuItem
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
                label={t("user.settings")}
                onClick={() => navigate("/configuracion")}
              />
              {isAdmin && (
                <MenuItem
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  }
                  label={t("user.adminPanel")}
                  accent
                  onClick={() => navigate("/admin")}
                />
              )}
            </div>

            {/* Logout */}
            <div className="p-1.5 border-t border-black/6 dark:border-white/6">
              <MenuItem
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                }
                label={t("user.logout")}
                danger
                onClick={handleLogout}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Menu item component ───────────────────────────────────────────────────────

function MenuItem({
  label,
  icon,
  onClick,
  danger,
  accent,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
  accent?: boolean;
}) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
        danger
          ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
          : accent
            ? "text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30"
            : "text-[#3d3d3d] dark:text-[#c0c0c5] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
      }`}
      onClick={onClick}
      type="button"
    >
      <span className={`${danger ? "text-red-500 dark:text-red-400" : accent ? "text-blue-500 dark:text-blue-400" : "text-[#aeaeb2] dark:text-[#636366]"} flex-shrink-0`}>
        {icon}
      </span>
      {label}
    </button>
  );
}
