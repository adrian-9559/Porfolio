import { useEffect, useState } from "react";
import { useT } from "@/hooks/useT";

import {
  SectionHeader,
  Card,
  Spinner,
  EmptyState,
  IconBtn,
  SearchInput,
  Badge,
  Icons,
  relativeTime,
} from "./AdminShared";

import {
  adminService,
  AdminAgent,
  AdminWorkflow,
} from "@/services/adminService";

export function AdminAgentsSection() {
  const { t } = useT();
  const [agents, setAgents] = useState<AdminAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      setAgents(await adminService.listAgents());
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = agents.filter((a) => {
    if (!search) return true;
    const q = search.toLowerCase();

    return (
      a.name.toLowerCase().includes(q) ||
      (a.description ?? "").toLowerCase().includes(q) ||
      (a.profiles?.full_name ?? "").toLowerCase().includes(q)
    );
  });

  const handleDelete = async (id: string) => {
    setConfirmDeleteId(null);
    try {
      await adminService.deleteAgent(id);
      setAgents((a) => a.filter((x) => x.id !== id));
    } catch {}
  };

  const presetColors: Record<
    string,
    "blue" | "green" | "purple" | "amber" | "red" | "gray"
  > = {
    frontend_builder: "blue",
    backend_developer: "green",
    fullstack_architect: "purple",
    refactor_agent: "amber",
    documentation_agent: "gray",
    orchestrator: "red",
    custom: "gray",
  };

  return (
    <div className="flex flex-col gap-5">
      <SectionHeader
        desc={t("admin.agentsDesc", { n: agents.length, s: agents.length !== 1 ? "s" : "" })}
        title={t("admin.agentsTitle")}
      />

      <SearchInput
        placeholder={t("admin.searchAgent")}
        value={search}
        onChange={setSearch}
      />

      <Card>
        {loading ? (
          <Spinner />
        ) : filtered.length === 0 ? (
          <EmptyState
            sub={search ? t("admin.noAgentsSearch") : t("admin.noAgentsHint")}
            text={t("admin.noAgents")}
          />
        ) : (
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {filtered.map((a) => (
              <div key={a.id} className="flex items-center gap-3 px-5 py-3.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  {Icons.bot}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-medium text-[#1d1d1f] dark:text-white truncate">
                      {a.name}
                    </p>
                    {a.preset_type && (
                      <Badge
                        color={presetColors[a.preset_type] ?? "gray"}
                        label={a.preset_type.replace("_", " ")}
                      />
                    )}
                    {a.memory_enabled && <Badge color="blue" label={t("admin.memoryBadge")} />}
                    {a.is_public && <Badge color="green" label={t("admin.publicBadge")} />}
                  </div>
                  {a.description && (
                    <p className="text-xs text-[#6e6e73] dark:text-[#86868b] truncate">
                      {a.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                      {a.profiles?.full_name ?? t("admin.unknownUser")}
                    </span>
                    <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                      ·
                    </span>
                    <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                      {relativeTime(a.created_at)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  {a.capabilities.slice(0, 3).map((c) => (
                    <span
                      key={c}
                      className="hidden sm:block px-1.5 py-0.5 rounded text-[10px] bg-black/5 dark:bg-white/8 text-[#6e6e73] dark:text-[#86868b]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                {confirmDeleteId === a.id ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      className="px-2 py-1 rounded-lg text-xs font-medium bg-red-50 dark:bg-red-950/20 text-red-500 hover:bg-red-100 transition-colors"
                      onClick={() => handleDelete(a.id)}
                    >
                      {t("common.delete")}
                    </button>
                    <button
                      className="px-2 py-1 rounded-lg text-xs font-medium bg-black/5 text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
                      onClick={() => setConfirmDeleteId(null)}
                    >
                      {t("common.cancel")}
                    </button>
                  </div>
                ) : (
                  <IconBtn
                    danger
                    icon={Icons.trash}
                    title={t("admin.deleteAgent")}
                    onClick={() => setConfirmDeleteId(a.id)}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export function AdminWorkflowsSection() {
  const { t } = useT();
  const [workflows, setWorkflows] = useState<AdminWorkflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      setWorkflows(await adminService.listWorkflows());
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = workflows.filter((w) => {
    if (!search) return true;
    const q = search.toLowerCase();

    return (
      w.name.toLowerCase().includes(q) ||
      (w.description ?? "").toLowerCase().includes(q)
    );
  });

  const handleDelete = async (id: string) => {
    setConfirmDeleteId(null);
    try {
      await adminService.deleteWorkflow(id);
      setWorkflows((w) => w.filter((x) => x.id !== id));
    } catch {}
  };

  return (
    <div className="flex flex-col gap-5">
      <SectionHeader
        desc={t("admin.workflowsDesc", { n: workflows.length, s: workflows.length !== 1 ? "s" : "" })}
        title={t("admin.workflowsTitle")}
      />

      <SearchInput
        placeholder={t("admin.searchWorkflow")}
        value={search}
        onChange={setSearch}
      />

      <Card>
        {loading ? (
          <Spinner />
        ) : filtered.length === 0 ? (
          <EmptyState
            sub={search ? t("admin.noAgentsSearch") : t("admin.noWorkflowsHint")}
            text={t("admin.noWorkflows")}
          />
        ) : (
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {filtered.map((w) => (
              <div key={w.id} className="flex items-center gap-3 px-5 py-3.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  {Icons.flow}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1d1d1f] dark:text-white truncate">
                    {w.name}
                  </p>
                  {w.description && (
                    <p className="text-xs text-[#6e6e73] dark:text-[#86868b] truncate">
                      {w.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                      {w.profiles?.full_name ?? t("admin.unknownUser")}
                    </span>
                    <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                      ·
                    </span>
                    <Badge
                      color="purple"
                      label={t("admin.stepsLabel", { n: Array.isArray(w.steps) ? w.steps.length : 0 })}
                    />
                    <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                      ·
                    </span>
                    <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                      {relativeTime(w.created_at)}
                    </span>
                  </div>
                </div>
                {confirmDeleteId === w.id ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      className="px-2 py-1 rounded-lg text-xs font-medium bg-red-50 dark:bg-red-950/20 text-red-500 hover:bg-red-100 transition-colors"
                      onClick={() => handleDelete(w.id)}
                    >
                      {t("common.delete")}
                    </button>
                    <button
                      className="px-2 py-1 rounded-lg text-xs font-medium bg-black/5 text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
                      onClick={() => setConfirmDeleteId(null)}
                    >
                      {t("common.cancel")}
                    </button>
                  </div>
                ) : (
                  <IconBtn
                    danger
                    icon={Icons.trash}
                    title={t("admin.deleteWorkflow")}
                    onClick={() => setConfirmDeleteId(w.id)}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
