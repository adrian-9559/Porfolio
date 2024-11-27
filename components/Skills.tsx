import LenguajeProgramBackend from "@/components/leguajeProgramBackend";
import LenguajeProgramFrontend from "@/components/leguajeProgramFrontend";

export default function Skills() {
  const skills = [
    { name: "PHP", level: 60 },
    { name: "Java", level: 75 },
    { name: "JavaScript", level: 85 },
    { name: "React", level: 75 },
    { name: "NodeJS", level: 70 },
    { name: "TailwindCSS", level: 90 },
    { name: "MySQL", level: 80 },
    { name: "Git", level: 90 },
    { name: "AngularJS", level: 60 },
    { name: "Bootstrap", level: 50 },
    { name: "SQL", level: 80 },
  ];

  return (
    <section className="flex flex-col lg:gap-32">
      <section className="flex flex-col gap-4">
        <h2 className="text-3xl text-center underline">Conocimientos y Experiencia en Desarrollo de Aplicaciones</h2>
        <p>
          Durante mi formación académica y experiencia profesional, he adquirido diferentes conocimientos fundamentales para el desarrollo de aplicaciones. Estos conocimientos me han permitido trabajar en proyectos de aplicaciones web de diversa índole, desde sistemas de gestión interna para empresas hasta plataformas de comercio electrónico y sitios web dinámicos.
        </p>
        <p>
          En estos proyectos, he aplicado conceptos fundamentales como la conexión a bases de datos, autenticación de usuarios y generación de contenido dinámico. Además, he utilizado herramientas complementarias como gestores de dependencias, control de versiones con Git y entornos de desarrollo integrados (IDE) para optimizar el flujo de trabajo.
        </p>
        <p>
          Gracias a estas experiencias, he podido enfrentar desafíos técnicos y proponer soluciones eficientes que cumplen con las necesidades específicas de cada cliente o proyecto.
        </p>
      </section>
      <section className="flex flex-col gap-6">
        <section>
          <h3 className="text-3xl text-center underline">Habilidades</h3>
        </section>
        <section className="flex flex-col gap-6">
          <section className="flex flex-col items-center w-full gap-2">
            <h4 className="text-2xl">Lenguajes de Programación</h4>
            <p>Estos son los lenguajes de programación que aprendí y utilicé en los diversos proyectos.</p>
          </section>
          <section className="flex gap-44 mx-10">
            <LenguajeProgramBackend />
            <LenguajeProgramFrontend />
          </section>
        </section>
      </section>

    </section>
  );
}