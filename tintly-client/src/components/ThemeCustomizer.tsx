"use client";

import { useRef } from "react";
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
import { TypographyEditor } from "@/components/TypographyEditor";
import { SpacingEditor } from "@/components/SpacingEditor";
import { ThemePresets } from "@/components/ThemePresets";
import { Theme } from "@/lib/api";
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

interface ThemeCustomizerProps {
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
  setTheme: React.Dispatch<React.SetStateAction<Theme | null>>;
}

export function ThemeCustomizer({
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
  setTheme,
}: ThemeCustomizerProps) {
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

  return (
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
                  background: theme?.colors ? `linear-gradient(to right, ${theme.colors.primary[500]}, ${theme.colors.secondary[500]}, ${theme.colors.accent[500]}, ${theme.colors.muted[100]}, ${theme.colors.background})` : ''
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
                {(["oklch", "hsl", "rgb", "hex"] as const).map((format) => (
                  <Button
                    key={format}
                    variant={colorFormat === format ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setColorFormat(format)}
                    className="text-xs"
                  >
                    {format}
                  </Button>
                ))}
              </div>

              {/* UI Component Preview */}
              <div className="space-y-3">
                <div
                  className="p-4 rounded-lg border"
                  style={{
                    backgroundColor: theme?.colors?.background,
                    borderColor: theme?.colors?.border,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold"
                      style={{
                        backgroundColor: theme?.colors?.primary[500],
                        color: theme?.colors?.primary.foreground,
                      }}
                    >
                      UI
                    </div>
                    <div className="flex-1">
                      <div
                        className="h-2 rounded mb-1"
                        style={{
                          backgroundColor: theme?.colors?.foreground,
                          opacity: 0.8,
                        }}
                      />
                      <div
                        className="h-2 rounded w-3/4"
                        style={{
                          backgroundColor: theme?.colors?.muted.foreground,
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
                    value={theme?.colors?.primary[500] || ''}
                    onChange={(value) =>
                      updateThemeColor("primary.500", value)
                    }
                    showAdvanced={false}
                  />
                  <ColorPicker
                    label="Secondary"
                    value={theme?.colors?.secondary[500] || ''}
                    onChange={(value) =>
                      updateThemeColor("secondary.500", value)
                    }
                    showAdvanced={false}
                  />
                  <ColorPicker
                    label="Accent"
                    value={theme?.colors?.accent[500] || ''}
                    onChange={(value) =>
                      updateThemeColor("accent.500", value)
                    }
                    showAdvanced={false}
                  />
                  <ColorPicker
                    label="Background"
                    value={theme?.colors?.background || ''}
                    onChange={(value) =>
                      updateThemeColor("background", value)
                    }
                    showAdvanced={false}
                  />
                  <ColorPicker
                    label="Foreground"
                    value={theme?.colors?.foreground || ''}
                    onChange={(value) =>
                      updateThemeColor("foreground", value)
                    }
                    showAdvanced={false}
                  />
                  <ColorPicker
                    label="Border"
                    value={theme?.colors?.border || ''}
                    onChange={(value) => updateThemeColor("border", value)}
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
            <Tabs defaultValue="tailwind" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
                <TabsTrigger value="css">CSS</TabsTrigger>
                <TabsTrigger value="json">JSON</TabsTrigger>
              </TabsList>
              <TabsContent value="tailwind" className="space-y-4 mt-4">
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">
                    <code>{generatedCode.tailwind}</code>
                  </pre>
                  <Button
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(generatedCode.tailwind)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="css" className="space-y-4 mt-4">
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">
                    <code>{generatedCode.css}</code>
                  </pre>
                  <Button
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(generatedCode.css)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="json" className="space-y-4 mt-4">
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">
                    <code>{generatedCode.json}</code>
                  </pre>
                  <Button
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(generatedCode.json)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}