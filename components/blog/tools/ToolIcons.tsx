"use client";

interface ToolIconProps {
  className?: string;
}

export function IconJsonFormatter({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M8 9l-3 3 3 3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M16 9l3 3-3 3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M14 4l-4 16"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export function IconUuidGenerator({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 11c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M12 13c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M12 3a9 9 0 100 18 9 9 0 000-18z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path d="M3.6 9h16.8M3.6 15h16.8" strokeLinecap="round" strokeWidth={2} />
    </svg>
  );
}

export function IconTimestampConverter({
  className = "w-5 h-5",
}: ToolIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 8v4l3 3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M3.05 11a9 9 0 1017.9 0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M12 2v2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M19.07 5l-1.41 1.41"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export function IconCaseConverter({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 7h4l3 10"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M12 7h4l3 10"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M3 17h18"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M7 3l-1 4M17 3l-1 4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export function IconDiffChecker({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <rect height="7" rx="1.5" strokeWidth={2} width="8" x="2" y="4" />
      <rect height="7" rx="1.5" strokeWidth={2} width="8" x="14" y="4" />
      <rect height="7" rx="1.5" strokeWidth={2} width="8" x="2" y="13" />
      <rect height="7" rx="1.5" strokeWidth={2} width="8" x="14" y="13" />
      <path
        d="M6 7.5h0M18 7.5h0M6 16.5h0M18 16.5h0"
        strokeLinecap="round"
        strokeWidth={2.5}
      />
    </svg>
  );
}

export function IconPdfEditor({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M14 2v6h6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M9 15l2 2 4-4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export function IconBase64({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 2l8 4.5v11L12 22l-8-4.5v-11L12 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M12 22V11"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M20 6.5L12 11 4 6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M8 9.5v5l4 2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export function IconRegexTester({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M17 3l4 4-4 4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M3 11V9a4 4 0 014-4h14"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M7 21l-4-4 4-4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M21 13v2a4 4 0 01-4 4H3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export function IconQrGenerator({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <rect height="6" strokeWidth={2} width="6" x="3" y="3" />
      <rect height="6" strokeWidth={2} width="6" x="15" y="3" />
      <rect height="6" strokeWidth={2} width="6" x="3" y="15" />
      <rect height="2" strokeWidth={2} width="2" x="7" y="7" />
      <rect height="2" strokeWidth={2} width="2" x="15" y="15" />
      <rect height="2" strokeWidth={2} width="2" x="11" y="11" />
      <rect height="2" strokeWidth={2} width="2" x="11" y="7" />
      <rect height="2" strokeWidth={2} width="2" x="7" y="11" />
      <rect height="2" strokeWidth={2} width="2" x="19" y="11" />
      <rect height="2" strokeWidth={2} width="2" x="11" y="19" />
    </svg>
  );
}

export function IconPaletteGenerator({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.1 0 2-.9 2-2 0-.51-.2-.98-.54-1.34-.33-.35-.53-.82-.53-1.32 0-1.1.9-2 2-2h2.36c3.08 0 5.64-2.56 5.64-5.72C22.93 5.68 18.17 2 12 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <circle cx="7.5" cy="11.5" fill="currentColor" r="1.5" />
      <circle cx="10.5" cy="7.5" fill="currentColor" r="1.5" />
      <circle cx="15.5" cy="7.5" fill="currentColor" r="1.5" />
      <circle cx="18" cy="11.5" fill="currentColor" r="1.5" />
    </svg>
  );
}

export function IconColorTool({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0L12 2.69z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <circle cx="12" cy="12" r="3" strokeWidth={2} />
    </svg>
  );
}

export function IconPassword({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 2l7 4.5v5c0 5.25-3.5 9.74-7 11-3.5-1.26-7-5.75-7-11v-5L12 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M9 12l2 2 4-4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export function IconSqlBuilder({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M4 17l6-5-6-5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M12 19h8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M12 3v4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M8 7l4-4 4 4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export function IconJsonToTs({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M8 9l-3 3 3 3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M16 9l3 3-3 3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M14 4l-4 16"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M5 20h14"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export function IconHtmlEntity({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
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
  );
}

export function IconLoremIpsum({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M4 6h16M4 12h16M4 18h10"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export function IconRegexVisualizer({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <circle cx="12" cy="12" r="3" strokeWidth={2} />
    </svg>
  );
}

export function IconBarcodeGenerator({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M3 5v14M6 5v14M9 5v14M12 5v14M15 5v14M18 5v14M21 5v14"
        strokeLinecap="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export function IconPdfToExcel({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M14 2v6h6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M8 13h2M14 13h2M8 17h2M14 17h2M10 15h4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export function IconMarkdownPreview({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M3 5h18v14H3V5z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M7 9l2 2-2 2M13 13h4M13 9h4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export function IconJwtDecoder({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 2l7 4.5v5c0 5.25-3.5 9.74-7 11-3.5-1.26-7-5.75-7-11v-5L12 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M9 12l2 2 4-4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export function IconUrlEncoder({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export function IconCronBuilder({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" strokeWidth={2} />
      <path
        d="M12 6v6l4 2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export function IconHashGenerator({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M4 9h16M4 15h16M10 3l-2 18M16 3l-2 18"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export function IconCssGradient({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" strokeWidth={2} />
      <path d="M12 2a10 10 0 010 20" fill="currentColor" opacity={0.3} />
      <path d="M12 2v20" strokeWidth={2} />
    </svg>
  );
}

export function IconImageToBase64({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <rect height="14" rx="2" strokeWidth={2} width="18" x="3" y="5" />
      <circle cx="8.5" cy="8.5" r="1.5" strokeWidth={2} />
      <path
        d="M21 15l-5-5L5 21"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export function IconMockData({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M4 7h16M4 12h16M4 17h10"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <circle cx="19" cy="17" r="2" strokeWidth={2} />
      <circle cx="19" cy="12" r="2" strokeWidth={2} />
    </svg>
  );
}

export type ToolId =
  | "json-formatter"
  | "uuid-generator"
  | "timestamp-converter"
  | "case-converter"
  | "diff-checker"
  | "pdf-editor"
  | "pdf-to-excel"
  | "base64"
  | "regex-tester"
  | "qr-generator"
  | "palette-generator"
  | "color-tool"
  | "password"
  | "sql-builder"
  | "json-to-ts"
  | "html-entity"
  | "lorem-ipsum"
  | "regex-visualizer"
  | "barcode-generator"
  | "markdown-preview"
  | "jwt-decoder"
  | "url-encoder-decoder"
  | "cron-builder"
  | "hash-generator"
  | "css-gradient"
  | "image-to-base64"
  | "mock-data"
  | "design-showcase"
  | "unit-converter"
  | "tip-calculator"
  | "countdown-timer"
  | "pomodoro-timer"
  | "bmi-calculator"
  | "world-clock"
  | "issue-tracker"
  | "json-yaml"
  | "json-csv"
  | "code-minifier"
  | "regex-cheatsheet"
  | "markdown-html"
  | "text-counter"
  | "box-shadow"
  | "image-compressor"
  | "favicon-generator"
  | "og-image-generator"
  | "password-analyzer"
  | "wifi-qr"
  | "background-remover";

// ── Missing icons ────────────────────────────────────────────────────────────

export function IconUnitConverter({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  );
}

export function IconTipCalculator({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  );
}

export function IconCountdownTimer({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  );
}

export function IconPomodoroTimer({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  );
}

export function IconBmiCalculator({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  );
}

export function IconWorldClock({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  );
}

export function IconIssueTracker({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  );
}

export function IconJsonYaml({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M4 6h16M4 10h16M4 14h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  );
}

export function IconJsonCsv({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  );
}

export function IconCodeMinifier({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  );
}

export function IconRegexCheatsheet({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  );
}

export function IconMarkdownHtml({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  );
}

export function IconTextCounter({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  );
}

export function IconBoxShadow({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  );
}

export function IconImageCompressor({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  );
}

export function IconFaviconGenerator({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
      <circle cx="12" cy="13" r="3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  );
}

export function IconOgImageGenerator({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  );
}

export function IconPasswordAnalyzer({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  );
}

export function IconWifiQr({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  );
}

export function IconBackgroundRemover({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
      <path d="M9 3l-6 6M15 3l6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  );
}

export function IconDesignShowcase({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10-1a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1v-4a1 1 0 00-1-1h-4z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
}

const TOOL_ICON_MAP: Record<ToolId, React.ComponentType<ToolIconProps>> = {
  "json-formatter": IconJsonFormatter,
  "uuid-generator": IconUuidGenerator,
  "timestamp-converter": IconTimestampConverter,
  "case-converter": IconCaseConverter,
  "diff-checker": IconDiffChecker,
  "pdf-editor": IconPdfEditor,
  "pdf-to-excel": IconPdfToExcel,
  base64: IconBase64,
  "regex-tester": IconRegexTester,
  "qr-generator": IconQrGenerator,
  "palette-generator": IconPaletteGenerator,
  "color-tool": IconColorTool,
  password: IconPassword,
  "sql-builder": IconSqlBuilder,
  "json-to-ts": IconJsonToTs,
  "html-entity": IconHtmlEntity,
  "lorem-ipsum": IconLoremIpsum,
  "regex-visualizer": IconRegexVisualizer,
  "barcode-generator": IconBarcodeGenerator,
  "markdown-preview": IconMarkdownPreview,
  "jwt-decoder": IconJwtDecoder,
  "url-encoder-decoder": IconUrlEncoder,
  "cron-builder": IconCronBuilder,
  "hash-generator": IconHashGenerator,
  "css-gradient": IconCssGradient,
  "image-to-base64": IconImageToBase64,
  "mock-data": IconMockData,
  "design-showcase": IconDesignShowcase,
  "unit-converter": IconUnitConverter,
  "tip-calculator": IconTipCalculator,
  "countdown-timer": IconCountdownTimer,
  "pomodoro-timer": IconPomodoroTimer,
  "bmi-calculator": IconBmiCalculator,
  "world-clock": IconWorldClock,
  "issue-tracker": IconIssueTracker,
  "json-yaml": IconJsonYaml,
  "json-csv": IconJsonCsv,
  "code-minifier": IconCodeMinifier,
  "regex-cheatsheet": IconRegexCheatsheet,
  "markdown-html": IconMarkdownHtml,
  "text-counter": IconTextCounter,
  "box-shadow": IconBoxShadow,
  "image-compressor": IconImageCompressor,
  "favicon-generator": IconFaviconGenerator,
  "og-image-generator": IconOgImageGenerator,
  "password-analyzer": IconPasswordAnalyzer,
  "wifi-qr": IconWifiQr,
  "background-remover": IconBackgroundRemover,
};

export function getToolIcon(
  id: string,
): React.ComponentType<ToolIconProps> | null {
  return TOOL_ICON_MAP[id as ToolId] ?? null;
}
