import CTA from "@/components/cta";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Stats from "@/components/stats";
import TechStack from "@/components/tech-stack";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
	return (
		<DefaultLayout>
			<div className="space-y-24 md:space-y-32">
				<Hero />
				<Stats />
				<Skills />
				<TechStack />
				<Projects />
				<CTA />
			</div>
		</DefaultLayout>
	);
}
