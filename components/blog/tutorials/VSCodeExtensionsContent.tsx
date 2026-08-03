"use client";
import {
  BlogH2,
  BlogP,
  BlogInlineCode,
  BlogUl,
  BlogLi,
  BlogCallout,
} from "@/components/blog/shared";

const ext = (name: string, id: string) => ({ name, id });

const EXTENSIONS = {
  linting: [
    ext("ESLint", "dbaeumer.vscode-eslint"),
    ext("Prettier", "esbenp.prettier-vscode"),
    ext("Stylelint", "stylelint.vscode-stylelint"),
    ext("Biome", "biomejs.biome"),
  ],
  git: [
    ext("GitLens", "eamodio.gitlens"),
    ext("Git Graph", "mhutchie.git-graph"),
    ext("Git History", "donjayamanne.githistory"),
    ext("GitHub Pull Requests", "github.vscode-pull-request-github"),
  ],
  languages: [
    ext("Tailwind CSS IntelliSense", "bradlc.vscode-tailwindcss"),
    ext("ES7+ React/Redux snippets", "dsznajder.es7-react-js-snippets"),
    ext("Thunder Client", "rangav.vscode-thunder-client"),
    ext("REST Client", "humao.rest-client"),
    ext("SQLTools", "mtxr.sqltools"),
    ext("Docker", "ms-azuretools.vscode-docker"),
    ext("YAML", "redhat.vscode-yaml"),
    ext("Python", "ms-python.python"),
  ],
  productivity: [
    ext("Error Lens", "usernamehw.errorlens"),
    ext("Path Intellisense", "christian-kohler.path-intellisense"),
    ext("Import Cost", "wix.vscode-import-cost"),
    ext("Auto Rename Tag", "formulahendry.auto-rename-tag"),
    ext("indent-rainbow", "oderwat.indent-rainbow"),
    ext("TODO Highlight", "wayou.vscode-todo-highlight"),
    ext("GitHub Copilot", "github.copilot"),
    ext("Continue.dev", "continue.continue"),
    ext("Pretty TypeScript Errors", "yoavbls.pretty-ts-errors"),
  ],
  themes: [
    ext("One Dark Pro", "zhuangtongfa.Material-theme"),
    ext("Catppuccin", "Catppuccin.catppuccin-vsc"),
    ext("Material Icon Theme", "pkief.material-icon-theme"),
    ext("Tokyo Night", "enkia.tokyo-night"),
  ],
  utilities: [
    ext("Live Share", "ms-vsliveshare.vsliveshare"),
    ext("CodeSnap", "adpyke.codesnap"),
    ext("Paste JSON as Code", "quicktype.quicktype"),
    ext("Markdown Preview Enhanced", "shd101wyy.markdown-preview-enhanced"),
    ext("Peacock", "johnpapa.vscode-peacock"),
    ext("Remote - SSH", "ms-vscode-remote.remote-ssh"),
    ext("Remote - Containers", "ms-vscode-remote.remote-containers"),
  ],
};

