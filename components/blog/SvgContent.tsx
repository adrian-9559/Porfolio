import Link from "next/link";
import { getWebsiteImage } from "@/functions/getWebSiteInfo";

const svgResources = [
	{
		name: "SVG Repo",
		url: "https://www.svgrepo.com",
		description: "Una gran colección de SVG gratuitos para uso personal y comercial. Con más de 500.000 vectores disponibles.",
	},
	{
		name: "Flaticon",
		url: "https://www.flaticon.com",
		description: "Ofrece una amplia variedad de iconos en formato SVG, PNG y otros. Ideal para proyectos de diseño.",
	},
	{
		name: "Iconfinder",
		url: "https://www.iconfinder.com",
		description: "Encuentra iconos SVG de alta calidad para tus proyectos. Tanto gratuitos como de pago.",
	},
	{
		name: "Freepik",
		url: "https://www.freepik.com",
		description: "Proporciona recursos gráficos incluyendo SVG para diseñadores y desarrolladores.",
	},
	{
		name: "SVGL",
		url: "https://svgl.app",
		description: "Una plataforma específica para logos SVG de marcas y tecnologías conocidas. Muy útil para portfolios.",
	},
	{
		name: "Icones",
		url: "https://icones.js.org",
		description: "Una colección de más de 150.000 iconos SVG organizados por packs. Integración directa con proyectos.",
	},
	{
		name: "Gravity UI Icons",
		url: "https://gravity-ui.com",
		description: "Una colección de iconos UI de alta calidad para desarrolladores web. Disponible como paquete npm.",
	},
];

export default function SvgContent() {
	return (
		<article className="max-w-3xl">
			{/* Header */}
			<div className="space-y-3 mb-10">
				<div className="flex items-center gap-2">
					<span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">
						SVG
					</span>
					<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">5 min de lectura</span>
					<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">·</span>
					<span className="text-xs text-[#aeaeb2] dark:text-[#636366]">21 jun 2026</span>
				</div>
				<h1 className="text-4xl font-bold text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.02em" }}>
					Mejores páginas para encontrar SVG
				</h1>
				<p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
					Una selección de las mejores plataformas donde encontrar SVGs gratuitos y de alta calidad para tus proyectos web.
				</p>
			</div>

			{/* Intro */}
			<div className="prose prose-sm dark:prose-invert max-w-none mb-10">
				<p className="text-[#3d3d3d] dark:text-[#c0c0c5] leading-relaxed">
					Los SVGs son fundamentales en el desarrollo web moderno: son escalables, ligeros y permiten animaciones fluidas. Aquí tienes las plataformas que uso habitualmente para encontrar recursos SVG de calidad.
				</p>
				<p className="text-[#3d3d3d] dark:text-[#c0c0c5] leading-relaxed mt-4">
					<strong className="text-[#1d1d1f] dark:text-white">Importante:</strong> siempre revisa la licencia de uso antes de incorporar un SVG a tu proyecto, especialmente si es para uso comercial.
				</p>
			</div>

			{/* Resources grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{svgResources.map((resource) => (
					<Link
						key={resource.url}
						href={resource.url}
						target="_blank"
						rel="noopener noreferrer"
						className="group p-5 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 hover:shadow-md hover:shadow-black/5 transition-all duration-200 no-underline"
					>
						<div className="flex items-center gap-3 mb-3">
							<div className="w-8 h-8 rounded-lg bg-white dark:bg-[#1c1c22] border border-black/8 dark:border-white/8 flex items-center justify-center overflow-hidden flex-shrink-0">
								<img
									src={getWebsiteImage(resource.url)}
									alt={resource.name}
									className="w-5 h-5 object-contain"
									loading="lazy"
									onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
								/>
							</div>
							<p className="font-semibold text-sm text-[#1d1d1f] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
								{resource.name}
							</p>
						</div>
						<p className="text-xs text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
							{resource.description}
						</p>
					</Link>
				))}
			</div>
		</article>
	);
}
