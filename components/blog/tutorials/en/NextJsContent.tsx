"use client";
import { useState } from "react";

import {
  BlogCode,
  BlogH2,
  BlogH3,
  BlogP,
  BlogCallout,
} from "@/components/blog/shared";

type SectionId =
  | "intro"
  | "routing"
  | "api-routes"
  | "renderizado"
  | "optimizacion"
  | "proyecto-final"
  | "ejercicios";

interface SectionDef {
  id: SectionId;
  label: string;
}
const SECTIONS: SectionDef[] = [
  { id: "intro", label: "1. SSR vs CSR" },
  { id: "routing", label: "2. Routing" },
  { id: "api-routes", label: "3. API Routes" },
  { id: "renderizado", label: "4. Rendering" },
  { id: "optimizacion", label: "5. Optimization" },
  { id: "proyecto-final", label: "Final Project" },
  { id: "ejercicios", label: "Exercises" },
];

function SectionIntro() {
  return (
    <>
      <BlogH2>SSR vs CSR: when to use each</BlogH2>
      <BlogP>
        Next.js lets you choose the most appropriate rendering strategy for
        each page within the same project. This flexibility is its main
        advantage over plain React.
      </BlogP>
      <BlogH3>Client-Side Rendering (CSR)</BlogH3>
      <BlogP>
        The HTML arrives empty in the browser and JavaScript renders the content.
        Ideal for private dashboards or highly interactive pages.
      </BlogP>
      <BlogCode>{`// Client component: marked with "use client"
"use client";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/stats")
      .then(r => r.json())
      .then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;
  return <div>Total users: {data.total}</div>;
}`}</BlogCode>
      <BlogH3>Server-Side Rendering (SSR)</BlogH3>
      <BlogP>
        HTML is generated on the server on each request. The client receives
        already rendered HTML, improving SEO and first paint time.
      </BlogP>
      <BlogCode>{`// Server component (default in App Router)
// No "use client" needed
async function getUser(id: string) {
  const res = await fetch(\`https://api.example.com/users/\${id}\`, {
    cache: "no-store", // no caching: always fresh data
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);
  if (!user) return <p>User not found</p>;

  return (
    <main>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </main>
  );
}`}</BlogCode>
      <BlogCallout type="tip">
        In the App Router (Next.js 13+), components are Server Components
        by default. Only add <code>"use client"</code> when you need
        state, effects, or browser APIs.
      </BlogCallout>
    </>
  );
}

function SectionRouting() {
  return (
    <>
      <BlogH2>Routing with App Router</BlogH2>
      <BlogP>
        The App Router uses the file system. Each folder under{" "}
        <code>app/</code> is a route segment. Special files
        define the behavior of each segment.
      </BlogP>
      <BlogCode>{`app/
├── layout.tsx           # Root layout (always present)
├── page.tsx             # / (home page)
├── loading.tsx          # Loading UI (automatic Suspense)
├── error.tsx            # Error handling
├── not-found.tsx        # 404 page
├── blog/
│   ├── page.tsx         # /blog
│   └── [slug]/
│       └── page.tsx     # /blog/:slug (dynamic route)
├── (auth)/              # Route group (does not affect URL)
│   ├── login/page.tsx   # /login
│   └── register/page.tsx
└── api/
    └── posts/
        └── route.ts     # API route`}</BlogCode>
      <BlogH3>Layouts and dynamic pages</BlogH3>
      <BlogCode>{`// app/layout.tsx - Root layout
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "My Blog", template: "%s | My Blog" },
  description: "Blog about web development",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header><nav>My Blog</nav></header>
        <main>{children}</main>
        <footer>© 2025</footer>
      </body>
    </html>
  );
}`}</BlogCode>
      <BlogCode>{`// app/blog/[slug]/page.tsx - Dynamic route
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props { params: { slug: string }; }

// Generate dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.summary };
}

// Generate static routes at build time (SSG)
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(p => ({ slug: p.slug }));
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <article>
      <h1>{post.title}</h1>
      <time>{new Date(post.date).toLocaleDateString("en-US")}</time>
      <div dangerouslySetInnerHTML={{ __html: post.htmlContent }} />
    </article>
  );
}`}</BlogCode>
    </>
  );
}

