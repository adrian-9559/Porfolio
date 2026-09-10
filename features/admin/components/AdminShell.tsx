"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

import { useT } from "@/hooks/useT";
import { ThemeSwitch } from "@/components/theme-switch";
import { LanguageSwitcher } from "@/components/language-switcher";
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
  IconLogs,
  IconFriendships,
  IconIdeas,
  IconTraffic,
  IconApps,
  IconKey,
  IconTaxonomy,
  IconAIHub,
  IconDocs,
  IconClose,
} from "@/components/ui/Icons";

export type AdminSection =
  | "dashboard"
  | "users"
  | "roles"
  | "blog"
  | "notifications"
  | "contact"
  | "repositories"
  | "issues"
  | "skills"
  | "services"
  | "logs"
  | "friendships"
  | "ideas"
  | "traffic"
  | "mobile-apps"
  | "apps"
  | "api-keys"
  | "taxonomy"
  | "ai-hub"
  | "docs";

interface NavItem {
  id: AdminSection;
  labelKey: string;
  icon: React.ReactNode;
  group: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", labelKey: "admin.dashboard", icon: <IconDashboard />, group: "general" },
  { id: "users", labelKey: "admin.users", icon: <IconUsers />, group: "general" },
  { id: "roles", labelKey: "admin.roles", icon: <IconShield />, group: "general" },
  { id: "blog", labelKey: "admin.blog", icon: <IconBlog />, group: "content" },
  { id: "taxonomy", labelKey: "admin.taxonomy", icon: <IconTaxonomy />, group: "content" },
  { id: "notifications", labelKey: "admin.notifications", icon: <IconBell />, group: "comms" },
  { id: "contact", labelKey: "admin.messages", icon: <IconMail />, group: "comms" },
  { id: "repositories", labelKey: "admin.repositories", icon: <IconGit />, group: "tools" },
  { id: "issues", labelKey: "admin.issues", icon: <IconIssues />, group: "tools" },
  { id: "ideas", labelKey: "admin.ideas", icon: <IconIdeas />, group: "tools" },
  { id: "traffic", labelKey: "admin.traffic", icon: <IconTraffic />, group: "analytics" },
  { id: "logs", labelKey: "admin.logs", icon: <IconLogs />, group: "analytics" },
  { id: "friendships", labelKey: "admin.friendships", icon: <IconFriendships />, group: "social" },
  { id: "skills", labelKey: "admin.skills", icon: <IconSkills />, group: "system" },
  { id: "ai-hub", labelKey: "admin.aiHub", icon: <IconAIHub />, group: "system" },
  { id: "services", labelKey: "admin.services", icon: <IconServices />, group: "system" },
  { id: "api-keys", labelKey: "admin.apiKeys", icon: <IconKey />, group: "system" },
  { id: "apps", labelKey: "admin.apps", icon: <IconApps />, group: "system" },
  { id: "mobile-apps", labelKey: "admin.mobileApps", icon: <IconApps />, group: "system" },
  { id: "docs", labelKey: "admin.docs", icon: <IconDocs />, group: "system" },
];

const GROUPS = [
  { id: "general", labelKey: "admin.groupGeneral" },
  { id: "content", labelKey: "admin.groupContent" },
  { id: "comms", labelKey: "admin.groupComms" },
  { id: "tools", labelKey: "admin.groupTools" },
  { id: "analytics", labelKey: "admin.groupAnalytics" },
  { id: "social", labelKey: "admin.groupSocial" },
  { id: "system", labelKey: "admin.groupSystem" },
];

const NAV_LABELS: Record<string, string> = {
  dashboard: "admin.dashboard",
  users: "admin.users",
  roles: "admin.roles",
  blog: "admin.blog",
  taxonomy: "admin.taxonomy",
  notifications: "admin.notifications",
  contact: "admin.messages",
  repositories: "admin.repositories",
  issues: "admin.issues",
  ideas: "admin.ideas",
  traffic: "admin.traffic",
  logs: "admin.logs",
  friendships: "admin.friendships",
  skills: "admin.skills",
  "ai-hub": "admin.aiHub",
  services: "admin.services",
  "api-keys": "admin.apiKeys",
  apps: "admin.apps",
  "mobile-apps": "admin.mobileApps",
  docs: "admin.docs",
};

