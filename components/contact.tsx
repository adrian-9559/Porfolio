import { Listbox, ListboxItem, Image } from "@nextui-org/react";
import { siteConfig } from "@/config/site";
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
                            <ListboxItem href={siteConfig.links.linkedin} key="linkedin" startContent={<LinkedinIcon />} description="Linkedin">
                                Adrián Escribano Pérez
                            </ListboxItem>
                            <ListboxItem href={siteConfig.links.github}  key="github" startContent={<GithubIcon />} description="GitHub">
                                adrian-9559
                            </ListboxItem>
                            <ListboxItem href={"mailto:" + siteConfig.links.mail} key="mail" startContent={<MailIcon />} description="Correo electrónico">
                                <span className="block md:hidden lg:block">{siteConfig.links.mail}</span>
                                <span className="hidden md:block lg:hidden">Correo</span>
                            </ListboxItem>
                            <ListboxItem href={siteConfig.links.discord} key="discord" startContent={<DiscordIcon />} description="Discord">
                                adrian_9559
                            </ListboxItem>
                            <ListboxItem href={siteConfig.links.instagram} key="instagram" startContent={<InstagramIcon />} description="Instagram">
                                adrian_9559
                            </ListboxItem>
                        </Listbox>
                    </section>
                </section>
            </section>
        </section>

    );
}