function SectionApiRoutes() {
  return (
    <>
      <BlogH2>API Routes</BlogH2>
      <BlogP>
        Files named <code>route.ts</code> inside <code>app/api/</code>{" "}
        define HTTP endpoints. Each exported function corresponds to an HTTP
        method.
      </BlogP>
      <BlogCode>{`// app/api/posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// GET /api/posts?page=1&limit=10
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "10");

  const posts = await db.post.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { date: "desc" },
    select: { id: true, title: true, slug: true, date: true },
  });

  return NextResponse.json({ posts, page, limit });
}

const CreatePostSchema = z.object({
  title:   z.string().min(5).max(200),
  content: z.string().min(10),
  tags:    z.array(z.string()).optional(),
});

// POST /api/posts
export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = CreatePostSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ errors: result.error.flatten() }, { status: 422 });
  }

  const slug = result.data.title.toLowerCase().replace(/\\s+/g, "-");
  const post = await db.post.create({
    data: { ...result.data, slug, date: new Date() },
  });
  return NextResponse.json(post, { status: 201 });
}`}</BlogCode>
      <BlogCode>{`// app/api/posts/[id]/route.ts - Dynamic routes
import { NextRequest, NextResponse } from "next/server";

interface Context { params: { id: string }; }

export async function GET(_req: NextRequest, { params }: Context) {
  const post = await db.post.findUnique({ where: { id: Number(params.id) } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function DELETE(_req: NextRequest, { params }: Context) {
  await db.post.delete({ where: { id: Number(params.id) } });
  return new NextResponse(null, { status: 204 });
}`}</BlogCode>
    </>
  );
}

function SectionRenderizado() {
  return (
    <>
      <BlogH2>Rendering strategies</BlogH2>
      <BlogH3>SSR, SSG and ISR</BlogH3>
      <BlogCode>{`// SSG (Static Site Generation): generated at build time
// Ideal for pages that don't change frequently
export default async function BlogPage() {
  const posts = await fetch("https://api.example.com/posts", {
    cache: "force-cache", // cache indefinitely (SSG)
  }).then(r => r.json());

  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}

// SSR (Server-Side Rendering): generated on each request
export default async function FeedPage() {
  const posts = await fetch("https://api.example.com/posts", {
    cache: "no-store", // never cache (pure SSR)
  }).then(r => r.json());

  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}

// ISR (Incremental Static Regeneration): SSG that regenerates
export default async function PopularPage() {
  const posts = await fetch("https://api.example.com/posts/popular", {
    next: { revalidate: 3600 }, // regenerate every hour
  }).then(r => r.json());

  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}`}</BlogCode>
      <BlogH3>On-demand revalidation</BlogH3>
      <BlogCode>{`// app/api/revalidate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const { secret, path, tag } = await request.json();

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (path)  revalidatePath(path);   // invalidates a specific path
  if (tag)   revalidateTag(tag);     // invalidates by tag

  return NextResponse.json({ revalidated: true, date: Date.now() });
}`}</BlogCode>
      <BlogCallout type="tip">
        ISR is the recommended default strategy:{" "}
        <code>next: {"{ revalidate: N }"}</code>. Content is static
        (fast) but updates periodically.
      </BlogCallout>
    </>
  );
}

