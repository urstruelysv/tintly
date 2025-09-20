"use client";

import { Hero } from "@/components/Hero";

import { ThemeCustomizer } from "@/components/ThemeCustomizer";
import { Theme } from "@/lib/api";

interface ThemeBuilderProps {
  theme: Theme | null;
  isLoading: boolean;
  loadDefaultTheme: () => Promise<void>;
  handleSaveTheme: () => Promise<void>;
  updateThemeColor: (colorPath: string, value: string) => void;
  colorFormat: "oklch" | "hsl" | "rgb" | "hex";
  setColorFormat: (format: "oklch" | "hsl" | "rgb" | "hex") => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  editorRef: React.RefObject<HTMLDivElement>;
  generatedCode: { tailwind: string; css: string; json: string };
  copyToClipboard: (text: string) => Promise<void>;
  scrollToEditor: () => void;
  setTheme: React.Dispatch<React.SetStateAction<Theme | null>>;
}

export function ThemeBuilder({
  theme,
  isLoading,
  loadDefaultTheme,
  handleSaveTheme,
  updateThemeColor,
  colorFormat,
  setColorFormat,
  activeTab,
  setActiveTab,
  editorRef,
  generatedCode,
  copyToClipboard,
  scrollToEditor,
  setTheme,
}: ThemeBuilderProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <Hero scrollToEditor={scrollToEditor} />
        <ThemeCustomizer
          theme={theme}
          isLoading={isLoading}
          loadDefaultTheme={loadDefaultTheme}
          handleSaveTheme={handleSaveTheme}
          updateThemeColor={updateThemeColor}
          colorFormat={colorFormat}
          setColorFormat={setColorFormat}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          editorRef={editorRef}
          generatedCode={generatedCode}
          copyToClipboard={copyToClipboard}
          setTheme={setTheme}
        />
      </div>
    </div>
  );
}
