import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type AppContextType = {
	language: string;
	setLanguage: (value: string) => void;
};

const AppContext = createContext<AppContextType>({
	language: 'es',
	setLanguage: () => { },
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
	const [language, setLanguage] = useState<string>('es');

	useEffect(() => {
		// Detectar idioma del navegador o cargar preferencia del usuario
		if (typeof navigator !== 'undefined') {
			const userLang = navigator.language || (navigator.languages && navigator.languages[0]);
			if (userLang) {
				setLanguage(userLang.split('-')[0]); // Solo la parte del idioma
			}
		}
	}, []);

	return (
		<AppContext.Provider value={{ language, setLanguage }}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => useContext(AppContext);
