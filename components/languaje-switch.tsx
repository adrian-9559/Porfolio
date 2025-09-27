import { useAppContext } from "@/config/appContext";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { FC, useEffect, useState } from "react";

import languageData from "@/locales/available_translations.json";
import { Select, SelectItem } from "@heroui/react";

export const LanguageSwitch: FC = () => {
	const { language, setLanguage } = useAppContext();

	// Corrige el typo si es necesario
	const availableLanguages = (languageData as any)?.available_languajes || [];

	const [value, setValue] = useState<string>(language || (availableLanguages[0] && availableLanguages[0].code) || "es");

	useEffect(() => {
		if (language && language !== value) setValue(language);
	}, [language]);

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const next = e.target.value;
		setValue(next);
		// actualizar estado global
		setLanguage(next);
		// sincronizar atributo lang del documento por si hace falta
		document.documentElement.lang = next;
		// emitir evento para que otros listeners se enteren (opcional)
		window.dispatchEvent(new CustomEvent("languageChanged", { detail: next }));
	};

	const flagSrc = (code: string) => {
		switch (code) {
			case 'es':
				return '/flags/spain.svg';
			case 'en':
				return '/flags/uk.svg';
			default:
				return '/flags/uk.svg';
		}
	};

	return (
		<div className="flex items-center gap-2">
			<img src={flagSrc(value)} alt="flag" width={24} height={16} />
			<VisuallyHidden>Seleccionar idioma</VisuallyHidden>
			<Select
				aria-label="Seleccionar idioma"
				value={value}
				onChange={handleChange}
				defaultSelectedKeys={[language]}
				className="w-30"
			>
				{availableLanguages.map(({ code, label, icon }: any) => (
					<SelectItem key={code} value={code}>
						{label}
					</SelectItem>
				))}
			</Select>
		</div>
	);
};
