export default function LenguajeProgramFrontend() {

	return (
		<section className="w-full h-full flex flex-col gap-6">
			<div className="flex flex-col gap-6 w-full items-center justify-center bg-default-500 bg-opacity-50 p-3 rounded-3xl">
				<h3 className="text-2xl">Programación Frontend</h3>
			</div>
			<div className="flex flex-col gap-6 w-full items-center px-4">
				<div className="flex flex-col gap-6 w-full items-start">
					<p className="text-lg leading-relaxed">
						Tengo experiencia trabajando con diversos lenguajes de programación y frameworks frontend, lo que me ha permitido crear soluciones robustas y escalables para diferentes tipos de proyectos.
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
									<li>HTML</li>
								</ul>
								<ul className="list-disc list-inside flex flex-col gap-1 items-start text-base">
									<li>CSS</li>
								</ul>
							</div>
						</section>
					</section>
					<section className="flex flex-col gap-3 w-full">
						<section className="flex flex-col gap-3 w-full bg-default-500 bg-opacity-50 p-5 rounded-3xl h-full">
							<h5 className="text-xl underline text-center">Frameworks de Desarrollo</h5>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<ul className="list-disc list-inside flex flex-col gap-1 items-start text-base">
									<li>React</li>
									<li>Next.js</li>
								</ul>
								<ul className="list-disc list-inside flex flex-col gap-1 items-start text-base">
									<li>Angular</li>
									<li>SpringBoot</li>
								</ul>
							</div>
						</section>
					</section>
					<section className="flex flex-col gap-3 w-full">
						<section className="flex flex-col gap-3 w-full bg-default-500 bg-opacity-50 p-5 rounded-3xl h-full">
							<h5 className="text-xl underline text-center">Frameworks de Diseño</h5>
							<ul className="list-disc list-inside flex flex-col gap-1 items-start text-base">
								<li>Tailwind CSS</li>
								<li>Bootstrap</li>
							</ul>
						</section>
					</section>
				</div>
				<div className="w-full flex flex-col gap-6 items-center">
					<h3 className="text-2xl text-center font-semibold">Gestión de Servicios</h3>
					<div className="w-full flex flex-col gap-6 items-center px-5">
						<section className="w-full">
							<p className="text-lg leading-relaxed text-justify">
								He trabajado en la gestión de servicios con conexiones a APIs RESTful, implementando autenticación y autorización, documentación, integración con bases de datos y pruebas. Además, he optimizado el rendimiento y la seguridad de las APIs, gestionando errores y excepciones, y aplicando buenas prácticas de desarrollo para garantizar soluciones eficientes y escalables.
							</p>
						</section>
					</div>
					<div className="w-full flex gap-6 items-center px-5">
						<div className="w-full flex flex-col gap-6 items-center">
							<section className="w-full flex gap-6">
								<section className="flex flex-col gap-3 w-full bg-default-500 bg-opacity-50 p-5 rounded-3xl">
									<h5 className="text-xl underline text-center">Conexión con API</h5>
									<ul className="list-disc list-inside flex flex-col gap-1 items-start text-base">
										<li>Axios</li>
										<li>Fetch API</li>
										<li>REST API</li>
									</ul>
								</section>
								<section className="flex flex-col gap-3 w-full bg-default-500 bg-opacity-50 p-5 rounded-3xl">
								</section>
							</section>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
