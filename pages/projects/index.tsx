import { MailIcon } from "@/components/icons";
import Projects from "@/components/projects";
import { siteConfig } from "@/config/site";
import DefaultLayout from "@/layouts/default";
import { useI18n } from "@/utils/i18n";
import { Link } from "@heroui/link";

export default function ProjectsPage() {
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
		<DefaultLayout>
			<section className="m-auto mt-16 xl:mx-10 2xl:mx-32 flex flex-col gap-6">
				<h1 className="text-3xl">
					{t('projects.title', 'Proyectos')}
				</h1>
				<section className="flex flex-col gap-3">
					<p>
						{t('projects.page_intro1', 'En esta sección encontrarás una colección de los proyectos que he desarrollado a lo largo de mi trayectoria profesional. Cada proyecto refleja mi dedicación, habilidades y pasión por el desarrollo de aplicaciones.')}
					</p>
					<p>
						{t('projects.page_intro2', 'Haz clic en cada proyecto para conocer más sobre su proceso de desarrollo, los desafíos superados y las tecnologías utilizadas. ¡Espero que disfrutes explorando mi trabajo tanto como yo disfruté creándolo!')}
					</p>
					<p className="flex flex-col gap-1">
						{t('projects.contact_heading', '¿Tienes un proyecto en mente?')}
						<Link href={"mailto:" + siteConfig.links.mail} key="mail" about="Correo electrónico" className="border-[1px] border-black bg-default-500 bg-opacity-50 px-2 py-1 rounded-lg text-default-900 shadow-md shadow-[#9b27b073] w-fit flex justify-between gap-2">
							<MailIcon />
							<span className="block md:hidden lg:block">{siteConfig.links.mail}</span>
						</Link>
					</p>
				</section>
				<section className="flex justify-between">
					<Projects />
				</section>
			</section>
		</DefaultLayout>
	);
}
