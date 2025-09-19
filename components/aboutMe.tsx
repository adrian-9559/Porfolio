import { useI18n } from "@/utils/i18n";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutMe() {
	const { messages } = useI18n();
	const t = (path: string, fallback?: string) => {
		const parts = path.split('.');
		let cur: any = messages;
		for (const p of parts) {
			if (!cur) return fallback ?? '';
			cur = cur[p];
		}
		return cur ?? fallback ?? '';
	};
	return (
		<motion.section
			className="relative w-full max-w-5xl mx-auto my-16 px-6 py-16 bg-gradient-to-br from-purple-100/80 via-white/80 to-blue-100/80 dark:from-purple-900/60 dark:via-gray-900/80 dark:to-blue-900/60 rounded-3xl shadow-2xl border border-purple-200/40 dark:border-purple-900/40 flex flex-col lg:flex-row gap-12 items-center overflow-hidden"
			initial={{ opacity: 0, y: 60 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 1 }}
		>
			{/* Imagen de usuario */}
			<div className="flex flex-col items-center gap-4 lg:w-1/3">
				<div className="relative w-40 h-40 lg:w-56 lg:h-56 mb-2">
					<Image
						src="/images/userIMG.png"
						alt="Adrián Escribano - Foto de perfil"
						fill
						className="object-cover rounded-full border-4 border-blue-400 shadow-xl"
						priority
					/>
				</div>
				<span className="text-base text-gray-600 dark:text-gray-300 italic mt-2">Fan de Linux, el software libre y la cultura open source</span>
			</div>

			{/* Texto principal */}
			<div className="flex-1 flex flex-col gap-8">
				<h2 className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-blue-600 to-pink-500 text-center lg:text-left drop-shadow-lg">
					{t('about.title', 'Sobre mí')}
				</h2>
				<p className="text-xl lg:text-2xl text-gray-800 dark:text-gray-100 leading-relaxed text-center lg:text-left">
					{t('about.intro', '¡Hola! Soy Adrián Escribano, desarrollador Full Stack con una gran pasión por la tecnología, el software libre y la innovación. Me especializo en crear productos digitales robustos, escalables y visualmente atractivos, cuidando cada detalle desde la arquitectura backend hasta la experiencia de usuario frontend.')}
				</p>
				<p className="text-lg lg:text-xl text-gray-700 dark:text-gray-200 leading-relaxed text-center lg:text-left">
					{t('about.stack', 'Disfruto aprendiendo nuevas tecnologías, resolviendo retos complejos y colaborando en equipos multidisciplinares. Mi stack principal incluye JavaScript, TypeScript, React, Next.js, Node.js, PHP, Java, C, Bash y MySQL, pero siempre estoy abierto a explorar nuevas herramientas y lenguajes.')}
				</p>
				<p className="text-lg lg:text-xl text-gray-700 dark:text-gray-200 leading-relaxed text-center lg:text-left">
					{t('about.extra', 'Además de programar, me motiva el deporte, la música, la divulgación tecnológica y contribuir a la comunidad open source. Creo en la mejora continua, la comunicación transparente y el impacto positivo de la tecnología en la sociedad.')}
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="bg-white/80 dark:bg-default-500/60 rounded-2xl p-6 shadow-lg border border-gray-200/30 dark:border-white/10">
						<h3 className="text-lg font-bold text-purple-700 dark:text-purple-300 mb-2">¿Cómo trabajo?</h3>
						<ul className="list-disc list-inside text-base text-gray-700 dark:text-gray-200 space-y-1">
							<li>Me involucro en todo el ciclo de desarrollo: desde la idea hasta el despliegue.</li>
							<li>Priorizo la calidad del código, la escalabilidad y la seguridad.</li>
							<li>Trabajo en equipo, comparto conocimiento y aprendo de los demás.</li>
							<li>Me adapto rápido a nuevas tecnologías y metodologías.</li>
						</ul>
					</div>
					<div className="bg-white/80 dark:bg-default-500/60 rounded-2xl p-6 shadow-lg border border-gray-200/30 dark:border-white/10">
						<h3 className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-2">Más allá del código</h3>
						<ul className="list-disc list-inside text-base text-gray-700 dark:text-gray-200 space-y-1">
							<li>Apasionado del software libre y la filosofía open source.</li>
							<li>Amante del deporte, la música y la naturaleza.</li>
							<li>Siempre dispuesto a ayudar y colaborar en la comunidad tech.</li>
							<li>Busco el equilibrio entre vida personal y profesional.</li>
						</ul>
					</div>
				</div>
				<p className="text-lg lg:text-xl text-gray-700 dark:text-gray-200 text-center lg:text-left mt-4">
					{t('about.cta', 'Si buscas a alguien comprometido, resolutivo, creativo y con ganas de crecer, ¡no dudes en contactarme! Siempre abierto a nuevos retos, proyectos y colaboraciones.')}
				</p>
			</div>

			{/* Decoraciones visuales */}
			<div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl animate-pulse z-0" />
			<div className="absolute -bottom-16 right-0 w-56 h-56 bg-blue-400/20 rounded-full blur-2xl animate-pulse z-0" />
		</motion.section>
	);
}
