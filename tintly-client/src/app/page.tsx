"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ColorPicker } from "@/components/ColorPicker";
import { ThemePreview } from "@/components/ThemePreview";
import { ExportOptions } from "@/components/ExportOptions";
import { TypographyEditor } from "@/components/TypographyEditor";
import { SpacingEditor } from "@/components/SpacingEditor";
import { ThemePresets } from "@/components/ThemePresets";
import { themeApi, exportApi, Theme } from "@/lib/api";
import {
  Palette,
  Eye,
  Download,
  Plus,
  Settings,
  Copy,
  Share2,
  Github,
  Sparkles,
  RotateCcw,
  Save,
  Loader2,
  ChevronDown,
  ChevronRight,
  Code,
  Monitor,
  Smartphone,
  Tablet,
  Sun,
  Moon,
  ArrowRight,
  Check,
  RefreshCw,
  Wrench,
} from "lucide-react";

import ExamplesPage from "@/components/ExamplesPage";
import FeaturesPage from "@/components/FeaturesPage";
import PricingPage from "@/components/PricingPage";
import RoadmapPage from "@/components/RoadmapPage";
import FaqPage from "@/components/FaqPage";

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
      document.documentElement.style.setProperty('--background', theme.colors.background);
      document.documentElement.style.setProperty('--foreground', theme.colors.foreground);
      document.documentElement.style.setProperty('--primary', theme.colors.primary[500]);
      document.documentElement.style.setProperty('--primary-foreground', theme.colors.primary.foreground);
      document.documentElement.style.setProperty('--secondary', theme.colors.secondary[500]);
      document.documentElement.style.setProperty('--secondary-foreground', theme.colors.secondary.foreground);
      document.documentElement.style.setProperty('--accent', theme.colors.accent[500]);
      document.documentElement.style.setProperty('--accent-foreground', theme.colors.accent.foreground);
      document.documentElement.style.setProperty('--muted', theme.colors.muted[100]);
      document.documentElement.style.setProperty('--muted-foreground', theme.colors.muted.foreground);
      document.documentElement.style.setProperty('--border', theme.colors.border);
      document.documentElement.style.setProperty('--input', theme.colors.input);
      document.documentElement.style.setProperty('--ring', theme.colors.ring);
      if (theme.colors.card) {
        document.documentElement.style.setProperty('--card', theme.colors.card.DEFAULT);
        document.documentElement.style.setProperty('--card-foreground', theme.colors.card.foreground);
      }
      if (theme.colors.popover) {
        document.documentElement.style.setProperty('--popover', theme.colors.popover.DEFAULT);
        document.documentElement.style.setProperty('--popover-foreground', theme.colors.popover.foreground);
      }
      if (theme.colors.destructive) {
        document.documentElement.style.setProperty('--destructive', theme.colors.destructive.DEFAULT);
        document.documentElement.style.setProperty('--destructive-foreground', theme.colors.destructive.foreground);
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
        console.error("Failed to generate Tailwind config: No content received.", tailwindResponse);
      }

      // Generate CSS variables
      const cssResponse = await exportApi.exportTheme(theme.id, "css");
      if (cssResponse && cssResponse.content) {
        setGeneratedCode((prev) => ({
          ...prev,
          css: cssResponse.content,
        }));
      } else {
        console.error("Failed to generate CSS variables: No content received.", cssResponse);
      }

      // Generate JSON tokens
      const jsonResponse = await exportApi.exportTheme(theme.id, "json");
      if (jsonResponse && jsonResponse.content) {
        setGeneratedCode((prev) => ({
          ...prev,
          json: jsonResponse.content,
        }));
      } else {
        console.error("Failed to generate JSON tokens: No content received.", jsonResponse);
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading Tintly...</p>
        </div>
      </div>
    );
  }

  if (!theme) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-red-500 mb-4">Failed to load theme</p>
          <Button onClick={loadDefaultTheme}>Try Again</Button>
        </div>
      </div>
    );
  }

  const scrollToEditor = () => {
    editorRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Wrench className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">tintly</span>
              </div>
              <nav className="hidden md:flex gap-6 ml-8">
                <a
                  href="#examples"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Examples
                </a>
                <a
                  href="#features"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Pricing
                </a>
                <a
                  href="#roadmap"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Roadmap
                </a>
                <a
                  href="#faq"
                  className="text-sm hover:text-primary transition-colors"
                >
                  FAQ
                </a>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Github className="h-4 w-4" />
                <span>7.2k</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90"
                onClick={scrollToEditor}
              >
                Try It Now
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Section - Hero Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit">
                <Sparkles className="h-3 w-3 mr-1" />
                Visual Theme Editor
              </Badge>

              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
                  Design Your{" "}
                  <span className="italic font-normal text-muted-foreground">
                    Perfect
                  </span>
                  <br />
                  <span className="text-primary">shadcn/ui</span> Theme
                </h1>

                <p className="text-lg text-muted-foreground max-w-md">
                  Customize colors, typography, and layouts with a real-time
                  preview. No signup required.
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                  onClick={scrollToEditor}
                >
                  Start Customizing
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  View Examples
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Real-time Preview</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Export to Tailwind</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Beautiful Presets</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Interactive Theme Editor */}
          <div ref={editorRef} className="lg:sticky lg:top-24">
            <Card className="w-full max-w-lg mx-auto">
              {/* Card Header with Traffic Light Controls */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-6 space-y-6">
                {/* Color Palette Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Color Palette</h3>
                    <Button variant="ghost" size="sm">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Color Gradient Bar */}
                  <div className="space-y-3">
                    <div
                      className="h-8 rounded-lg"
                      style={{
                        background: `linear-gradient(to right, ${theme.colors.primary[500]}, ${theme.colors.secondary[500]}, ${theme.colors.accent[500]}, ${theme.colors.muted[100]}, ${theme.colors.background})`,
                      }}
                    />

                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Primary</span>
                      <span>Secondary</span>
                      <span>Accent</span>
                      <span>Muted</span>
                      <span>Background</span>
                    </div>
                  </div>
                </div>

                {/* Preview Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Preview</h3>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Code
                      </Button>
                    </div>

                    {/* Color Format Selector */}
                    <div className="flex gap-1 p-1 bg-muted rounded-lg">
                      {(["oklch", "hsl", "rgb", "hex"] as const).map(
                        (format) => (
                          <Button
                            key={format}
                            variant={
                              colorFormat === format ? "default" : "ghost"
                            }
                            size="sm"
                            onClick={() => setColorFormat(format)}
                            className="text-xs"
                          >
                            {format}
                          </Button>
                        )
                      )}
                    </div>

                    {/* UI Component Preview */}
                    <div className="space-y-3">
                      <div
                        className="p-4 rounded-lg border"
                        style={{
                          backgroundColor: theme.colors.background,
                          borderColor: theme.colors.border,
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold"
                            style={{
                              backgroundColor: theme.colors.primary[500],
                              color: theme.colors.primary.foreground,
                            }}
                          >
                            UI
                          </div>
                          <div className="flex-1">
                            <div
                              className="h-2 rounded mb-1"
                              style={{
                                backgroundColor: theme.colors.foreground,
                                opacity: 0.8,
                              }}
                            />
                            <div
                              className="h-2 rounded w-3/4"
                              style={{
                                backgroundColor: theme.colors.muted.foreground,
                                opacity: 0.6,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Theme Controls */}
                <div className="space-y-4">
                  <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="colors">Colors</TabsTrigger>
                      <TabsTrigger value="design">Design</TabsTrigger>
                    </TabsList>

                    <TabsContent value="colors" className="space-y-4 mt-4">
                      <div className="space-y-3">
                        <ColorPicker
                          label="Primary"
                          value={theme.colors.primary[500]}
                          onChange={(value) =>
                            updateThemeColor("primary.500", value)
                          }
                          showAdvanced={false}
                        />
                        <ColorPicker
                          label="Secondary"
                          value={theme.colors.secondary[500]}
                          onChange={(value) =>
                            updateThemeColor("secondary.500", value)
                          }
                          showAdvanced={false}
                        />
                        <ColorPicker
                          label="Accent"
                          value={theme.colors.accent[500]}
                          onChange={(value) =>
                            updateThemeColor("accent.500", value)
                          }
                          showAdvanced={false}
                        />
                        <ColorPicker
                          label="Background"
                          value={theme.colors.background}
                          onChange={(value) =>
                            updateThemeColor("background", value)
                          }
                          showAdvanced={false}
                        />
                        <ColorPicker
                          label="Foreground"
                          value={theme.colors.foreground}
                          onChange={(value) =>
                            updateThemeColor("foreground", value)
                          }
                          showAdvanced={false}
                        />
                        <ColorPicker
                          label="Border"
                          value={theme.colors.border}
                          onChange={(value) =>
                            updateThemeColor("border", value)
                          }
                          showAdvanced={false}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="design" className="space-y-4 mt-4">
                      <TypographyEditor
                        theme={theme}
                        onUpdate={(updates) =>
                          setTheme((prev) =>
                            prev ? { ...prev, ...updates } : prev
                          )
                        }
                      />
                      <SpacingEditor
                        theme={theme}
                        onUpdate={(updates) =>
                          setTheme((prev) =>
                            prev ? { ...prev, ...updates } : prev
                          )
                        }
                      />
                      <ThemePresets
                        onApplyPreset={(preset) => setTheme(preset)}
                      />
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Export Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Export</h3>
                  {theme.id ? (
                    <ExportOptions themeId={theme.id} themeName={theme.name} />
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-muted-foreground mb-3">
                        Save your theme to export
                      </p>
                      <Button
                        onClick={handleSaveTheme}
                        size="sm"
                        className="w-full"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Theme
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div id="examples">
        <ExamplesPage />
      </div>
      <div id="features">
        <FeaturesPage />
      </div>
      <div id="pricing">
        <PricingPage />
      </div>
      <div id="roadmap">
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