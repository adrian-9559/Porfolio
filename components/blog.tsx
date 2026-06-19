import { ArrowRight, Calendar } from "@gravity-ui/icons";
import { Card } from "@heroui/react";

interface BlogPost {
	id: string;
	title: string;
	excerpt: string;
	date: string;
	readTime: string;
	category: string;
	image: string;
	slug: string;
}

const blogPosts: BlogPost[] = [
	{
		id: "1",
		title: "Guía Completa: Next.js 14 con App Router",
		excerpt: "Aprende cómo usar la nueva App Router de Next.js 14 para crear aplicaciones web más eficientes y escalables.",
		date: "2024-01-15",
		readTime: "8 min",
		category: "Next.js",
		image: "📚",
		slug: "nextjs-14-app-router",
	},
	{
		id: "2",
		title: "Mejores Prácticas en TypeScript",
		excerpt: "Descubre las mejores prácticas para escribir código TypeScript limpio, mantenible y seguro.",
		date: "2024-01-10",
		readTime: "10 min",
		category: "TypeScript",
		image: "🔧",
		slug: "typescript-best-practices",
	},
	{
		id: "3",
		title: "Performance en React: Optimizaciones Esenciales",
		excerpt: "Estrategias y técnicas para optimizar el rendimiento de tus aplicaciones React.",
		date: "2024-01-05",
		readTime: "12 min",
		category: "React",
		image: "⚡",
		slug: "react-performance",
	},
];

export default function BlogPage() {
	return (
		<div className="space-y-12 py-8 md:py-12">
			{/* Header */}
			<div className="space-y-4">
				<h1 className="text-5xl md:text-6xl font-bold">Blog</h1>
				<p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
					Artículos, tutoriales y reflexiones sobre desarrollo web, tecnología y mejores prácticas.
				</p>
			</div>

			{/* Featured Post */}
			{blogPosts.length > 0 && (
				<Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-0">
						{/* Image */}
						<div className="md:col-span-1 h-48 md:h-auto bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
							<span className="text-6xl">{blogPosts[0].image}</span>
						</div>

						{/* Content */}
						<div className="md:col-span-2 p-8 flex flex-col justify-between">
							<div className="space-y-4">
								<div className="flex items-center gap-3">
									<span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
										{blogPosts[0].category}
									</span>
									<span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
										<Calendar className="w-4 h-4" />
										{new Date(blogPosts[0].date).toLocaleDateString("es-ES", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</span>
								</div>
								<h2 className="text-2xl md:text-3xl font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
									{blogPosts[0].title}
								</h2>
								<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
									{blogPosts[0].excerpt}
								</p>
							</div>
							<div className="flex items-center gap-4 pt-4">
								<span className="text-sm text-gray-500 dark:text-gray-400">{blogPosts[0].readTime}</span>
								<button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:gap-3 transition-all font-medium">
									Leer más <ArrowRight className="w-4 h-4" />
								</button>
							</div>
						</div>
					</div>
				</Card>
			)}

			{/* All Posts */}
			<div className="space-y-6">
				<h3 className="text-2xl font-bold">Más artículos</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{blogPosts.slice(1).map((post) => (
						<Card
							key={post.id}
							className="p-6 hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
						>
							<div className="space-y-4">
								<div className="flex items-start justify-between">
									<span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
										{post.category}
									</span>
									<span className="text-2xl">{post.image}</span>
								</div>

								<div>
									<h4 className="text-lg font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
										{post.title}
									</h4>
									<p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
										{post.excerpt}
									</p>
								</div>

								<div className="flex items-center justify-between pt-4">
									<span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
										<Calendar className="w-3 h-3" />
										{new Date(post.date).toLocaleDateString("es-ES", {
											year: "numeric",
											month: "short",
											day: "numeric",
										})}
									</span>
									<span className="text-xs text-gray-500 dark:text-gray-400">{post.readTime}</span>
								</div>
							</div>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
