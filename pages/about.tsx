import DefaultLayout from "@/layouts/default";
import dynamic from "next/dynamic";

const AboutMe = dynamic(() => import("@/components/aboutMe"), { ssr: false });

export default function AboutPage() {
	return (
		<DefaultLayout>
			<AboutMe />
		</DefaultLayout>
	);
}
