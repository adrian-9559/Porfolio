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

export default function VSCodeConfigContentEn() {
  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 text-xs text-[#aeaeb2] dark:text-[#636366] mb-4">
        <span className="flex items-center gap-1">
          <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          </svg>
          Article
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
        Customize VS Code Like a Pro
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        A complete guide to turning VS Code into your ideal editor. From essential settings.json tweaks to profiles, shortcuts, and sync.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="settings-json">settings.json: the heart of configuration</BlogH2>

      <BlogP>
        The <BlogInlineCode>settings.json</BlogInlineCode> file is where the magic happens. Open it via <BlogInlineCode>Cmd+Shift+P</BlogInlineCode> and search for "Preferences: Open User Settings (JSON)". Here is a solid starting configuration:
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
        If you use multiple machines, plug this settings.json into Settings Sync. All your machines will share the same config instantly.
      </BlogCallout>

      <BlogH2 id="theme-color">Theme and color</BlogH2>

      <BlogP>
        VS Code lets you customize every visual aspect. Pick a theme from the marketplace, then override specific colors:
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
        The <BlogInlineCode>workbench.colorCustomizations</BlogInlineCode> object lets you fine-tune colors per theme. Run <BlogInlineCode>Cmd+Shift+P</BlogInlineCode> → "Developer: Generate Color Theme From Current Settings" to see all available tokens.
      </BlogP>

      <BlogH2 id="keybindings">keybindings.json: your shortcuts, your rhythm</BlogH2>

      <BlogP>
        The default shortcuts are fine, but the best ones are yours. Press <BlogInlineCode>Cmd+K Cmd+S</BlogInlineCode> and search for "Open Keyboard Shortcuts (JSON)":
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
        These shortcuts cover 90% of daily work: multiple cursors, moving lines, toggling comments, and incremental selection. Learn them and you will feel the difference.
      </BlogP>

      <BlogH2 id="workspace-vs-user">Workspace vs User settings</BlogH2>

      <BlogP>
        VS Code has three configuration levels:
      </BlogP>

      <BlogUl>
        <BlogLi><strong>User settings</strong> — global, apply to every project. Ideal for font, theme, shortcuts.</BlogLi>
        <BlogLi><strong>Workspace settings</strong> — inside <BlogInlineCode>.vscode/settings.json</BlogInlineCode> within the project. Shared in the repo. Ideal for formatter, linter, team rules.</BlogLi>
        <BlogLi><strong>Folder settings</strong> — when you have multi-root projects, each folder can have its own settings.</BlogLi>
      </BlogUl>

      <BlogP>
        Workspace settings override user settings. Only put project-specific config in workspace:
      </BlogP>

      <BlogCode>{`// .vscode/settings.json (shared in the repo)
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.configRegex": [],
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}`}</BlogCode>

      <BlogCallout type="warn">
        Do not put personal config (font, theme, shortcuts) in workspace settings. Every team member should use their own.
      </BlogCallout>

      <BlogH2 id="extension-recommendations">Extension recommendations per project</BlogH2>

      <BlogP>
        You can recommend extensions to your team via <BlogInlineCode>.vscode/extensions.json</BlogInlineCode>. When someone opens the project, VS Code will suggest installing them:
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

      <BlogH2 id="profiles">Profiles</BlogH2>

      <BlogP>
        Since VS Code 1.76 you can create independent profiles with their own settings, keybindings, and extensions. Perfect if you work in multiple roles:
      </BlogP>

      <BlogUl>
        <BlogLi><strong>Frontend</strong> — extensions: ESLint, Prettier, Tailwind CSS IntelliSense, ES7+ React snippets. Theme: One Dark Pro.</BlogLi>
        <BlogLi><strong>Backend</strong> — extensions: Thunder Client, SQLTools, Docker, YAML. Theme: Catppuccin Mocha.</BlogLi>
        <BlogLi><strong>IA / Data</strong> — extensions: GitHub Copilot, Continue.dev, Jupyter, Python. Theme: GitHub Dark Default.</BlogLi>
        <BlogLi><strong>General</strong> — the default profile, clean and minimal.</BlogLi>
      </BlogUl>

      <BlogP>
        To create a profile: <BlogInlineCode>Cmd+Shift+P</BlogInlineCode> → "Profiles: Create Profile". You can export it to a file and share it with your team.
      </BlogP>

      <BlogH2 id="settings-sync">Settings Sync</BlogH2>

      <BlogP>
        Turn on Settings Sync with your GitHub account to bring your config to every machine. It syncs:
      </BlogP>

      <BlogUl>
        <BlogLi>settings.json and keybindings.json</BlogLi>
        <BlogLi>Installed extensions</BlogLi>
        <BlogLi>User snippets</BlogLi>
        <BlogLi>UI themes and configurations</BlogLi>
        <BlogLi>Window tiles (layouts)</BlogLi>
      </BlogUl>

      <BlogP>
        Activate it via <BlogInlineCode>Cmd+Shift+P</BlogInlineCode> → "Settings Sync: Turn On". VS Code uploads changes automatically. If something breaks, you can restore previous versions from "Settings Sync: Show Synced Data".
      </BlogP>

      <BlogCallout type="info">
        Settings Sync stores your data on Microsoft servers linked to your GitHub account. It does not include project data, only editor configuration.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="checklist">Quick checklist</BlogH2>

      <BlogP>
        Starting from scratch? Follow this order:
      </BlogP>

      <BlogUl>
        <BlogLi>1. Pick a theme from the marketplace (One Dark Pro, Catppuccin, GitHub Dark)</BlogLi>
        <BlogLi>2. Set up a font with ligatures (JetBrains Mono, Cascadia Code)</BlogLi>
        <BlogLi>3. Basic settings.json: formatOnSave, bracket pair colors, font</BlogLi>
        <BlogLi>4. Install your must-have extensions</BlogLi>
        <BlogLi>5. Add custom keybindings</BlogLi>
        <BlogLi>6. Turn on Settings Sync</BlogLi>
        <BlogLi>7. Create profiles if you work in multiple roles</BlogLi>
      </BlogUl>

      <BlogP>
        VS Code is yours. Every tweak you make is time you get back tomorrow. Spend an hour setting it up right and it will transform your daily workflow.
      </BlogP>
    </article>
  );
}