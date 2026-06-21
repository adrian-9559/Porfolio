import { LogoGithub } from "@gravity-ui/icons";
import { Button, Card } from "@heroui/react";

interface Project {
	title: string;
	description: string;
	image: string;
	tags: string[];
	github?: string;
	demo?: string;
}

const projects: Project[] = [
	{
		title: "GymGO",
		description: "Aplicación web y móvil para gestión de rutinas de entrenamiento con seguimiento de progreso",
		image: "/images/projects/gymgo.jpg",
		tags: ["React", "Node.js", "PostgreSQL", "React Native"],
		github: "https://github.com/adrian-9559/GymGO",
		demo: "https://gymgo.vercel.app",
	},
	{
		title: "ft_irc",
		description: "Servidor IRC (Internet Relay Chat) desarrollado en C++ con soporte para múltiples clientes",
		image: "/images/projects/irc.jpg",
		tags: ["C++", "Sockets", "Linux", "Redes"],
		github: "https://github.com/adrigar25/ft_irc",
	},
	{
		title: "cub3D",
		description: "Motor gráfico 3D tipo raycasting en C con renderización en tiempo real",
		image: "/images/projects/cub3d.jpg",
		tags: ["C", "Graphics", "MLX", "Algoritmos"],
		github: "https://github.com/adrigar25/cub3D",
	},
	{
		title: "CodeXplore",
		description: "Plataforma educativa para aprender programación con cursos interactivos",
		image: "/images/projects/codexplore.jpg",
		tags: ["Next.js", "TypeScript", "Tailwind CSS", "HeroUI"],
		demo: "https://codexplore.vercel.app",
	},
];

export default function Projects() {
	return (
		<section id="projects" className="w-full py-20 md:py-32">
			<div className="space-y-12">
				{/* Header */}
				<div className="text-center space-y-4">
					<h2 className="text-4xl md:text-5xl font-bold">Proyectos Destacados</h2>
					<p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
						Algunos de mis proyectos más relevantes que muestran mis habilidades y experiencia
					</p>
				</div>

				{/* Projects Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{projects.map((project, idx) => (
						<Card
							key={idx}
							className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
						>
							{/* Image */}
							<div className="relative w-full h-48 md:h-56 overflow-hidden bg-gray-200 dark:bg-gray-800">
								<div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
									<span className="text-4xl">📸</span>
								</div>
							</div>

							{/* Content */}
							<div className="p-6 md:p-8 space-y-4">
								<div>
									<h3 className="text-2xl font-bold">{project.title}</h3>
									<p className="text-gray-600 dark:text-gray-400 mt-2">{project.description}</p>
								</div>

								{/* Tags */}
								<div className="flex flex-wrap gap-2">
									{project.tags.map((tag, i) => (
										<span
											key={i}
											className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
										>
											{tag}
										</span>
									))}
								</div>

								{/* Links */}
								<div className="flex gap-3 pt-4">
									{project.github && (
										<Button
											onClick={() => window.open(project.github, "_blank")}
											isIconOnly
											variant="primary"
											size="sm"
										>
											<LogoGithub className="w-5 h-5" />
										</Button>
									)}
								</div>
							</div>
						</Card>
					))}
				</div>

				{/* View All Button */}
				<div className="flex justify-center pt-8">
					<Button
						className="px-8 py-6 text-base font-semibold"
						variant="primary"
						onClick={() => window.open("https://github.com/adrian-9559", "_blank")}
						size="lg"
					>
						Ver todos mis proyectos en GitHub
					</Button>
				</div>
			</div>
		</section>
	);
}
