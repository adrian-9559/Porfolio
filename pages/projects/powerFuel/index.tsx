import DefaultLayout from "@/layouts/default";
import { useI18n } from "@/utils/i18n";
import { Button, Card, CardBody, CardHeader, Chip, Image, Link } from "@heroui/react";
import { motion } from "framer-motion";

export default function PowerFuelProject() {
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
	const features = [
		{
			icon: "🛒",
			title: "Carrito de Compras Avanzado",
			description: "Sistema de carrito inteligente con persistencia, cálculos automáticos de descuentos y gestión de inventario en tiempo real."
		},
		{
			icon: "💳",
			title: "Pasarelas de Pago Integradas",
			description: "Integración completa con Stripe, PayPal y otras pasarelas de pago para transacciones seguras y confiables."
		},
		{
			icon: "👥",
			title: "Panel de Administración",
			description: "Dashboard completo para gestión de productos, usuarios, pedidos y análisis de ventas con métricas en tiempo real."
		},
		{
			icon: "📱",
			title: "Diseño Responsivo",
			description: "Interfaz optimizada para todos los dispositivos con diseño mobile-first y experiencia de usuario fluida."
		},
		{
			icon: "🔐",
			title: "Autenticación Segura",
			description: "Sistema de autenticación con JWT, verificación de email y roles de usuario diferenciados."
		},
		{
			icon: "📊",
			title: "Analytics y Reportes",
			description: "Sistema de análisis de ventas, productos más vendidos y comportamiento de usuarios con gráficos interactivos."
		}
	];

	const technologies = [
		{ name: "React", color: "bg-blue-500", description: "Frontend moderno y reactivo" },
		{ name: "Next.js", color: "bg-black", description: "Framework full-stack con SSR" },
		{ name: "TailwindCSS", color: "bg-cyan-500", description: "Estilos utility-first" },
		{ name: "Node.js", color: "bg-green-600", description: "Runtime de JavaScript" },
		{ name: "Express", color: "bg-gray-700", description: "Framework backend minimalista" },
		{ name: "MySQL", color: "bg-orange-600", description: "Base de datos relacional" },
		{ name: "Stripe API", color: "bg-purple-600", description: "Procesamiento de pagos" }
	];

	const images = [
		{
			src: "/images/powerFuel/home.png",
			alt: "PowerFuel - Página Principal",
			title: "Página Principal",
			description: "Landing page optimizada con productos destacados y navegación intuitiva"
		},
		{
			src: "/images/powerFuel/adminPanel.png",
			alt: "PowerFuel - Panel de Administración",
			title: "Panel de Administración",
			description: "Dashboard completo para gestión de productos y análisis de ventas"
		},
		{
			src: "/images/powerFuel/adminPanelProducts.png",
			alt: "PowerFuel - Gestión de Productos",
			title: "Gestión de Productos",
			description: "Sistema CRUD completo para administración de inventario"
		}
	];

	return (
		<DefaultLayout>
			<div className="min-h-screen py-8 px-4 max-w-7xl mx-auto pt-4">
				{/* Hero Section */}
				<motion.section
					className="text-center mb-16"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<div className="relative mb-8">
						<h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 bg-clip-text text-transparent mb-4">
							PowerFuel
						</h1>
						<div className="flex items-center justify-center gap-2 mb-4">
							<span className="text-3xl">⚡</span>
							<span className="text-xl text-gray-600 dark:text-gray-300">E-commerce para Deportistas</span>
							<span className="text-3xl">🏋️</span>
						</div>
					</div>

					<p className="text-xl text-gray-700 dark:text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8">
						Plataforma de comercio electrónico especializada en suplementos deportivos y productos fitness.
						Desarrollada con tecnologías modernas, ofreciendo una experiencia de compra completa y segura.
					</p>

					<div className="flex flex-wrap gap-4 justify-center mb-8">
						<Chip
							size="lg"
							className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-600/30"
							variant="flat"
						>
							✅ Proyecto Completado
						</Chip>
						<Chip
							size="lg"
							className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-600/30"
							variant="flat"
						>
							🗓️ 2024
						</Chip>
						<Chip
							size="lg"
							className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-600/30"
							variant="flat"
						>
							🌐 Full Stack
						</Chip>
					</div>

					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button
							as={Link}
							href="https://github.com/adrian-9559/PowerFuel"
							target="_blank"
							className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
							size="lg"
						>
							<span className="mr-2">🔗</span>
							{t('projects.list.PowerFuel.view_github', 'Ver en GitHub')}
						</Button>
						<Button
							variant="bordered"
							className="border-orange-500 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 font-bold py-3 px-8 rounded-2xl transition-all duration-300"
							size="lg"
						>
							<span className="mr-2">📱</span>
							{t('projects.list.PowerFuel.demo', 'Demo Live')}
						</Button>
					</div>
				</motion.section>

				{/* Technologies Section */}
				<motion.section
					className="mb-16"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					<Card className="bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
						<CardHeader className="text-center pb-4">
							<h2 className="text-3xl font-bold text-gray-900 dark:text-white">
								🛠️ Stack Tecnológico
							</h2>
						</CardHeader>
						<CardBody className="pt-0">
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
								{technologies.map((tech, index) => (
									<motion.div
										key={tech.name}
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.5, delay: index * 0.1 }}
										className="group"
									>
										<Card className="h-full bg-white/80 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700/50 transition-all duration-300 border border-gray-200/50 dark:border-gray-600/50 hover:border-orange-300 dark:hover:border-orange-500/50 hover:shadow-lg hover:-translate-y-1">
											<CardBody className="p-4 text-center">
												<div className={`w-12 h-12 ${tech.color} rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}>
													{tech.name.charAt(0)}
												</div>
												<h3 className="font-bold text-gray-900 dark:text-white mb-1">{tech.name}</h3>
												<p className="text-xs text-gray-600 dark:text-gray-300">{tech.description}</p>
											</CardBody>
										</Card>
									</motion.div>
								))}
							</div>
						</CardBody>
					</Card>
				</motion.section>

				{/* Features Section */}
				<motion.section
					className="mb-16"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
				>
					<div className="text-center mb-12">
						<h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
							✨ Características Principales
						</h2>
						<p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
							PowerFuel incluye todas las funcionalidades necesarias para un e-commerce moderno y eficiente
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{features.map((feature, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
							>
								<Card className="h-full bg-gradient-to-br from-white/90 to-orange-50/50 dark:from-gray-900/50 dark:to-orange-900/10 backdrop-blur-lg border border-orange-200/50 dark:border-orange-500/20 hover:border-orange-400/60 dark:hover:border-orange-400/40 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20 hover:-translate-y-1">
									<CardBody className="p-6">
										<div className="text-4xl mb-4 text-center">{feature.icon}</div>
										<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
											{feature.title}
										</h3>
										<p className="text-gray-700 dark:text-gray-200 text-center leading-relaxed">
											{feature.description}
										</p>
									</CardBody>
								</Card>
							</motion.div>
						))}
					</div>
				</motion.section>

				{/* Screenshots Section */}
				<motion.section
					className="mb-16"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.6 }}
				>
					<div className="text-center mb-12">
						<h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
							📸 Capturas de Pantalla
						</h2>
						<p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
							Explora las diferentes secciones de la aplicación y su interfaz intuitiva
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
						{images.map((image, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.6, delay: index * 0.2 }}
							>
								<Card className="overflow-hidden bg-white/90 dark:bg-gray-900/50 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 hover:border-orange-300 dark:hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
									<CardBody className="p-0">
										<div className="relative overflow-hidden group">
											<Image
												src={image.src}
												alt={image.alt}
												className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
											<div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
												<h3 className="font-bold text-lg mb-1">{image.title}</h3>
												<p className="text-sm opacity-90">{image.description}</p>
											</div>
										</div>
									</CardBody>
								</Card>
							</motion.div>
						))}
					</div>
				</motion.section>

				{/* Architecture Section */}
				<motion.section
					className="mb-16"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.8 }}
				>
					<Card className="bg-gradient-to-br from-orange-50/90 to-red-50/90 dark:from-orange-900/20 dark:to-red-900/20 backdrop-blur-lg border border-orange-200/50 dark:border-orange-500/20 shadow-xl">
						<CardHeader className="text-center pb-4">
							<h2 className="text-3xl font-bold text-gray-900 dark:text-white">
								🏗️ Arquitectura del Sistema
							</h2>
						</CardHeader>
						<CardBody className="pt-0">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
								<div className="text-center">
									<div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
										F
									</div>
									<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Frontend</h3>
									<p className="text-gray-700 dark:text-gray-200 text-sm">
										React + Next.js con TailwindCSS para una interfaz moderna y responsiva
									</p>
								</div>
								<div className="text-center">
									<div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
										B
									</div>
									<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Backend</h3>
									<p className="text-gray-700 dark:text-gray-200 text-sm">
										API RESTful con Node.js y Express, autenticación JWT y middleware personalizado
									</p>
								</div>
								<div className="text-center">
									<div className="bg-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
										D
									</div>
									<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Base de Datos</h3>
									<p className="text-gray-700 dark:text-gray-200 text-sm">
										MySQL para integridad referencial y transacciones ACID seguras
									</p>
								</div>
							</div>
						</CardBody>
					</Card>
				</motion.section>

				{/* Contact CTA */}
				<motion.section
					className="text-center"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 1.0 }}
				>
					<Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-2xl">
						<CardBody className="p-8">
							<h2 className="text-3xl font-bold mb-4">{t('projects.cta_title', '¿Interesado en un proyecto similar?')}</h2>
							<p className="text-xl mb-6 opacity-90">
								{t('projects.cta_desc', 'Puedo ayudarte a crear una solución e-commerce personalizada para tu negocio')}
							</p>
							<Button
								as={Link}
								href="mailto:adrigarcia2020@gmail.com"
								className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
								size="lg"
							>
								<span className="mr-2">📧</span>
								{t('projects.cta_contact', 'Contactar Ahora')}
							</Button>
						</CardBody>
					</Card>
				</motion.section>
			</div>
		</DefaultLayout>
	);
}
