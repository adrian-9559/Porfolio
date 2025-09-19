import { useI18n } from "@/utils/i18n";
import { Card, Chip, Image } from "@heroui/react";

export default function DesarrolloAplicacionesWeb() {
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
			<Card className="flex flex-col gap-4 p-4 bg-foreground bg-opacity-25 rounded-lg shadow-md" arial-label="Card de IES Luis Braille">
				<section className="grid sm:flex gap-4 justify-between items-center">
					<div className="flex justify-center items-center rounded-full shadow-sm">
						<Image
							src="/images/desarrollo_de_aplicaciones_web.jpg"
							alt={t('experience.education.desarrolloAplicacionesWeb.alt', 'Logo de Desarrollo de Aplicaciones Web')}
							className="rounded-full"
							width={110}
							height={80}
						/>
					</div>
					<section className="flex w-full justify-between">
						<div className="w-full flex flex-col gap-1 items-start">
							<h3 className="text-2xl font-medium italic w-full">{t('experience.education.desarrolloAplicacionesWeb.title', 'Desarrollo de Aplicaciones Web')}</h3>
							<p className="text-sm font-medium">{t('experience.education.desarrolloAplicacionesWeb.subtitle', 'Ciclo Formativo de Grado Superior')}</p>
						</div>
						<div className="flex flex-col gap-1 text-center">
							<p className="text-sm font-medium">{t('experience.education.desarrolloAplicacionesWeb.yearLabel', 'Año cursado:')}</p>
							<Chip className=" font-medium" color="success" variant="flat">
								{t('experience.education.desarrolloAplicacionesWeb.years', '2022 - 2024')}
							</Chip>
						</div>
					</section>
				</section>
				<section className="flex items-center gap-3 bg-green-800 bg-opacity-75 text-white p-2 rounded-lg shadow-sm">
					<Image
						src="/images/logo_luis_braille_coslada.png"
						alt={t('experience.education.desarrolloAplicacionesWeb.schoolAlt', 'Logo de IES Luis Braille')}
						className="rounded-full"
						width={80}
						height={50}
					/>
					<p className="text-xl font-medium">{t('experience.education.desarrolloAplicacionesWeb.school', 'IES Luis Braille - Coslada')}</p>
				</section>
				<p className="leading-relaxed text-justify">
					{t('experience.education.desarrolloAplicacionesWeb.description', 'Durante mi formación en el ciclo formativo de grado superior en Desarrollo de Aplicaciones Web, adquirí conocimientos avanzados en programación, bases de datos y desarrollo web. Este grado no solo me brindó una sólida base técnica, sino también habilidades prácticas esenciales para resolver desafíos complejos en el ámbito del desarrollo de software.')}
				</p>
			</Card>
		</section>
	);
}
