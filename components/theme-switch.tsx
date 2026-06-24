"use client";
import { useTheme } from "next-themes";
import { FC, useEffect, useState } from "react";

export interface ThemeSwitchProps {
	className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
	const [isMounted, setIsMounted] = useState(false);
	const { setTheme, resolvedTheme } = useTheme();

	useEffect(() => { setIsMounted(true); }, []);

	if (!isMounted) return <div className="w-8 h-8" aria-hidden />;

	const isLight = resolvedTheme === "light";

	return (
		<button
			aria-label={`Cambiar a modo ${isLight ? "oscuro" : "claro"}`}
			onClick={() => setTheme(isLight ? "dark" : "light")}
			className={`w-8 h-8 rounded-lg flex items-center justify-center text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/8 hover:text-[#1d1d1f] dark:hover:text-white transition-all duration-200 ${className ?? ""}`}
		>
			{isLight ? (
				<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
				</svg>
			) : (
				<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
				</svg>
			)}
		</button>
	);
};
