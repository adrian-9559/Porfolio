import { Card } from "@heroui/react";

interface Technology {
	name: string;
	icon: string;
	category: "Frontend" | "Backend" | "Database" | "DevOps" | "Tools";
	proficiency: number; // 1-5
}

const technologies: Technology[] = [
	// Frontend
	{ name: "React", icon: "⚛️", category: "Frontend", proficiency: 5 },
	{ name: "Next.js", icon: "▲", category: "Frontend", proficiency: 5 },
	{ name: "TypeScript", icon: "TS", category: "Frontend", proficiency: 5 },
	{ name: "Tailwind CSS", icon: "🎨", category: "Frontend", proficiency: 5 },
	{ name: "Framer Motion", icon: "✨", category: "Frontend", proficiency: 4 },

	// Backend
	{ name: "Node.js", icon: "🟢", category: "Backend", proficiency: 5 },
	{ name: "Express", icon: "🚀", category: "Backend", proficiency: 5 },
	{ name: "GraphQL", icon: "📊", category: "Backend", proficiency: 4 },
	{ name: "REST APIs", icon: "🔌", category: "Backend", proficiency: 5 },

	// Database
	{ name: "PostgreSQL", icon: "🐘", category: "Database", proficiency: 5 },
	{ name: "MongoDB", icon: "🍃", category: "Database", proficiency: 4 },
	{ name: "Redis", icon: "🔴", category: "Database", proficiency: 3 },

	// DevOps
	{ name: "Docker", icon: "🐳", category: "DevOps", proficiency: 4 },
	{ name: "Git", icon: "🔀", category: "DevOps", proficiency: 5 },
	{ name: "Vercel", icon: "⬛", category: "DevOps", proficiency: 5 },
	{ name: "AWS", icon: "☁️", category: "DevOps", proficiency: 3 },

	// Tools
	{ name: "VS Code", icon: "💻", category: "Tools", proficiency: 5 },
	{ name: "Figma", icon: "🎭", category: "Tools", proficiency: 4 },
	{ name: "npm/pnpm", icon: "📦", category: "Tools", proficiency: 5 },
];

const categoryColors = {
	Frontend: "from-blue-500 to-cyan-500",
	Backend: "from-green-500 to-emerald-500",
	Database: "from-orange-500 to-red-500",
	DevOps: "from-purple-500 to-pink-500",
	Tools: "from-yellow-500 to-orange-500",
};

export default function TechStack() {
	const groupedTechs = technologies.reduce(
		(acc, tech) => {
			if (!acc[tech.category]) acc[tech.category] = [];
			acc[tech.category].push(tech);
			return acc;
		},
		{} as Record<string, Technology[]>,
	);

	return (
		<section className="w-full py-20 md:py-32">
			<div className="space-y-12">
				{/* Header */}
				<div className="text-center space-y-4">
					<h2 className="text-4xl md:text-5xl font-bold">Mi Stack Tecnológico</h2>
					<p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
						Tecnologías con las que trabajo y mi nivel de proficiencia en cada una
					</p>
				</div>

				{/* Tech Categories */}
				<div className="space-y-12">
					{Object.entries(groupedTechs).map(([category, techs]) => (
						<div key={category} className="space-y-4">
							<h3 className="text-2xl font-bold">{category}</h3>
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
								{techs.map((tech, idx) => (
									<Card
										key={idx}
										className="p-4 hover:shadow-lg transition-all duration-300 hover:scale-105"
									>
										<div className="flex flex-col items-center text-center space-y-3">
											<div className="text-4xl">{tech.icon}</div>
											<div>
												<p className="font-semibold text-sm">{tech.name}</p>
												{/* Proficiency indicator */}
												<div className="flex gap-1 justify-center mt-2">
													{Array.from({ length: 5 }).map((_, i) => (
														<div
															key={i}
															className={`h-1.5 w-1.5 rounded-full ${
																i < tech.proficiency
																	? "bg-blue-500"
																	: "bg-gray-300 dark:bg-gray-700"
															}`}
														/>
													))}
												</div>
											</div>
										</div>
									</Card>
								))}
							</div>
						</div>
					))}
				</div>

				{/* Stats */}
				<div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6 pt-12 border-t border-gray-200 dark:border-gray-800">
					<div className="text-center">
						<p className="text-3xl md:text-4xl font-bold">
							{Object.values(groupedTechs).flat().length}+
						</p>
						<p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Tecnologías</p>
					</div>
					<div className="text-center">
						<p className="text-3xl md:text-4xl font-bold">
							{Object.keys(groupedTechs).length}
						</p>
						<p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Categorías</p>
					</div>
					<div className="text-center">
						<p className="text-3xl md:text-4xl font-bold">
							{technologies.filter((t) => t.proficiency >= 4).length}
						</p>
						<p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Experto</p>
					</div>
				</div>
			</div>
		</section>
	);
}
