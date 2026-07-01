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

// Tools — EN
import PasswordContentEn from "@/components/blog/tools/en/PasswordContent";
import JsonFormatterContentEn from "@/components/blog/tools/en/JsonFormatterContent";
import Base64ContentEn from "@/components/blog/tools/en/Base64Content";
import RegexTesterContentEn from "@/components/blog/tools/en/RegexTesterContent";
import ColorToolContentEn from "@/components/blog/tools/en/ColorToolContent";
import PaletteGeneratorContentEn from "@/components/blog/tools/en/PaletteGeneratorContent";
import QrGeneratorContentEn from "@/components/blog/tools/en/QrGeneratorContent";
import UuidGeneratorContentEn from "@/components/blog/tools/en/UuidGeneratorContent";
import TimestampConverterContentEn from "@/components/blog/tools/en/TimestampConverterContent";
import CaseConverterContentEn from "@/components/blog/tools/en/CaseConverterContent";
import DiffCheckerContentEn from "@/components/blog/tools/en/DiffCheckerContent";

const PdfEditorContent = dynamic(
  () => import("@/components/blog/tools/PdfEditorContent"),
  { ssr: false },
);

const PdfEditorContentEn = dynamic(
  () => import("@/components/blog/tools/en/PdfEditorContent"),
  { ssr: false },
);

const contentMap: Record<string, { es: React.ComponentType; en: React.ComponentType }> = {
  svg: { es: SvgContent, en: SvgContentEn },
  database: { es: DatabaseContent, en: DatabaseContentEn },
  "frontend-hosting": { es: FrontendHostingContent, en: FrontendHostingContentEn },
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
  "testing-frontend": { es: TestingFrontendContent, en: TestingFrontendContentEn },
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
  "frameworks-agentes": { es: AgentFrameworksContent, en: AgentFrameworksContentEn },
  "plugins-ia-editor": { es: AiEditorPluginsContent, en: AiEditorPluginsContentEn },
  "ollama-mcp": { es: OllamaMcpContent, en: OllamaMcpContentEn },
  "rag-con-mcp": { es: RagMcpContent, en: RagMcpContentEn },
  "agentes-paralelo": { es: ParallelAgentsContent, en: ParallelAgentsContentEn },
  "opencode-models": { es: OpenCodeModelsContent, en: OpenCodeModelsContentEn },
  password: { es: PasswordContent, en: PasswordContentEn },
  "json-formatter": { es: JsonFormatterContent, en: JsonFormatterContentEn },
  base64: { es: Base64Content, en: Base64ContentEn },
  "regex-tester": { es: RegexTesterContent, en: RegexTesterContentEn },
  "color-tool": { es: ColorToolContent, en: ColorToolContentEn },
  "palette-generator": { es: PaletteGeneratorContent, en: PaletteGeneratorContentEn },
  "qr-generator": { es: QrGeneratorContent, en: QrGeneratorContentEn },
  "uuid-generator": { es: UuidGeneratorContent, en: UuidGeneratorContentEn },
  "timestamp-converter": { es: TimestampConverterContent, en: TimestampConverterContentEn },
  "case-converter": { es: CaseConverterContent, en: CaseConverterContentEn },
  "diff-checker": { es: DiffCheckerContent, en: DiffCheckerContentEn },
  "pdf-editor": { es: PdfEditorContent, en: PdfEditorContentEn },
};

export function getContentComponent(id: string, locale: Locale): React.ComponentType | null {
  const entry = contentMap[id];
  if (!entry) return null;
  return entry[locale] ?? entry.es;
}
