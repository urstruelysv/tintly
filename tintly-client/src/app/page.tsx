"use client";

import { useState, useEffect, useRef } from "react";
import { themeApi, exportApi, Theme } from "@/lib/api";

import { Header } from "@/components/Header";
import { ThemeBuilder } from "@/components/ThemeBuilder";
import { ThemeCustomizer } from "@/components/ThemeCustomizer";

import { ThemeEditor } from "@/components/ThemeEditor";
import ExamplesPage from "@/components/ExamplesPage";
import FeaturesPage from "@/components/FeaturesPage";
import PricingPage from "@/components/PricingPage";
import RoadmapPage from "@/components/RoadmapPage";
import FaqPage from "@/components/FaqPage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github } from "lucide-react";
import { Share2 } from "lucide-react";

export default function TweakcnClone() {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("colors");
  const [showCode, setShowCode] = useState(false);
  const [previewMode, setPreviewMode] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [colorFormat, setColorFormat] = useState<
    "oklch" | "hsl" | "rgb" | "hex"
  >("oklch");

  const editorRef = useRef<HTMLDivElement>(null);

  // Load default theme on mount
  useEffect(() => {
    loadDefaultTheme();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const loadDefaultTheme = async () => {
    try {
      let defaultTheme = await themeApi.getDefaultTemplate();
      if (!defaultTheme.id) {
        // If the default theme doesn't have an ID, save it to get one
        defaultTheme = await themeApi.create({
          ...defaultTheme,
          name: "My Theme",
          description: "A beautiful theme created with Tintly",
        });
      }
      setTheme(defaultTheme);
    } catch (error) {
      console.error("Failed to load or save default theme:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveTheme = async () => {
    if (!theme) return;

    setIsSaving(true);
    try {
      let savedTheme;
      if (theme.id) {
        savedTheme = await themeApi.update(theme.id, theme);
      } else {
        savedTheme = await themeApi.create(theme);
      }
      setTheme(savedTheme);
    } catch (error) {
      console.error("Failed to save theme:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const updateThemeColor = (colorPath: string, value: string) => {
    if (!theme) return;

    setTheme((prev) => {
      if (!prev) return prev;
      const newTheme = { ...prev };
      const pathParts = colorPath.split(".");
      let current: any = newTheme.colors;

      for (let i = 0; i < pathParts.length - 1; i++) {
        current = current[pathParts[i]];
      }
      current[pathParts[pathParts.length - 1]] = value;

      return newTheme;
    });
  };

  const [generatedCode, setGeneratedCode] = useState({
    tailwind: "",
    css: "",
    json: "",
  });

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const generateCode = async () => {
    if (!theme?.id) return;

    try {
      // Generate Tailwind config
      const tailwindResponse = await exportApi.exportTailwind(theme.id);
      if (tailwindResponse && tailwindResponse.content) {
        setGeneratedCode((prev) => ({
          ...prev,
          tailwind: tailwindResponse.content,
        }));
      } else {
        console.error(
          "Failed to generate Tailwind config: No content received.",
          tailwindResponse
        );
      }

      // Generate CSS variables
      const cssResponse = await exportApi.exportTheme(theme.id, "css");
      if (cssResponse && cssResponse.content) {
        setGeneratedCode((prev) => ({
          ...prev,
          css: cssResponse.content,
        }));
      } else {
        console.error(
          "Failed to generate CSS variables: No content received.",
          cssResponse
        );
      }

      // Generate JSON tokens
      const jsonResponse = await exportApi.exportTheme(theme.id, "json");
      if (jsonResponse && jsonResponse.content) {
        setGeneratedCode((prev) => ({
          ...prev,
          json: jsonResponse.content,
        }));
      } else {
        console.error(
          "Failed to generate JSON tokens: No content received.",
          jsonResponse
        );
      }
    } catch (error) {
      console.error("Failed to generate code:", error);
    }
  };

  // Generate code when theme changes
  useEffect(() => {
    if (theme?.id) {
      generateCode();
    }
  }, [theme?.id]);

  const scrollToEditor = () => {
    editorRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <Header scrollToEditor={scrollToEditor} darkMode={darkMode} setDarkMode={setDarkMode} />
      <ThemeBuilder
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
        scrollToEditor={scrollToEditor}
        setTheme={setTheme}
      />

      <div id="examples" className="py-12">
        <ExamplesPage />
      </div>
      <div id="features" className="py-12">
        <FeaturesPage />
      </div>
      <div id="pricing" className="py-12">
        <PricingPage />
      </div>
      <div id="roadmap" className="py-12">
        <RoadmapPage />
      </div>
      <div id="faq" className="py-12">
        <FaqPage />
      </div>

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground">
                Built with ❤️ using shadcn/ui
              </p>
              <Badge variant="outline" className="text-xs">
                Open Source
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
