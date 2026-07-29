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

export default function VSCodeConfigContent() {
  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 text-xs text-[#aeaeb2] dark:text-[#636366] mb-4">
        <span className="flex items-center gap-1">
          <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          </svg>
          Artículo
        </span>
        <span className="w-1 h-1 rounded-full bg-[#aeaeb2]" />
        <span className="flex items-center gap-1">
          <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          </svg>
          8 min
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3" style={{ letterSpacing: "-0.03em" }}>
        Personaliza VS Code como un pro
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Guía completa para transformar VS Code en tu editor ideal. Desde los ajustes esenciales en settings.json hasta perfiles, atajos y sincronización.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="settings-json">settings.json: el corazón de la configuración</BlogH2>

      <BlogP>
        El archivo <BlogInlineCode>settings.json</BlogInlineCode> es donde ocurre la magia. Puedes abrirlo con <BlogInlineCode>Cmd+Shift+P</BlogInlineCode> y buscar "Preferences: Open User Settings (JSON)". Aquí tienes una configuración de partida sólida:
      </BlogP>

      <BlogCode>{`{
  "editor.fontFamily": "'JetBrains Mono', 'Cascadia Code', 'Fira Code', monospace",
  "editor.fontSize": 14,
  "editor.fontLigatures": true,
  "editor.lineHeight": 1.6,
  "editor.letterSpacing": 0.5,

  "editor.minimap.enabled": true,
  "editor.minimap.side": "right",
  "editor.minimap.scale": 1,

  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": true,
  "editor.cursorBlinking": "smooth",
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.smoothScrolling": true,
  "editor.renderWhitespace": "boundary",
  "editor.rulers": [80, 100],

  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "always",
    "source.organizeImports": "always"
  },

  "editor.wordWrap": "on",
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "files.autoSave": "onFocusChange",
  "workbench.startupEditor": "none",
  "extensions.ignoreRecommendations": false
}`}</BlogCode>

      <BlogCallout type="tip">
        Si usas varias máquinas, pon este settings.json en Settings Sync. Así todas tus máquinas tendrán la misma configuración al instante.
      </BlogCallout>

      <BlogH2 id="tema-color">Tema y color</BlogH2>

      <BlogP>
        VS Code permite personalizar cada aspecto visual. Puedes elegir un tema de la tienda y luego sobreescribir colores concretos:
      </BlogP>

      <BlogCode>{`"workbench.colorTheme": "One Dark Pro Darker",
"workbench.iconTheme": "material-icon-theme",
"workbench.colorCustomizations": {
  "[One Dark Pro Darker]": {
    "editor.background": "#1a1a1a",
    "sideBar.background": "#141414",
    "activityBar.background": "#111111",
    "tab.activeBackground": "#1a1a1a",
    "editorLineNumber.activeForeground": "#abb2bf"
  }
}`}</BlogCode>

      <BlogP>
        El objeto <BlogInlineCode>workbench.colorCustomizations</BlogInlineCode> te permite afinar colores por tema. Usa <BlogInlineCode>Cmd+Shift+P</BlogInlineCode> → "Developer: Generate Color Theme From Current Settings" para ver todos los tokens disponibles.
      </BlogP>

      <BlogH2 id="keybindings">keybindings.json: tus atajos, tu ritmo</BlogH2>

      <BlogP>
        Los atajos por defecto están bien, pero los mejores son los tuyos. Abre <BlogInlineCode>Cmd+K Cmd+S</BlogInlineCode> y busca "Open Keyboard Shortcuts (JSON)":
      </BlogP>

      <BlogCode>{`[
  {
    "key": "ctrl+shift+up",
    "command": "editor.action.insertCursorAbove",
    "when": "editorTextFocus"
  },
  {
    "key": "ctrl+shift+down",
    "command": "editor.action.insertCursorBelow",
    "when": "editorTextFocus"
  },
  {
    "key": "alt+up",
    "command": "editor.action.moveLinesUpAction",
    "when": "editorTextFocus"
  },
  {
    "key": "alt+down",
    "command": "editor.action.moveLinesDownAction",
    "when": "editorTextFocus"
  },
  {
    "key": "cmd+shift+7",
    "command": "editor.action.commentLine",
    "when": "editorTextFocus && !editorReadonly"
  },
  {
    "key": "cmd+d",
    "command": "editor.action.addSelectionToNextFindMatch",
    "when": "editorFocus"
  }
]`}</BlogCode>

      <BlogP>
        Estos atajos cubren el 90% del día a día: cursores múltiples, mover líneas, comentar y selección incremental. Memorízalos y notarás la diferencia.
      </BlogP>

      <BlogH2 id="workspace-vs-user">Workspace vs User settings</BlogH2>

      <BlogP>
        VS Code tiene tres niveles de configuración:
      </BlogP>

      <BlogUl>
        <BlogLi><strong>User settings</strong> — globales, aplican a todos los proyectos. Ideal para fuente, tema, atajos.</BlogLi>
        <BlogLi><strong>Workspace settings</strong> — en <BlogInlineCode>.vscode/settings.json</BlogInlineCode> dentro del proyecto. Se comparte en el repo. Ideal para formatter, linter, reglas del equipo.</BlogLi>
        <BlogLi><strong>Folder settings</strong> — cuando tienes proyectos multi-root, cada carpeta puede tener sus propios settings.</BlogLi>
      </BlogUl>

      <BlogP>
        Las workspace settings sobreescriben a las user settings. Es buena práctica poner en workspace solo lo que es específico del proyecto:
      </BlogP>

      <BlogCode>{`// .vscode/settings.json (se comparte en el repo)
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.configRegex": [],
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}`}</BlogCode>

      <BlogCallout type="warn">
        No pongas configuración personal (fuente, tema, atajos) en workspace settings. Cada miembro del equipo debe poder usar los suyos.
      </BlogCallout>

      <BlogH2 id="extension-recommendations">Recomendaciones de extensiones por proyecto</BlogH2>

      <BlogP>
        Puedes recomendar extensiones a tu equipo desde <BlogInlineCode>.vscode/extensions.json</BlogInlineCode>. Cuando alguien abra el proyecto, VS Code le sugerirá instalarlas:
      </BlogP>

      <BlogCode>{`// .vscode/extensions.json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "github.copilot"
  ]
}`}</BlogCode>

      <BlogH2 id="profiles">Perfiles (Profiles)</BlogH2>

      <BlogP>
        Desde VS Code 1.76 puedes crear perfiles independientes con su propio conjunto de settings, keybindings y extensiones. Son ideales si trabajas en varios roles:
      </BlogP>

      <BlogUl>
        <BlogLi><strong>Frontend</strong> — extensiones: ESLint, Prettier, Tailwind CSS IntelliSense, ES7+ React snippets. Tema: One Dark Pro.</BlogLi>
        <BlogLi><strong>Backend</strong> — extensiones: Thunder Client, SQLTools, Docker, YAML. Tema: Catppuccin Mocha.</BlogLi>
        <BlogLi><strong>IA / Data</strong> — extensiones: GitHub Copilot, Continue.dev, Jupyter, Python. Tema: GitHub Dark Default.</BlogLi>
        <BlogLi><strong>General</strong> — el perfil por defecto, limpio y minimalista.</BlogLi>
      </BlogUl>

      <BlogP>
        Para crear un perfil: <BlogInlineCode>Cmd+Shift+P</BlogInlineCode> → "Profiles: Create Profile". Puedes exportarlo a un archivo y compartirlo con tu equipo.
      </BlogP>

      <BlogH2 id="settings-sync">Settings Sync</BlogH2>

      <BlogP>
        Activa Settings Sync con tu cuenta de GitHub para llevar la configuración a todas tus máquinas. Sincroniza:
      </BlogP>

      <BlogUl>
        <BlogLi>settings.json y keybindings.json</BlogLi>
        <BlogLi>Extensiones instaladas</BlogLi>
        <BlogLi>Fragmentos (snippets)</BlogLi>
        <BlogLi>Temas y configuraciones de UI</BlogLi>
        <BlogLi>Tiles (layouts de ventana)</BlogLi>
      </BlogUl>

      <BlogP>
        Actívalo desde <BlogInlineCode>Cmd+Shift+P</BlogInlineCode> → "Settings Sync: Turn On". VS Code sube los cambios automáticamente. Si algo se rompe, puedes recuperar versiones anteriores desde el comando "Settings Sync: Show Synced Data".
      </BlogP>

      <BlogCallout type="info">
        Settings Sync almacena tus datos en los servidores de Microsoft asociados a tu cuenta de GitHub. No incluye datos del proyecto, solo configuración del editor.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="checklist">Checklist rápido</BlogH2>

      <BlogP>
        Si empiezas de cero, por este orden:
      </BlogP>

      <BlogUl>
        <BlogLi>1. Elige un tema de la tienda (One Dark Pro, Catppuccin, GitHub Dark)</BlogLi>
        <BlogLi>2. Configura fuente con ligaduras (JetBrains Mono, Cascadia Code)</BlogLi>
        <BlogLi>3. settings.json básico: formatOnSave, bracket pair colors, font</BlogLi>
        <BlogLi>4. Instala tus extensiones imprescindibles</BlogLi>
        <BlogLi>5. Añade keybindings personalizados</BlogLi>
        <BlogLi>6. Activa Settings Sync</BlogLi>
        <BlogLi>7. Crea perfiles si trabajas en múltiples roles</BlogLi>
      </BlogUl>

      <BlogP>
        VS Code es tuyo. Cada ajuste que hagas es tiempo que recuperas mañana. Dedica una hora a configurarlo bien y te cambiará el día a día.
      </BlogP>
    </article>
  );
}