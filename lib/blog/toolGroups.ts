export interface ToolGroup {
  id: string;
  slug: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  color: string;
  bg: string;
  text: string;
  hoverBorder: string;
  toolIds: string[];
}

export const TOOL_GROUPS: ToolGroup[] = [
  {
    id: "colores",
    slug: "colores",
    titleKey: "blog.toolGroup.colores",
    descriptionKey: "blog.toolGroup.coloresDesc",
    icon: "palette",
    color: "bg-fuchsia-50 dark:bg-fuchsia-950/30",
    text: "text-fuchsia-600 dark:text-fuchsia-400",
    bg: "bg-fuchsia-50 dark:bg-fuchsia-950/20",
    hoverBorder: "hover:border-fuchsia-300 dark:hover:border-fuchsia-700",
    toolIds: ["color-tool", "palette-generator", "css-gradient", "design-showcase"],
  },
  {
    id: "texto",
    slug: "texto",
    titleKey: "blog.toolGroup.texto",
    descriptionKey: "blog.toolGroup.textoDesc",
    icon: "text",
    color: "bg-indigo-50 dark:bg-indigo-950/30",
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-950/20",
    hoverBorder: "hover:border-indigo-300 dark:hover:border-indigo-700",
    toolIds: ["diff-checker", "case-converter", "regex-tester", "markdown-preview", "html-entity", "regex-visualizer"],
  },
  {
    id: "datos",
    slug: "datos",
    titleKey: "blog.toolGroup.datos",
    descriptionKey: "blog.toolGroup.datosDesc",
    icon: "database",
    color: "bg-cyan-50 dark:bg-cyan-950/30",
    text: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-50 dark:bg-cyan-950/20",
    hoverBorder: "hover:border-cyan-300 dark:hover:border-cyan-700",
    toolIds: ["base64", "json-formatter", "timestamp-converter", "jwt-decoder", "url-encoder-decoder", "json-to-ts"],
  },
  {
    id: "documentos",
    slug: "documentos",
    titleKey: "blog.toolGroup.documentos",
    descriptionKey: "blog.toolGroup.documentosDesc",
    icon: "file",
    color: "bg-red-50 dark:bg-red-950/30",
    text: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/20",
    hoverBorder: "hover:border-red-300 dark:hover:border-red-700",
    toolIds: ["pdf-editor", "pdf-to-excel", "image-to-base64"],
  },
  {
    id: "generadores",
    slug: "generadores",
    titleKey: "blog.toolGroup.generadores",
    descriptionKey: "blog.toolGroup.generadoresDesc",
    icon: "code",
    color: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/20",
    hoverBorder: "hover:border-amber-300 dark:hover:border-amber-700",
    toolIds: ["qr-generator", "uuid-generator", "password", "cron-builder", "hash-generator", "lorem-ipsum", "barcode-generator", "mock-data"],
  },
  {
    id: "sql",
    slug: "sql",
    titleKey: "blog.toolGroup.sql",
    descriptionKey: "blog.toolGroup.sqlDesc",
    icon: "terminal",
    color: "bg-blue-50 dark:bg-blue-950/30",
    text: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/20",
    hoverBorder: "hover:border-blue-300 dark:hover:border-blue-700",
    toolIds: ["sql-builder"],
  },
];

export function getToolGroupBySlug(
  slug: string,
): ToolGroup | undefined {
  return TOOL_GROUPS.find((g) => g.slug === slug);
}
