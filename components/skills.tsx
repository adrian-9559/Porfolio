import { Card } from "@heroui/react";

interface Skill {
	category: string;
	skills: string[];
	icon: string;
}

const skills: Skill[] = [
	{
		category: "Frontend",
		skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "Framer Motion"],
		icon: "🎨",
	},
	{
		category: "Backend",
		skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL"],
		icon: "⚙️",
	},
	{
		category: "Tools & DevOps",
		skills: ["Git", "Docker", "Linux", "Vercel", "AWS", "GitHub Actions"],
		icon: "🛠️",
	},
	{
		category: "Languages",
		skills: ["JavaScript", "TypeScript", "C", "C++", "Python", "SQL"],
		icon: "💻",
	},
];

export default function Skills() {
	return (
		<section className="w-full py-20 md:py-32">
			<div className="space-y-12">
				{/* Header */}
				<div className="text-center space-y-4">
					<h2 className="text-4xl md:text-5xl font-bold">Mis Habilidades</h2>
					<p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
						Tecnologías y herramientas con las que trabajo para crear soluciones innovadoras
					</p>
				</div>

				{/* Skills Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
					{skills.map((skill, idx) => (
						<Card
							key={idx}
							className="p-6 md:p-8 hover:shadow-lg transition-shadow duration-300"
						>
							<div className="space-y-4">
								<div className="flex items-center gap-3">
									<span className="text-3xl">{skill.icon}</span>
									<h3 className="text-2xl font-bold">{skill.category}</h3>
								</div>
								<div className="flex flex-wrap gap-2">
									{skill.skills.map((s, i) => (
										<span
											key={i}
											className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300"
										>
											{s}
										</span>
									))}
								</div>
							</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
