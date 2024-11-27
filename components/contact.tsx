import { Listbox, ListboxItem } from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import { Image } from "@nextui-org/react";
import { GithubIcon, InstagramIcon, MailIcon, DiscordIcon } from "@/components/icons";

export default function Contact() {
    return (
        <section className="sticky top-20 lg:top-32 self-start">
            <section className="flex flex-col gap-5 items-center w-auto">
                <section className="block md:hidden lg:block">
                    <Image
                        className="rounded-full w-32 lg:w-64"
                        alt="User Image"
                        src="/images/userIMG.png"
                    />
                </section>
                <section>
                    <section className="flex flex-col items-center gap-5 ">
                        <section className="flex">
                            <h2 className="text-xl lg:text-3xl font-light text-center text-default-500">Contacto</h2>
                        </section>
                        <Listbox className="bg-default-100 rounded-xl">
                            <ListboxItem key="mail" startContent={<MailIcon />} description="Correo electrónico">
                                <a href={"mailto:" + siteConfig.links.mail} target="_blank" rel="noopener noreferrer">
                                    <span className="block md:hidden lg:block">{siteConfig.links.mail}</span>
                                    <span className="hidden md:block lg:hidden">Correo</span>
                                </a>
                            </ListboxItem>
                            <ListboxItem key="instagram" startContent={<InstagramIcon />} description="Instagram">
                                <a href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer">
                                    adrian_9559
                                </a>
                            </ListboxItem>
                            <ListboxItem key="discord" startContent={<DiscordIcon />} description="Discord">
                                <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
                                    adrian_9559#6590
                                </a>
                            </ListboxItem>
                            <ListboxItem key="github" startContent={<GithubIcon />} description="GitHub">
                                <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
                                    adrian-9559
                                </a>
                            </ListboxItem>
                        </Listbox>
                    </section>
                </section>
            </section>
        </section>

    );
}