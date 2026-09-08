import Head from "next/head";

import Projects from "@/components/projects";
import DefaultLayout from "@/layouts/default";
import { useT } from "@/hooks/useT";

export default function ProjectsPage() {
  const { t } = useT();

  return (
    <DefaultLayout>
      <Head>
        <title>{t("nav.projects")} | Adrián Escribano</title>
        <meta content={t("sections.projects.desc")} name="description" />
      </Head>
      <div className="max-w-5xl mx-auto">
        <Projects />
      </div>
    </DefaultLayout>
  );
}
