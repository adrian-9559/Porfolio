import { Button } from "@heroui/react";
import { EducationSection } from "./education-section";
import { ExperienceSection } from "./experience-section";

export default function ResumeComponent() {
	return (
		<div className="space-y-12 py-8 md:py-12">
			{/* Header */}
			<div className="space-y-4">
				<h1 className="text-5xl md:text-6xl font-bold">Mi Trayectoria</h1>
				<p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
					Mi formación académica y experiencia profesional en el desarrollo y administración de sistemas.
				</p>
			</div>

			{/* Experience Section */}
			<div>
				<ExperienceSection />
			</div>

			{/* Education Section */}
			<div>
				<EducationSection />
			</div>

			{/* Stats */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
				{[
					{ label: "Años de Exp.", value: "3+" },
					{ label: "Horas Prácticas", value: "800+" },
					{ label: "Proyectos", value: "15+" },
					{ label: "Tecnologías", value: "20+" },
				].map((stat, idx) => (
					<div key={idx} className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 text-center border border-blue-100 dark:border-blue-900/30">
						<p className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
							{stat.value}
						</p>
						<p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{stat.label}</p>
					</div>
				))}
			</div>

			{/* Download CV */}
			<div className="flex justify-center pt-8">
				<Button
					as="a"
					className="px-8 py-6 text-base font-semibold"
					color="primary"
					download="Adrian_Escribano_CV.pdf"
					href="/cv/Adrian_Escribano_CV.pdf"
					size="lg"
				>
					Descargar CV en PDF
				</Button>
			</div>
		</div>
	);
}
