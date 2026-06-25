
import type { PostCollection } from "@/types/postType";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Porfolio",
	description: "Porfolio personal de Adrián Escribano",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "About",
			href: "/about",
		},
		{
			label: "CV",
			href: "/CV",
		},
		{
			label: "Blog",
			href: "/blog",
		},
		{
			label: "Contact",
			href: "/contact",
		},
	],
	navMenuItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "About",
			href: "/about",
		},
		{
			label: "CV",
			href: "/CV",
		},
		{
			label: "Blog",
			href: "/blog",
		},
		{
			label: "Contact",
			href: "/contact",
		},
	],
	navBlogItems: {
		articles: {
			svg: [
				{
					label: "SVG Pages",
					title: "Mejores páginas para encontrar SVG",
					describe: "Páginas web donde puedes encontrar SVG gratuitos y de alta calidad para tus proyectos.",
					href: "/blog/articles/svg/pageSvg",
					create: "21/06/2026/14:30",
					update: "21/06/2026/14:30",
					category: "SVG",
					slug: [
						"svg",
						"pageSvg"
					],
					readTime: "5 min",
					color: "#FFB13B",
				}
			],
			databse: [
				{
					label: "Database",
					title: "Mejores páginas para encontrar bases de datos",
					describe: "Páginas web donde puedes encontrar bases de datos gratuitas y de alta calidad para tus proyectos.",
					href: "/blog/articles/database/pageDatabase",
					create: "21/06/2026/22:47",
					update: "21/06/2026/22:47",
					category: "Database",
					slug: [
						"database",
						"pageDatabase"
					],
					readTime: "5 min",
					color: "#4DB33D",
				}
			],
		},
		tutorials: {
			typesScript: [
				{
					label: "TypeScript",
					title: "Introducción a TypeScript",
					describe: "Aprende los conceptos básicos de TypeScript y cómo integrarlo en tus proyectos.",
					href: "/blog/tutorials/typescript",
					create: "21/06/2026/14:39",
					update: "21/06/2026/14:39",
					category: "TypeScript",
					slug: [
						"typescript",
						"introduction"
					],
					readTime: "10 min",
					color: "#3178C6",
				}
			],
		},
	} satisfies PostCollection,
	links: {
		github: "https://github.com/adrian-9559/",
		linkedin: "https://www.linkedin.com/in/adrián-escribano-pérez",
		instagram: "https://instagram.com/adrian_9559",
		maps: "https://maps.app.goo.gl/hgc8t5ktpxL6onhX6",
	},
	contact: {
		email: "adrian.escribano3@gmail.com",
	},
};
