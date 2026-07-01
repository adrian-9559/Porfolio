import { useState } from "react";

import DefaultLayout from "@/layouts/default";
import { useRequireAdmin } from "@/hooks/useRequireAuth";
import { useT } from "@/hooks/useT";
import { AdminDashboard } from "@/features/admin/components/AdminDashboard";
import { AdminUsers } from "@/features/admin/components/AdminUsersSection";
import { AdminRoles } from "@/features/admin/components/AdminRolesSection";
import { AdminNotificationsSection } from "@/features/admin/components/AdminNotificationsSection";
import { AdminContactSection } from "@/features/admin/components/AdminContactSection";
import { AdminApiKeysSection } from "@/features/admin/components/AdminApiKeysSection";
import { AdminBlogSection } from "@/features/admin/components/AdminBlogSection";
import { AdminLogsSection } from "@/features/admin/components/AdminLogsSection";
import { AdminDocsSection } from "@/features/admin/components/AdminDocsSection";
import { AdminRepositoriesSection } from "@/features/admin/components/AdminRepositoriesSection";
import AdminTaxonomySection from "@/features/admin/components/AdminTaxonomySection";
import { AdminFriendshipsSection } from "@/features/admin/components/AdminFriendshipsSection";
import { AdminAppsSection } from "@/features/admin/components/AdminAppsSection";
import { AdminSkillsSection } from "@/features/admin/components/AdminSkillsSection";

type Section =
  | "dashboard"
  | "users"
  | "roles"
  | "api-keys"
  | "blog"
  | "notifications"
  | "contact"
  | "repositories"
  | "taxonomy"
  | "friendships"
  | "apps"
  | "skills"
  | "logs"
  | "docs";

const NAV_LABELS: Record<string, string> = {
  dashboard: "admin.dashboard",
  users: "admin.users",
  roles: "admin.roles",
  "api-keys": "admin.apiKeys",
  blog: "admin.blog",
  taxonomy: "admin.taxonomy",
  notifications: "admin.notifications",
  contact: "admin.messages",
  repositories: "admin.repositories",
  friendships: "admin.friendships",
  apps: "admin.apps",
  skills: "admin.skills",
  logs: "admin.logs",
  docs: "admin.docs",
};

const GROUP_LABELS: Record<string, string> = {
  general: "admin.groupGeneral",
  contenido: "admin.groupContent",
  comunicacion: "admin.groupComms",
  herramientas: "admin.groupTools",
  sistema: "admin.groupSystem",
};

const NAV: {
  id: Section;
  labelKey: string;
  icon: React.ReactNode;
  group?: string;
}[] = [
  {
    id: "dashboard",
    labelKey: "dashboard",
    icon: <IcoDashboard />,
    group: "general",
  },
  { id: "users", labelKey: "users", icon: <IcoUsers />, group: "general" },
  { id: "roles", labelKey: "roles", icon: <IcoRoles />, group: "general" },
  { id: "api-keys", labelKey: "api-keys", icon: <IcoKey />, group: "general" },
  { id: "blog", labelKey: "blog", icon: <IcoBlog />, group: "contenido" },
  {
    id: "taxonomy",
    labelKey: "taxonomy",
    icon: <IcoTaxonomy />,
    group: "contenido",
  },
  {
    id: "notifications",
    labelKey: "notifications",
    icon: <IcoBell />,
    group: "comunicacion",
  },
  {
    id: "contact",
    labelKey: "contact",
    icon: <IcoMail />,
    group: "comunicacion",
  },
  {
    id: "repositories",
    labelKey: "repositories",
    icon: <IcoGit />,
    group: "herramientas",
  },
  {
    id: "friendships",
    labelKey: "friendships",
    icon: <IcoFriendships />,
    group: "herramientas",
  },
  {
    id: "apps",
    labelKey: "apps",
    icon: <IcoApps />,
    group: "herramientas",
  },
  { id: "skills", labelKey: "skills", icon: <IcoSkills />, group: "sistema" },
  { id: "logs", labelKey: "logs", icon: <IcoLogs />, group: "sistema" },
  { id: "docs", labelKey: "docs", icon: <IcoDocs />, group: "sistema" },
];

const GROUPS = [
  { id: "general", labelKey: "general" },
  { id: "contenido", labelKey: "contenido" },
  { id: "comunicacion", labelKey: "comunicacion" },
  { id: "herramientas", labelKey: "herramientas" },
  { id: "sistema", labelKey: "sistema" },
];

