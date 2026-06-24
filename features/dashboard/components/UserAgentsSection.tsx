import { useState, useEffect } from "react";
import { agentService, type Agent } from "@/services/agentService";

interface Execution {
	id: string;
	agentId: string;
	agentName: string;
	input: string;
	output: string;
	status: "completed" | "error" | "running";
	duration: string;
	date: string;
}

// Local preset definitions used for the create form UI


const PRESETS: { id: string; label: string; desc: string; prompt: string; tools: string[] }[] = [
	{ id: "frontend", label: "Frontend Dev", desc: "Especializado en React, CSS y UX", prompt: "Eres un asistente experto en desarrollo frontend con React, TypeScript y Tailwind CSS. Ayudas a resolver problemas de UI, optimización y buenas prácticas.", tools: ["web-search", "code-runner"] },
	{ id: "backend", label: "Backend Dev", desc: "APIs, bases de datos, seguridad", prompt: "Eres un asistente experto en desarrollo backend con Node.js, Express y bases de datos SQL/NoSQL. Te especializas en diseño de APIs REST, autenticación y optimización.", tools: ["web-search", "code-runner", "database"] },
	{ id: "fullstack", label: "Fullstack Dev", desc: "Frontend + Backend + DevOps", prompt: "Eres un asistente fullstack completo. Manejas tanto el frontend (React, Next.js) como el backend (Node.js, PostgreSQL) y DevOps (Docker, CI/CD).", tools: ["web-search", "code-runner", "database", "terminal"] },
	{ id: "writer", label: "Escritor Técnico", desc: "Documentación y contenido técnico", prompt: "Eres un escritor técnico experto. Creas documentación clara, tutoriales, artículos de blog técnicos y README files profesionales.", tools: ["web-search"] },
	{ id: "custom", label: "Personalizado", desc: "Define tu propio prompt", prompt: "", tools: [] },
];

const ALL_TOOLS = ["web-search", "code-runner", "database", "terminal", "file-system", "api-calls"];


function relTime(iso: string) {
	const diff = Date.now() - new Date(iso).getTime();
	const m = Math.floor(diff / 60000);
	if (m < 60) return `hace ${m}m`;
	const h = Math.floor(m / 60);
	if (h < 24) return `hace ${h}h`;
	return `hace ${Math.floor(h / 24)}d`;
}

type View = "list" | "create" | "detail" | "run" | "history";

