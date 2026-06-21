import { Star } from "@gravity-ui/icons";
import { Card } from "@heroui/react";

interface Testimonial {
	name: string;
	role: string;
	company: string;
	content: string;
	image: string;
	rating: number;
}

const testimonials: Testimonial[] = [
	{
		name: "María García",
		role: "Product Manager",
		company: "TechStartup",
		content: "Adrián fue fundamental en el desarrollo de nuestra plataforma. Su atención al detalle y conocimiento técnico fueron excepcionales.",
		image: "👩‍💼",
		rating: 5,
	},
	{
		name: "Carlos López",
		role: "CEO",
		company: "DigitalSolutions",
		content: "Trabajar con Adrián fue una experiencia excelente. Entregó el proyecto a tiempo y superó nuestras expectativas.",
		image: "👨‍💼",
		rating: 5,
	},
	{
		name: "Laura Martínez",
		role: "UX Designer",
		company: "CreativeStudio",
		content: "Su comprensión de las especificaciones técnicas y capacidad para traducirlas en código fue impresionante.",
		image: "👩‍🎨",
		rating: 5,
	},
];

export default function Testimonials() {
	return (
		<section className="w-full py-20 md:py-32">
			<div className="space-y-12">
				{/* Header */}
				<div className="text-center space-y-4">
					<h2 className="text-4xl md:text-5xl font-bold">Lo que dicen de mí</h2>
					<p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
						Feedback de clientes y colaboradores con los que he trabajado
					</p>
				</div>

				{/* Testimonials Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{testimonials.map((testimonial, idx) => (
						<Card
							key={idx}
							className="p-8 hover:shadow-lg transition-shadow duration-300"
						>
							<div className="space-y-4">
								{/* Rating */}
								<div className="flex gap-1">
									{Array.from({ length: testimonial.rating }).map((_, i) => (
										<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
									))}
								</div>

								{/* Quote */}
								<p className="text-gray-600 dark:text-gray-400 italic leading-relaxed">
									"{testimonial.content}"
								</p>

								{/* Author */}
								<div className="flex items-center gap-4 pt-4">
									<div className="text-3xl">{testimonial.image}</div>
									<div>
										<p className="font-semibold text-foreground">{testimonial.name}</p>
										<p className="text-sm text-gray-500 dark:text-gray-400">
											{testimonial.role} en {testimonial.company}
										</p>
									</div>
								</div>
							</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
