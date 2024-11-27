import { Button, Link } from '@nextui-org/react';
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

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/documents/Adrian-Escribano-Perez.pdf';
    link.download = 'Adrian-Escribano-Perez.pdf';
    link.click();
  };

  return (
    <section className='flex flex-col gap-4 lg:gap-9 w-fit sm:w-4/5 lg:w-fit h-screen justify-center mx-24'>
      <section className="flex flex-col gap-2">
        <h1 className="text-xl lg:text-5xl flex flex-col gap-1">Hola, soy <span className="italic text-6xl">Adrián Escribano Pérez</span></h1>
      </section>
      <section className="flex flex-col gap-4 lg:text-lg">
        <p>
          💻 Soy un desarrollador de software con {calculateYearsOfExperience()} de experiencia. Mi pasión es transformar ideas en soluciones digitales impactantes.
          Mi especialidad es el desarrollo Fullstack, donde combino la lógica robusta del Backend con interfaces Frontend que haga a los usuarios una experiencia intuitiva para su fácil uso.
        </p>
        <section className='flex items-center gap-5'>
          <Button key="DownloadCV" onClick={handleDownload} className="btn btn-primary w-fit bg-[#b700ff] bg-opacity-70 shadow-md shadow-black-50 animate-pulse text-lg">
              Descargar CV
          </Button>
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
      </section>
    </section>
  );
}
