import { useI18n } from "@/utils/i18n";
import { Card, CardBody, CardFooter, CardHeader, Chip, Image, Link } from "@heroui/react";
import { motion } from "framer-motion";

interface Project {
	name: string;
	description: string;
	detailed_description: string;
	important: string[];
	image: string;
	url?: string;
	github: string;
	status: "Completado" | "En desarrollo" | "Mantenimiento";
	year: string;
}

export default function ProjectDeveloped() {
	const { messages } = useI18n();
	const t = (path: string, fallback?: string) => {
		const parts = path.split('.');
		let cur: any = messages;
		for (const p of parts) {
			if (!cur) return fallback ?? '';
			cur = cur[p];
		}
		return cur ?? fallback ?? '';
	}
	const projects: { developed: Project[] } = {
		developed: [
			{
				name: "PowerFuel",
				description: "Plataforma completa de comercio electrónico con gestión avanzada de productos y pasarelas de pago.",
				detailed_description: "PowerFuel es una aplicación web de comercio electrónico desarrollada con tecnologías modernas. Incluye gestión de inventario en tiempo real, integración con múltiples pasarelas de pago, sistema de autenticación de usuarios, panel de administración completo y optimización SEO. Utiliza MySQL como base de datos relacional para garantizar integridad referencial y rendimiento óptimo en las transacciones.",
				important: ["React", "Next.js", "TailwindCSS", "Node.js", "Express", "MySQL", "Stripe API"],
				image: "/images/powerFuel/home.png",
				url: "/projects/powerFuel",
				github: "https://github.com/adrian-9559/PowerFuel",
				status: "Completado",
				year: "2024"
			},
			{
				name: "GymGO",
				description: "Aplicación multiplataforma para gestión integral de gimnasios con versiones web, móvil y escritorio.",
				detailed_description: "GymGO es un ecosistema completo para la gestión de gimnasios que incluye: backend robusto con API RESTful, aplicación móvil nativa con React Native/Expo, y aplicación de escritorio con C. Ofrece gestión de membresías, seguimiento de entrenamientos, sistema de reservas y analytics en tiempo real.",
				important: ["React Native", "Expo", "Node.js", "Express", "JavaScript", "C", "CMake", "MySQL"],
				image: "/images/gymgo/dashboard.png",
				github: "https://github.com/adrian-9559/GymGO",
				status: "En desarrollo",
				year: "2025"
			},
			{
				name: "Minishell",
				description: "Implementación completa de un shell Unix-like en C siguiendo estándares POSIX.",
				detailed_description: "Minishell es una reimplementación de bash desarrollada en C que maneja comandos internos y externos, pipes, redirecciones, variables de entorno, expansión de comodines y señales. Proyecto desarrollado en la escuela 42 Madrid siguiendo la norma y buenas prácticas de programación en C.",
				important: ["C", "Unix", "POSIX", "Bash", "System Calls", "Memory Management"],
				image: "/images/minishell/terminal.png",
				github: "https://github.com/adrian-9559/minishell",
				status: "Completado",
				year: "2023"
			},
			{
				name: "Portfolio Profesional",
				description: "Portfolio personal desarrollado con Next.js, showcasing proyectos y habilidades técnicas.",
				detailed_description: "Portfolio personal moderno y responsive desarrollado con Next.js y TailwindCSS. Incluye animaciones con Framer Motion, optimización SEO, modo oscuro/claro, sección de proyectos dinámica y formulario de contacto funcional. Desplegado en Vercel con integración de analytics.",
				important: ["Next.js", "JavaScript", "TailwindCSS", "Framer Motion", "Vercel", "SEO"],
				image: "/images/portfolio/hero.png",
				github: "https://github.com/adrian-9559/Portfolio",
				status: "Mantenimiento",
				year: "2024"
			},
			{
				name: "Presets UI",
				description: "Librería de componentes reutilizables para React y Angular con documentación interactiva.",
				detailed_description: "Colección de componentes UI pre-diseñados y altamente personalizables para acelerar el desarrollo frontend. Incluye componentes para React con TailwindCSS y Angular con Bootstrap, documentación interactiva, playground en vivo y sistema de temas personalizables.",
				important: ["React", "Angular", "TailwindCSS", "Bootstrap", "Storybook", "npm"],
				image: "/images/presets/components.png",
				github: "https://github.com/adrian-9559/Presets",
				status: "En desarrollo",
				year: "2024"
			}
		],
	}

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Completado": return "success";
			case "En desarrollo": return "warning";
			case "Mantenimiento": return "primary";
			default: return "default";
		}
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2
			}
		}
	};

	const cardVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6 }
		}
	};

	return (
		<section className="w-full grid 2xl:flex justify-center gap-10 2xl:gap-20">
			<section className="w-full flex flex-col justify-center gap-8">
				<motion.section
					className="flex justify-center"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<div className="text-center mb-8">
						<h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent mb-4">
							{t('projects.title', 'Proyectos Desarrollados')}
						</h2>
						<p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
							{t('projects.subtitle', 'Una selección de proyectos que demuestran mi experiencia en desarrollo Full Stack, desde aplicaciones web modernas hasta sistemas de bajo nivel.')}
						</p>
					</div>
				</motion.section>

				<motion.section
					className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<div className="col-span-full text-center mb-6">
						<p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
							{t('projects.subtitle', 'Una selección de proyectos que demuestran mi experiencia en desarrollo Full Stack, desde aplicaciones web modernas hasta sistemas de bajo nivel.')}
						</p>
					</div>
					{projects.developed ? projects.developed.map((project, index) => (
						<motion.div key={index} variants={cardVariants}>
							<Card className={`h-full backdrop-blur-lg border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${project.name === "PowerFuel"
								? "bg-gradient-to-br from-orange-50/90 to-red-50/90 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200/50 dark:border-orange-500/20 hover:border-orange-400/60 dark:hover:border-orange-500/40 hover:shadow-orange-500/25 dark:hover:shadow-orange-500/10"
								: "bg-white/90 dark:bg-gray-900/50 border-gray-200/50 dark:border-white/10 hover:border-purple-400/60 dark:hover:border-purple-500/30 hover:shadow-purple-500/25 dark:hover:shadow-purple-500/10"
								}`}>
								<CardHeader className="flex flex-col gap-3 p-6">
									<div className="flex justify-between items-start w-full">
										<div className="flex items-center gap-2">
											<h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.name}</h3>
											{project.name === "PowerFuel" && (
												<div className="flex gap-1">
													<span className="text-orange-500">⚡</span>
													<span className="text-red-500">🏋️</span>
												</div>
											)}
										</div>
										<div className="flex flex-col gap-2 items-end">
											<Chip
												size="sm"
												color={getStatusColor(project.status) as any}
												variant="flat"
												className="font-medium"
											>
												{t(`projects.status.${project.status.replace(/\s+/g, '')}`, project.status)}
											</Chip>
											<span className="text-xs text-gray-500 dark:text-gray-400">{project.year}</span>
										</div>
									</div>
									{project.name === "PowerFuel" && (
										<div className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg p-3 border border-orange-200/50 dark:border-orange-600/30">
											<p className="text-sm font-medium text-orange-800 dark:text-orange-200 flex items-center gap-2">
												<span>💳</span>
												{t('projects.list.PowerFuel.badge', 'E-commerce con MySQL • Pasarelas de pago integradas')}
											</p>
										</div>
									)}
								</CardHeader>

								<CardBody className="flex flex-col gap-4 p-6 pt-0">
									<div className="bg-cover bg-center w-full rounded-xl overflow-hidden">
										<Image
											src={project.image}
											alt={project.name}
											className="rounded-xl w-full h-48 object-cover"
											loading="lazy"
										/>
									</div>

									<div className="space-y-3">
										<p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
											{t(`projects.list.${project.name}.description`, project.description)}
										</p>

										<details className="group">
											<summary className="cursor-pointer text-purple-600 dark:text-purple-400 text-sm font-medium hover:text-purple-500 dark:hover:text-purple-300 transition-colors">
												{t('projects.details_summary', 'Ver más detalles ↓')}
											</summary>
											<p className="text-gray-600 dark:text-gray-300 text-xs mt-2 leading-relaxed group-open:animate-fade-in">
												{t(`projects.list.${project.name}.detailed_description`, project.detailed_description)}
											</p>
										</details>
									</div>
								</CardBody>

								<CardFooter className="flex flex-col gap-4 p-6 pt-0">
									<div className="w-full">
										<p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">{t('experience.technologies', 'Tecnologías:')}</p>
										<div className="flex flex-wrap gap-1">
											{project.important.map((tech, techIndex) => (
												<Chip
													key={techIndex}
													size="sm"
													variant="bordered"
													className={`text-xs hover:scale-105 transition-all ${project.name === "PowerFuel"
														? tech === "MySQL"
															? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30 hover:bg-blue-100 dark:hover:bg-blue-500/20"
															: "bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-500/30 hover:bg-orange-100 dark:hover:bg-orange-500/20"
														: "bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-500/30 hover:bg-purple-100 dark:hover:bg-purple-500/20"
														}`}
												>
													{tech === "MySQL" && project.name === "PowerFuel" && "🐬 "}
													{tech}
												</Chip>
											))}
										</div>
									</div>

									<div className="flex gap-3 w-full">
										{project.url && (
											<Link
												href={project.url}
												className={`flex-1 text-center px-4 py-2.5 rounded-lg font-medium hover:shadow-lg transition-all duration-300 text-sm transform hover:scale-105 ${project.name === "PowerFuel"
													? "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white hover:shadow-orange-500/25"
													: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white hover:shadow-purple-500/25"
													}`}
											>
												{t('projects.view_details', 'Ver Detalles')}
											</Link>
										)}
										<Link
											href={project.github}
											isExternal
											className="flex-1 text-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700/50 dark:hover:bg-gray-600/50 text-gray-800 dark:text-gray-200 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 border border-gray-200 dark:border-gray-600/50 hover:border-gray-300 dark:hover:border-gray-500/50 text-sm transform hover:scale-105"
										>
											{t('projects.github', 'GitHub')}
										</Link>
									</div>
								</CardFooter>
							</Card>
						</motion.div>
					)) : (
						<div className="col-span-full text-center">
							<p className="text-gray-400">{t('projects.none', 'No hay proyectos desarrollados')}</p>
						</div>
					)}
				</motion.section>

				{/* Call to Action */}
				<motion.div
					className="text-center mt-12"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.8 }}
				>
					<div className="bg-gradient-to-r from-purple-100/90 to-blue-100/90 dark:from-purple-500/10 dark:to-blue-500/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-200/50 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300">
						<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
							{t('projects.contact_heading', '¿Tienes un proyecto en mente?')}
						</h3>
						<p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
							{t('projects.contact_line', 'Estoy siempre buscando nuevos desafíos y oportunidades para crear soluciones innovadoras. Hablemos sobre cómo puedo ayudarte a hacer realidad tu próximo proyecto.')}
						</p>
						<Link
							href="mailto:adrian.escribano.perez@gmail.com"
							className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 inline-block transform hover:scale-105"
						>
							{t('projects.contact_button', '📧 Contactar ahora')}
						</Link>
					</div>
				</motion.div>
			</section>
		</section>
	);
}
