"use client";
import { useState } from "react";

import {
  BlogH2,
  BlogH3,
  BlogP,
  BlogCode,
  BlogInlineCode,
  BlogCallout,
  BlogUl,
  BlogLi,
} from "@/components/blog/shared";

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
  level: "Easy" | "Intermediate" | "Hard";
  description: string;
  hint?: string;
  solution?: string;
}) {
  const [open, setOpen] = useState(false);
  const levelColor = {
    Easy: "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400",
    Intermediate:
      "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
    Hard: "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400",
  }[level];

  return (
    <div className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden">
      <button
        className="w-full px-4 py-3 flex items-center justify-between gap-3 hover:bg-black/3 dark:hover:bg-white/3 transition-colors text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
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
            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl px-3 py-2 text-xs text-blue-800 dark:text-blue-300">
              <strong>Hint:</strong> {hint}
            </div>
          )}
          {solution && <BlogCode>{solution}</BlogCode>}
        </div>
      )}
    </div>
  );
}

export default function RendimientoFrontendContentEn() {
  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 text-xs text-[#aeaeb2] dark:text-[#636366] mb-4">
        <span className="flex items-center gap-1">
          <svg
            aria-hidden="true"
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          Tutorial
        </span>
        <span className="w-1 h-1 rounded-full bg-[#aeaeb2]" />
        <span className="flex items-center gap-1">
          <svg
            aria-hidden="true"
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          60 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3"
        style={{ letterSpacing: "-0.03em" }}
      >
        Frontend performance: Core Web Vitals and optimization
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Speed is not a luxury: it is a factor in conversion, SEO, and
        experience. This tutorial explains what the Core Web Vitals measure,
        how to measure them with Lighthouse and DevTools, and the concrete
        techniques to optimize loading, images, caching, and rendering in React
        and Next.js. Prerequisites: React and Next.js.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="core-web-vitals">Core Web Vitals</BlogH2>

      <BlogP>
        The Core Web Vitals are three metrics Google uses to evaluate user
        experience. They are measured in two contexts:{" "}
        <strong>lab</strong> (controlled environment, Lighthouse) and{" "}
        <strong>field</strong> (real user data, CrUX). Each has a "good"
        threshold and an "needs improvement" one.
      </BlogP>

      <BlogH3 id="lcp">LCP — Largest Contentful Paint</BlogH3>

      <BlogP>
        It measures when the <strong>largest visible element</strong> is
        painted (hero image, big heading, video). It is a{" "}
        <strong>loading</strong> metric.
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Good:</strong> ≤ 2.5s.
        </BlogLi>
        <BlogLi>
          <strong>Needs improvement:</strong> &gt; 4s.
        </BlogLi>
      </BlogUl>

      <BlogP>
        To improve it: optimize TTFB (server/CDN), preload the hero image with{" "}
        <BlogInlineCode>priority</BlogInlineCode>, serve WebP/AVIF images, and
        avoid blocking CSS delaying the first paint.
      </BlogP>

      <BlogH3 id="inp">INP — Interaction to Next Paint</BlogH3>

      <BlogP>
        It measures <strong>interaction latency</strong>: from when the user
        clicks or taps until the UI responds. It replaced FID in 2024 and is a{" "}
        <strong>responsiveness</strong> metric.
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Good:</strong> ≤ 200ms.
        </BlogLi>
        <BlogLi>
          <strong>Needs improvement:</strong> &gt; 500ms.
        </BlogLi>
      </BlogUl>

      <BlogP>
        To improve it: reduce main-thread work (less JS, fewer re-renders),
        avoid long tasks that block interaction, and use{" "}
        <BlogInlineCode>requestIdleCallback</BlogInlineCode> for non-urgent
        work.
      </BlogP>

      <BlogH3 id="cls">CLS — Cumulative Layout Shift</BlogH3>

      <BlogP>
        It measures how much the <strong>layout shifts</strong> unexpectedly
        while the page loads. It is a <strong>visual stability</strong> metric.
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Good:</strong> ≤ 0.1.
        </BlogLi>
        <BlogLi>
          <strong>Needs improvement:</strong> &gt; 0.25.
        </BlogLi>
      </BlogUl>

      <BlogP>
        Typical causes: images without dimensions, fonts that change size on
        load, content injected above the viewport, and animations that move
        elements.
      </BlogP>

      <BlogCallout type="info">
        Lab and field metrics do not always match. Lighthouse measures in an
        ideal environment; field data (CrUX) reflects real devices, slow
        networks, and real users. Optimize for both: lab gives you diagnostics,
        field tells you the truth.
      </BlogCallout>

      <BlogH2 id="herramientas">Lighthouse and tools</BlogH2>

      <BlogP>
        Before optimizing, measure. The usual flow:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Chrome DevTools → Performance:</strong> records a trace and
          shows which tasks block the main thread, how long each resource
          takes, and where the bottleneck is.
        </BlogLi>
        <BlogLi>
          <strong>Lighthouse:</strong> automated audit of performance,
          accessibility, SEO, and best practices. Run from DevTools, CLI, or
          CI.
        </BlogLi>
        <BlogLi>
          <strong>Web Vitals extension:</strong> shows LCP, INP, and CLS in
          real time while you browse.
        </BlogLi>
        <BlogLi>
          <strong>Next.js dashboard:</strong> with{" "}
          <BlogInlineCode>next dev</BlogInlineCode> and the experimental flag,
          you get performance metrics for each route in development.
        </BlogLi>
      </BlogUl>

      <BlogCode>{`// Run Lighthouse from the CLI in CI
npx lighthouse https://your-site.com --view --output=json --output-path=./report.json

// With Next.js, enable bundle analysis
ANALYZE=true npm run build`}</BlogCode>

      <BlogCallout type="warn">
        A single Lighthouse run on your machine is not enough: network, CPU,
        and device change the result. Run it several times, use mobile mode
        (more demanding), and compare with the field data from PageSpeed
        Insights.
      </BlogCallout>

      <BlogH2 id="carga">Load optimization</BlogH2>

      <BlogP>
        The goal is for the user to see useful content as soon as possible and
        for the JavaScript they do not need to not be downloaded.
      </BlogP>

      <BlogH3 id="code-splitting">Code splitting</BlogH3>

      <BlogP>
        Code splitting divides the bundle into chunks loaded on demand. In
        Next.js, each page already generates its own chunk. For heavy
        components inside a page, use{" "}
        <BlogInlineCode>next/dynamic</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`// components/Chart.tsx — loaded only when needed
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("@/components/Chart"), {
  ssr: false, // client only (uses window, canvas…)
  loading: () => <p>Loading chart…</p>,
});

export function Dashboard() {
  return <Chart data={data} />;
}`}</BlogCode>

      <BlogP>
        In plain React (without Next), the equivalent is{" "}
        <BlogInlineCode>React.lazy</BlogInlineCode> with{" "}
        <BlogInlineCode>Suspense</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`import { lazy, Suspense } from "react";

const HeavyEditor = lazy(() => import("./HeavyEditor"));

export function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyEditor />
    </Suspense>
  );
}`}</BlogCode>

      <BlogH3 id="loading-states">Loading states</BlogH3>

      <BlogP>
        An honest loading state prevents the user from thinking the app is
        broken. In Next.js, <BlogInlineCode>loading.tsx</BlogInlineCode> shows
        a placeholder while the segment resolves, and{" "}
        <BlogInlineCode>React.lazy</BlogInlineCode> uses{" "}
        <BlogInlineCode>fallback</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 w-48 rounded bg-gray-200 dark:bg-gray-800" />
      <div className="h-40 rounded bg-gray-200 dark:bg-gray-800" />
    </div>
  );
}`}</BlogCode>

      <BlogH3 id="prefetch">Prefetch</BlogH3>

      <BlogP>
        Prefetch downloads resources before the user asks for them. Next.js
        prefetches visible <BlogInlineCode>Link</BlogInlineCode> elements in
        the viewport automatically. For data, React Query lets you prefetch
        queries:
      </BlogP>

      <BlogCode>{`import { useQueryClient } from "@tanstack/react-query";

