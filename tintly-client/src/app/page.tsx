"use client";

import { useState, useEffect, useRef } from "react";
import { themeApi, exportApi, Theme } from "@/lib/api";

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ThemeCustomizer } from "@/components/ThemeCustomizer";
import { HeroSection } from "@/components/HeroSection";
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
    if (theme) {
      document.documentElement.style.setProperty(
        "--background",
        theme.colors.background
      );
      document.documentElement.style.setProperty(
        "--foreground",
        theme.colors.foreground
      );
      document.documentElement.style.setProperty(
        "--primary",
        theme.colors.primary[500]
      );
      document.documentElement.style.setProperty(
        "--primary-foreground",
        theme.colors.primary.foreground
      );
      document.documentElement.style.setProperty(
        "--secondary",
        theme.colors.secondary[500]
      );
      document.documentElement.style.setProperty(
        "--secondary-foreground",
        theme.colors.secondary.foreground
      );
      document.documentElement.style.setProperty(
        "--accent",
        theme.colors.accent[500]
      );
      document.documentElement.style.setProperty(
        "--accent-foreground",
        theme.colors.accent.foreground
      );
      document.documentElement.style.setProperty(
        "--muted",
        theme.colors.muted[100]
      );
      document.documentElement.style.setProperty(
        "--muted-foreground",
        theme.colors.muted.foreground
      );
      document.documentElement.style.setProperty(
        "--border",
        theme.colors.border
      );
      document.documentElement.style.setProperty("--input", theme.colors.input);
      document.documentElement.style.setProperty("--ring", theme.colors.ring);
      if (theme.colors.card) {
        document.documentElement.style.setProperty(
          "--card",
          theme.colors.card.DEFAULT
        );
        document.documentElement.style.setProperty(
          "--card-foreground",
          theme.colors.card.foreground
        );
      }
      if (theme.colors.popover) {
        document.documentElement.style.setProperty(
          "--popover",
          theme.colors.popover.DEFAULT
        );
        document.documentElement.style.setProperty(
          "--popover-foreground",
          theme.colors.popover.foreground
        );
      }
      if (theme.colors.destructive) {
        document.documentElement.style.setProperty(
          "--destructive",
          theme.colors.destructive.DEFAULT
        );
        document.documentElement.style.setProperty(
          "--destructive-foreground",
          theme.colors.destructive.foreground
        );
      }
    }
  }, [theme]);

  const loadDefaultTheme = async () => {
    try {
      const defaultTheme = await themeApi.getDefaultTemplate();
      setTheme({
        ...defaultTheme,
        name: "My Theme",
        description: "A beautiful theme created with Tintly",
      });
    } catch (error) {
      console.error("Failed to load default theme:", error);
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
      <Header scrollToEditor={scrollToEditor} />
      <HeroSection scrollToEditor={scrollToEditor} />
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
