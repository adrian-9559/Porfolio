"use client";
import { LogoGithub, ArrowUpRightFromSquare } from "@gravity-ui/icons";
import Link from "next/link";

interface Project {
	title: string;
	description: string;
	tags: string[];
	github?: string;
	demo?: string;
	gradient: string;
	accentBg: string;
	letter: string;
}

const projects: Project[] = [
	{
		title: "GymGO",
		description: "Aplicación web y móvil para gestión de rutinas de entrenamiento con seguimiento de progreso personalizado.",
		tags: ["React", "Node.js", "PostgreSQL", "React Native"],
		github: "https://github.com/adrian-9559/GymGO",
		demo: "https://gymgo.vercel.app",
		gradient: "from-violet-500 to-purple-600",
		accentBg: "from-violet-500/10 to-purple-500/5",
		letter: "G",
	},
	{
		title: "ft_irc",
		description: "Servidor IRC en C++ con soporte completo para múltiples clientes y canales en tiempo real.",
		tags: ["C++", "Sockets", "Linux", "Redes"],
		github: "https://github.com/adrigar25/ft_irc",
		gradient: "from-pink-500 to-rose-600",
		accentBg: "from-pink-500/10 to-rose-500/5",
		letter: "I",
	},
	{
		title: "cub3D",
		description: "Motor gráfico 3D tipo raycasting en C con renderización en tiempo real, inspirado en Wolfenstein 3D.",
		tags: ["C", "Graphics", "MLX", "Algoritmos"],
		github: "https://github.com/adrigar25/cub3D",
		gradient: "from-orange-500 to-amber-600",
		accentBg: "from-orange-500/10 to-amber-500/5",
		letter: "C",
	},
	{
		title: "CodeXplore",
		description: "Plataforma educativa para aprender programación con cursos interactivos y seguimiento de progreso.",
		tags: ["Next.js", "TypeScript", "Tailwind CSS", "HeroUI"],
		demo: "https://codexplore.vercel.app",
		gradient: "from-emerald-500 to-teal-600",
		accentBg: "from-emerald-500/10 to-teal-500/5",
		letter: "X",
	},
];

export default function Projects() {
	return (
		<section id="projects" className="relative w-full">
			<div className="blob absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-violet-400/6 to-transparent -z-10" />

			<div className="space-y-10">
				<div className="text-center space-y-2">
					<p className="section-label">Proyectos</p>
					<h2 className="text-3xl md:text-4xl font-black" style={{ letterSpacing: "-0.03em" }}>
						Proyectos destacados
					</h2>
					<p className="text-[#6e6e73] dark:text-[#86868b] max-w-xl mx-auto text-sm">
						Proyectos que demuestran mis habilidades técnicas y capacidad de resolver problemas reales.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{projects.map((project, idx) => (
						<div
							key={idx}
							className={`group relative p-6 rounded-2xl bg-gradient-to-br ${project.accentBg} border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 hover:shadow-2xl hover:shadow-black/8 dark:hover:shadow-black/30 transition-all duration-300 flex flex-col overflow-hidden`}
						>
							{/* Gradient top bar */}
							<div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient} opacity-80`} />
							{/* Glow */}
							<div className={`absolute -top-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-br ${project.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />

							<div className="relative">
								{/* Project icon */}
								<div
									className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-white font-black text-lg mb-5 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}
								>
									{project.letter}
								</div>

								<div className="flex-1 space-y-2">
									<h3 className="text-xl font-black text-[#1d1d1f] dark:text-white" style={{ letterSpacing: "-0.02em" }}>
										{project.title}
									</h3>
									<p className="text-sm text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
										{project.description}
									</p>
								</div>

								{/* Tags */}
								<div className="flex flex-wrap gap-1.5 mt-5">
									{project.tags.map((tag, i) => (
										<span key={i} className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/70 dark:bg-white/8 text-[#3d3d3d] dark:text-[#c0c0c5] border border-black/8 dark:border-white/10">
											{tag}
										</span>
									))}
								</div>

								{/* Links */}
								<div className="flex gap-4 mt-5 pt-4 border-t border-black/6 dark:border-white/6">
									{project.github && (
										<Link
											href={project.github}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors no-underline"
										>
											<LogoGithub className="w-3.5 h-3.5" />
											GitHub
										</Link>
									)}
									{project.demo && (
										<Link
											href={project.demo}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors no-underline"
										>
											<ArrowUpRightFromSquare className="w-3.5 h-3.5" />
											Demo en vivo
										</Link>
									)}
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="flex justify-center">
					<Link
						href="https://github.com/adrian-9559"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] font-semibold text-sm hover:opacity-90 transition-opacity no-underline"
					>
						<LogoGithub className="w-4 h-4" />
						Ver todos mis proyectos en GitHub
					</Link>
				</div>
			</div>
		</section>
	);
}