export function usePrefetchPost(id: string) {
  const queryClient = useQueryClient();
  return () => {
    queryClient.prefetchQuery({
      queryKey: ["post", id],
      queryFn: () => fetchPost(id),
    });
  };
}`}</BlogCode>

      <BlogCallout type="tip">
        Prefetch sparingly: prefetching everything that will not be used wastes
        bandwidth and can hurt the current page's LCP. Prefetch only what has a
        high probability of being used (the user's next step).
      </BlogCallout>

      <BlogH2 id="imagenes">Images</BlogH2>

      <BlogP>
        Images are usually the largest weight on a page. Three levers: format,
        dimensions, and lazy loading.
      </BlogP>

      <BlogH3 id="formatos">Modern formats</BlogH3>

      <BlogP>
        WebP and AVIF compress much better than JPEG/PNG with similar visual
        quality. AVIF usually wins on weight, WebP on compatibility. Always
        serve the lightest format the browser supports.
      </BlogP>

      <BlogH3 id="next-image">next/image</BlogH3>

      <BlogP>
        <BlogInlineCode>next/image</BlogInlineCode> optimizes automatically: it
        generates multiple sizes (<BlogInlineCode>srcset</BlogInlineCode>),
        serves WebP/AVIF, applies <BlogInlineCode>loading="lazy"</BlogInlineCode>{" "}
        by default, and requires dimensions to avoid CLS:
      </BlogP>

      <BlogCode>{`import Image from "next/image";

