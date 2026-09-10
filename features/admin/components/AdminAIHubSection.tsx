"use client";
import type { AIHubMCP, AIHubSkill, AIHubModel } from "@/types/aiHub";

import { useState, useEffect, useCallback } from "react";

import { useT } from "@/hooks/useT";
import { aiHubService } from "@/services/aiHubService";
import {
  AdminPageHeader,
  AdminStatGrid,
  AdminStat,
  AdminPanel,
  AdminEmptyState,
  AdminLoadingSkeleton,
  AdminFilterChip,
} from "./AdminShell";

type Tab = "mcps" | "skills" | "models";

// ── SVG Icons ────────────────────────────────────────────────────────────────

function IconMCP({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24">
      <path d="M7 8l-4 4 4 4" />
      <path d="M17 8l4 4-4 4" />
      <path d="M14 4l-4 16" />
    </svg>
  );
}

function IconSkills({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24">
      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}

function IconModel({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24">
      <path d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5m-4.75-11.396c.251.023.501.05.75.082M5 14.5l-1.43 1.43a2.25 2.25 0 000 3.18l1.81 1.81a2.25 2.25 0 003.18 0L10.5 19.5m-5.5-5h.008v.008H5v-.008zm14 0h.008v.008H19v-.008z" />
    </svg>
  );
}

function IconAll({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24">
      <path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  );
}

function IconDesign({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24">
      <path d="M4.25 7.5a3 3 0 00-3 3c0 1.06.67 2.15 1.86 2.77l.19.09c1.35.63 2.66 1.42 3.7 2.47a8.94 8.94 0 003.4 2.06c.16.07.32.14.48.2l.16.07a3 3 0 003.98-1.46l.9-2.02a3 3 0 00-.48-3.13 10.5 10.5 0 00-2.87-1.85l-.15-.07a3 3 0 00-2.11-.25l-.2.05-1.15.53a10.5 10.5 0 01-3.7-2.07A10.5 10.5 0 014.25 7.5z" />
      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function IconFrontend({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24">
      <path d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  );
}

function IconMobile({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24">
      <path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
  );
}

function IconBackend({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24">
      <path d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
    </svg>
  );
}

function IconDatabase({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24">
      <path d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  );
}

function IconTools({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24">
      <path d="M11.42 15.17l-5.384 5.384a2.025 2.025 0 01-2.864-2.864l5.384-5.384m2.864 2.864L17.5 9.5m-5.92 2.438l3.75 3.75m0 0l2.146 2.146M12 3v3m6.364 1.636l-.707.707M21 12h-3M4.22 12H1m16.78 6.78l-.707-.707M12 21v-3" />
    </svg>
  );
}

function IconPlugins({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24">
      <path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.556a4.5 4.5 0 00-6.364-6.364L4.757 8.25a4.5 4.5 0 006.364 6.364l4.5-4.5z" />
    </svg>
  );
}

function IconSearch({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24">
      <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function IconPlus({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

function IconEdit({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  );
}

function IconTrash({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  );
}

function IconStar({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
    </svg>
  );
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  all: <IconAll className="w-3 h-3" />,
  design: <IconDesign className="w-3 h-3" />,
  frontend: <IconFrontend className="w-3 h-3" />,
  mobile: <IconMobile className="w-3 h-3" />,
  backend: <IconBackend className="w-3 h-3" />,
  database: <IconDatabase className="w-3 h-3" />,
  tools: <IconTools className="w-3 h-3" />,
  plugins: <IconPlugins className="w-3 h-3" />,
};

const MCP_TYPES = [
  { value: "mcp", label: "MCP" },
  { value: "npm", label: "NPM" },
  { value: "hook", label: "HOOK" },
  { value: "custom", label: "CUSTOM" },
];

const STATUS_BADGE: Record<string, string> = {
  active: "admin-badge admin-badge-success",
  inactive: "admin-badge",
  error: "admin-badge admin-badge-warning",
  deprecated: "admin-badge admin-badge-warning",
};

const PROVIDER_BADGE: Record<string, string> = {
  openai: "admin-badge admin-badge-success",
  anthropic: "admin-badge admin-badge-warning",
  google: "admin-badge admin-badge-info",
  deepseek: "admin-badge admin-badge-info",
  local: "admin-badge",
};

const SKILL_CATEGORIES = [
  { key: "all", label: "All" },
  { key: "design", label: "Design" },
  { key: "frontend", label: "Frontend" },
  { key: "mobile", label: "Mobile" },
  { key: "backend", label: "Backend" },
  { key: "database", label: "Database" },
  { key: "tools", label: "Tools" },
  { key: "plugins", label: "Plugins" },
];

const SCOPE_LABELS: Record<string, string> = {
  global: "Global",
  claude: "Claude",
  root: "Root",
  web: "Web App",
  mobile: "Mobile",
  backend: "Backend",
};

const emptyMCP = {
  name: "",
  description: "",
  type: "mcp",
  status: "active",
  details: "",
  icon: "",
};
const emptySkill = {
  name: "",
  description: "",
  category: "tools",
  files: [] as { path: string; scope: string }[],
};
const emptyModel = {
  name: "",
  provider: "openai",
  model_id: "",
  type: "cloud",
  status: "active",
  capabilities: [] as string[],
  context_window: 0,
  pricing_input: 0,
  pricing_output: 0,
  is_default: false,
};

// ── Component ────────────────────────────────────────────────────────────────

export function AdminAIHubSection() {
  const { t } = useT();
  const [tab, setTab] = useState<Tab>("mcps");
  const [mcps, setMCPs] = useState<AIHubMCP[]>([]);
  const [skills, setSkills] = useState<AIHubSkill[]>([]);
  const [models, setModels] = useState<AIHubModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [form, setForm] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [m, s, mo] = await Promise.all([
        aiHubService.listMCPs(),
        aiHubService.listSkills(),
        aiHubService.listModels(),
      ]);
      setMCPs(m);
      setSkills(s);
      setModels(mo);
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setEditItem(null);
    if (tab === "mcps") setForm({ ...emptyMCP });
    else if (tab === "skills") setForm({ ...emptySkill });
    else setForm({ ...emptyModel });
    setFormOpen(true);
  };

  const openEdit = (item: any) => {
    setEditItem(item);
    setForm({ ...item });
    setFormOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (tab === "mcps") {
        if (editItem) await aiHubService.updateMCP(editItem.id, form);
        else await aiHubService.createMCP(form);
      } else if (tab === "skills") {
        if (editItem) await aiHubService.updateSkill(editItem.id, form);
        else await aiHubService.createSkill(form);
      } else {
        if (editItem) await aiHubService.updateModel(editItem.id, form);
        else await aiHubService.createModel(form);
      }
      setFormOpen(false);
      load();
    } catch {}
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    try {
      if (tab === "mcps") await aiHubService.deleteMCP(id);
      else if (tab === "skills") await aiHubService.deleteSkill(id);
      else await aiHubService.deleteModel(id);
      setDeletingId(null);
      load();
    } catch {}
  };

  const filteredMCPs = mcps.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.description?.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredSkills = skills.filter(
    (s) =>
      (catFilter === "all" || s.category === catFilter) &&
      (s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description?.toLowerCase().includes(search.toLowerCase())),
  );

  const filteredModels = models.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.provider.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="AI Hub"
        description={`${mcps.length} MCPs · ${skills.length} Skills · ${models.length} Modelos`}
        actions={
          <button className="ds-btn-primary" type="button" onClick={openCreate}>
            <IconPlus className="w-3.5 h-3.5" />
            Añadir
          </button>
        }
      />

      {/* Stats */}
      <AdminStatGrid cols={3}>
        <AdminStat label="MCPs" value={mcps.length} accent />
        <AdminStat label="Skills" value={skills.length} />
        <AdminStat label="Modelos" value={models.length} />
      </AdminStatGrid>

      {/* Tabs */}
      <div className="admin-tabs">
        {([
          { id: "mcps" as const, label: "MCPs", icon: <IconMCP className="w-3.5 h-3.5" /> },
          { id: "skills" as const, label: "Skills", icon: <IconSkills className="w-3.5 h-3.5" /> },
          { id: "models" as const, label: "Modelos", icon: <IconModel className="w-3.5 h-3.5" /> },
        ]).map((t) => (
          <button
            key={t.id}
            className={`admin-tab ${tab === t.id ? "admin-tab-active" : ""}`}
            type="button"
            onClick={() => {
              setTab(t.id);
              setSearch("");
              setCatFilter("all");
            }}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
        <input
          className="ds-input pl-10"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category filter (skills tab only) */}
      {tab === "skills" && (
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
          {SKILL_CATEGORIES.map((c) => (
            <AdminFilterChip
              key={c.key}
              active={catFilter === c.key}
              onClick={() => setCatFilter(c.key)}
            >
              {CATEGORY_ICONS[c.key]}
              {c.label}
            </AdminFilterChip>
          ))}
        </div>
      )}

      {/* Content */}
      {loading ? (
        <AdminLoadingSkeleton rows={4} />
      ) : (
        <>
          {/* MCPs Tab */}
          {tab === "mcps" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredMCPs.map((mcp) => (
                <AdminPanel key={mcp.id} compact>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded admin-badge ${MCP_TYPES.find((t) => t.value === mcp.type) ? "admin-badge-info" : ""}`}>
                        {mcp.type.toUpperCase()}
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${STATUS_BADGE[mcp.status] ?? "admin-badge"}`}>
                        {mcp.status}
                      </span>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="ds-btn-icon" type="button" onClick={() => openEdit(mcp)}>
                        <IconEdit />
                      </button>
                      <button className="ds-btn-icon ds-btn-danger" type="button" onClick={() => setDeletingId(deletingId === mcp.id ? null : mcp.id)}>
                        <IconTrash />
                      </button>
                      {deletingId === mcp.id && (
                        <div className="flex items-center gap-1">
                          <button className="ds-btn-danger text-[10px] px-2 py-1" type="button" onClick={() => handleDelete(mcp.id)}>
                            Sí
                          </button>
                          <button className="ds-btn-ghost text-[10px] px-2 py-1" type="button" onClick={() => setDeletingId(null)}>
                            No
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                    {mcp.name}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-2">
                    {mcp.description}
                  </p>
                  {mcp.details && (
                    <p className="text-[10px] font-mono text-[var(--text-muted)]">
                      {mcp.details}
                    </p>
                  )}
                </AdminPanel>
              ))}
            </div>
          )}

          {/* Skills Tab */}
          {tab === "skills" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredSkills.map((skill) => (
                <AdminPanel key={skill.id} compact>
                  <div className="flex items-start justify-between mb-2">
                    <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full admin-badge admin-badge-info">
                      {CATEGORY_ICONS[skill.category]}
                      {skill.category}
                    </span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="ds-btn-icon" type="button" onClick={() => openEdit(skill)}>
                        <IconEdit />
                      </button>
                      <button className="ds-btn-icon ds-btn-danger" type="button" onClick={() => setDeletingId(deletingId === skill.id ? null : skill.id)}>
                        <IconTrash />
                      </button>
                      {deletingId === skill.id && (
                        <div className="flex items-center gap-1">
                          <button className="ds-btn-danger text-[10px] px-2 py-1" type="button" onClick={() => handleDelete(skill.id)}>
                            Sí
                          </button>
                          <button className="ds-btn-ghost text-[10px] px-2 py-1" type="button" onClick={() => setDeletingId(null)}>
                            No
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-2">
                    {skill.description}
                  </p>
                  {skill.files.length > 0 && (
                    <div className="flex flex-col gap-0.5">
                      {skill.files.map((f, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--text-muted)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                          <span className="truncate">{f.path}</span>
                          <span className="shrink-0 text-[9px] px-1 py-0.5 rounded bg-[var(--bg-hover)]">
                            {SCOPE_LABELS[f.scope] ?? f.scope}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </AdminPanel>
              ))}
            </div>
          )}

          {/* Models Tab */}
          {tab === "models" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredModels.map((model) => (
                <AdminPanel key={model.id} compact>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${PROVIDER_BADGE[model.provider] ?? "admin-badge"}`}>
                        {model.provider}
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${STATUS_BADGE[model.status] ?? "admin-badge"}`}>
                        {model.status}
                      </span>
                      {model.is_default && (
                        <span className="flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded admin-badge admin-badge-warning">
                          <IconStar className="w-2.5 h-2.5" />
                          Default
                        </span>
                      )}
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="ds-btn-icon" type="button" onClick={() => openEdit(model)}>
                        <IconEdit />
                      </button>
                      <button className="ds-btn-icon ds-btn-danger" type="button" onClick={() => setDeletingId(deletingId === model.id ? null : model.id)}>
                        <IconTrash />
                      </button>
                      {deletingId === model.id && (
                        <div className="flex items-center gap-1">
                          <button className="ds-btn-danger text-[10px] px-2 py-1" type="button" onClick={() => handleDelete(model.id)}>
                            Sí
                          </button>
                          <button className="ds-btn-ghost text-[10px] px-2 py-1" type="button" onClick={() => setDeletingId(null)}>
                            No
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                    {model.name}
                  </h3>
                  {model.model_id && (
                    <p className="text-[10px] font-mono text-[var(--text-muted)] mb-2">
                      {model.model_id}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {model.capabilities.map((cap) => (
                      <span key={cap} className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-[var(--bg-hover)] text-[var(--text-secondary)]">
                        {cap}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-[var(--text-muted)]">
                    {model.context_window && (
                      <span>{(model.context_window / 1000).toFixed(0)}K ctx</span>
                    )}
                    {model.pricing_input != null && (
                      <span>${model.pricing_input}/1M in</span>
                    )}
                    {model.pricing_output != null && (
                      <span>${model.pricing_output}/1M out</span>
                    )}
                  </div>
                </AdminPanel>
              ))}
            </div>
          )}
        </>
      )}

      {/* Empty state */}
      {!loading &&
        ((tab === "mcps" && filteredMCPs.length === 0) ||
          (tab === "skills" && filteredSkills.length === 0) ||
          (tab === "models" && filteredModels.length === 0)) && (
          <AdminEmptyState title="No hay elementos" />
        )}

      {/* Form Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-[var(--bg-card)] rounded-2xl border border-[var(--border-default)] shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">
                {editItem ? "Editar" : "Crear"}{" "}
                {tab === "mcps" ? "MCP" : tab === "skills" ? "Skill" : "Modelo"}
              </h3>

              {tab === "mcps" && (
                <>
                  <Field label="Nombre" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                  <Field label="Descripción" value={form.description ?? ""} onChange={(v) => setForm({ ...form, description: v })} />
                  <SelectField label="Tipo" options={MCP_TYPES.map((t) => ({ value: t.value, label: t.label }))} value={form.type} onChange={(v) => setForm({ ...form, type: v })} />
                  <SelectField label="Estado" options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }, { value: "error", label: "Error" }]} value={form.status} onChange={(v) => setForm({ ...form, status: v })} />
                  <Field label="Detalles" value={form.details ?? ""} onChange={(v) => setForm({ ...form, details: v })} />
                </>
              )}

              {tab === "skills" && (
                <>
                  <Field label="Nombre" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                  <Field label="Descripción" value={form.description ?? ""} onChange={(v) => setForm({ ...form, description: v })} />
                  <SelectField label="Categoría" options={SKILL_CATEGORIES.filter((c) => c.key !== "all").map((c) => ({ value: c.key, label: c.label }))} value={form.category} onChange={(v) => setForm({ ...form, category: v })} />
                </>
              )}

              {tab === "models" && (
                <>
                  <Field label="Nombre" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                  <Field label="Provider" value={form.provider} onChange={(v) => setForm({ ...form, provider: v })} />
                  <Field label="Model ID" value={form.model_id ?? ""} onChange={(v) => setForm({ ...form, model_id: v })} />
                  <SelectField label="Tipo" options={[{ value: "cloud", label: "Cloud" }, { value: "local", label: "Local" }, { value: "hybrid", label: "Hybrid" }]} value={form.type} onChange={(v) => setForm({ ...form, type: v })} />
                  <SelectField label="Estado" options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }, { value: "deprecated", label: "Deprecated" }]} value={form.status} onChange={(v) => setForm({ ...form, status: v })} />
                  <Field label="Context Window" value={String(form.context_window ?? 0)} onChange={(v) => setForm({ ...form, context_window: parseInt(v) || 0 })} />
                  <Field label="Precio Input ($/1M)" value={String(form.pricing_input ?? 0)} onChange={(v) => setForm({ ...form, pricing_input: parseFloat(v) || 0 })} />
                  <Field label="Precio Output ($/1M)" value={String(form.pricing_output ?? 0)} onChange={(v) => setForm({ ...form, pricing_output: parseFloat(v) || 0 })} />
                  <label className="flex items-center gap-2 text-sm text-[var(--text-primary)]">
                    <input checked={form.is_default ?? false} className="rounded" type="checkbox" onChange={(e) => setForm({ ...form, is_default: e.target.checked })} />
                    Modelo por defecto
                  </label>
                </>
              )}
            </div>

            <div className="px-6 pb-5 flex items-center justify-between">
              <button className="ds-btn-ghost" type="button" onClick={() => setFormOpen(false)}>
                Cancelar
              </button>
              <button
                className={saving || !form.name ? "ds-btn-secondary opacity-50 cursor-not-allowed" : "ds-btn-primary"}
                disabled={saving || !form.name}
                type="button"
                onClick={handleSave}
              >
                {saving ? "..." : editItem ? "Guardar" : "Crear"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Form helpers ─────────────────────────────────────────────────────────────

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
        {label}
      </label>
      <input className="ds-input" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
        {label}
      </label>
      <select className="ds-input" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