export default function AdminPage() {
  const { isAdmin, loadingAuth } = useRequireAdmin();
  const { t } = useT();
  const [section, setSection] = useState<Section>("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  if (loadingAuth || !isAdmin) {
    return (
      <DefaultLayout>
        <div className="flex justify-center py-20">
          <div className="w-5 h-5 rounded-full border-2 border-blue-600/30 border-t-blue-600 animate-spin" />
        </div>
      </DefaultLayout>
    );
  }

  const currentNav = NAV.find((n) => n.id === section);

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-medium">
                {t("admin.adminBadge")}
              </span>
            </div>
            <h1 className="text-2xl font-semibold text-[#1d1d1f] dark:text-white">
              {t("admin.panel")}
            </h1>
            <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-1">
              {t("admin.subtitle")}
            </p>
          </div>
          {/* Mobile menu toggle */}
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
            <nav className="flex flex-col gap-0.5 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pb-4">
              {GROUPS.map((g) => {
                const items = NAV.filter((n) => n.group === g.id);

                return (
                  <div key={g.id} className="mb-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] px-3 mb-1">
                      {t(GROUP_LABELS[g.id] ?? g.id)}
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
                        {t(NAV_LABELS[item.id] ?? item.id)}
                      </button>
                    ))}
                  </div>
                );
              })}
            </nav>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {section === "dashboard" && <AdminDashboard />}
            {section === "users" && <AdminUsers />}
            {section === "roles" && <AdminRoles />}
            {section === "api-keys" && <AdminApiKeysSection />}
            {section === "blog" && <AdminBlogSection />}
            {section === "notifications" && <AdminNotificationsSection />}
            {section === "contact" && <AdminContactSection />}
            {section === "repositories" && <AdminRepositoriesSection />}
            {section === "taxonomy" && <AdminTaxonomySection />}
            {section === "friendships" && <AdminFriendshipsSection />}
            {section === "apps" && <AdminAppsSection />}
            {section === "skills" && <AdminSkillsSection />}
            {section === "logs" && <AdminLogsSection />}
            {section === "docs" && <AdminDocsSection />}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

// ── Icons ──────────────────────────────────────────────────────────────────────

function IcoDashboard() {
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
function IcoUsers() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <circle cx="6" cy="5" r="2.5" />
      <path d="M1 13c0-2.5 2-4 5-4s5 1.5 5 4" />
      <path d="M12 7.5c1.5.5 2.5 1.5 2.5 3.5M10 3a2.5 2.5 0 010 4" />
    </svg>
  );
}
function IcoRoles() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M8 1.5L2 4v3c0 3 2.5 5.5 6 6.5 3.5-1 6-3.5 6-6.5V4L8 1.5z" />
    </svg>
  );
}
function IcoKey() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <circle cx="6" cy="6" r="3.5" />
      <path d="M9 9l5 5M12 12l1.5-1.5" />
    </svg>
  );
}
function IcoBlog() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <rect height="13" rx="2" width="13" x="1.5" y="1.5" />
      <path d="M4.5 5.5h7M4.5 8.5h5M4.5 11.5h3" />
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
      <path d="M8 2a4.5 4.5 0 014.5 4.5v3L14 11H2l1.5-1.5v-3A4.5 4.5 0 018 2zm-1.5 9h3" />
    </svg>
  );
}
function IcoMail() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <rect height="9" rx="1.5" width="14" x="1" y="3.5" />
      <path d="M1 3.5l7 5.5 7-5.5" />
    </svg>
  );
}
function IcoLogs() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M2 4h12M2 8h8M2 12h5" />
    </svg>
  );
}
function IcoSkills() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M4 3l2 3-2 3M12 3l-2 3 2 3M7 1.5l2 13M3 12l4 2 4-2" />
    </svg>
  );
}
function IcoDocs() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <rect height="13" rx="1.5" width="11" x="2.5" y="1.5" />
      <path d="M5.5 5.5h5M5.5 8.5h5M5.5 11.5h3" />
    </svg>
  );
}
function IcoGit() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <circle cx="4" cy="4" r="1.5" />
      <circle cx="4" cy="12" r="1.5" />
      <circle cx="12" cy="4" r="1.5" />
      <path d="M4 5.5v5M5.5 4h3.5a1.5 1.5 0 011.5 1.5v2" />
    </svg>
  );
}
function IcoTaxonomy() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M2 4h4M2 8h6M2 12h3" />
      <rect height="3" rx="1" width="7" x="7" y="2.5" />
      <rect height="3" rx="1" width="5" x="9" y="6.5" />
      <rect height="3" rx="1" width="8" x="6" y="10.5" />
    </svg>
  );
}
function IcoFriendships() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <circle cx="5" cy="5" r="2" />
      <circle cx="11" cy="5" r="2" />
      <path d="M1 14c0-2 1.5-3.5 4-3.5s4 1.5 4 3.5" />
      <path d="M9 12c.5-1.5 1.5-2.5 2-2.5s1.5 1 2 2.5" />
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
