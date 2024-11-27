import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import Hero from "@/components/Hero";
import Contact from "@/components/contact";
import Skills from "@/components/Skills";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="grid gap-10 mx-auto lg:mx-94">
        <section className="grid sm:flex gap-6 lg:gap-20 md:mx-16 lg:mx-40 justify-center">
          <section className="flex flex-col w-auto md:w-5/6 gap-8">
            <Hero />
            <Skills />
          </section>
          <section className="w-fit">
            <Contact />
          </section>
        </section>
      </section>
    </DefaultLayout>
  );
}
