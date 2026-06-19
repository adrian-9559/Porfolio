"use client";

import { ArrowRight } from "@gravity-ui/icons";
import { Button, Card, Chip } from "@heroui/react";
import { useState } from "react";

interface Experience {
	company: string;
	role: string;
	period: string;
	hours: string;
	description: string;
	responsibilities: string[];
	technologies: string[];
	icon: string;
}

const experiences: Experience[] = [
	{
		company: "Empresa de Sistemas e Infraestructura",
		role: "Técnico de Prácticas - Grado Medio",
		period: "2022",
		hours: "400 horas",
		description:
			"Prácticas profesionales de grado medio donde realicé tareas de mantenimiento preventivo y correctivo de equipos informáticos y gestión de la infraestructura de redes de la empresa.",
		responsibilities: [
			"Mantenimiento preventivo y correctivo de equipos",
			"Instalación y configuración de sistemas operativos",
			"Gestión de redes corporativas",
			"Soporte técnico a usuarios",
			"Documentación de incidencias",
			"Backup y recuperación de datos",
		],
		technologies: [
			"Windows Server",
			"Linux",
			"Redes TCP/IP",
			"Active Directory",
			"Exchange",
			"Virtualización",
		],
		icon: "🖧",
	},
	{
		company: "Consultora de Programación",
		role: "Desarrollador Web Júnior - Grado Superior",
		period: "2024",
		hours: "400 horas",
		description:
			"Prácticas profesionales de grado superior en una consultora especializada donde participé en el desarrollo de múltiples plataformas web completas con arquitectura moderna, tanto frontend como backend.",
		responsibilities: [
			"Desarrollo de plataformas web completas",
			"Diseño de arquitectura de aplicaciones",
			"Desarrollo de APIs RESTful",
			"Diseño de bases de datos",
			"Implementación de autenticación y autorización",
			"Testing y debugging",
			"Documentación técnica",
		],
		technologies: [
			"React",
			"Next.js",
			"Node.js",
			"Express",
			"PostgreSQL",
			"MongoDB",
			"REST APIs",
			"Git",
			"Docker",
		],
		icon: "💻",
	},
];

export function ExperienceSection() {
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-2xl font-bold">Experiencia Profesional</h3>
				<p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
					Haz clic para expandir y ver responsabilidades y tecnologías
				</p>
			</div>

			<div className="space-y-4">
				{experiences.map((exp, idx) => (
					<Card
						key={idx}
						className="overflow-hidden hover:shadow-lg transition-all duration-300 p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
						onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
					>
						{/* Header - Always visible */}
							<div className="flex items-start justify-between gap-4">
								<div className="flex-1">
									<div className="flex items-center gap-3 mb-2">
										<span className="text-3xl">{exp.icon}</span>
										<div>
											<h4 className="text-lg font-bold">{exp.role}</h4>
											<p className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
												{exp.company}
											</p>
										</div>
									</div>
									<div className="flex items-center gap-4 mt-3">
										<span className="text-sm text-gray-600 dark:text-gray-400">{exp.period}</span>
										<Chip
											className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
											size="sm"
										>
											{exp.hours}
										</Chip>
									</div>
								</div>
								<Button
									isIconOnly
									className={`transition-transform ${expandedIndex === idx ? "rotate-90" : ""}`}
									color="primary"
									size="sm"
									variant="light"
								>
									<ArrowRight className="w-5 h-5" />
								</Button>
							</div>
							<p className="text-gray-700 dark:text-gray-300 text-sm mt-4 leading-relaxed">
								{exp.description}
							</p>

						{/* Expanded Content */}
						{expandedIndex === idx && (
							<div className="border-t border-gray-200 dark:border-gray-800 px-6 py-6 space-y-6 bg-gray-50 dark:bg-gray-800/30">
								{/* Responsibilities */}
								<div>
									<h5 className="font-bold text-sm text-gray-600 dark:text-gray-400 mb-3">
										RESPONSABILIDADES
									</h5>
									<ul className="space-y-2">
										{exp.responsibilities.map((resp, i) => (
											<li key={i} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
												<span className="text-blue-600 dark:text-blue-400 font-bold mt-0.5">•</span>
												<span>{resp}</span>
											</li>
										))}
									</ul>
								</div>

								{/* Technologies */}
								<div>
									<h5 className="font-bold text-sm text-gray-600 dark:text-gray-400 mb-3">
										TECNOLOGÍAS Y HERRAMIENTAS
									</h5>
									<div className="flex flex-wrap gap-2">
										{exp.technologies.map((tech, i) => (
											<Chip
												key={i}
												className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50"
												size="sm"
											>
												{tech}
											</Chip>
										))}
									</div>
								</div>
							</div>
						)}
					</Card>
				))}
			</div>
		</div>
	);
}
