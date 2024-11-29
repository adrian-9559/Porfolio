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
    const projects: { developed: Project[], developing: Project[] } = {
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
                important: [],
                image: "/images/presets/presets.png",
                github: "https://github.com/adrian-9559/Presests"
            },
        ],
        developing: [

        ]
    }

    return (
        <section className="w-full grid 2xl:flex justify-center gap-10 2xl:gap-20">
            <section className="w-full flex flex-col justify-center gap-8">
                <section className="flex justify-center">
                    <h2 className="text-3xl">Proyectos Desarrollados</h2>
                </section>
                <section className="grid md:grid-cols-2 gap-4">
                    {projects.developed ? projects.developed.map((project, index) => (
                        <Card key={index} className="p-4 bg-default-500 bg-opacity-50">
                            <CardHeader className="flex justify-center">
                                <h2 className="text-2xl">{project.name}</h2>
                            </CardHeader>
                            <CardBody className="grid gap-4">
                                <section className="w-full flex justify-center items-center">
                                    <Image src={project.image} alt={project.name} className="w-full h-5/6 2xl:h-48" />
                                </section>
                                <section className="flex flex-col h-full gap-4">
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
                                    <section>
                                        <p>{project.description}</p>
                                    </section>
                                </section>
                            </CardBody>
                            <CardFooter>
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
            <section className="w-full grid justify-center gap-2">
                <section className="flex justify-center">
                    <h2 className="text-3xl">Proyectos en Desarrollo</h2>
                </section>
                <section>
                    {projects.developing.length > 0 ? (
                        projects.developing.map((project, index) => (
                            <Card key={index} className="p-4 bg-default-500 bg-opacity-50">
                                <CardHeader className="flex justify-center">
                                    <h2 className="text-2xl">{project.name}</h2>
                                </CardHeader>
                                <CardBody className="grid gap-4">
                                    <section className="w-full flex justify-center items-center">
                                        <Image src={project.image} alt={project.name} className="w-full h-5/6 2xl:h-48" />
                                    </section>
                                    <section className="flex flex-col h-full gap-4">
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
                                        <section>
                                            <p>{project.description}</p>
                                        </section>
                                    </section>
                                </CardBody>
                                <CardFooter>
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
                        ))
                    ) : (
                        <section className="w-full flex justify-center items-center">
                            <p>No hay proyectos en desarrollo.</p>
                        </section>
                    )}
                </section>
            </section>
        </section>
    );
}