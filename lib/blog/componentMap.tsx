"use client";
import type { Locale } from "@/store/localeStore";

import dynamic from "next/dynamic";

// Tutorials — ES
import SvgContent from "@/components/blog/tutorials/SvgContent";
import DatabaseContent from "@/components/blog/tutorials/DatabaseContent";
import FrontendHostingContent from "@/components/blog/tutorials/FrontendHostingContent";
import BackendHostingContent from "@/components/blog/tutorials/BackendHostingContent";
import TypeScriptContent from "@/components/blog/tutorials/TypeScriptContent";
import CLangContent from "@/components/blog/tutorials/CLangContent";
import JavaPooContent from "@/components/blog/tutorials/JavaPooContent";
import JavaSpringContent from "@/components/blog/tutorials/JavaSpringContent";
import HtmlCssContent from "@/components/blog/tutorials/HtmlCssContent";
import TestingFrontendContent from "@/components/blog/tutorials/TestingFrontendContent";
import CppContent from "@/components/blog/tutorials/CppContent";
import JavaScriptContent from "@/components/blog/tutorials/JavaScriptContent";
import PythonContent from "@/components/blog/tutorials/PythonContent";
import JavaContent from "@/components/blog/tutorials/JavaContent";
import ReactContent from "@/components/blog/tutorials/ReactContent";
import NodeExpressContent from "@/components/blog/tutorials/NodeExpressContent";
import NextJsContent from "@/components/blog/tutorials/NextJsContent";
import GitContent from "@/components/blog/tutorials/GitContent";
import OpenCodeContent from "@/components/blog/tutorials/OpenCodeContent";
import AIContent from "@/components/blog/tutorials/AIContent";
import MCPTutorialContent from "@/components/blog/tutorials/MCPTutorialContent";
import MCPServersContent from "@/components/blog/tutorials/MCPServersContent";
import SkillsTutorialContent from "@/components/blog/tutorials/SkillsTutorialContent";
import SkillsCatalogContent from "@/components/blog/tutorials/SkillsCatalogContent";
import CreateMcpContent from "@/components/blog/tutorials/CreateMcpContent";
import McpClientsContent from "@/components/blog/tutorials/McpClientsContent";
import McpSecurityContent from "@/components/blog/tutorials/McpSecurityContent";
import AgentFrameworksContent from "@/components/blog/tutorials/AgentFrameworksContent";
import AiEditorPluginsContent from "@/components/blog/tutorials/AiEditorPluginsContent";
import OllamaMcpContent from "@/components/blog/tutorials/OllamaMcpContent";
import RagMcpContent from "@/components/blog/tutorials/RagMcpContent";
import ParallelAgentsContent from "@/components/blog/tutorials/ParallelAgentsContent";
import OpenCodeModelsContent from "@/components/blog/opencode-models";

// VS Code articles — ES
import VSCodeConfigContent from "@/components/blog/tutorials/VSCodeConfigContent";
import VSCodeExtensionsContent from "@/components/blog/tutorials/VSCodeExtensionsContent";

// Database articles — ES
import DatabaseIntroContent from "@/components/blog/tutorials/DatabaseIntroContent";
import SQLvsNoSQLContent from "@/components/blog/tutorials/SQLvsNoSQLContent";
import SQLBasicsContent from "@/components/blog/tutorials/SQLBasicsContent";
import MySQLGuideContent from "@/components/blog/tutorials/MySQLGuideContent";
import PostgreSQLGuideContent from "@/components/blog/tutorials/PostgreSQLGuideContent";
import MongoDBGuideContent from "@/components/blog/tutorials/MongoDBGuideContent";
import SupabaseGuideContent from "@/components/blog/tutorials/SupabaseGuideContent";
import SQLBuilderDocContent from "@/components/blog/tutorials/SQLBuilderDocContent";

