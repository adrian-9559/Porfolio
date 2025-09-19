import React, { useState, useEffect, useContext } from "react";

export type Lang = "es" | "en";

export function getDefaultLang(): Lang {
	if (typeof window !== "undefined") {
		const stored = localStorage.getItem("lang");
		if (stored === "es" || stored === "en") return stored as Lang;
		if (navigator.language.startsWith("es")) return "es";
	}
	return "en";
}

type I18nContextValue = {
	lang: Lang;
	messages: Record<string, any>;
	changeLang: (l: Lang) => void;
};

const I18nContext = React.createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }): React.ReactElement | null {
	const [lang, setLang] = useState<Lang>(getDefaultLang());
	const [messages, setMessages] = useState<Record<string, any>>({});

	useEffect(() => {
		let mounted = true;
		import(`../locales/${lang}.json`).then((mod) => {
			if (!mounted) return;
			setMessages(mod?.default ?? mod);
		}).catch(() => {
			setMessages({});
		});
		return () => { mounted = false; };
	}, [lang]);

	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem("lang", lang);
		}
	}, [lang]);

	const changeLang = (l: Lang) => {
		if (l === lang) return;
		setLang(l);
	};

	return (
		<I18nContext.Provider value= {{ lang, messages, changeLang }
}>
	{ children }
	</I18nContext.Provider>
  );
}

export function useI18n() {
	const ctx = useContext(I18nContext);
	if (!ctx) {
		// Fallback for components used outside provider (e.g. during SSR)
		const fallbackLang = getDefaultLang();
		return {
			lang: fallbackLang,
			messages: {},
			changeLang: () => { }
		} as I18nContextValue;
	}
	return ctx;
}
