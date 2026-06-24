"use client";
import { useState } from "react";

type SectionId =
  | "intro" | "routing" | "api-routes" | "renderizado"
  | "optimizacion" | "proyecto-final";

interface SectionDef { id: SectionId; label: string; }
const SECTIONS: SectionDef[] = [
  { id: "intro",          label: "1. SSR vs CSR" },
  { id: "routing",        label: "2. Routing" },
  { id: "api-routes",     label: "3. API Routes" },
  { id: "renderizado",    label: "4. Renderizado" },
  { id: "optimizacion",   label: "5. Optimización" },
  { id: "proyecto-final", label: "Proyecto Final" },
];

function Code({ children }: { children: string }) {
  return (
    <pre className="bg-[#0d1117] rounded-xl p-4 overflow-x-auto text-xs leading-relaxed my-4">
      <code className="text-[#e6edf3]">{children.trim()}</code>
    </pre>
  );
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-white mt-10 mb-3 first:mt-0">{children}</h2>;
}
function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-semibold text-[#1d1d1f] dark:text-white mt-6 mb-2">{children}</h3>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-relaxed text-[#3a3a3c] dark:text-[#aeaeb2] mb-3">{children}</p>;
}
function Callout({ type, children }: { type: "tip" | "warn" | "danger"; children: React.ReactNode }) {
  const styles = {
    tip:    "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300",
    warn:   "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300",
    danger: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300",
  };
  const icons = { tip: "💡", warn: "⚠️", danger: "🚨" };
  return (
    <div className={`border rounded-xl px-4 py-3 my-4 text-sm ${styles[type]}`}>
      <span className="mr-1.5">{icons[type]}</span>{children}
    </div>
  );
}

function SectionIntro() {
  return (
    <>
      <H2>SSR vs CSR: ¿cuándo usar cada uno?</H2>
      <P>Next.js te permite elegir la estrategia de renderizado más adecuada para cada página dentro del mismo proyecto. Esta flexibilidad es su principal ventaja sobre React puro.</P>
      <H3>Client-Side Rendering (CSR)</H3>
      <P>El HTML llega vacío al navegador y JavaScript renderiza el contenido. Ideal para dashboards privados o páginas altamente interactivas.</P>
      <Code>{`// Componente cliente: marcado con "use client"
"use client";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    fetch("/api/estadisticas")
      .then(r => r.json())
      .then(setDatos);
  }, []);

  if (!datos) return <p>Cargando...</p>;
  return <div>Total usuarios: {datos.total}</div>;
}`}</Code>
      <H3>Server-Side Rendering (SSR)</H3>
      <P>El HTML se genera en el servidor en cada petición. El cliente recibe HTML ya renderizado, lo que mejora el SEO y el tiempo de primera pintura.</P>
      <Code>{`// Componente servidor (por defecto en App Router)
// No necesita "use client"
async function obtenerUsuario(id: string) {
  const res = await fetch(\`https://api.ejemplo.com/usuarios/\${id}\`, {
    cache: "no-store", // no cachear: siempre datos frescos
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function PerfilPage({ params }: { params: { id: string } }) {
  const usuario = await obtenerUsuario(params.id);
  if (!usuario) return <p>Usuario no encontrado</p>;

  return (
    <main>
      <h1>{usuario.nombre}</h1>
      <p>{usuario.email}</p>
    </main>
  );
}`}</Code>
      <Callout type="tip">En el App Router (Next.js 13+), los componentes son Server Components por defecto. Solo añade <code>"use client"</code> cuando necesites estado, efectos o APIs del navegador.</Callout>
    </>
  );
}

