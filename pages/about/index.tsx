import DefaultLayout from "@/layouts/default";
import { Card } from "@heroui/react";

export default function AboutPage() {
	return (
		<DefaultLayout>
			<div className="space-y-16 py-8 md:py-12">
				{/* Header */}
				<div className="space-y-4">
					<h1 className="text-5xl md:text-6xl font-bold">Sobre mí</h1>
					<p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
						Desarrollador Full Stack apasionado por crear soluciones digitales innovadoras y de alta calidad.
					</p>
				</div>

				{/* Main content */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
					{/* Left - Story */}
					<div className="lg:col-span-2 space-y-8">
						<div className="space-y-4">
							<h2 className="text-3xl font-bold">Mi Historia</h2>
							<div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
								<p>
									Soy Adrián Escribano Pérez, un desarrollador Full Stack con más de 3 años de experiencia en el desarrollo de aplicaciones web modernas. Mi pasión por la tecnología comenzó desde muy joven, y desde entonces no he dejado de aprender y mejorar mis habilidades.
								</p>
								<p>
									Mi objetivo es crear soluciones digitales que no solo funcionen correctamente, sino que también proporcionen una experiencia de usuario excepcional. Creo en la importancia de combinar una arquitectura backend robusta con interfaces frontend intuitivas.
								</p>
								<p>
									A lo largo de mi carrera, he trabajado en diversos proyectos que me han permitido adquirir experiencia en diferentes tecnologías y frameworks. Desde aplicaciones web con React y Next.js hasta servidores backend con Node.js y Express, pasando por desarrollo móvil con React Native.
								</p>
							</div>
						</div>

						<div className="space-y-4">
							<h2 className="text-3xl font-bold">Mi Enfoque</h2>
							<div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
								<p>
									Creo en la importancia de escribir código limpio, mantenible y bien documentado. Siempre intento seguir las mejores prácticas de la industria y estar actualizado con las últimas tendencias tecnológicas.
								</p>
								<p>
									Mi metodología de trabajo se basa en:
								</p>
								<ul className="list-disc list-inside space-y-2 ml-2">
									<li>Entender profundamente los requisitos del proyecto</li>
									<li>Diseñar arquitecturas escalables y mantenibles</li>
									<li>Implementar soluciones con calidad y atención al detalle</li>
									<li>Pruebas exhaustivas y aseguramiento de calidad</li>
									<li>Comunicación clara con el equipo y stakeholders</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Right - Info */}
					<div className="lg:col-span-1 space-y-6">
						{/* Experience Card */}
						<Card className="p-6 space-y-4">
							<h3 className="text-xl font-bold">Experiencia</h3>
							<div>
								<p className="text-3xl font-bold text-blue-600 dark:text-blue-400">3+</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">Años de experiencia</p>
							</div>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Trabajando en desarrollo web full stack, desde startups hasta empresas establecidas.
							</p>
						</Card>

						{/* Projects Card */}
						<Card className="p-6 space-y-4">
							<h3 className="text-xl font-bold">Proyectos</h3>
							<div>
								<p className="text-3xl font-bold text-blue-600 dark:text-blue-400">15+</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">Proyectos completados</p>
							</div>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Desde pequeñas herramientas hasta aplicaciones complejas con múltiples usuarios.
							</p>
						</Card>

						{/* Skills Card */}
						<Card className="p-6 space-y-4">
							<h3 className="text-xl font-bold">Especialización</h3>
							<div className="space-y-2">
								<p className="text-sm">
									<span className="font-semibold">Frontend:</span> React, Next.js, TypeScript
								</p>
								<p className="text-sm">
									<span className="font-semibold">Backend:</span> Node.js, Express, PostgreSQL
								</p>
								<p className="text-sm">
									<span className="font-semibold">DevOps:</span> Docker, Git, Vercel
								</p>
							</div>
						</Card>
					</div>
				</div>

				{/* Timeline */}
				<div className="space-y-8">
					<h2 className="text-3xl font-bold">Mi Trayectoria</h2>
					<div className="space-y-6">
						{[
							{
								year: "2021",
								title: "Inicio en Desarrollo Web",
								description: "Comencé a aprender HTML, CSS y JavaScript. Primeros proyectos personales.",
							},
							{
								year: "2022",
								title: "Especialización en React",
								description: "Profundización en React y Node.js. Primeros proyectos profesionales.",
							},
							{
								year: "2023",
								title: "Full Stack Developer",
								description: "Experiencia completa en el stack MERN. Múltiples proyectos en producción.",
							},
							{
								year: "2024+",
								title: "Innovación Continua",
								description: "Enfoque en Next.js, TypeScript y arquitecturas modernas. Mentoring a otros desarrolladores.",
							},
						].map((item, idx) => (
							<div key={idx} className="flex gap-6">
								<div className="flex flex-col items-center">
									<div className="w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-400 mt-2" />
									{idx !== 3 && <div className="w-0.5 h-24 bg-gray-200 dark:bg-gray-800 mt-2" />}
								</div>
								<div className="pb-6">
									<p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{item.year}</p>
									<h3 className="text-lg font-bold mt-1">{item.title}</h3>
									<p className="text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
}
