import { useState, useEffect } from "react";
import { notificationService } from "@/services/notificationService";

type NotifType = "sistema" | "agente" | "repositorio" | "admin" | "tricount";

interface Notif {
	id: string;
	type: NotifType;
	title: string;
	body: string;
	read: boolean;
	date: string;
}

// Map backend types ("info" | "admin" | "system") to local UI types
function mapApiType(apiType: string): NotifType {
	if (apiType === "admin") return "admin";
	if (apiType === "system") return "sistema";
	// "info" and anything else → "sistema"
	return "sistema";
}

const TYPE_CONFIG: Record<NotifType, { label: string; color: string; dot: string }> = {
	sistema:     { label: "Sistema",      color: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400",     dot: "bg-blue-500" },
	agente:      { label: "Agente IA",    color: "bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400", dot: "bg-violet-500" },
	repositorio: { label: "Repositorio",  color: "bg-slate-50 dark:bg-slate-950/30 text-slate-600 dark:text-slate-400",  dot: "bg-slate-500" },
	admin:       { label: "Admin",        color: "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400",  dot: "bg-amber-500" },
	tricount:    { label: "Escote",       color: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500" },
};

function relTime(iso: string) {
	const diff = Date.now() - new Date(iso).getTime();
	const m = Math.floor(diff / 60000);
	if (m < 60) return `hace ${m}m`;
	const h = Math.floor(m / 60);
	if (h < 24) return `hace ${h}h`;
	return `hace ${Math.floor(h / 24)}d`;
}

export function UserNotificationsSection() {
	const [notifs, setNotifs] = useState<Notif[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [filter, setFilter] = useState<NotifType | "all" | "unread">("all");

	useEffect(() => {
		setLoading(true);
		notificationService.getAll()
			.then(({ notifications }) => {
				setNotifs(notifications.map((n) => ({
					id: n.id,
					type: mapApiType(n.type),
					title: n.title,
					body: n.message,
					read: n.read,
					date: n.created_at,
				})));
				setError(null);
			})
			.catch(() => setError("No se pudieron cargar las notificaciones."))
			.finally(() => setLoading(false));
	}, []);

	const unreadCount = notifs.filter((n) => !n.read).length;

	const filtered = notifs.filter((n) => {
		if (filter === "unread") return !n.read;
		if (filter === "all") return true;
		return n.type === filter;
	});

	function markAll() {
		notificationService.markAllRead().catch(() => {});
		setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
	}

	function markOne(id: string) {
		notificationService.markRead(id).catch(() => {});
		setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
	}

	function remove(id: string) {
		notificationService.deleteOne(id).catch(() => {});
		setNotifs((prev) => prev.filter((n) => n.id !== id));
	}

	const FILTERS: { id: NotifType | "all" | "unread"; label: string }[] = [
		{ id: "all", label: "Todas" },
		{ id: "unread", label: `Sin leer (${unreadCount})` },
		{ id: "sistema", label: "Sistema" },
		{ id: "agente", label: "Agentes" },
		{ id: "repositorio", label: "Repositorios" },
		{ id: "tricount", label: "Escote" },
		{ id: "admin", label: "Admin" },
	];

	return (
		<div className="space-y-6">
			<div className="flex items-start justify-between gap-4">
				<div>
					<h2 className="text-lg font-semibold text-[#1d1d1f] dark:text-white">Notificaciones</h2>
					<p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-0.5">
						{unreadCount > 0 ? `${unreadCount} sin leer` : "Todo al día"}
					</p>
				</div>
				{unreadCount > 0 && (
					<button onClick={markAll}
						className="border border-black/12 dark:border-white/12 hover:bg-black/5 dark:hover:bg-white/5 text-[#1d1d1f] dark:text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors">
						Marcar todas como leídas
					</button>
				)}
			</div>

			{/* Loading / error */}
			{loading && (
				<div className="flex items-center gap-2">
					<span className="w-5 h-5 rounded-full border-2 border-blue-600/30 border-t-blue-600 animate-spin" />
					<span className="text-sm text-[#6e6e73] dark:text-[#86868b]">Cargando…</span>
				</div>
			)}
			{error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}

			{/* Filter chips */}
			<div className="flex flex-wrap gap-2">
				{FILTERS.map((f) => (
					<button key={f.id} onClick={() => setFilter(f.id)}
						className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
							filter === f.id
								? "bg-blue-600 text-white"
								: "border border-black/12 dark:border-white/12 text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"
						}`}>
						{f.label}
					</button>
				))}
			</div>

			{/* List */}
			{filtered.length === 0 ? (
				<div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] py-16 text-center">
					<p className="text-sm text-[#6e6e73] dark:text-[#86868b]">No hay notificaciones</p>
				</div>
			) : (
				<div className="space-y-2">
					{filtered.map((n) => {
						const cfg = TYPE_CONFIG[n.type];
						return (
							<div key={n.id}
								className={`flex items-start gap-4 p-4 rounded-2xl border transition-colors ${
									n.read
										? "border-black/8 dark:border-white/8 bg-white dark:bg-[#111116]"
										: "border-blue-200 dark:border-blue-800/40 bg-blue-50/50 dark:bg-blue-950/10"
								}`}>
								{/* Dot */}
								<div className="mt-1.5 flex-shrink-0">
									{!n.read ? (
										<span className="w-2 h-2 rounded-full bg-blue-500 block" />
									) : (
										<span className="w-2 h-2 rounded-full bg-transparent border border-black/15 dark:border-white/15 block" />
									)}
								</div>

								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2 flex-wrap mb-1">
										<span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${cfg.color}`}>
											{cfg.label}
										</span>
										<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">{relTime(n.date)}</span>
									</div>
									<p className="text-sm font-medium text-[#1d1d1f] dark:text-white">{n.title}</p>
									<p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-0.5">{n.body}</p>
								</div>

								<div className="flex items-center gap-1 shrink-0">
									{!n.read && (
										<button onClick={() => markOne(n.id)} title="Marcar como leída"
											className="p-1.5 rounded-lg text-[#aeaeb2] hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors">
											<svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
										</button>
									)}
									<button onClick={() => remove(n.id)} title="Eliminar"
										className="p-1.5 rounded-lg text-[#aeaeb2] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors">
										<svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
									</button>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
