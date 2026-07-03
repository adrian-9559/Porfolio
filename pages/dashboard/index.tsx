import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import DefaultLayout from "@/layouts/default";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useT } from "@/hooks/useT";
import { UserDashboardHome } from "@/features/dashboard/components/UserDashboardHome";
import { UserRepositoriesSection } from "@/features/dashboard/components/UserRepositoriesSection";
import { UserAgentsSection } from "@/features/dashboard/components/UserAgentsSection";
import { UserNotificationsSection } from "@/features/dashboard/components/UserNotificationsSection";
import { UserTricountSection } from "@/features/dashboard/components/UserTricountSection";
import { UserFriendsSection } from "@/features/dashboard/components/UserFriendsSection";
import { UserSettingsSection } from "@/features/dashboard/components/UserSettingsSection";
import { UserAppsSection } from "@/features/dashboard/components/UserAppsSection";
import { UserTasksSection } from "@/features/dashboard/components/UserTasksSection";
import { UserFinancesSection } from "@/features/dashboard/components/UserFinancesSection";
import { UserCalendarSection } from "@/features/dashboard/components/UserCalendarSection";
import { UserTablesSection } from "@/features/dashboard/components/UserTablesSection";

type Section =
  | "home"
  | "repositories"
  | "agents"
  | "notifications"
  | "tricount"
  | "friends"
  | "apps"
  | "tasks"
  | "finances"
  | "calendar"
  | "tables"
  | "settings-profile"
  | "settings-security"
  | "settings-session";

function navItems(t: (k: string) => string): { id: Section; label: string; icon: React.ReactNode; group: string }[] {
  return [
    { id: "home", label: t("dashboard.sidebarInicio"), icon: <IcoHome />, group: "general" },
    { id: "repositories", label: t("dashboard.sidebarRepos"), icon: <IcoGit />, group: "herramientas" },
    { id: "agents", label: t("dashboard.sidebarAgents"), icon: <IcoBot />, group: "herramientas" },
    { id: "notifications", label: t("dashboard.sidebarNotifications"), icon: <IcoBell />, group: "herramientas" },
    { id: "friends", label: t("dashboard.sidebarFriends"), icon: <IcoFriends />, group: "herramientas" },
    { id: "apps", label: t("dashboard.sidebarApps"), icon: <IcoApps />, group: "herramientas" },
    { id: "tasks", label: t("dashboard.sidebarTasks"), icon: <IcoTasks />, group: "herramientas" },
    { id: "calendar", label: t("dashboard.sidebarCalendar"), icon: <IcoCalendar />, group: "herramientas" },
    { id: "tables", label: t("dashboard.sidebarTables"), icon: <IcoTable />, group: "herramientas" },
    { id: "tricount", label: t("dashboard.sidebarTricount"), icon: <IcoMoney />, group: "finanzas" },
    { id: "finances", label: t("dashboard.sidebarFinancesPanel"), icon: <IcoChart />, group: "finanzas" },
    { id: "settings-profile", label: t("dashboard.sidebarProfile"), icon: <IcoUser />, group: "configuracion" },
    { id: "settings-security", label: t("dashboard.sidebarSecurity"), icon: <IcoLock />, group: "configuracion" },
    { id: "settings-session", label: t("dashboard.sidebarSession"), icon: <IcoSession />, group: "configuracion" },
  ];
}

function groups(t: (k: string) => string) {
  return [
    { id: "general", label: t("dashboard.sidebarGeneral") },
    { id: "herramientas", label: t("dashboard.sidebarTools") },
    { id: "finanzas", label: t("dashboard.sidebarFinances") },
    { id: "configuracion", label: t("dashboard.sidebarConfig") },
  ];
}

