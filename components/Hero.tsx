import { Image, Link, Chip } from '@nextui-org/react';
import { siteConfig } from "@/config/site";
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon
} from "@/components/icons";

export default function Hero() {

  const calculateYearsOfExperience = () => {
    const start = new Date("2024-07-01");
    const now = new Date();
    const differenceInMilliseconds = now.getTime() - start.getTime();
    const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;

    const years = Math.floor(differenceInMilliseconds / millisecondsInYear);

    if (years > 0) {
      return `${years} ${years === 1 ? "año" : "años"}`;
    } else {
      const months = Math.floor((differenceInMilliseconds % millisecondsInYear) / (millisecondsInYear / 12));
      return `${months} ${months === 1 ? "mes" : "meses"}`;
    }
  };

  return (
    <section className='flex md:my-20 lg:my-32 2xl:my-0 flex-col gap-4 lg:gap-9 w-auto h-screen justify-center m-auto lg:mx-24'>
      <section className='flex justify-center items-center 2xl:hidden'>
        <Image
          className="rounded-full w-32 lg:w-64 shadow-lg shadow-[#9b27b073] border-2 border-black"
          alt="User Image"
          src="/images/userIMG.png"
        />
      </section>
      <section className="flex flex-col gap-2">
        <h1 className="text-xl lg:text-5xl flex flex-col gap-1">Hola, soy <span className="italic text-2xl lg:text-6xl">Adrián Escribano Pérez</span></h1>
        <Chip size="sm" color="success" variant="flat" className='flex sm:hidden'>Disponible para trabajar</Chip>
      </section>
      <section className="flex flex-col gap-4">
        <p className='w-auto text-base lg:text-lg'>
          💻 Soy un desarrollador de software con {calculateYearsOfExperience()} de experiencia. Mi pasión es transformar ideas en soluciones digitales impactantes.
          Mi especialidad es el desarrollo Fullstack, donde combino la lógica robusta del Backend con interfaces Frontend que haga a los usuarios una experiencia intuitiva para su fácil uso.
        </p>
        <section className='grid md:flex gap-6'>
          <section className='flex items-center gap-4 w-full'>
            <Link href='/documents/CSV-Adrian-Escribano-Perez.pdf' download className="text-white py-1 px-3 rounded-xl bg-[#b700ff] bg-opacity-70 shadow-md shadow-black-50 animate-pulse text-lg border-[1px] border-black">
              Descargar CV
            </Link>
            <section className='flex gap-2'>
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
          <section className="justify-between md:justify-end w-full items-center gap-8 hidden md:flex">
            <p className="text-md ">Disponibilidad:</p>
            <Chip size="sm" color="success" variant="flat">Disponible para trabajar</Chip>
          </section>
        </section>
      </section>
    </section>
  );
}
