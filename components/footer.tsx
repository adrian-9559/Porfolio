import { Link } from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import {
    GithubIcon,
    LinkedinIcon,
    MailIcon
} from "@/components/icons";

export default function Footer() {
    return (
        <section className="flex justify-between mx-64 items-center">
            <p className="text-sm">© {new Date().getFullYear()} adrian_9559. Casi todos los derechos reservado.</p>
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