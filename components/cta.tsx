import { Envelope, LogoLinkedin } from "@gravity-ui/icons";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function CTA() {
	return (
		<section className="w-full">
			<div className="relative rounded-3xl overflow-hidden bg-[#0a0a0f]">
				{/* Gradient mesh */}
				<div className="absolute inset-0 bg-gradient-to-br from-violet-600/80 via-pink-600/50 to-orange-500/60" />
				<div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/30 via-transparent to-transparent" />

				{/* Glow orbs */}
				<div className="absolute -top-20 left-[20%] w-60 h-60 bg-violet-500/40 rounded-full blur-3xl" />
				<div className="absolute -bottom-20 right-[15%] w-60 h-60 bg-pink-500/40 rounded-full blur-3xl" />
				<div className="absolute top-[30%] right-[5%] w-40 h-40 bg-orange-400/30 rounded-full blur-2xl" />

				{/* Grid pattern */}
				<div
					className="absolute inset-0 opacity-[0.06]"
					style={{
						backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
						backgroundSize: "40px 40px",
					}}
				/>

				{/* Content */}
				<div className="relative px-8 md:px-16 py-16 md:py-24 text-center space-y-8">
					<div className="space-y-4">
						<span className="inline-block px-4 py-1.5 rounded-full bg-white/15 border border-white/20 text-white/90 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
							✨ Trabajemos juntos
						</span>
						<h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white" style={{ letterSpacing: "-0.04em" }}>
							¿Tienes un proyecto<br />en mente?
						</h2>
						<p className="text-white/70 text-lg max-w-lg mx-auto leading-relaxed">
							Cuéntame tu idea y la convertiremos en una solución digital que marque la diferencia.
						</p>
					</div>

					<div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
						<a
							href={`mailto:${siteConfig.contact.email}`}
							className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-[#1d1d1f] font-bold text-sm hover:bg-white/90 transition-all duration-200 shadow-2xl shadow-black/20 hover:scale-105"
						>
							<Envelope className="w-4 h-4" />
							Enviarme un email
						</a>
						<Link
							href={siteConfig.links.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all duration-200 border border-white/20 no-underline hover:scale-105"
						>
							<LogoLinkedin className="w-4 h-4" />
							LinkedIn
						</Link>
					</div>

					{/* Social proof */}
					<p className="text-white/40 text-xs font-medium">
						Respondo en menos de 24h · Presupuesto sin compromiso
					</p>
				</div>
			</div>
		</section>
	);
}
