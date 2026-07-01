"use client";
import { useCallback, useEffect, useState } from "react";

import { TabNav, TABS } from "./tabs";
import { SectionIntro } from "./SectionIntro";
import { SectionOpenAI } from "./SectionOpenAI";
import { SectionAnthropic } from "./SectionAnthropic";
import { SectionCopilot } from "./SectionCopilot";
import { SectionOllama } from "./SectionOllama";
import { SectionLocalModels } from "./SectionLocalModels";
import { SectionComparativa } from "./SectionComparativa";
import { SectionRecomendaciones } from "./SectionRecomendaciones";

function TabContent({ activeTab }: { activeTab: string }) {
  switch (activeTab) {
    case "openai":
      return <SectionOpenAI />;
    case "anthropic":
      return <SectionAnthropic />;
    case "copilot":
      return <SectionCopilot />;
    case "ollama":
      return <SectionOllama />;
    case "local-models":
      return <SectionLocalModels />;
    case "comparativa":
      return <SectionComparativa />;
    case "recomendaciones":
      return <SectionRecomendaciones />;
    default:
      return <SectionOpenAI />;
  }
}

export default function OpenCodeModelsContent() {
  const [activeTab, setActiveTab] = useState("openai");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");

    if (hash && TABS.some((t) => t.id === hash)) {
      setActiveTab(hash);
    }
  }, []);

  const handleTabChange = useCallback((id: string) => {
    setActiveTab(id);
    window.location.hash = id;
  }, []);

  return (
    <div className="space-y-2">
      <SectionIntro />
      <TabNav activeTab={activeTab} onTabChange={handleTabChange} />
      <TabContent activeTab={activeTab} />
    </div>
  );
}
