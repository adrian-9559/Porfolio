import { Card } from "@heroui/react";

interface Metric {
	icon: string;
	label: string;
	value: string;
	description: string;
}

const metrics: Metric[] = [
	{
		icon: "🚀",
		label: "Proyectos Completados",
		value: "15+",
		description: "Aplicaciones web y sistemas en producción",
	},
	{
		icon: "📚",
		label: "Años de Experiencia",
		value: "3+",
		description: "Desarrollando soluciones innovadoras",
	},
	{
		icon: "⚡",
		label: "Tecnologías Dominadas",
		value: "20+",
		description: "Lenguajes, frameworks y herramientas",
	},
	{
		icon: "💻",
		label: "Commits en GitHub",
		value: "1000+",
		description: "Contribuciones activas a proyectos",
	},
];

export default function Stats() {
	return (
		<section className="w-full py-20 md:py-32">
			<div className="space-y-12">
				{/* Header */}
				<div className="text-center space-y-4">
					<h2 className="text-4xl md:text-5xl font-bold">Por los números</h2>
					<p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
						Datos que reflejan mi dedicación y el impacto de mi trabajo
					</p>
				</div>

				{/* Metrics Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{metrics.map((metric, idx) => (
						<Card
							key={idx}
							className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 group"
						>
							<div className="space-y-4">
								{/* Icon */}
								<div className="text-5xl group-hover:scale-110 transition-transform duration-300">
									{metric.icon}
								</div>

								{/* Value */}
								<div>
									<p className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
										{metric.value}
									</p>
									<p className="text-lg font-semibold mt-2">{metric.label}</p>
								</div>

								{/* Description */}
								<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
									{metric.description}
								</p>
							</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
