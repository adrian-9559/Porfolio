"use client";
import { ArrowShapeDownToLine } from "@gravity-ui/icons";
import { Avatar, Badge, Button, Chip, Tooltip } from "@heroui/react";
import Link from "next/link";

export default function Hero() {
	const handleDownloadCV = () => {
		const link = document.createElement("a");
		link.href = "/files/Adrian_Escribano_CV.pdf";
		link.download = "Adrian_Escribano_CV.pdf";
		link.click();
	};

	return (
		<section className="relative w-full pt-12 pb-16 md:pt-20 md:pb-28 overflow-clip">
			{/* Ambient blobs */}
			<div className="absolute inset-0 -z-10 overflow-hidden">
				<div className="blob absolute top-[-80px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-radial from-blue-400/10 via-violet-400/6 to-transparent" />
				<div className="blob absolute top-[60px] right-[-100px] w-[350px] h-[350px] bg-gradient-to-bl from-cyan-400/8 to-transparent" />
				<div className="blob absolute bottom-0 left-[-80px] w-[300px] h-[300px] bg-gradient-to-tr from-violet-400/6 to-transparent" />
			</div>

			<div className="flex flex-col items-center text-center space-y-10">
				{/* Avatar */}
				<div className="animate-fade-in">
					<Badge.Anchor>
						<Avatar className="w-28 h-28 ring-4 ring-white/80 dark:ring-[#1c1c22]/80 shadow-2xl shadow-blue-500/10">
							<Avatar.Image src="/images/profile.png" alt="Adrián Escribano" />
							<Avatar.Fallback className="text-2xl font-bold text-blue-600 bg-blue-50">A</Avatar.Fallback>
						</Avatar>
						<Badge color="success" placement="bottom-right" size="sm" className="ring-2 ring-white dark:ring-[#0a0a0f]" />
					</Badge.Anchor>
				</div>

				{/* Greeting chip */}
				<div className="animate-fade-in delay-75">
					<Chip className="px-4 py-1.5 text-xs font-semibold tracking-wide border border-blue-100 dark:border-blue-900/60 bg-blue-50/80 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 backdrop-blur-sm">
						Hola, soy Adrián Escribano 👋
					</Chip>
				</div>

				{/* Heading */}
				<div className="space-y-5 animate-fade-in delay-150 max-w-2xl">
					<h1
						className="text-5xl sm:text-6xl md:text-7xl font-bold"
						style={{ letterSpacing: "-0.035em", lineHeight: 1.08 }}
					>
						Full Stack
						<span className="block gradient-text">Developer</span>
					</h1>
					<p className="text-base md:text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed max-w-md mx-auto">
						Creo soluciones digitales combinando arquitecturas robustas con interfaces intuitivas y experiencias que importan.
					</p>
				</div>

				{/* CTA buttons */}
				<div className="flex flex-col sm:flex-row gap-3 items-center animate-fade-in delay-225">
					<Link href="#projects">
						<button className="apple-btn-primary px-8 py-3 text-sm shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 hover:shadow-lg transition-shadow">
							Ver mis proyectos
						</button>
					</Link>
					<Tooltip>
						<Tooltip.Trigger>
							<Button
								className="w-11 h-11 rounded-full bg-white dark:bg-[#111116] hover:bg-[#f5f5f7] dark:hover:bg-[#1c1c22] border border-black/10 dark:border-white/10 shadow-sm"
								isIconOnly
								variant="ghost"
								onPress={handleDownloadCV}
							>
								<ArrowShapeDownToLine className="w-4 h-4 text-[#1d1d1f] dark:text-white" />
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p className="text-xs font-medium">Descargar CV</p>
						</Tooltip.Content>
					</Tooltip>
				</div>

				{/* Micro-stats */}
				<div className="animate-fade-in delay-300 flex items-center gap-8 md:gap-16 pt-2">
					{[
						{ value: "3+", label: "Años exp." },
						{ value: "15+", label: "Proyectos" },
						{ value: "20+", label: "Tecnologías" },
					].map((stat, i) => (
						<div key={i} className="text-center">
							<p
								className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white"
								style={{ letterSpacing: "-0.02em" }}
							>
								{stat.value}
							</p>
							<p className="text-xs text-[#aeaeb2] dark:text-[#636366] mt-1 font-medium">{stat.label}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
