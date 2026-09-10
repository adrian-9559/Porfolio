/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/notifications",
        destination: "/dashboard?section=notifications",
        permanent: false,
      },
      { source: "/blog/tutoriales", destination: "/campus", permanent: true },
      {
        source: "/blog/tutoriales/guias",
        destination: "/campus/cursos",
        permanent: true,
      },
      {
        source: "/blog/tutoriales/guias/:path*",
        destination: "/campus/cursos/:path*",
        permanent: true,
      },
      {
        source: "/blog/tutoriales/:path*",
        destination: "/campus/tutoriales/:path*",
        permanent: true,
      },
      { source: "/blog/herramientas", destination: "/tools", permanent: true },
      {
        source: "/blog/herramientas/:path*",
        destination: "/tools/:path*",
        permanent: true,
      },
      // ── Campus redesign redirects ──
      {
        source: "/campus/plan-de-estudio",
        destination: "/campus/retos",
        permanent: true,
      },
      {
        source: "/campus/plan-de-estudio/:path*",
        destination: "/campus/retos",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};

export default nextConfig;
