import { useState } from "react";

import DefaultLayout from "@/layouts/default";
import { useRequireAdmin } from "@/hooks/useRequireAuth";
import { useT } from "@/hooks/useT";
import { AdminDashboard } from "@/features/admin/components/AdminDashboard";
import { AdminUsers } from "@/features/admin/components/AdminUsersSection";
import { AdminRoles } from "@/features/admin/components/AdminRolesSection";
import { AdminNotificationsSection } from "@/features/admin/components/AdminNotificationsSection";
import { AdminContactSection } from "@/features/admin/components/AdminContactSection";
import { AdminBlogSection } from "@/features/admin/components/AdminBlogSection";
import { AdminRepositoriesSection } from "@/features/admin/components/AdminRepositoriesSection";
import { AdminSkillsSection } from "@/features/admin/components/AdminSkillsSection";
import { AdminToolsHealthSection } from "@/features/admin/components/AdminToolsHealthSection";
import { AdminIssuesSection } from "@/features/admin/components/AdminIssuesSection";
import {
  IconDashboard,
  IconUsers,
  IconShield,
  IconBlog,
  IconBell,
  IconMail,
  IconGit,
  IconIssues,
  IconSkills,
  IconServices,
  IconMenu,
} from "@/components/ui/Icons";

type Section =
  | "dashboard"
  | "users"
  | "roles"
  | "blog"
  | "notifications"
  | "contact"
  | "repositories"
  | "issues"
  | "skills"
  | "services";

const NAV_ITEMS: {
  id: Section;
  labelKey: string;
  icon: React.ReactNode;
  group: string;
}[] = [
  {
    id: "dashboard",
    labelKey: "admin.dashboard",
    icon: <IconDashboard />,
    group: "general",
  },
  {
    id: "users",
    labelKey: "admin.users",
    icon: <IconUsers />,
    group: "general",
  },
  {
    id: "roles",
    labelKey: "admin.roles",
    icon: <IconShield />,
    group: "general",
  },
  {
    id: "blog",
    labelKey: "admin.blog",
    icon: <IconBlog />,
    group: "contenido",
  },
  {
    id: "notifications",
    labelKey: "admin.notifications",
    icon: <IconBell />,
    group: "comunicacion",
  },
  {
    id: "contact",
    labelKey: "admin.messages",
    icon: <IconMail />,
    group: "comunicacion",
  },
  {
    id: "repositories",
    labelKey: "admin.repositories",
    icon: <IconGit />,
    group: "herramientas",
  },
  {
    id: "issues",
    labelKey: "admin.issues",
    icon: <IconIssues />,
    group: "herramientas",
  },
  {
    id: "skills",
    labelKey: "admin.skills",
    icon: <IconSkills />,
    group: "sistema",
  },
  {
    id: "services",
    labelKey: "admin.services",
    icon: <IconServices />,
    group: "sistema",
  },
];

const GROUPS = [
  { id: "general", labelKey: "admin.groupGeneral" },
  { id: "contenido", labelKey: "admin.groupContent" },
  { id: "comunicacion", labelKey: "admin.groupComms" },
  { id: "herramientas", labelKey: "admin.groupTools" },
  { id: "sistema", labelKey: "admin.groupSystem" },
];

const NAV_LABELS: Record<string, string> = {
  dashboard: "admin.dashboard",
  users: "admin.users",
  roles: "admin.roles",
  blog: "admin.blog",
  notifications: "admin.notifications",
  contact: "admin.messages",
  repositories: "admin.repositories",
  issues: "admin.issues",
  skills: "admin.skills",
  services: "admin.services",
};

export default function AdminPage() {
  const { isAdmin, loadingAuth } = useRequireAdmin();
  const { t } = useT();
  const [section, setSection] = useState<Section>("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  if (loadingAuth || !isAdmin) {
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
              <span className="ds-badge ds-badge-info">
                {t("admin.adminBadge")}
              </span>
            </div>
            <h1
              className="text-2xl font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {t("admin.panel")}
            </h1>
            <p
              className="text-sm mt-1"
              style={{ color: "var(--text-secondary)" }}
            >
              {t("admin.subtitle")}
            </p>
          </div>
          <button
            aria-label="Toggle menu"
            className="ds-btn-icon sm:hidden"
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
            <nav className="flex flex-col gap-0.5 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pb-4 sidebar-scroll">
              {GROUPS.map((g) => {
                const items = NAV_ITEMS.filter((n) => n.group === g.id);

                return (
                  <div key={g.id} className="mb-3">
                    <p
                      className="text-[10px] font-semibold uppercase tracking-wider px-3 mb-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {t(GROUP_LABELS[g.id] ?? g.id)}
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
            {section === "dashboard" && (
              <AdminDashboard onNavigate={(s) => setSection(s as Section)} />
            )}
            {section === "users" && <AdminUsers />}
            {section === "roles" && <AdminRoles />}
            {section === "blog" && <AdminBlogSection />}
            {section === "notifications" && <AdminNotificationsSection />}
            {section === "contact" && <AdminContactSection />}
            {section === "repositories" && <AdminRepositoriesSection />}
            {section === "issues" && <AdminIssuesSection />}
            {section === "skills" && <AdminSkillsSection />}
            {section === "services" && <AdminToolsHealthSection />}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

const GROUP_LABELS: Record<string, string> = {
  general: "admin.groupGeneral",
  contenido: "admin.groupContent",
  comunicacion: "admin.groupComms",
  herramientas: "admin.groupTools",
  proyectos: "admin.groupProjects",
  sistema: "admin.groupSystem",
};
