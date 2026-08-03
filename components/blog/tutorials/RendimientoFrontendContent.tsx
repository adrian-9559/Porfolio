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
  level: "Básico" | "Intermedio" | "Avanzado";
  description: string;
  hint?: string;
  solution?: string;
}) {
  const [open, setOpen] = useState(false);
  const levelColor = {
    Básico:
      "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400",
    Intermedio:
      "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
    Avanzado: "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400",
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
              <strong>Pista:</strong> {hint}
            </div>
          )}
          {solution && <BlogCode>{solution}</BlogCode>}
        </div>
      )}
    </div>
  );
}

export default function RendimientoFrontendContent() {
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
        Rendimiento frontend: Core Web Vitals y optimización
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        La velocidad no es un lujo: es un factor de conversión, de SEO y de
        experiencia. Este tutorial explica qué miden los Core Web Vitals, cómo
        medirlos con Lighthouse y DevTools, y las técnicas concretas para
        optimizar carga, imágenes, caché y renderizado en React y Next.js.
        Prerequisitos: React y Next.js.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="core-web-vitals">Core Web Vitals</BlogH2>

      <BlogP>
        Los Core Web Vitals son tres métricas que Google usa para evaluar la
        experiencia de usuario. Se miden en dos contextos:{" "}
        <strong>lab</strong> (entorno controlado, Lighthouse) y{" "}
        <strong>field</strong> (datos reales de usuarios, CrUX). Cada una tiene
        un umbral "bueno" y uno "mejorar".
      </BlogP>

      <BlogH3 id="lcp">LCP — Largest Contentful Paint</BlogH3>

      <BlogP>
        Mide cuándo se pinta el <strong>elemento más grande</strong> visible
        (imagen hero, título grande, vídeo). Es una métrica de{" "}
        <strong>carga</strong>.
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Bueno:</strong> ≤ 2.5s.
        </BlogLi>
        <BlogLi>
          <strong>Mejorar:</strong> &gt; 4s.
        </BlogLi>
      </BlogUl>

      <BlogP>
        Para mejorarlo: optimiza el TTFB (servidor/CDN), precarga la imagen
        hero con <BlogInlineCode>priority</BlogInlineCode>, sirve imágenes en
        WebP/AVIF y evita que el CSS bloqueante retrase el primer paint.
      </BlogP>

      <BlogH3 id="inp">INP — Interaction to Next Paint</BlogH3>

      <BlogP>
        Mide la <strong>latencia de las interacciones</strong>: desde que el
        usuario hace clic o toca hasta que la UI responde. Sustituyó a FID en
        2024 y es una métrica de <strong>capacidad de respuesta</strong>.
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Bueno:</strong> ≤ 200ms.
        </BlogLi>
        <BlogLi>
          <strong>Mejorar:</strong> &gt; 500ms.
        </BlogLi>
      </BlogUl>

      <BlogP>
        Para mejorarlo: reduce el trabajo del hilo principal (menos JS, menos
        re-renders), evita tareas largas que bloqueen la interacción y usa{" "}
        <BlogInlineCode>requestIdleCallback</BlogInlineCode> para trabajo no
        urgente.
      </BlogP>

      <BlogH3 id="cls">CLS — Cumulative Layout Shift</BlogH3>

      <BlogP>
        Mide cuánto se <strong>desplaza el layout</strong> de forma inesperada
        mientras la página carga. Es una métrica de{" "}
        <strong>estabilidad visual</strong>.
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Bueno:</strong> ≤ 0.1.
        </BlogLi>
        <BlogLi>
          <strong>Mejorar:</strong> &gt; 0.25.
        </BlogLi>
      </BlogUl>

      <BlogP>
        Las causas típicas: imágenes sin dimensiones, fuentes que cambian de
        tamaño al cargar, contenido inyectado por encima del viewport y
        animaciones que mueven elementos.
      </BlogP>

      <BlogCallout type="info">
        Las métricas de lab y field no siempre coinciden. Lighthouse mide en un
        entorno ideal; los datos de campo (CrUX) reflejan dispositivos reales,
        redes lentas y usuarios reales. Optimiza para ambos: lab te da
        diagnósticos, field te dice la verdad.
      </BlogCallout>

      <BlogH2 id="herramientas">Lighthouse y herramientas</BlogH2>

      <BlogP>
        Antes de optimizar, mide. El flujo habitual:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Chrome DevTools → Performance:</strong> graba un trace y
          muestra qué tareas bloquean el hilo principal, cuánto tarda cada
          recurso y dónde está el cuello de botella.
        </BlogLi>
        <BlogLi>
          <strong>Lighthouse:</strong> auditoría automatizada de performance,
          accesibilidad, SEO y buenas prácticas. Se ejecuta desde DevTools, CLI
          o CI.
        </BlogLi>
        <BlogLi>
          <strong>Web Vitals extension:</strong> muestra LCP, INP y CLS en
          tiempo real mientras navegas.
        </BlogLi>
        <BlogLi>
          <strong>Dashboard de Next.js:</strong> con{" "}
          <BlogInlineCode>next dev</BlogInlineCode> y la flag experimental,
          obtienes métricas de rendimiento de cada ruta en desarrollo.
        </BlogLi>
      </BlogUl>

      <BlogCode>{`// Ejecutar Lighthouse desde CLI en CI
npx lighthouse https://tu-sitio.com --view --output=json --output-path=./report.json

// Con Next.js, activa el análisis de bundle
ANALYZE=true npm run build`}</BlogCode>

      <BlogCallout type="warn">
        Un único Lighthouse en tu máquina no basta: la red, la CPU y el
        dispositivo cambian el resultado. Corre varias veces, usa el modo
        móvil (más exigente) y compara con los datos de campo de PageSpeed
        Insights.
      </BlogCallout>

      <BlogH2 id="carga">Optimización de carga</BlogH2>

      <BlogP>
        El objetivo es que el usuario vea contenido útil lo antes posible y que
        el JavaScript que no necesita no se descargue.
      </BlogP>

      <BlogH3 id="code-splitting">Code splitting</BlogH3>

      <BlogP>
        El code splitting divide el bundle en trozos que se cargan bajo demanda.
        En Next.js, cada página ya genera su propio chunk. Para componentes
        pesados dentro de una página, usa{" "}
        <BlogInlineCode>next/dynamic</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`// components/Chart.tsx — se carga solo cuando se necesita
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("@/components/Chart"), {
  ssr: false, // solo cliente (usa window, canvas…)
  loading: () => <p>Cargando gráfico…</p>,
});

export function Dashboard() {
  return <Chart data={data} />;
}`}</BlogCode>

      <BlogP>
        En React puro (sin Next), el equivalente es{" "}
        <BlogInlineCode>React.lazy</BlogInlineCode> con{" "}
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
        Un loading state honesto evita que el usuario piense que la app está
        rota. En Next.js, <BlogInlineCode>loading.tsx</BlogInlineCode> muestra
        un placeholder mientras el segmento se resuelve, y{" "}
        <BlogInlineCode>React.lazy</BlogInlineCode> usa{" "}
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
        El prefetch descarga recursos antes de que el usuario los pida. Next.js
        prefetchea los enlaces <BlogInlineCode>Link</BlogInlineCode> visibles
        en el viewport automáticamente. Para datos, React Query permite
        prefetchar queries:
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
        Prefetcha con moderación: prefetchear todo lo que no se va a usar
        desperdicia ancho de banda y puede empeorar el LCP de la página actual.
        Prefetch solo lo que tiene alta probabilidad de usarse (el siguiente
        paso del usuario).
      </BlogCallout>

      <BlogH2 id="imagenes">Imágenes</BlogH2>

      <BlogP>
        Las imágenes suelen ser el mayor peso de una página. Tres palancas:
        formato, dimensiones y carga diferida.
      </BlogP>

      <BlogH3 id="formatos">Formatos modernos</BlogH3>

      <BlogP>
        WebP y AVIF comprimen mucho mejor que JPEG/PNG con calidad visual
        similar. AVIF suele ganar en peso, WebP en compatibilidad. Sirve
        siempre el formato más ligero que soporte el navegador.
      </BlogP>

      <BlogH3 id="next-image">next/image</BlogH3>

      <BlogP>
        <BlogInlineCode>next/image</BlogInlineCode> optimiza automáticamente:
        genera múltiples tamaños (<BlogInlineCode>srcset</BlogInlineCode>),
        sirve WebP/AVIF, aplica <BlogInlineCode>loading="lazy"</BlogInlineCode>{" "}
        por defecto y exige dimensiones para evitar CLS:
      </BlogP>

      <BlogCode>{`import Image from "next/image";

export function Hero() {
  return (
    <Image
      src="/portada.jpg"
      alt="Portada del artículo"
      width={1200}
      height={630}
      sizes="(max-width: 768px) 100vw, 50vw"
      priority // la imagen hero se precarga
    />
  );
}`}</BlogCode>

      <BlogUl>
        <BlogLi>
          <strong>width/height:</strong> obligatorios, reservan el espacio y
          eliminan CLS.
        </BlogLi>
        <BlogLi>
          <strong>sizes:</strong> le dice al navegador qué ancho usará, para
          elegir la variante correcta del <BlogInlineCode>srcset</BlogInlineCode>.
        </BlogLi>
        <BlogLi>
          <strong>priority:</strong> precarga la imagen (solo para la hero o
          LCP).
        </BlogLi>
        <BlogLi>
          <strong>loading="lazy":</strong> por defecto en{" "}
          <BlogInlineCode>next/image</BlogInlineCode>; las imágenes fuera del
          viewport no se descargan hasta acercarse.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="warn">
        No pongas <BlogInlineCode>priority</BlogInlineCode> en todas las
        imágenes: solo la que es el LCP. Precargar varias imágenes compite por
        el ancho de banda y ralentiza la carga de la principal.
      </BlogCallout>

      <BlogH2 id="caching">Caching y revalidación</BlogH2>

      <BlogP>
        La caché evita repetir trabajo. A nivel HTTP, las respuestas se
        cachean con <BlogInlineCode>Cache-Control</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`// Respuesta de una API pública
Cache-Control: public, max-age=3600, stale-while-revalidate=86400

// max-age: 1h fresca en caché
// stale-while-revalidate: 24h más sirviendo la copia vieja
// mientras se revalida en segundo plano`}</BlogCode>

      <BlogP>
        En Next.js, el ISR (Incremental Static Regeneration) combina estático
        con revalidación: la página se genera en build y se regenera en segundo
        plano cuando expira <BlogInlineCode>revalidate</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`// pages/blog/[slug].tsx
export async function getStaticProps({ params }) {
  const post = await fetchPost(params.slug);
  return {
    props: { post },
    revalidate: 3600, // regenera como máximo cada hora
  };
}

export async function getStaticPaths() {
  const posts = await fetchAllPosts();
  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: "blocking", // páginas nuevas se generan bajo demanda
  };
}`}</BlogCode>

      <BlogCallout type="info">
        <BlogInlineCode>stale-while-revalidate</BlogInlineCode> y el ISR
        comparten la misma filosofía: el usuario nunca espera por contenido
        fresco; recibe la copia en caché y la actualización llega después. Es
        la diferencia entre "rápido pero desactualizado" y "lento pero
        perfecto".
      </BlogCallout>

      <BlogH2 id="memoizacion">Memoización en React</BlogH2>

      <BlogP>
        La memoización evita trabajo repetido, pero no es gratis: cada{" "}
        <BlogInlineCode>useMemo</BlogInlineCode> o{" "}
        <BlogInlineCode>React.memo</BlogInlineCode> añade comparaciones. Úsala
        con criterio.
      </BlogP>

      <BlogH3 id="react-memo">React.memo</BlogH3>

      <BlogP>
        Evita que un componente se re-renderice si sus props no cambiaron. Útil
        para componentes pesados que reciben props estables:
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

      <BlogH3 id="usememo-usecallback">useMemo y useCallback</BlogH3>

      <BlogP>
        <BlogInlineCode>useMemo</BlogInlineCode> cachea un valor calculado;{" "}
        <BlogInlineCode>useCallback</BlogInlineCode> cachea una función. Ambos
        estabilizan referencias para que <BlogInlineCode>React.memo</BlogInlineCode>{" "}
        funcione:
      </BlogP>

      <BlogCode>{`import { useCallback, useMemo } from "react";

export function Parent() {
  // la lista se calcula una vez
  const items = useMemo(() => buildItems(), []);

  // la función mantiene la misma referencia entre renders
  const handleSelect = useCallback((id: number) => {
    setSelected(id);
  }, []);

  return <RowList items={items} onSelect={handleSelect} />;
}`}</BlogCode>

      <BlogCallout type="warn">
        No memoices todo. Si el componente es barato o sus props cambian en
        cada render, <BlogInlineCode>React.memo</BlogInlineCode> solo añade
        coste. La regla: memoiza cuando hay un componente pesado, una lista
        larga, o un valor caro de calcular — y mide antes y después. La
        memoización prematura es una deuda de complejidad.
      </BlogCallout>

      <BlogH2 id="eliminar-cls">Eliminar CLS</BlogH2>

      <BlogP>
        El CLS se elimina reservando espacio para todo lo que se carga después.
        Tres técnicas clave:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Dimensiones fijas:</strong> imágenes y vídeos con{" "}
          <BlogInlineCode>width</BlogInlineCode>/<BlogInlineCode>height</BlogInlineCode>{" "}
          o <BlogInlineCode>aspect-ratio</BlogInlineCode>.
        </BlogLi>
        <BlogLi>
          <strong>Fuentes:</strong> usa{" "}
          <BlogInlineCode>font-display: swap</BlogInlineCode> para que el texto
          se muestre con una fuente de respaldo mientras carga la real.
        </BlogLi>
        <BlogLi>
          <strong>Contenedores:</strong> reserva altura para contenido que
          llega tarde (ads, embeds, listas).
        </BlogLi>
      </BlogUl>

      <BlogCode>{`/* Reserva espacio con aspect-ratio en vez de dejar que empuje */
.media {
  aspect-ratio: 16 / 9;
  width: 100%;
}

/* Fuente que no desplaza el layout al cargar */
@font-face {
  font-family: "MiFuente";
  src: url("/fonts/mi-fuente.woff2") format("woff2");
  font-display: swap;
}`}</BlogCode>

      <BlogCallout type="tip">
        Un patrón común de CLS: un banner o anuncio que se inserta por encima
        del contenido. Reserva su espacio con un contenedor de altura fija o
        <BlogInlineCode>min-height</BlogInlineCode> desde el primer render.
      </BlogCallout>

      <BlogH2 id="bundle">Bundle analysis</BlogH2>

      <BlogP>
        Un bundle grande se traduce en más descarga y más parseo.{" "}
        <BlogInlineCode>@next/bundle-analyzer</BlogInlineCode> genera un mapa
        visual de qué pesa en tu bundle:
      </BlogP>

      <BlogCode>{`// next.config.mjs
import withBundleAnalyzer from "@next/bundle-analyzer"({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer({
  // tu config de Next
});`}</BlogCode>

      <BlogP>
        Con el análisis en mano, busca dependencias pesadas y pregúntate:
      </BlogP>

      <BlogUl>
        <BlogLi>
          ¿Puedo importar solo la parte que uso? (imports de árbol,{" "}
          <BlogInlineCode>import { useMemo } from "react"</BlogInlineCode>).
        </BlogLi>
        <BlogLi>
          ¿Puedo cargarla de forma diferida con{" "}
          <BlogInlineCode>dynamic</BlogInlineCode>?
        </BlogLi>
        <BlogLi>
          ¿Hay una alternativa más ligera? (una utilidad propia en vez de
          lodash completa).
        </BlogLi>
      </BlogUl>

      <BlogCallout type="tip">
        El análisis de bundle es un hábito, no un evento: correlo en CI y
        alerta cuando el tamaño sube por encima de un umbral. Así las
        dependencias pesadas se detectan en el PR, no en producción.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="ejercicios">Ejercicios</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Optimiza una imagen hero para que no cause CLS y se cargue con prioridad. Indica dimensiones, sizes y el atributo correcto."
          hint="next/image con width/height, sizes responsive y priority solo en la hero."
          level="Básico"
          num={1}
          solution={`import Image from "next/image";

export function Hero() {
  return (
    <Image
      src="/hero.jpg"
      alt="Imagen principal de la página"
      width={1600}
      height={900}
      sizes="100vw"
      priority
      className="w-full h-auto"
    />
  );
}`}
          title="Imagen hero sin CLS"
        />

        <ExerciseCard
          description="Carga un editor de texto pesado solo cuando se necesite, con un fallback de carga y sin renderizarlo en el servidor."
          hint="next/dynamic con ssr: false y un loading."
          level="Básico"
          num={2}
          solution={`import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
  loading: () => <p>Cargando editor…</p>,
});

export function PostForm() {
  return <RichTextEditor />;
}`}
          title="Code splitting con dynamic"
        />

        <ExerciseCard
          description="Aplica memoización a una lista de filas pesadas: memoiza el componente de fila y estabiliza las props con useMemo y useCallback."
          hint="React.memo en Row, useMemo para items y useCallback para onSelect."
          level="Intermedio"
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
    console.log("seleccionado", id);
  }, []);

  return (
    <ul>
      {items.map((item) => (
        <Row key={item.id} id={item.id} name={item.name} onSelect={handleSelect} />
      ))}
    </ul>
  );
}`}
          title="Lista memoizada"
        />

        <ExerciseCard
          description="Configura ISR en una página de artículos para que se regenere cada 30 minutos y soporte artículos nuevos bajo demanda."
          hint="getStaticProps con revalidate: 1800 y getStaticPaths con fallback: 'blocking'."
          level="Intermedio"
          num={4}
          solution={`// pages/articulos/[slug].tsx
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
          title="ISR con revalidación"
        />

        <ExerciseCard
          description="Reduce el CLS de una galería de imágenes que se cargan de forma diferida, reservando el espacio antes de que lleguen."
          hint="aspect-ratio en el contenedor y loading lazy en cada imagen."
          level="Avanzado"
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
          title="Galería sin CLS"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        El rendimiento no es una fase final: es una disciplina que se aplica
        mientras escribes. Medir con Lighthouse y datos de campo, optimizar
        imágenes y carga, cachear con criterio y memoizar solo donde aporta.
        Cada técnica de este tutorial ataca una métrica concreta — y juntas
        convierten una página "que funciona" en una que se siente instantánea.
      </BlogP>
    </article>
  );
}