import ProjectDeveloped from "@/components/projectDeveloped";
import DefaultLayout from "@/layouts/default";
import { useI18n } from "@/utils/i18n";

export default function ProjectsPage() {
	const { messages } = useI18n();
	const t = (path: string, fallback?: string) => {
		const parts = path.split('.');
		let cur: any = messages;
		for (const p of parts) {
			if (!cur) return fallback ?? '';
			cur = cur[p];
		}
		return cur ?? fallback ?? '';
	}
	return (
		<DefaultLayout>
			<section className="m-auto mt-16 xl:mx-10 2xl:mx-32 flex flex-col gap-6">
				<ProjectDeveloped />
			</section>
		</DefaultLayout>
	);
}
