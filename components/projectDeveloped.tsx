import { Card, CardHeader, CardBody, CardFooter, Link, Image, Chip } from "@nextui-org/react";

interface Project {
    name: string;
    description: string;
    important: string[];
    image: string;
    url?: string;
    github: string;
}

export default function ProjectDeveloped() {
    const projects: { developed: Project[] } = {
        developed: [
            {
                name: "PowerFuel",
                description: "PowerFuel es una aplicación web que permite tener una tienda de productos.",
                important: ["React", "NextJS", "TailwindCSS", "Express"],
                image: "/images/powerFuel/home.png",
                url: "/projects/powerFuel",
                github: "https://github.com/adrian-9559/PowerFuel"
            },
            {
                name: "Presets",
                description: "Presets es un repositorio de componentes prehechos para reutilizar en los proyectos.",
                important: ["React", "TailwindCSS", "Angular", "Bootstrap"],
                image: "/images/presets/presets.png",
                github: "https://github.com/adrian-9559/Presests"
            },
        ],
    }

    return (
        <section className="w-full grid 2xl:flex justify-center gap-10 2xl:gap-20">
            <section className="w-full flex flex-col justify-center gap-8 ">
                <section className="flex justify-center">
                    <h2 className="text-3xl">Proyectos Desarrollados</h2>
                </section>
                <section className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-col-5 gap-4">
                    {projects.developed ? projects.developed.map((project, index) => (
                        <Card key={index} className="p-2 bg-default-500 bg-opacity-50">
                            <CardHeader className="flex justify-center">
                                <h2 className="text-2xl">{project.name}</h2>
                            </CardHeader>
                            <CardBody className="flex flex-col gap-4 justify-between">
                                <span className="bg-cover bg-center w-full rounded-xl">
                                    <Image src={project.image} alt={project.name} className="rounded-xl" />
                                </span>
                                <section>
                                    <p>{project.description}</p>
                                </section>
                            </CardBody>
                            <CardFooter className="flex flex-col gap-3">
                                <section>
                                    {project.important.length > 0 && (
                                        <section>
                                            <ul className="flex 2xl:flex gap-1">
                                                {project.important.map((technology, index) => (
                                                    <li key={index}>
                                                        <Chip size="sm" variant="faded" className="bg-[#9b27b073] text-white border-black">
                                                            {technology}
                                                        </Chip>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    )}
                                </section>
                                <section className="flex justify-center w-full gap-8">
                                    {project.url && project.url.length > 0 && (
                                        <Link className="border-[1px] border-black bg-default-500 bg-opacity-50 px-2 py-1 rounded-lg text-default-900 shadow-md shadow-[#9b27b073]" href={project.url}>
                                            Ver Información
                                        </Link>
                                    )}
                                    {project.github.length > 0 && (
                                        <Link className="border-[1px] border-black bg-default-500 bg-opacity-50 px-2 py-1 rounded-lg text-default-900 shadow-md shadow-[#9b27b073]" href={project.github} isExternal>
                                            Ver Github
                                        </Link>
                                    )}
                                </section>
                            </CardFooter>
                        </Card>
                    )) : (
                        <section>
                            <p>No hay proyectos desarrollados</p>
                        </section>
                    )}
                </section>
            </section>
        </section>
    );
}