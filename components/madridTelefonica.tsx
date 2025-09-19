import { useI18n } from "@/utils/i18n";
import { Card, Chip, Image, Link } from "@heroui/react";

export default function MadridTelefonica() {
	const { messages } = useI18n();
	const t = (path: string, fallback?: string) => {
		const parts = path.split('.');
		let cur: any = messages;
		for (const p of parts) {
			if (!cur) return fallback ?? '';
			cur = cur[p];
		}
		return cur ?? fallback ?? '';
	}

	return (
		<section>
			<Card className="flex flex-col gap-4 p-6 bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" arial-label="Card de 42 Madrid">
				<section className="grid sm:flex gap-4 justify-between items-center">
					<div className="flex justify-center items-center rounded-full shadow-md bg-white p-2">
						<Image
							src="/images/42_Logo.png"
							alt="Logo de 42 Madrid"
							className="rounded-full"
							width={90}
							height={70}
						/>
					</div>
					<section className="flex w-full justify-between">
						<div className="w-full flex flex-col gap-2 items-start">
							<h3 className="text-2xl font-bold text-gray-900 dark:text-white w-full">{t('experience.education.madridTelefonica.title', '42 Madrid')}</h3>
							<p className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('experience.education.madridTelefonica.subtitle', 'Campus de programación innovador')}</p>
						</div>
						<div className="flex flex-col gap-2 text-center">
							<p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('experience.education.madridTelefonica.yearLabel', 'Año cursado:')}</p>
							<Chip className="font-medium" color="warning" variant="flat">
								{t('experience.education.madridTelefonica.years', '2025 - Actualidad')}
							</Chip>
						</div>
					</section>
				</section>

				<Link className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105" href="https://www.fundaciontelefonica.com/">
					<div className="bg-white rounded-full p-1">
						<Image
							src="/images/logo_telefonica.jpg"
							alt="Logo de Telefonica"
							className="rounded-full"
							width={40}
							height={40}
						/>
					</div>
					<p className="text-lg font-semibold">{t('experience.education.madridTelefonica.affiliation', 'Fundación Telefónica')}</p>
				</Link>

				<p className="leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50/50 dark:bg-gray-700/30 p-4 rounded-lg border-l-4 border-purple-500">
					{t('experience.education.madridTelefonica.description', 'Actualmente estoy cursando un programa intensivo de desarrollo de software, enfocado en la resolución de problemas, programación en equipo y aprendizaje autónomo. Este programa me permite desarrollar habilidades técnicas esenciales para el mundo laboral.')}
				</p>

				<section className="w-full grid xl:flex justify-between items-center gap-3 xl:gap-4">
					<Link
						className="flex w-full items-center justify-center gap-2 text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-3 text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
						href="https://www.42madrid.com/"
					>
						{t('experience.education.madridTelefonica.website42', '🌐 Web oficial 42 Madrid')}
					</Link>
					<Link
						className="flex w-full items-center justify-center gap-2 text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-4 py-3 text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
						href="https://www.42network.org/"
					>
						{t('experience.education.madridTelefonica.websiteNetwork', '🌍 Web oficial de 42 Network')}
					</Link>
				</section>
			</Card>
		</section>
	);
}
