import DesarrolloAplicacionesWeb from "@/components/desarrolloAplicacionesWeb";
import SistemasMicroinformaticos from "@/components/sistemasMicroinformaticos";
import MadridTelefonica from "@/components/madridTelefonica";

export default function Experience() {

	return (
		<section className="grid xl:flex gap-20 w-full">
			<div className="flex flex-col gap-4 w-full">
				<h2 className="text-3xl text-center">Estudios</h2>
				<div className="flex gap-4 w-auto">
					<div className="flex flex-col gap-4">
						<MadridTelefonica />
						<DesarrolloAplicacionesWeb />
						<SistemasMicroinformaticos />
					</div>
				</div>
			</div>
			<section className="flex flex-col gap-4 sm:gap-10 w-full xl:w-2/3">
				<div className="flex flex-col gap-6 w-full">
					<h2 className="text-3xl text-center">Conocimientos y Experiencia</h2>
					<ul className="list-disc list-inside gap-2 flex flex-col">
						<li>
							Adquisición de conocimientos fundamentales para el desarrollo de aplicaciones, aplicados en proyectos como sistemas de gestión interna, plataformas de comercio electrónico y sitios web dinámicos.
						</li>
						<li>
							Implementación de conceptos clave como conexión a bases de datos, autenticación de usuarios y generación de contenido dinámico.
						</li>
						<li>
							Experiencia con herramientas como gestores de dependencias, control de versiones con Git y entornos de desarrollo integrados (IDE) para optimizar el flujo de trabajo.
						</li>
						<li>
							Resolución de desafíos técnicos y propuesta de soluciones eficientes adaptadas a las necesidades de cada proyecto.
						</li>
						<li>
							Desarrollo e integración de APIs RESTful para la comunicación entre aplicaciones, incluyendo el manejo de peticiones HTTP, autenticación y procesamiento de datos en formato JSON.
						</li>
					</ul>
				</div>
				<div className="flex flex-col gap-6 w-full">
					<h2 className="text-3xl text-center">Proyectos Destacados</h2>
					<ul className="list-disc list-inside gap-2 flex flex-col">
						<li>
							Desarrollo de una plataforma de comercio electrónico con integración de pasarelas de pago y gestión de inventario en tiempo real.
						</li>
						<li>
							Creación de un sistema de gestión interna para una empresa, incluyendo módulos de seguimiento de tareas y generación de reportes.
						</li>
					</ul>
				</div>
			</section>
		</section>
	)
}