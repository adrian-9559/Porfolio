import Link from "next/link";
import { getWebsiteImage } from "@/functions/getWebSiteInfo";

const platforms = [
	{
		name: "Vercel",
		url: "https://vercel.com",
		badge: "⭐ Recomendado",
		badgeColor: "bg-violet-100 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800/50",
		plan: "Gratis generoso",
		planColor: "text-green-600 dark:text-green-400",
		description: "La plataforma creada por el equipo de Next.js. Despliegue automático desde GitHub, preview deployments por PR y edge functions globales. Es el estándar actual para apps React y Next.js.",
		pros: ["Deploy instantáneo desde GitHub/GitLab", "Preview por cada Pull Request", "Edge Network en 70+ regiones", "Analytics integrado", "Perfect para Next.js"],
		cons: ["Plan gratuito tiene límite de 100GB/mes de ancho de banda", "Builds lentos en plan gratuito"],
	},
	{
		name: "Netlify",
		url: "https://netlify.com",
		badge: "Muy popular",
		badgeColor: "bg-teal-100 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800/50",
		plan: "Gratis generoso",
		planColor: "text-green-600 dark:text-green-400",
		description: "Pionero en el JAMstack. Excelente para sites estáticos, Gatsby, Astro y cualquier framework. Incluye forms, identidad y funciones serverless.",
		pros: ["Formularios gratuitos (100 envíos/mes)", "Despliegue visual drag & drop", "Split testing integrado", "Netlify Functions (serverless)"],
		cons: ["Build minutes limitados en plan gratuito (300 min/mes)", "Menor optimización para Next.js que Vercel"],
	},
	{
		name: "Cloudflare Pages",
		url: "https://pages.cloudflare.com",
		badge: "Más generoso",
		badgeColor: "bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800/50",
		plan: "Gratis ilimitado",
		planColor: "text-green-600 dark:text-green-400",
		description: "La opción más generosa en plan gratuito. Requests ilimitados, ancho de banda ilimitado y acceso a la red de Cloudflare. Workers para lógica serverless.",
		pros: ["Ancho de banda ilimitado gratis", "Requests ilimitados gratis", "Red global de Cloudflare (<50ms)", "Cloudflare Workers integrado"],
		cons: ["Ecosistema menos maduro para Next.js", "Algo más complejo de configurar"],
	},
	{
		name: "GitHub Pages",
		url: "https://pages.github.com",
		badge: "Solo estáticos",
		badgeColor: "bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700/50",
		plan: "Gratis",
		planColor: "text-green-600 dark:text-green-400",
		description: "Hosting estático directamente desde tu repositorio de GitHub. Ideal para portfolios, documentación y proyectos open source. No soporta SSR.",
		pros: ["100% gratuito siempre", "Integración perfecta con GitHub", "Dominio github.io incluido", "Ideal para proyectos open source"],
		cons: ["Solo sitios estáticos (sin SSR/API routes)", "Builds más lentos", "Sin funciones serverless"],
	},
	{
		name: "Render",
		url: "https://render.com",
		badge: "Full-stack",
		badgeColor: "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50",
		plan: "Gratis limitado",
		planColor: "text-amber-600 dark:text-amber-400",
		description: "Plataforma completa que soporta tanto frontend estático como backend. Perfecta cuando tu app tiene frontend + API en el mismo proyecto.",
		pros: ["Static Sites gratuitos", "Se integra con backend en Render", "Redirecciones y headers configurables", "Auto-deploy desde Git"],
		cons: ["Los servicios gratuitos se apagan tras inactividad", "Sin Edge Network avanzado"],
	},
	{
		name: "Surge",
		url: "https://surge.sh",
		badge: "Super simple",
		badgeColor: "bg-pink-100 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800/50",
		plan: "Gratis",
		planColor: "text-green-600 dark:text-green-400",
		description: "La forma más rápida de publicar un site estático. Un solo comando en terminal y listo. Perfecto para demos rápidas y prototipos.",
		pros: ["Un solo comando: surge ./dist", "Dominio personalizado gratuito", "Sin registro requerido", "Ideal para demos rápidas"],
		cons: ["Solo sitios estáticos", "Sin CI/CD nativo", "Sin funciones serverless"],
	},
];