// New tutorials — ES
import AngularContent from "@/components/blog/tutorials/AngularContent";
import VueContent from "@/components/blog/tutorials/VueContent";
import TailwindContent from "@/components/blog/tutorials/TailwindContent";
import DockerContent from "@/components/blog/tutorials/DockerContent";
import CICDContent from "@/components/blog/tutorials/CICDContent";
import KubernetesContent from "@/components/blog/tutorials/KubernetesContent";
import GoContent from "@/components/blog/tutorials/GoContent";
import RustContent from "@/components/blog/tutorials/RustContent";
import NestJsContent from "@/components/blog/tutorials/NestJsContent";
import CssAvanzadoContent from "@/components/blog/tutorials/CssAvanzadoContent";
import JavaScriptAvanzadoContent from "@/components/blog/tutorials/JavaScriptAvanzadoContent";
import TypeScriptAvanzadoContent from "@/components/blog/tutorials/TypeScriptAvanzadoContent";
import EstadoGlobalContent from "@/components/blog/tutorials/EstadoGlobalContent";
import RendimientoFrontendContent from "@/components/blog/tutorials/RendimientoFrontendContent";
import AccesibilidadContent from "@/components/blog/tutorials/AccesibilidadContent";
import MonitoringContent from "@/components/blog/tutorials/MonitoringContent";
import TerraformIacContent from "@/components/blog/tutorials/TerraformIacContent";

// Tutorials — EN
import SvgContentEn from "@/components/blog/tutorials/en/SvgContent";
import DatabaseContentEn from "@/components/blog/tutorials/en/DatabaseContent";
import FrontendHostingContentEn from "@/components/blog/tutorials/en/FrontendHostingContent";
import BackendHostingContentEn from "@/components/blog/tutorials/en/BackendHostingContent";
import TypeScriptContentEn from "@/components/blog/tutorials/en/TypeScriptContent";
import CLangContentEn from "@/components/blog/tutorials/en/CLangContent";
import JavaPooContentEn from "@/components/blog/tutorials/en/JavaPooContent";
import JavaSpringContentEn from "@/components/blog/tutorials/en/JavaSpringContent";
import HtmlCssContentEn from "@/components/blog/tutorials/en/HtmlCssContent";
import TestingFrontendContentEn from "@/components/blog/tutorials/en/TestingFrontendContent";
import CppContentEn from "@/components/blog/tutorials/en/CppContent";
import JavaScriptContentEn from "@/components/blog/tutorials/en/JavaScriptContent";
import PythonContentEn from "@/components/blog/tutorials/en/PythonContent";
import JavaContentEn from "@/components/blog/tutorials/en/JavaContent";
import ReactContentEn from "@/components/blog/tutorials/en/ReactContent";
import NodeExpressContentEn from "@/components/blog/tutorials/en/NodeExpressContent";
import NextJsContentEn from "@/components/blog/tutorials/en/NextJsContent";
import GitContentEn from "@/components/blog/tutorials/en/GitContent";
import OpenCodeContentEn from "@/components/blog/tutorials/en/OpenCodeContent";
import AIContentEn from "@/components/blog/tutorials/en/AIContent";
import MCPTutorialContentEn from "@/components/blog/tutorials/en/MCPTutorialContent";
import MCPServersContentEn from "@/components/blog/tutorials/en/MCPServersContent";
import SkillsTutorialContentEn from "@/components/blog/tutorials/en/SkillsTutorialContent";
import SkillsCatalogContentEn from "@/components/blog/tutorials/en/SkillsCatalogContent";
import CreateMcpContentEn from "@/components/blog/tutorials/en/CreateMcpContent";
import McpClientsContentEn from "@/components/blog/tutorials/en/McpClientsContent";
import McpSecurityContentEn from "@/components/blog/tutorials/en/McpSecurityContent";
import AgentFrameworksContentEn from "@/components/blog/tutorials/en/AgentFrameworksContent";
import AiEditorPluginsContentEn from "@/components/blog/tutorials/en/AiEditorPluginsContent";
import OllamaMcpContentEn from "@/components/blog/tutorials/en/OllamaMcpContent";
import RagMcpContentEn from "@/components/blog/tutorials/en/RagMcpContent";
import ParallelAgentsContentEn from "@/components/blog/tutorials/en/ParallelAgentsContent";
import OpenCodeModelsContentEn from "@/components/blog/opencode-models/en";

