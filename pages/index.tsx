import Head from "next/head";

import AboutPreview from "@/components/about-preview";
import CampusHighlights from "@/components/campus-highlights";
import CTA from "@/components/cta";
import Hero from "@/components/Hero";
import Projects from "@/components/projects";
import ToolsPreview from "@/components/tools-preview";
import TrayectoriaPreview from "@/components/trayectoria-preview";
import DefaultLayout from "@/layouts/default";
import { useT } from "@/hooks/useT";
import { siteConfig } from "@/config/site";

export default function IndexPage() {
  const { t } = useT();

  return (
    <DefaultLayout>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Adrián Escribano Pérez",
              givenName: "Adrián",
              familyName: "Escribano Pérez",
              jobTitle: `${t("hero.title")} ${t("hero.titleAccent")}`,
              description: siteConfig.description,
              url: siteConfig.url,
              sameAs: [
                siteConfig.links.github,
                siteConfig.links.linkedin,
                siteConfig.links.instagram,
              ],
              email: siteConfig.contact.email,
              knowsAbout: [
                "React",
                "Next.js",
                "Node.js",
                "TypeScript",
                "JavaScript",
                "Supabase",
                "C",
                "C++",
              ],
              alumniOf: "42 Madrid",
            }),
          }}
          type="application/ld+json"
        />
      </Head>
      <div className="space-y-24 md:space-y-32">
        <Hero />
        <AboutPreview />
        <TrayectoriaPreview />
        <Projects />
        <CampusHighlights />
        <ToolsPreview />
        <CTA />
      </div>
    </DefaultLayout>
  );
}
