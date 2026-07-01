"use client";
import {
  BlogCode,
  BlogInlineCode,
  BlogH2,
  BlogH3,
  BlogP,
  BlogCallout,
  BlogUl,
  BlogLi,
} from "@/components/blog/shared";

function Kbd({ children }: { children: string }) {
  return (
    <kbd className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-black/8 dark:bg-white/10 border border-black/10 dark:border-white/10 text-[10px] font-mono text-[#1d1d1f] dark:text-[#e6edf3]">
      {children}
    </kbd>
  );
}

function Divider() {
  return (
    <div className="h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent my-8" />
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 my-5">
      <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
        {number}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-1.5">
          {title}
        </p>
        <div className="text-sm text-[#3a3a3c] dark:text-[#aeaeb2] leading-relaxed [&>pre]:my-3">
          {children}
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border border-black/8 dark:border-white/8 p-4 bg-white dark:bg-[#111116] hover:border-emerald-400/30 dark:hover:border-emerald-600/30 transition-colors">
      <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3">
        {icon}
      </div>
      <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-1">
        {title}
      </p>
      <p className="text-xs text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

function CmdGrid({ rows }: { rows: { cmd: string; desc: string }[] }) {
  return (
    <div className="not-prose my-4 rounded-xl border border-black/8 dark:border-white/8 overflow-hidden">
      {rows.map((r, i) => (
        <div
          key={i}
          className={`flex items-start gap-3 px-4 py-2.5 ${i < rows.length - 1 ? "border-b border-black/5 dark:border-white/5" : ""} hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors`}
        >
          <code className="text-xs font-mono text-emerald-600 dark:text-emerald-400 shrink-0 min-w-[140px] leading-relaxed">
            {r.cmd}
          </code>
          <span className="text-xs text-[#3a3a3c] dark:text-[#aeaeb2] leading-relaxed">
            {r.desc}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Sections ──────────────────────────────────────────────────────────────────

function SectionQueEs() {
  return (
    <>
      <BlogH2>Qué es OpenCode</BlogH2>

      <BlogP>
        <strong>OpenCode</strong> es un asistente de inteligencia artificial que
        trabaja directamente desde tu terminal. A diferencia de las típicas
        interfaces web, OpenCode se ejecuta en tu línea de comandos, entiende tu
        proyecto y puede leer, escribir y modificar archivos de forma autónoma.
      </BlogP>

      <BlogP>
        Está construido sobre modelos de lenguaje avanzados y está diseñado
        específicamente para <strong>tareas de ingeniería de software</strong>:
        desde escribir código hasta refactorizar proyectos enteros, pasando por
        depuración, testing, documentación y despliegue.
      </BlogP>

      <BlogP>
        Por defecto, OpenCode te proporciona{" "}
        <strong>modales interactivos</strong> en la terminal para aprobar
        cambios, revisar diffs, seleccionar archivos y confirmar acciones antes
        de ejecutarlas. No es un chat ciego: cada modificación pasa por tu
        aprobación.
      </BlogP>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
        <FeatureCard
          desc="OpenCode ve todo tu proyecto: estructura, dependencias, historial Git y contenido de archivos."
          icon={
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          }
          title="Contexto completo"
        />
        <FeatureCard
          desc="Puede modificar archivos, ejecutar comandos, crear tests, migrar código y desplegar."
          icon={
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          }
          title="Automatización real"
        />
        <FeatureCard
          desc="Sin GUIs, sin páginas web. Trabaja donde ya trabajas: la línea de comandos."
          icon={
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          }
          title="En tu terminal"
        />
      </div>

      <BlogCallout type="info">
        OpenCode es <strong>open source</strong> — puedes inspeccionar su
        código, contribuir y adaptarlo a tus necesidades. Se publica bajo
        licencia Apache 2.0.
      </BlogCallout>
    </>
  );
}

function SectionParaQueSirve() {
  return (
    <>
      <BlogH2>Para qué sirve</BlogH2>

      <BlogP>
        OpenCode está diseñado para{" "}
        <strong>acelerar tu flujo de trabajo como desarrollador</strong>. No es
        un chat genérico: es un ingeniero de software artificial que trabaja
        dentro de tu proyecto.
      </BlogP>

      <div className="space-y-3 my-6">
        {[
          {
            icon: (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            ),
            title: "Escribir y refactorizar código",
            desc: "Pídele que implemente una función, refactorice un módulo completo o migre tu código de JavaScript a TypeScript. OpenCode entiende la estructura de tu proyecto y hace cambios precisos.",
          },
          {
            icon: (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            ),
            title: "Depurar errores",
            desc: "Pega un stack trace y OpenCode analiza tu código, encuentra la causa raíz y propone una solución — a veces incluso la aplica directamente.",
          },
          {
            icon: (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            ),
            title: "Escribir tests",
            desc: "Genera tests unitarios, de integración y end-to-end para tu código existente. Incluye mocks, fixtures y assertions.",
          },
          {
            icon: (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            ),
            title: "Automatizar tareas repetitivas",
            desc: "Renombrar variables en todo el proyecto, actualizar imports, migrar una API deprecada, formatear archivos en lote — cualquier tarea que sigue un patrón.",
          },
          {
            icon: (
              <svg
                className="w-4 h-4"
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
            ),
            title: "Documentar tu proyecto",
            desc: "Genera README, documentación de API, guías de contribución, changelogs y JS Docs. OpenCode lee tu código y escribe la documentación por ti.",
          },
          {
            icon: (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            ),
            title: "Analizar y revisar código",
            desc: "Pídele que revise tu PR, encuentre vulnerabilidades de seguridad, detecte code smells o sugiera mejoras de rendimiento.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex gap-3 rounded-xl border border-black/8 dark:border-white/8 p-4 hover:border-emerald-400/20 dark:hover:border-emerald-600/20 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-0.5">
                {item.title}
              </p>
              <p className="text-xs text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <BlogCallout type="tip">
        Piensa en OpenCode como un <strong>compañero de programación</strong>{" "}
        que siempre está listo para ayudar, nunca se cansa y trabaja al ritmo
        que le pidas. No reemplaza tu criterio — lo amplifica.
      </BlogCallout>
    </>
  );
}

function SectionInstalacion() {
  return (
    <>
      <BlogH2>Instalación</BlogH2>

      <BlogP>
        Instalar OpenCode es rápido y solo requiere Node.js 18+ en tu sistema.
        Elige el método que prefieras:
      </BlogP>

      <BlogH3>Requisitos previos</BlogH3>
      <BlogP>Asegúrate de tener Node.js instalado. Si no lo tienes:</BlogP>
      <BlogCode>{`# Verificar si ya tienes Node.js
node --version    # Debe mostrar v18.0.0 o superior

# Si no lo tienes, instálalo desde:
# https://nodejs.org/  (recomendado: LTS)

# O con nvm (gestor de versiones):
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
nvm install --lts`}</BlogCode>

      <BlogH3>Opción 1: Instalación global con npm (recomendada)</BlogH3>
      <BlogP>
        La forma más sencilla y la que te recomendamos para empezar:
      </BlogP>
      <BlogCode>{`npm install -g @opencode/cli`}</BlogCode>
      <BlogP>
        Esto instala OpenCode globalmente y añade el comando{" "}
        <BlogInlineCode>opencode</BlogInlineCode> a tu PATH. Una vez instalado,
        verifica que funciona:
      </BlogP>
      <BlogCode>{`opencode --version`}</BlogCode>

      <BlogH3>Opción 2: Usar npx (sin instalación)</BlogH3>
      <BlogP>
        Si prefieres no instalarlo globalmente, puedes ejecutarlo directamente
        con npx. La primera vez tardará unos segundos en descargarse:
      </BlogP>
      <BlogCode>{`npx @opencode/cli`}</BlogCode>

      <BlogH3>Opción 3: Clonar desde GitHub</BlogH3>
      <BlogP>
        Si quieres explorar el código fuente o contribuir al proyecto:
      </BlogP>
      <BlogCode>{`git clone https://github.com/anomalyco/opencode.git
cd opencode
npm install
npm run build
npm link`}</BlogCode>

      <BlogH3>Configuración inicial</BlogH3>
      <BlogP>
        La primera vez que ejecutes OpenCode, te guiará por una configuración
        asistida vía modales en la propia terminal. Te pedirá tu clave de API
        del proveedor que elijas:
      </BlogP>
      <BlogCode>{`# La configuración se hace mediante modales interactivos
# Abre opencode y sigue los pasos que aparecerán en pantalla:

opencode

# Te preguntará por:
# 1. Proveedor de modelo (por defecto el que trae integrado)
# 2. Tu API key (si aplica)
# 3. Preferencias de la sesión

# También puedes configurar variables de entorno si lo prefieres:
export OPENCODE_API_KEY="tu-api-key-aqui"`}</BlogCode>

      <BlogCallout type="warn">
        <strong>Nunca compartas tu API key.</strong> No la subas a Git, no la
        incluyas en código fuente y no la publiques en repositorios públicos.
      </BlogCallout>

      <BlogCallout type="info">
        <strong>Próximamente:</strong> OpenCode soportará{" "}
        <strong>Ollama</strong> y modelos locales, lo que te permitirá
        ejecutarlo completamente offline sin depender de APIs externas.
      </BlogCallout>
    </>
  );
}

function SectionPrimerUso() {
  return (
    <>
      <BlogH2>Primer uso</BlogH2>

      <BlogP>
        Una vez instalado y configurado, iniciar OpenCode es tan sencillo como
        ejecutar un comando desde la raíz de tu proyecto.
      </BlogP>

      <BlogH3>Iniciar OpenCode</BlogH3>
      <BlogCode>{`# Dentro de la carpeta de tu proyecto
cd mi-proyecto

# Iniciar sesión interactiva
opencode`}</BlogCode>

      <BlogP>
        Al ejecutar <BlogInlineCode>opencode</BlogInlineCode> sin argumentos, se
        abre una <strong>sesión interactiva</strong> en tu terminal con modales
        para guiarte. Verás algo como:
      </BlogP>

      <BlogCode>{`✦ OpenCode
  Contexto: carpeta actual con ~1,200 archivos
  Modelo: deepseek-v4-flash-free (configurable)

  > _`}</BlogCode>

      <BlogP>
        El cursor <BlogInlineCode>&gt; _</BlogInlineCode> indica que OpenCode
        está listo para recibir instrucciones. Puedes empezar a escribir lo que
        necesites.
      </BlogP>

      <BlogH3>Tu primer flujo de trabajo</BlogH3>
      <BlogP>
        Aquí tienes un ejemplo de principio a fin. Abre tu terminal y prueba
        este flujo:
      </BlogP>

      <Step number={1} title="Crea un proyecto de prueba">
        <BlogCode>{`mkdir mi-primer-proyecto
cd mi-primer-proyecto
echo '{"name":"mi-primer-proyecto","type":"module"}' > package.json`}</BlogCode>
      </Step>

      <Step number={2} title="Inicia OpenCode">
        <BlogCode>{`opencode`}</BlogCode>
      </Step>

      <Step number={3} title="Pídele algo concreto">
        <BlogP>Escribe en el prompt:</BlogP>
        <BlogCode>{`> Crea un archivo index.js que sea un servidor HTTP básico.
  Debe responder con "Hola desde OpenCode" en la ruta /
  y escuchar en el puerto 3000.`}</BlogCode>
        <BlogP>
          OpenCode analizará tu petición, creará el archivo y te mostrará el
          resultado.
        </BlogP>
      </Step>

      <Step number={4} title="Pídele más cambios">
        <BlogP>Sin salir de la sesión, puedes pedir más:</BlogP>
        <BlogCode>{`> Añade una ruta /api/health que devuelva JSON con
  { status: "ok", timestamp: Date.now() }`}</BlogCode>
        <BlogP>
          OpenCode modificará el archivo existente para añadir la nueva ruta.
        </BlogP>
      </Step>

      <Step number={5} title="Sal de la sesión">
        <BlogCode>{`> /exit`}</BlogCode>
        <BlogP>
          Usa <BlogInlineCode>/exit</BlogInlineCode> o{" "}
          <BlogInlineCode>/salir</BlogInlineCode> para cerrar la sesión.
          OpenCode te preguntará si quieres guardar el contexto para retomarlo
          después.
        </BlogP>
      </Step>

      <BlogCallout type="done">
        ¡Ya has completado tu primer flujo completo con OpenCode! En menos de 2
        minutos has creado un servidor HTTP y lo has modificado sin escribir una
        sola línea de código manualmente.
      </BlogCallout>

      <BlogH3>Flujo rápido (una línea)</BlogH3>
      <BlogP>
        Si solo necesitas una respuesta puntual sin abrir una sesión
        interactiva, usa el flag <BlogInlineCode>-p</BlogInlineCode>:
      </BlogP>
      <BlogCode>{`opencode -p "Explica qué hace este proyecto basándote en su estructura de carpetas"`}</BlogCode>
      <BlogP>
        Esto ejecuta OpenCode, procesa tu petición y devuelve el resultado
        directamente en la terminal, sin entrar en modo interactivo.
      </BlogP>

      <Divider />

      <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/40 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 p-5 my-6">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-200 dark:bg-emerald-800/50 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shrink-0">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M17 8l4 4m0 0l-4 4m4-4H3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-1">
              Flujo recomendado para el día a día
            </p>
            <p className="text-xs text-emerald-700 dark:text-emerald-400/80 leading-relaxed">
              Abre OpenCode al empezar tu jornada laboral. Déjalo corriendo en
              una terminal mientras trabajas en otra. Así tienes acceso
              inmediato a tu asistente sin perder tiempo arrancándolo cada vez.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function SectionComandos() {
  return (
    <>
      <BlogH2>Comandos principales</BlogH2>

      <BlogP>
        OpenCode ofrece varios comandos y flags para adaptarse a diferentes
        formas de trabajar. Estos son los esenciales:
      </BlogP>

      <BlogH3>Modos de ejecución</BlogH3>
      <CmdGrid
        rows={[
          {
            cmd: "opencode",
            desc: "Inicia una sesión interactiva. El modo más usado para trabajo continuo.",
          },
          {
            cmd: 'opencode -p "..."',
            desc: "Ejecuta una instrucción puntual y termina. Ideal para preguntas rápidas.",
          },
          {
            cmd: "opencode --model <nombre>",
            desc: "Especifica el modelo a usar (útil para elegir entre rapidez y capacidad).",
          },
          {
            cmd: "opencode --print",
            desc: "Imprime el resultado en stdout sin formato interactivo (útil para pipelines).",
          },
          {
            cmd: "opencode --verbose",
            desc: "Muestra el razonamiento interno del modelo para entender cómo llegó a la solución.",
          },
        ]}
      />

      <BlogH3>Comandos dentro de la sesión interactiva</BlogH3>
      <BlogP>
        Una vez dentro de una sesión con{" "}
        <BlogInlineCode>opencode</BlogInlineCode>, puedes usar estos comandos
        internos:
      </BlogP>
      <CmdGrid
        rows={[
          {
            cmd: "/help",
            desc: "Muestra la ayuda completa con todos los comandos disponibles.",
          },
          {
            cmd: "/exit o /salir",
            desc: "Cierra la sesión actual. OpenCode preguntará si quieres guardar el contexto.",
          },
          {
            cmd: "/clear",
            desc: "Limpia el historial de la conversación actual pero mantiene el contexto.",
          },
          {
            cmd: "/diff",
            desc: "Muestra un resumen de los cambios realizados en la sesión.",
          },
          {
            cmd: "/reset",
            desc: "Reinicia la sesión por completo, perdiendo el contexto acumulado.",
          },
          {
            cmd: "/status",
            desc: "Muestra información de la sesión: modelo, tokens usados, archivos modificados.",
          },
          {
            cmd: "/cost",
            desc: "Estima el coste acumulado en API de la sesión actual.",
          },
        ]}
      />

      <BlogH3>Ejemplos de uso frecuente</BlogH3>

      <BlogCode>{`# 1. Pedir una explicación del proyecto
opencode -p "Explica la arquitectura de este proyecto en 3 párrafos"

# 2. Generar tests
opencode -p "Genera tests unitarios con Jest para src/services/auth.ts"

# 3. Refactorizar un archivo
opencode -p "Refactoriza utils/helpers.js para usar funciones puras
  y dividirlo en módulos más pequeños"

# 4. Depurar un error
opencode -p "Ejecuta npm test, captura el error y proponme una solución"

# 5. Revisar seguridad
opencode -p "Analiza este proyecto en busca de vulnerabilidades
  de seguridad comunes (inyección SQL, XSS, secrets expuestos)"

# 6. Migrar a TypeScript
opencode -p "Migra src/utils/ de JavaScript a TypeScript
  añadiendo tipos e interfaces donde corresponda"`}</BlogCode>

      <BlogCallout type="tip">
        <strong>Sé específico en tus instrucciones.</strong> Cuanto más contexto
        y detalle le des a OpenCode, mejores serán los resultados. Incluye el
        stack tecnológico, la estructura de archivos relevante y el resultado
        esperado.
      </BlogCallout>
    </>
  );
}

function SectionConsejos() {
  return (
    <>
      <BlogH2>Consejos y buenas prácticas</BlogH2>

      <BlogP>
        Para sacar el máximo partido a OpenCode, aquí tienes una serie de
        consejos basados en la experiencia de uso diario:
      </BlogP>

      <BlogH3>Cómo escribir buenos prompts</BlogH3>
      <div className="space-y-3 my-4">
        {[
          {
            bad: "Haz un servidor",
            good: "Crea un servidor Express con TypeScript que tenga rutas para CRUD de usuarios con autenticación JWT y persistencia en PostgreSQL usando Prisma",
          },
          {
            bad: "Arregla este código",
            good: "El siguiente código falla con 'Cannot read properties of undefined'. El error ocurre en src/users.ts línea 45. Necesito que valides si el usuario existe antes de acceder a sus propiedades. Aquí está el código:",
          },
          {
            bad: "Dime qué hace este proyecto",
            good: "Analiza la estructura de carpetas y el package.json de este proyecto. Describe su propósito, stack tecnológico y las dependencias principales",
          },
        ].map(({ bad, good }) => (
          <div
            key={bad}
            className="rounded-xl border border-black/8 dark:border-white/8 overflow-hidden"
          >
            <div className="px-4 py-2.5 bg-red-50/50 dark:bg-red-950/10 border-b border-red-200/50 dark:border-red-900/30">
              <div className="flex items-center gap-2 mb-1">
                <svg
                  className="w-3 h-3 text-red-500 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                <span className="text-[10px] font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
                  Evita
                </span>
              </div>
              <code className="text-xs text-[#3a3a3c] dark:text-[#aeaeb2] italic">
                {bad}
              </code>
            </div>
            <div className="px-4 py-2.5 bg-emerald-50/50 dark:bg-emerald-950/10">
              <div className="flex items-center gap-2 mb-1">
                <svg
                  className="w-3 h-3 text-emerald-500 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Recomendado
                </span>
              </div>
              <code className="text-xs text-[#1d1d1f] dark:text-[#e6edf3]">
                {good}
              </code>
            </div>
          </div>
        ))}
      </div>

      <BlogH3>Buenas prácticas generales</BlogH3>
      <BlogUl>
        <BlogLi>
          <strong>Sé específico:</strong> Incluye nombres de archivos,
          frameworks, versiones y el resultado esperado.
        </BlogLi>
        <BlogLi>
          <strong>Divide tareas grandes:</strong> En lugar de pedir "crea un
          e-commerce", hazlo por partes: "crea el modelo de productos", luego
          "crea las rutas CRUD", etc.
        </BlogLi>
        <BlogLi>
          <strong>Proporciona contexto:</strong> Si hay un error, pega el stack
          trace. Si quieres una refactorización, explica por qué.
        </BlogLi>
        <BlogLi>
          <strong>Usa el modo interactivo para tareas largas:</strong> Para
          cambios que requieren múltiples iteraciones, abre una sesión con{" "}
          <BlogInlineCode>opencode</BlogInlineCode> sin flags.
        </BlogLi>
        <BlogLi>
          <strong>
            Usa <BlogInlineCode>-p</BlogInlineCode> para tareas puntuales:
          </strong>{" "}
          Para preguntas rápidas, explicaciones o cambios pequeños, el flag{" "}
          <BlogInlineCode>-p</BlogInlineCode> es más eficiente.
        </BlogLi>
        <BlogLi>
          <strong>Revisa siempre los cambios:</strong> OpenCode es poderoso,
          pero tú eres el responsable del código. Revisa los cambios antes de
          hacer commit.
        </BlogLi>
        <BlogLi>
          <strong>Aprovecha el control de versiones:</strong> Trabaja en una
          rama separada cuando uses OpenCode para cambios grandes. Así puedes
          revisar el diff completo antes de mergear.
        </BlogLi>
      </BlogUl>

      <BlogH3>Lo que OpenCode NO debe hacer</BlogH3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {[
          {
            rule: "Ejecutar scripts sin supervisión",
            why: "Siempre revisa qué comando va a ejecutar antes de aprobarlo.",
          },
          {
            rule: "Acceder a producción sin confirmación",
            why: "Configura alerts y permisos para que no modifique datos reales.",
          },
          {
            rule: "Subir secrets a repositorios",
            why: "OpenCode puede leer .env, pero no debe subirlos. Revisa siempre el diff.",
          },
          {
            rule: "Tomar decisiones arquitectónicas sin tu aprobación",
            why: "Las decisiones de diseño son tuyas. OpenCode propone, tú decides.",
          },
        ].map(({ rule, why }) => (
          <div
            key={rule}
            className="rounded-xl border border-amber-200 dark:border-amber-800/40 bg-amber-50/50 dark:bg-amber-950/10 p-4"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <svg
                className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">
                {rule}
              </span>
            </div>
            <p className="text-xs text-amber-600/80 dark:text-amber-400/70 leading-relaxed">
              {why}
            </p>
          </div>
        ))}
      </div>

      <BlogH3>Integración en tu flujo de trabajo</BlogH3>
      <BlogP>
        Aquí tienes un ejemplo de cómo integrar OpenCode en tu día a día como
        desarrollador:
      </BlogP>

      <div className="space-y-2 my-4">
        {[
          {
            time: "08:30",
            action: "Abres OpenCode en la terminal mientras revisas emails",
          },
          {
            time: "08:35",
            action:
              "Pides: Dame un resumen de los cambios que hay en esta rama desde main",
          },
          {
            time: "08:40",
            action: "Revisas el resumen y empiezas a programar",
          },
          {
            time: "09:00",
            action:
              "Te atascas con un bug. Pegas el error: Depura este stack trace",
          },
          {
            time: "09:05",
            action: "OpenCode encuentra la causa. Aplicas la solución",
          },
          {
            time: "11:00",
            action:
              "Necesitas tests: Genera tests para el nuevo módulo de pagos",
          },
          {
            time: "11:45",
            action: "Pides un PR review: Revisa mis cambios y sugiere mejoras",
          },
          {
            time: "12:00",
            action:
              "Sales con /exit. OpenCode guarda el contexto automáticamente",
          },
        ].map(({ time, action }) => (
          <div
            key={time}
            className="flex items-start gap-3 px-4 py-2 rounded-lg hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
          >
            <span className="text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 shrink-0 w-10 leading-5">
              {time}
            </span>
            <span className="text-xs text-[#3a3a3c] dark:text-[#aeaeb2] leading-5">
              {action}
            </span>
          </div>
        ))}
      </div>

      <Divider />

      <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 p-5 my-6 text-white text-center">
        <p className="text-base font-bold mb-1">
          Ya estás listo para usar OpenCode
        </p>
        <p className="text-sm text-white/80">
          Instálalo ahora y empieza a programar más rápido. Tarda menos de 2
          minutos.
        </p>
        <code className="inline-block mt-3 px-4 py-2 rounded-lg bg-black/20 text-sm font-mono">
          npm install -g @opencode/cli
        </code>
      </div>

      <div className="rounded-xl border border-violet-200 dark:border-violet-800/40 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 p-5 my-6">
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white shrink-0 shadow-sm">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M13 10V3L4 14h7v7l9-11h-7z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wider mb-1">
              Siguiente paso
            </p>
            <p className="text-sm font-bold text-[#1d1d1f] dark:text-white mb-1">
              Modelos de IA en OpenCode
            </p>
            <p className="text-xs text-[#6e6e73] dark:text-[#86868b] leading-relaxed mb-3">
              OpenCode funciona con más de 75 proveedores de IA. Aprende a
              configurar OpenAI, Claude, GitHub Copilot, modelos locales con
              Ollama y elige el mejor modelo para cada tarea.
            </p>
            <a
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
              href="/blog/tutoriales/opencode-models"
            >
              Leer guía completa
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

export default function OpenCodeContent() {
  return (
    <div className="space-y-2">
      <SectionQueEs />
      <Divider />
      <SectionParaQueSirve />
      <Divider />
      <SectionInstalacion />
      <Divider />
      <SectionPrimerUso />
      <Divider />
      <SectionComandos />
      <Divider />
      <SectionConsejos />
    </div>
  );
}
