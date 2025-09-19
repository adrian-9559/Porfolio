"use client";
import { useI18n } from "@/utils/i18n";

export default function LanguageSwitcher() {
	const { lang, changeLang } = useI18n();
	return (
		<div className="flex gap-2 items-center">
			<button
				className={`px-3 py-1 rounded-lg font-semibold transition-all ${lang === "es" ? "bg-purple-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}`}
				onClick={() => changeLang("es")}
			>
				ES
			</button>
			<button
				className={`px-3 py-1 rounded-lg font-semibold transition-all ${lang === "en" ? "bg-purple-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}`}
				onClick={() => changeLang("en")}
			>
				EN
			</button>
		</div>
	);
}
