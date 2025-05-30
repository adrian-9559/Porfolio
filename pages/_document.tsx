import { Html, Head, Main, NextScript } from "next/document";
import clsx from "clsx";

import { fontSans } from "@/config/fonts";

export default function Document() {
  return (
    <Html lang="es">
      <Head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
        )}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
