"use client";

import { ArrowRight } from "@gravity-ui/icons";
import { Button, Card } from "@heroui/react";
import { useState } from "react";
import { EducationModal } from "./education-modal";

interface Education {
	institution: string;
	program: string;
	year: string;
	description: string;
	subjects: string[];
	icon: string;
}

const education: Education[] = [
	{
		institution: "IES Luis Braille",
		program: "FP Grado Medio: Sistemas Microinformáticos y Redes",
		year: "2020 - 2022",
		description:
			"Formación profesional en sistemas microinformáticos y redes. Adquirí conocimientos sólidos en administración de sistemas, mantenimiento de hardware, configuración de redes y soporte técnico.",
		subjects: [
			"Hardware",
			"Sistemas Operativos",
			"Configuración de Redes",
			"TCP/IP",
			"Active Directory",
			"Linux",
			"Windows Server",
			"Cableado Estructurado",
		],
		icon: "🖥️",
	},
	{
		institution: "IES Luis Braille",
		program: "FP Grado Superior: Desarrollo de Aplicaciones Web",
		year: "2022 - 2024",
		description:
			"Formación avanzada en desarrollo de aplicaciones web. Dominé tanto frontend como backend, bases de datos, control de versiones y metodologías ágiles. Proyectos profesionales en producción.",
		subjects: [
			"HTML/CSS/JavaScript",
			"React",
			"Node.js",
			"Express",
			"PostgreSQL",
			"MongoDB",
			"Git",
			"REST APIs",
			"Metodologías Ágiles",
			"Responsive Design",
		],
		icon: "🌐",
	},
	{
		institution: "42 Madrid",
		program: "42 Common Core - Cursus",
		year: "2025 - Presente",
		description:
			"Educación técnica intensiva en programación, algoritmos, estructuras de datos y ciencias de la computación. Enfoque peer-to-peer learning y project-based learning. Desarrollo de proyectos en C, C++ y sistemas.",
		subjects: [
			"C",
			"C++",
			"Algoritmos",
			"Estructuras de Datos",
			"Sistemas Operativos",
			"Redes",
			"Desarrollo de Sistemas",
			"Problem Solving",
			"Proyectos en Equipo",
		],
		icon: "🚀",
	},
];

export function EducationSection() {
	const [selectedEducation, setSelectedEducation] = useState<Education | null>(null);

	return (
		<>
			<div className="space-y-6">
				<div>
					<h3 className="text-2xl font-bold">Educación</h3>
					<p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
						Haz clic en cualquier formación para ver más detalles y temas estudiados
					</p>
				</div>

				<div className="space-y-4">
					{education.map((edu, idx) => (
						<Card
							key={idx}
							className="p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer border border-gray-200 dark:border-gray-800"
							onClick={() => setSelectedEducation(edu)}
						>
							<div className="flex items-start justify-between gap-4">
								<div className="flex-1">
									<div className="flex items-center gap-3 mb-2">
										<span className="text-3xl">{edu.icon}</span>
										<div>
											<h4 className="text-lg font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
												{edu.institution}
											</h4>
											<p className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
												{edu.program}
											</p>
										</div>
									</div>
									<p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{edu.year}</p>
								</div>
								<Button
									isIconOnly
									className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
									color="primary"
									size="sm"
									variant="light"
								>
									<ArrowRight className="w-5 h-5" />
								</Button>
							</div>
						</Card>
					))}
				</div>
			</div>

			{/* Education Modal */}
			{selectedEducation && (
				<EducationModal
					education={selectedEducation}
					isOpen={!!selectedEducation}
					onOpenChange={(open) => {
						if (!open) setSelectedEducation(null);
					}}
				/>
			)}
		</>
	);
}
