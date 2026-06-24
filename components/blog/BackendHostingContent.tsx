import Link from "next/link";
import { getWebsiteImage } from "@/functions/getWebSiteInfo";

const platforms = [
	{
		name: "Railway",
		url: "https://railway.app",
		badge: "⭐ Recomendado",
		badgeColor: "bg-violet-100 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800/50",
		plan: "$5/mes crédito gratis",
		planColor: "text-green-600 dark:text-green-400",
		description: "La plataforma de backend más cómoda en 2026. Deploy desde GitHub en segundos, variables de entorno desde la interfaz y soporte para casi cualquier stack: Node.js, Python, Rust, Go, Docker…",
		pros: ["Deploy en 1 clic desde GitHub", "Variables de entorno en UI", "PostgreSQL/MySQL/Redis integrados", "Logs y métricas en tiempo real", "Escala automáticamente"],
		cons: ["Plan gratuito tiene $5/mes de crédito (se agota)", "Sin free tier permanente tras el cambio de 2024"],
	},
	{
		name: "Render",
		url: "https://render.com",
		badge: "Free tier",
		badgeColor: "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50",
		plan: "Gratis (con límites)",
		planColor: "text-green-600 dark:text-green-400",
		description: "Buena alternativa a Heroku. Ofrece servicios web, workers, cron jobs y bases de datos. El plan gratuito incluye servicios web que se apagan tras 15 min de inactividad.",
		pros: ["Servicios web gratuitos", "PostgreSQL gratuito (90 días)", "Cron jobs integrados", "Deploy desde Docker o Git"],
		cons: ["Servicios gratuitos se apagan tras inactividad (cold start ~30s)", "PostgreSQL gratuito expira a los 90 días"],
	},
	{
		name: "Fly.io",
		url: "https://fly.io",
		badge: "Para Docker",
		badgeColor: "bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/50",
		plan: "Gratis limitado",
		planColor: "text-green-600 dark:text-green-400",
		description: "Ejecuta contenedores Docker en múltiples regiones. Perfecto para apps que necesitan estar cerca del usuario en todo el mundo. El plan gratuito incluye 3 VMs pequeñas.",
		pros: ["Despliegue en múltiples regiones", "Volumenes persistentes", "3 VMs gratis siempre", "Soporte nativo de SQLite + LiteFS", "flyctl CLI muy potente"],
		cons: ["Curva de aprendizaje mayor", "Requiere conocimiento de Docker", "Configuración vía TOML"],
	},
	{
		name: "Koyeb",
		url: "https://koyeb.com",
		badge: "Generoso gratis",
		badgeColor: "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/50",
		plan: "Gratis generoso",
		planColor: "text-green-600 dark:text-green-400",
		description: "Alternativa emergente con un plan gratuito sin expiración. Soporta Node.js, Python, Go y Docker. No duerme los servicios como Render. Edge deployment en múltiples regiones.",
		pros: ["Servicios gratuitos sin cold start", "Sin límite de tiempo en plan gratuito", "Edge functions incluidas", "Deploy desde Git o Docker"],
		cons: ["Comunidad y documentación más limitada", "Menos integraciones que Railway o Render"],
	},
	{
		name: "DigitalOcean App Platform",
		url: "https://www.digitalocean.com/products/app-platform",
		badge: "Producción",
		badgeColor: "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50",
		plan: "Desde $5/mes",
		planColor: "text-amber-600 dark:text-amber-400",
		description: "La opción más robusta para producción seria. Managed databases, load balancers, CDN y scaling automático. Más caro pero más confiable para apps con usuarios reales.",
		pros: ["SLA 99.99% de uptime", "Managed databases (PostgreSQL, MySQL)", "Scaling horizontal automático", "Red global con CDN", "Soporte técnico real"],
		cons: ["Sin plan gratuito real", "Más caro que las alternativas", "Overkill para proyectos personales"],
	},
	{
		name: "Cloudflare Workers",
		url: "https://workers.cloudflare.com",
		badge: "Serverless",
		badgeColor: "bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800/50",
		plan: "100k req/día gratis",
		planColor: "text-green-600 dark:text-green-400",
		description: "Edge computing de Cloudflare. Ejecuta código JavaScript/TypeScript en la red de Cloudflare en más de 200 ubicaciones. Ideal para APIs ultrarrápidas y middleware global.",
		pros: ["100.000 requests/día gratuitos", "Latencia <10ms en todo el mundo", "KV Store, Durable Objects y R2", "Despliegue instantáneo", "Gratis para muchos proyectos reales"],
		cons: ["Sin Node.js nativo (runtime propio)", "No es un servidor tradicional", "Limitaciones de CPU (10ms por request en free)"],
	},
];

const casos = [
	{ caso: "API REST de hobby/portfolio", recomendacion: "Railway o Koyeb", razon: "Fácil de usar, suficiente gratis" },
	{ caso: "App con muchos usuarios (>10k/mes)", recomendacion: "DigitalOcean / Railway paid", razon: "SLA, scaling y soporte" },
	{ caso: "API global con baja latencia", recomendacion: "Cloudflare Workers + Fly.io", razon: "Edge computing" },
	{ caso: "Microservicio o workers", recomendacion: "Cloudflare Workers", razon: "100k req/día gratis" },
	{ caso: "App completa (frontend + backend)", recomendacion: "Railway", razon: "Todo en un sitio" },
	{ caso: "Demo o PoC rápido", recomendacion: "Render (free tier)", razon: "Rápido de configurar" },
];