export function Hero() {
  return (
    <Image
      src="/cover.jpg"
      alt="Article cover"
      width={1200}
      height={630}
      sizes="(max-width: 768px) 100vw, 50vw"
      priority // the hero image is preloaded
    />
  );
}`}</BlogCode>

      <BlogUl>
        <BlogLi>
          <strong>width/height:</strong> required, they reserve the space and
          eliminate CLS.
        </BlogLi>
        <BlogLi>
          <strong>sizes:</strong> tells the browser what width it will use, to
          pick the right variant from the <BlogInlineCode>srcset</BlogInlineCode>.
        </BlogLi>
        <BlogLi>
          <strong>priority:</strong> preloads the image (only for the hero or
          LCP).
        </BlogLi>
        <BlogLi>
          <strong>loading="lazy":</strong> default in{" "}
          <BlogInlineCode>next/image</BlogInlineCode>; images outside the
          viewport are not downloaded until you get close.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="warn">
        Do not put <BlogInlineCode>priority</BlogInlineCode> on every image:
        only the one that is the LCP. Preloading several images competes for
        bandwidth and slows down the main one.
      </BlogCallout>

      <BlogH2 id="caching">Caching and revalidation</BlogH2>

      <BlogP>
        Caching avoids repeating work. At the HTTP level, responses are cached
        with <BlogInlineCode>Cache-Control</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`// Response of a public API
Cache-Control: public, max-age=3600, stale-while-revalidate=86400

