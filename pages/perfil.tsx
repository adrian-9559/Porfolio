import DefaultLayout from "@/layouts/default";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import Link from "next/link";
import { allContent } from "@/lib/blog/registry";

const SERVICES = [
	{ id: "repositories", label: "Repositorios Git", icon: "📂", desc: "Explora tus repos de GitHub", href: "/dashboard?s=repositories", color: "from-sky-400 to-blue-500" },
	{ id: "agents", label: "Agentes IA", icon: "🤖", desc: "Orquesta agentes IA", href: "/dashboard?s=agents", color: "from-violet-400 to-purple-500" },
	{ id: "tricount", label: "Escote", icon: "💸", desc: "Gastos compartidos", href: "/dashboard?s=tricount", color: "from-emerald-400 to-green-500" },
	{ id: "friends", label: "Amigos", icon: "👥", desc: "Sistema de amigos", href: "/dashboard?s=friends", color: "from-pink-400 to-rose-500" },
	{ id: "notifications", label: "Notificaciones", icon: "🔔", desc: "Centro de avisos", href: "/dashboard?s=notifications", color: "from-amber-400 to-orange-500" },
];

const articles = allContent.filter(c => c.type === "article").slice(0, 5);
const tutorials = allContent.filter(c => c.type === "tutorial").slice(0, 5);
const tools = allContent.filter(c => c.type === "tool").slice(0, 5);

const QUICK_ACTIONS = [
	{ label: "Panel", href: "/dashboard", icon: "🏠" },
	{ label: "Configuración", href: "/configuracion", icon: "⚙️" },
	{ label: "Blog", href: "/blog", icon: "📚" },
];

