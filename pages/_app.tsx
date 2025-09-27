import { AppProvider } from "@/config/appContext";
import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import { fontMono, fontSans } from "@/config/fonts";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const language = router.locale || "en";

	return (
		<HeroUIProvider navigate={router.push}>
			<NextThemesProvider attribute="class" defaultTheme="light">
				<AppProvider>
					<Component {...pageProps} />
				</AppProvider>
			</NextThemesProvider>
		</HeroUIProvider>
	);
}

export const fonts = {
	sans: fontSans.style.fontFamily,
	mono: fontMono.style.fontFamily,
};
