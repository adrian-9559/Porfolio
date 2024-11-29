import DefaultLayout from "@/layouts/default";
import Hero from "@/components/Hero";
import Contact from "@/components/contact";
import Skills from "@/components/Skills";
import Projects from "@/components/projects";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="grid gap-10 mx-auto lg:mx-94">
        <section className="grid 2xl:flex gap-6 justify-center">
          <section className="grid gap-20">
            <section className="flex flex-col w-auto xl:gap-28 2xl:gap-40 md:mx-16 lg:mx-32">
              <Hero />
              <Skills />
            </section>
            <section className="w-auto xl:mx-10">
              <Projects />
            </section>
          </section>
          <section className="w-fit 2xl:mr-20">
            <Contact />
          </section>
        </section>
      </section>
    </DefaultLayout>
  );
}
