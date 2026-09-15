import Projects from "@/components/projects";
import Seo from "@/components/Seo";
import DefaultLayout from "@/layouts/default";
import { useT } from "@/hooks/useT";

export default function ProjectsPage() {
  const { t } = useT();

  return (
    <DefaultLayout>
      <Seo title="Proyectos" description="Explora los proyectos de Adrián Escribano: apps web Full Stack con React, Next.js, Supabase y más." />
<div className="max-w-5xl mx-auto">
        <Projects />
      </div>
    </DefaultLayout>
  );
}
