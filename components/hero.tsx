import { ArrowShapeDownToLine } from "@gravity-ui/icons";
import { Avatar, Badge, Button, Chip, Tooltip } from "@heroui/react";

export default function Hero() {
	return (
		<section className="relative w-full py-20 md:py-32 lg:py-40">
			{/* Gradient background */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-transparent to-transparent dark:from-blue-950/20 dark:via-transparent dark:to-transparent" />
			</div>

			<div className="space-y-8 text-center">
				{/* Chip */}
				<div className="flex flex-col items-center gap-4">
					<Badge.Anchor>
						<Avatar className="w-32 h-32">
							<Avatar.Image src="/images/profile.png" />
						</Avatar>
						<Badge color="success" placement="bottom-right" size="sm" />
					</Badge.Anchor>
					<Chip
						className="px-4 py-2 text-sm font-medium"
					>
						Hola, soy Adrián Escribano
					</Chip>
				</div>

				{/* Main heading */}
				<div className="space-y-4">
					<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
						Full Stack
						<span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400">
							Developer
						</span>
					</h1>

					<p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
						Creo soluciones digitales innovadoras combinando arquitecturas robustas con interfaces intuitivas
					</p>
				</div>

				{/* CTA Buttons */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
					<Button
						className="px-8 py-6 text-base font-semibold"
						variant="primary"
						onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
						size="lg"
					>
						Ver mis proyectos
					</Button>
					<Tooltip delay={100}>
						<Button
							className="px-8 py-6 text-base font-semibold bg-default hover:bg-gray-100 dark:hover:bg-gray-800"
							isIconOnly
							onClick={() => {
								const link = document.createElement("a");
								link.href = "/files/Adrian_Escribano_CV.pdf";
								link.download = "Adrian_Escribano_CV.pdf";
								link.click();
							}}
						>
							<ArrowShapeDownToLine className="w-5 h-5" />
						</Button>
						<Tooltip.Content>
							<p className="text-sm">Descargar CV</p>
						</Tooltip.Content>
					</Tooltip>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-3 gap-8 pt-12 md:pt-16 max-w-md mx-auto">
					<div className="text-center">
						<p className="text-3xl md:text-4xl font-bold">3+</p>
						<p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Años de experiencia</p>
					</div>
					<div className="text-center">
						<p className="text-3xl md:text-4xl font-bold">15+</p>
						<p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Proyectos completados</p>
					</div>
					<div className="text-center">
						<p className="text-3xl md:text-4xl font-bold">100%</p>
						<p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Dedicación</p>
					</div>
				</div>
			</div>
		</section>
	);
}
