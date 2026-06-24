const skills = [
	{
		category: "Frontend",
		gradient: "from-blue-500 to-cyan-500",
		items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "Framer Motion"],
	},
	{
		category: "Backend",
		gradient: "from-emerald-500 to-teal-500",
		items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL"],
	},
	{
		category: "DevOps & Tools",
		gradient: "from-violet-500 to-purple-500",
		items: ["Git", "Docker", "Linux", "Vercel", "AWS", "GitHub Actions"],
	},
	{
		category: "Lenguajes",
		gradient: "from-orange-500 to-amber-500",
		items: ["JavaScript", "TypeScript", "C", "C++", "Python", "SQL"],
	},
];

export default function Skills() {
	return (
		<section className="relative w-full overflow-clip">
			{/* Ambient */}
			<div className="blob absolute -top-20 -right-20 w-[400px] h-[400px] bg-gradient-to-bl from-violet-400/6 via-blue-400/4 to-transparent -z-10" />

			<div className="space-y-10">
				<div className="text-center space-y-2">
					<p className="section-label">Habilidades</p>
					<h2 className="text-3xl md:text-4xl font-bold">Tecnologías que domino</h2>
					<p className="text-[#6e6e73] dark:text-[#86868b] max-w-xl mx-auto text-sm">
						Un stack completo para construir soluciones de extremo a extremo con calidad de producción.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{skills.map((cat, idx) => (
						<div
							key={idx}
							className="group p-6 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-black/12 dark:hover:border-white/12 hover:shadow-lg hover:shadow-black/4 dark:hover:shadow-black/20 transition-all duration-300"
						>
							<div className="flex items-center gap-3 mb-4">
								<div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${cat.gradient} flex-shrink-0 group-hover:scale-110 transition-transform duration-300`} />
								<h3 className="font-semibold text-[#1d1d1f] dark:text-white">{cat.category}</h3>
							</div>
							<div className="flex flex-wrap gap-2">
								{cat.items.map((skill, i) => (
									<span
										key={i}
										className="px-3 py-1.5 rounded-full text-xs font-medium bg-black/4 dark:bg-white/8 text-[#3d3d3d] dark:text-[#c0c0c5] border border-black/6 dark:border-white/8 hover:bg-black/8 dark:hover:bg-white/12 transition-colors cursor-default"
									>
										{skill}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
