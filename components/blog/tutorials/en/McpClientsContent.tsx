"use client";

import {
  BlogH2,
  BlogH3,
  BlogP,
  BlogCode,
  BlogInlineCode,
  BlogUl,
  BlogLi,
  BlogCallout,
} from "@/components/blog/shared";

export default function McpClientsContent() {
  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
          Article
        </span>
        <span className="text-[11px] text-[#aeaeb2] dark:text-[#636366]">
          8–10 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3"
        style={{ letterSpacing: "-0.03em" }}
      >
        Choose your MCP client: comparativa de agentes compatibles
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Not all MCP clients are the same. We analyze OpenCode, Claude Code,
        Cursor, Windsurf, Continue.dev y Cline para que elijas el que mejor se
        adapta a tu flujo de trabajo.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-10" />

      <BlogH2 id="que-es-un-cliente-mcp">What is an MCP client?</BlogH2>
      <BlogP>
        MCP (<em>Model Context Protocol</em>) es un protocolo abierto creado por
        Anthropic que estandariza la comunicación entre asistentes de IA y
        herramientas externas. Un <strong>cliente MCP</strong> es cualquier
        agente —CLI, IDE o aplicación— que implementa este protocolo para
        conectarse con <em>servidores MCP</em> que exponen recursos,
        herramientas y prompts.
      </BlogP>
      <BlogP>
        La idea es sencilla: en lugar de que cada agente invente su propio
        sistema de plugins, todos hablan el mismo idioma. Un mismo servidor MCP
        funciona en OpenCode, Claude Code, Cursor, Windsurf, Continue.dev y
        Cline sin cambios. Esto crea un ecosistema interoperable donde tú eliges
        el agente y los servidores se comparten.
      </BlogP>
      <BlogP>
        In this guide we compare the six most popular MCP clients, analizando
        su configuración, capacidades y caso de uso ideal.
      </BlogP>

      <BlogH2 id="opencode">OpenCode</BlogH2>
      <BlogP>
        <strong>OpenCode</strong> es un agente CLI nativo de código abierto
        diseñado desde cero para MCP. Es el único cliente que implementa{" "}
        <em>auto-detect</em>: escanea tu proyecto en busca de servidores MCP ya
        configurados y los activa automáticamente sin intervención manual.
      </BlogP>
      <BlogH3>Local installation (recomendada)</BlogH3>
      <BlogP>
        La forma más común es instalarlo como dependencia de desarrollo en tu
        proyecto:
      </BlogP>
      <BlogCode>{`npm install --save-dev opencode`}</BlogCode>
      <BlogP>
        OpenCode busca un archivo <BlogInlineCode>opencode.json</BlogInlineCode>{" "}
        en la raíz del proyecto. Este archivo define los servidores MCP,
        habilidades instaladas y reglas del agente:
      </BlogP>
      <BlogCode>{`{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"]
    }
  }
}`}</BlogCode>
      <BlogP>
        También puedes instalarlo de forma global con{" "}
        <BlogInlineCode>npm install -g opencode</BlogInlineCode> y usar{" "}
        <BlogInlineCode>opencode.json</BlogInlineCode> desde{" "}
        <BlogInlineCode>~/.config/opencode/</BlogInlineCode> como fallback
        global. El auto-detect prioriza el archivo local del proyecto
      </BlogP>
      <BlogP>
        OpenCode es ideal si trabajas en terminal y quieres un agente ligero,
        rápido y 100% compatible con el estándar MCP. Al ser código abierto,
        puedes auditar cada línea e incluso contribuir.
      </BlogP>

      <BlogH2 id="claude-code">Claude Code</BlogH2>
      <BlogP>
        <strong>Claude Code</strong> es el agente CLI oficial de Anthropic, la
        misma empresa que creó MCP. Lógicamente, es el cliente con la
        integración más profunda con los modelos Claude y el primero en recibir
        nuevas capacidades del protocolo.
      </BlogP>
      <BlogP>
        Se configura mediante <BlogInlineCode>claude.json</BlogInlineCode> en la
        raíz del proyecto:
      </BlogP>
      <BlogCode>{`{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
    }
  }
}`}</BlogCode>
      <BlogP>
        El formato es casi idéntico al de OpenCode, lo que facilita migrar de
        uno a otro. Claude Code funciona exclusivamente con modelos de Anthropic
        (Claude 3.5 Sonnet, Claude 4 Opus, etc.) y requiere una clave de API de
        Anthropic o un plan de pago.
      </BlogP>
      <BlogP>
        Su punto fuerte es la calidad de las respuestas: al estar optimizado
        para Claude, aprovecha al máximo el contexto largo, la edición de
        archivos y el razonamiento profundo. Su punto débil es que no soporta
        modelos locales ni de otros proveedores.
      </BlogP>

      <BlogH2 id="cursor">Cursor</BlogH2>
      <BlogP>
        <strong>Cursor</strong> es un IDE basado en VS Code con IA integrada. A
        diferencia de los clientes CLI, ofrece una interfaz gráfica completa
        donde la configuración de MCP se realiza desde la UI.
      </BlogP>
      <BlogP>Para añadir servidores MCP en Cursor:</BlogP>
      <BlogUl>
        <BlogLi>
          Ve a <strong>Settings → MCP Servers</strong> (o busca "MCP" en la
          paleta de comandos)
        </BlogLi>
        <BlogLi>
          Haz clic en <strong>Add New MCP Server</strong>
        </BlogLi>
        <BlogLi>
          Elige entre <strong>stdio</strong> (comando local) o{" "}
          <strong>SSE</strong> (URL remota)
        </BlogLi>
        <BlogLi>Introduce el nombre, comando y argumentos</BlogLi>
      </BlogUl>
      <BlogP>
        Cursor también soporta un archivo{" "}
        <BlogInlineCode>.cursor/mcp.json</BlogInlineCode> para configuración por
        proyecto, lo que permite versionar los servidores MCP en el repositorio.
      </BlogP>
      <BlogCode>{`{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"]
    }
  }
}`}</BlogCode>
      <BlogP>
        Es la mejor opción para desarrolladores que prefieren una interfaz
        visual y no quieren lidiar con configuraciones manuales en terminal. Su
        integración con el editor hace que usar MCP se sienta nativo.
      </BlogP>

      <BlogH2 id="windsurf">Windsurf</BlogH2>
      <BlogP>
        <strong>Windsurf</strong> (de Codeium) es otro IDE con IA que adoptó MCP
        como formato nativo de configuración. Su archivo{" "}
        <BlogInlineCode>.windsurfrules</BlogInlineCode> o{" "}
        <BlogInlineCode>windsurf.json</BlogInlineCode> sigue una estructura muy
        similar a la de OpenCode.
      </BlogP>
      <BlogCode>{`{
  "mcpServers": {
    "web-search": {
      "command": "node",
      "args": ["path/to/server-web-search/index.js"]
    }
  }
}`}</BlogCode>
      <BlogP>
        Windsurf es compatible con el formato OpenCode de manera nativa. Si ya
        tienes un <BlogInlineCode>opencode.json</BlogInlineCode>, Windsurf lo
        reconoce automáticamente. Esto lo convierte en una opción excelente para
        equipos que quieren compartir configuraciones entre miembros que usan
        herramientas diferentes.
      </BlogP>
      <BlogP>
        Su motor de IA (Codeium) soporta múltiples LLMs, incluyendo modelos
        locales, y ofrece planes gratuitos generosos. Es ideal si buscas un IDE
        con IA potente sin comprometerte a un solo proveedor.
      </BlogP>

      <BlogH2 id="continue-dev">Continue.dev</BlogH2>
      <BlogP>
        <strong>Continue.dev</strong> es una extensión de código abierto para VS
        Code y JetBrains que convierte tu IDE en un asistente MCP completo. A
        diferencia de Cursor o Windsurf, no es un IDE independiente sino un
        plugin que se instala sobre tu editor existente.
      </BlogP>
      <BlogP>
        Su configuración se define en{" "}
        <BlogInlineCode>~/.continue/config.json</BlogInlineCode>:
      </BlogP>
      <BlogCode>{`{
  "models": [
    {
      "title": "Claude 4",
      "provider": "anthropic",
      "model": "claude-sonnet-4-20250514"
    },
    {
      "title": "Local",
      "provider": "ollama",
      "model": "codellama"
    }
  ],
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
    }
  }
}`}</BlogCode>
      <BlogP>
        Su gran ventaja es la libertad de elección de modelo: puedes usar
        Anthropic, OpenAI, Google Gemini, modelos locales con Ollama, o
        cualquier proveedor compatible con la API de OpenAI. Esto lo convierte
        en el cliente más flexible del ecosistema.
      </BlogP>
      <BlogP>
        Además, al ser open-source y tener una comunidad activa, recibe
        actualizaciones frecuentes y nuevas funcionalidades. Es perfecto para
        desarrolladores que quieren mantener su IDE actual (VS Code o JetBrains)
        y añadirle capacidades MCP sin migrar a otro editor.
      </BlogP>

      <BlogH2 id="cline">Cline</BlogH2>
      <BlogP>
        <strong>Cline</strong> es una extensión para VS Code que funciona como
        agente autónomo. A diferencia de Continue.dev —que actúa como asistente
        conversacional— Cline opera de forma más independiente: recibe una tarea
        y la ejecuta paso a paso, decidiendo qué herramientas usar y cómo
        combinarlas.
      </BlogP>
      <BlogP>
        Su configuración de servidores MCP se define en{" "}
        <BlogInlineCode>
          ~/.vscode/globalStorage/.../cline_mcp_settings.json
        </BlogInlineCode>
        :
      </BlogP>
      <BlogCode>{`{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-playwright"]
    }
  }
}`}</BlogCode>
      <BlogP>
        Cline soporta múltiples proveedores de LLM (Anthropic, OpenAI, Google,
        AWS Bedrock, GCP Vertex, y modelos locales via Ollama) y puede alternar
        entre ellos según la tarea. Su enfoque de "agente autónomo" lo hace
        especialmente útil para tareas complejas que requieren múltiples pasos
        con decisiones intermedias.
      </BlogP>
      <BlogP>
        La extensión también incluye un sistema de permisos: puedes elegir si
        Cline debe pedir aprobación antes de ejecutar cada herramienta o si
        puede hacerlo automáticamente. Esto da control granular sobre lo que el
        agente puede hacer.
      </BlogP>

      <BlogH2 id="tabla-comparativa">Comparison table</BlogH2>
      <BlogP>
        Aquí tienes una comparativa rápida de las características clave de cada
        cliente MCP:
      </BlogP>

      <div className="overflow-x-auto my-6 rounded-xl border border-black/8 dark:border-white/8">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-black/[0.02] dark:bg-white/[0.02]">
              <th className="text-left p-2 font-semibold border-b border-black/8 dark:border-white/8">
                Client
              </th>
              <th className="text-left p-2 font-semibold border-b border-black/8 dark:border-white/8">
                Type
              </th>
              <th className="text-left p-2 font-semibold border-b border-black/8 dark:border-white/8">
                Config file
              </th>
              <th className="text-left p-2 font-semibold border-b border-black/8 dark:border-white/8">
                stdio support
              </th>
              <th className="text-left p-2 font-semibold border-b border-black/8 dark:border-white/8">
                SSE support
              </th>
              <th className="text-left p-2 font-semibold border-b border-black/8 dark:border-white/8">
                Local models
              </th>
              <th className="text-left p-2 font-semibold border-b border-black/8 dark:border-white/8">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04] font-medium">
                OpenCode
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                CLI
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                <BlogInlineCode>opencode.json</BlogInlineCode>
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                Sí
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                Sí
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                No
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                Free
              </td>
            </tr>
            <tr>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04] font-medium">
                Claude Code
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                CLI
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                <BlogInlineCode>claude.json</BlogInlineCode>
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                Sí
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                Sí
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                No
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                Paid
              </td>
            </tr>
            <tr>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04] font-medium">
                Cursor
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                IDE
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                UI / <BlogInlineCode>.cursor/mcp.json</BlogInlineCode>
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                Sí
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                Sí
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                No
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                Free / Pro
              </td>
            </tr>
            <tr>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04] font-medium">
                Windsurf
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                IDE
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                <BlogInlineCode>windsurf.json</BlogInlineCode>
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                Sí
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                Sí
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                Sí
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                Free / Pro
              </td>
            </tr>
            <tr>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04] font-medium">
                Continue.dev
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                Plugin (VS Code / JetBrains)
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                <BlogInlineCode>config.json</BlogInlineCode>
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                Sí
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                Sí
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                Sí
              </td>
              <td className="p-2 border-b border-black/[0.04] dark:border-white/[0.04]">
                Free
              </td>
            </tr>
            <tr>
              <td className="p-2 font-medium">Cline</td>
              <td className="p-2">Plugin (VS Code)</td>
              <td className="p-2">
                <BlogInlineCode>cline_mcp_settings.json</BlogInlineCode>
              </td>
              <td className="p-2">Sí</td>
              <td className="p-2">Sí</td>
              <td className="p-2">Sí</td>
              <td className="p-2">Free</td>
            </tr>
          </tbody>
        </table>
      </div>

      <BlogH2 id="cual-elegir">Which one to choose?</BlogH2>
      <BlogP>
        La respuesta depende de tu flujo de trabajo, tu presupuesto y tus
        preferencias técnicas. Aquí tienes una matriz de decisión rápida:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Usas CLI / terminal y quieres algo ligero</strong> → elige{" "}
          <strong>OpenCode</strong> o <strong>Claude Code</strong>. OpenCode es
          gratuito y open-source; Claude Code ofrece integración más profunda
          con Anthropic si ya pagas por Claude.
        </BlogLi>
        <BlogLi>
          <strong>
            Trabajas en VS Code y quieres un asistente conversacional
          </strong>{" "}
          → <strong>Continue.dev</strong> es la opción más flexible, con soporte
          para cualquier LLM y completamente open-source.
        </BlogLi>
        <BlogLi>
          <strong>
            Necesitas un agente autónomo que ejecute tareas complejas
          </strong>{" "}
          → <strong>Cline</strong> destaca por su capacidad de planificación y
          ejecución multi-paso con permisos configurables.
        </BlogLi>
        <BlogLi>
          <strong>
            Prefieres una interfaz visual y no quieres tocar archivos JSON
          </strong>{" "}
          → <strong>Cursor</strong> tiene la mejor experiencia de configuración
          desde la UI, ideal para principiantes o equipos que valoran la
          facilidad de uso.
        </BlogLi>
        <BlogLi>
          <strong>Trabajas en múltiples IDEs o en equipo</strong> →{" "}
          <strong>Windsurf</strong> es compatible con el formato OpenCode, lo
          que facilita compartir configuraciones entre herramientas y
          desarrolladores.
        </BlogLi>
        <BlogLi>
          <strong>Quieres usar modelos locales (Ollama, LM Studio)</strong> →{" "}
          <strong>Continue.dev</strong> y <strong>Cline</strong> son las únicas
          opciones con soporte completo para LLMs locales sin depender de APIs
          externas.
        </BlogLi>
      </BlogUl>

      <BlogP>
        Por supuesto, nada te impide usar varios. Muchos desarrolladores
        combinan OpenCode o Claude Code en terminal para tareas rápidas con
        Continue.dev o Cline en VS Code para sesiones más largas de edición de
        código.
      </BlogP>

      <BlogCallout type="done">
        <strong>Elige el cliente que se adapte a tu flujo, no al revés.</strong>{" "}
        Todos implementan el mismo protocolo MCP, así que los servidores que
        configures funcionarán en cualquiera de ellos. Empieza con el que más se
        acerque a tu día a día y experimenta. Lo bueno del ecosistema MCP es que
        no estás atado a ninguna herramienta.
      </BlogCallout>
    </article>
  );
}