function ExtensionCard({ name, id }: { name: string; id: string }) {
  return (
    <a
      className="flex items-center justify-between px-4 py-3 rounded-xl border border-black/8 dark:border-white/8 hover:bg-black/3 dark:hover:bg-white/3 transition-colors no-underline group"
      href={`https://marketplace.visualstudio.com/items?itemName=${id}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="text-sm font-medium text-[#1d1d1f] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {name}
      </span>
      <span className="text-[11px] font-mono text-[#aeaeb2] dark:text-[#636366]">
        {id}
      </span>
    </a>
  );
}

export default function VSCodeExtensionsContent() {
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
        Extensiones imprescindibles para VS Code
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        VS Code es increíble por sí solo, pero las extensiones son lo que lo
        convierte en un editor hecho a medida. Aquí tienes las que todo
        desarrollador debería conocer, organizadas por categoría.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogCallout type="tip">
        VS Code puede ralentizarse con demasiadas extensiones activas. Instala
        solo las que uses, y deshabilita por proyecto usando perfiles o{" "}
        <BlogInlineCode>extensions.json</BlogInlineCode>.
      </BlogCallout>

      <BlogH2 id="linting">Linting y formato</BlogH2>

      <BlogP>
        La base de un código limpio y consistente. Estas extensiones te ahorran
        discusiones de equipo y bugs tontos.
      </BlogP>

      {EXTENSIONS.linting.map((e) => (
        <ExtensionCard key={e.id} {...e} />
      ))}

      <BlogP>
        <BlogInlineCode>ESLint</BlogInlineCode> y{" "}
        <BlogInlineCode>Prettier</BlogInlineCode> son el estándar de la
        industria. <BlogInlineCode>Biome</BlogInlineCode> es una alternativa
        moderna que unifica linter y formatter en una sola herramienta, mucho
        más rápida. <BlogInlineCode>Stylelint</BlogInlineCode> es imprescindible
        si trabajas con CSS, SCSS o Tailwind.
      </BlogP>

      <BlogH2 id="git">Git y control de versiones</BlogH2>

      <BlogP>
        La integración nativa de Git en VS Code está bien, pero estas
        extensiones la llevan a otro nivel.
      </BlogP>

      {EXTENSIONS.git.map((e) => (
        <ExtensionCard key={e.id} {...e} />
      ))}

      <BlogP>
        <BlogInlineCode>GitLens</BlogInlineCode> es la más potente: blame en
        línea, exploración de repos, comparativa visual de ramas. A veces puede
        ser intensiva, pero vale cada recurso.{" "}
        <BlogInlineCode>Git Graph</BlogInlineCode> es ligera y te da una vista
        visual preciosa del historial.
      </BlogP>

      <BlogH2 id="languages">Lenguajes y frameworks</BlogH2>

      <BlogP>
        VS Code ya tiene buen soporte nativo, pero estas extensiones añaden
        IntelliSense específico, snippets y herramientas integradas.
      </BlogP>

      {EXTENSIONS.languages.map((e) => (
        <ExtensionCard key={e.id} {...e} />
      ))}

      <BlogP>
        <BlogInlineCode>Tailwind CSS IntelliSense</BlogInlineCode> es
        prácticamente obligatoria si usas Tailwind. Te da autocompletado de
        clases, previsualización de colores y linting.{" "}
        <BlogInlineCode>Thunder Client</BlogInlineCode> es un sustituto ligero
        de Postman directamente en el editor.
      </BlogP>

      <BlogH2 id="productivity">Productividad</BlogH2>

      <BlogP>
        El día a día. Extensiones pequeñas que marcan una gran diferencia en el
        flujo de trabajo.
      </BlogP>

      {EXTENSIONS.productivity.map((e) => (
        <ExtensionCard key={e.id} {...e} />
      ))}

      <BlogUl>
        <BlogLi>
          <strong>Error Lens</strong> — Muestra los errores y warnings inline,
          justo al lado del código. No más hoverear cada línea.
        </BlogLi>
        <BlogLi>
          <strong>Import Cost</strong> — Te dice el peso de cada import.
          Esencial para mantener bundles pequeños.
        </BlogLi>
        <BlogLi>
          <strong>Pretty TypeScript Errors</strong> — Transforma los errores de
          TypeScript en mensajes legibles. Una de las mejores del último año.
        </BlogLi>
        <BlogLi>
          <strong>indent-rainbow</strong> — Colorea la indentación. Parece
          trivial, pero hace que leer código anidado sea mucho más fácil.
        </BlogLi>
        <BlogLi>
          <strong>GitHub Copilot</strong> — Autocompletado con IA. Casi no
          necesita presentación.
        </BlogLi>
        <BlogLi>
          <strong>Continue.dev</strong> — Alternativa open-source a Copilot.
          Permite usar modelos locales (Ollama) y cloud, con chat contextual y
          código.
        </BlogLi>
      </BlogUl>

      <BlogH2 id="themes">Temas y estética</BlogH2>

      <BlogP>
        El editor tiene que gustarte a la vista. Pasarás muchas horas mirándolo.
      </BlogP>

      {EXTENSIONS.themes.map((e) => (
        <ExtensionCard key={e.id} {...e} />
      ))}

      <BlogP>
        <BlogInlineCode>Catppuccin</BlogInlineCode> es el favorito de la
        comunidad actualmente: tres estilos (latte, frappé, macchiato, mocha)
        con una paleta de colores equilibrada.{" "}
        <BlogInlineCode>Tokyo Night</BlogInlineCode> es ideal si te gustan los
        tonos azulados y neón.
      </BlogP>

      <BlogH2 id="utilities">Utilidades</BlogH2>

      <BlogP>
        Extensiones que no encajan en una categoría pero que terminas usando más
        de lo que esperas.
      </BlogP>

      {EXTENSIONS.utilities.map((e) => (
        <ExtensionCard key={e.id} {...e} />
      ))}

      <BlogUl>
        <BlogLi>
          <strong>Live Share</strong> — Pair programming en tiempo real.
          Compartes tu editor con otro desarrollador y podéis editar juntos.
        </BlogLi>
        <BlogLi>
          <strong>CodeSnap</strong> — Capturas de código bonitas para compartir
          en redes o documentación.
        </BlogLi>
        <BlogLi>
          <strong>Paste JSON as Code</strong> — Pega un JSON y te genera
          interfaces TypeScript, clases C#, etc.
        </BlogLi>
        <BlogLi>
          <strong>Peacock</strong> — Cambia el color de la barra lateral por
          proyecto. Muy útil cuando tienes varias ventanas de VS Code abiertas.
        </BlogLi>
        <BlogLi>
          <strong>Remote - SSH / Containers</strong> — Teletrabajo para devs:
          abre proyectos en servidores remotos o contenedores Docker como si
          fueran locales.
        </BlogLi>
      </BlogUl>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="anti">Extensiones que evitar</BlogH2>

      <BlogP>
        No todo lo que brilla es oro. Algunas extensiones populares tienen
        alternativas mejores o simplemente están abandonadas:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Bracket Pair Colorizer</strong> — Ahora es nativo de VS Code.
          Desinstálalo.
        </BlogLi>
        <BlogLi>
          <strong>Path Autocomplete</strong> — También nativo desde VS Code
          1.44.
        </BlogLi>
        <BlogLi>
          <strong>npm Intellisense</strong> — VS Code ya lo hace automáticamente
          con imports.
        </BlogLi>
        <BlogLi>
          <strong>Beautify</strong> — Obsoleto. Usa Prettier.
        </BlogLi>
        <BlogLi>
          <strong>Tslint</strong> — Deprecado. Migra a ESLint con
          @typescript-eslint.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="info">
        VS Code incluye cada vez más funcionalidades nativas. Antes de instalar
        una extensión, pregúntate si realmente la necesitas o si ya viene
        incluida.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="por-perfil">Recomendación por perfil</BlogH2>

      <BlogP>
        No todas las extensiones son para todos. Aquí tienes el combo ideal
        según tu rol:
      </BlogP>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {[
          {
            title: "Frontend",
            exts: "ESLint, Prettier, Tailwind IntelliSense, Error Lens, Import Cost, Auto Rename Tag, GitHub Copilot",
            color: "border-blue-200 dark:border-blue-900",
          },
          {
            title: "Backend",
            exts: "ESLint, Prettier, Thunder Client, SQLTools, Docker, YAML, GitLens, Pretty TS Errors",
            color: "border-emerald-200 dark:border-emerald-900",
          },
          {
            title: "Fullstack",
            exts: "La combinación de Frontend + Backend + GitLens + Live Share + Remote Containers",
            color: "border-violet-200 dark:border-violet-900",
          },
          {
            title: "IA / Data",
            exts: "GitHub Copilot, Continue.dev, Python, Jupyter, Docker, YAML, GitLens",
            color: "border-fuchsia-200 dark:border-fuchsia-900",
          },
        ].map((profile) => (
          <div
            key={profile.title}
            className={`border ${profile.color} rounded-2xl p-4 bg-white dark:bg-[#111116]`}
          >
            <h4 className="text-sm font-bold text-[#1d1d1f] dark:text-white mb-2">
              {profile.title}
            </h4>
            <p className="text-xs text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
              {profile.exts}
            </p>
          </div>
        ))}
      </div>

      <BlogP>
        Empieza con las esenciales según tu perfil y ve añadiendo según
        necesites. Menos es más: cada extensión es un proceso en segundo plano.
      </BlogP>
    </article>
  );
}
