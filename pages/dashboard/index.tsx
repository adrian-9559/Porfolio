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
import {
  IconHome,
  IconGit,
  IconBot,
  IconBell,
  IconMoney,
  IconUser,
  IconMenu,
} from "@/components/ui/Icons";

type Section =
  | "home"
  | "repositories"
  | "agents"
  | "notifications"
  | "tricount"
  | "settings-profile"
  | "finances"
  | "friends"
  | "apps"
  | "tasks"
  | "calendar"
  | "tables";

const SECTION_ICONS: Record<string, React.ReactNode> = {
  home: <IconHome />,
  repositories: <IconGit />,
  agents: <IconBot />,
  notifications: <IconBell />,
  tricount: <IconMoney />,
  "settings-profile": <IconUser />,
};

function navItems(
  t: (k: string) => string,
): { id: Section; label: string; group: string }[] {
  return [
    { id: "home", label: t("dashboard.sidebarInicio"), group: "general" },
    {
      id: "repositories",
      label: t("dashboard.sidebarRepos"),
      group: "herramientas",
    },
    {
      id: "agents",
      label: t("dashboard.sidebarAgents"),
      group: "herramientas",
    },
    {
      id: "notifications",
      label: t("dashboard.sidebarNotifications"),
      group: "herramientas",
    },
    {
      id: "tricount",
      label: t("dashboard.sidebarTricount"),
      group: "herramientas",
    },
    {
      id: "settings-profile",
      label: t("dashboard.sidebarProfile"),
      group: "configuracion",
    },
  ];
}

function groups(t: (k: string) => string) {
  return [
    { id: "general", label: t("dashboard.sidebarGeneral") },
    { id: "herramientas", label: t("dashboard.sidebarTools") },
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

  useEffect(() => {
    const q = router.query.section;

    if (typeof q === "string" && NAV.some((n) => n.id === q)) {
      setSection(q as Section);
    }
  }, [router.query.section]);

  if (loadingAuth || !isAuthenticated) {
    return (
      <DefaultLayout>
        <div className="flex justify-center py-20">
          <div className="ds-spinner" />
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
              <span className="ds-badge ds-badge-success">
                {t("dashboard.sidebarName")}
              </span>
            </div>
            <h1
              className="text-2xl font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {t("dashboard.title")}
            </h1>
            <p
              className="text-sm mt-1"
              style={{ color: "var(--text-secondary)" }}
            >
              {t("dashboard.subtitle")}
            </p>
          </div>
          <button
            aria-label="Toggle menu"
            className="ds-btn-icon md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <IconMenu className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-6 relative">
          {/* Sidebar */}
          <aside
            className={`${mobileOpen ? "block" : "hidden"} sm:block w-52 shrink-0`}
          >
            <nav className="flex flex-col gap-0.5 sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto pb-4 sidebar-scroll">
              {GROUPS.map((g) => {
                const items = NAV.filter((n) => n.group === g.id);

                return (
                  <div key={g.id} className="mb-3">
                    <p
                      className="text-[10px] font-semibold uppercase tracking-wider px-3 mb-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {g.label}
                    </p>
                    {items.map((item) => (
                      <button
                        key={item.id}
                        className={`ds-sidebar-item ${section === item.id ? "ds-sidebar-item-active" : ""}`}
                        onClick={() => {
                          setSection(item.id);
                          setMobileOpen(false);
                        }}
                      >
                        <span className="w-4 h-4 shrink-0">
                          {SECTION_ICONS[item.id]}
                        </span>
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
            {section === "settings-profile" && <UserSettingsSection />}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
