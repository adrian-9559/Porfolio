import type { GetStaticProps } from "next";

import { getWebsiteImage, getWebsiteInfo } from "@/functions/getWebSiteInfo";
import DefaultLayout from "@/layouts/default";
import { ArrowRight } from "@gravity-ui/icons";
import { AlertDialog, AlertDialogCloseTrigger, Button, Card, Input, Link } from "@heroui/react";

type SvgResource = {
	description: string;
	name: string;
	url: string;
};

const defaultSvgResources: SvgResource[] = [
	{
		name: "SVG Repo",
		url: "https://www.svgrepo.com/",
		description:
			"Una gran colección de SVG gratuitos para uso personal y comercial.",
	},
	{
		name: "Flaticon",
		url: "https://www.flaticon.com/",
		description:
			"Ofrece una amplia variedad de iconos en formato SVG, PNG y otros.",
	},
	{
		name: "Iconfinder",
		url: "https://www.iconfinder.com/",
		description: "Encuentra iconos SVG de alta calidad para tus proyectos.",
	},
	{
		name: "Freepik",
		url: "https://www.freepik.com/",
		description:
			"Proporciona recursos gráficos, incluyendo SVG, para diseñadores y desarrolladores.",
	},
	{
		name: "SVGL",
		url: "https://svgl.app/",
		description:
			"Una plataforma para descargar y compartir SVG de manera gratuita.",
	},
	{
		name: "Icones",
		url: "https://icones.js.org/",
		description: "Una colección de iconos SVG para desarrolladores web.",
	},
	{
		name: "Gravity UI Icons",
		url: "https://gravityui.com/",
		description:
			"Una colección de iconos UI de alta calidad para desarrolladores web.",
	},
];

type PageSvgProps = {
	svgResources: SvgResource[];
};

export default function PageSvg({ svgResources }: PageSvgProps) {
	return (
		<DefaultLayout>
			<section className="mt-15">
				{/* Header */}
				<div className="text-center space-y-4">
					<h2 className="text-4xl md:text-5xl font-bold">
						Mejores páginas para encontrar SVG
					</h2>
					<p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
						Encuentra las mejores páginas web para descargar SVG gratuitos y de
						alta calidad.
					</p>
				</div>

				{/* Description */}
				<div className="mt-8">
					<p>
						En esta página encontrarás una lista de las mejores páginas web para
						descargar SVG gratuitos y de alta calidad. Estas plataformas ofrecen
						una amplia variedad de recursos gráficos que puedes utilizar en tus
						proyectos.
					</p>
				</div>

				{/* Resources List */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-12">
					{svgResources.map((resource) => (
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

				{/* Call to Action */}
				<div className="mt-12 text-center">
					<p className="text-lg text-gray-600 dark:text-gray-400">
						Explora estas páginas y encuentra los SVG perfectos para tus
						proyectos. ¡No olvides revisar las licencias de uso antes de
						utilizarlos!
					</p>

					<Card className="mt-4 bg-accent/10 dark:bg-accent/20">
						<Card.Header>
							<h3 className="text-xl font-bold">
								¿Conoces alguna otra página web para descargar SVG?
							</h3>
						</Card.Header>
						<Card.Content>
							<p className="text-gray-600 dark:text-gray-400">
								Si conoces alguna otra página web que ofrezca SVG gratuitos y de
								alta calidad, no dudes en compartirla en los comentarios. Tu
								aporte puede ayudar a otros desarrolladores y diseñadores a
								encontrar recursos útiles para sus proyectos.
							</p>
							<Input className="mt-4" placeholder="URL de la página web" />
						</Card.Content>
						<Card.Footer className="flex justify-end">
							<AlertDialog>
								<Button
									variant="primary"
								>
									Enviar
								</Button>
								<AlertDialog.Backdrop>
									<AlertDialog.Container>
										<AlertDialog.Dialog>
											<AlertDialog.Header>
												<AlertDialog.Heading>
													<h3 className="text-lg font-bold">
														¡Gracias por tu aporte!
													</h3>
													<AlertDialogCloseTrigger />
												</AlertDialog.Heading>
											</AlertDialog.Header>
											<AlertDialog.Body>
												<p>
													Tu sugerencia ha sido enviada correctamente. Apreciamos tu contribución para mejorar nuestra lista de recursos SVG.
												</p>
											</AlertDialog.Body>
											<AlertDialog.Footer>
												<Button>
													Cerrar
												</Button>
											</AlertDialog.Footer>
										</AlertDialog.Dialog>
									</AlertDialog.Container>
								</AlertDialog.Backdrop>
							</AlertDialog>
						</Card.Footer>
					</Card>
				</div>
			</section>

		</DefaultLayout>
	);
}

const getStaticProps: GetStaticProps<PageSvgProps> = async () => {
	const svgResources = await Promise.all(
		defaultSvgResources.map(async (resource) => {
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
			svgResources,
		},
		revalidate: 86400,
	};
};
