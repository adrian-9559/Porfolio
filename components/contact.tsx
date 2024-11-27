import { Listbox, ListboxItem } from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import { Image } from "@nextui-org/react";
import { GithubIcon, InstagramIcon, MailIcon, DiscordIcon, LinkedinIcon } from "@/components/icons";

export default function Contact() {
    return (
        <section className="lg:sticky top-20 lg:top-[15%] self-start">
            <section className="flex flex-col gap-10 items-center w-auto bg-default-100 p-6 rounded-xl bg-opacity-80">
                <section>
                    <Image
                        className="rounded-full w-32 lg:w-64 shadow-lg shadow-[#9b27b073] border-2 border-black"
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
                            <ListboxItem key="linkedin" startContent={<LinkedinIcon />} description="Linkedin">
                                <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-base">
                                    Adrián Escribano Pérez
                                </a>
                            </ListboxItem>
                            <ListboxItem key="github" startContent={<GithubIcon />} description="GitHub">
                                <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="text-base">
                                    adrian-9559
                                </a>
                            </ListboxItem>
                            <ListboxItem key="mail" startContent={<MailIcon />} description="Correo electrónico">
                                <a href={"mailto:" + siteConfig.links.mail} target="_blank" rel="noopener noreferrer" className="text-base">
                                    <span className="block md:hidden lg:block">{siteConfig.links.mail}</span>
                                    <span className="hidden md:block lg:hidden">Correo</span>
                                </a>
                            </ListboxItem>
                            <ListboxItem key="discord" startContent={<DiscordIcon />} description="Discord">
                                <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer" className="text-base">
                                    adrian_9559
                                </a>
                            </ListboxItem>
                            <ListboxItem key="instagram" startContent={<InstagramIcon />} description="Instagram">
                                <a href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer" className="text-base">
                                    adrian_9559
                                </a>
                            </ListboxItem>
                        </Listbox>
                    </section>
                </section>
            </section>
        </section>

    );
}