// VS Code articles — EN
import VSCodeConfigContentEn from "@/components/blog/tutorials/en/VSCodeConfigContent";
import VSCodeExtensionsContentEn from "@/components/blog/tutorials/en/VSCodeExtensionsContent";

// Database articles — EN
import DatabaseIntroContentEn from "@/components/blog/tutorials/en/DatabaseIntroContent";
import SQLvsNoSQLContentEn from "@/components/blog/tutorials/en/SQLvsNoSQLContent";
import SQLBasicsContentEn from "@/components/blog/tutorials/en/SQLBasicsContent";
import MySQLGuideContentEn from "@/components/blog/tutorials/en/MySQLGuideContent";
import PostgreSQLGuideContentEn from "@/components/blog/tutorials/en/PostgreSQLGuideContent";
import MongoDBGuideContentEn from "@/components/blog/tutorials/en/MongoDBGuideContent";
import SupabaseGuideContentEn from "@/components/blog/tutorials/en/SupabaseGuideContent";
import SQLBuilderDocContentEn from "@/components/blog/tutorials/en/SQLBuilderDocContent";

// New tutorials — EN
import AngularContentEn from "@/components/blog/tutorials/en/AngularContent";
import VueContentEn from "@/components/blog/tutorials/en/VueContent";
import TailwindContentEn from "@/components/blog/tutorials/en/TailwindContent";
import DockerContentEn from "@/components/blog/tutorials/en/DockerContent";
import CICDContentEn from "@/components/blog/tutorials/en/CICDContent";
import KubernetesContentEn from "@/components/blog/tutorials/en/KubernetesContent";
import GoContentEn from "@/components/blog/tutorials/en/GoContent";
import RustContentEn from "@/components/blog/tutorials/en/RustContent";
import NestJsContentEn from "@/components/blog/tutorials/en/NestJsContent";
import CssAvanzadoContentEn from "@/components/blog/tutorials/en/CssAvanzadoContent";
import JavaScriptAvanzadoContentEn from "@/components/blog/tutorials/en/JavaScriptAvanzadoContent";
import TypeScriptAvanzadoContentEn from "@/components/blog/tutorials/en/TypeScriptAvanzadoContent";
import EstadoGlobalContentEn from "@/components/blog/tutorials/en/EstadoGlobalContent";
import RendimientoFrontendContentEn from "@/components/blog/tutorials/en/RendimientoFrontendContent";
import AccesibilidadContentEn from "@/components/blog/tutorials/en/AccesibilidadContent";
import MonitoringContentEn from "@/components/blog/tutorials/en/MonitoringContent";
import TerraformIacContentEn from "@/components/blog/tutorials/en/TerraformIacContent";

// Tools — ES
import PasswordContent from "@/components/blog/tools/PasswordContent";
import JsonFormatterContent from "@/components/blog/tools/JsonFormatterContent";
import Base64Content from "@/components/blog/tools/Base64Content";
import RegexTesterContent from "@/components/blog/tools/RegexTesterContent";
import ColorToolContent from "@/components/blog/tools/ColorToolContent";
import PaletteGeneratorContent from "@/components/blog/tools/PaletteGeneratorContent";
import QrGeneratorContent from "@/components/blog/tools/QrGeneratorContent";
import UuidGeneratorContent from "@/components/blog/tools/UuidGeneratorContent";
import TimestampConverterContent from "@/components/blog/tools/TimestampConverterContent";
import CaseConverterContent from "@/components/blog/tools/CaseConverterContent";
import DiffCheckerContent from "@/components/blog/tools/DiffCheckerContent";

// SQL Builder
import SQLBuilderContent from "@/components/blog/tools/SQLBuilderContent";

