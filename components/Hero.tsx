import { Image } from '@nextui-org/react';

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
    <section className='flex flex-col gap-4 lg:gap-9 w-fit sm:w-4/5 lg:w-fit'>
      <section className="flex flex-col gap-2">
        <h1 className="text-xl lg:text-5xl font-bold flex flex-col gap-1">Hola, soy <span className="text-[#00b2ff] underline italic">Adrián Escribano Pérez</span></h1>
        <p className="text-lg lg:text-xl text-default-500">(alias: <span className='text-[#d22aff]'>adrian_9559</span>)</p>
      </section>
      <section className="flex flex-col gap-4 lg:text-lg">
        <p>
          💻 Hola, soy un desarrollador de software con {calculateYearsOfExperience()} de experiencia, transformando ideas en soluciones digitales impactantes.
          Mi especialidad es el desarrollo Fullstack, donde combino la lógica robusta del Backend con interfaces Frontend que cautivan a los usuarios.
        </p>
      </section>
    </section>
  );
}
