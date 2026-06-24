import DefaultLayout from "@/layouts/default";
import { ExperienceSection } from "@/components/experience-section";
import Link from "next/link";
import { educationData } from "@/lib/education/data";

const stats = [
	{ value: "3+", label: "Años de Exp.", color: "from-blue-500 to-cyan-400" },
	{ value: "800h", label: "Horas Prácticas", color: "from-violet-500 to-purple-400" },
	{ value: "15+", label: "Proyectos", color: "from-emerald-500 to-teal-400" },
	{ value: "20+", label: "Tecnologías", color: "from-orange-500 to-amber-400" },
];

export default function ResumePage() {
	return (
		<DefaultLayout>
			<div className="relative">
				{/* Ambient blobs */}
				<div className="blob absolute -top-10 right-0 w-[450px] h-[350px] bg-gradient-to-bl from-blue-400/7 via-violet-400/4 to-transparent -z-10" />
				<div className="blob absolute top-1/3 -left-20 w-[350px] h-[350px] bg-gradient-to-tr from-emerald-400/5 to-transparent -z-10" />

				<div className="space-y-16 py-4 md:py-8">
					{/* Header */}
					<div className="space-y-4">
						<p className="section-label">Curriculum Vitae</p>
						<h1 className="text-5xl md:text-6xl font-bold" style={{ letterSpacing: "-0.03em" }}>
							Mi trayectoria
						</h1>
						<p className="text-base text-[#6e6e73] dark:text-[#86868b] max-w-2xl leading-relaxed">
							Formación académica y experiencia profesional en desarrollo web y administración de sistemas.
						</p>
					</div>

					{/* Stats */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{stats.map((s, idx) => (
							<div
								key={idx}
								className="group p-6 rounded-2xl text-center bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 hover:border-black/12 dark:hover:border-white/12 hover:shadow-lg hover:shadow-black/4 dark:hover:shadow-black/20 transition-all duration-300 overflow-hidden relative"
							>
								<div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-300`} />
								<p className="text-3xl font-bold gradient-text relative" style={{ letterSpacing: "-0.02em" }}>{s.value}</p>
								<p className="text-xs text-[#aeaeb2] dark:text-[#636366] mt-1.5 font-medium relative">{s.label}</p>
							</div>
						))}
					</div>

					{/* Experience */}
					<div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8">
						<ExperienceSection />
					</div>

					{/* Education Timeline */}
					<div className="space-y-6">
						<div className="flex items-start justify-between flex-wrap gap-3">
							<div>
								<h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-white">Educación</h3>
								<p className="text-sm text-[#aeaeb2] dark:text-[#636366] mt-1">
									Haz clic en cada etapa para ver todos los detalles.
								</p>
							</div>
						</div>

						{/* Timeline */}
						<div className="relative pl-8">
							{/* Vertical line */}
							<div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-blue-400/40 via-violet-400/30 to-emerald-400/40" />

							<div className="space-y-6">
								{educationData.map((edu, idx) => (
									<Link
										key={edu.id}
										href={`/CV/formacion/${edu.id}`}
										className="relative group flex gap-6 no-underline"
									>
										{/* Timeline dot */}
										<div className={`absolute -left-8 top-6 w-6 h-6 rounded-full bg-gradient-to-br ${edu.color} flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
											<div className="w-2 h-2 rounded-full bg-white/80" />
										</div>

										{/* Card */}
										<div className="flex-1 p-5 md:p-6 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 group-hover:border-black/15 dark:group-hover:border-white/15 group-hover:shadow-lg group-hover:shadow-black/5 dark:group-hover:shadow-black/20 transition-all duration-200">
											<div className="flex items-start gap-4">
												{/* Level badge */}
												<div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${edu.color} flex items-center justify-center text-white text-xs md:text-sm font-bold flex-shrink-0 shadow-sm`}>
													{edu.level}
												</div>

												{/* Info */}
												<div className="flex-1 min-w-0">
													<div className="flex items-start justify-between gap-3 flex-wrap">
														<div className="min-w-0">
															<p className="font-bold text-[#1d1d1f] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
																{edu.institution}
															</p>
															<p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-0.5 truncate">
																{edu.program}
															</p>
														</div>
														<div className="flex items-center gap-2 flex-shrink-0">
															<span className="text-xs text-[#aeaeb2] dark:text-[#636366] hidden sm:block">{edu.year}</span>
															<svg className="w-4 h-4 text-[#aeaeb2] dark:text-[#636366] group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
																<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
															</svg>
														</div>
													</div>

													<p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-2 leading-relaxed line-clamp-2">
														{edu.summary}
													</p>

													{/* Preview tags */}
													<div className="flex flex-wrap gap-1.5 mt-3">
														{edu.technologies.slice(0, 5).map((tech, i) => (
															<span key={i} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-black/4 dark:bg-white/6 text-[#6e6e73] dark:text-[#86868b] border border-black/6 dark:border-white/6">
																{tech}
															</span>
														))}
														{edu.technologies.length > 5 && (
															<span className="px-2 py-0.5 rounded-md text-[10px] font-medium text-[#aeaeb2] dark:text-[#636366]">
																+{edu.technologies.length - 5} más
															</span>
														)}
													</div>

													<p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
														Ver formación completa →
													</p>
												</div>
											</div>
										</div>
									</Link>
								))}
							</div>
						</div>
					</div>

					{/* Download */}
					<div className="flex justify-center pt-4">
						<Link
							href="/cv/Adrian_Escribano_CV.pdf"
							download="Adrian_Escribano_CV.pdf"
							className="apple-btn-primary shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 hover:shadow-lg transition-shadow no-underline gap-2"
						>
							<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
							Descargar CV en PDF
						</Link>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
}
