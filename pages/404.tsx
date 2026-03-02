import Link from "next/link";

import DefaultLayout from "@/layouts/default";

export default function Custom404Page() {
	return (
		<DefaultLayout>
			<section className="mx-auto max-w-4xl min-h-[70vh] flex items-center justify-center px-4">
				<div className="w-full rounded-3xl border border-white/30 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md shadow-2xl p-8 md:p-12 text-center">
					<p className="text-sm md:text-base font-medium text-purple-600 dark:text-purple-300 tracking-wide uppercase">
						Error 404
					</p>

					<h1 className="mt-3 text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
						Página no encontrada
					</h1>

					<p className="mt-5 text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
						La ruta que intentas abrir no existe o fue movida. Puedes volver al inicio
						o explorar mis proyectos desde aquí.
					</p>

					<div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
						<Link
							href="/"
							className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all"
						>
							Volver al inicio
						</Link>
						<Link
							href="/projects"
							className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold border border-purple-300/70 dark:border-purple-400/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100/60 dark:hover:bg-purple-900/30 transition-all"
						>
							Ver proyectos
						</Link>
					</div>

					<p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
						Si crees que esto es un error, revisa la URL o vuelve a intentar más tarde.
					</p>
				</div>
			</section>
		</DefaultLayout>
	);
}
