"use client";
import { ArrowShapeDownToLine } from "@gravity-ui/icons";
import { Avatar, Button, Tooltip } from "@heroui/react";
import Link from "next/link";

import { useT } from "@/hooks/useT";

export default function Hero() {
  const { t } = useT();
  const handleDownloadCV = () => {
    const link = document.createElement("a");

    link.href = "/files/Adrian_Escribano_CV.pdf";
    link.download = "Adrian_Escribano_CV.pdf";
    link.click();
  };

  return (
    <section className="relative w-full pt-10 pb-20 md:pt-16 md:pb-32 overflow-clip">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="blob absolute top-[-120px] left-[10%] w-[500px] h-[500px] bg-gradient-radial from-violet-500/20 via-purple-400/10 to-transparent" />
        <div className="blob absolute top-[-60px] right-[5%] w-[400px] h-[400px] bg-gradient-to-bl from-pink-500/15 via-rose-400/8 to-transparent" />
        <div className="blob absolute bottom-[-40px] left-[20%] w-[450px] h-[350px] bg-gradient-to-tr from-cyan-400/15 via-blue-400/8 to-transparent" />
        <div className="blob absolute top-[30%] right-[-50px] w-[300px] h-[300px] bg-gradient-to-l from-orange-400/12 to-transparent" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="flex flex-col items-center text-center space-y-8">
        {/* Availability badge */}
        <div className="animate-fade-in">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-violet-300/40 dark:border-violet-700/40 text-violet-700 dark:text-violet-300 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            {t("hero.available")}
          </span>
        </div>

        {/* Avatar */}
        <div className="animate-fade-in delay-75 relative w-32 h-32 mx-auto">
          {/* Soft glow behind */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-400/40 via-pink-400/30 to-cyan-400/30 blur-2xl scale-110" />
          {/* Floating decoration dots */}
          <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/40" />
          <div className="absolute -bottom-1 -left-3 w-4 h-4 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg shadow-pink-500/40" />
          <div className="absolute top-1/2 -right-4 w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-md shadow-cyan-400/40" />
          {/* Photo */}
          <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-2xl shadow-black/20 rotate-1 hover:rotate-0 transition-transform duration-500">
            <Avatar className="w-full h-full rounded-none">
              <Avatar.Image
                alt="Adrián Escribano"
                className="object-cover"
                src="/images/profile.png"
              />
              <Avatar.Fallback className="text-3xl font-black text-white bg-gradient-to-br from-violet-500 to-pink-500 w-full h-full rounded-none">
                A
              </Avatar.Fallback>
            </Avatar>
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-4 animate-fade-in delay-150 max-w-3xl">
          <p className="text-sm font-semibold text-[#86868b] dark:text-[#636366] tracking-widest uppercase">
            {t("hero.greeting")}
          </p>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black"
            style={{ letterSpacing: "-0.04em", lineHeight: 1.04 }}
          >
            {t("hero.title")}
            <span className="block hero-gradient-text">{t("hero.titleAccent")}</span>
          </h1>
          <p className="text-base md:text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed max-w-lg mx-auto">
            {t("hero.description")}
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 items-center animate-fade-in delay-225">
          <Link href="#projects">
            <button className="rainbow-btn px-8 py-3.5 text-sm font-semibold">
              {t("hero.viewProjects")}
            </button>
          </Link>
          <Tooltip>
            <Tooltip.Trigger>
              <Button
                isIconOnly
                className="w-11 h-11 rounded-full bg-white dark:bg-[#111116] hover:bg-[#f5f5f7] dark:hover:bg-[#1c1c22] border border-black/10 dark:border-white/10 shadow-sm"
                variant="ghost"
                onPress={handleDownloadCV}
              >
                <ArrowShapeDownToLine className="w-4 h-4 text-[#1d1d1f] dark:text-white" />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <p className="text-xs font-medium">{t("hero.downloadCV")}</p>
            </Tooltip.Content>
          </Tooltip>
        </div>

        {/* Micro-stats with color */}
        <div className="animate-fade-in delay-300 flex items-center gap-10 md:gap-20 pt-4">
          {[
            {
              value: "3+",
              label: t("hero.yearsExp"),
              color: "from-violet-500 to-purple-600",
            },
            {
              value: "15+",
              label: t("hero.projects"),
              color: "from-pink-500 to-rose-600",
            },
            {
              value: "20+",
              label: t("hero.technologies"),
              color: "from-cyan-500 to-blue-600",
            },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p
                className={`text-3xl md:text-4xl font-black bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}
                style={{ letterSpacing: "-0.03em" }}
              >
                {stat.value}
              </p>
              <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mt-1 font-semibold uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Tech floating pills */}
        <div className="animate-fade-in delay-300 flex flex-wrap justify-center gap-2 max-w-md pt-2">
          {[
            "React",
            "Next.js",
            "TypeScript",
            "Node.js",
            "PostgreSQL",
            "Docker",
          ].map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 text-[#3d3d3d] dark:text-[#c0c0c5] shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
