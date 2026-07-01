"use client";
import {
  BlogCallout,
  BlogCode,
  BlogH2,
  BlogLi,
  BlogP,
  BlogUl,
} from "@/components/blog/shared";

export default function OllamaMcpContent() {
  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 mb-8">
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-800/50">
          Tutorial
        </span>
        <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
          8 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-4"
        style={{ letterSpacing: "-0.03em" }}
      >
        Ollama + MCP: modelos locales con herramientas
      </h1>
      <p className="text-base md:text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed mb-8">
        Aprende a ejecutar modelos de lenguaje localmente con Ollama y
        conéctalos a herramientas MCP para potenciar tus agentes de IA sin
        depender de la nube.
      </p>

      <div className="h-px bg-black/8 dark:bg-white/8 mb-8" />

      <BlogH2>¿Por qué modelos locales con MCP?</BlogH2>
      <BlogP>
        Combinar modelos locales con el protocolo MCP te da lo mejor de ambos
        mundos: la autonomía de ejecutar la IA en tu máquina y la capacidad de
        usar herramientas reales (archivos, terminal, APIs) a través del mismo
        estándar que usan los modelos en la nube.
      </BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Privacidad total</strong> — tus datos nunca salen de tu
          ordenador. Ideal para código sensible, documentos personales o
          proyectos bajo NDA
        </BlogLi>
        <BlogLi>
          <strong>Coste cero</strong> — sin tokens de API, sin suscripciones.
          Usa tu GPU o CPU tantas horas como quieras
        </BlogLi>
        <BlogLi>
          <strong>Offline</strong> — funciona sin conexión a Internet. Lleva tu
          asistente al avión, al campo o a una sala aislada
        </BlogLi>
        <BlogLi>
          <strong>Mismo protocolo</strong> — los MCPs que configuras para OpenAI
          o Anthropic funcionan igual con Ollama. Cambias el backend, no las
          herramientas
        </BlogLi>
      </BlogUl>

      <BlogH2>Instalar Ollama</BlogH2>
      <BlogP>
        Ollama es el gestor de modelos locales más sencillo. En macOS lo
        instalas con Homebrew:
      </BlogP>
      <BlogCode>{`brew install ollama
ollama serve`}</BlogCode>
      <BlogP>
        Una vez arrancado, descarga los modelos que necesites. Para tool calling
        necesitas modelos con buen soporte de funciones:
      </BlogP>
      <BlogCode>{`ollama pull llama3.2:3b
ollama pull qwen2.5-coder:7b
ollama pull mistral
ollama pull deepseek-coder`}</BlogCode>
      <BlogP>
        Puedes verificar que funciona con <code>ollama list</code>. Ollama
        expone una API en <code>http://localhost:11434</code> compatible con
        OpenAI.
      </BlogP>

      <BlogH2>OpenCode + Ollama</BlogH2>
      <BlogP>
        OpenCode soporta Ollama como proveedor nativo. Configúralo en tu{" "}
        <code>opencode.json</code> junto con los MCPs que quieras usar:
      </BlogP>
      <BlogCode>{`{
  "provider": "ollama",
  "model": "qwen2.5-coder:7b",
  "ollamaUrl": "http://localhost:11434",
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_..."
      }
    }
  }
}`}</BlogCode>
      <BlogP>
        Con esto, OpenCode usa el modelo local para todas las conversaciones y
        los MCPs le dan acceso al sistema de archivos y a GitHub. Cada vez que
        la IA necesite leer un archivo o listar un directorio, llamará
        automáticamente al servidor filesystem.
      </BlogP>

      <BlogH2>Continue.dev + Ollama</BlogH2>
      <BlogP>
        Continue.dev es el asistente de código abierto para VS Code y JetBrains.
        Soporta Ollama como backend y MCPs como fuente de herramientas. La
        configuración va en <code>.continuerc.json</code> o en la UI de ajustes:
      </BlogP>
      <BlogCode>{`{
  "models": [
    {
      "title": "Qwen Coder Local",
      "provider": "ollama",
      "model": "qwen2.5-coder:7b",
      "apiBase": "http://localhost:11434"
    }
  ],
  "experimental": {
    "mcpServers": {
      "filesystem": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
      },
      "playwright": {
        "command": "npx",
        "args": ["-y", "@anthropic/mcp-server-playwright"]
      }
    }
  },
  "tabAutocompleteModel": {
    "title": "Starcoder Local",
    "provider": "ollama",
    "model": "starcoder2:3b"
  }
}`}</BlogCode>
      <BlogP>
        Con esta configuración, el modelo Qwen local te da autocompletado, chat
        contextual y capacidad de ejecutar herramientas MCP directamente desde
        el editor.
      </BlogP>

      <BlogH2>Cline + Ollama</BlogH2>
      <BlogP>
        Cline es la extensión de VS Code que convierte al editor en un agente
        autónomo. Usa la configuración de <code>cline_mcp_settings.json</code>:
      </BlogP>
      <BlogCode>{`{
  "apiProvider": "ollama",
  "model": "qwen2.5-coder:7b",
  "ollamaBaseUrl": "http://localhost:11434",
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
    },
    "terminal": {
      "command": "npx",
      "args": ["-y", "@nicholasgriffintn/mcp-terminal"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_..."
      }
    }
  }
}`}</BlogCode>
      <BlogP>
        Cline ejecuta tareas multi-paso: lee archivos, ejecuta comandos, crea
        PRs. Con Ollama como backend todo ocurre localmente.
      </BlogP>

      <BlogH2>Ejemplo práctico</BlogH2>
      <BlogP>
        Imagina que acabas de clonar un proyecto y quieres entender su
        estructura sin leer archivo por archivo. Con Ollama + Filesystem MCP
        puedes pedirle a la IA:
      </BlogP>
      <BlogCode>{`"Analiza la estructura de este proyecto.
Primero lista los archivos raíz, luego lee el package.json
y el README. Después dime de qué trata el proyecto,
qué stack usa y cómo arrancarlo."`}</BlogCode>
      <BlogP>El agente hará esto automáticamente:</BlogP>
      <BlogUl>
        <BlogLi>
          Llama a <code>list_directory</code> para ver la raíz del proyecto
        </BlogLi>
        <BlogLi>
          Llama a <code>read_file</code> sobre <code>package.json</code> y{" "}
          <code>README.md</code>
        </BlogLi>
        <BlogLi>Analiza el contenido con el modelo local</BlogLi>
        <BlogLi>
          Te devuelve un resumen completo con stack, scripts y dependencias
        </BlogLi>
      </BlogUl>
      <BlogP>
        Todo esto sin enviar ni una línea de tu código a la nube. El modelo
        local procesa los archivos que el MCP filesystem le entrega.
      </BlogP>

      <BlogH2>Qué modelos funcionan mejor</BlogH2>
      <BlogP>
        No todos los modelos locales manejan bien tool calling. Estos son los
        que mejor funcionan con MCP:
      </BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Qwen2.5-Coder (7B)</strong> — el mejor para tool calling en
          local. Sigue instrucciones con precisión, entiende cuándo llamar
          herramientas y genera código de calidad. La opción más equilibrada
        </BlogLi>
        <BlogLi>
          <strong>Llama 3.2 (3B)</strong> — ligero y rápido. Funciona bien en
          CPU. Tool calling básico pero efectivo para tareas sencillas como leer
          archivos o buscar texto
        </BlogLi>
        <BlogLi>
          <strong>DeepSeek Coder (6.7B)</strong> — excelente para código. Sus
          respuestas técnicas son detalladas, aunque a veces pierde precisión en
          llamadas multi-herramienta
        </BlogLi>
        <BlogLi>
          <strong>Mistral (7B)</strong> — rápido y consistente. Buen soporte de
          tool calling, ideal como opción polivalente cuando alternas entre
          código y tareas generales
        </BlogLi>
      </BlogUl>

      <BlogH2>Limitaciones</BlogH2>
      <BlogUl>
        <BlogLi>
          <strong>Consistencia de tool calling</strong> — los modelos locales no
          siempre deciden llamar a la herramienta correcta. A veces ignoran un
          MCP disponible o llaman a la herramienta equivocada. Los modelos cloud
          (GPT-4o, Claude) son más fiables en este aspecto
        </BlogLi>
        <BlogLi>
          <strong>Ventana de contexto</strong> — los modelos locales tienen
          contextos más reducidos (4K-32K tokens). Si el MCP devuelve mucha
          información, el modelo puede olvidar instrucciones anteriores
        </BlogLi>
        <BlogLi>
          <strong>Velocidad</strong> — sin GPU dedicada, los modelos de 7B
          pueden tardar segundos en responder. En cloud obtienes respuestas en
          milisegundos. Para tareas largas con múltiples llamadas MCP la
          diferencia se nota
        </BlogLi>
        <BlogLi>
          <strong>Modelos pequeños</strong> — los modelos de 3B o 7B entienden
          herramientas simples pero se confunden con workflows complejos que
          requieren varias herramientas encadenadas
        </BlogLi>
      </BlogUl>

      <BlogCallout type="tip">
        <strong>Recomendación:</strong> empieza con{" "}
        <strong>Qwen2.5-Coder:7B</strong> como modelo principal. Si tu máquina
        es modesta, usa <strong>Llama 3.2:3B</strong> para tareas rápidas y
        cambia a Qwen cuando necesites precisión. Para tool calling complejo,
        combínalo con un modelo cloud como fallback.
      </BlogCallout>
    </article>
  );
}