// New tools
import MarkdownPreviewContent from "@/components/blog/tools/MarkdownPreviewContent";
import JwtDecoderContent from "@/components/blog/tools/JwtDecoderContent";
import UrlEncoderDecoderContent from "@/components/blog/tools/UrlEncoderDecoderContent";
import CronBuilderContent from "@/components/blog/tools/CronBuilderContent";
import HashGeneratorContent from "@/components/blog/tools/HashGeneratorContent";
import JsonToTsContent from "@/components/blog/tools/JsonToTsContent";
import HtmlEntityContent from "@/components/blog/tools/HtmlEntityContent";
import LoremIpsumContent from "@/components/blog/tools/LoremIpsumContent";
import RegexVisualizerContent from "@/components/blog/tools/RegexVisualizerContent";
import BarcodeGeneratorContent from "@/components/blog/tools/BarcodeGeneratorContent";
import CssGradientContent from "@/components/blog/tools/CssGradientContent";
import ImageToBase64Content from "@/components/blog/tools/ImageToBase64Content";
import MockDataContent from "@/components/blog/tools/MockDataContent";
import DesignShowcaseContent from "@/components/blog/tools/DesignShowcaseContent";

// New tools batch 2
import UnitConverterContent from "@/components/blog/tools/UnitConverterContent";
import TipCalculatorContent from "@/components/blog/tools/TipCalculatorContent";
import CountdownTimerContent from "@/components/blog/tools/CountdownTimerContent";
import PomodoroContent from "@/components/blog/tools/PomodoroContent";
import BmiCalculatorContent from "@/components/blog/tools/BmiCalculatorContent";
import WorldClockContent from "@/components/blog/tools/WorldClockContent";
import IssueTrackerContent from "@/components/blog/tools/IssueTrackerContent";
import JsonYamlContent from "@/components/blog/tools/JsonYamlContent";
import JsonCsvContent from "@/components/blog/tools/JsonCsvContent";
import CodeMinifierContent from "@/components/blog/tools/CodeMinifierContent";
import RegexCheatsheetContent from "@/components/blog/tools/RegexCheatsheetContent";
import MarkdownHtmlContent from "@/components/blog/tools/MarkdownHtmlContent";
import TextCounterContent from "@/components/blog/tools/TextCounterContent";
import BoxShadowContent from "@/components/blog/tools/BoxShadowContent";
import ContrastCheckerContent from "@/components/blog/tools/ContrastCheckerContent";
import ImageCompressorContent from "@/components/blog/tools/ImageCompressorContent";
import FaviconGeneratorContent from "@/components/blog/tools/FaviconGeneratorContent";
import OgImageContent from "@/components/blog/tools/OgImageContent";
import PasswordAnalyzerContent from "@/components/blog/tools/PasswordAnalyzerContent";
import WifiQrContent from "@/components/blog/tools/WifiQrContent";

// Tools — EN (removed — ES components now use useT for i18n)

const PdfEditorContent = dynamic(
  () => import("@/components/blog/tools/PdfEditorContent"),
  { ssr: false },
);

const PdfToExcelContent = dynamic(
  () => import("@/components/blog/tools/PdfToExcelContent"),
  { ssr: false },
);

const contentMap: Record<
  string,
  { es: React.ComponentType; en: React.ComponentType }