function SectionOptimizacion() {
  return (
    <>
      <BlogH2>Optimization and performance</BlogH2>
      <BlogH3>next/image</BlogH3>
      <BlogP>
        Next.js <code>Image</code> component automatically optimizes
        images: it serves them in WebP/AVIF, resizes them based on the
        device, and applies lazy loading.
      </BlogP>
      <BlogCode>{`import Image from "next/image";

function Avatar({ src, name }: { src: string; name: string }) {
  return (
    <Image
      src={src}
      alt={name}
      width={64}
      height={64}
      className="rounded-full"
      // priority: loads earlier (for above-the-fold images)
      priority={false}
    />
  );
}

// For variable-size images (fill + container object)
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
}`}</BlogCode>
      <BlogH3>Caching and Server Actions</BlogH3>
      <BlogCode>{`// Server Actions: mutations without API routes
"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  const title    = formData.get("title") as string;
  const content  = formData.get("content") as string;

  if (!title || title.length < 5) {
    return { error: "Title is too short" };
  }

  const post = await db.post.create({
    data: { title, content, slug: slugify(title), date: new Date() },
  });

  revalidatePath("/blog");
  redirect(\`/blog/\${post.slug}\`);
}

// Use in a form (client component)
// <form action={createPost}>...</form>`}</BlogCode>
      <BlogH3>Fonts and metadata</BlogH3>
      <BlogCode>{`// Auto-optimized fonts (no layout shift)
import { Inter, Fira_Code } from "next/font/google";

const inter    = Inter({ subsets: ["latin"], variable: "--font-inter" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-mono" });

// Static and dynamic metadata
export const metadata = {
  metadataBase: new URL("https://myblog.com"),
  openGraph: {
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};`}</BlogCode>
    </>
  );
}

function SectionProyecto() {
  return (
    <>
      <BlogH2>Final Project: Fullstack Blog</BlogH2>
      <BlogP>
        Complete blog with Next.js 14, Prisma, authentication with NextAuth, and
        markdown for content.
      </BlogP>
      <BlogCode>{`# Project structure
my-blog/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # Post list
│   ├── blog/[slug]/page.tsx  # Single post
│   ├── admin/
│   │   ├── layout.tsx        # Protected layout
│   │   ├── page.tsx          # Admin dashboard
│   │   └── new/page.tsx      # Create post
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       └── posts/route.ts
├── components/
│   ├── PostCard.tsx
│   ├── MarkdownRenderer.tsx
│   └── Editor.tsx
├── lib/
│   ├── prisma.ts             # Prisma client singleton
│   ├── auth.ts               # NextAuth configuration
│   └── markdown.ts           # Markdown parser
└── prisma/
    └── schema.prisma`}</BlogCode>
      <BlogCode>{`// prisma/schema.prisma
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
  title       String
  slug        String   @unique
  summary     String?
  content     String
  published   Boolean  @default(false)
  date        DateTime @default(now())
  updatedAt   DateTime @updatedAt
  author      User     @relation(fields: [authorId], references: [id])
  authorId    Int
  tags        Tag[]
}

model Tag {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts Post[]
}`}</BlogCode>
      <BlogCode>{`// app/page.tsx - Post list (SSG with ISR)
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Blog" };
export const revalidate = 60; // ISR: regenerate every 60s

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    where:   { published: true },
    orderBy: { date: "desc" },
    take:    10,
    include: { author: { select: { name: true } } },
  });

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Latest articles</h1>
      <div className="grid gap-6">
        {posts.map(post => (
          <article key={post.id} className="border rounded-2xl p-6 hover:shadow-md transition">
            <Link href={\`/blog/\${post.slug}\`}>
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            </Link>
            {post.summary && <p className="text-gray-600 text-sm">{post.summary}</p>}
            <div className="flex gap-4 mt-4 text-xs text-gray-400">
              <span>{post.author.name}</span>
              <time>{new Date(post.date).toLocaleDateString("en-US")}</time>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}`}</BlogCode>
      <BlogCode>{`// app/admin/new/page.tsx - Create post with Server Action
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function createPost(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const title   = formData.get("title") as string;
  const content = formData.get("content") as string;
  const summary = formData.get("summary") as string;
  const slug    = title.toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  await prisma.post.create({
    data: { title, content, summary, slug, authorId: Number(session.user.id) },
  });

  redirect("/admin");
}

export default function NewPostPage() {
  return (
    <form action={createPost} className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">New article</h1>
      <input name="title" placeholder="Title" required
        className="w-full border rounded-lg p-3" />
      <input name="summary" placeholder="Brief summary"
        className="w-full border rounded-lg p-3" />
      <textarea name="content" placeholder="Content in Markdown..." rows={15} required
        className="w-full border rounded-lg p-3 font-mono text-sm" />
      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">
        Publish
      </button>
    </form>
  );
}`}</BlogCode>
      <BlogCallout type="tip">
        Server Actions eliminate the need to create API routes for
        mutations. The form works even without JavaScript enabled on the
        client.
      </BlogCallout>
    </>
  );
}