function SectionRouting() {
  return (
    <>
      <H2>Routing con App Router</H2>
      <P>El App Router usa el sistema de archivos. Cada carpeta bajo <code>app/</code> es un segmento de ruta. Los archivos especiales definen el comportamiento de cada segmento.</P>
      <Code>{`app/
├── layout.tsx           # Layout raíz (siempre presente)
├── page.tsx             # / (página de inicio)
├── loading.tsx          # UI de carga (Suspense automático)
├── error.tsx            # Manejo de errores
├── not-found.tsx        # Página 404
├── blog/
│   ├── page.tsx         # /blog
│   └── [slug]/
│       └── page.tsx     # /blog/:slug (ruta dinámica)
├── (auth)/              # Grupo de rutas (no afecta la URL)
│   ├── login/page.tsx   # /login
│   └── registro/page.tsx
└── api/
    └── posts/
        └── route.ts     # API route`}</Code>
      <H3>Layouts y páginas dinámicas</H3>
      <Code>{`// app/layout.tsx - Layout raíz
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Mi Blog", template: "%s | Mi Blog" },
  description: "Blog sobre desarrollo web",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <header><nav>Mi Blog</nav></header>
        <main>{children}</main>
        <footer>© 2025</footer>
      </body>
    </html>
  );
}`}</Code>
      <Code>{`// app/blog/[slug]/page.tsx - Ruta dinámica
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props { params: { slug: string }; }

// Generar metadatos dinámicos
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Post no encontrado" };
  return { title: post.titulo, description: post.resumen };
}

// Generar rutas estáticas en build (SSG)
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(p => ({ slug: p.slug }));
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <article>
      <h1>{post.titulo}</h1>
      <time>{new Date(post.fecha).toLocaleDateString("es-ES")}</time>
      <div dangerouslySetInnerHTML={{ __html: post.contenidoHtml }} />
    </article>
  );
}`}</Code>
    </>
  );
}

function SectionApiRoutes() {
  return (
    <>
      <H2>API Routes</H2>
      <P>Los ficheros <code>route.ts</code> dentro de <code>app/api/</code> definen endpoints HTTP. Cada función exportada corresponde a un método HTTP.</P>
      <Code>{`// app/api/posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// GET /api/posts?pagina=1&limite=10
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const pagina = Number(searchParams.get("pagina") ?? "1");
  const limite = Number(searchParams.get("limite") ?? "10");

  const posts = await db.post.findMany({
    skip: (pagina - 1) * limite,
    take: limite,
    orderBy: { fecha: "desc" },
    select: { id: true, titulo: true, slug: true, fecha: true },
  });

  return NextResponse.json({ posts, pagina, limite });
}

const CrearPostSchema = z.object({
  titulo:   z.string().min(5).max(200),
  contenido: z.string().min(10),
  tags:     z.array(z.string()).optional(),
});

// POST /api/posts
export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = CrearPostSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ errores: result.error.flatten() }, { status: 422 });
  }

  const slug = result.data.titulo.toLowerCase().replace(/\s+/g, "-");
  const post = await db.post.create({
    data: { ...result.data, slug, fecha: new Date() },
  });
  return NextResponse.json(post, { status: 201 });
}`}</Code>
      <Code>{`// app/api/posts/[id]/route.ts - Rutas dinámicas
import { NextRequest, NextResponse } from "next/server";

interface Context { params: { id: string }; }

export async function GET(_req: NextRequest, { params }: Context) {
  const post = await db.post.findUnique({ where: { id: Number(params.id) } });
  if (!post) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  return NextResponse.json(post);
}

export async function DELETE(_req: NextRequest, { params }: Context) {
  await db.post.delete({ where: { id: Number(params.id) } });
  return new NextResponse(null, { status: 204 });
}`}</Code>
    </>
  );
}

