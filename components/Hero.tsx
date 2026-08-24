"use client";
import { useEffect, useState, useRef } from "react";
import { ArrowShapeDownToLine } from "@gravity-ui/icons";
import { Avatar, Button, Tooltip } from "@heroui/react";
import Link from "next/link";

import { useT } from "@/hooks/useT";
import ScrollReveal from "@/components/ui/ScrollReveal";

const TITLES = [
  "Full Stack Developer",
  "Software Engineer",
  "React & Node.js",
  "Creative Coder",
];

export default function Hero() {
  const { t } = useT();
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = TITLES[titleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setTitleIdx((prev) => (prev + 1) % TITLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, titleIdx]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(99,102,241,0.06), transparent 40%)`;
      }
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/files/Adrian_Escribano_CV.pdf";
    link.download = "Adrian_Escribano_CV.pdf";
    link.click();
  };

  return (
    <section className="relative w-full pt-10 pb-16 md:pt-16 md:pb-24 overflow-clip">
      <div ref={glowRef} className="fixed inset-0 -z-10 pointer-events-none transition-all duration-300" />

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="blob absolute top-[-120px] left-[10%] w-[500px] h-[500px] bg-gradient-radial from-violet-500/20 via-purple-400/10 to-transparent" />
        <div className="blob absolute top-[-60px] right-[5%] w-[400px] h-[400px] bg-gradient-to-bl from-pink-500/15 via-rose-400/8 to-transparent" />
        <div className="blob absolute bottom-[-40px] left-[20%] w-[450px] h-[350px] bg-gradient-to-tr from-cyan-400/15 via-blue-400/8 to-transparent" />
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
        <ScrollReveal>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-violet-300/40 dark:border-violet-700/40 text-violet-700 dark:text-violet-300 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            {t("hero.available")}
          </span>
        </ScrollReveal>

        <ScrollReveal delay={100} className="relative w-32 h-32 mx-auto">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-400/40 via-pink-400/30 to-cyan-400/30 blur-2xl scale-110" />
          <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/40 animate-float" />
          <div className="absolute -bottom-1 -left-3 w-4 h-4 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg shadow-pink-500/40 animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 -right-4 w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-md shadow-cyan-400/40 animate-float" style={{ animationDelay: "2s" }} />
          <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-2xl shadow-black/20 rotate-1 hover:rotate-0 transition-transform duration-500">
            <Avatar className="w-full h-full rounded-none">
              <Avatar.Image alt="Adrián Escribano" className="object-cover" src="/images/profile.png" />
              <Avatar.Fallback className="text-3xl font-black text-white bg-gradient-to-br from-violet-500 to-pink-500 w-full h-full rounded-none">A</Avatar.Fallback>
            </Avatar>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200} className="space-y-4 max-w-3xl">
          <p className="text-sm font-semibold text-[#86868b] dark:text-[#636366] tracking-widest uppercase">
            {t("hero.greeting")}
          </p>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black"
            style={{ letterSpacing: "-0.04em", lineHeight: 1.04 }}
          >
            {t("hero.title")}
            <span className="block hero-gradient-text min-h-[1.2em]">
              {displayed}
              <span className="inline-block w-[3px] h-[0.9em] bg-current ml-0.5 animate-pulse align-middle" />
            </span>
          </h1>
          <p className="text-base md:text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed max-w-lg mx-auto">
            {t("hero.description")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300} className="flex flex-col sm:flex-row gap-3 items-center">
          <Link href="#projects">
            <button className="rainbow-btn px-8 py-3.5 text-sm font-semibold">
              {t("hero.viewProjects")}
            </button>
          </Link>
          <Tooltip>
            <Tooltip.Trigger>
              <Button
                isIconOnly
                aria-label={t("hero.downloadCV")}
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
        </ScrollReveal>

        <ScrollReveal delay={400} className="flex flex-wrap justify-center gap-2 max-w-md pt-2">
          {["React", "Next.js", "TypeScript", "Node.js", "Supabase", "Docker"].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 text-[#3d3d3d] dark:text-[#c0c0c5] shadow-sm hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-200 cursor-default"
            >
              {tech}
            </span>
          ))}
        </ScrollReveal>

        <ScrollReveal delay={500} className="pt-8">
          <Link href="#about" className="inline-flex flex-col items-center gap-1 text-[#aeaeb2] dark:text-[#636366] hover:text-violet-500 dark:hover:text-violet-400 transition-colors no-underline">
            <span className="text-xs font-medium tracking-wide uppercase">Scroll</span>
            <svg className="w-5 h-5 animate-scroll-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
