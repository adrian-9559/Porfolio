import type { Post, PostCollection } from "@/types/postType";

import { ArrowRight, Calendar } from "@gravity-ui/icons";
import { Button, Card, Input } from "@heroui/react";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import DefaultLayout from "@/layouts/default";

function getCategoryBadgeStyle(color?: string) {
	const badgeColor = color || "#6B7280";

	return {
		backgroundColor: `${badgeColor}1F`,
		borderColor: `${badgeColor}55`,
		color: badgeColor,
	};
}

function parsePostDate(date: string) {
	const [day, month, year, time] = date.split("/");
	const [hours, minutes] = time.split(":");

	return new Date(
		Number(year),
		Number(month) - 1,
		Number(day),
		Number(hours),
		Number(minutes),
	);
}

function getPosts(collection: Post[] | PostCollection): Post[] {
	if (Array.isArray(collection)) {
		return collection;
	}

	return Object.values(collection).flatMap((value) => getPosts(value));
}

export default function BlogPage() {
	const blogPosts = getPosts(siteConfig.navBlogItems).sort(
		(a, b) =>
			parsePostDate(b.create).getTime() - parsePostDate(a.create).getTime(),
	);
	const featuredPost = blogPosts[0];

	const articlesPosts = getPosts(siteConfig.navBlogItems.articles).sort(
		(a, b) =>
			parsePostDate(b.create).getTime() - parsePostDate(a.create).getTime(),
	);

	const tutorialsPosts = getPosts(siteConfig.navBlogItems.tutorials).sort(
		(a, b) =>
			parsePostDate(b.create).getTime() - parsePostDate(a.create).getTime(),
	);

	return (
		<DefaultLayout>
			<div className="space-y-12 py-8 md:py-12">
				{/* Header */}
				<div className="space-y-4">
					<h1 className="text-5xl md:text-6xl font-bold">Blog</h1>
					<p className="text-xl text-gray-600 dark:text-gray-400">
						Artículos, tutoriales y reflexiones sobre desarrollo web, tecnología
						y mejores prácticas.
					</p>
					<p>
						En este blog, comparto mis conocimientos y experiencias en el mundo del desarrollo web, incluyendo tutoriales, consejos y reflexiones sobre las últimas tendencias y tecnologías.
					</p>
				</div>

				{/* Featured Post */}
				<div className="space-y-6">
					<h3 className="text-3xl font-bold">Último post publicado</h3>
					{featuredPost && (
						<Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-default dark:hover:shadow-gray-800">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-0">
								{/* Image */}
								<div className="md:col-span-1 h-48 md:h-auto bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center rounded-2xl">
									<span className="text-6xl">
										{featuredPost.image ? <featuredPost.image /> : "📄"}
									</span>
								</div>

								{/* Content */}
								<div className="md:col-span-2 p-8 flex flex-col justify-between">
									<div className="space-y-4">
										<div className="flex items-center gap-3">
											<span
												className="px-3 py-1 rounded-full text-sm font-medium border"
												style={getCategoryBadgeStyle(featuredPost.color)}
											>
												{featuredPost.category}
											</span>
											<span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
												<Calendar className="w-4 h-4" />
												{parsePostDate(featuredPost.create).toLocaleDateString(
													"es-ES",
													{
														year: "numeric",
														month: "long",
														day: "numeric",
													},
												)}
											</span>
										</div>
										<h2 className="text-2xl md:text-3xl font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
											{featuredPost.title}
										</h2>
										<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
											{featuredPost.describe}
										</p>
									</div>
									<div className="flex items-center gap-4 pt-4">
										<span className="text-sm text-gray-500 dark:text-gray-400">
											{featuredPost.readTime}
										</span>
										<Link
											className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:gap-3 transition-all font-medium"
											href={featuredPost.href}
										>
											Leer más
											<ArrowRight className="w-4 h-4" />
										</Link>
									</div>
								</div>
							</div>
						</Card>
					)}
				</div>

				<div>
					<div className="flex flex-col items-center justify-between gap-4 mb-6">
						<h3 className="text-3xl font-bold">Buscar artículos</h3>
						<div className="w-full flex justify-center mb-8">
							<Input className="bg-default w-3/4" id="search" placeholder="Buscar artículos..." />
							<Button
								className="ml-2 px-4 py-2 text-base font-semibold"
								variant="primary"
								onClick={() => {
									const searchInput = document.getElementById(
										"search",
									) as HTMLInputElement;
									const query = searchInput.value.trim().toLowerCase();
									if (query) {
										const matchingPost = blogPosts.find((post) =>
											post.title.toLowerCase().includes(query),
										);
										if (matchingPost) {
											window.location.href = matchingPost.href;
										}
									}
								}}
							>
								Buscar
							</Button>
						</div>
					</div>

					<section className="flex justify-between gap-8">
						{/* All Articles */}
						<div className="space-y-6 w-full">
							<h3 className="text-3xl font-bold">Artículos</h3>
							<div className="grid gap-6">
								{articlesPosts.map((post) => (
									<Card
										key={post.href}
										className="p-6 hover:shadow-lg transition-shadow duration-300 group cursor-pointer bg-default dark:hover:shadow-gray-800"
									>
										<div className="space-y-4">
											<div className="flex flex-col gap-3">
												<div className="flex items-center justify-between gap-4">
													<h4 className="text-xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
														{post.title}
													</h4>
													<span
														className="px-3 py-1 rounded-full text-sm font-medium border"
														style={getCategoryBadgeStyle(post.color)}
													>
														{post.category}
													</span>
												</div>

												<p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
													{post.describe}
												</p>
											</div>

											<div className="flex items-center justify-between pt-4">
												<section className="flex items-center gap-4">
													<span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
														<Calendar className="w-3 h-3" />
														{parsePostDate(post.create).toLocaleDateString(
															"es-ES",
															{
																year: "numeric",
																month: "short",
																day: "numeric",
															},
														)}
													</span>
													<Link
														className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:gap-3 transition-all font-medium"
														href={post.href}
													>
														Leer más
														<ArrowRight className="w-4 h-4" />
													</Link>
												</section>
												<span className="text-xs text-gray-500 dark:text-gray-400">
													{post.readTime}
												</span>
											</div>
										</div>
									</Card>
								))}
							</div>
						</div>
						<div className="space-y-6 w-full">
							<h3 className="text-3xl font-bold">Tutoriales</h3>
							<div className="grid w-full gap-6">
								{tutorialsPosts.map((post) => (
									<Card
										key={post.href}
										className="p-6 hover:shadow-lg transition-shadow duration-300 group cursor-pointer bg-default dark:hover:shadow-gray-800"
									>
										<div className="space-y-4">
											<div className="flex flex-col gap-3">
												<div className="flex items-center justify-between gap-4">
													<h4 className="text-xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
														{post.title}
													</h4>
													<span
														className="px-3 py-1 rounded-full text-sm font-medium border"
														style={getCategoryBadgeStyle(post.color)}
													>
														{post.category}
													</span>
												</div>

												<p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
													{post.describe}
												</p>
											</div>

											<div className="flex items-center justify-between pt-4">
												<section className="flex items-center gap-4">
													<span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
														<Calendar className="w-3 h-3" />
														{parsePostDate(post.create).toLocaleDateString(
															"es-ES",
															{
																year: "numeric",
																month: "short",
																day: "numeric",
															},
														)}
													</span>
													<Link
														className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:gap-3 transition-all font-medium"
														href={post.href}
													>
														Leer más
														<ArrowRight className="w-4 h-4" />
													</Link>
												</section>
												<span className="text-xs text-gray-500 dark:text-gray-400">
													{post.readTime}
												</span>
											</div>
										</div>
									</Card>
								))}
							</div>
						</div>
					</section>
				</div>
			</div>
		</DefaultLayout>
	);
}
