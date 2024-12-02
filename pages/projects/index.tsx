import DefaultLayout from "@/layouts/default";
import Projects from "@/components/projects";

export default function ProjectsPage() {
    return (
        <DefaultLayout>
            <section className="m-auto mt-16 xl:mx-10 2xl:mx-32 flex flex-col gap-6">
                <h1 className="text-3xl">
                    Proyectos
                </h1>
                <section>
                    <p>
                        En esta sección encontrarás una colección de los proyectos que he desarrollado a lo largo de mi trayectoria profesional. Cada proyecto refleja mi dedicación, habilidades y pasión por el desarrollo de aplicaciones.
                    </p>
                    <p>
                        Haz clic en cada proyecto para conocer más sobre su proceso de desarrollo, los desafíos superados y las tecnologías utilizadas. ¡Espero que disfrutes explorando mi trabajo tanto como yo disfruté creándolo!
                    </p>
                    <p>
                        ¿Tienes un proyecto en mente o quieres colaborar?.
                    </p>
                </section>
                <section className="flex justify-between">
                    <Projects />
                </section>
            </section>
        </DefaultLayout>
    );
}