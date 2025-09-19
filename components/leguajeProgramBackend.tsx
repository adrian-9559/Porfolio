export default function LenguajeProgramBackend() {
	return (
		<section className="w-full h-full flex flex-col gap-6">
			<div className="flex flex-col gap-6 w-full items-center justify-center bg-default-500 bg-opacity-50 p-3 rounded-3xl">
				<h3 className="text-2xl">Programación Backend</h3>
			</div>
			<div className="flex flex-col gap-6 w-full items-center px-4">
				<div className="flex flex-col gap-6 w-full items-start">
					<p className="text-lg leading-relaxed">
						Tengo experiencia trabajando con diversos lenguajes de programación y frameworks backend, lo que me ha permitido crear soluciones robustas y escalables para diferentes tipos de proyectos.
					</p>
				</div>
				<div className="grid xl:flex gap-6 w-full justify-center">
					<section className="flex flex-col gap-3 w-full">
						<section className="flex flex-col gap-3 w-full bg-default-500 bg-opacity-50 p-5 rounded-3xl h-full">
							<h5 className="text-xl underline text-center">Lenguajes de Programación</h5>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<ul className="list-disc list-inside flex flex-col gap-1 items-start text-base">
									<li>JavaScript</li>
									<li>TypeScript</li>
									<li>PHP</li>
									<li>C</li>
								</ul>
								<ul className="list-disc list-inside flex flex-col gap-1 items-start text-base">
									<li>Java</li>
									<li>Bash</li>
								</ul>
							</div>
						</section>
					</section>
					<section className="flex flex-col gap-3 w-full">
						<section className="flex flex-col gap-3 w-full bg-default-500 bg-opacity-50 p-5 rounded-3xl h-full">
							<h5 className="text-xl underline text-center">Frameworks Backend</h5>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<ul className="list-disc list-inside flex flex-col gap-1 items-start text-base">
									<li>Node.js</li>
									<li>Express.js</li>
								</ul>
								<ul className="list-disc list-inside flex flex-col gap-1 items-start text-base">
									<li>Laravel</li>
									<li>SpringBoot</li>
								</ul>
							</div>
						</section>
					</section>
					<section className="flex flex-col gap-3 w-full">
						<section className="flex flex-col gap-3 w-full bg-default-500 bg-opacity-50 p-5 rounded-3xl h-full">
							<h5 className="text-xl underline text-center">Bases de Datos</h5>
							<ul className="list-disc list-inside flex flex-col gap-1 items-start text-base">
								<li>MySQL</li>
								<li>Oracle SQL</li>
							</ul>
						</section>
					</section>
				</div>
				<div className="w-full">
					<h3 className="text-2xl text-center">APIs REST</h3>
					<div className="w-full items-center px-5 flex flex-col gap-6">
						<section className="w-full">
							<p>
								He trabajado en el diseño y desarrollo de APIs RESTful, implementando autenticación y autorización, documentación, integración con bases de datos y pruebas. También he optimizado el rendimiento y la seguridad de las APIs, gestionando errores y excepciones, y aplicando buenas prácticas de desarrollo.
							</p>
						</section>
						<section className="flex flex-col gap-3 w-full">
							<section className="flex flex-col gap-3 w-full bg-default-500 bg-opacity-50 p-5 rounded-3xl h-full">
								<h5 className="text-xl underline text-center">Características de APIs REST</h5>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<ul className="list-disc list-inside flex flex-col gap-1 items-start text-base">
										<li>Diseño y desarrollo de APIs RESTful</li>
										<li>Autenticación y autorización (JWT, OAuth)</li>
										<li>Documentación de APIs</li>
										<li>Integración con bases de datos</li>
										<li>Pruebas de APIs</li>
										<li>Implementación de controladores y servicios</li>
										<li>Gestión de errores y excepciones</li>
									</ul>
									<ul className="list-disc list-inside flex flex-col gap-1 items-start text-base">
										<li>Optimización de rendimiento</li>
										<li>Seguridad en APIs</li>
										<li>Versionado de APIs</li>
										<li>Implementación de CORS</li>
										<li>Implementación de paginación y filtrado</li>
										<li>Implementación de caché</li>
										<li>Implementación de pruebas unitarias y de integración</li>
									</ul>
								</div>
							</section>
						</section>
					</div>
				</div>
			</div>
		</section>
	)
}
