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

export default function AiEditorPluginsContent() {
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
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          Artículo
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          10 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3"
        style={{ letterSpacing: "-0.03em" }}
      >
        Plugins de editor para IA: VS Code, JetBrains y más
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Guía completa de extensiones y editores con inteligencia artificial
        integrada. Comparativa, precios, características y recomendaciones según
        tu perfil.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="categorias">Categorías de plugins</BlogH2>

      <BlogP>
        El ecosistema de plugins de IA para editores de código se puede dividir
        en cuatro grandes categorías según su funcionalidad principal. Entender
        estas categorías ayuda a elegir la herramienta adecuada para cada flujo
        de trabajo.
      </BlogP>

      <BlogH3>Autocompletado</BlogH3>
      <BlogP>
        Son los más establecidos. Analizan el contexto del archivo abierto y el
        proyecto para sugerir la siguiente línea o bloque de código en tiempo
        real. Funcionan con modelos de lenguaje pequeños (SLMs) entrenados
        específicamente para código, lo que los hace extremadamente rápidos.
        Ejemplos: GitHub Copilot, Tabnine, Supermaven, Codeium.
      </BlogP>

      <BlogH3>Chat en editor</BlogH3>
      <BlogP>
        Añaden un panel de chat dentro del IDE donde puedes hacer preguntas
        sobre tu base de código, pedir refactors o explicaciones. Suelen
        integrarse con modelos grandes como GPT-4, Claude o Gemini y a menudo
        pueden leer archivos, selecciones y el árbol del proyecto. Ejemplos:
        Continue.dev, Cody, GitHub Copilot Chat.
      </BlogP>

      <BlogH3>Agentes autónomos</BlogH3>
      <BlogP>
        La categoría más reciente y potente. Estos plugins no solo sugieren
        código, sino que pueden ejecutar comandos, leer y escribir archivos,
        gestionar terminales y orquestar flujos multi-paso por su cuenta.
        Utilizan el protocolo MCP (Model Context Protocol) para conectarse a
        herramientas externas. Ejemplos: Cline, GitHub Copilot Agent Mode,
        Claude Code.
      </BlogP>

      <BlogH3>Review de código</BlogH3>
      <BlogP>
        Se integran con el flujo de pull requests y revisan el código
        automáticamente. Detectan bugs, code smells, problemas de seguridad y
        estilo. Algunos funcionan como asistentes locales y otros como acciones
        de CI/CD. Ejemplos: Cody Review, CodeRabbit, Copilot Code Review.
      </BlogP>

      <BlogH2 id="tabla-comparativa">Tabla comparativa</BlogH2>

      <BlogP>
        Vista rápida de los principales plugins y editores con IA del mercado
        actual. La tabla incluye tipo de herramienta, modelo backend y soporte
        para MCP.
      </BlogP>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10">
              <th className="text-left py-3 px-3 font-semibold text-[#1d1d1f] dark:text-white">
                Plugin
              </th>
              <th className="text-left py-3 px-3 font-semibold text-[#1d1d1f] dark:text-white">
                Tipo
              </th>
              <th className="text-left py-3 px-3 font-semibold text-[#1d1d1f] dark:text-white">
                Precio
              </th>
              <th className="text-left py-3 px-3 font-semibold text-[#1d1d1f] dark:text-white">
                Modelo backend
              </th>
              <th className="text-center py-3 px-3 font-semibold text-[#1d1d1f] dark:text-white">
                MCP
              </th>
              <th className="text-left py-3 px-3 font-semibold text-[#1d1d1f] dark:text-white">
                Plataforma
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "GitHub Copilot",
                "Autocompletado + Chat + Agente",
                "10 $/mes (Pro)",
                "GPT-4 / Claude",
                "Sí (preview)",
                "VS Code, JetBrains, Xcode, Neovim",
              ],
              [
                "Supermaven",
                "Autocompletado",
                "7 $/mes (Pro)",
                "Propietario",
                "No",
                "VS Code, JetBrains",
              ],
              [
                "Continue.dev",
                "Chat + Autocompletado",
                "Gratis (OSS)",
                "BYO LLM",
                "Sí",
                "VS Code, JetBrains",
              ],
              [
                "Cody (Sourcegraph)",
                "Chat + Autocompletado + Review",
                "9 $/mes (Pro)",
                "Claude / GPT-4",
                "No",
                "VS Code, JetBrains, Web",
              ],
              [
                "Cline",
                "Agente autónomo",
                "Gratis (OSS)",
                "BYO LLM",
                "Sí",
                "VS Code",
              ],
              [
                "Tabnine",
                "Autocompletado + Chat",
                "12 $/mes (Pro)",
                "Propietario + BYO",
                "No",
                "VS Code, JetBrains, Eclipse",
              ],
              [
                "Codeium",
                "Autocompletado + Chat",
                "Gratis (Individual)",
                "Propietario",
                "No",
                "VS Code, JetBrains, Vim",
              ],
              [
                "Cursor",
                "Editor completo (IA-first)",
                "20 $/mes (Pro)",
                "GPT-4 / Claude",
                "Sí",
                "Editor propio (fork VS Code)",
              ],
            ].map(([plugin, tipo, precio, modelo, mcp, plataforma]) => (
              <tr
                key={plugin}
                className="border-b border-black/6 dark:border-white/6 hover:bg-black/2 dark:hover:bg-white/2"
              >
                <td className="py-2.5 px-3 font-medium text-[#1d1d1f] dark:text-white">
                  {plugin}
                </td>
                <td className="py-2.5 px-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                  {tipo}
                </td>
                <td className="py-2.5 px-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                  {precio}
                </td>
                <td className="py-2.5 px-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                  {modelo}
                </td>
                <td className="py-2.5 px-3 text-center">
                  {mcp.startsWith("Sí") ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      {mcp}
                    </span>
                  ) : (
                    <span className="text-[#aeaeb2] dark:text-[#636366]">
                      {mcp}
                    </span>
                  )}
                </td>
                <td className="py-2.5 px-3 text-[#3a3a3c] dark:text-[#aeaeb2] text-xs">
                  {plataforma}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BlogCallout type="info">
        <strong>BYO LLM</strong> significa "Bring Your Own LLM" — puedes
        conectar tu propio modelo (Ollama, OpenAI, Anthropic, etc.) y pagar solo
        por el uso de API.
      </BlogCallout>

      <BlogH2 id="continue">Continue.dev</BlogH2>

      <BlogP>
        Continue.dev es el referente open-source en el espacio de plugins de IA
        para editores. A diferencia de las soluciones cerradas, te permite
        elegir exactamente qué modelo quieres usar y cómo se conecta a tu
        entorno. Corre localmente o contra APIs externas.
      </BlogP>

      <BlogP>
        Su punto fuerte es el soporte nativo para MCP: puedes añadir cualquier
        servidor MCP a tu configuración y Continue lo usará automáticamente en
        los flujos de chat y agente. La configuración se guarda en{" "}
        <BlogInlineCode>~/.continue/config.json</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`{
  "models": [
    {
      "title": "Claude Sonnet",
      "provider": "anthropic",
      "model": "claude-sonnet-4-20250514"
    },
    {
      "title": "Local Ollama",
      "provider": "ollama",
      "model": "codellama:7b"
    }
  ],
  "experimental": {
    "mcpServers": [
      {
        "name": "filesystem",
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
      }
    ]
  }
}`}</BlogCode>

      <BlogP>
        Es compatible con Ollama, OpenAI, Anthropic, Google Gemini, Azure
        OpenAI, y docenas de proveedores más. La comunidad mantiene una
        creciente colección de MCPs listos para usar.
      </BlogP>

      <BlogH2 id="cline">Cline</BlogH2>

      <BlogP>
        Cline (antes Claude Dev) llevó el concepto de agente autónomo a VS Code.
        A diferencia de un chat tradicional, Cline puede planificar y ejecutar
        tareas complejas: leer archivos, escribir modificaciones, ejecutar
        tests, hacer commits y hasta desplegar.
      </BlogP>

      <BlogP>
        Su arquitectura está basada en MCP desde el día uno. Cada herramienta
        que Cline necesita (sistema de archivos, terminal, navegador, base de
        datos) se configura como un servidor MCP independiente. La configuración
        se define en{" "}
        <BlogInlineCode>.vscode/cline_mcp_settings.json</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@anthropic/mcp-playwright"],
      "env": {}
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "$GITHUB_PAT"
      }
    }
  }
}`}</BlogCode>

      <BlogP>
        Cline usa el modelo que le configures (recomendado Claude Sonnet o
        GPT-4) y gasta tokens según la complejidad de la tarea. Es ideal para
        automatizar flujos de trabajo completos sin salir del editor.
      </BlogP>

      <BlogCallout type="warn">
        <strong>Cuidado con los costes.</strong> Al ser un agente autónomo,
        Cline puede consumir muchos tokens en una sola sesión si no limitas el
        modelo o estableces un presupuesto. Siempre revisa los cambios antes de
        aceptarlos.
      </BlogCallout>

      <BlogH2 id="copilot">GitHub Copilot</BlogH2>

      <BlogP>
        GitHub Copilot es el plugin de IA para editores más usado del mundo.
        Nació como un autocompletado basado en Codex (OpenAI) y ha evolucionado
        hasta incluir chat, code review y, desde 2025, un modo agente con
        soporte MCP en preview.
      </BlogP>

      <BlogP>
        Su principal ventaja es la integración profunda con el ecosistema
        GitHub: entiende issues, pull requests, Actions y el contexto completo
        del repositorio. Funciona en VS Code, JetBrains, Xcode, Neovim y Azure
        Data Studio.
      </BlogP>

      <BlogP>
        El Agent Mode de Copilot (VS Code Insiders) es la respuesta directa a
        Cline: permite a Copilot ejecutar terminales, leer/escribir archivos y
        orquestar tareas multi-paso. Actualmente está en preview público con
        soporte limitado de MCP.
      </BlogP>

      <BlogH3>Ediciones</BlogH3>
      <BlogUl>
        <BlogLi>
          <strong>Copilot Free</strong> — 2000 autocompletados y 50 chats al
          mes, modelos GPT-4o y Claude Sonnet.
        </BlogLi>
        <BlogLi>
          <strong>Copilot Pro</strong> — 10 $/mes, acceso ilimitado, agente y
          code review.
        </BlogLi>
        <BlogLi>
          <strong>Copilot Business/Enterprise</strong> — 19 $ y
          39 $/usuario/mes, políticas de seguridad, IP indemnización.
        </BlogLi>
      </BlogUl>

      <BlogH2 id="supermaven">Supermaven</BlogH2>

      <BlogP>
        Supermaven es el plugin de autocompletado más rápido del mercado. Su
        modelo propietario está optimizado para latencia mínima y un contexto de
        hasta 1 millón de tokens, lo que le permite entender todo el código de
        un proyecto grande sin perder rendimiento.
      </BlogP>

      <BlogP>
        A diferencia de Copilot, Supermaven no tiene chat ni modo agente. Es una
        herramienta pura de autocompletado, pero lo hace excepcionalmente bien:
        las sugerencias aparecen en milisegundos, incluso en monorepos enormes.
      </BlogP>

      <BlogP>
        Está disponible para VS Code, JetBrains y próximamente Neovim. Su precio
        es de 7 $/mes para el plan Pro y 19 $/mes para el plan Teams. No soporta
        MCP ni modelos externos.
      </BlogP>

      <BlogCallout type="tip">
        Si ya usas Copilot o Continue para chat y agente, Supermaven como
        complemento de autocompletado es una combinación imbatible. Ambos
        coexisten sin conflictos en VS Code.
      </BlogCallout>

      <BlogH2 id="cual-elegir">¿Cuál elegir?</BlogH2>

      <BlogP>
        No hay una respuesta única. La elección depende de tu perfil,
        presupuesto y flujo de trabajo. Aquí una guía rápida:
      </BlogP>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10">
              <th className="text-left py-3 px-3 font-semibold text-[#1d1d1f] dark:text-white">
                Perfil
              </th>
              <th className="text-left py-3 px-3 font-semibold text-[#1d1d1f] dark:text-white">
                Recomendación
              </th>
              <th className="text-left py-3 px-3 font-semibold text-[#1d1d1f] dark:text-white">
                Por qué
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "Full-stack (JS/TS, Python)",
                "Copilot Pro + Supermaven",
                "Autocompletado ultrarrápido + agente y review integrados",
              ],
              [
                "Data Science / ML",
                "Continue.dev + Ollama",
                "Modelos locales, privacidad de datos, notebooks compatibles",
              ],
              [
                "Mobile (Swift, Kotlin)",
                "Copilot Pro + Cursor",
                "Soporte nativo Xcode/Android Studio, editor IA-first",
              ],
              [
                "Open-source / hobby",
                "Continue.dev + Cline",
                "100% gratis, tú controlas los modelos y los costes",
              ],
              [
                "Enterprise / compliance",
                "Copilot Enterprise",
                "IP indemnización, políticas de seguridad, auditoría",
              ],
              [
                "Equipo pequeño (startup)",
                "Codeium + Cline",
                "Gratis para individual, agente potente para automatizar",
              ],
            ].map(([perfil, rec, why]) => (
              <tr
                key={perfil}
                className="border-b border-black/6 dark:border-white/6 hover:bg-black/2 dark:hover:bg-white/2"
              >
                <td className="py-2.5 px-3 font-medium text-[#1d1d1f] dark:text-white">
                  {perfil}
                </td>
                <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-medium">
                  {rec}
                </td>
                <td className="py-2.5 px-3 text-[#3a3a3c] dark:text-[#aeaeb2] text-xs">
                  {why}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BlogCallout type="tip">
        <strong>Recomendación personal:</strong> empieza con{" "}
        <strong>Continue.dev + Ollama</strong> (gratis, local, privado). Si
        necesitas más velocidad en autocompletado, añade{" "}
        <strong>Supermaven</strong>. Si trabajas en equipo con GitHub,{" "}
        <strong>Copilot Pro</strong> es el estándar indiscutible. Y para
        automatización pesada, <strong>Cline</strong> no tiene rival. Todos
        coexisten en VS Code sin problemas.
      </BlogCallout>
    </article>
  );
}
