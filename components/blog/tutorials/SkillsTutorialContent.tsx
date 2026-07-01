"use client";
import Link from "next/link";

import {
  BlogCallout,
  BlogCode,
  BlogH2,
  BlogH3,
  BlogLi,
  BlogOl,
  BlogP,
  BlogUl,
} from "@/components/blog/shared";
import { getContentByTag, typeSlug } from "@/lib/blog/registry";

export default function SkillsTutorialContent() {
  const skills = getContentByTag("skills");

  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 mb-8">
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-800/50">
          Tutorial
        </span>
        <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
          12 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-4"
        style={{ letterSpacing: "-0.03em" }}
      >
        Cómo usar Skills en OpenCode
      </h1>
      <p className="text-base md:text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed mb-8">
        Guía completa del sistema de Skills: qué son, cómo cargarlos, cómo
        crearlos y cómo sacarles el máximo partido en tus proyectos.
      </p>

      <div className="h-px bg-black/8 dark:bg-white/8 mb-8" />

      <BlogH2>¿Qué son los Skills?</BlogH2>
      <BlogP>
        Los <strong>Skills</strong> son instrucciones reutilizables que le dan a
        la IA conocimiento experto sobre una tarea concreta. Son como plugins de
        conocimiento: cargas un skill y la IA sabe inmediatamente cómo diseñar
        un banner, escribir un test, auditar seguridad o generar una
        presentación.
      </BlogP>
      <BlogP>
        Cada skill es un archivo <code>SKILL.md</code> con instrucciones
        detalladas, ejemplos, referencias y en algunos casos scripts auxiliares.
        Al activarlo, el contenido del skill se inyecta en el prompt del agente,
        dándole contexto especializado sin que tú tengas que explicar nada.
      </BlogP>

      <BlogH2>Arquitectura</BlogH2>
      <BlogP>Los skills siguen una estructura modular:</BlogP>
      <BlogUl>
        <BlogLi>
          <strong>SKILL.md</strong> — el archivo principal con instrucciones,
          ejemplos y referencias
        </BlogLi>
        <BlogLi>
          <strong>scripts/</strong> — opcional, contiene herramientas auxiliares
          (búsqueda BM25, validación)
        </BlogLi>
        <BlogLi>
          <strong>data/</strong> — opcional, datasets CSV con patrones de
          diseño, estrategias, etc.
        </BlogLi>
        <BlogLi>
          <strong>assets/</strong> — opcional, imágenes, templates, recursos
          estáticos
        </BlogLi>
      </BlogUl>

      <BlogH2>Cómo cargar un Skill</BlogH2>
      <BlogP>Hay dos formas de activar un skill:</BlogP>

      <BlogH3>1. Desde el chat (tool call)</BlogH3>
      <BlogP>
        Usa la herramienta <code>skill</code> directamente en la conversación.
        El agente cargará el skill y lo tendrá disponible para el resto de la
        sesión:
      </BlogP>
      <BlogCode>{`# El agente detecta automáticamente cuándo activar un skill
# Pero también puedes pedirlo explícitamente:

"Usa el skill de diseño para crear un banner"
"Carga el skill de Supabase para ayudarme con la migración"
"Activa el skill de Node.js backend patterns"`}</BlogCode>

      <BlogH3>2. Desde el sistema (AGENTS.md / CLAUDE.md)</BlogH3>
      <BlogP>
        Puedes referenciar skills en tu archivo de instrucciones del proyecto.
        Cuando la IA arranque, cargará los skills automáticamente:
      </BlogP>
      <BlogCode>{`# En AGENTS.md o CLAUDE.md:
Usa el skill de frontend-design para cualquier tarea de UI.
Usa el skill de supabase cuando trabajes con la base de datos.`}</BlogCode>

      <BlogP>
        Esta es la forma más potente: configúralo una vez y la IA sabrá qué
        skills usar según la tarea, sin que tengas que pedirlo cada vez.
      </BlogP>

      <BlogH2>Estructura de un SKILL.md</BlogH2>
      <BlogP>Cada skill tiene una estructura clara en secciones:</BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Metadatos</strong> — nombre, descripción corta, cuándo
          activarlo
        </BlogLi>
        <BlogLi>
          <strong>Instrucciones</strong> — guía paso a paso de cómo ejecutar la
          tarea
        </BlogLi>
        <BlogLi>
          <strong>Ejemplos</strong> — casos de uso reales con código
        </BlogLi>
        <BlogLi>
          <strong>Referencias</strong> — enlaces a documentación, recursos
          externos
        </BlogLi>
        <BlogLi>
          <strong>Scripts</strong> — herramientas auxiliares (búsqueda,
          validación, generación)
        </BlogLi>
      </BlogUl>

      <BlogH2>Crear tu propio Skill</BlogH2>
      <BlogP>
        Los skills se guardan en <code>.agents/skills/</code> o{" "}
        <code>.claude/skills/</code>. Para crear uno nuevo:
      </BlogP>
      <BlogOl>
        <BlogLi>
          Crea una carpeta con el nombre de tu skill:{" "}
          <code>.agents/skills/mi-skill/</code>
        </BlogLi>
        <BlogLi>
          Crea el archivo <code>SKILL.md</code> con las instrucciones
        </BlogLi>
        <BlogLi>
          (Opcional) Añade scripts o datasets en subcarpetas{" "}
          <code>scripts/</code> y <code>data/</code>
        </BlogLi>
        <BlogLi>
          El skill estará disponible al instante — solo menciónalo en el chat o
          en AGENTS.md
        </BlogLi>
      </BlogOl>

      <BlogH3>Ejemplo mínimo de SKILL.md</BlogH3>
      <BlogCode>{`# Mi Skill

## Descripción
Haz X cuando ocurra Y.

## Instrucciones
1. Paso uno
2. Paso dos
3. Paso tres

## Ejemplos
\`\`\`
Código de ejemplo
\`\`\`

## Referencias
- Documentación relevante
- Enlaces útiles`}</BlogCode>

      <BlogCallout type="tip">
        No necesitas registrar el skill en ningún lado. Con solo existir en la
        carpeta <code>.agents/skills/</code>, el sistema lo reconoce. Solo
        menciónalo por nombre y el agente lo cargará.
      </BlogCallout>

      <BlogH2>Dónde se guardan los Skills</BlogH2>
      <BlogP>
        Los skills pueden estar en tres ubicaciones, cada una con un propósito
        diferente:
      </BlogP>
      <BlogUl>
        <BlogLi>
          <strong>
            <code>~/.agents/skills/</code>
          </strong>{" "}
          — skills globales del usuario, disponibles en todos los proyectos
        </BlogLi>
        <BlogLi>
          <strong>
            <code>~/.claude/skills/</code>
          </strong>{" "}
          — skills globales de Claude, compatibles con Claude Code
        </BlogLi>
        <BlogLi>
          <strong>
            <code>.claude/skills/</code> y <code>.opencode/skills/</code>
          </strong>{" "}
          — skills del proyecto, solo disponibles en ese repositorio
        </BlogLi>
      </BlogUl>
      <BlogP>
        Esta jerarquía permite tener skills generales (como diseño o Supabase)
        siempre disponibles, y skills específicos del proyecto (como "cómo
        desplegar esta app" o "convenciones de este equipo") solo en el repo
        correspondiente.
      </BlogP>

      <BlogH2>Reutilización entre skills</BlogH2>
      <BlogP>
        Si tienes skills solapados (ej: <strong>design</strong> y{" "}
        <strong>banner-design</strong> comparten sistema de tokens), puedes
        referenciar uno desde otro en el SKILL.md:
      </BlogP>
      <BlogCode>{`## Dependencias
Este skill complementa a \`design\`.
Carga \`ui-styling\` si necesitas código frontend.`}</BlogCode>
      <BlogP>
        La IA entenderá que debe cargar múltiples skills si la tarea lo
        requiere.
      </BlogP>

      <BlogCallout type="done">
        Los skills son la forma más eficiente de compartir conocimiento
        especializado con la IA. En lugar de explicar contexto cada vez,
        encapsulas expertise reutilizable en archivos que la IA carga bajo
        demanda.
      </BlogCallout>

      {skills.length > 0 && (
        <section className="mt-12 rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] overflow-hidden">
          <div className="px-5 py-3 border-b border-black/8 dark:border-white/8">
            <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              Skills disponibles ({skills.length})
            </p>
          </div>
          <ul className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
            {skills.map((s) => (
              <li key={s.slug}>
                <Link
                  className="flex items-center gap-3 px-5 py-3 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors no-underline group"
                  href={`/blog/${typeSlug(s.type)}/${s.slug}`}
                >
                  <span
                    aria-hidden="true"
                    className={`w-1.5 h-1.5 rounded-full ${s.categoryColor} flex-shrink-0`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#1d1d1f] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                      {s.title}
                    </p>
                    <p className="text-xs text-[#6e6e73] dark:text-[#86868b] line-clamp-1">
                      {s.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-5 py-2 border-t border-black/8 dark:border-white/8">
            <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">
              Los artículos etiquetados como{" "}
              <strong className="text-[#1d1d1f] dark:text-white">skills</strong>{" "}
              aparecen automáticamente aquí.
            </p>
          </div>
        </section>
      )}
    </article>
  );
}
