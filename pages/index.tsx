import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import Skills from "@/components/Skills";
import Contact from "@/components/contact";
import Projects from "@/components/projects";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
	return (
		<DefaultLayout>
			<section className="grid gap-16 mx-auto lg:mx-94">
				<section className="grid 2xl:flex gap-8 justify-center">
					<section className="grid gap-20">
						<section className="flex flex-col w-auto xl:gap-28 2xl:gap-40 md:mx-16 lg:mx-32">
							<Hero />
							<Metrics />
							<Skills />
						</section>
						<section className="w-auto xl:mx-20">
							<Projects />
						</section>
					</section>
					<section className="w-auto 2xl:mr-20 flex justify-center">
						<Contact />
					</section>
				</section>
			</section>
		</DefaultLayout>
	);
}