// max-age: 1h fresh in cache
// stale-while-revalidate: 24h more serving the old copy
// while it revalidates in the background`}</BlogCode>

      <BlogP>
        In Next.js, ISR (Incremental Static Regeneration) combines static with
        revalidation: the page is generated at build time and regenerated in
        the background when <BlogInlineCode>revalidate</BlogInlineCode>{" "}
        expires:
      </BlogP>

      <BlogCode>{`// pages/blog/[slug].tsx
export async function getStaticProps({ params }) {
  const post = await fetchPost(params.slug);
  return {
    props: { post },
    revalidate: 3600, // regenerates at most once an hour
  };
}

export async function getStaticPaths() {
  const posts = await fetchAllPosts();
  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: "blocking", // new pages are generated on demand
  };
}`}</BlogCode>

      <BlogCallout type="info">
        <BlogInlineCode>stale-while-revalidate</BlogInlineCode> and ISR share
        the same philosophy: the user never waits for fresh content; they get
        the cached copy and the update arrives later. It is the difference
        between "fast but outdated" and "slow but perfect".
      </BlogCallout>

      <BlogH2 id="memoizacion">Memoization in React</BlogH2>

      <BlogP>
        Memoization avoids repeated work, but it is not free: every{" "}
        <BlogInlineCode>useMemo</BlogInlineCode> or{" "}
        <BlogInlineCode>React.memo</BlogInlineCode> adds comparisons. Use it
        with judgment.
      </BlogP>

      <BlogH3 id="react-memo">React.memo</BlogH3>

      <BlogP>
        It prevents a component from re-rendering if its props did not change.
        Useful for heavy components that receive stable props:
      </BlogP>

      <BlogCode>{`import { memo } from "react";

interface RowProps {
  id: number;
  name: string;
  onSelect: (id: number) => void;
}

const Row = memo(function Row({ id, name, onSelect }: RowProps) {
  return <li onClick={() => onSelect(id)}>{name}</li>;
});`}</BlogCode>

      <BlogH3 id="usememo-usecallback">useMemo and useCallback</BlogH3>

      <BlogP>
        <BlogInlineCode>useMemo</BlogInlineCode> caches a computed value;{" "}
        <BlogInlineCode>useCallback</BlogInlineCode> caches a function. Both
        stabilize references so <BlogInlineCode>React.memo</BlogInlineCode>{" "}
        works:
      </BlogP>

      <BlogCode>{`import { useCallback, useMemo } from "react";

export function Parent() {
  // the list is computed once
  const items = useMemo(() => buildItems(), []);

  // the function keeps the same reference between renders
  const handleSelect = useCallback((id: number) => {
    setSelected(id);
  }, []);

  return <RowList items={items} onSelect={handleSelect} />;
}`}</BlogCode>

      <BlogCallout type="warn">
        Do not memoize everything. If the component is cheap or its props
        change on every render, <BlogInlineCode>React.memo</BlogInlineCode>{" "}
        only adds cost. The rule: memoize when there is a heavy component, a
        long list, or an expensive value to compute — and measure before and
        after. Premature memoization is a complexity debt.
      </BlogCallout>

      <BlogH2 id="eliminar-cls">Eliminating CLS</BlogH2>

      <BlogP>
        CLS is eliminated by reserving space for everything that loads later.
        Three key techniques:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Fixed dimensions:</strong> images and videos with{" "}
          <BlogInlineCode>width</BlogInlineCode>/<BlogInlineCode>height</BlogInlineCode>{" "}
          or <BlogInlineCode>aspect-ratio</BlogInlineCode>.
        </BlogLi>
        <BlogLi>
          <strong>Fonts:</strong> use{" "}
          <BlogInlineCode>font-display: swap</BlogInlineCode> so text shows with
          a fallback font while the real one loads.
        </BlogLi>
        <BlogLi>
          <strong>Containers:</strong> reserve height for content that arrives
          late (ads, embeds, lists).
        </BlogLi>
      </BlogUl>

      <BlogCode>{`/* Reserve space with aspect-ratio instead of letting it push */
.media {
  aspect-ratio: 16 / 9;
  width: 100%;
}

/* Font that does not shift the layout on load */
@font-face {
  font-family: "MyFont";
  src: url("/fonts/my-font.woff2") format("woff2");
  font-display: swap;
}`}</BlogCode>

      <BlogCallout type="tip">
        A common CLS pattern: a banner or ad inserted above the content.
        Reserve its space with a fixed-height container or{" "}
        <BlogInlineCode>min-height</BlogInlineCode> from the first render.
      </BlogCallout>

      <BlogH2 id="bundle">Bundle analysis</BlogH2>

      <BlogP>
        A large bundle means more download and more parsing.{" "}
        <BlogInlineCode>@next/bundle-analyzer</BlogInlineCode> generates a
        visual map of what weighs in your bundle:
      </BlogP>

      <BlogCode>{`// next.config.mjs
import withBundleAnalyzer from "@next/bundle-analyzer"({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer({
  // your Next config
});`}</BlogCode>

      <BlogP>
        With the analysis in hand, look for heavy dependencies and ask
        yourself:
      </BlogP>

      <BlogUl>
        <BlogLi>
          Can I import only the part I use? (tree-shaking,{" "}
          <BlogInlineCode>import { useMemo } from "react"</BlogInlineCode>).
        </BlogLi>
        <BlogLi>
          Can I load it lazily with <BlogInlineCode>dynamic</BlogInlineCode>?
        </BlogLi>
        <BlogLi>
          Is there a lighter alternative? (a small utility instead of full
          lodash).
        </BlogLi>
      </BlogUl>

      <BlogCallout type="tip">
        Bundle analysis is a habit, not an event: run it in CI and alert when
        the size rises above a threshold. That way heavy dependencies are
        caught in the PR, not in production.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="ejercicios">Exercises</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Optimize a hero image so it does not cause CLS and loads with priority. Indicate dimensions, sizes, and the correct attribute."
          hint="next/image with width/height, responsive sizes, and priority only on the hero."
          level="Easy"
          num={1}
          solution={`import Image from "next/image";

export function Hero() {
  return (
    <Image
      src="/hero.jpg"
      alt="Main image of the page"
      width={1600}
      height={900}
      sizes="100vw"
      priority
      className="w-full h-auto"
    />
  );
}`}
          title="Hero image without CLS"
        />

        <ExerciseCard
          description="Load a heavy text editor only when needed, with a loading fallback and without rendering it on the server."
          hint="next/dynamic with ssr: false and a loading."
          level="Easy"
          num={2}
          solution={`import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
  loading: () => <p>Loading editor…</p>,
});

export function PostForm() {
  return <RichTextEditor />;
}`}
          title="Code splitting with dynamic"
        />

        <ExerciseCard
          description="Apply memoization to a list of heavy rows: memoize the row component and stabilize the props with useMemo and useCallback."
          hint="React.memo on Row, useMemo for items, and useCallback for onSelect."
          level="Intermediate"
          num={3}
          solution={`import { memo, useCallback, useMemo } from "react";

interface RowProps {
  id: number;
  name: string;
  onSelect: (id: number) => void;
}

const Row = memo(function Row({ id, name, onSelect }: RowProps) {
  return <li onClick={() => onSelect(id)}>{name}</li>;
});

export function RowList() {
  const items = useMemo(() => buildItems(), []);
  const handleSelect = useCallback((id: number) => {
    console.log("selected", id);
  }, []);

  return (
    <ul>
      {items.map((item) => (
        <Row key={item.id} id={item.id} name={item.name} onSelect={handleSelect} />
      ))}
    </ul>
  );
}`}
          title="Memoized list"
        />

        <ExerciseCard
          description="Configure ISR on an articles page so it regenerates every 30 minutes and supports new articles on demand."
          hint="getStaticProps with revalidate: 1800 and getStaticPaths with fallback: 'blocking'."
          level="Intermediate"
          num={4}
          solution={`// pages/articles/[slug].tsx
import type { GetStaticProps, GetStaticPaths } from "next";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await fetchPost(params.slug);
  return {
    props: { post },
    revalidate: 1800, // 30 min
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchAllPosts();
  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: "blocking",
  };
};`}
          title="ISR with revalidation"
        />

        <ExerciseCard
          description="Reduce the CLS of an image gallery that loads lazily, reserving the space before the images arrive."
          hint="aspect-ratio on the container and lazy loading on each image."
          level="Hard"
          num={5}
          solution={`import Image from "next/image";

export function Gallery({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {images.map((img) => (
        <div key={img.src} className="aspect-square w-full">
          <Image
            src={img.src}
            alt={img.alt}
            width={800}
            height={800}
            sizes="(max-width: 768px) 50vw, 25vw"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      ))}
    </div>
  );
}`}
          title="Gallery without CLS"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        Performance is not a final phase: it is a discipline applied while you
        write. Measure with Lighthouse and field data, optimize images and
        loading, cache with judgment, and memoize only where it helps. Each
        technique in this tutorial attacks a specific metric — and together
        they turn a page that "works" into one that feels instant.
      </BlogP>
    </article>
  );
}