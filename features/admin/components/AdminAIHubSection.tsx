"use client";
import type { AIHubMCP, AIHubSkill, AIHubModel } from "@/types/aiHub";

import { useState, useEffect, useCallback, useMemo } from "react";

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
import { SearchInput, Btn, Input } from "./AdminShared";

type Tab = "mcps" | "skills" | "models";

const MCP_TYPES = [
  { value: "mcp", label: "MCP" },
  { value: "npm", label: "NPM" },
  { value: "hook", label: "HOOK" },
  { value: "custom", label: "CUSTOM" },
];

const STATUS_COLORS: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-400",
  inactive: "bg-[var(--bg-hover)] text-[var(--text-muted)]",
  error: "bg-red-500/10 text-red-400",
  deprecated: "bg-amber-500/10 text-amber-400",
};

const PROVIDER_COLORS: Record<string, string> = {
  openai: "bg-emerald-500/10 text-emerald-400",
  anthropic: "bg-amber-500/10 text-amber-400",
  google: "bg-blue-500/10 text-blue-400",
  deepseek: "bg-cyan-500/10 text-cyan-400",
  local: "bg-[var(--bg-hover)] text-[var(--text-muted)]",
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

const CATEGORY_DOT_COLORS: Record<string, string> = {
  design: "#ec4899",
  frontend: "#3b82f6",
  mobile: "#f59e0b",
  backend: "#10b981",
  database: "#8b5cf6",
  tools: "#6b7280",
  plugins: "#6b7280",
};

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

  const filteredMCPs = useMemo(
    () =>
      mcps.filter(
        (m) =>
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.description?.toLowerCase().includes(search.toLowerCase()),
      ),
    [mcps, search],
  );

  const filteredSkills = useMemo(
    () =>
      skills.filter(
        (s) =>
          (catFilter === "all" || s.category === catFilter) &&
          (s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.description?.toLowerCase().includes(search.toLowerCase())),
      ),
    [skills, search, catFilter],
  );

  const filteredModels = useMemo(
    () =>
      models.filter(
        (m) =>
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.provider.toLowerCase().includes(search.toLowerCase()),
      ),
    [models, search],
  );

  const tabs = [
    { id: "mcps" as const, label: "MCPs", count: mcps.length },
    { id: "skills" as const, label: "Skills", count: skills.length },
    { id: "models" as const, label: "Models", count: models.length },
  ];

  const currentFiltered =
    tab === "mcps"
      ? filteredMCPs
      : tab === "skills"
        ? filteredSkills
        : filteredModels;

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="AI Hub"
        description={`${mcps.length} MCPs · ${skills.length} Skills · ${models.length} Models`}
        actions={
          <Btn onClick={openCreate}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            {t("admin.create")}
          </Btn>
        }
      />

      {/* Stats */}
      <AdminStatGrid cols={3}>
        <AdminStat label="MCPs" value={mcps.length} accent />
        <AdminStat label="Skills" value={skills.length} />
        <AdminStat label="Models" value={models.length} />
      </AdminStatGrid>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-[var(--bg-surface)] rounded-xl w-fit">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t.id
                ? "bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm border border-[var(--border-default)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            }`}
            type="button"
            onClick={() => {
              setTab(t.id);
              setSearch("");
              setCatFilter("all");
            }}
          >
            {t.label}
            <span className="text-[10px] font-mono opacity-50">{t.count}</span>
          </button>
        ))}
      </div>

      {/* Search + Category Filter */}
      <div className="flex flex-col gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder={t("admin.searchAgent")}
        />

        {tab === "skills" && (
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {SKILL_CATEGORIES.map((c) => (
              <AdminFilterChip
                key={c.key}
                active={catFilter === c.key}
                onClick={() => setCatFilter(c.key)}
              >
                {c.key !== "all" && (
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: CATEGORY_DOT_COLORS[c.key] ?? "var(--text-muted)" }}
                  />
                )}
                {c.label}
              </AdminFilterChip>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <AdminLoadingSkeleton rows={6} />
      ) : (
        <>
          {/* MCPs */}
          {tab === "mcps" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredMCPs.map((mcp) => (
                <AdminPanel key={mcp.id} compact>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[var(--accent-light)] text-[var(--accent)]">
                          {mcp.type.toUpperCase()}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${STATUS_COLORS[mcp.status] ?? "bg-[var(--bg-hover)] text-[var(--text-muted)]"}`}>
                          {mcp.status}
                        </span>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1 rounded hover:bg-[var(--bg-hover)]" type="button" onClick={() => openEdit(mcp)}>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                          </svg>
                        </button>
                        <button className="text-[var(--text-muted)] hover:text-red-400 transition-colors p-1 rounded hover:bg-red-500/10" type="button" onClick={() => setDeletingId(deletingId === mcp.id ? null : mcp.id)}>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {mcp.name}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                      {mcp.description}
                    </p>
                    {mcp.details && (
                      <p className="text-[10px] font-mono text-[var(--text-muted)]">
                        {mcp.details}
                      </p>
                    )}
                    {deletingId === mcp.id && (
                      <div className="flex items-center gap-2 mt-1">
                        <Btn variant="danger" size="sm" onClick={() => handleDelete(mcp.id)}>
                          {t("admin.delete")}
                        </Btn>
                        <Btn variant="ghost" size="sm" onClick={() => setDeletingId(null)}>
                          {t("admin.cancel")}
                        </Btn>
                      </div>
                    )}
                  </div>
                </AdminPanel>
              ))}
            </div>
          )}

          {/* Skills */}
          {tab === "skills" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredSkills.map((skill) => (
                <AdminPanel key={skill.id} compact>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ background: CATEGORY_DOT_COLORS[skill.category] ?? "var(--text-muted)" }}
                        />
                        <span className="text-[10px] font-medium text-[var(--text-muted)]">
                          {skill.category}
                        </span>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1 rounded hover:bg-[var(--bg-hover)]" type="button" onClick={() => openEdit(skill)}>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                          </svg>
                        </button>
                        <button className="text-[var(--text-muted)] hover:text-red-400 transition-colors p-1 rounded hover:bg-red-500/10" type="button" onClick={() => setDeletingId(deletingId === skill.id ? null : skill.id)}>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {skill.name}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                      {skill.description}
                    </p>
                    {skill.files.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {skill.files.map((f, i) => (
                          <span
                            key={i}
                            className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-[var(--bg-hover)] text-[var(--text-muted)]"
                          >
                            {SCOPE_LABELS[f.scope] ?? f.scope}
                          </span>
                        ))}
                      </div>
                    )}
                    {deletingId === skill.id && (
                      <div className="flex items-center gap-2 mt-1">
                        <Btn variant="danger" size="sm" onClick={() => handleDelete(skill.id)}>
                          {t("admin.delete")}
                        </Btn>
                        <Btn variant="ghost" size="sm" onClick={() => setDeletingId(null)}>
                          {t("admin.cancel")}
                        </Btn>
                      </div>
                    )}
                  </div>
                </AdminPanel>
              ))}
            </div>
          )}

          {/* Models */}
          {tab === "models" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredModels.map((model) => (
                <AdminPanel key={model.id} compact>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap min-w-0">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${PROVIDER_COLORS[model.provider] ?? "bg-[var(--bg-hover)] text-[var(--text-muted)]"}`}>
                          {model.provider}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${STATUS_COLORS[model.status] ?? "bg-[var(--bg-hover)] text-[var(--text-muted)]"}`}>
                          {model.status}
                        </span>
                        {model.is_default && (
                          <span className="flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400">
                            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
                            </svg>
                            Default
                          </span>
                        )}
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1 rounded hover:bg-[var(--bg-hover)]" type="button" onClick={() => openEdit(model)}>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                          </svg>
                        </button>
                        <button className="text-[var(--text-muted)] hover:text-red-400 transition-colors p-1 rounded hover:bg-red-500/10" type="button" onClick={() => setDeletingId(deletingId === model.id ? null : model.id)}>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {model.name}
                    </p>
                    {model.model_id && (
                      <p className="text-[10px] font-mono text-[var(--text-muted)]">
                        {model.model_id}
                      </p>
                    )}
                    {model.capabilities.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {model.capabilities.map((cap) => (
                          <span key={cap} className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-[var(--bg-hover)] text-[var(--text-secondary)]">
                            {cap}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-[10px] text-[var(--text-muted)]">
                      {model.context_window != null && model.context_window > 0 && (
                        <span>{(model.context_window / 1000).toFixed(0)}K ctx</span>
                      )}
                      {model.pricing_input != null && model.pricing_input > 0 && (
                        <span>${model.pricing_input}/1M in</span>
                      )}
                      {model.pricing_output != null && model.pricing_output > 0 && (
                        <span>${model.pricing_output}/1M out</span>
                      )}
                    </div>
                    {deletingId === model.id && (
                      <div className="flex items-center gap-2 mt-1">
                        <Btn variant="danger" size="sm" onClick={() => handleDelete(model.id)}>
                          {t("admin.delete")}
                        </Btn>
                        <Btn variant="ghost" size="sm" onClick={() => setDeletingId(null)}>
                          {t("admin.cancel")}
                        </Btn>
                      </div>
                    )}
                  </div>
                </AdminPanel>
              ))}
            </div>
          )}
        </>
      )}

      {/* Empty state */}
      {!loading && currentFiltered.length === 0 && (
        <AdminEmptyState
          title={t("admin.noElements")}
          description={t("admin.noElementsHint")}
        />
      )}

      {/* Form Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-[var(--bg-card)] rounded-2xl border border-[var(--border-default)] shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">
                {editItem ? t("admin.editBtn") : t("admin.create")}{" "}
                {tab === "mcps" ? "MCP" : tab === "skills" ? "Skill" : t("admin.model")}
              </h3>

              {tab === "mcps" && (
                <>
                  <Field label={t("admin.tableName")} value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                  <Field label={t("admin.appDescription")} value={form.description ?? ""} onChange={(v) => setForm({ ...form, description: v })} />
                  <SelectField label={t("admin.type")} options={MCP_TYPES} value={form.type} onChange={(v) => setForm({ ...form, type: v })} />
                  <SelectField label={t("admin.status")} options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }, { value: "error", label: "Error" }]} value={form.status} onChange={(v) => setForm({ ...form, status: v })} />
                  <Field label={t("admin.details")} value={form.details ?? ""} onChange={(v) => setForm({ ...form, details: v })} />
                </>
              )}

              {tab === "skills" && (
                <>
                  <Field label={t("admin.tableName")} value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                  <Field label={t("admin.appDescription")} value={form.description ?? ""} onChange={(v) => setForm({ ...form, description: v })} />
                  <SelectField label={t("admin.category")} options={SKILL_CATEGORIES.filter((c) => c.key !== "all").map((c) => ({ value: c.key, label: c.label }))} value={form.category} onChange={(v) => setForm({ ...form, category: v })} />
                </>
              )}

              {tab === "models" && (
                <>
                  <Field label={t("admin.tableName")} value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                  <Field label="Provider" value={form.provider} onChange={(v) => setForm({ ...form, provider: v })} />
                  <Field label="Model ID" value={form.model_id ?? ""} onChange={(v) => setForm({ ...form, model_id: v })} />
                  <SelectField label={t("admin.type")} options={[{ value: "cloud", label: "Cloud" }, { value: "local", label: "Local" }, { value: "hybrid", label: "Hybrid" }]} value={form.type} onChange={(v) => setForm({ ...form, type: v })} />
                  <SelectField label={t("admin.status")} options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }, { value: "deprecated", label: "Deprecated" }]} value={form.status} onChange={(v) => setForm({ ...form, status: v })} />
                  <Field label="Context Window" value={String(form.context_window ?? 0)} onChange={(v) => setForm({ ...form, context_window: parseInt(v) || 0 })} />
                  <Field label={t("admin.priceInput")} value={String(form.pricing_input ?? 0)} onChange={(v) => setForm({ ...form, pricing_input: parseFloat(v) || 0 })} />
                  <Field label={t("admin.priceOutput")} value={String(form.pricing_output ?? 0)} onChange={(v) => setForm({ ...form, pricing_output: parseFloat(v) || 0 })} />
                  <label className="flex items-center gap-2 text-sm text-[var(--text-primary)]">
                    <input checked={form.is_default ?? false} className="rounded" type="checkbox" onChange={(e) => setForm({ ...form, is_default: e.target.checked })} />
                    {t("admin.defaultModel")}
                  </label>
                </>
              )}
            </div>

            <div className="px-6 pb-5 flex items-center justify-between">
              <Btn variant="ghost" onClick={() => setFormOpen(false)}>
                {t("admin.cancel")}
              </Btn>
              <Btn
                variant="primary"
                disabled={saving || !form.name}
                onClick={handleSave}
              >
                {saving ? "..." : editItem ? t("admin.save") : t("admin.create")}
              </Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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
      <Input value={value} onChange={onChange} />
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
      <select
        className="w-full px-3 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