export default function PerfilPage() {
	const { isAuthenticated, loadingAuth } = useRequireAuth();
	const { user, isAdmin } = useAuth();
	const router = useRouter();

	if (loadingAuth || !isAuthenticated) {
		return (
			<DefaultLayout>
				<div className="flex justify-center py-20">
					<div className="w-5 h-5 rounded-full border-2 border-blue-600/30 border-t-blue-600 animate-spin" />
				</div>
			</DefaultLayout>
		);
	}

	const displayName = user?.profile?.full_name ?? user?.email ?? "Usuario";
	const firstName = displayName.split(" ")[0];
	const initials = displayName.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();
	const memberSince = (user as any)?.created_at ? new Date((user as any).created_at).getFullYear() : new Date().getFullYear();

	const stats = [
		{ label: "Artículos", value: allContent.filter(c => c.type === "article").length, icon: "📖", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/30" },
		{ label: "Tutoriales", value: allContent.filter(c => c.type === "tutorial").length, icon: "🎓", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/30" },
		{ label: "Herramientas", value: allContent.filter(c => c.type === "tool").length, icon: "🔧", color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-950/30" },
		{ label: "Servicios", value: SERVICES.length, icon: "⚡", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
	];

	return (
		<DefaultLayout>
			<div className="max-w-5xl mx-auto space-y-6">
				{/* Breadcrumb */}
				<div className="flex items-center gap-2">
					<Link href="/dashboard" className="text-xs text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors">Panel</Link>
					<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">/</span>
					<span className="text-xs text-[#1d1d1f] dark:text-white font-medium">Mi perfil</span>
				</div>

				{/* Hero card */}
				<div className="rounded-3xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] overflow-hidden">
					{/* Banner */}
					<div className="h-36 relative bg-gradient-to-r from-blue-600 via-violet-600 to-pink-500">
						<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
						<button onClick={() => router.push("/configuracion")}
							className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-sm text-white text-xs font-medium hover:bg-white/30 transition-colors">
							<IcoGear />
							Configuración
						</button>
					</div>

					{/* Profile info */}
					<div className="px-6 pb-6">
						<div className="flex items-end justify-between gap-4 -mt-12 mb-5">
							<div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white text-2xl font-bold border-4 border-white dark:border-[#111116] overflow-hidden flex-shrink-0 shadow-xl">
								{user?.profile?.avatar_url
									? <img src={user.profile.avatar_url} alt="" className="w-full h-full object-cover" />
									: initials
								}
							</div>
							<div className="pb-1 flex gap-2">
								{isAdmin && (
									<span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
										Admin
									</span>
								)}
								<span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
									Activo
								</span>
							</div>
						</div>
						<h1 className="text-2xl font-bold text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.02em" }}>
							Hola, {firstName} 👋
						</h1>
						<p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-0.5">{user?.email}</p>
						<p className="text-xs text-[#aeaeb2] dark:text-[#636366] mt-1">📅 Miembro desde {memberSince}</p>
					</div>

					{/* Stats bar */}
					<div className="border-t border-black/8 dark:border-white/8 grid grid-cols-4">
						{stats.map((s, i) => (
							<div key={s.label} className={`flex flex-col items-center py-4 px-2 ${i < stats.length - 1 ? "border-r border-black/8 dark:border-white/8" : ""}`}>
								<span className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm mb-2 ${s.bg}`}>{s.icon}</span>
								<p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
								<p className="text-[10px] text-[#aeaeb2] dark:text-[#636366] mt-0.5">{s.label}</p>
							</div>
						))}
					</div>
				</div>

				{/* Services */}
				<div>
					<h2 className="text-base font-bold text-[#1d1d1f] dark:text-white mb-3">Servicios disponibles</h2>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
						{SERVICES.map(s => (
							<Link key={s.id} href={s.href}
								className="group p-4 rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] hover:border-black/15 dark:hover:border-white/15 hover:shadow-md transition-all text-center no-underline">
								<div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-lg mx-auto mb-2.5 group-hover:scale-110 transition-transform`}>
									{s.icon}
								</div>
								<p className="text-xs font-semibold text-[#1d1d1f] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{s.label}</p>
								<p className="text-[10px] text-[#6e6e73] dark:text-[#86868b] mt-0.5 leading-tight">{s.desc}</p>
							</Link>
						))}
					</div>
				</div>

				{/* Blog content + Quick actions row */}
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
					<div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
						<ContentGroup title="Artículos" emoji="📖" items={articles} href="/blog/articulos" color="text-amber-600 dark:text-amber-400" />
						<ContentGroup title="Tutoriales" emoji="🎓" items={tutorials} href="/blog/tutoriales" color="text-blue-600 dark:text-blue-400" />
						<ContentGroup title="Herramientas" emoji="🔧" items={tools} href="/blog/herramientas" color="text-violet-600 dark:text-violet-400" />
					</div>

					{/* Quick actions vertical */}
					<div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-4 flex flex-col gap-2">
						<h3 className="text-xs font-bold text-[#1d1d1f] dark:text-white mb-1">Acciones rápidas</h3>
						{QUICK_ACTIONS.map(a => (
							<Link key={a.href} href={a.href}
								className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 text-xs font-medium text-[#1d1d1f] dark:text-white transition-all no-underline">
								<span className="text-sm">{a.icon}</span>
								{a.label}
							</Link>
						))}
						<div className="mt-auto pt-2">
							<button onClick={() => router.push("/configuracion")}
								className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] text-xs font-medium hover:opacity-80 transition-opacity">
								<IcoGear />
								Editar perfil
							</button>
						</div>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
}

function ContentGroup({ title, emoji, items, href, color }: { title: string; emoji: string; items: typeof articles; href: string; color: string }) {
	return (
		<div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-4">
			<div className="flex items-center justify-between mb-3">
				<div className="flex items-center gap-1.5">
					<span>{emoji}</span>
					<h3 className="text-sm font-bold text-[#1d1d1f] dark:text-white">{title}</h3>
				</div>
				<Link href={href} className={`text-xs font-medium ${color} hover:underline no-underline`}>
					Ver todos →
				</Link>
			</div>
			<ul className="space-y-2">
				{items.map(item => (
					<li key={item.id}>
						<Link href={`/blog/${item.slug}`} className="text-xs text-[#3d3d3d] dark:text-[#c0c0c5] hover:text-[#1d1d1f] dark:hover:text-white transition-colors no-underline line-clamp-1">
							{item.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

function IcoGear() {
	return (
		<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
			<circle cx="8" cy="8" r="2" />
			<path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" />
		</svg>
	);
}
