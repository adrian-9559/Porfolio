import CTA from "@/components/cta";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Stats from "@/components/stats";
import TechStack from "@/components/tech-stack";
import Testimonials from "@/components/testimonials";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
	return (
		<DefaultLayout>
			<div className="space-y-20 md:space-y-32">
				{/* Hero Section */}
				<Hero />

				{/* Stats Section */}
				<Stats />

				{/* Skills Section */}
				<Skills />

				{/* Tech Stack Section */}
				<TechStack />

				{/* Projects Section */}
				<Projects />

				{/* Testimonials Section */}
				<Testimonials />

				{/* CTA Section */}
				<CTA />
			</div>
		</DefaultLayout>
	);
}
