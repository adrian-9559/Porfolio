import { ArrowRight, Envelope } from "@gravity-ui/icons";
import { Button } from "@heroui/react";

export default function CTA() {
	return (
		<section className="w-full py-20 md:py-32">
			<div className="relative rounded-3xl overflow-hidden">
				{/* Background gradient */}
				<div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-700 dark:to-cyan-700" />
				<div className="absolute inset-0 opacity-10 bg-pattern" />

				{/* Content */}
				<div className="relative px-6 md:px-12 py-16 md:py-24 text-center space-y-8">
					<div className="space-y-4">
						<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
							¿Listo para empezar?
						</h2>
						<p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
							Déjame saber si tienes un proyecto interesante o si quieres colaborar
						</p>
					</div>

					{/* Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
						<Button
							className="px-8 py-6 text-base font-semibold"
							color="default"
							onClick={() => window.location.href = "mailto:adrian.escribano.perez@gmail.com"}
							size="lg"
						>
							<Envelope className="w-5 h-5" />
							Enviarme un email
						</Button>
						<Button
							as="a"
							className="px-8 py-6 text-base font-semibold"
							color="default"
							href="https://www.linkedin.com/in/adrián-escribano-pérez"
							size="lg"
							target="_blank"
							variant="bordered"
						>
							<ArrowRight className="w-5 h-5" />
							LinkedIn
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
