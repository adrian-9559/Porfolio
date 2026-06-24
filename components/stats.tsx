const metrics = [
	{ value: "15+", label: "Proyectos completados", description: "Aplicaciones web y sistemas en producción" },
	{ value: "3+",  label: "Años de experiencia",   description: "Desarrollando soluciones innovadoras" },
	{ value: "20+", label: "Tecnologías dominadas",  description: "Lenguajes, frameworks y herramientas" },
	{ value: "1K+", label: "Commits en GitHub",      description: "Contribuciones activas a proyectos" },
];

export default function Stats() {
	return (
		<section className="relative w-full overflow-hidden">
			{/* Ambient */}
			<div className="blob absolute -top-16 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-blue-400/6 to-transparent -z-10" />

			<div className="space-y-10">
				<div className="text-center space-y-2">
					<p className="section-label">Trayectoria</p>
					<h2 className="text-3xl md:text-4xl font-bold">Por los números</h2>
				</div>

				<div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-black/6 dark:bg-white/6 rounded-2xl overflow-hidden ring-1 ring-black/6 dark:ring-white/6">
					{metrics.map((m, idx) => (
						<div
							key={idx}
							className="bg-white dark:bg-[#0a0a0f] p-7 md:p-8 text-center hover:bg-[#f5f5f7] dark:hover:bg-[#111116] transition-colors duration-200 group"
						>
							<p
								className="text-4xl md:text-5xl font-bold gradient-text mb-2 group-hover:scale-105 transition-transform duration-300"
								style={{ letterSpacing: "-0.03em" }}
							>
								{m.value}
							</p>
							<p className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-1">{m.label}</p>
							<p className="text-xs text-[#aeaeb2] dark:text-[#636366] leading-relaxed">{m.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