export default function DashboardPage() {
  const { t } = useT();
  const router = useRouter();
  const { isAuthenticated, loadingAuth } = useRequireAuth();
  const [section, setSection] = useState<Section>("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const NAV = navItems(t);
  const GROUPS = groups(t);

  // Deep-link support: /dashboard?section=repositories (used by GlobalSearch)
  useEffect(() => {
    const q = router.query.section;

    if (typeof q === "string" && NAV.some((n) => n.id === q)) {
      setSection(q as Section);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.section]);

  if (loadingAuth || !isAuthenticated) {
    return (
      <DefaultLayout>
        <div className="flex justify-center py-20">
          <div className="w-5 h-5 rounded-full border-2 border-blue-600/30 border-t-blue-600 animate-spin" />
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                {t("dashboard.sidebarName")}
              </span>
            </div>
            <h1 className="text-2xl font-semibold text-[#1d1d1f] dark:text-white">
              {t("dashboard.title")}
            </h1>
            <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-1">
              {t("dashboard.subtitle")}
            </p>
          </div>
          <button
            className="sm:hidden p-2 rounded-xl border border-black/12 dark:border-white/12 text-[#1d1d1f] dark:text-white"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg
              fill="none"
              height="18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              viewBox="0 0 18 18"
              width="18"
            >
              <path d="M2 4.5h14M2 9h14M2 13.5h14" />
            </svg>
          </button>
        </div>

        <div className="flex gap-6 relative">
          {/* Sidebar */}
          <aside
            className={`${mobileOpen ? "block" : "hidden"} sm:block w-52 shrink-0`}
          >
            <nav className="flex flex-col gap-0.5 sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto pb-4">
              {GROUPS.map((g) => {
                const items = NAV.filter((n) => n.group === g.id);

                return (
                  <div key={g.id} className="mb-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] px-3 mb-1">
                      {g.label}
                    </p>
                    {items.map((item) => (
                      <button
                        key={item.id}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all ${
                          section === item.id
                            ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
                            : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                        }`}
                        onClick={() => {
                          setSection(item.id);
                          setMobileOpen(false);
                        }}
                      >
                        <span className="w-4 h-4 shrink-0">{item.icon}</span>
                        {item.label}
                      </button>
                    ))}
                  </div>
                );
              })}
            </nav>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {section === "home" && (
              <UserDashboardHome onNavigate={setSection} />
            )}
            {section === "repositories" && <UserRepositoriesSection />}
            {section === "agents" && <UserAgentsSection />}
            {section === "notifications" && <UserNotificationsSection />}
            {section === "tricount" && <UserTricountSection />}
            {section === "friends" && <UserFriendsSection />}
            {section === "apps" && <UserAppsSection />}
            {section === "tasks" && <UserTasksSection />}
            {section === "finances" && <UserFinancesSection />}
            {section === "calendar" && <UserCalendarSection />}
            {section === "tables" && <UserTablesSection />}
            {(section === "settings-profile" ||
              section === "settings-security" ||
              section === "settings-session") && (
              <UserSettingsSection tab={section} onTabChange={setSection} />
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

// ── Icons ────────────────────────────────────────────────────────────────────

function IcoHome() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M2 7L8 2l6 5v7H10v-4H6v4H2z" />
    </svg>
  );
}
function IcoGit() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <circle cx="4" cy="4" r="1.5" />
      <circle cx="12" cy="4" r="1.5" />
      <circle cx="4" cy="12" r="1.5" />
      <path d="M4 5.5v5M5.5 4h5M12 5.5v1a3 3 0 01-3 3H8" />
    </svg>
  );
}
function IcoBot() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <rect height="9" rx="2" width="13" x="1.5" y="4.5" />
      <path d="M5.5 10.5h.01M10.5 10.5h.01M8 1.5v3M6 8h4" />
    </svg>
  );
}
function IcoBell() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M8 1.5a4.5 4.5 0 014.5 4.5v3l1 1.5H2.5L3.5 9V6A4.5 4.5 0 018 1.5zM6.5 11.5a1.5 1.5 0 003 0" />
    </svg>
  );
}
function IcoMoney() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <rect height="9" rx="1.5" width="14" x="1" y="4" />
      <path d="M1 7h14M5 10.5h.01M8 10.5h2" />
    </svg>
  );
}
function IcoUser() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <circle cx="8" cy="5" r="3" />
      <path d="M2 14a6 6 0 0112 0" />
    </svg>
  );
}
function IcoLock() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <rect height="7" rx="1.5" width="10" x="3" y="7.5" />
      <path d="M5 7.5V5a3 3 0 016 0v2.5M8 10.5v2" />
    </svg>
  );
}
function IcoSession() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M10 8H2m0 0l3-3M2 8l3 3" />
      <path d="M6 4.5A6 6 0 1114 8" />
    </svg>
  );
}
function IcoFriends() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <circle cx="6" cy="5" r="2.5" />
      <path d="M1 14c0-2.5 2-4 5-4s5 1.5 5 4" />
      <path d="M13 8a2.5 2.5 0 000-5M15 14c0-2-1-3.5-2-4" />
    </svg>
  );
}
function IcoCalendar() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <rect height="11" rx="1.5" width="13" x="1.5" y="3" />
      <path d="M1.5 6.5h13M5 1.5v3M11 1.5v3" />
      <path d="M5 9h.01M8 9h.01M11 9h.01M5 11.5h.01M8 11.5h.01" />
    </svg>
  );
}
function IcoTable() {
  return (
    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 16 16">
      <rect x="1.5" y="1.5" width="13" height="13" rx="1.5" />
      <path d="M1.5 5.5h13M5.5 1.5v13M10.5 1.5v13" />
    </svg>
  );
}
function IcoChart() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M1 14h14M3 11l3-4 3 2 5-6" />
      <circle cx="3" cy="11" r="1" />
      <circle cx="6" cy="7" r="1" />
      <circle cx="9" cy="9" r="1" />
      <circle cx="14" cy="5" r="1" />
    </svg>
  );
}
function IcoTasks() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <rect x="1.5" y="1.5" width="13" height="3.5" rx="1" />
      <rect x="1.5" y="6.5" width="13" height="3.5" rx="1" />
      <rect x="1.5" y="11.5" width="13" height="3.5" rx="1" />
      <path d="M4 3.5h8M4 8.5h8M4 13.5h8" />
    </svg>
  );
}
function IcoApps() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <rect height="5" rx="1" width="5" x="1.5" y="1.5" />
      <rect height="5" rx="1" width="5" x="9.5" y="1.5" />
      <rect height="5" rx="1" width="5" x="1.5" y="9.5" />
      <rect height="5" rx="1" width="5" x="9.5" y="9.5" />
    </svg>
  );
}
