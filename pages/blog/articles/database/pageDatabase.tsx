import DefaultLayout from "@/layouts/default";
import type { GetStaticProps } from "next";

import { getWebsiteImage, getWebsiteInfo } from "@/functions/getWebSiteInfo";
import { ArrowRight } from "@gravity-ui/icons";
import { Card, Link } from "@heroui/react";

type DatabasePageResource = {
	description: string;
	name: string;
	url: string;
	price?: string;
	priceDescription?: string;
	caracteristics?: string[];
};

const defaultDatabaseResources: DatabasePageResource[] = [
	{
		name: "Supabase",
		url: "https://supabase.com/",
		description: "Supabase es una plataforma de desarrollo de aplicaciones que proporciona una base de datos en tiempo real, autenticación y almacenamiento de archivos.",
		price: "Gratis y de pago",
		priceDescription: "Supabase ofrece un plan gratuito con características limitadas y planes de pago con características adicionales.",
		caracteristics: ["Base de datos en tiempo real", "Autenticación", "Almacenamiento de archivos", "API REST y GraphQL", "Panel de administración", "Integración con herramientas de desarrollo populares", "Escalabilidad y rendimiento"],
	},
	{
		name: "Firebase",
		url: "https://firebase.google.com/",
		description: "Firebase es una plataforma de desarrollo de aplicaciones móviles y web que ofrece servicios como base de datos en tiempo real, autenticación y almacenamiento en la nube.",
		price: "Gratis y de pago",
		priceDescription: "Firebase ofrece un plan gratuito con características limitadas y planes de pago con características adicionales.",
		caracteristics: ["Base de datos en tiempo real", "Autenticación", "Almacenamiento en la nube", "Hosting", "Funciones en la nube", "Analítica y monitoreo", "Integración con herramientas de desarrollo populares"],
	},
	{
		name: "MongoDB Atlas",
		url: "https://www.mongodb.com/cloud/atlas",
		description: "MongoDB Atlas es un servicio de base de datos en la nube que permite crear, escalar y administrar bases de datos MongoDB de manera sencilla.",
		price: "Gratis y de pago",
		priceDescription: "MongoDB Atlas ofrece un plan gratuito con características limitadas y planes de pago con características adicionales.",
		caracteristics: ["Base de datos en la nube", "Escalabilidad", "Administración sencilla", "Seguridad y cumplimiento", "Integración con herramientas de desarrollo populares", "Monitoreo y alertas", "Soporte para múltiples regiones"],
	}
];

type PageDatabaseProps = {
	databaseResources?: DatabasePageResource[];
};

export default function PageDatabase({ databaseResources = defaultDatabaseResources }: PageDatabaseProps) {
	return (
		<DefaultLayout>
			<section className="mt-15">
				{/* Header */}
				<div className="text-center space-y-4">
					<h2 className="text-4xl md:text-5xl font-bold">
						Mejores páginas para encontrar bases de datos
					</h2>
					<p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
						Encuentra las mejores páginas web para hostear bases de datos y de
						alta calidad.
					</p>
				</div>

				{/* Description */}
				<div className="mt-8">
					<p>
						En esta página encontrarás una lista de las mejores páginas web para
						hostear bases de datos gratuitas y de alta calidad. Estas plataformas ofrecen
						una amplia variedad de recursos gráficos que puedes utilizar en tus
						proyectos.
					</p>
				</div>

				{/* Database Resources */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-12">
					{databaseResources.map((resource) => (
						<Card key={resource.url} className="bg-default">
							<Card.Header>
								<div className="flex items-center gap-4">
									<div className="bg-white p-1 rounded-lg flex items-center justify-center">
										<img
											alt={`Logo de ${resource.name}`}
											className="h-12 w-12 rounded-lg object-contain"
											loading="lazy"
											src={getWebsiteImage(resource.url)}
										/>
									</div>
									<h3 className="text-xl font-bold">{resource.name}</h3>
								</div>
							</Card.Header>
							<Card.Content>
								<p className="text-gray-600 dark:text-gray-400">
									{resource.description}
								</p>
							</Card.Content>
							<Card.Footer>
								<Link
									href={resource.url}
									className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:gap-3 transition-all font-medium">
									Visitar
									<ArrowRight className="w-4 h-4" />
								</Link>
							</Card.Footer>
						</Card>
					))}
				</div>
			</section>
		</DefaultLayout>
	);
}

const getStaticProps: GetStaticProps<PageDatabaseProps> = async () => {
	const databaseResources = await Promise.all(
		defaultDatabaseResources.map(async (resource) => {
			const info = await getWebsiteInfo(resource.url);

			return {
				...resource,
				description: info.description || resource.description,
				name: info.title || resource.name,
			};
		}),
	);

	return {
		props: {
			databaseResources,
		},
		revalidate: 86400,
	};
};
