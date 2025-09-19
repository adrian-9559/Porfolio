import { HeroUIProvider } from "@heroui/system";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import Cookies from "@/components/modals/cookies";
import { fontMono, fontSans } from "@/config/fonts";
import "@/styles/globals.css";
import { I18nProvider } from "@/utils/i18n";

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	return (
		<HeroUIProvider navigate={router.push}>
			<NextThemesProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange={false}
			>
				<I18nProvider>
					<Cookies />
					<Analytics />
					<Component {...pageProps} />
				</I18nProvider>
			</NextThemesProvider>
		</HeroUIProvider>
	);
}

export const fonts = {
	sans: fontSans.style.fontFamily,
	mono: fontMono.style.fontFamily,
};
