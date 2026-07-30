"use client";
import { useState } from "react";
import {
  BlogH2,
  BlogP,
  BlogCode,
  BlogInlineCode,
  BlogUl,
  BlogLi,
  BlogCallout,
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
    Básico: "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400",
    Intermedio: "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
    Avanzado: "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400",
  }[level];

  return (
    <div className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden">
      <button
        className="w-full px-4 py-3 flex items-center justify-between gap-3 hover:bg-black/3 dark:hover:bg-white/3 transition-colors text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">{num}</span>
          <span className="text-sm font-medium text-[#1d1d1f] dark:text-white">{title}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColor}`}>{level}</span>
          <span className="text-[#aeaeb2] text-xs">{open ? "▲" : "▼"}</span>
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-black/8 dark:border-white/8 pt-3 space-y-3">
          <p className="text-sm text-[#3a3a3c] dark:text-[#aeaeb2]">{description}</p>
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

export default function SupabaseGuideContent() {
  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 text-xs text-[#aeaeb2] dark:text-[#636366] mb-4">
        <span className="flex items-center gap-1">
          <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          </svg>
          Tutorial
        </span>
        <span className="w-1 h-1 rounded-full bg-[#aeaeb2]" />
        <span className="flex items-center gap-1">
          <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          </svg>
          10 min
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3" style={{ letterSpacing: "-0.03em" }}>
        Supabase: backend como servicio con PostgreSQL
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Supabase es la alternativa open-source a Firebase. Combina PostgreSQL, Auth, Realtime, Storage y Edge Functions en una plataforma unificada. Un backend completo sin escribir servidores.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="que-es">¿Qué es Supabase?</BlogH2>

      <BlogP>
        Lanzada en 2020, Supabase te da un backend completo basado en PostgreSQL. Cada proyecto es una instancia PostgreSQL dedicada con API REST y GraphQL automáticas, autenticación, suscripciones en tiempo real, almacenamiento de archivos y funciones serverless.
      </BlogP>

      <BlogCallout type="info">
        A diferencia de Firebase (que usa NoSQL), Supabase usa PostgreSQL con Row Level Security. Esto significa que tienes todas las ventajas de SQL — JOINs, transacciones, migraciones — combinadas con la seguridad a nivel de fila.
      </BlogCallout>

      <BlogH2 id="crear-proyecto">Crear un proyecto</BlogH2>

      <BlogP>
        1. Ve a <BlogInlineCode>supabase.com</BlogInlineCode> y haz login con GitHub.
      </BlogP>
      <BlogP>
        2. "New project" → nombre, contraseña segura (guárdala), región (ej: <BlogInlineCode>eu-west-1</BlogInlineCode> para Europa).
      </BlogP>
      <BlogP>
        3. Obtienes dos claves: <BlogInlineCode>SUPABASE_URL</BlogInlineCode> (https://tu-proyecto.supabase.co) y <BlogInlineCode>SUPABASE_ANON_KEY</BlogInlineCode> (clave pública de API).
      </BlogP>

      <BlogH2 id="database">Database: Table Editor y SQL Editor</BlogH2>

      <BlogP>
        Puedes crear tablas visualmente con el Table Editor o directamente con SQL:
      </BlogP>

      <BlogCode>{`-- SQL Editor dentro del dashboard de Supabase
CREATE TABLE tareas (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  titulo TEXT NOT NULL,
  completada BOOLEAN DEFAULT false,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  creado_en TIMESTAMPTZ DEFAULT NOW()
);

-- Activar Row Level Security
ALTER TABLE tareas ENABLE ROW LEVEL SECURITY;

-- Política: cada usuario ve solo sus propias tareas
CREATE POLICY "Usuarios ven solo sus tareas"
  ON tareas FOR SELECT
  USING (auth.uid() = user_id);

-- Política: cada usuario crea sus propias tareas
CREATE POLICY "Usuarios crean sus tareas"
  ON tareas FOR INSERT
  WITH CHECK (auth.uid() = user_id);`}</BlogCode>

      <BlogCallout type="warn">
        Sin RLS policies, cualquier usuario con la anon key puede leer y escribir toda la tabla. Las RLS son obligatorias para datos sensibles.
      </BlogCallout>

      <BlogH2 id="auth">Auth</BlogH2>

      <BlogP>
        Supabase Auth maneja registro, login, magic links, OAuth (Google, GitHub, Apple, etc.) y sesiones con JWT. Desde el cliente:
      </BlogP>

      <BlogCode>{`import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Registro
const { data, error } = await supabase.auth.signUp({
  email: 'ana@email.com',
  password: 'mi-contraseña-segura'
})

// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'ana@email.com',
  password: 'mi-contraseña-segura'
})

