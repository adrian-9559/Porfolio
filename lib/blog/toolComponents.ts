import type { ComponentType } from "react";

import dynamic from "next/dynamic";

const TOOL_COMPONENT_MAP: Record<
  string,
  () => Promise<{ default: ComponentType }>
> = {
  "color-tool": () => import("@/components/blog/tools/ColorToolContent"),
  "palette-generator": () =>
    import("@/components/blog/tools/PaletteGeneratorContent"),
  "css-gradient": () => import("@/components/blog/tools/CssGradientContent"),
  "design-showcase": () =>
    import("@/components/blog/tools/DesignShowcaseContent"),
  "box-shadow": () => import("@/components/blog/tools/BoxShadowContent"),
  "contrast-checker": () =>
    import("@/components/blog/tools/ContrastCheckerContent"),

  "diff-checker": () => import("@/components/blog/tools/DiffCheckerContent"),
  "case-converter": () =>
    import("@/components/blog/tools/CaseConverterContent"),
  "regex-tester": () => import("@/components/blog/tools/RegexTesterContent"),
  "markdown-preview": () =>
    import("@/components/blog/tools/MarkdownPreviewContent"),
  "html-entity": () => import("@/components/blog/tools/HtmlEntityContent"),
  "regex-visualizer": () =>
    import("@/components/blog/tools/RegexVisualizerContent"),
  "code-minifier": () => import("@/components/blog/tools/CodeMinifierContent"),
  "regex-cheatsheet": () =>
    import("@/components/blog/tools/RegexCheatsheetContent"),
  "markdown-html": () => import("@/components/blog/tools/MarkdownHtmlContent"),
  "text-counter": () => import("@/components/blog/tools/TextCounterContent"),

  base64: () => import("@/components/blog/tools/Base64Content"),
  "json-formatter": () =>
    import("@/components/blog/tools/JsonFormatterContent"),
  "timestamp-converter": () =>
    import("@/components/blog/tools/TimestampConverterContent"),
  "jwt-decoder": () => import("@/components/blog/tools/JwtDecoderContent"),
  "url-encoder-decoder": () =>
    import("@/components/blog/tools/UrlEncoderDecoderContent"),
  "json-to-ts": () => import("@/components/blog/tools/JsonToTsContent"),
  "json-yaml": () => import("@/components/blog/tools/JsonYamlContent"),
  "json-csv": () => import("@/components/blog/tools/JsonCsvContent"),

  "pdf-editor": () => import("@/components/blog/tools/PdfEditorContent"),
  "pdf-to-excel": () => import("@/components/blog/tools/PdfToExcelContent"),
  "image-to-base64": () =>
    import("@/components/blog/tools/ImageToBase64Content"),
  "image-compressor": () =>
    import("@/components/blog/tools/ImageCompressorContent"),
  "favicon-generator": () =>
    import("@/components/blog/tools/FaviconGeneratorContent"),
  "og-image-generator": () => import("@/components/blog/tools/OgImageContent"),

  "qr-generator": () => import("@/components/blog/tools/QrGeneratorContent"),
  "uuid-generator": () =>
    import("@/components/blog/tools/UuidGeneratorContent"),
  password: () => import("@/components/blog/tools/PasswordContent"),
  "cron-builder": () => import("@/components/blog/tools/CronBuilderContent"),
  "hash-generator": () =>
    import("@/components/blog/tools/HashGeneratorContent"),
  "lorem-ipsum": () => import("@/components/blog/tools/LoremIpsumContent"),
  "barcode-generator": () =>
    import("@/components/blog/tools/BarcodeGeneratorContent"),
  "mock-data": () => import("@/components/blog/tools/MockDataContent"),
  "password-analyzer": () =>
    import("@/components/blog/tools/PasswordAnalyzerContent"),
  "wifi-qr": () => import("@/components/blog/tools/WifiQrContent"),

  "sql-builder": () => import("@/components/blog/tools/SQLBuilderContent"),

  "unit-converter": () =>
    import("@/components/blog/tools/UnitConverterContent"),
  "tip-calculator": () =>
    import("@/components/blog/tools/TipCalculatorContent"),
  "countdown-timer": () =>
    import("@/components/blog/tools/CountdownTimerContent"),
  "pomodoro-timer": () => import("@/components/blog/tools/PomodoroContent"),
  "bmi-calculator": () =>
    import("@/components/blog/tools/BmiCalculatorContent"),
  "world-clock": () => import("@/components/blog/tools/WorldClockContent"),
  "issue-tracker": () => import("@/components/blog/tools/IssueTrackerContent"),
};

export function getToolComponent(slug: string) {
  const loader = TOOL_COMPONENT_MAP[slug];

  if (!loader) return null;

  return dynamic(loader, { ssr: false });
}
