import { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { useRequireAdmin } from "@/hooks/useRequireAuth";
import { AdminDashboard } from "@/features/admin/components/AdminDashboard";
import { AdminUsers } from "@/features/admin/components/AdminUsersSection";
import { AdminRoles } from "@/features/admin/components/AdminRolesSection";

import { AdminNotificationsSection } from "@/features/admin/components/AdminNotificationsSection";
import { AdminContactSection } from "@/features/admin/components/AdminContactSection";
import { AdminAgentsSection, AdminWorkflowsSection } from "@/features/admin/components/AdminAgentsSection";
import { AdminApiKeysSection } from "@/features/admin/components/AdminApiKeysSection";
import { AdminBlogSection } from "@/features/admin/components/AdminBlogSection";
import { AdminLogsSection } from "@/features/admin/components/AdminLogsSection";
import { AdminDocsSection } from "@/features/admin/components/AdminDocsSection";
import { AdminRepositoriesSection } from "@/features/admin/components/AdminRepositoriesSection";
import AdminTaxonomySection from "@/features/admin/components/AdminTaxonomySection";
import { AdminOrchestratorSection } from "@/features/admin/components/AdminOrchestratorSection";
import { AdminFriendshipsSection } from "@/features/admin/components/AdminFriendshipsSection";

type Section =
  | "dashboard" | "users" | "roles" | "api-keys"
  | "blog" | "agents" | "workflows" | "orchestrator"
  | "notifications" | "contact"
  | "repositories" | "taxonomy" | "friendships" | "logs" | "docs";

const NAV: { id: Section; label: string; icon: React.ReactNode; group?: string }[] = [
  { id: "dashboard",     label: "Dashboard",     icon: <IcoDashboard />, group: "general" },
  { id: "users",         label: "Usuarios",       icon: <IcoUsers />,     group: "general" },
  { id: "roles",         label: "Roles",          icon: <IcoRoles />,     group: "general" },
  { id: "api-keys",      label: "API Keys",       icon: <IcoKey />,       group: "general" },
  { id: "blog",          label: "Blog",           icon: <IcoBlog />,      group: "contenido" },
  { id: "taxonomy",      label: "Taxonomía",      icon: <IcoTaxonomy />,  group: "contenido" },
  { id: "agents",        label: "Agentes IA",     icon: <IcoBot />,         group: "ia" },
  { id: "workflows",     label: "Workflows",      icon: <IcoFlow />,        group: "ia" },
  { id: "orchestrator",  label: "Orquestador",    icon: <IcoOrchestrator />, group: "ia" },
  { id: "notifications",  label: "Notificaciones", icon: <IcoBell />,        group: "comunicacion" },
  { id: "contact",        label: "Mensajes",       icon: <IcoMail />,        group: "comunicacion" },
  { id: "repositories",   label: "Repositorios",   icon: <IcoGit />,         group: "herramientas" },
  { id: "friendships",    label: "Amistades",      icon: <IcoFriendships />, group: "herramientas" },
  { id: "logs",           label: "Logs",           icon: <IcoLogs />,        group: "sistema" },
  { id: "docs",           label: "Docs",           icon: <IcoDocs />,        group: "sistema" },
];

const GROUPS = [
  { id: "general",        label: "General" },
  { id: "contenido",      label: "Contenido" },
  { id: "ia",             label: "Inteligencia Artificial" },
  { id: "comunicacion",   label: "Comunicación" },
  { id: "herramientas",   label: "Herramientas" },
  { id: "sistema",        label: "Sistema" },
];

export default function AdminPage() {
  const { isAdmin, loadingAuth } = useRequireAdmin();
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
              <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-medium">Admin</span>
            </div>
            <h1 className="text-2xl font-semibold text-[#1d1d1f] dark:text-white">Panel de administración</h1>
            <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-1">Gestión completa de la plataforma</p>
          </div>
          {/* Mobile menu toggle */}
          <button onClick={() => setMobileOpen((v) => !v)}
            className="sm:hidden p-2 rounded-xl border border-black/12 dark:border-white/12 text-[#1d1d1f] dark:text-white">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M2 4.5h14M2 9h14M2 13.5h14" />
            </svg>
          </button>
        </div>

        <div className="flex gap-6 relative">
          {/* Sidebar */}
          <aside className={`${mobileOpen ? "block" : "hidden"} sm:block w-52 shrink-0`}>
            <nav className="flex flex-col gap-0.5 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pb-4">
              {GROUPS.map((g) => {
                const items = NAV.filter((n) => n.group === g.id);
                return (
                  <div key={g.id} className="mb-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] px-3 mb-1">{g.label}</p>
                    {items.map((item) => (
                      <button key={item.id} onClick={() => { setSection(item.id); setMobileOpen(false); }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all ${
                          section === item.id
                            ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
                            : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                        }`}>
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
            {section === "dashboard"     && <AdminDashboard />}
            {section === "users"         && <AdminUsers />}
            {section === "roles"         && <AdminRoles />}
            {section === "api-keys"      && <AdminApiKeysSection />}
            {section === "blog"          && <AdminBlogSection />}
            {section === "agents"        && <AdminAgentsSection />}
            {section === "workflows"     && <AdminWorkflowsSection />}
            {section === "orchestrator"  && <AdminOrchestratorSection />}
            {section === "notifications" && <AdminNotificationsSection />}
            {section === "contact"       && <AdminContactSection />}
            {section === "repositories"   && <AdminRepositoriesSection />}
            {section === "taxonomy"       && <AdminTaxonomySection />}
            {section === "friendships"    && <AdminFriendshipsSection />}
            {section === "logs"          && <AdminLogsSection />}
            {section === "docs"          && <AdminDocsSection />}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

// ── Icons ──────────────────────────────────────────────────────────────────────

function IcoDashboard() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="1.5" y="1.5" width="5" height="5" rx="1" /><rect x="9.5" y="1.5" width="5" height="5" rx="1" /><rect x="1.5" y="9.5" width="5" height="5" rx="1" /><rect x="9.5" y="9.5" width="5" height="5" rx="1" /></svg>;
}
function IcoUsers() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="6" cy="5" r="2.5" /><path d="M1 13c0-2.5 2-4 5-4s5 1.5 5 4" /><path d="M12 7.5c1.5.5 2.5 1.5 2.5 3.5M10 3a2.5 2.5 0 010 4" /></svg>;
}
function IcoRoles() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 1.5L2 4v3c0 3 2.5 5.5 6 6.5 3.5-1 6-3.5 6-6.5V4L8 1.5z" /></svg>;
}
function IcoKey() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="6" cy="6" r="3.5" /><path d="M9 9l5 5M12 12l1.5-1.5" /></svg>;
}
function IcoBlog() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="1.5" y="1.5" width="13" height="13" rx="2" /><path d="M4.5 5.5h7M4.5 8.5h5M4.5 11.5h3" /></svg>;
}
function IcoBot() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="1.5" y="4.5" width="13" height="9" rx="2" /><path d="M6 9.5h.01M10 9.5h.01M8 2v2.5" /><path d="M5.5 13.5v1M10.5 13.5v1" /></svg>;
}
function IcoFlow() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="3.5" cy="8" r="2" /><circle cx="12.5" cy="3.5" r="2" /><circle cx="12.5" cy="12.5" r="2" /><path d="M5.5 8h3l2.5-4M11 8H8.5l2.5 4.5" /></svg>;
}
function IcoBell() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M8 2a4.5 4.5 0 014.5 4.5v3L14 11H2l1.5-1.5v-3A4.5 4.5 0 018 2zm-1.5 9h3" /></svg>;
}
function IcoMail() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="1" y="3.5" width="14" height="9" rx="1.5" /><path d="M1 3.5l7 5.5 7-5.5" /></svg>;
}
function IcoLogs() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M2 4h12M2 8h8M2 12h5" /></svg>;
}
function IcoDocs() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2.5" y="1.5" width="11" height="13" rx="1.5" /><path d="M5.5 5.5h5M5.5 8.5h5M5.5 11.5h3" /></svg>;
}
function IcoOrchestrator() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="8" cy="3" r="1.5" /><circle cx="3" cy="13" r="1.5" /><circle cx="13" cy="13" r="1.5" /><path d="M8 4.5v3L4.5 11.5M8 7.5l3.5 4" /><path d="M8 7.5H4.5M8 7.5h3.5" /></svg>;
}
function IcoGit() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="4" cy="4" r="1.5" /><circle cx="4" cy="12" r="1.5" /><circle cx="12" cy="4" r="1.5" /><path d="M4 5.5v5M5.5 4h3.5a1.5 1.5 0 011.5 1.5v2" /></svg>;
}
function IcoTaxonomy() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M2 4h4M2 8h6M2 12h3" /><rect x="7" y="2.5" width="7" height="3" rx="1" /><rect x="9" y="6.5" width="5" height="3" rx="1" /><rect x="6" y="10.5" width="8" height="3" rx="1" /></svg>;
}
function IcoFriendships() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="5" cy="5" r="2" /><circle cx="11" cy="5" r="2" /><path d="M1 14c0-2 1.5-3.5 4-3.5s4 1.5 4 3.5" /><path d="M9 12c.5-1.5 1.5-2.5 2-2.5s1.5 1 2 2.5" /></svg>;
}
