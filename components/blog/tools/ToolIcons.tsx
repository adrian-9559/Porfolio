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
      <path d="M3 5v14M6 5v14M9 5v14M12 5v14M15 5v14M18 5v14M21 5v14" strokeLinecap="round" strokeWidth={2} />
    </svg>
  );
}

export function IconPdfToExcel({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <path d="M14 2v6h6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <path d="M8 13h2M14 13h2M8 17h2M14 17h2M10 15h4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  );
}

export function IconMarkdownPreview({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M3 5h18v14H3V5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <path d="M7 9l2 2-2 2M13 13h4M13 9h4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  );
}

export function IconJwtDecoder({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l7 4.5v5c0 5.25-3.5 9.74-7 11-3.5-1.26-7-5.75-7-11v-5L12 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  );
}

export function IconUrlEncoder({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  );
}

export function IconCronBuilder({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth={2} />
      <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  );
}

export function IconHashGenerator({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M4 9h16M4 15h16M10 3l-2 18M16 3l-2 18" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  );
}

export function IconCssGradient({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth={2} />
      <path d="M12 2a10 10 0 010 20" fill="currentColor" opacity={0.3} />
      <path d="M12 2v20" strokeWidth={2} />
    </svg>
  );
}

export function IconImageToBase64({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect height="14" rx="2" strokeWidth={2} width="18" x="3" y="5" />
      <circle cx="8.5" cy="8.5" r="1.5" strokeWidth={2} />
      <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  );
}

export function IconMockData({ className = "w-5 h-5" }: ToolIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M4 7h16M4 12h16M4 17h10" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
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
  | "mock-data";

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
};

export function getToolIcon(
  id: string,
): React.ComponentType<ToolIconProps> | null {
  return TOOL_ICON_MAP[id as ToolId] ?? null;
}