function SectionRenderizado() {
  return (
    <>
      <H2>Estrategias de renderizado</H2>
      <H3>SSR, SSG e ISR</H3>
      <Code>{`// SSG (Static Site Generation): generado en build
// Ideal para páginas que no cambian frecuentemente
export default async function BlogPage() {
  const posts = await fetch("https://api.ejemplo.com/posts", {
    cache: "force-cache", // cachear indefinidamente (SSG)
  }).then(r => r.json());

  return <ul>{posts.map(p => <li key={p.id}>{p.titulo}</li>)}</ul>;
}

// SSR (Server-Side Rendering): generado en cada petición
export default async function FeedPage() {
  const posts = await fetch("https://api.ejemplo.com/posts", {
    cache: "no-store", // nunca cachear (SSR puro)
  }).then(r => r.json());

  return <ul>{posts.map(p => <li key={p.id}>{p.titulo}</li>)}</ul>;
}

// ISR (Incremental Static Regeneration): SSG que se regenera
export default async function PopularPage() {
  const posts = await fetch("https://api.ejemplo.com/posts/populares", {
    next: { revalidate: 3600 }, // regenerar cada hora
  }).then(r => r.json());

  return <ul>{posts.map(p => <li key={p.id}>{p.titulo}</li>)}</ul>;
}`}</Code>
      <H3>Revalidación bajo demanda</H3>
      <Code>{`// app/api/revalidar/route.ts
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const { secret, ruta, tag } = await request.json();

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  if (ruta)  revalidatePath(ruta);   // invalida una ruta específica
  if (tag)   revalidateTag(tag);     // invalida por etiqueta

  return NextResponse.json({ revalidado: true, fecha: Date.now() });
}`}</Code>
      <Callout type="tip">ISR es la estrategia por defecto recomendada: <code>next: {"{ revalidate: N }"}</code>. El contenido es estático (rápido) pero se actualiza periódicamente.</Callout>
    </>
  );
}

function SectionOptimizacion() {
  return (
    <>
      <H2>Optimización y performance</H2>
      <H3>next/image</H3>
      <P>El componente <code>Image</code> de Next.js optimiza imágenes automáticamente: las sirve en WebP/AVIF, las redimensiona según el dispositivo y aplica lazy loading.</P>
      <Code>{`import Image from "next/image";

function Avatar({ src, nombre }: { src: string; nombre: string }) {
  return (
    <Image
      src={src}
      alt={nombre}
      width={64}
      height={64}
      className="rounded-full"
      // priority: carga antes (para imágenes above the fold)
      priority={false}
    />
  );
}

// Para imágenes de tamaño variable (fill + objeto contenedor)
function HeroBanner({ src }: { src: string }) {
  return (
    <div className="relative w-full h-64">
      <Image
        src={src}
        alt="Hero"
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
    </div>
  );
}`}</Code>
      <H3>Caching y Server Actions</H3>
      <Code>{`// Server Actions: mutaciones sin API routes
"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function crearPost(formData: FormData) {
  const titulo    = formData.get("titulo") as string;
  const contenido = formData.get("contenido") as string;

  if (!titulo || titulo.length < 5) {
    return { error: "El título es muy corto" };
  }

  const post = await db.post.create({
    data: { titulo, contenido, slug: slugify(titulo), fecha: new Date() },
  });

  revalidatePath("/blog");
  redirect(\`/blog/\${post.slug}\`);
}

// Usar en un formulario (componente cliente)
// <form action={crearPost}>...</form>`}</Code>
      <H3>Fuentes y metadata</H3>
      <Code>{`// Fuentes auto-optimizadas (sin layout shift)
import { Inter, Fira_Code } from "next/font/google";

const inter    = Inter({ subsets: ["latin"], variable: "--font-inter" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-mono" });

// Metadata estática y dinámica
export const metadata = {
  metadataBase: new URL("https://miblog.com"),
  openGraph: {
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};`}</Code>
    </>
  );
}

