import { Head } from "./head";

import { Navbar } from "@/components/navbar";
import { siteConfig } from "@/config/site";

export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="relative flex flex-col min-h-screen bg-white dark:bg-gray-950">
			<Head />
			<Navbar />
			<main className="flex-grow">
				<div className="max-w-7xl mx-auto px-6 py-8">
					{children}
				</div>
			</main>
			<footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
				<div className="max-w-7xl mx-auto px-6 py-12">
					<div className="flex flex-col md:flex-row items-center justify-between gap-8">
						{/* Left */}
						<div className="text-center md:text-left">
							<p className="text-sm text-gray-600 dark:text-gray-400">
								© {new Date().getFullYear()} Adrián Escribano. Todos los derechos reservados.
							</p>
						</div>

						{/* Links */}
						<div className="flex gap-6 text-sm">
							<a
								className="text-gray-600 dark:text-gray-400 hover:text-foreground transition-colors"
								href={siteConfig.links.github}
								rel="noopener noreferrer"
								target="_blank"
							>
								GitHub
							</a>
							<a
								className="text-gray-600 dark:text-gray-400 hover:text-foreground transition-colors"
								href={siteConfig.links.linkedin}
								rel="noopener noreferrer"
								target="_blank"
							>
								LinkedIn
							</a>
							<a
								className="text-gray-600 dark:text-gray-400 hover:text-foreground transition-colors"
								href={`mailto:${siteConfig.contact.email}`}
							>
								Email
							</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
