import DefaultLayout from "@/layouts/default";
import Projects from "@/components/projects";

export default function ProjectsPage() {
    return (
        <DefaultLayout>
            <section className="flex justify-between m-auto mt-16 xl:m-10 2xl:m-20">
                <Projects />
            </section>
        </DefaultLayout>
    );
}