function SectionProyecto() {
  return (
    <>
      <H2>Proyecto Final: Blog fullstack</H2>
      <P>Blog completo con Next.js 14, Prisma, autenticación con NextAuth y markdown para el contenido.</P>
      <Code>{`# Estructura del proyecto
mi-blog/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # Lista de posts
│   ├── blog/[slug]/page.tsx  # Post individual
│   ├── admin/
│   │   ├── layout.tsx        # Layout protegido
│   │   ├── page.tsx          # Dashboard admin
│   │   └── nuevo/page.tsx    # Crear post
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       └── posts/route.ts
├── components/
│   ├── PostCard.tsx
│   ├── MarkdownRenderer.tsx
│   └── Editor.tsx
├── lib/
│   ├── prisma.ts             # Singleton Prisma client
│   ├── auth.ts               # Configuración NextAuth
│   └── markdown.ts           # Parser markdown
└── prisma/
    └── schema.prisma`}</Code>
      <Code>{`// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  role      String   @default("user")
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id          Int      @id @default(autoincrement())
  titulo      String
  slug        String   @unique
  resumen     String?
  contenido   String
  publicado   Boolean  @default(false)
  fecha       DateTime @default(now())
  actualizadoEn DateTime @updatedAt
  autor       User     @relation(fields: [autorId], references: [id])
  autorId     Int
  tags        Tag[]
}

model Tag {
  id    Int    @id @default(autoincrement())
  nombre String @unique
  posts Post[]
}`}</Code>
      <Code>{`// app/page.tsx - Lista de posts (SSG con ISR)
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Blog" };
export const revalidate = 60; // ISR: regenerar cada 60s

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    where:   { publicado: true },
    orderBy: { fecha: "desc" },
    take:    10,
    include: { autor: { select: { name: true } } },
  });

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Últimos artículos</h1>
      <div className="grid gap-6">
        {posts.map(post => (
          <article key={post.id} className="border rounded-2xl p-6 hover:shadow-md transition">
            <Link href={\`/blog/\${post.slug}\`}>
              <h2 className="text-xl font-semibold mb-2">{post.titulo}</h2>
            </Link>
            {post.resumen && <p className="text-gray-600 text-sm">{post.resumen}</p>}
            <div className="flex gap-4 mt-4 text-xs text-gray-400">
              <span>{post.autor.name}</span>
              <time>{new Date(post.fecha).toLocaleDateString("es-ES")}</time>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}`}</Code>
      <Code>{`// app/admin/nuevo/page.tsx - Crear post con Server Action
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function crearPost(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const titulo    = formData.get("titulo") as string;
  const contenido = formData.get("contenido") as string;
  const resumen   = formData.get("resumen") as string;
  const slug      = titulo.toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  await prisma.post.create({
    data: { titulo, contenido, resumen, slug, autorId: Number(session.user.id) },
  });

  redirect("/admin");
}

export default function NuevoPostPage() {
  return (
    <form action={crearPost} className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Nuevo artículo</h1>
      <input name="titulo" placeholder="Título" required
        className="w-full border rounded-lg p-3" />
      <input name="resumen" placeholder="Resumen breve"
        className="w-full border rounded-lg p-3" />
      <textarea name="contenido" placeholder="Contenido en Markdown..." rows={15} required
        className="w-full border rounded-lg p-3 font-mono text-sm" />
      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">
        Publicar
      </button>
    </form>
  );
}`}</Code>
      <Callout type="tip">Los Server Actions eliminan la necesidad de crear API routes para mutaciones. El formulario funciona incluso sin JavaScript habilitado en el cliente.</Callout>
    </>
  );
}

export default function NextJsContent() {
  const [active, setActive] = useState<SectionId>(SECTIONS[0].id);

  const renderSection = () => {
    switch (active) {
      case "intro":          return <SectionIntro />;
      case "routing":        return <SectionRouting />;
      case "api-routes":     return <SectionApiRoutes />;
      case "renderizado":    return <SectionRenderizado />;
      case "optimizacion":   return <SectionOptimizacion />;
      case "proyecto-final": return <SectionProyecto />;
    }
  };

  return (
    <div className="flex gap-6">
      <nav className="hidden lg:flex flex-col gap-0.5 w-44 flex-shrink-0 sticky top-20 self-start">
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => setActive(s.id)}
            className={`text-left text-xs px-3 py-1.5 rounded-lg transition-colors ${active === s.id ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-semibold" : "text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"}`}>
            {s.label}
          </button>
        ))}
      </nav>
      <div className="flex-1 min-w-0 prose-custom">
        {renderSection()}
      </div>
    </div>
  );
}