export default function BackendHostingContent() {
	return (
		<article className="max-w-3xl">
			{/* Header */}
			<div className="space-y-3 mb-10">
				<div className="flex items-center gap-2 flex-wrap">
					<span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
						Backend
					</span>
					<span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
						Hosting
					</span>
					<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">8 min de lectura</span>
					<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">·</span>
					<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">25 jun 2026</span>
				</div>
				<h1 className="text-4xl font-bold text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.02em" }}>
					Mejores plataformas para hostear backend
				</h1>
				<p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
					Dónde alojar tu API, servidor Node.js, Python, Go o cualquier backend en 2026. Con planes gratuitos, análisis honesto y guía de cuándo usar cada uno.
				</p>
			</div>

			{/* Intro */}
			<div className="prose prose-sm dark:prose-invert max-w-none mb-10">
				<p className="text-[#3d3d3d] dark:text-[#c0c0c5] leading-relaxed">
					Elegir dónde alojar tu backend es más crítico que el frontend: afecta a la latencia, la disponibilidad y el coste de escalar. El mercado ha cambiado mucho: Heroku ya no es la opción obvia y hay alternativas mejores para casi todos los casos de uso.
				</p>
				<div className="mt-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40">
					<p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300 mb-1">⚡ Regla rápida</p>
					<p className="text-sm text-emerald-700 dark:text-emerald-400">Para proyectos personales → Railway (mejor DX). Para producción seria → DigitalOcean. Para APIs globales ultrarrápidas → Cloudflare Workers.</p>
				</div>
			</div>

			{/* Platforms */}
			<div className="space-y-5 mb-12">
				{platforms.map((p) => (
					<div key={p.url} className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] overflow-hidden">
						<div className="p-5">
							<div className="flex items-start justify-between gap-4 mb-3">
								<div className="flex items-center gap-3">
									<div className="w-9 h-9 rounded-xl bg-white dark:bg-[#1c1c22] border border-black/8 dark:border-white/8 flex items-center justify-center overflow-hidden flex-shrink-0">
										<img src={getWebsiteImage(p.url)} alt={p.name} className="w-6 h-6 object-contain" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
									</div>
									<div>
										<div className="flex items-center gap-2 flex-wrap">
											<Link href={p.url} target="_blank" rel="noopener noreferrer" className="font-bold text-base text-[#1d1d1f] dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors no-underline">
												{p.name}
											</Link>
											<span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${p.badgeColor}`}>{p.badge}</span>
										</div>
										<span className={`text-xs font-semibold ${p.planColor}`}>{p.plan}</span>
									</div>
								</div>
							</div>

							<p className="text-sm text-[#3d3d3d] dark:text-[#c0c0c5] leading-relaxed mb-4">{p.description}</p>

							<div className="grid grid-cols-2 gap-3">
								<div>
									<p className="text-[10px] font-bold text-green-700 dark:text-green-400 uppercase tracking-wider mb-1.5">✅ Pros</p>
									<ul className="space-y-1">
										{p.pros.map(pro => <li key={pro} className="text-xs text-[#3d3d3d] dark:text-[#c0c0c5]">• {pro}</li>)}
									</ul>
								</div>
								<div>
									<p className="text-[10px] font-bold text-red-700 dark:text-red-400 uppercase tracking-wider mb-1.5">⚠️ Contras</p>
									<ul className="space-y-1">
										{p.cons.map(con => <li key={con} className="text-xs text-[#3d3d3d] dark:text-[#c0c0c5]">• {con}</li>)}
									</ul>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Casos de uso */}
			<div className="mb-10">
				<h2 className="text-xl font-bold text-[#1d1d1f] dark:text-white mb-4">¿Cuál usar según tu caso?</h2>
				<div className="overflow-x-auto rounded-xl border border-black/8 dark:border-white/8">
					<table className="w-full text-xs">
						<thead>
							<tr className="bg-black/3 dark:bg-white/3 border-b border-black/8 dark:border-white/8">
								{["Caso de uso", "Recomendación", "Por qué"].map(h => (
									<th key={h} className="px-3 py-2 text-left font-semibold text-[#1d1d1f] dark:text-white">{h}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{casos.map((row, i) => (
								<tr key={row.caso} className={`border-b border-black/6 dark:border-white/6 last:border-0 ${i % 2 === 0 ? "" : "bg-black/[0.015] dark:bg-white/[0.015]"}`}>
									<td className="px-3 py-2 text-[#1d1d1f] dark:text-white font-medium">{row.caso}</td>
									<td className="px-3 py-2 font-semibold text-emerald-700 dark:text-emerald-400">{row.recomendacion}</td>
									<td className="px-3 py-2 text-[#6e6e73] dark:text-[#86868b]">{row.razon}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Tip final */}
			<div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20 border border-emerald-200 dark:border-emerald-800/40">
				<h3 className="font-bold text-[#1d1d1f] dark:text-white mb-2">💡 Mi recomendación personal</h3>
				<p className="text-sm text-[#3d3d3d] dark:text-[#c0c0c5] leading-relaxed">
					Para proyectos personales uso <strong>Railway</strong>: la mejor experiencia de desarrollo, deploy en segundos y todo en un panel. Para APIs que necesitan escalar globalmente, <strong>Cloudflare Workers</strong> es imbatible en precio y rendimiento.
				</p>
			</div>
		</article>
	);
}