// Obtener sesión actual
const { data: { session } } = await supabase.auth.getSession()
console.log(session.user.id) // El user_id que usan las RLS`}</BlogCode>

      <BlogP>
        Las RLS policies usan <BlogInlineCode>auth.uid()</BlogInlineCode> automáticamente para identificar al usuario autenticado. No necesitas pasar el ID manualmente.
      </BlogP>

      <BlogH2 id="realtime">Realtime</BlogH2>

      <BlogP>
        Suscríbete a cambios en cualquier tabla de PostgreSQL vía WebSockets. Cuando alguien inserta, actualiza o elimina una fila, todos los clientes conectados reciben el cambio al instante:
      </BlogP>

      <BlogCode>{`const channel = supabase
  .channel('tareas_realtime')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'tareas' },
    (payload) => {
      console.log('Cambio recibido:', payload)
      // payload.new → dato nuevo
      // payload.old → dato anterior
      // payload.eventType → INSERT / UPDATE / DELETE
    }
  )
  .subscribe()`}</BlogCode>

      <BlogP>
        Para usar Realtime, actívalo desde la UI de Supabase: Database → Replication → selecciona la tabla.
      </BlogP>

      <BlogH2 id="storage">Storage</BlogH2>

      <BlogP>
        Sube archivos a buckets con políticas de acceso también vía RLS:
      </BlogP>

      <BlogCode>{`// Subir archivo
const { data, error } = await supabase.storage
  .from('avatars')
  .upload('public/ana.jpg', file)

// Descargar URL pública
const { data } = supabase.storage
  .from('avatars')
  .getPublicUrl('public/ana.jpg')`}</BlogCode>

      <BlogP>
        Las policies de Storage se definen con SQL similares a las de tablas:
      </BlogP>

      <BlogCode>{`CREATE POLICY "Cada usuario sube sus propios archivos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.uid() = owner);`}</BlogCode>

      <BlogH2 id="edge-functions">Edge Functions</BlogH2>

      <BlogP>
        Funciones serverless escritas en Deno / TypeScript. Se despliegan con la CLI de Supabase:
      </BlogP>

      <BlogCode>{`# Instalar CLI
brew install supabase/tap/supabase

# Crear función
supabase functions new mi-webhook

# Desplegar
supabase functions deploy mi-webhook`}</BlogCode>

      <BlogP>
        Ideales para webhooks, procesamiento de imágenes, integraciones con APIs externas, y lógica que no quieres en el cliente.
      </BlogP>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="ejercicios">Ejercicios</BlogH2>

      <div className="space-y-3">
        <ExerciseCard num={1} title="Crear tabla con SQL Editor" level="Básico" description="Crea una tabla 'notas' con id (auto-increment), titulo, contenido, user_id (UUID) y created_at. Activa RLS." hint="Usa GENERATED ALWAYS AS IDENTITY y REFERENCES auth.users(id)." solution={`CREATE TABLE notas (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  titulo TEXT NOT NULL,
  contenido TEXT,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  creado_en TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE notas ENABLE ROW LEVEL SECURITY;`} />

        <ExerciseCard num={2} title="RLS policy SELECT" level="Básico" description="Crea una política RLS para que cada usuario solo pueda SELECT sus propias notas." hint="Usa auth.uid() en la condición USING." solution={`CREATE POLICY "Usuarios ven sus notas"
  ON notas FOR SELECT
  USING (auth.uid() = user_id);`} />

        <ExerciseCard num={3} title="Auth: sign up + sign in" level="Intermedio" description="Escribe el código cliente para registrar un nuevo usuario con email y contraseña, y luego iniciar sesión." hint="Usa supabase.auth.signUp y signInWithPassword." solution={`const { data, error } = await supabase.auth.signUp({
  email: 'test@email.com',
  password: 'password123'
});

const { data: loginData } = await supabase.auth.signInWithPassword({
  email: 'test@email.com',
  password: 'password123'
});`} />

        <ExerciseCard num={4} title="Realtime: suscripción a cambios" level="Intermedio" description="Suscríbete a cambios en la tabla 'notas' y muestra en consola cada inserción nueva." hint="Usa channel + on('postgres_changes', { event: 'INSERT' })." solution={`const channel = supabase
  .channel('notas_realtime')
  .on('postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'notas' },
    (payload) => console.log('Nueva nota:', payload.new)
  )
  .subscribe();`} />

        <ExerciseCard num={5} title="Edge Function básica" level="Avanzado" description="Crea una Edge Function que reciba un userId por parámetro y devuelva el conteo de notas de ese usuario." hint="Usa Deno + supabase-js dentro de la función. Conéctate con service_role key." solution={`import { createClient } from "jsr:@supabase/supabase-js@2"

Deno.serve(async (req) => {
  const { userId } = await req.json()
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  )
  const { count } = await supabase
    .from("notas")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
  return new Response(JSON.stringify({ count }), { headers: { "Content-Type": "application/json" } })
})`} />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        Supabase es ideal para proyectos que necesitan un backend completo sin gestionar servidores. La combinación de PostgreSQL + RLS + Realtime lo hace especialmente potente para aplicaciones en tiempo real como chats, dashboards y herramientas colaborativas.
      </BlogP>
    </article>
  );
}