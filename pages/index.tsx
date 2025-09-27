import { useAppContext } from "@/config/appContext";
import DefaultLayout from "@/layouts/default";

import dataLenguageHome from "@/locales/home/i18n.json";

export default function IndexPage() {
	const { language } = useAppContext();
	return (
		<DefaultLayout>
			<section className="min-h-screen flex flex-col justify-center">
				<div className="bg-violet-600/10 dark:bg-violet-800/30 p-6 rounded-lg shadow-lg dark:shadow-gray-100/20">
					<h1 className="text-center text-4xl font-bold mb-4">{dataLenguageHome[language].welcome}</h1>
					<p className="text-lg max-w-xl">
						{dataLenguageHome[language].subtitle}
					</p>
				</div>
			</section>
		</DefaultLayout>
	);
}