function ExerciseCard({
  num,
  title,
  level,
  description,
  hint,
  solution,
}: {
  num: number;
  title: string;
  level: "Basic" | "Intermediate" | "Advanced";
  description: string;
  hint?: string;
  solution?: string;
}) {
  const [open, setOpen] = useState(false);
  const levelColor = {
    Basic:
      "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400",
    Intermediate:
      "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
    Advanced: "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400",
  }[level];

  return (
    <div className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden">
      <button
        className="w-full px-4 py-3 flex items-center justify-between gap-3 hover:bg-black/3 dark:hover:bg-white/3 transition-colors text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-slate-800 text-white text-xs font-bold flex items-center justify-center shrink-0">
            {num}
          </span>
          <span className="text-sm font-medium text-[#1d1d1f] dark:text-white">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColor}`}
          >
            {level}
          </span>
          <span className="text-[#aeaeb2] text-xs">{open ? "▲" : "▼"}</span>
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-black/8 dark:border-white/8 pt-3 space-y-3">
          <p className="text-sm text-[#3a3a3c] dark:text-[#aeaeb2]">
            {description}
          </p>
          {hint && (
            <div className="bg-slate-50 dark:bg-slate-900/40 rounded-xl px-3 py-2 text-xs text-slate-700 dark:text-slate-300">
              <strong>Hint:</strong> {hint}
            </div>
          )}
          {solution && <BlogCode>{solution}</BlogCode>}
        </div>
      )}
    </div>
  );
}

function SEjercicios() {
  return (
    <>
      <BlogH2>Next.js Exercises</BlogH2>
      <BlogP>
        Practical exercises to master advanced Next.js features with App Router.
      </BlogP>
      <div className="space-y-3 mt-6">
        <ExerciseCard
          description="Create a /products page that shows a product list generated at build time using generateStaticParams and static fetch (cache: 'force-cache')."
          hint="In App Router, Server Components are async by default. Use fetch() directly in the component."
          level="Basic"
          num={1}
          solution={`// app/products/page.tsx
async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "force-cache", // SSG - generated at build time
  });
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1>Catalog</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((p: any) => (
          <div key={p.id} className="border p-4 rounded-xl">
            <h2>{p.title}</h2>
            <p>\${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}`}
          title="Page with static data"
        />

        <ExerciseCard
          description="Create an API Route at /api/contact that only accepts POST, validates that the body contains name and email (valid format), and returns the saved message with a generated id."
          hint="In App Router use route.ts with export async function POST(request: Request). Parse with request.json()."
          level="Basic"
          num={2}
          solution={`// app/api/contact/route.ts
export async function POST(request: Request) {
  const body = await request.json();
  const { name, email } = body;

  if (!name || name.length < 2) {
    return Response.json({ error: "Invalid name" }, { status: 400 });
  }
  if (!email?.includes("@")) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  const message = {
    id: crypto.randomUUID(),
    name,
    email,
    createdAt: new Date().toISOString(),
  };

  // Here you would save to DB
  return Response.json({ success: true, data: message }, { status: 201 });
}

export async function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}`}
          title="API Route with validation"
        />

        <ExerciseCard
          description="Create a /blog/[slug] page that generates routes statically for the most popular posts and regenerates content every 60 seconds (ISR) for the rest."
          hint="Use generateStaticParams for known routes and export const revalidate = 60 for regeneration."
          level="Intermediate"
          num={3}
          solution={`// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";

export const revalidate = 60; // Regenerate every 60 seconds

export async function generateStaticParams() {
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
    .then(r => r.json());
  return posts.map((post: any) => ({ slug: String(post.id) }));
}

async function getPost(slug: string) {
  const res = await fetch(\`https://jsonplaceholder.typicode.com/posts/\${slug}\`);
  if (!res.ok) return null;
  return res.json();
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}`}
          title="Dynamic page with ISR"
        />

        <ExerciseCard
          description="Create a Next.js middleware that protects all routes under /dashboard. If the user does not have a 'session' cookie, redirect to /login. Allow access if the cookie exists."
          hint="The middleware.ts file goes at the project root. Use the matcher config to specify routes to protect."
          level="Intermediate"
          num={4}
          solution={`// middleware.ts (project root)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    // Save the original URL to redirect after login
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};`}
          title="Authentication middleware"
        />

        <ExerciseCard
          description="Create a form that uses a Server Action to save a comment, revalidates the page cache, and shows the result without reloading. Use useFormState and useFormStatus."
          hint="Define the Server Action in a separate file with 'use server'. Use revalidatePath() to refresh data after saving."
          level="Advanced"
          num={5}
          solution={`// actions/comments.ts
"use server";
import { revalidatePath } from "next/cache";

export async function saveComment(prevState: any, formData: FormData) {
  const text = formData.get("text") as string;

  if (!text || text.length < 5) {
    return { error: "Comment must be at least 5 characters" };
  }

  // Save to DB...
  await new Promise(resolve => setTimeout(resolve, 500)); // simulate DB

  revalidatePath("/comments"); // refreshes data on the page
  return { success: true, message: "Comment saved" };
}

// components/CommentForm.tsx
"use client";
import { useFormState, useFormStatus } from "react-dom";
import { saveComment } from "@/actions/comments";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? "Saving..." : "Submit"}</button>;
}

export function CommentForm() {
  const [state, action] = useFormState(saveComment, null);
  return (
    <form action={action}>
      <textarea name="text" placeholder="Your comment..." />
      {state?.error && <p className="text-red-500">{state.error}</p>}
      {state?.success && <p className="text-green-500">{state.message}</p>}
      <SubmitButton />
    </form>
  );
}`}
          title="Server Action with revalidation"
        />
      </div>
    </>
  );
}

export default function NextJsContent() {
  const [active, setActive] = useState<SectionId>(SECTIONS[0].id);

  const renderSection = () => {
    switch (active) {
      case "intro":
        return <SectionIntro />;
      case "routing":
        return <SectionRouting />;
      case "api-routes":
        return <SectionApiRoutes />;
      case "renderizado":
        return <SectionRenderizado />;
      case "optimizacion":
        return <SectionOptimizacion />;
      case "proyecto-final":
        return <SectionProyecto />;
      case "ejercicios":
        return <SEjercicios />;
    }
  };

  return (
    <div className="flex gap-6">
      <nav className="hidden lg:flex flex-col gap-0.5 w-44 flex-shrink-0 sticky top-20 self-start">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            className={`text-left text-xs px-3 py-1.5 rounded-lg transition-colors ${active === s.id ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-semibold" : "text-[#6e6e73] dark:text-[#86868b] hover:bg-black/5 dark:hover:bg-white/5"}`}
            onClick={() => setActive(s.id)}
          >
            {s.label}
          </button>
        ))}
      </nav>
      <div className="flex-1 min-w-0 prose-custom">{renderSection()}</div>
    </div>
  );
}
