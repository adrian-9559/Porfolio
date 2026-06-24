import { useState } from "react";
import {
  SectionHeader, Card, EmptyState, Spinner, Badge, Btn, relativeTime, Icons,
} from "./AdminShared";

// ── Types ─────────────────────────────────────────────────────────────────────

type TaskStatus = "running" | "completed" | "failed" | "pending" | "cancelled";
type TaskType = "single" | "pipeline" | "parallel" | "autogpt" | "conditional";

interface LogEntry {
  id: string;
  agentName: string;
  stepIndex: number;
  status: "completed" | "failed" | "running";
  input: string;
  output: string | null;
  executionTimeMs: number | null;
}

interface OrchestratorTask {
  id: string;
  name: string;
  type: TaskType;
  status: TaskStatus;
  agentIds: string[];
  executionTimeMs: number | null;
  createdAt: string;
  result: string | null;
  error?: string;
  retryCount: number;
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const INITIAL_TASKS: OrchestratorTask[] = [
  { id: "t1", name: "Generar API REST completa", type: "pipeline", status: "completed", agentIds: ["backend_developer", "documentation_agent"], executionTimeMs: 14500, createdAt: "2026-06-22T10:00:00Z", result: "API generada con 12 endpoints...", retryCount: 0 },
  { id: "t2", name: "Revisar y refactorizar frontend", type: "parallel", status: "completed", agentIds: ["refactor_agent", "frontend_builder"], executionTimeMs: 9200, createdAt: "2026-06-22T08:30:00Z", result: "Refactorización completada en 3 componentes...", retryCount: 1 },
  { id: "t3", name: "Arquitectura SaaS completa", type: "autogpt", status: "running", agentIds: ["fullstack_architect", "backend_developer", "frontend_builder", "documentation_agent"], executionTimeMs: null, createdAt: "2026-06-22T12:00:00Z", result: null, retryCount: 0 },
  { id: "t4", name: "Documentar sistema de agentes", type: "single", status: "failed", agentIds: ["documentation_agent"], executionTimeMs: 3200, createdAt: "2026-06-21T15:00:00Z", result: null, error: "Timeout después de 3 reintentos", retryCount: 3 },
];

const MOCK_LOGS: Record<string, LogEntry[]> = {
  t1: [
    { id: "l1", agentName: "Orchestrator", stepIndex: 0, status: "completed", input: "Generar API REST completa", output: "Plan: 1. Backend Developer 2. Documentation Agent", executionTimeMs: 800 },
    { id: "l2", agentName: "backend_developer", stepIndex: 1, status: "completed", input: "Crear API REST con auth, CRUD usuarios, repositorios", output: "API generada con Express, 12 endpoints, JWT auth...", executionTimeMs: 10200 },
    { id: "l3", agentName: "documentation_agent", stepIndex: 2, status: "completed", input: "Documentar la API generada", output: "OpenAPI spec generada, README actualizado...", executionTimeMs: 3500 },
  ],
  t2: [
    { id: "l4", agentName: "Orchestrator", stepIndex: 0, status: "completed", input: "Revisar y refactorizar frontend", output: "Ejecutando refactor_agent y frontend_builder en paralelo", executionTimeMs: 200 },
    { id: "l5", agentName: "refactor_agent", stepIndex: 1, status: "completed", input: "Revisar código React para mejoras", output: "3 componentes refactorizados, memoización añadida...", executionTimeMs: 4800 },
    { id: "l6", agentName: "frontend_builder", stepIndex: 1, status: "completed", input: "Revisar estilos y UX", output: "Dark mode mejorado, accesibilidad corregida en 5 componentes...", executionTimeMs: 4400 },
    { id: "l7", agentName: "Orchestrator", stepIndex: 2, status: "completed", input: "Merge resultados", output: "Resultados combinados exitosamente", executionTimeMs: 300 },
  ],
};

const PRESETS = [
  { id: "frontend_builder", label: "Frontend Builder", icon: "🎨" },
  { id: "backend_developer", label: "Backend Developer", icon: "⚙️" },
  { id: "fullstack_architect", label: "Fullstack Architect", icon: "🏗️" },
  { id: "refactor_agent", label: "Refactor Agent", icon: "♻️" },
  { id: "documentation_agent", label: "Doc Agent", icon: "📝" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function typeBadge(type: TaskType) {
  const map: Record<TaskType, { label: string; color: "gray" | "blue" | "purple" | "amber" | "green" }> = {
    single:      { label: "Single",     color: "gray"   },
    pipeline:    { label: "Pipeline",   color: "blue"   },
    parallel:    { label: "Paralelo",   color: "purple" },
    autogpt:     { label: "AutoGPT",    color: "amber"  },
    conditional: { label: "Condicional",color: "green"  },
  };
  const { label, color } = map[type];
  return <Badge label={label} color={color} />;
}

function statusBadge(status: TaskStatus) {
  if (status === "running") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        En curso
      </span>
    );
  }
  const map: Record<Exclude<TaskStatus, "running">, { label: string; color: "green" | "red" | "gray" }> = {
    completed: { label: "Completada", color: "green" },
    failed:    { label: "Fallida",    color: "red"   },
    pending:   { label: "Pendiente",  color: "gray"  },
    cancelled: { label: "Cancelada",  color: "gray"  },
  };
  const { label, color } = map[status];
  return <Badge label={label} color={color} />;
}

function fmtMs(ms: number | null) {
  if (ms === null) return "—";
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

// ── Workflow Visualizer ───────────────────────────────────────────────────────

function WorkflowVisualizer({ task }: { task: OrchestratorTask }) {
  const preset = (id: string) => PRESETS.find((p) => p.id === id);
  const agents = task.agentIds.map((id) => preset(id) ?? { id, label: id, icon: "🤖" });

  if (task.type === "parallel") {
    return (
      <div className="flex flex-wrap gap-2 items-center">
        {agents.map((a, i) => (
          <span key={a.id} className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs font-medium text-purple-700 dark:text-purple-300">
              {a.icon} {a.label}
            </span>
            {i < agents.length - 1 && (
              <span className="text-[10px] font-bold text-purple-400">⟳</span>
            )}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {agents.map((a, i) => (
        <span key={a.id} className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs font-medium text-blue-700 dark:text-blue-300">
            {a.icon} {a.label}
          </span>
          {i < agents.length - 1 && (
            <span className="text-[#aeaeb2] text-xs">→</span>
          )}
        </span>
      ))}
    </div>
  );
}

// ── Log Entry ─────────────────────────────────────────────────────────────────

function LogRow({ log }: { log: LogEntry }) {
  const [open, setOpen] = useState(false);
  const statusColor = log.status === "completed" ? "text-emerald-500" : log.status === "failed" ? "text-red-500" : "text-blue-500";
  const statusIcon = log.status === "completed" ? "✓" : log.status === "failed" ? "✕" : "●";
  return (
    <div className="border-b border-black/5 dark:border-white/5 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-black/2 dark:hover:bg-white/2 transition-colors text-left"
      >
        <span className={`text-xs font-bold ${statusColor} w-4 text-center shrink-0`}>{statusIcon}</span>
        <span className="text-xs text-[#aeaeb2] dark:text-[#636366] w-5 shrink-0">#{log.stepIndex}</span>
        <span className="text-sm text-[#1d1d1f] dark:text-white font-medium flex-1 truncate">{log.agentName}</span>
        <span className="text-xs text-[#aeaeb2] dark:text-[#636366] shrink-0">{fmtMs(log.executionTimeMs)}</span>
        <svg className={`w-3.5 h-3.5 text-[#aeaeb2] shrink-0 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 5l4 4 4-4" /></svg>
      </button>
      {open && (
        <div className="px-4 pb-3 grid grid-cols-1 gap-2 text-xs ml-12">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">Input</span>
            <p className="mt-0.5 text-[#6e6e73] dark:text-[#86868b] bg-black/3 dark:bg-white/5 rounded-lg px-3 py-2">{log.input}</p>
          </div>
          {log.output && (
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">Output</span>
              <p className="mt-0.5 text-[#6e6e73] dark:text-[#86868b] bg-black/3 dark:bg-white/5 rounded-lg px-3 py-2">{log.output}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Task Detail Panel ─────────────────────────────────────────────────────────

function TaskDetailPanel({ task, onClose }: { task: OrchestratorTask; onClose: () => void }) {
  const logs = MOCK_LOGS[task.id] ?? [];
  return (
    <Card className="mt-4">
      <div className="px-5 py-4 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
        <div>
          <p className="font-semibold text-[#1d1d1f] dark:text-white text-sm">{task.name}</p>
          <div className="flex items-center gap-2 mt-1">
            {typeBadge(task.type)}
            {statusBadge(task.status)}
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-[#aeaeb2] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M2 2l10 10M12 2L2 12" /></svg>
        </button>
      </div>

      <div className="px-5 py-4 grid grid-cols-3 gap-4 border-b border-black/5 dark:border-white/5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">Tiempo</p>
          <p className="mt-0.5 text-sm font-medium text-[#1d1d1f] dark:text-white">{fmtMs(task.executionTimeMs)}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">Reintentos</p>
          <p className="mt-0.5 text-sm font-medium text-[#1d1d1f] dark:text-white">{task.retryCount}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">Fecha</p>
          <p className="mt-0.5 text-sm font-medium text-[#1d1d1f] dark:text-white">{relativeTime(task.createdAt)}</p>
        </div>
      </div>

      {task.agentIds.length > 1 && (
        <div className="px-5 py-4 border-b border-black/5 dark:border-white/5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-2">Flujo de Agentes</p>
          <WorkflowVisualizer task={task} />
        </div>
      )}

      {task.result && (
        <div className="px-5 py-4 border-b border-black/5 dark:border-white/5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-1.5">Resultado</p>
          <p className="text-sm text-[#6e6e73] dark:text-[#86868b] bg-emerald-50 dark:bg-emerald-950/20 rounded-xl px-3 py-2">{task.result}</p>
        </div>
      )}

      {task.error && (
        <div className="px-5 py-4 border-b border-black/5 dark:border-white/5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-1.5">Error</p>
          <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 rounded-xl px-3 py-2">{task.error}</p>
        </div>
      )}

      <div>
        <div className="px-5 py-3 border-b border-black/5 dark:border-white/5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">Logs de Ejecución</p>
        </div>
        {logs.length === 0 ? (
          <EmptyState text="Sin logs disponibles" />
        ) : (
          logs.map((log) => <LogRow key={log.id} log={log} />)
        )}
      </div>
    </Card>
  );
}

// ── Monitor Sub-view ──────────────────────────────────────────────────────────

type FilterStatus = "all" | "running" | "completed" | "failed";

function MonitorView({ tasks }: { tasks: OrchestratorTask[] }) {
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const total = tasks.length;
  const active = tasks.filter((t) => t.status === "running").length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const failed = tasks.filter((t) => t.status === "failed").length;

  const filtered = filter === "all" ? tasks : tasks.filter((t) => t.status === filter);
  const selected = tasks.find((t) => t.id === selectedId) ?? null;

  const FILTERS: { key: FilterStatus; label: string }[] = [
    { key: "all", label: "Todas" },
    { key: "running", label: "Activas" },
    { key: "completed", label: "Completadas" },
    { key: "failed", label: "Fallidas" },
  ];

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total tareas", value: total, color: "text-[#1d1d1f] dark:text-white" },
          { label: "Activas", value: active, color: "text-blue-600 dark:text-blue-400" },
          { label: "Completadas", value: completed, color: "text-emerald-600 dark:text-emerald-400" },
          { label: "Fallidas", value: failed, color: "text-red-600 dark:text-red-400" },
        ].map((stat) => (
          <Card key={stat.label} className="px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">{stat.label}</p>
            <p className={`text-2xl font-bold mt-0.5 ${stat.color}`}>{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => { setFilter(f.key); setSelectedId(null); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors border ${
              filter === f.key
                ? "bg-blue-600 text-white border-transparent"
                : "border-black/12 dark:border-white/12 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Task table */}
      <Card>
        {filtered.length === 0 ? (
          <EmptyState text="No hay tareas" sub="Ajusta los filtros o crea una nueva tarea." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/5 dark:border-white/5">
                  {["Nombre", "Tipo", "Estado", "Agentes", "Tiempo", "Fecha", ""].map((col) => (
                    <th key={col} className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((task) => (
                  <tr
                    key={task.id}
                    onClick={() => setSelectedId(selectedId === task.id ? null : task.id)}
                    className={`border-b border-black/5 dark:border-white/5 last:border-0 cursor-pointer transition-colors ${
                      selectedId === task.id
                        ? "bg-blue-50/60 dark:bg-blue-950/20"
                        : "hover:bg-black/2 dark:hover:bg-white/2"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium text-[#1d1d1f] dark:text-white max-w-[180px] truncate">{task.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{typeBadge(task.type)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{statusBadge(task.status)}</td>
                    <td className="px-4 py-3 text-[#6e6e73] dark:text-[#86868b] text-xs whitespace-nowrap">{task.agentIds.length} agente{task.agentIds.length !== 1 ? "s" : ""}</td>
                    <td className="px-4 py-3 text-[#6e6e73] dark:text-[#86868b] whitespace-nowrap">{fmtMs(task.executionTimeMs)}</td>
                    <td className="px-4 py-3 text-[#6e6e73] dark:text-[#86868b] whitespace-nowrap">{relativeTime(task.createdAt)}</td>
                    <td className="px-4 py-3">
                      <svg className={`w-3.5 h-3.5 text-[#aeaeb2] transition-transform ${selectedId === task.id ? "rotate-180" : ""}`} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 5l4 4 4-4" /></svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Detail panel */}
      {selected && (
        <TaskDetailPanel task={selected} onClose={() => setSelectedId(null)} />
      )}
    </div>
  );
}

// ── Nueva Tarea Sub-view ──────────────────────────────────────────────────────

const EXEC_TYPES: { id: TaskType; label: string; desc: string }[] = [
  { id: "single",   label: "Single Agent",  desc: "Un único agente ejecuta la tarea completa" },
  { id: "pipeline", label: "Pipeline",      desc: "Agentes encadenados en secuencia" },
  { id: "parallel", label: "Paralelo",      desc: "Agentes ejecutados simultáneamente" },
  { id: "autogpt",  label: "AutoGPT",       desc: "Modo autónomo con razonamiento iterativo" },
];

const MAX_RETRIES = [1, 2, 3, 5];

interface NewTaskFormProps {
  onTaskCreated: (task: OrchestratorTask) => void;
}

function NewTaskForm({ onTaskCreated }: NewTaskFormProps) {
  const [taskName, setTaskName] = useState("");
  const [execType, setExecType] = useState<TaskType>("pipeline");
  const [prompt, setPrompt] = useState("");
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [maxRetries, setMaxRetries] = useState(2);
  const [running, setRunning] = useState(false);

  function toggleAgent(id: string) {
    setSelectedAgents((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  }

  function handleSubmit() {
    if (!taskName.trim() || !prompt.trim() || selectedAgents.length === 0) return;
    setRunning(true);

    const newTask: OrchestratorTask = {
      id: `t${Date.now()}`,
      name: taskName,
      type: execType,
      status: "running",
      agentIds: selectedAgents,
      executionTimeMs: null,
      createdAt: new Date().toISOString(),
      result: null,
      retryCount: 0,
    };

    setTimeout(() => {
      const completed: OrchestratorTask = {
        ...newTask,
        status: "completed",
        executionTimeMs: Math.floor(Math.random() * 12000) + 3000,
        result: `Tarea "${taskName}" completada exitosamente con ${selectedAgents.length} agente(s).`,
      };
      onTaskCreated(completed);
      setRunning(false);
      setTaskName("");
      setPrompt("");
      setSelectedAgents([]);
    }, 2000);
  }

  const canSubmit = taskName.trim() && prompt.trim() && selectedAgents.length > 0 && !running;

  return (
    <div className="space-y-5">
      {/* Task name */}
      <Card className="px-5 py-4 space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">Nombre de la Tarea</p>
        <input
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Ej: Generar API REST completa…"
          className="w-full px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
        />
      </Card>

      {/* Execution type */}
      <Card className="px-5 py-4 space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">Tipo de Ejecución</p>
        <div className="grid grid-cols-2 gap-2">
          {EXEC_TYPES.map((et) => (
            <button
              key={et.id}
              onClick={() => setExecType(et.id)}
              className={`text-left px-4 py-3 rounded-xl border transition-all ${
                execType === et.id
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                  : "border-black/12 dark:border-white/12 hover:bg-black/3 dark:hover:bg-white/5"
              }`}
            >
              <p className={`text-sm font-semibold ${execType === et.id ? "text-blue-600 dark:text-blue-400" : "text-[#1d1d1f] dark:text-white"}`}>{et.label}</p>
              <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-0.5 leading-tight">{et.desc}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* Prompt / input */}
      <Card className="px-5 py-4 space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">Descripción / Prompt</p>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe la tarea que debe ejecutar el orquestador…"
          rows={4}
          className="w-full px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all resize-none"
        />
      </Card>

      {/* Agent selector */}
      <Card className="px-5 py-4 space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">Agentes</p>
        <div className="space-y-2">
          {PRESETS.map((preset) => {
            const checked = selectedAgents.includes(preset.id);
            return (
              <label
                key={preset.id}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border cursor-pointer transition-all ${
                  checked
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                    : "border-black/8 dark:border-white/8 hover:bg-black/3 dark:hover:bg-white/5"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleAgent(preset.id)}
                  className="w-4 h-4 rounded accent-blue-600"
                />
                <span className="text-base">{preset.icon}</span>
                <span className={`text-sm font-medium ${checked ? "text-blue-600 dark:text-blue-400" : "text-[#1d1d1f] dark:text-white"}`}>{preset.label}</span>
                <span className="text-xs text-[#aeaeb2] dark:text-[#636366] ml-auto font-mono">{preset.id}</span>
              </label>
            );
          })}
        </div>
      </Card>

      {/* Pipeline ordered steps */}
      {execType === "pipeline" && selectedAgents.length > 0 && (
        <Card className="px-5 py-4 space-y-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">Orden del Pipeline</p>
          <div className="space-y-2">
            {selectedAgents.map((id, i) => {
              const preset = PRESETS.find((p) => p.id === id);
              return (
                <div key={id} className="flex items-center gap-3 px-3 py-2 rounded-xl bg-black/3 dark:bg-white/5">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 w-5 text-center">{i + 1}</span>
                  <span className="text-base">{preset?.icon ?? "🤖"}</span>
                  <span className="text-sm text-[#1d1d1f] dark:text-white">{preset?.label ?? id}</span>
                  {i < selectedAgents.length - 1 && (
                    <span className="ml-auto text-[#aeaeb2] text-xs">→ siguiente</span>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Max retries */}
      <Card className="px-5 py-4 space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366]">Máx. Reintentos</p>
        <div className="flex gap-2">
          {MAX_RETRIES.map((n) => (
            <button
              key={n}
              onClick={() => setMaxRetries(n)}
              className={`w-10 h-10 rounded-xl border text-sm font-semibold transition-all ${
                maxRetries === n
                  ? "border-blue-500 bg-blue-600 text-white"
                  : "border-black/12 dark:border-white/12 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </Card>

      {/* Submit */}
      <div className="flex justify-end">
        <Btn onClick={handleSubmit} disabled={!canSubmit}>
          {running ? (
            <>
              <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Ejecutando…
            </>
          ) : (
            <>
              {Icons.flow}
              Ejecutar tarea
            </>
          )}
        </Btn>
      </div>
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────

type SubView = "monitor" | "nueva";

export function AdminOrchestratorSection() {
  const [view, setView] = useState<SubView>("monitor");
  const [tasks, setTasks] = useState<OrchestratorTask[]>(INITIAL_TASKS);

  function handleTaskCreated(task: OrchestratorTask) {
    setTasks((prev) => [task, ...prev]);
    setView("monitor");
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Orchestrator"
        desc="Gestiona y monitoriza las tareas del orquestador multi-agente."
        action={
          <div className="flex gap-2">
            {(["monitor", "nueva"] as SubView[]).map((v) => (
              <Btn
                key={v}
                onClick={() => setView(v)}
                variant={view === v ? "primary" : "ghost"}
                size="sm"
              >
                {v === "monitor" ? "Monitor" : "Nueva Tarea"}
              </Btn>
            ))}
          </div>
        }
      />

      {view === "monitor" ? (
        <MonitorView tasks={tasks} />
      ) : (
        <NewTaskForm onTaskCreated={handleTaskCreated} />
      )}
    </div>
  );
}
