import DefaultLayout from "@/layouts/default";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import Link from "next/link";
import { allContent } from "@/lib/blog/registry";

const SERVICES = [
	{ id: "repositories", label: "Repositorios Git", icon: "📂", desc: "Visualiza y explora tus repos de GitHub", href: "/dashboard?s=repositories", color: "from-sky-400 to-blue-500" },
	{ id: "agents", label: "Agentes IA", icon: "🤖", desc: "Orquesta agentes de inteligencia artificial", href: "/dashboard?s=agents", color: "from-violet-400 to-purple-500" },
	{ id: "tricount", label: "Escote", icon: "💸", desc: "Gestión de gastos compartidos", href: "/dashboard?s=tricount", color: "from-emerald-400 to-green-500" },
	{ id: "friends", label: "Amigos", icon: "👥", desc: "Sistema de amigos y contactos", href: "/dashboard?s=friends", color: "from-pink-400 to-rose-500" },
	{ id: "notifications", label: "Notificaciones", icon: "🔔", desc: "Centro de notificaciones", href: "/dashboard?s=notifications", color: "from-amber-400 to-orange-500" },
];

const articles = allContent.filter(c => c.type === "article").slice(0, 6);
const tutorials = allContent.filter(c => c.type === "tutorial").slice(0, 6);
const tools = allContent.filter(c => c.type === "tool").slice(0, 6);

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
	const initials = displayName.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();
	const memberSince = (user as any)?.created_at ? new Date((user as any).created_at).getFullYear() : new Date().getFullYear();

	return (
		<DefaultLayout>
			<div className="max-w-4xl mx-auto space-y-8">
				{/* Header */}
				<div className="flex items-start justify-between gap-4 flex-wrap">
					<div>
						<div className="flex items-center gap-2 mb-2">
							<Link href="/dashboard" className="text-xs text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors">
								Panel
							</Link>
							<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">/</span>
							<span className="text-xs text-[#1d1d1f] dark:text-white font-medium">Mi perfil</span>
						</div>
						<h1 className="text-3xl font-bold text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.02em" }}>Mi perfil</h1>
						<p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-1">Resumen de tu actividad y servicios disponibles</p>
					</div>
					<button onClick={() => router.push("/configuracion")}
						className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 text-sm font-medium text-[#1d1d1f] dark:text-white hover:bg-black/8 dark:hover:bg-white/8 transition-colors">
						<IcoGear />
						Configuración
					</button>
				</div>

				{/* User card */}
				<div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] overflow-hidden">
					<div className="h-24 bg-gradient-to-r from-blue-600 via-violet-600 to-pink-500" />
					<div className="px-6 pb-6">
						<div className="flex items-end gap-4 -mt-10 mb-4">
							<div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white text-2xl font-bold border-4 border-white dark:border-[#111116] overflow-hidden flex-shrink-0">
								{user?.profile?.avatar_url
									? <img src={user.profile.avatar_url} alt="" className="w-full h-full object-cover" />
									: initials
								}
							</div>
							<div className="pb-1">
								<h2 className="text-xl font-bold text-[#1d1d1f] dark:text-white">{displayName}</h2>
								<p className="text-sm text-[#6e6e73] dark:text-[#86868b]">{user?.email}</p>
							</div>
						</div>
						<div className="flex items-center gap-4 flex-wrap">
							<span className="flex items-center gap-1.5 text-xs text-[#6e6e73] dark:text-[#86868b]">
								<span>📅</span> Miembro desde {memberSince}
							</span>
							{isAdmin && (
								<span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
									Admin
								</span>
							)}
							<span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
								Activo
							</span>
						</div>
					</div>
				</div>

				{/* Services */}
				<div>
					<h2 className="text-lg font-bold text-[#1d1d1f] dark:text-white mb-4">Servicios disponibles</h2>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
						{SERVICES.map(s => (
							<Link key={s.id} href={s.href}
								className="group p-4 rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] hover:border-black/15 dark:hover:border-white/15 hover:shadow-md transition-all text-center no-underline">
								<div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-lg mx-auto mb-2.5`}>
									{s.icon}
								</div>
								<p className="text-xs font-semibold text-[#1d1d1f] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{s.label}</p>
								<p className="text-[10px] text-[#6e6e73] dark:text-[#86868b] mt-0.5 leading-tight">{s.desc}</p>
							</Link>
						))}
					</div>
				</div>

				{/* Blog content overview */}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
					<ContentGroup title="Artículos" emoji="📖" items={articles} href="/blog/articulos" color="text-amber-600 dark:text-amber-400" />
					<ContentGroup title="Tutoriales" emoji="🎓" items={tutorials} href="/blog/tutoriales" color="text-blue-600 dark:text-blue-400" />
					<ContentGroup title="Herramientas" emoji="🔧" items={tools} href="/blog/herramientas" color="text-violet-600 dark:text-violet-400" />
				</div>

				{/* Quick actions */}
				<div className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] p-5">
					<h2 className="text-sm font-bold text-[#1d1d1f] dark:text-white mb-4">Acciones rápidas</h2>
					<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
						{[
							{ label: "Ir al panel", href: "/dashboard", icon: "🏠" },
							{ label: "Configuración", href: "/configuracion", icon: "⚙️" },
							{ label: "Explorar blog", href: "/blog", icon: "📚" },
							{ label: "Ver portfolio", href: "/", icon: "🌐" },
						].map(a => (
							<Link key={a.href} href={a.href}
								className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 text-sm font-medium text-[#1d1d1f] dark:text-white transition-all no-underline">
								<span>{a.icon}</span>
								{a.label}
							</Link>
						))}
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
		<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
			<circle cx="8" cy="8" r="2" />
			<path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" />
		</svg>
	);
}