> = {
  svg: { es: SvgContent, en: SvgContentEn },
  database: { es: DatabaseContent, en: DatabaseContentEn },
  "frontend-hosting": {
    es: FrontendHostingContent,
    en: FrontendHostingContentEn,
  },
  "backend-hosting": { es: BackendHostingContent, en: BackendHostingContentEn },
  typescript: { es: TypeScriptContent, en: TypeScriptContentEn },
  "c-lang": { es: CLangContent, en: CLangContentEn },
  "cpp-lang": { es: CppContent, en: CppContentEn },
  javascript: { es: JavaScriptContent, en: JavaScriptContentEn },
  python: { es: PythonContent, en: PythonContentEn },
  java: { es: JavaContent, en: JavaContentEn },
  "java-poo": { es: JavaPooContent, en: JavaPooContentEn },
  "java-spring": { es: JavaSpringContent, en: JavaSpringContentEn },
  "html-css": { es: HtmlCssContent, en: HtmlCssContentEn },
  "testing-frontend": {
    es: TestingFrontendContent,
    en: TestingFrontendContentEn,
  },
  "react-framework": { es: ReactContent, en: ReactContentEn },
  "node-express": { es: NodeExpressContent, en: NodeExpressContentEn },
  "nextjs-framework": { es: NextJsContent, en: NextJsContentEn },
  git: { es: GitContent, en: GitContentEn },
  opencode: { es: OpenCodeContent, en: OpenCodeContentEn },
  "ai-project": { es: AIContent, en: AIContentEn },
  "instalar-mcp": { es: MCPTutorialContent, en: MCPTutorialContentEn },
  "mcp-servers": { es: MCPServersContent, en: MCPServersContentEn },
  "skills-tutorial": { es: SkillsTutorialContent, en: SkillsTutorialContentEn },
  "skills-catalog": { es: SkillsCatalogContent, en: SkillsCatalogContentEn },
  "crear-mcp": { es: CreateMcpContent, en: CreateMcpContentEn },
  "clientes-mcp": { es: McpClientsContent, en: McpClientsContentEn },
  "seguridad-mcp": { es: McpSecurityContent, en: McpSecurityContentEn },
  "frameworks-agentes": {
    es: AgentFrameworksContent,
    en: AgentFrameworksContentEn,
  },
  "plugins-ia-editor": {
    es: AiEditorPluginsContent,
    en: AiEditorPluginsContentEn,
  },
  "ollama-mcp": { es: OllamaMcpContent, en: OllamaMcpContentEn },
  "rag-con-mcp": { es: RagMcpContent, en: RagMcpContentEn },
  "agentes-paralelo": {
    es: ParallelAgentsContent,
    en: ParallelAgentsContentEn,
  },
  "opencode-models": { es: OpenCodeModelsContent, en: OpenCodeModelsContentEn },
  "vscode-config": { es: VSCodeConfigContent, en: VSCodeConfigContentEn },
  "vscode-extensions": {
    es: VSCodeExtensionsContent,
    en: VSCodeExtensionsContentEn,
  },
  "database-intro": { es: DatabaseIntroContent, en: DatabaseIntroContentEn },
  "sql-vs-nosql": { es: SQLvsNoSQLContent, en: SQLvsNoSQLContentEn },
  "sql-basics": { es: SQLBasicsContent, en: SQLBasicsContentEn },
  "mysql-guide": { es: MySQLGuideContent, en: MySQLGuideContentEn },
  "postgresql-guide": {
    es: PostgreSQLGuideContent,
    en: PostgreSQLGuideContentEn,
  },
  "mongodb-guide": { es: MongoDBGuideContent, en: MongoDBGuideContentEn },
  "supabase-guide": { es: SupabaseGuideContent, en: SupabaseGuideContentEn },
  password: { es: PasswordContent, en: PasswordContent },
  "json-formatter": { es: JsonFormatterContent, en: JsonFormatterContent },
  base64: { es: Base64Content, en: Base64Content },
  "regex-tester": { es: RegexTesterContent, en: RegexTesterContent },
  "color-tool": { es: ColorToolContent, en: ColorToolContent },
  "palette-generator": {
    es: PaletteGeneratorContent,
    en: PaletteGeneratorContent,
  },
  "qr-generator": { es: QrGeneratorContent, en: QrGeneratorContent },
  "uuid-generator": { es: UuidGeneratorContent, en: UuidGeneratorContent },
  "timestamp-converter": {
    es: TimestampConverterContent,
    en: TimestampConverterContent,
  },
  "case-converter": { es: CaseConverterContent, en: CaseConverterContent },
  "diff-checker": { es: DiffCheckerContent, en: DiffCheckerContent },
  "pdf-editor": { es: PdfEditorContent, en: PdfEditorContent },
  "pdf-to-excel": { es: PdfToExcelContent, en: PdfToExcelContent },
  "sql-builder": { es: SQLBuilderContent, en: SQLBuilderContent },
  "markdown-preview": { es: MarkdownPreviewContent, en: MarkdownPreviewContent },
  "jwt-decoder": { es: JwtDecoderContent, en: JwtDecoderContent },
  "url-encoder-decoder": { es: UrlEncoderDecoderContent, en: UrlEncoderDecoderContent },
  "cron-builder": { es: CronBuilderContent, en: CronBuilderContent },
  "hash-generator": { es: HashGeneratorContent, en: HashGeneratorContent },
  "json-to-ts": { es: JsonToTsContent, en: JsonToTsContent },
  "html-entity": { es: HtmlEntityContent, en: HtmlEntityContent },
  "lorem-ipsum": { es: LoremIpsumContent, en: LoremIpsumContent },
  "regex-visualizer": { es: RegexVisualizerContent, en: RegexVisualizerContent },
  "barcode-generator": { es: BarcodeGeneratorContent, en: BarcodeGeneratorContent },
  "css-gradient": { es: CssGradientContent, en: CssGradientContent },
  "image-to-base64": { es: ImageToBase64Content, en: ImageToBase64Content },
  "mock-data": { es: MockDataContent, en: MockDataContent },
  "design-showcase": { es: DesignShowcaseContent, en: DesignShowcaseContent },
  "unit-converter": { es: UnitConverterContent, en: UnitConverterContent },
  "tip-calculator": { es: TipCalculatorContent, en: TipCalculatorContent },
  "countdown-timer": { es: CountdownTimerContent, en: CountdownTimerContent },
  "pomodoro-timer": { es: PomodoroContent, en: PomodoroContent },
  "bmi-calculator": { es: BmiCalculatorContent, en: BmiCalculatorContent },
  "world-clock": { es: WorldClockContent, en: WorldClockContent },
  "issue-tracker": { es: IssueTrackerContent, en: IssueTrackerContent },
  "json-yaml": { es: JsonYamlContent, en: JsonYamlContent },
  "json-csv": { es: JsonCsvContent, en: JsonCsvContent },
  "code-minifier": { es: CodeMinifierContent, en: CodeMinifierContent },
  "regex-cheatsheet": { es: RegexCheatsheetContent, en: RegexCheatsheetContent },
  "markdown-html": { es: MarkdownHtmlContent, en: MarkdownHtmlContent },
  "text-counter": { es: TextCounterContent, en: TextCounterContent },
  "box-shadow": { es: BoxShadowContent, en: BoxShadowContent },
  "contrast-checker": { es: ContrastCheckerContent, en: ContrastCheckerContent },
  "image-compressor": { es: ImageCompressorContent, en: ImageCompressorContent },
  "favicon-generator": { es: FaviconGeneratorContent, en: FaviconGeneratorContent },
  "og-image-generator": { es: OgImageContent, en: OgImageContent },
  "password-analyzer": { es: PasswordAnalyzerContent, en: PasswordAnalyzerContent },
  "wifi-qr": { es: WifiQrContent, en: WifiQrContent },
  "sql-builder-guide": { es: SQLBuilderDocContent, en: SQLBuilderDocContentEn },
  angular: { es: AngularContent, en: AngularContentEn },
  vue: { es: VueContent, en: VueContentEn },
  "tailwind-css": { es: TailwindContent, en: TailwindContentEn },
  docker: { es: DockerContent, en: DockerContentEn },
  "ci-cd": { es: CICDContent, en: CICDContentEn },
  kubernetes: { es: KubernetesContent, en: KubernetesContentEn },
  monitoring: { es: MonitoringContent, en: MonitoringContentEn },
  "terraform-iac": { es: TerraformIacContent, en: TerraformIacContentEn },
  go: { es: GoContent, en: GoContentEn },
  rust: { es: RustContent, en: RustContentEn },
  nestjs: { es: NestJsContent, en: NestJsContentEn },
  "css-avanzado": { es: CssAvanzadoContent, en: CssAvanzadoContentEn },
  "javascript-avanzado": {
    es: JavaScriptAvanzadoContent,
    en: JavaScriptAvanzadoContentEn,
  },
  "typescript-avanzado": {
    es: TypeScriptAvanzadoContent,
    en: TypeScriptAvanzadoContentEn,
  },
  "estado-global": { es: EstadoGlobalContent, en: EstadoGlobalContentEn },
  "rendimiento-frontend": {
    es: RendimientoFrontendContent,
    en: RendimientoFrontendContentEn,
  },
  accesibilidad: { es: AccesibilidadContent, en: AccesibilidadContentEn },
};

export function getContentComponent(
  id: string,
  locale: Locale,
): React.ComponentType | null {
  const entry = contentMap[id];

  if (!entry) return null;

  return entry[locale] ?? entry.es;
}