const comparativa = [
	{ plataforma: "Vercel", next: "✅ Nativo", react: "✅", vue: "✅", angular: "✅", gratis: "100GB BW" },
	{ plataforma: "Netlify", next: "✅", react: "✅", vue: "✅", angular: "✅", gratis: "100GB BW" },
	{ plataforma: "CF Pages", next: "🔶 Parcial", react: "✅", vue: "✅", angular: "✅", gratis: "Ilimitado" },
	{ plataforma: "GitHub Pages", next: "❌ Solo export", react: "✅ Static", vue: "✅ Static", angular: "✅ Static", gratis: "1GB storage" },
	{ plataforma: "Render", next: "✅", react: "✅", vue: "✅", angular: "✅", gratis: "Limitado" },
];

export default function FrontendHostingContent() {
	return (
		<article className="max-w-3xl">
			{/* Header */}
			<div className="space-y-3 mb-10">
				<div className="flex items-center gap-2 flex-wrap">
					<span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-800/50">
						Frontend
					</span>
					<span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
						Hosting
					</span>
					<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">8 min de lectura</span>
					<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">·</span>
					<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">25 jun 2026</span>
				</div>
				<h1 className="text-4xl font-bold text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.02em" }}>
					Mejores plataformas para hostear frontend
				</h1>
				<p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
					Las mejores opciones para publicar tu app React, Next.js, Vue o cualquier framework frontend. Con planes gratuitos, comparativa y cuándo usar cada una.
				</p>
			</div>

			{/* Intro */}
			<div className="prose prose-sm dark:prose-invert max-w-none mb-10">
				<p className="text-[#3d3d3d] dark:text-[#c0c0c5] leading-relaxed">
					Elegir bien dónde alojar tu frontend marca la diferencia en rendimiento, experiencia de desarrollo y coste. En 2026 hay opciones excelentes con planes gratuitos muy generosos. Aquí tienes las que uso y recomiendo.
				</p>
				<div className="mt-4 p-4 rounded-xl bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800/40">
					<p className="text-sm font-semibold text-violet-800 dark:text-violet-300 mb-1">⚡ Regla rápida</p>
					<p className="text-sm text-violet-700 dark:text-violet-400">Para Next.js → Vercel. Para todo lo demás estático → Cloudflare Pages (ancho de banda ilimitado gratis). Para demos rápidas → Surge.</p>
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
											<Link href={p.url} target="_blank" rel="noopener noreferrer" className="font-bold text-base text-[#1d1d1f] dark:text-white hover:text-violet-600 dark:hover:text-violet-400 transition-colors no-underline">
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

			{/* Comparativa */}
			<div className="mb-10">
				<h2 className="text-xl font-bold text-[#1d1d1f] dark:text-white mb-4">Comparativa rápida</h2>
				<div className="overflow-x-auto rounded-xl border border-black/8 dark:border-white/8">
					<table className="w-full text-xs">
						<thead>
							<tr className="bg-black/3 dark:bg-white/3 border-b border-black/8 dark:border-white/8">
								{["Plataforma", "Next.js", "React", "Vue/Angular", "Plan gratis"].map(h => (
									<th key={h} className="px-3 py-2 text-left font-semibold text-[#1d1d1f] dark:text-white">{h}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{comparativa.map((row, i) => (
								<tr key={row.plataforma} className={`border-b border-black/6 dark:border-white/6 last:border-0 ${i % 2 === 0 ? "" : "bg-black/[0.015] dark:bg-white/[0.015]"}`}>
									<td className="px-3 py-2 font-semibold text-[#1d1d1f] dark:text-white">{row.plataforma}</td>
									<td className="px-3 py-2 text-[#3d3d3d] dark:text-[#c0c0c5]">{row.next}</td>
									<td className="px-3 py-2 text-[#3d3d3d] dark:text-[#c0c0c5]">{row.react}</td>
									<td className="px-3 py-2 text-[#3d3d3d] dark:text-[#c0c0c5]">{row.vue}</td>
									<td className="px-3 py-2 text-[#3d3d3d] dark:text-[#c0c0c5]">{row.gratis}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Tip final */}
			<div className="p-5 rounded-2xl bg-gradient-to-br from-violet-50 to-blue-50 dark:from-violet-950/20 dark:to-blue-950/20 border border-violet-200 dark:border-violet-800/40">
				<h3 className="font-bold text-[#1d1d1f] dark:text-white mb-2">💡 Mi recomendación personal</h3>
				<p className="text-sm text-[#3d3d3d] dark:text-[#c0c0c5] leading-relaxed">
					Para proyectos personales y portfolios uso <strong>Vercel</strong> si hay Next.js y <strong>Cloudflare Pages</strong> para todo lo demás. Ambos tienen un DX excelente y el plan gratuito es más que suficiente para proyectos reales.
				</p>
			</div>
		</article>
	);
}
