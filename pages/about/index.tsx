import DefaultLayout from "@/layouts/default";

const timeline = [
	{
		year: "2021",
		title: "Inicio en desarrollo web",
		description: "Primeros pasos con HTML, CSS y JavaScript. Proyectos personales y aprendizaje autodidacta.",
	},
	{
		year: "2022",
		title: "Especialización en React",
		description: "Profundización en React y Node.js. Prácticas profesionales en administración de sistemas.",
	},
	{
		year: "2023",
		title: "Full Stack Developer",
		description: "Dominio del stack MERN completo. Múltiples proyectos en producción con arquitecturas modernas.",
	},
	{
		year: "2024",
		title: "Prácticas en consultoría",
		description: "Desarrollo de plataformas web completas en entorno profesional. Next.js, TypeScript y arquitecturas escalables.",
	},
	{
		year: "2025",
		title: "42 Madrid",
		description: "Ingresé al cursus de 42 Madrid para profundizar en sistemas, algoritmos y C/C++.",
	},
];

const stats = [
	{ value: "3+", label: "Años de exp." },
	{ value: "15+", label: "Proyectos" },
	{ value: "20+", label: "Tecnologías" },
	{ value: "800h", label: "Horas prácticas" },
];

export default function AboutPage() {
	return (
		<DefaultLayout>
			<div className="relative">
				{/* Ambient gradient */}
				<div className="absolute -top-20 right-0 w-[500px] h-[400px] blob bg-gradient-to-br from-blue-400/6 via-violet-400/4 to-transparent -z-10" />
				<div className="absolute top-1/2 -left-40 w-[400px] h-[400px] blob bg-gradient-to-br from-cyan-400/5 to-transparent -z-10" />

				<div className="space-y-20 md:space-y-28 py-4 md:py-8">
					{/* Header */}
					<div className="space-y-6 max-w-3xl">
						<p className="section-label">Sobre mí</p>
						<h1 className="text-5xl md:text-6xl font-bold" style={{ letterSpacing: "-0.03em" }}>
							Desarrollador apasionado por crear{" "}
							<span className="gradient-text">experiencias excepcionales</span>
						</h1>
						<p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed max-w-xl">
							Soy Adrián Escribano Pérez, un desarrollador Full Stack con más de 3 años de experiencia construyendo aplicaciones web modernas, escalables e intuitivas.
						</p>
					</div>

					{/* Stats */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{stats.map((s, i) => (
							<div key={i} className="p-6 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 text-center hover:border-black/15 dark:hover:border-white/15 transition-colors">
								<p className="text-3xl font-bold gradient-text" style={{ letterSpacing: "-0.02em" }}>{s.value}</p>
								<p className="text-xs text-[#aeaeb2] dark:text-[#636366] mt-1.5 font-medium">{s.label}</p>
							</div>
						))}
					</div>

					{/* Story + specialization */}
					<div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
						<div className="lg:col-span-3 space-y-8">
							<div className="space-y-3">
								<h2 className="text-2xl font-bold">Mi historia</h2>
								<div className="space-y-4 text-[#6e6e73] dark:text-[#86868b] leading-relaxed text-sm">
									<p>Mi viaje en el desarrollo de software comenzó con curiosidad y terminó en obsesión. Desde mis primeras líneas de HTML hasta arquitecturas completas con Node.js y PostgreSQL, cada proyecto me ha enseñado que el buen software es el que desaparece: el usuario solo ve una experiencia fluida.</p>
									<p>Creo firmemente en combinar una ingeniería backend robusta con un frontend que deleite. No basta con que funcione: tiene que sentirse bien.</p>
									<p>Actualmente amplío mis fundamentos en 42 Madrid, donde el peer learning y los proyectos en C/C++ me dan una perspectiva más profunda sobre cómo funciona realmente el software a bajo nivel.</p>
								</div>
							</div>

							<div className="space-y-3">
								<h2 className="text-2xl font-bold">Mi enfoque</h2>
								<ul className="space-y-3">
									{[
										"Entender a fondo los requisitos antes de escribir una línea de código",
										"Diseñar arquitecturas escalables y mantenibles desde el primer día",
										"Código limpio, sin comentarios innecesarios y fácil de iterar",
										"Testing exhaustivo y comunicación clara con el equipo",
									].map((item, i) => (
										<li key={i} className="flex items-start gap-3">
											<span className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center flex-shrink-0 mt-0.5">
												<svg className="w-3 h-3 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
												</svg>
											</span>
											<span className="text-sm text-[#3d3d3d] dark:text-[#c0c0c5]">{item}</span>
										</li>
									))}
								</ul>
							</div>
						</div>

						<div className="lg:col-span-2 space-y-3">
							<h2 className="text-2xl font-bold">Especialización</h2>
							{[
								{ label: "Frontend", items: "React, Next.js, TypeScript, Tailwind CSS", color: "bg-blue-500", gradient: "from-blue-50 dark:from-blue-950/30" },
								{ label: "Backend", items: "Node.js, Express, REST APIs, GraphQL", color: "bg-emerald-500", gradient: "from-emerald-50 dark:from-emerald-950/30" },
								{ label: "Base de datos", items: "PostgreSQL, MongoDB, Redis", color: "bg-orange-500", gradient: "from-orange-50 dark:from-orange-950/30" },
								{ label: "DevOps", items: "Docker, Git, Vercel, GitHub Actions", color: "bg-violet-500", gradient: "from-violet-50 dark:from-violet-950/30" },
							].map((s, i) => (
								<div key={i} className="p-4 rounded-xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8">
									<div className="flex items-center gap-2.5 mb-1.5">
										<div className={`w-2 h-2 rounded-full ${s.color}`} />
										<p className="text-xs font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider">{s.label}</p>
									</div>
									<p className="text-sm text-[#3d3d3d] dark:text-[#c0c0c5]">{s.items}</p>
								</div>
							))}
						</div>
					</div>

					{/* ── Timeline – fixed layout ── */}
					<div className="space-y-8">
						<div className="space-y-2">
							<p className="section-label">Trayectoria</p>
							<h2 className="text-2xl font-bold">Cronología</h2>
						</div>

						<div className="relative">
							{/* Vertical line – pinned to the dot column center */}
							<div className="absolute left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-blue-500 via-blue-400/50 to-transparent" />

							<div className="space-y-0">
								{timeline.map((item, idx) => (
									<div key={idx} className="relative flex gap-5 pb-8 last:pb-0">
										{/* Year + dot column */}
										<div className="flex-shrink-0 flex flex-col items-center pt-0.5" style={{ width: 38 }}>
											<div className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-blue-500/20 z-10 mt-1" />
										</div>

										{/* Content */}
										<div className="flex-1 pb-1">
											<p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-0.5 leading-none">
												{item.year}
											</p>
											<h3 className="font-semibold text-[#1d1d1f] dark:text-white text-sm">
												{item.title}
											</h3>
											<p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-1 leading-relaxed">
												{item.description}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
}
