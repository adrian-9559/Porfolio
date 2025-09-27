import { useI18n } from "@/utils/i18n";
import { Card, CardBody, Chip, Image, Progress } from "@heroui/react";
import { motion } from "framer-motion";
import { useState } from "react";

interface Technology {
	name: string;
	level: number;
	icon: string;
	color: string;
	description: string;
}

interface SkillCategory {
	title: string;
	description: string;
	technologies: Technology[];
	gradient: string;
}

export default function TechnicalSkills() {
	const [activeCategory, setActiveCategory] = useState(0);
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

	// Normalize keys: replace dots, slashes and spaces with underscore to match locale keys
	const normKey = (s: string) => s.replace(/[\.\s\/]/g, '_');

	const skillCategories: SkillCategory[] = [
		{
			title: "Frontend Development",
			description: "Tecnologías para crear interfaces de usuario modernas y responsivas",
			gradient: "from-blue-500 to-purple-600",
			technologies: [
				{
					name: "React",
					level: 90,
					icon: "/images/react_logo.png",
					color: "text-blue-400",
					description: "Desarrollo de SPAs complejas con hooks, context API y optimización de rendimiento"
				},
				{
					name: "Next.js",
					level: 85,
					icon: "/images/nextjs_logo.png",
					color: "text-gray-700 dark:text-gray-300",
					description: "SSR, SSG, App Router, API Routes y optimizaciones avanzadas"
				},
				{
					name: "TailwindCSS",
					level: 95,
					icon: "/images/tailwindcss_logo.png",
					color: "text-cyan-400",
					description: "Diseño responsive, componentes reutilizables y utility-first CSS"
				},
				{
					name: "Angular",
					level: 70,
					icon: "/images/angular_logo.png",
					color: "text-red-500",
					description: "Aplicaciones empresariales con RxJS, servicios y routing avanzado"
				}
			]
		},
		{
			title: "Backend Development",
			description: "Construcción de APIs robustas y sistemas escalables",
			gradient: "from-green-500 to-teal-600",
			technologies: [
				{
					name: "Node.js",
					level: 85,
					icon: "/images/nodejs_logo.png",
					color: "text-green-400",
					description: "APIs RESTful, microservicios y aplicaciones en tiempo real"
				},
				{
					name: "Express.js",
					level: 90,
					icon: "/images/express_logo.png",
					color: "text-gray-700 dark:text-gray-300",
					description: "Middleware personalizado, autenticación JWT y arquitectura MVC"
				},
				{
					name: "Java",
					level: 75,
					icon: "/images/java_logo.png",
					color: "text-orange-600",
					description: "Aplicaciones empresariales, Spring Framework y programación orientada a objetos"
				},
				{
					name: "PHP",
					level: 85,
					icon: "/images/php_logo.png",
					color: "text-purple-600",
					description: "Desarrollo web backend, Laravel y programación orientada a objetos"
				},
				{
					name: "SpringBoot",
					level: 80,
					icon: "/images/springboot_logo.png",
					color: "text-green-600",
					description: "Framework para construir aplicaciones Java, basado en microservicios"
				},
				{
					name: "Oracle SQL",
					level: 75,
					icon: "/images/oracle_logo.png",
					color: "text-red-600",
					description: "Bases de datos relacionales, optimización de consultas y transacciones ACID"
				},
				{
					name: "MySQL",
					level: 80,
					icon: "/images/mysql_logo.png",
					color: "text-blue-600",
					description: "Bases de datos relacionales, optimización de consultas y transacciones ACID"
				},
				{
					name: "SQL Server",
					level: 75,
					icon: "/images/sqlserver_logo.png",
					color: "text-blue-800",
					description: "Administración y consultas en bases de datos SQL Server"
				}
			]
		},
		{
			title: "Sistemas Operativos",
			description: "Administración y uso avanzado de sistemas operativos para servidores y desarrollo",
			gradient: "from-gray-700 to-gray-900",
			technologies: [
				{
					name: "Linux/Unix",
					level: 85,
					icon: "/images/linux_logo.png",
					color: "text-yellow-300",
					description: "Administración de servidores, scripting bash y configuración de servicios"
				},
				{
					name: "Windows Server",
					level: 80,
					icon: "/images/windows.png",
					color: "text-blue-400",
					description: "Administración de servidores Windows, Active Directory y PowerShell"
				},
				{
					name: "Bash",
					level: 80,
					icon: "/images/bash_logo.png",
					color: "text-gray-700 dark:text-gray-300",
					description: "Automatización de tareas, scripts de despliegue y administración"
				}
			]
		},
		{
			title: "Redes y Servicios",
			description: "Servicios de infraestructura, servidores web, control de versiones y redes",
			gradient: "from-orange-500 to-red-600",
			technologies: [
				{
					name: "Git",
					level: 95,
					icon: "/images/git_logo.png",
					color: "text-orange-500",
					description: "Control de versiones avanzado, workflows de colaboración y CI/CD"
				},
				{
					name: "Nginx",
					level: 70,
					icon: "/images/nginx_logo.png",
					color: "text-green-400",
					description: "Configuración de proxy reverso, load balancing y SSL"
				},
				{
					name: "Apache",
					level: 75,
					icon: "/images/apache_logo.png",
					color: "text-red-500",
					description: "Configuración de servidores web, virtual hosts y seguridad"
				},
				{
					name: "DNS",
					level: 70,
					icon: "/images/dns_logo.png",
					color: "text-blue-500",
					description: "Configuración y administración de zonas DNS, registros y troubleshooting"
				},
				{
					name: "BIND9",
					level: 70,
					icon: "/images/bind9_logo.png",
					color: "text-blue-700",
					description: "Servidor DNS con BIND9, configuración de zonas y registros"
				},
				{
					name: "TCP/IP",
					level: 80,
					icon: "/images/tcpip_logo.png",
					color: "text-green-700",
					description: "Protocolos de red, direccionamiento, subredes y troubleshooting"
				},
				{
					name: "DHCP",
					level: 75,
					icon: "/images/dhcp_logo.png",
					color: "text-yellow-600",
					description: "Configuración y administración de servidores DHCP"
				},
				{
					name: "HTTP/S",
					level: 85,
					icon: "/images/https_logo.png",
					color: "text-blue-400",
					description: "Protocolos HTTP y HTTPS, seguridad y headers"
				},
				{
					name: "FTP/SFTP",
					level: 70,
					icon: "/images/ftp_logo.png",
					color: "text-blue-600",
					description: "Transferencia de archivos segura y administración de servidores FTP/SFTP"
				},
				{
					name: "SSH",
					level: 85,
					icon: "/images/ssh_logo.png",
					color: "text-orange-800",
					description: "Acceso remoto seguro, túneles y automatización con SSH"
				},
				{
					name: "Email",
					level: 70,
					icon: "/images/email_logo.png",
					color: "text-pink-600",
					description: "Configuración de servicios de correo electrónico y protocolos SMTP/IMAP"
				}
			]
		},
		{
			title: "Programming Languages",
			description: "Lenguajes de programación para diferentes paradigmas y casos de uso",
			gradient: "from-purple-500 to-pink-600",
			technologies: [
				{
					name: "JavaScript",
					level: 90,
					icon: "/images/javascript_logo.png",
					color: "text-yellow-400",
					description: "ES6+, programación asíncrona, closures y patrones de diseño"
				},
				{
					name: "TypeScript",
					level: 85,
					icon: "/images/typescript_logo.png",
					color: "text-blue-600",
					description: "Superset de JavaScript, tipado estático y herramientas avanzadas"
				},
				{
					name: "C",
					level: 85,
					icon: "/images/c_logo.png",
					color: "text-blue-600",
					description: "Programación de sistemas, gestión de memoria y algoritmos complejos"
				},
				{
					name: "Java",
					level: 70,
					icon: "/images/java_logo.png",
					color: "text-red-500",
					description: "Aplicaciones empresariales, Spring Framework y arquitectura MVC"
				},
				{
					name: "PHP",
					level: 75,
					icon: "/images/php_logo.png",
					color: "text-purple-600",
					description: "Desarrollo web backend, Laravel y programación orientada a objetos"
				}
			]
		}
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1
			}
		}
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6 }
		}
	};

	return (
		<section className="flex flex-col gap-8 w-full">
			<motion.div
				className="text-center"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				<h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-4">
					{t('skills.title', 'Habilidades Técnicas')}
				</h2>
				<p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
					{t('skills.subtitle', 'Una visión completa de las tecnologías que domino y utilizo para crear soluciones innovadoras y escalables.')}
				</p>
			</motion.div>

			{/* Category Navigation */}
			<motion.div
				className="flex flex-wrap justify-center gap-4 mb-8"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				{skillCategories.map((category, index) => (
					<motion.button
						key={index}
						variants={itemVariants}
						onClick={() => setActiveCategory(index)}
						className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeCategory === index
							? `bg-gradient-to-r ${category.gradient} text-white shadow-lg`
							: 'bg-gray-200/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-gray-700/50'
							}`}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						{t(`skills.categories.${index}.title`, category.title)}
					</motion.button>
				))}
			</motion.div>

			{/* Active Category Content */}
			<motion.div
				key={activeCategory}
				initial={{ opacity: 0, x: 50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5 }}
				className="space-y-6"
			>
				<div className="text-center mb-8">
					<h3 className={`text-2xl font-bold bg-gradient-to-r ${skillCategories[activeCategory].gradient} bg-clip-text text-transparent mb-2`}>
						{t(`skills.categories.${activeCategory}.title`, skillCategories[activeCategory].title)}
					</h3>
					<p className="text-gray-600 dark:text-gray-300">
						{t(`skills.categories.${activeCategory}.description`, skillCategories[activeCategory].description)}
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{skillCategories[activeCategory].technologies.map((tech, techIndex) => (
						<motion.div
							key={techIndex}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: techIndex * 0.1 }}
						>
							<Card className="h-full bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-lg border border-gray-200/30 dark:border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
								<CardBody className="p-6">
									<div className="flex items-center gap-4 mb-4">
										<div className="w-12 h-12 rounded-lg bg-gray-100/80 dark:bg-white/10 p-2 flex items-center justify-center">
											<Image
												src={tech.icon}
												alt={tech.name}
												className="w-8 h-8 object-contain"
											/>
										</div>
										<div className="flex-1">
											<h4 className={`text-lg font-bold ${tech.color}`}>
												{t(`skills.tech.${normKey(tech.name)}.name`, tech.name)}
											</h4>
											<div className="flex items-center gap-2 mt-1">
												<Progress
													value={tech.level}
													className="flex-1"
													color="secondary"
													size="sm"
												/>
												<span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
													{tech.level}%
												</span>
											</div>
										</div>
									</div>
									<p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
										{t(`skills.tech.${normKey(tech.name)}.description`, tech.description)}
									</p>
									<div className="mt-4">
										<Chip
											size="sm"
											variant="flat"
											className={`${tech.level >= 80 ? 'bg-green-500/20 text-green-600 dark:text-green-300' :
												tech.level >= 70 ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-300' :
													'bg-blue-500/20 text-blue-600 dark:text-blue-300'
												}`}
										>
											{tech.level >= 80 ? t('skills.levels.advanced', 'Avanzado') : tech.level >= 70 ? t('skills.levels.intermediate', 'Intermedio') : t('skills.levels.basic', 'Básico')}
										</Chip>
									</div>
								</CardBody>
							</Card>
						</motion.div>
					))}
				</div>
			</motion.div>

			{/* Additional Skills Summary */}
			<motion.div
				className="mt-12"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.8 }}
			>
				<Card className="bg-gradient-to-br from-purple-100/50 to-blue-100/50 dark:from-purple-900/30 dark:to-blue-900/30 backdrop-blur-lg border border-purple-200/30 dark:border-purple-500/20">
					<CardBody className="p-8">
						<h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
							{t('skills.additional.title', 'Competencias Adicionales')}
						</h3>
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							<div className="text-center">
								<div className="text-3xl mb-2">🎨</div>
								<h4 className="font-semibold text-purple-600 dark:text-purple-300 mb-2">{t('skills.additional.uiux.title', 'UI/UX Design')}</h4>
								<p className="text-sm text-gray-600 dark:text-gray-300">{t('skills.additional.uiux.desc', 'Figma, diseño responsive, user experience')}</p>
							</div>
							<div className="text-center">
								<div className="text-3xl mb-2">⚡</div>
								<h4 className="font-semibold text-blue-600 dark:text-blue-300 mb-2">{t('skills.additional.performance.title', 'Performance')}</h4>
								<p className="text-sm text-gray-600 dark:text-gray-300">{t('skills.additional.performance.desc', 'Optimización web, lazy loading, code splitting')}</p>
							</div>
							<div className="text-center">
								<div className="text-3xl mb-2">🔐</div>
								<h4 className="font-semibold text-green-600 dark:text-green-300 mb-2">{t('skills.additional.security.title', 'Security')}</h4>
								<p className="text-sm text-gray-600 dark:text-gray-300">{t('skills.additional.security.desc', 'JWT, OAuth, HTTPS, sanitización de datos')}</p>
							</div>
							<div className="text-center">
								<div className="text-3xl mb-2">📱</div>
								<h4 className="font-semibold text-pink-600 dark:text-pink-300 mb-2">{t('skills.additional.mobile.title', 'Mobile Dev')}</h4>
								<p className="text-sm text-gray-600 dark:text-gray-300">{t('skills.additional.mobile.desc', 'React Native, Expo, aplicaciones híbridas')}</p>
							</div>
							<div className="text-center">
								<div className="text-3xl mb-2">🧪</div>
								<h4 className="font-semibold text-yellow-600 dark:text-yellow-300 mb-2">{t('skills.additional.testing.title', 'Testing')}</h4>
								<p className="text-sm text-gray-600 dark:text-gray-300">{t('skills.additional.testing.desc', 'Jest, testing unitario, integración')}</p>
							</div>
							<div className="text-center">
								<div className="text-3xl mb-2">📈</div>
								<h4 className="font-semibold text-cyan-600 dark:text-cyan-300 mb-2">{t('skills.additional.analytics.title', 'Analytics')}</h4>
								<p className="text-sm text-gray-600 dark:text-gray-300">{t('skills.additional.analytics.desc', 'Google Analytics, métricas de rendimiento')}</p>
							</div>
						</div>
					</CardBody>
				</Card>
			</motion.div>
		</section>
	);
}
