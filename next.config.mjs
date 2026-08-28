import path from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	referrerPolicy: "strict-origin-when-cross-origin",
	transpilePackages: ['three'],
	turbopack: {
		root: __dirname,
	},
	async redirects() {
		return [
			{ source: "/notifications", destination: "/dashboard?section=notifications", permanent: false },
			{ source: "/blog/tutoriales", destination: "/campus", permanent: true },
			{ source: "/blog/tutoriales/guias", destination: "/campus/guias", permanent: true },
			{ source: "/blog/tutoriales/guias/:path*", destination: "/campus/guias/:path*", permanent: true },
			{ source: "/blog/tutoriales/:path*", destination: "/campus/tutoriales/:path*", permanent: true },
		];
	},
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "Content-Security-Policy",
						value: [
							"default-src 'self'",
							"script-src 'self' 'unsafe-inline' 'unsafe-eval'",
							"style-src 'self' 'unsafe-inline'",
							"img-src 'self' data: https: blob:",
							"font-src 'self' data:",
							"connect-src 'self' https://porfolio-backend-0nuw.onrender.com http://localhost:3001",
							"frame-ancestors 'none'",
							"form-action 'self'",
							"base-uri 'self'",
						].join("; "),
					},
					{ key: "X-Frame-Options", value: "DENY" },
					{ key: "X-Content-Type-Options", value: "nosniff" },
					{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
				],
			},
		];
	},
}

export default nextConfig;
