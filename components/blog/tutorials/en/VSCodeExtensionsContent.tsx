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

export default function VSCodeExtensionsContentEn() {
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
          Article
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
        Essential VS Code Extensions
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        VS Code is amazing on its own, but extensions are what turn it into a
        custom-built editor. Here are the ones every developer should know
        about, organized by category.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogCallout type="tip">
        VS Code can slow down with too many active extensions. Only install what
        you use, and disable per project using profiles or{" "}
        <BlogInlineCode>extensions.json</BlogInlineCode>.
      </BlogCallout>

      <BlogH2 id="linting">Linting and formatting</BlogH2>

      <BlogP>
        The foundation of clean, consistent code. These extensions save you from
        team debates and silly bugs.
      </BlogP>

      {EXTENSIONS.linting.map((e) => (
        <ExtensionCard key={e.id} {...e} />
      ))}

      <BlogP>
        <BlogInlineCode>ESLint</BlogInlineCode> and{" "}
        <BlogInlineCode>Prettier</BlogInlineCode> are the industry standard.{" "}
        <BlogInlineCode>Biome</BlogInlineCode> is a modern alternative that
        unifies linting and formatting in a single, much faster tool.{" "}
        <BlogInlineCode>Stylelint</BlogInlineCode> is essential if you work with
        CSS, SCSS, or Tailwind.
      </BlogP>

      <BlogH2 id="git">Git and version control</BlogH2>

      <BlogP>
        VS Code's built-in Git integration is decent, but these extensions take
        it to another level.
      </BlogP>

      {EXTENSIONS.git.map((e) => (
        <ExtensionCard key={e.id} {...e} />
      ))}

      <BlogP>
        <BlogInlineCode>GitLens</BlogInlineCode> is the most powerful: inline
        blame, repo exploration, visual branch comparison. It can be
        resource-intensive, but it is worth every bit.{" "}
        <BlogInlineCode>Git Graph</BlogInlineCode> is lightweight and gives you
        a beautiful visual history view.
      </BlogP>

      <BlogH2 id="languages">Languages and frameworks</BlogH2>

      <BlogP>
        VS Code already has good native support, but these extensions add
        specific IntelliSense, snippets, and integrated tools.
      </BlogP>

      {EXTENSIONS.languages.map((e) => (
        <ExtensionCard key={e.id} {...e} />
      ))}

      <BlogP>
        <BlogInlineCode>Tailwind CSS IntelliSense</BlogInlineCode> is
        practically mandatory if you use Tailwind. It provides class
        autocompletion, color previews, and linting.{" "}
        <BlogInlineCode>Thunder Client</BlogInlineCode> is a lightweight Postman
        alternative right inside your editor.
      </BlogP>

      <BlogH2 id="productivity">Productivity</BlogH2>

      <BlogP>
        The daily drivers. Small extensions that make a huge difference in your
        workflow.
      </BlogP>

      {EXTENSIONS.productivity.map((e) => (
        <ExtensionCard key={e.id} {...e} />
      ))}

      <BlogUl>
        <BlogLi>
          <strong>Error Lens</strong> — Shows errors and warnings inline, right
          next to your code. No more hovering every line.
        </BlogLi>
        <BlogLi>
          <strong>Import Cost</strong> — Tells you the size of each import.
          Essential for keeping bundles lean.
        </BlogLi>
        <BlogLi>
          <strong>Pretty TypeScript Errors</strong> — Transforms TypeScript
          errors into human-readable messages. One of the best extensions of the
          past year.
        </BlogLi>
        <BlogLi>
          <strong>indent-rainbow</strong> — Colorizes indentation. Sounds
          trivial, but makes nested code much easier to read.
        </BlogLi>
        <BlogLi>
          <strong>GitHub Copilot</strong> — AI-powered autocomplete. Needs no
          introduction.
        </BlogLi>
        <BlogLi>
          <strong>Continue.dev</strong> — Open-source Copilot alternative. Use
          local models (Ollama) and cloud, with contextual chat and code
          generation.
        </BlogLi>
      </BlogUl>

      <BlogH2 id="themes">Themes and aesthetics</BlogH2>

      <BlogP>
        Your editor has to look good. You will spend many hours staring at it.
      </BlogP>

      {EXTENSIONS.themes.map((e) => (
        <ExtensionCard key={e.id} {...e} />
      ))}

      <BlogP>
        <BlogInlineCode>Catppuccin</BlogInlineCode> is the current community
        favorite: four styles (latte, frappé, macchiato, mocha) with a balanced
        color palette. <BlogInlineCode>Tokyo Night</BlogInlineCode> is ideal if
        you like blueish tones and neon accents.
      </BlogP>

      <BlogH2 id="utilities">Utilities</BlogH2>

      <BlogP>
        Extensions that do not fit a single category but end up being used more
        than you would expect.
      </BlogP>

      {EXTENSIONS.utilities.map((e) => (
        <ExtensionCard key={e.id} {...e} />
      ))}

      <BlogUl>
        <BlogLi>
          <strong>Live Share</strong> — Real-time pair programming. Share your
          editor with another developer and edit together.
        </BlogLi>
        <BlogLi>
          <strong>CodeSnap</strong> — Beautiful code screenshots for social
          media or documentation.
        </BlogLi>
        <BlogLi>
          <strong>Paste JSON as Code</strong> — Paste JSON and generate
          TypeScript interfaces, C# classes, and more.
        </BlogLi>
        <BlogLi>
          <strong>Peacock</strong> — Change the sidebar color per project. Very
          useful when you have multiple VS Code windows open.
        </BlogLi>
        <BlogLi>
          <strong>Remote - SSH / Containers</strong> — Remote work for devs:
          open projects on remote servers or Docker containers as if they were
          local.
        </BlogLi>
      </BlogUl>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="anti">Extensions to avoid</BlogH2>

      <BlogP>
        Not everything that shines is gold. Some popular extensions have better
        alternatives or are simply abandoned:
      </BlogP>

      <BlogUl>
        <BlogLi>
          <strong>Bracket Pair Colorizer</strong> — Now native in VS Code.
          Uninstall it.
        </BlogLi>
        <BlogLi>
          <strong>Path Autocomplete</strong> — Also native since VS Code 1.44.
        </BlogLi>
        <BlogLi>
          <strong>npm Intellisense</strong> — VS Code already does this
          automatically with imports.
        </BlogLi>
        <BlogLi>
          <strong>Beautify</strong> — Deprecated. Use Prettier.
        </BlogLi>
        <BlogLi>
          <strong>Tslint</strong> — Deprecated. Migrate to ESLint with
          @typescript-eslint.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="info">
        VS Code keeps adding more native features. Before installing an
        extension, ask yourself if you really need it or if it is already
        built-in.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="by-role">Recommendations by role</BlogH2>

      <BlogP>
        Not every extension is for everyone. Here is the ideal combo for your
        role:
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
            exts: "Frontend + Backend combo + GitLens + Live Share + Remote Containers",
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
        Start with the essentials for your role and add more as needed. Less is
        more: every extension is a background process.
      </BlogP>
    </article>
  );
}
