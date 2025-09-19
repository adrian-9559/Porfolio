import clsx from "clsx";
import { Head, Html, Main, NextScript } from "next/document";

import { fontSans } from "@/config/fonts";

export default function Document() {
	return (
		<Html lang="es" suppressHydrationWarning>
			<Head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
				suppressHydrationWarning
			>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
