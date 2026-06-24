import { Envelope, LogoLinkedin } from "@gravity-ui/icons";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function CTA() {
	return (
		<section className="w-full">
			<div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 via-blue-600 to-cyan-500">
				{/* Noise texture overlay */}
				<div className="absolute inset-0 opacity-[0.03]" style={{
					backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"
				}} />

				{/* Glow circles */}
				<div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
				<div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl" />

				{/* Content */}
				<div className="relative px-8 md:px-16 py-16 md:py-24 text-center space-y-8">
					<div className="space-y-4">
						<p className="text-blue-200 text-sm font-semibold uppercase tracking-widest">
							Trabajemos juntos
						</p>
						<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white" style={{ letterSpacing: "-0.03em" }}>
							¿Listo para empezar?
						</h2>
						<p className="text-blue-100/80 text-lg max-w-lg mx-auto leading-relaxed">
							Cuéntame tu idea y la convertiremos en una solución digital excepcional.
						</p>
					</div>

					<div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
						<a
							href={`mailto:${siteConfig.contact.email}`}
							className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-white text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-colors duration-200 shadow-lg"
						>
							<Envelope className="w-4 h-4" />
							Enviarme un email
						</a>
						<Link
							href={siteConfig.links.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold text-sm transition-colors duration-200 border border-white/25 no-underline"
						>
							<LogoLinkedin className="w-4 h-4" />
							LinkedIn
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
