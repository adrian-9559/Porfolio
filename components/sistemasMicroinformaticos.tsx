import { useI18n } from "@/utils/i18n";
import { Card, Chip, Image } from "@heroui/react";

export default function SistemasMicroinformaticos() {
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
			<Card className="flex flex-col gap-4 p-4 bg-foreground bg-opacity-25 rounded-lg shadow-md" aria-label="Card de IES Luis Braille">
				<section className="grid sm:flex gap-4 justify-between items-center">
					<div className="flex justify-center items-center rounded-full shadow-sm">
						<Image
							src="/images/sistemas_microinformaticos_redes.avif"
							alt={t('experience.education.sistemasMicroinformaticos.alt', 'Logo de Desarrollo de Aplicaciones Web')}
							className="rounded-full"
							width={110}
							height={80}
						/>
					</div>
					<section className="flex w-full justify-between">
						<div className="w-full flex flex-col gap-1 items-start">
							<h3 className="text-2xl font-medium italic w-full">{t('experience.education.sistemasMicroinformaticos.title', 'Sistemas Microinformaticos y Redes')}</h3>
							<p className="text-sm font-medium">{t('experience.education.sistemasMicroinformaticos.subtitle', 'Ciclo Formativo de Grado Medio')}</p>
						</div>
						<div className="flex flex-col gap-1 text-center">
							<p className="text-sm font-medium">{t('experience.education.sistemasMicroinformaticos.yearLabel', 'Año cursado:')}</p>
							<Chip className=" font-medium" color="success" variant="flat">
								{t('experience.education.sistemasMicroinformaticos.years', '2020 - 2022')}
							</Chip>
						</div>
					</section>
				</section>
				<section className="flex items-center gap-3 bg-green-800 bg-opacity-75 text-white p-2 rounded-lg shadow-sm">
					<Image
						src="/images/logo_luis_braille_coslada.png"
						alt={t('experience.education.sistemasMicroinformaticos.schoolAlt', 'Logo de IES Luis Braille')}
						className="rounded-full"
						width={80}
						height={50}
					/>
					<p className="text-xl font-medium">{t('experience.education.sistemasMicroinformaticos.school', 'IES Luis Braille - Coslada')}</p>
				</section>
				<p className="leading-relaxed text-justify">
					{t('experience.education.sistemasMicroinformaticos.description', 'Completé un Ciclo Formativo de Grado Medio en Sistemas Microinformáticos y Redes, adquiriendo conocimientos esenciales en hardware, redes y sistemas operativos. Este grado me brindó una base técnica sólida y habilidades prácticas para resolver desafíos en el ámbito de la informática.')}
				</p>
			</Card>
		</section>
	);
}
