"use client";
import SvgContent from "@/components/blog/SvgContent";
import DatabaseContent from "@/components/blog/DatabaseContent";
import FrontendHostingContent from "@/components/blog/FrontendHostingContent";
import BackendHostingContent from "@/components/blog/BackendHostingContent";
import TypeScriptContent from "@/components/blog/TypeScriptContent";
import PasswordContent from "@/components/blog/PasswordContent";
import CLangContent from "@/components/blog/CLangContent";
import CppContent from "@/components/blog/CppContent";
import PromptCompressorContent from "@/components/blog/PromptCompressorContent";
import TokenOptimizerContent from "@/components/blog/TokenOptimizerContent";
import ContextSummarizerContent from "@/components/blog/ContextSummarizerContent";
import InstructionCleanerContent from "@/components/blog/InstructionCleanerContent";
import JsonPromptFormatterContent from "@/components/blog/JsonPromptFormatterContent";
import JsonFormatterContent from "@/components/blog/JsonFormatterContent";
import Base64Content from "@/components/blog/Base64Content";
import RegexTesterContent from "@/components/blog/RegexTesterContent";
import ColorToolContent from "@/components/blog/ColorToolContent";
import JavaScriptContent from "@/components/blog/JavaScriptContent";
import PythonContent from "@/components/blog/PythonContent";
import JavaContent from "@/components/blog/JavaContent";
import ReactContent from "@/components/blog/ReactContent";
import NodeExpressContent from "@/components/blog/NodeExpressContent";
import NextJsContent from "@/components/blog/NextJsContent";

export const componentMap: Record<string, React.ComponentType> = {
	"json-formatter": JsonFormatterContent,
	base64: Base64Content,
	"regex-tester": RegexTesterContent,
	"color-tool": ColorToolContent,
	svg: SvgContent,
	database: DatabaseContent,
	"frontend-hosting": FrontendHostingContent,
	"backend-hosting": BackendHostingContent,
	typescript: TypeScriptContent,
	password: PasswordContent,
	"c-lang": CLangContent,
	"cpp-lang": CppContent,
	"prompt-compressor": PromptCompressorContent,
	"token-optimizer": TokenOptimizerContent,
	"context-summarizer": ContextSummarizerContent,
	"instruction-cleaner": InstructionCleanerContent,
	"json-prompt-formatter": JsonPromptFormatterContent,
	javascript: JavaScriptContent,
	python: PythonContent,
	java: JavaContent,
	"react-framework": ReactContent,
	"node-express": NodeExpressContent,
	"nextjs-framework": NextJsContent,
};
