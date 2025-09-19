import { useI18n } from "@/utils/i18n";
import { Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface MetricCard {
	title: string;
	value: number;
	suffix: string;
	description: string;
	gradient: string;
	icon: string;
}

export default function Metrics() {
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
	const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});

	const metrics: MetricCard[] = [
		{
			title: "Años de Experiencia",
			value: 3,
			suffix: "+",
			description: "Desarrollando soluciones web innovadoras",
			gradient: "from-blue-500 to-purple-600",
			icon: "🚀"
		},
		{
			title: "Proyectos Completados",
			value: 25,
			suffix: "+",
			description: "Aplicaciones web y sistemas desarrollados",
			gradient: "from-green-500 to-teal-600",
			icon: "💻"
		},
		{
			title: "Tecnologías Dominadas",
			value: 15,
			suffix: "+",
			description: "Lenguajes, frameworks y herramientas",
			gradient: "from-purple-500 to-pink-600",
			icon: "⚡"
		},
		{
			title: "Commits en GitHub",
			value: 1500,
			suffix: "+",
			description: "Contribuciones activas a proyectos",
			gradient: "from-orange-500 to-red-600",
			icon: "📊"
		},
		{
			title: "Líneas de Código",
			value: 50000,
			suffix: "+",
			description: "Escritas en diversos proyectos",
			gradient: "from-cyan-500 to-blue-600",
			icon: "💾"
		},
		{
			title: "Satisfacción del Cliente",
			value: 98,
			suffix: "%",
			description: "Basado en feedback de proyectos",
			gradient: "from-yellow-500 to-orange-600",
			icon: "⭐"
		}
	];

	const achievements = [
		{
			title: "Desarrollo Full Stack",
			description: "Especialización en aplicaciones completas desde frontend hasta backend",
			progress: 90,
			color: "bg-gradient-to-r from-blue-500 to-purple-600"
		},
		{
			title: "Optimización de Performance",
			description: "Mejoras promedio del 40% en velocidad de carga de aplicaciones",
			progress: 85,
			color: "bg-gradient-to-r from-green-500 to-teal-600"
		},
		{
			title: "Arquitectura de Software",
			description: "Diseño de sistemas escalables y mantenibles",
			progress: 80,
			color: "bg-gradient-to-r from-purple-500 to-pink-600"
		},
		{
			title: "DevOps & Despliegue",
			description: "Automatización y despliegue continuo en la nube",
			progress: 75,
			color: "bg-gradient-to-r from-orange-500 to-red-600"
		}
	];

	useEffect(() => {
		const timers: NodeJS.Timeout[] = [];

		metrics.forEach((metric, index) => {
			const timer = setTimeout(() => {
				animateValue(metric.title, metric.value);
			}, index * 200);
			timers.push(timer);
		});

		return () => timers.forEach(timer => clearTimeout(timer));
	}, []);

	const animateValue = (key: string, target: number) => {
		let current = 0;
		const increment = target / 50;
		const timer = setInterval(() => {
			current += increment;
			if (current >= target) {
				current = target;
				clearInterval(timer);
			}
			setAnimatedValues(prev => ({ ...prev, [key]: Math.floor(current) }));
		}, 30);
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
		<section className="flex flex-col gap-12 w-full py-16">
			<motion.div
				className="text-center"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				<h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-4">
					{t('metrics.title', 'Métricas & Logros')}
				</h2>
				<p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
					{t('metrics.subtitle', 'Datos que reflejan mi dedicación, crecimiento profesional y el impacto de mi trabajo en proyectos reales.')}
				</p>
			</motion.div>

			{/* Metrics Grid */}
			<motion.div
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				{metrics.map((metric, index) => (
					<motion.div key={index} variants={cardVariants}>
						<Card className="h-full bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-lg border border-gray-200/30 dark:border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 group">
							<CardBody className="p-6 text-center">
								<div className="flex flex-col items-center gap-4">
									<div className={`text-4xl p-4 rounded-2xl bg-gradient-to-r ${metric.gradient} bg-opacity-20 group-hover:scale-110 transition-transform duration-300`}>
										{metric.icon}
									</div>
									<div>
										<div className={`text-4xl font-bold bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent mb-2`}>
											{animatedValues[metric.title] || 0}{metric.suffix}
										</div>
										<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
											{t(`metrics.cards.${index}.title`, metric.title)}
										</h3>
										<p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
											{t(`metrics.cards.${index}.description`, metric.description)}
										</p>
									</div>
								</div>
							</CardBody>
						</Card>
					</motion.div>
				))}
			</motion.div>

			{/* Achievements Section */}
			<motion.div
				className="mt-16"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.8 }}
			>
				<Card className="bg-gradient-to-br from-purple-100/50 to-blue-100/50 dark:from-purple-900/30 dark:to-blue-900/30 backdrop-blur-lg border border-purple-200/30 dark:border-purple-500/20">
					<CardBody className="p-8">
						<h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
							{t('metrics.areas_title', 'Áreas de Especialización')}
						</h3>
						<div className="grid gap-6 md:grid-cols-2">
							{achievements.map((achievement, index) => (
								<motion.div
									key={index}
									className="space-y-3"
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
								>
									<div className="flex justify-between items-center">
										<h4 className="text-lg font-semibold text-gray-900 dark:text-white">
											{t(`metrics.achievements.list.${index}.title`, achievement.title)}
										</h4>
										<span className="text-sm font-bold text-purple-600 dark:text-purple-300">
											{achievement.progress}%
										</span>
									</div>
									<div className="relative">
										<div className="w-full bg-gray-300/50 dark:bg-gray-700/50 rounded-full h-3 overflow-hidden">
											<motion.div
												className={`h-full ${achievement.color} rounded-full`}
												initial={{ width: 0 }}
												animate={{ width: `${achievement.progress}%` }}
												transition={{ duration: 1.5, delay: 1.2 + index * 0.1 }}
											/>
										</div>
									</div>
									<p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
										{t(`metrics.achievements.list.${index}.description`, achievement.description)}
									</p>
								</motion.div>
							))}
						</div>
					</CardBody>
				</Card>
			</motion.div>

			{/* Professional Goals */}
			<motion.div
				className="mt-8"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 1.2 }}
			>
				<Card className="bg-gradient-to-br from-green-100/80 to-teal-100/80 dark:from-green-900/30 dark:to-teal-900/30 backdrop-blur-lg border border-green-200/50 dark:border-green-500/20 shadow-lg">
					<CardBody className="p-8 text-center">
						<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
							{t('metrics.goals_title', 'Objetivos Profesionales 2024-2025')}
						</h3>
						<div className="grid gap-6 md:grid-cols-3 mt-6">
							{(messages?.metrics?.goals ?? []).map((goal: any, idx: number) => (
								<div key={idx} className="flex flex-col items-center gap-3 p-4 rounded-lg bg-white/50 dark:bg-gray-800/30 border border-gray-200/30 dark:border-gray-700/30">
									<div className="text-3xl">{idx === 0 ? '🎯' : idx === 1 ? '📱' : '🤖'}</div>
									<h4 className="font-semibold text-green-600 dark:text-green-300">{t(`metrics.goals.${idx}.title`, goal.title)}</h4>
									<p className="text-sm text-gray-700 dark:text-gray-300">{t(`metrics.goals.${idx}.description`, goal.description)}</p>
								</div>
							))}
						</div>
					</CardBody>
				</Card>
			</motion.div>
		</section>
	);
}