const GROUP_LABELS: Record<string, string> = {
  general: "admin.groupGeneral",
  content: "admin.groupContent",
  comms: "admin.groupComms",
  tools: "admin.groupTools",
  analytics: "admin.groupAnalytics",
  social: "admin.groupSocial",
  system: "admin.groupSystem",
};

export function AdminShell({
  section,
  onNavigate,
  children,
}: {
  section: AdminSection;
  onNavigate: (section: AdminSection) => void;
  children: React.ReactNode;
}) {
  const { t } = useT();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = useCallback(
    (id: AdminSection) => {
      onNavigate(id);
      setMobileOpen(false);
    },
    [onNavigate],
  );

  return (
    <div className="admin-shell">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${mobileOpen ? "admin-sidebar-open" : ""}`}>
        {/* Brand */}
        <Link href="/admin" className="admin-sidebar-brand" onClick={() => handleNav("dashboard")}>
          <div className="admin-sidebar-brand-icon">A</div>
          <div>
            <div className="admin-sidebar-brand-text">Graphify</div>
            <div className="admin-sidebar-brand-sub">Admin</div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="admin-sidebar-nav">
          {GROUPS.map((g) => {
            const items = NAV_ITEMS.filter((n) => n.group === g.id);
            if (items.length === 0) return null;

            return (
              <div key={g.id} className="admin-sidebar-group">
                <div className="admin-sidebar-group-label">
                  {t(GROUP_LABELS[g.id] ?? g.id)}
                </div>
                {items.map((item) => (
                  <button
                    key={item.id}
                    className={`admin-sidebar-item ${section === item.id ? "admin-sidebar-item-active" : ""}`}
                    onClick={() => handleNav(item.id)}
                  >
                    <span className="admin-sidebar-item-icon">{item.icon}</span>
                    {t(NAV_LABELS[item.id] ?? item.id)}
                  </button>
                ))}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="admin-sidebar-footer">
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeSwitch />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div className="admin-header-inner">
            <div className="admin-header-left">
              <button
                className="ds-btn-icon md:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <IconMenu className="w-4 h-4" />
              </button>
              <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                {t("admin.panel")}
              </span>
            </div>
            <div className="admin-header-right">
              <Link
                href="/"
                className="text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                {t("nav.home")}
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="admin-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export function AdminPageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="admin-page-header">
      <div className="admin-page-header-row">
        <div>
          <h1 className="admin-page-title">{title}</h1>
          {description && <p className="admin-page-desc">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
    </div>
  );
}

export function AdminStatGrid({
  children,
  cols = 4,
}: {
  children: React.ReactNode;
  cols?: 2 | 3 | 4;
}) {
  return (
    <div className={`admin-stats-grid admin-stats-grid-${cols}`}>
      {children}
    </div>
  );
}

export function AdminStat({
  label,
  value,
  sub,
  accent = false,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className="admin-stat">
      {accent && <div className="admin-stat-accent" />}
      <div className="admin-stat-label">{label}</div>
      <div className="admin-stat-value">{value}</div>
      {sub && <div className="admin-stat-sub">{sub}</div>}
    </div>
  );
}

export function AdminPanel({
  title,
  actions,
  children,
  compact = false,
}: {
  title?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div className="admin-panel">
      {(title || actions) && (
        <div className="admin-panel-header">
          {title && <div className="admin-panel-title">{title}</div>}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className={compact ? "admin-panel-body-compact" : "admin-panel-body"}>
        {children}
      </div>
    </div>
  );
}

export function AdminEmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="admin-empty">
      {icon && <div className="admin-empty-icon">{icon}</div>}
      <div className="admin-empty-title">{title}</div>
      {description && <div className="admin-empty-desc">{description}</div>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function AdminLoadingSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="admin-skeleton h-12 w-full" />
      ))}
    </div>
  );
}

export function AdminFilterChip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      className={`admin-filter-chip ${active ? "admin-filter-chip-active" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
