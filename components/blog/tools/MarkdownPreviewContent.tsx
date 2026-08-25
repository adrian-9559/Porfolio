"use client";
import { useState, useCallback } from "react";
import { useT } from "@/hooks/useT";
import { copyToClipboard } from "@/lib/clipboard";

const TOOLBAR_BUTTONS = [
  { id: "bold", icon: "B", wrap: ["**", "**"] as const },
  { id: "italic", icon: "I", wrap: ["_", "_"] as const },
  { id: "heading", icon: "H", wrap: ["## ", ""] as const },
  { id: "link", icon: "🔗", wrap: ["[", "](url)"] as const },
  { id: "code", icon: "<>", wrap: ["`", "`"] as const },
  { id: "list", icon: "•", wrap: ["- ", ""] as const },
  { id: "quote", icon: "❝", wrap: ["> ", ""] as const },
  { id: "hr", icon: "—", wrap: ["\n---\n", ""] as const },
  { id: "img", icon: "🖼", wrap: ["![alt](", ")"] as const },
] as const;

const SAMPLE_MARKDOWN = `# Welcome to Markdown Preview

This is a **live preview** tool. Type on the left, see rendered HTML on the right.

## Features

- **Bold text** and *italic text*
- [Links](https://example.com) and images
- \`inline code\` and code blocks
- Blockquotes and horizontal rules

## Code Example

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

> "The best way to predict the future is to invent it." — Alan Kay

---

### Lists

1. First item
2. Second item
3. Third item

- Unordered one
- Unordered two
- Unordered three
`;

function parseMarkdown(md: string): string {
  let html = md;

  // Code blocks (fenced) — must come before inline code
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const escaped = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    return `<pre class="p-4 rounded-lg bg-black/5 dark:bg-white/5 overflow-x-auto text-sm font-mono"><code class="language-${lang}">${escaped}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-sm font-mono">$1</code>');

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full rounded-lg" />');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-indigo-600 dark:text-indigo-400 underline hover:no-underline" target="_blank" rel="noopener noreferrer">$1</a>');

  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-[#1d1d1f] dark:text-white mt-6 mb-2">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-[#1d1d1f] dark:text-white mt-8 mb-3">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-[#1d1d1f] dark:text-white mt-8 mb-4">$1</h1>');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="my-6 border-black/10 dark:border-white/10" />');

  // Blockquotes
  html = html.replace(/^&gt; (.+)$/gm, '<blockquote class="pl-4 border-l-4 border-indigo-300 dark:border-indigo-700 text-[#6e6e73] dark:text-[#86868b] italic my-2">$1</blockquote>');

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong class="font-bold"><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');
  html = html.replace(/_(.+?)_/g, '<em class="italic">$1</em>');

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-[#1d1d1f] dark:text-white">$1</li>');

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal text-[#1d1d1f] dark:text-white">$1</li>');

  // Wrap consecutive <li> in <ul>/<ol>
  html = html.replace(/((?:<li class="ml-4 list-disc[^"]*">.*<\/li>\n?)+)/g, '<ul class="my-2 space-y-1">$1</ul>');
  html = html.replace(/((?:<li class="ml-4 list-decimal[^"]*">.*<\/li>\n?)+)/g, '<ol class="my-2 space-y-1">$1</ol>');

  // Paragraphs (double newline)
  html = html.replace(/\n\n/g, '</p><p class="mb-3 text-[#1d1d1f] dark:text-white leading-relaxed">');

  // Single newlines to <br>
  html = html.replace(/\n/g, '<br />');

  // Wrap in paragraph
  html = `<p class="mb-3 text-[#1d1d1f] dark:text-white leading-relaxed">${html}</p>`;

  return html;
}

export default function MarkdownPreviewContent() {
  const { t } = useT();
  const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN);
  const [copied, setCopied] = useState(false);

  const html = parseMarkdown(markdown);

  const insertWrap = useCallback(
    (before: string, after: string) => {
      const ta = document.querySelector<HTMLTextAreaElement>("#md-editor");

      if (!ta) return;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const selected = markdown.substring(start, end);
      const replacement = before + selected + after;
      const next = markdown.substring(0, start) + replacement + markdown.substring(end);

      setMarkdown(next);
      setTimeout(() => {
        ta.focus();
        ta.selectionStart = start + before.length;
        ta.selectionEnd = start + before.length + selected.length;
      }, 0);
    },
    [markdown],
  );

  const copy = async () => {
    if (await copyToClipboard(markdown)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50">
            {t("blog.markdownPreview.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.markdownPreview.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.markdownPreview.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.markdownPreview.desc")}
        </p>
      </div>

      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.04]">
          {TOOLBAR_BUTTONS.map((btn) => (
            <button
              key={btn.id}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/8 dark:hover:bg-white/8 transition-colors"
              title={btn.id}
              onClick={() => insertWrap(btn.wrap[0], btn.wrap[1])}
            >
              {btn.icon}
            </button>
          ))}
          <div className="flex-1" />
          <button
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
            onClick={copy}
          >
            {copied ? t("blog.markdownPreview.copied") : t("blog.markdownPreview.copy")}
          </button>
        </div>

        {/* Split pane */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              {t("blog.markdownPreview.markdown")}
            </p>
            <textarea
              id="md-editor"
              className="w-full h-80 p-3 text-xs font-mono rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white resize-none focus:outline-none focus:border-indigo-400 dark:focus:border-indigo-600 transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
              placeholder={t("blog.markdownPreview.placeholder")}
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              {t("blog.markdownPreview.preview")}
            </p>
            <div
              className="w-full h-80 p-4 overflow-auto text-sm rounded-xl bg-[#f5f5f7] dark:bg-[#1c1c22] border border-black/8 dark:border-white/8 prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
