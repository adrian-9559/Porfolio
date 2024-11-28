import DefaultLayout from "@/layouts/default";
import Hero from "@/components/Hero";
import Contact from "@/components/contact";
import Skills from "@/components/Skills";
import Projects from "@/components/projects";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="grid gap-10 mx-auto lg:mx-94">
        <section className="grid 2xl:flex gap-6 lg:gap-20 md:mx-16 lg:mx-40 justify-center">
          <section className="flex flex-col w-auto xl:gap-28 2xl:gap-8">
            <Hero />
            <Skills />
            <Projects />
          </section>
          <section className="w-fit">
            <Contact />
          </section>
        </section>
      </section>
    </DefaultLayout>
  );
}
