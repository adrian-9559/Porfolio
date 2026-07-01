"use client";
import { useRouter } from "next/router";

import { ThemeSwitch } from "@/components/theme-switch";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useT } from "@/hooks/useT";
import { useAuth } from "@/hooks/useAuth";

export function UserButton() {
  const { t } = useT();
  const { user, isAdmin, logout } = useAuth();
  const router = useRouter();

  const initials = user?.profile?.full_name
    ? user.profile.full_name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : (user?.email?.slice(0, 2).toUpperCase() ?? "?");

  const displayName = user?.profile?.full_name ?? user?.email ?? "";

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="relative group">
      <button className="flex items-center rounded-full p-0.5 hover:ring-2 hover:ring-blue-500/30 transition-all">
        <UserAvatar
          initials={initials}
          src={user?.profile?.avatar_url ?? null}
        />
      </button>

      <div className="absolute right-0 top-full mt-2 w-56 origin-top-right opacity-0 scale-95 pointer-events-none group-focus-within:opacity-100 group-focus-within:scale-100 group-focus-within:pointer-events-auto transition-all duration-150 z-50">
        <div className="bg-white dark:bg-[#111116] rounded-2xl border border-black/8 dark:border-white/8 shadow-xl overflow-hidden">
          <div className="flex items-center gap-2.5 px-4 py-3 border-b border-black/6 dark:border-white/6">
            <UserAvatar
              initials={initials}
              size="sm"
              src={user?.profile?.avatar_url ?? null}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#1d1d1f] dark:text-white truncate">
                {displayName}
              </p>
              <p className="text-xs text-[#6e6e73] dark:text-[#86868b] truncate">
                {user?.email}
              </p>
            </div>
            <ThemeSwitch />
            <LanguageSwitcher />
          </div>
          <div className="p-1.5 flex flex-col gap-0.5">
            <MenuItem
              icon={<IconDashboard />}
              label={t("user.myPanel")}
              onClick={() => router.push("/dashboard")}
            />
            <MenuItem
              icon={<IconUser />}
              label={t("user.myProfile")}
              onClick={() => router.push("/perfil")}
            />
            <MenuItem
              icon={<IconGear />}
              label={t("user.settings")}
              onClick={() => router.push("/configuracion")}
            />
            {isAdmin && (
              <MenuItem
                accent
                icon={<IconShield />}
                label={t("user.adminPanel")}
                onClick={() => router.push("/admin")}
              />
            )}
            <div className="my-1 border-t border-black/6 dark:border-white/6" />
            <MenuItem
              danger
              icon={<IconLogout />}
              label={t("user.logout")}
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function UserAvatar({
  initials,
  src,
  size = "md",
}: {
  initials: string;
  src: string | null;
  size?: "sm" | "md";
}) {
  const cls = size === "sm" ? "w-7 h-7 text-xs" : "w-8 h-8 text-sm";

  return (
    <div
      className={`${cls} rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-semibold shrink-0 overflow-hidden`}
    >
      {src ? (
        <img alt="" className="w-full h-full object-cover" src={src} />
      ) : (
        initials
      )}
    </div>
  );
}

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
      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-colors text-left ${
        danger
          ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
          : accent
            ? "text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30"
            : "text-[#1d1d1f] dark:text-white hover:bg-black/5 dark:hover:bg-white/5"
      }`}
      onClick={onClick}
    >
      <span className="w-4 h-4 shrink-0">{icon}</span>
      {label}
    </button>
  );
}

function IconDashboard() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <rect height="6" rx="1" width="6" x="1" y="1" />
      <rect height="6" rx="1" width="6" x="9" y="1" />
      <rect height="6" rx="1" width="6" x="1" y="9" />
      <rect height="6" rx="1" width="6" x="9" y="9" />
    </svg>
  );
}
function IconUser() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <circle cx="8" cy="5.5" r="2.5" />
      <path d="M2.5 13.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
    </svg>
  );
}
function IconGear() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <circle cx="8" cy="8" r="2" />
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M8 1.5L2 4v4c0 3.5 2.5 5.8 6 6.5 3.5-.7 6-3 6-6.5V4L8 1.5z" />
    </svg>
  );
}
function IconLogout() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10 11l3-3-3-3M13 8H6" />
    </svg>
  );
}