export function UserAgentsSection() {
	const [view, setView] = useState<View>("list");
	const [agents, setAgents] = useState<Agent[]>([]);
	const [execs, setExecs] = useState<Execution[]>([]);
	const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		agentService.list()
			.then((data) => setAgents(data))
			.catch((err) => setError(err?.message ?? "Error al cargar los agentes"))
			.finally(() => setLoading(false));
	}, []);

	// Create form
	const [preset, setPreset] = useState(PRESETS[0]);
	const [agentName, setAgentName] = useState("");
	const [agentPrompt, setAgentPrompt] = useState(PRESETS[0].prompt);
	const [agentMemory, setAgentMemory] = useState(false);
	const [agentTools, setAgentTools] = useState<string[]>(PRESETS[0].tools);

	// Run form
	const [runInput, setRunInput] = useState("");
	const [running, setRunning] = useState(false);
	const [runResult, setRunResult] = useState("");

	function handlePresetChange(p: typeof PRESETS[0]) {
		setPreset(p);
		setAgentPrompt(p.prompt);
		setAgentTools(p.tools);
	}

	async function handleCreate() {
		if (!agentName.trim()) return;
		try {
			const created = await agentService.create({
				name: agentName,
				system_prompt: agentPrompt,
				tools: agentTools,
				memory_enabled: agentMemory,
				preset: preset.id !== "custom" ? preset.id : undefined,
			});
			setAgents((prev) => [created, ...prev]);
			setAgentName(""); setAgentPrompt(PRESETS[0].prompt); setAgentMemory(false);
			setAgentTools(PRESETS[0].tools); setPreset(PRESETS[0]);
			setView("list");
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : "Error al crear el agente";
			alert(msg);
		}
	}

	async function handleRun() {
		if (!runInput.trim() || !selectedAgent) return;
		setRunning(true);
		const start = Date.now();
		try {
			const result = await agentService.run(selectedAgent.id, runInput);
			const duration = `${((Date.now() - start) / 1000).toFixed(1)}s`;
			const exec: Execution = {
				id: `x${Date.now()}`, agentId: selectedAgent.id, agentName: selectedAgent.name,
				input: runInput, output: result.output, status: "completed",
				duration: result.execution_time_ms ? `${(result.execution_time_ms / 1000).toFixed(1)}s` : duration,
				date: new Date().toISOString(),
			};
			setExecs((prev) => [exec, ...prev]);
			setRunResult(result.output);
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : "Error al ejecutar el agente";
			setRunResult(`Error: ${msg}`);
		} finally {
			setRunning(false);
		}
	}

	if (view === "create") {
		return (
			<div className="space-y-6">
				<div className="flex items-center gap-3">
					<button onClick={() => setView("list")} className="text-sm text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors">
						← Agentes
					</button>
					<span className="text-[#aeaeb2]">/</span>
					<span className="text-sm font-medium text-[#1d1d1f] dark:text-white">Nuevo agente</span>
				</div>

				<div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-6 space-y-6">
					{/* Preset selector */}
					<div>
						<p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-3">Preset</p>
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
							{PRESETS.map((p) => (
								<button key={p.id} onClick={() => handlePresetChange(p)}
									className={`p-3 rounded-xl border text-left transition-all ${preset.id === p.id ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20" : "border-black/12 dark:border-white/12 hover:bg-black/3 dark:hover:bg-white/3"}`}>
									<p className="text-sm font-medium text-[#1d1d1f] dark:text-white">{p.label}</p>
									<p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-0.5">{p.desc}</p>
								</button>
							))}
						</div>
					</div>

					{/* Name */}
					<div>
						<label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] block mb-2">Nombre del agente</label>
						<input value={agentName} onChange={(e) => setAgentName(e.target.value)} placeholder="Ej: Mi asistente de código"
							className="w-full px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all" />
					</div>

					{/* Prompt */}
					<div>
						<label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] block mb-2">Prompt base</label>
						<textarea value={agentPrompt} onChange={(e) => setAgentPrompt(e.target.value)} rows={5} placeholder="Describe el comportamiento del agente..."
							className="w-full px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all resize-none" />
					</div>

					{/* Tools */}
					<div>
						<label className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] block mb-3">Herramientas</label>
						<div className="flex flex-wrap gap-2">
							{ALL_TOOLS.map((t) => (
								<button key={t} onClick={() => setAgentTools((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t])}
									className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${agentTools.includes(t) ? "bg-blue-600 text-white" : "border border-black/12 dark:border-white/12 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"}`}>
									{t}
								</button>
							))}
						</div>
					</div>

					{/* Memory */}
					<div className="flex items-center justify-between py-3 border-t border-black/5 dark:border-white/5">
						<div>
							<p className="text-sm font-medium text-[#1d1d1f] dark:text-white">Memoria persistente</p>
							<p className="text-xs text-[#6e6e73] dark:text-[#86868b]">El agente recuerda conversaciones anteriores</p>
						</div>
						<button onClick={() => setAgentMemory((v) => !v)}
							className={`w-10 h-6 rounded-full transition-colors relative ${agentMemory ? "bg-blue-600" : "bg-black/20 dark:bg-white/20"}`}>
							<span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${agentMemory ? "translate-x-5" : "translate-x-1"}`} />
						</button>
					</div>

					<div className="flex gap-3 pt-2">
						<button onClick={handleCreate} disabled={!agentName.trim()}
							className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium px-5 py-2 rounded-xl transition-colors">
							Crear agente
						</button>
						<button onClick={() => setView("list")}
							className="border border-black/12 dark:border-white/12 hover:bg-black/5 dark:hover:bg-white/5 text-[#1d1d1f] dark:text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors">
							Cancelar
						</button>
					</div>
				</div>
			</div>
		);
	}

	if (view === "run" && selectedAgent) {
		return (
			<div className="space-y-6">
				<div className="flex items-center gap-3">
					<button onClick={() => { setView("list"); setRunInput(""); setRunResult(""); }} className="text-sm text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors">
						← Agentes
					</button>
					<span className="text-[#aeaeb2]">/</span>
					<span className="text-sm font-medium text-[#1d1d1f] dark:text-white">Ejecutar: {selectedAgent.name}</span>
				</div>

				<div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-6 space-y-4">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/40 flex items-center justify-center">
							<svg className="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<rect x="2" y="6" width="20" height="13" rx="2" strokeWidth={1.5} />
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 11h6M9 14h4" />
							</svg>
						</div>
						<div>
							<p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">{selectedAgent.name}</p>
							<p className="text-xs text-[#6e6e73] dark:text-[#86868b]">{selectedAgent.tools.join(", ")}</p>
						</div>
					</div>

					<textarea value={runInput} onChange={(e) => setRunInput(e.target.value)} rows={4}
						placeholder="Escribe tu consulta al agente..."
						className="w-full px-3 py-2 rounded-xl border border-black/12 dark:border-white/12 bg-black/3 dark:bg-white/5 text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#aeaeb2] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all resize-none" />

					<button onClick={handleRun} disabled={!runInput.trim() || running}
						className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium px-5 py-2 rounded-xl transition-colors">
						{running ? (
							<><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Ejecutando...</>
						) : (
							<><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><circle cx="12" cy="12" r="9" strokeWidth={1.5} /></svg>Ejecutar agente</>
						)}
					</button>

					{runResult && (
						<div className="mt-4 p-4 rounded-xl bg-black/3 dark:bg-white/3 border border-black/8 dark:border-white/8">
							<p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-2">Respuesta</p>
							<p className="text-sm text-[#1d1d1f] dark:text-white whitespace-pre-wrap leading-relaxed">{runResult}</p>
						</div>
					)}
				</div>
			</div>
		);
	}

	if (view === "history") {
		return (
			<div className="space-y-6">
				<div className="flex items-center gap-3">
					<button onClick={() => setView("list")} className="text-sm text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors">
						← Agentes
					</button>
					<span className="text-[#aeaeb2]">/</span>
					<span className="text-sm font-medium text-[#1d1d1f] dark:text-white">Historial de ejecuciones</span>
				</div>

				<div className="space-y-3">
					{execs.map((ex) => (
						<div key={ex.id} className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-4 space-y-3">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
									<span className="text-xs font-medium text-[#1d1d1f] dark:text-white">{ex.agentName}</span>
									<span className="text-xs text-[#aeaeb2]">{ex.duration}</span>
								</div>
								<span className="text-xs text-[#aeaeb2]">{relTime(ex.date)}</span>
							</div>
							<div className="p-3 rounded-lg bg-black/3 dark:bg-white/3">
								<p className="text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] mb-1">Input</p>
								<p className="text-xs text-[#6e6e73] dark:text-[#86868b] truncate">{ex.input}</p>
							</div>
							<div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
								<p className="text-[10px] font-semibold uppercase tracking-wider text-blue-400 mb-1">Respuesta</p>
								<p className="text-xs text-[#1d1d1f] dark:text-white line-clamp-3 whitespace-pre-wrap">{ex.output}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	// List view
	return (
		<div className="space-y-6">
			{error && (
				<div className="rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">
					{error}
				</div>
			)}
			<div className="flex items-start justify-between gap-4">
				<div>
					<h2 className="text-lg font-semibold text-[#1d1d1f] dark:text-white">Agentes IA</h2>
					<p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-0.5">Crea y gestiona tus asistentes inteligentes personalizados</p>
				</div>
				<div className="flex gap-2">
					<button onClick={() => setView("history")}
						className="border border-black/12 dark:border-white/12 hover:bg-black/5 dark:hover:bg-white/5 text-[#1d1d1f] dark:text-white text-sm font-medium px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5">
						<svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
						Historial
					</button>
					<button onClick={() => setView("create")}
						className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5">
						<svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
						Nuevo agente
					</button>
				</div>
			</div>

			{loading ? (
				<div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] py-16 text-center">
					<div className="w-6 h-6 rounded-full border-2 border-black/20 dark:border-white/20 border-t-blue-500 animate-spin mx-auto" />
					<p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-3">Cargando agentes...</p>
				</div>
			) : agents.length === 0 ? (
				<div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] py-16 text-center">
					<p className="text-sm text-[#6e6e73] dark:text-[#86868b]">No tienes agentes creados</p>
					<p className="text-xs text-[#aeaeb2] dark:text-[#636366] mt-1">Crea tu primer agente personalizado</p>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-4">
					{agents.map((agent) => (
						<div key={agent.id} className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-5">
							<div className="flex items-start justify-between gap-4">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/40 flex items-center justify-center flex-shrink-0">
										<svg className="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<rect x="2" y="6" width="20" height="13" rx="2" strokeWidth={1.5} />
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 11h6M9 14h4M12 3v3" />
										</svg>
									</div>
									<div>
										<p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">{agent.name}</p>
										<div className="flex items-center gap-2 mt-1 flex-wrap">
											<span className="px-2 py-0.5 rounded-full bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 text-xs font-medium">
												{PRESETS.find((p) => p.id === agent.preset)?.label || agent.preset}
											</span>
											{agent.memory_enabled && <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs">memoria</span>}
											{agent.tools.slice(0, 2).map((t) => (
												<span key={t} className="text-xs text-[#aeaeb2] dark:text-[#636366]">{t}</span>
											))}
										</div>
									</div>
								</div>
								<div className="text-right shrink-0">
									<p className="text-xs text-[#aeaeb2] dark:text-[#636366]">{relTime(agent.created_at)}</p>
								</div>
							</div>
							<p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-3 line-clamp-2">{agent.system_prompt}</p>
							<div className="flex gap-2 mt-4">
								<button onClick={() => { setSelectedAgent(agent); setRunInput(""); setRunResult(""); setView("run"); }}
									className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5">
									<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /></svg>
									Ejecutar
								</button>
								<button onClick={async () => {
										try {
											await agentService.delete(agent.id);
											setAgents((prev) => prev.filter((a) => a.id !== agent.id));
										} catch (err: unknown) {
											const msg = err instanceof Error ? err.message : "Error al eliminar";
											alert(msg);
										}
									}}
									className="text-xs text-[#aeaeb2] hover:text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors">
									Eliminar
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
