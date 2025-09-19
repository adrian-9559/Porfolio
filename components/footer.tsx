import {
	GithubIcon,
	LinkedinIcon,
	MailIcon
} from "@/components/icons";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/utils/i18n";
import { Link } from "@heroui/react";

export default function Footer() {
	const { messages } = useI18n();
	const rights = messages?.footer?.rights ?? `© ${new Date().getFullYear()} adrian_9559. Casi todos los derechos reservados.`;

	return (
		<section className="flex flex-col md:flex-row gap-3 justify-between lg:mx-64 items-center bg-default-400 bg-opacity-50 px-20 py-3 rounded-2xl">
			<p className="text-sm">{rights}</p>
			<section className="flex gap-2">
				<Link isExternal href={siteConfig.links.linkedin} title="LinkedIn">
					<LinkedinIcon className="text-default-500" />
				</Link>
				<Link isExternal href={siteConfig.links.github} title="GitHub">
					<GithubIcon className="text-default-500" />
				</Link>
				<Link isExternal href={"mailto:" + siteConfig.links.mail} title="Correo">
					<MailIcon className="text-default-500" />
				</Link>
			</section>
		</section>
	)
}
