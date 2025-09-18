"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColorPicker } from "@/components/ColorPicker";
import { ThemePreview } from "@/components/ThemePreview";
import { ExportOptions } from "@/components/ExportOptions";
import { TypographyEditor } from "@/components/TypographyEditor";
import { SpacingEditor } from "@/components/SpacingEditor";
import { ThemePresets } from "@/components/ThemePresets";
import { themeApi, Theme } from "@/lib/api";
import { Palette, Eye, Download, Plus } from "lucide-react";

export default function ThemeEditor() {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load default theme on mount
  useEffect(() => {
    loadDefaultTheme();
  }, []);

  const loadDefaultTheme = async () => {
    try {
      const defaultTheme = await themeApi.getDefaultTemplate();
      setTheme({
        ...defaultTheme,
        name: "My Custom Theme",
        description: "A beautiful theme created with Tintly",
      });
    } catch (error) {
      console.error("Failed to load default theme:", error);
      alert(
        "Failed to connect to backend. Make sure the server is running on port 3001."
      );
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
      alert("Theme saved successfully!");
    } catch (error) {
      console.error("Failed to save theme:", error);
      alert("Failed to save theme. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const updateThemeColor = (colorPath: string, value: string) => {
    if (!theme) return;

    setTheme((prev) => {
      if (!prev) return prev;
      const newTheme = { ...prev };

      // Handle nested color paths like "primary.500" or "primary.foreground"
      const pathParts = colorPath.split(".");
      let current: any = newTheme.colors;

      for (let i = 0; i < pathParts.length - 1; i++) {
        current = current[pathParts[i]];
      }
      current[pathParts[pathParts.length - 1]] = value;

      return newTheme;
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading Tintly...</p>
        </div>
      </div>
    );
  }

  if (!theme) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Failed to load theme</p>
          <Button onClick={loadDefaultTheme}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Tintly</h1>
            <span className="text-sm text-muted-foreground">
              Theme Generator
            </span>
          </div>
          <Button onClick={handleSaveTheme} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Theme"}
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="editor">Theme Editor</TabsTrigger>
            <TabsTrigger value="presets">Presets</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Panel - Theme Editor */}
              <div className="space-y-6">
                {/* Theme Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Theme Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="theme-name">Theme Name</Label>
                      <Input
                        id="theme-name"
                        value={theme.name}
                        onChange={(e) =>
                          setTheme((prev) =>
                            prev ? { ...prev, name: e.target.value } : prev
                          )
                        }
                        placeholder="My Awesome Theme"
                      />
                    </div>
                    <div>
                      <Label htmlFor="theme-description">Description</Label>
                      <Textarea
                        id="theme-description"
                        value={theme.description || ""}
                        onChange={(e) =>
                          setTheme((prev) =>
                            prev
                              ? { ...prev, description: e.target.value }
                              : prev
                          )
                        }
                        placeholder="Describe your theme..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Color Editor */}
                <Card>
                  <CardHeader>
                    <CardTitle>Colors</CardTitle>
                    <CardDescription>
                      Customize the color palette for your theme
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                      <ColorPicker
                        label="Primary Color"
                        value={theme.colors.primary[500]}
                        onChange={(value) =>
                          updateThemeColor("primary.500", value)
                        }
                        showAdvanced={true}
                      />
                      <ColorPicker
                        label="Primary Foreground"
                        value={theme.colors.primary.foreground}
                        onChange={(value) =>
                          updateThemeColor("primary.foreground", value)
                        }
                      />
                      <ColorPicker
                        label="Secondary Color"
                        value={theme.colors.secondary[500]}
                        onChange={(value) =>
                          updateThemeColor("secondary.500", value)
                        }
                      />
                      <ColorPicker
                        label="Secondary Foreground"
                        value={theme.colors.secondary.foreground}
                        onChange={(value) =>
                          updateThemeColor("secondary.foreground", value)
                        }
                      />
                      <ColorPicker
                        label="Accent Color"
                        value={theme.colors.accent[500]}
                        onChange={(value) =>
                          updateThemeColor("accent.500", value)
                        }
                      />
                      <ColorPicker
                        label="Background"
                        value={theme.colors.background}
                        onChange={(value) =>
                          updateThemeColor("background", value)
                        }
                      />
                      <ColorPicker
                        label="Foreground"
                        value={theme.colors.foreground}
                        onChange={(value) =>
                          updateThemeColor("foreground", value)
                        }
                      />
                      <ColorPicker
                        label="Border"
                        value={theme.colors.border}
                        onChange={(value) => updateThemeColor("border", value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Typography Editor */}
                <TypographyEditor
                  theme={theme}
                  onUpdate={(updates) =>
                    setTheme((prev) => (prev ? { ...prev, ...updates } : prev))
                  }
                />

                {/* Spacing Editor */}
                <SpacingEditor
                  theme={theme}
                  onUpdate={(updates) =>
                    setTheme((prev) => (prev ? { ...prev, ...updates } : prev))
                  }
                />
              </div>

              {/* Right Panel - Preview */}
              <div className="space-y-6">
                <ThemePreview theme={theme} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="presets" className="mt-6">
            <ThemePresets onApplyPreset={(preset) => setTheme(preset)} />
          </TabsContent>

          <TabsContent value="preview" className="mt-6">
            <ThemePreview theme={theme} />
          </TabsContent>

          <TabsContent value="export" className="mt-6">
            {theme.id ? (
              <ExportOptions themeId={theme.id} themeName={theme.name} />
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground mb-4">
                    Save your theme first to enable exports
                  </p>
                  <Button onClick={handleSaveTheme} className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Save Theme
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
