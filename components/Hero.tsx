"use client";
import { useEffect, useState, useRef, lazy, Suspense } from "react";
import { ArrowShapeDownToLine } from "@gravity-ui/icons";
import { Avatar, Button, Tooltip } from "@heroui/react";
import Link from "next/link";

import { useT } from "@/hooks/useT";
import ScrollReveal from "@/components/ui/ScrollReveal";

const HeroScene = lazy(() =>
  import("./hero/HeroScene").then((m) => ({ default: m.HeroScene })),
);

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
  const [scrollY, setScrollY] = useState(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const glowRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const current = TITLES[titleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        80,
      );
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length - 1)),
        40,
      );
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
        glowRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(124,58,237,0.04), transparent 40%)`;
      }
    };

    window.addEventListener("mousemove", handleMouse);

    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/cv/Adrian_Escribano_CV.pdf";
    link.download = "Adrian_Escribano_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const parallaxSlow = scrollY * 0.3;

  return (
    <section
      ref={sectionRef}
      className="relative w-full pt-10 pb-16 md:pt-16 md:pb-24"
    >
      <div
        ref={glowRef}
        className="fixed inset-0 -z-10 pointer-events-none transition-all duration-300"
      />

      {/* 3D Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{ transform: `translateY(${parallaxSlow}px)` }}
      >
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center space-y-8">
        <ScrollReveal>
          <span className="ds-badge ds-badge-accent">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            {t("hero.available")}
          </span>
        </ScrollReveal>

        <ScrollReveal className="relative mx-auto" delay={100}>
          {/* Floating colored dots around photo */}
          <div
            className="absolute -inset-x-6 -inset-y-6 pointer-events-none"
            aria-hidden
          >
            <div
              className="absolute w-3 h-3 rounded-full animate-float-slow"
              style={{
                top: "0%",
                right: "20%",
                background: "#8b5cf6",
              }}
            />
            <div
              className="absolute w-2.5 h-2.5 rounded-full animate-float-slow animation-delay-2000"
              style={{
                top: "50%",
                right: "0%",
                background: "#06b6d4",
              }}
            />
            <div
              className="absolute w-3 h-3 rounded-full animate-float-slow animation-delay-4000"
              style={{
                bottom: "5%",
                left: "15%",
                background: "#ec4899",
              }}
            />
          </div>

          <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500 border border-[var(--border-default)]">
            <Avatar className="w-full h-full rounded-none">
              <Avatar.Image
                alt="Adrián Escribano"
                className="object-cover"
                src="/images/profile.png"
              />
              <Avatar.Fallback className="text-3xl font-black text-[var(--text-primary)] bg-[var(--bg-surface)] w-full h-full rounded-none">
                A
              </Avatar.Fallback>
            </Avatar>
          </div>
        </ScrollReveal>

        <ScrollReveal className="space-y-4 max-w-3xl" delay={200}>
          <p
            className="text-sm font-semibold tracking-widest uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            {t("hero.greeting")}
          </p>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black"
            style={{
              letterSpacing: "-0.04em",
              lineHeight: 1.04,
              color: "var(--text-primary)",
            }}
          >
            <span className="block ds-gradient-text min-h-[1.2em]">
              {displayed}
              <span className="inline-block w-[3px] h-[0.9em] bg-current ml-0.5 animate-pulse align-middle" />
            </span>
          </h1>
          <p
            className="text-base md:text-lg leading-relaxed max-w-lg mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            {t("hero.description")}
          </p>
        </ScrollReveal>

        <ScrollReveal
          className="flex flex-col sm:flex-row gap-3 items-center"
          delay={300}
        >
          <Link href="#projects">
            <button className="ds-btn-primary px-8 py-3.5 text-sm font-semibold !rounded-full">
              {t("hero.viewProjects")}
            </button>
          </Link>
          <Tooltip>
            <Tooltip.Trigger>
              <Button
                isIconOnly
                aria-label={t("hero.downloadCV")}
                className="ds-btn-icon !w-11 !h-11 !rounded-full"
                variant="ghost"
                onPress={handleDownloadCV}
              >
                <ArrowShapeDownToLine
                  className="w-4 h-4"
                  style={{ color: "var(--text-primary)" }}
                />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <p className="text-xs font-medium">{t("hero.downloadCV")}</p>
            </Tooltip.Content>
          </Tooltip>
        </ScrollReveal>

        <ScrollReveal
          className="flex flex-wrap justify-center gap-2 max-w-md pt-2"
          delay={400}
        >
          {[
            "React",
            "Next.js",
            "TypeScript",
            "Node.js",
            "Supabase",
            "Docker",
          ].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium text-[var(--text-muted)] border border-[var(--border-default)] rounded-full"
            >
              {tech}
            </span>
          ))}
        </ScrollReveal>

        <ScrollReveal className="pt-8" delay={500}>
          <Link
            className="inline-flex flex-col items-center gap-1 hover:opacity-80 transition-colors no-underline"
            href="#about"
            style={{ color: "var(--text-muted)" }}
          >
            <span className="text-xs font-medium tracking-wide uppercase">
              Scroll
            </span>
            <svg
              className="w-5 h-5 animate-scroll-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
