"use client";
import { useState, useEffect, useCallback } from "react";
import { useT } from "@/hooks/useT";
import { aiHubService } from "@/services/aiHubService";
import type { AIHubMCP, AIHubSkill, AIHubModel } from "@/types/aiHub";

type Tab = "mcps" | "skills" | "models";

const MCP_TYPES = [
  { value: "mcp", label: "MCP", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  { value: "npm", label: "NPM", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  { value: "hook", label: "HOOK", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  { value: "custom", label: "CUSTOM", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
];

const STATUS_COLORS: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  inactive: "bg-gray-500/10 text-gray-600 dark:text-gray-400",
  error: "bg-red-500/10 text-red-600 dark:text-red-400",
  deprecated: "bg-red-500/10 text-red-600 dark:text-red-400",
};

const PROVIDER_COLORS: Record<string, string> = {
  openai: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  anthropic: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  google: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  deepseek: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  local: "bg-gray-500/10 text-gray-600 dark:text-gray-400",
};

const SKILL_CATEGORIES = [
  { key: "all", label: "All", icon: "📦" },
  { key: "design", label: "Design", icon: "🎨" },
  { key: "frontend", label: "Frontend", icon: "🌐" },
  { key: "mobile", label: "Mobile", icon: "📱" },
  { key: "backend", label: "Backend", icon: "⚡" },
  { key: "database", label: "Database", icon: "🗃️" },
  { key: "tools", label: "Tools", icon: "🔧" },
  { key: "plugins", label: "Plugins", icon: "🔌" },
];

const SCOPE_LABELS: Record<string, string> = {
  global: "Global",
  claude: "Claude",
  root: "Root",
  web: "Web App",
  mobile: "Mobile",
  backend: "Backend",
};

// ── Empty form states ────────────────────────────────────────────────────────

const emptyMCP = { name: "", description: "", type: "mcp", status: "active", details: "", icon: "" };
const emptySkill = { name: "", description: "", category: "tools", files: [] as { path: string; scope: string }[] };
const emptyModel = { name: "", provider: "openai", model_id: "", type: "cloud", status: "active", capabilities: [] as string[], context_window: 0, pricing_input: 0, pricing_output: 0, is_default: false };

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

  useEffect(() => { load(); }, [load]);

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
    if (!confirm("¿Eliminar?")) return;
    try {
      if (tab === "mcps") await aiHubService.deleteMCP(id);
      else if (tab === "skills") await aiHubService.deleteSkill(id);
      else await aiHubService.deleteModel(id);
      load();
    } catch {}
  };

  const filteredMCPs = mcps.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.description?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredSkills = skills.filter((s) =>
    (catFilter === "all" || s.category === catFilter) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) ||
     s.description?.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredModels = models.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.provider.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-violet-500/8 to-pink-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-40 -left-20 w-56 h-56 rounded-full bg-gradient-to-br from-cyan-500/6 to-blue-500/4 blur-3xl pointer-events-none" />

      <div className="relative space-y-6">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wide bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-violet-300/40 dark:border-violet-700/40 text-violet-700 dark:text-violet-300">
              <span className="relative flex h-1 w-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1 w-1 bg-violet-500" />
              </span>
              AI Hub
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[#1d1d1f] dark:text-white tracking-tight">
            AI Hub
          </h1>
          <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">
            {mcps.length} MCPs · {skills.length} Skills · {models.length} Modelos
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "MCPs", count: mcps.length, gradient: "from-violet-500 to-purple-500", icon: "🔌" },
            { label: "Skills", count: skills.length, gradient: "from-pink-500 to-rose-500", icon: "🧠" },
            { label: "Modelos", count: models.length, gradient: "from-cyan-500 to-blue-500", icon: "🤖" },
          ].map((s) => (
            <div key={s.label} className="relative p-4 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 overflow-hidden hover:shadow-xl hover:shadow-black/5 transition-shadow">
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.gradient}`} />
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-violet-400/10 to-pink-400/5 blur-2xl" />
              <div className="relative flex items-center gap-3">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <p className="text-2xl font-black text-[#1d1d1f] dark:text-white">{s.count}</p>
                  <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366] font-semibold uppercase tracking-wide">{s.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-0.5 p-0.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/8">
          {(["mcps", "skills", "models"] as Tab[]).map((t) => (
            <button
              key={t}
              className={`flex-1 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                tab === t
                  ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-md"
                  : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
              }`}
              onClick={() => { setTab(t); setSearch(""); setCatFilter("all"); }}
              type="button"
            >
              {t === "mcps" ? "🔌 MCPs" : t === "skills" ? "🧠 Skills" : "🤖 Modelos"}
            </button>
          ))}
        </div>

        {/* Actions bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aeaeb2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#111116] border border-black/10 dark:border-white/10 text-sm text-[#1d1d1f] dark:text-white placeholder-[#aeaeb2] focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 transition-all"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white text-xs font-semibold hover:shadow-lg hover:shadow-violet-500/20 transition-all"
            onClick={openCreate}
            type="button"
          >
            + Añadir
          </button>
        </div>

        {/* Category filter (skills tab only) */}
        {tab === "skills" && (
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {SKILL_CATEGORIES.map((c) => (
              <button
                key={c.key}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap transition-all ${
                  catFilter === c.key
                    ? "bg-violet-500 text-white"
                    : "bg-black/5 dark:bg-white/8 text-[#6e6e73] dark:text-[#86868b]"
                }`}
                onClick={() => setCatFilter(c.key)}
                type="button"
              >
                <span>{c.icon}</span>
                {c.label}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {/* MCPs Tab */}
            {tab === "mcps" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredMCPs.map((mcp) => (
                  <div key={mcp.id} className="relative p-4 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:shadow-xl hover:shadow-black/5 transition-all group">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-t-2xl opacity-60" />
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${MCP_TYPES.find((t) => t.value === mcp.type)?.color ?? ""}`}>
                          {mcp.type.toUpperCase()}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${STATUS_COLORS[mcp.status] ?? ""}`}>
                          {mcp.status}
                        </span>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-6 h-6 rounded-lg bg-black/5 dark:bg-white/8 flex items-center justify-center text-[#aeaeb2] hover:text-[#1d1d1f] dark:hover:text-white transition-colors" onClick={() => openEdit(mcp)} type="button">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </button>
                        <button className="w-6 h-6 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 hover:bg-red-500/20 transition-colors" onClick={() => handleDelete(mcp.id)} type="button">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-1">{mcp.name}</h3>
                    <p className="text-xs text-[#6e6e73] dark:text-[#86868b] line-clamp-2 mb-2">{mcp.description}</p>
                    {mcp.details && <p className="text-[10px] font-mono text-[#aeaeb2] dark:text-[#636366]">{mcp.details}</p>}
                  </div>
                ))}
              </div>
            )}

            {/* Skills Tab */}
            {tab === "skills" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredSkills.map((skill) => (
                  <div key={skill.id} className="relative p-4 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:shadow-xl hover:shadow-black/5 transition-all group">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-t-2xl opacity-60" />
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400">
                        {SKILL_CATEGORIES.find((c) => c.key === skill.category)?.icon} {skill.category}
                      </span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-6 h-6 rounded-lg bg-black/5 dark:bg-white/8 flex items-center justify-center text-[#aeaeb2] hover:text-[#1d1d1f] dark:hover:text-white transition-colors" onClick={() => openEdit(skill)} type="button">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </button>
                        <button className="w-6 h-6 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 hover:bg-red-500/20 transition-colors" onClick={() => handleDelete(skill.id)} type="button">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-1">{skill.name}</h3>
                    <p className="text-xs text-[#6e6e73] dark:text-[#86868b] line-clamp-2 mb-2">{skill.description}</p>
                    {skill.files.length > 0 && (
                      <div className="flex flex-col gap-0.5">
                        {skill.files.map((f, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[10px] font-mono text-[#aeaeb2] dark:text-[#636366]">
                            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
                            <span className="truncate">{f.path}</span>
                            <span className="shrink-0 text-[9px] px-1 py-0.5 rounded bg-black/5 dark:bg-white/5">{SCOPE_LABELS[f.scope] ?? f.scope}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Models Tab */}
            {tab === "models" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredModels.map((model) => (
                  <div key={model.id} className="relative p-4 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:shadow-xl hover:shadow-black/5 transition-all group">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-t-2xl opacity-60" />
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${PROVIDER_COLORS[model.provider] ?? "bg-gray-500/10 text-gray-600"}`}>
                          {model.provider}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${STATUS_COLORS[model.status] ?? ""}`}>
                          {model.status}
                        </span>
                        {model.is_default && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">★ Default</span>
                        )}
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-6 h-6 rounded-lg bg-black/5 dark:bg-white/8 flex items-center justify-center text-[#aeaeb2] hover:text-[#1d1d1f] dark:hover:text-white transition-colors" onClick={() => openEdit(model)} type="button">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </button>
                        <button className="w-6 h-6 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 hover:bg-red-500/20 transition-colors" onClick={() => handleDelete(model.id)} type="button">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-1">{model.name}</h3>
                    {model.model_id && <p className="text-[10px] font-mono text-[#aeaeb2] dark:text-[#636366] mb-2">{model.model_id}</p>}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {model.capabilities.map((cap) => (
                        <span key={cap} className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/8 text-[#6e6e73] dark:text-[#86868b]">
                          {cap}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-[#aeaeb2] dark:text-[#636366]">
                      {model.context_window && <span>{(model.context_window / 1000).toFixed(0)}K ctx</span>}
                      {model.pricing_input != null && <span>${model.pricing_input}/1M in</span>}
                      {model.pricing_output != null && <span>${model.pricing_output}/1M out</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Empty state */}
        {!loading && (
          (tab === "mcps" && filteredMCPs.length === 0) ||
          (tab === "skills" && filteredSkills.length === 0) ||
          (tab === "models" && filteredModels.length === 0)
        ) && (
          <div className="text-center py-12">
            <p className="text-sm text-[#6e6e73] dark:text-[#86868b]">No hay elementos</p>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white dark:bg-[#111116] rounded-2xl border border-black/8 dark:border-white/8 shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-bold text-[#1d1d1f] dark:text-white">
                {editItem ? "Editar" : "Crear"} {tab === "mcps" ? "MCP" : tab === "skills" ? "Skill" : "Modelo"}
              </h3>

              {/* MCP fields */}
              {tab === "mcps" && (
                <>
                  <Field label="Nombre" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                  <Field label="Descripción" value={form.description ?? ""} onChange={(v) => setForm({ ...form, description: v })} />
                  <SelectField label="Tipo" value={form.type} options={MCP_TYPES.map((t) => ({ value: t.value, label: t.label }))} onChange={(v) => setForm({ ...form, type: v })} />
                  <SelectField label="Estado" value={form.status} options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }, { value: "error", label: "Error" }]} onChange={(v) => setForm({ ...form, status: v })} />
                  <Field label="Detalles" value={form.details ?? ""} onChange={(v) => setForm({ ...form, details: v })} />
                  <Field label="Icono (emoji)" value={form.icon ?? ""} onChange={(v) => setForm({ ...form, icon: v })} />
                </>
              )}

              {/* Skill fields */}
              {tab === "skills" && (
                <>
                  <Field label="Nombre" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                  <Field label="Descripción" value={form.description ?? ""} onChange={(v) => setForm({ ...form, description: v })} />
                  <SelectField label="Categoría" value={form.category} options={SKILL_CATEGORIES.filter((c) => c.key !== "all").map((c) => ({ value: c.key, label: `${c.icon} ${c.label}` }))} onChange={(v) => setForm({ ...form, category: v })} />
                </>
              )}

              {/* Model fields */}
              {tab === "models" && (
                <>
                  <Field label="Nombre" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                  <Field label="Provider" value={form.provider} onChange={(v) => setForm({ ...form, provider: v })} />
                  <Field label="Model ID" value={form.model_id ?? ""} onChange={(v) => setForm({ ...form, model_id: v })} />
                  <SelectField label="Tipo" value={form.type} options={[{ value: "cloud", label: "Cloud" }, { value: "local", label: "Local" }, { value: "hybrid", label: "Hybrid" }]} onChange={(v) => setForm({ ...form, type: v })} />
                  <SelectField label="Estado" value={form.status} options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }, { value: "deprecated", label: "Deprecated" }]} onChange={(v) => setForm({ ...form, status: v })} />
                  <Field label="Context Window" value={String(form.context_window ?? 0)} onChange={(v) => setForm({ ...form, context_window: parseInt(v) || 0 })} />
                  <Field label="Precio Input ($/1M)" value={String(form.pricing_input ?? 0)} onChange={(v) => setForm({ ...form, pricing_input: parseFloat(v) || 0 })} />
                  <Field label="Precio Output ($/1M)" value={String(form.pricing_output ?? 0)} onChange={(v) => setForm({ ...form, pricing_output: parseFloat(v) || 0 })} />
                  <label className="flex items-center gap-2 text-sm text-[#1d1d1f] dark:text-white">
                    <input type="checkbox" checked={form.is_default ?? false} onChange={(e) => setForm({ ...form, is_default: e.target.checked })} className="rounded" />
                    Modelo por defecto
                  </label>
                </>
              )}
            </div>

            <div className="px-6 pb-5 flex items-center justify-between">
              <button className="px-4 py-2 rounded-xl text-sm font-medium text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors" onClick={() => setFormOpen(false)} type="button">
                Cancelar
              </button>
              <button
                className={`px-5 py-2 rounded-xl text-sm font-medium text-white transition-all ${
                  saving ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-violet-500 to-pink-500 hover:shadow-lg hover:shadow-violet-500/20"
                }`}
                onClick={handleSave}
                disabled={saving || !form.name}
                type="button"
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

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] mb-1">{label}</label>
      <input
        className="w-full px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-sm text-[#1d1d1f] dark:text-white focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400/20 transition-all"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] mb-1">{label}</label>
      <select
        className="w-full px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-sm text-[#1d1d1f] dark:text-white focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400/20 transition-all"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
