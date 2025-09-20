"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Theme } from "@/lib/api";
import {
  User,
  Mail,
  Lock,
  Search,
  Bell,
  Settings,
  Home,
  FileText,
  Image,
  Download,
  Heart,
  Star,
  MessageCircle,
} from "lucide-react";

interface ThemePreviewProps {
  theme: Theme;
}

export function ThemePreview({ theme }: ThemePreviewProps) {
  // Apply theme colors as CSS variables
  const themeStyle = {
    "--primary": theme.colors.primary[500],
    "--primary-foreground": theme.colors.primary.foreground,
    "--secondary": theme.colors.secondary[500],
    "--secondary-foreground": theme.colors.secondary.foreground,
    "--accent": theme.colors.accent[500],
    "--accent-foreground": theme.colors.accent.foreground,
    "--background": theme.colors.background,
    "--foreground": theme.colors.foreground,
    "--border": theme.colors.border,
    "--input": theme.colors.input,
    "--ring": theme.colors.ring,
    "--card": theme.colors.card.DEFAULT,
    "--card-foreground": theme.colors.card.foreground,
    "--popover": theme.colors.popover.DEFAULT,
    "--popover-foreground": theme.colors.popover.foreground,
    "--muted": theme.colors.muted[100],
    "--muted-foreground": theme.colors.muted.foreground,
  } as React.CSSProperties;

  return (
    <div className="space-y-6 p-6 rounded-lg" style={themeStyle}>
      <Tabs defaultValue="components" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
        </TabsList>

        <TabsContent value="components" className="space-y-6 mt-6">
          <div className="space-y-4">
            <h3
              className="text-lg font-semibold"
              style={{ color: theme.colors.foreground }}
            >
              UI Components
            </h3>

            {/* Buttons */}
            <div className="space-y-3">
              <h4
                className="text-sm font-medium"
                style={{ color: theme.colors.foreground }}
              >
                Buttons
              </h4>
              <div className="flex gap-2 flex-wrap">
                <Button
                  style={{
                    backgroundColor: theme.colors.primary[500],
                    color: theme.colors.primary.foreground,
                  }}
                >
                  Primary
                </Button>
                <Button
                  variant="secondary"
                  style={{
                    backgroundColor: theme.colors.secondary[500],
                    color: theme.colors.secondary.foreground,
                  }}
                >
                  Secondary
                </Button>
                <Button
                  variant="outline"
                  style={{
                    borderColor: theme.colors.border,
                    color: theme.colors.foreground,
                  }}
                >
                  Outline
                </Button>
                <Button
                  variant="ghost"
                  style={{ color: theme.colors.foreground }}
                >
                  Ghost
                </Button>
              </div>
            </div>

            {/* Cards */}
            <div className="space-y-3">
              <h4
                className="text-sm font-medium"
                style={{ color: theme.colors.foreground }}
              >
                Cards
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card
                  style={{
                    backgroundColor: theme.colors.background,
                    borderColor: theme.colors.border,
                  }}
                >
                  <CardHeader>
                    <CardTitle style={{ color: theme.colors.foreground }}>
                      Card Title
                    </CardTitle>
                    <CardDescription
                      style={{ color: theme.colors.muted.foreground }}
                    >
                      Card description with muted text.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p style={{ color: theme.colors.foreground }}>
                      Card content with your theme colors applied.
                    </p>
                  </CardContent>
                </Card>

                <Card
                  style={{
                    backgroundColor: theme.colors.accent[500],
                    borderColor: theme.colors.border,
                  }}
                >
                  <CardHeader>
                    <CardTitle
                      style={{ color: theme.colors.accent.foreground }}
                    >
                      Accent Card
                    </CardTitle>
                    <CardDescription
                      style={{
                        color: theme.colors.accent.foreground,
                        opacity: 0.8,
                      }}
                    >
                      Card with accent background.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>

            {/* Badges */}
            <div className="space-y-3">
              <h4
                className="text-sm font-medium"
                style={{ color: theme.colors.foreground }}
              >
                Badges
              </h4>
              <div className="flex gap-2 flex-wrap">
                <Badge
                  style={{
                    backgroundColor: theme.colors.primary[500],
                    color: theme.colors.primary.foreground,
                  }}
                >
                  Primary
                </Badge>
                <Badge
                  variant="secondary"
                  style={{
                    backgroundColor: theme.colors.secondary[500],
                    color: theme.colors.secondary.foreground,
                  }}
                >
                  Secondary
                </Badge>
                <Badge
                  variant="outline"
                  style={{
                    borderColor: theme.colors.border,
                    color: theme.colors.foreground,
                  }}
                >
                  Outline
                </Badge>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="forms" className="space-y-6 mt-6">
          <div className="space-y-4">
            <h3
              className="text-lg font-semibold"
              style={{ color: theme.colors.foreground }}
            >
              Form Elements
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium"
                  style={{ color: theme.colors.foreground }}
                >
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  style={{
                    borderColor: theme.colors.border,
                    backgroundColor: theme.colors.background,
                  }}
                />
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium"
                  style={{ color: theme.colors.foreground }}
                >
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  style={{
                    borderColor: theme.colors.border,
                    backgroundColor: theme.colors.background,
                  }}
                />
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium"
                  style={{ color: theme.colors.foreground }}
                >
                  Message
                </label>
                <Textarea
                  placeholder="Enter your message"
                  rows={3}
                  style={{
                    borderColor: theme.colors.border,
                    backgroundColor: theme.colors.background,
                  }}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="rounded border-gray-300"
                  style={{ accentColor: theme.colors.primary[500] }}
                />
                <label
                  htmlFor="terms"
                  className="text-sm"
                  style={{ color: theme.colors.foreground }}
                >
                  I agree to the terms and conditions
                </label>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="layout" className="space-y-6 mt-6">
          <div className="space-y-4">
            <h3
              className="text-lg font-semibold"
              style={{ color: theme.colors.foreground }}
            >
              Layout Examples
            </h3>

            {/* Navigation Bar */}
            <div
              className="flex items-center justify-between p-4 rounded-lg border"
              style={{
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="font-bold"
                  style={{ color: theme.colors.foreground }}
                >
                  Brand
                </div>
                <nav className="hidden md:flex gap-6">
                  <a
                    href="#"
                    className="text-sm hover:opacity-80"
                    style={{ color: theme.colors.foreground }}
                  >
                    Home
                  </a>
                  <a
                    href="#"
                    className="text-sm hover:opacity-80"
                    style={{ color: theme.colors.muted.foreground }}
                  >
                    About
                  </a>
                  <a
                    href="#"
                    className="text-sm hover:opacity-80"
                    style={{ color: theme.colors.muted.foreground }}
                  >
                    Contact
                  </a>
                </nav>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  style={{ borderColor: theme.colors.border }}
                >
                  <Bell className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  style={{
                    backgroundColor: theme.colors.primary[500],
                    color: theme.colors.primary.foreground,
                  }}
                >
                  <User className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card
                style={{
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.border,
                }}
              >
                <CardHeader>
                  <CardTitle style={{ color: theme.colors.foreground }}>
                    Card Title
                  </CardTitle>
                  <CardDescription
                    style={{ color: theme.colors.muted.foreground }}
                  >
                    Card description with your theme colors.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p style={{ color: theme.colors.foreground }}>
                    This card demonstrates how your theme looks in a real
                    layout.
                  </p>
                </CardContent>
              </Card>

              <Card
                style={{
                  backgroundColor: theme.colors.accent[500],
                  borderColor: theme.colors.border,
                }}
              >
                <CardHeader>
                  <CardTitle style={{ color: theme.colors.accent.foreground }}>
                    Accent Card
                  </CardTitle>
                  <CardDescription
                    style={{
                      color: theme.colors.accent.foreground,
                      opacity: 0.8,
                    }}
                  >
                    Card with accent background.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card
                style={{
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.border,
                }}
              >
                <CardHeader>
                  <CardTitle style={{ color: theme.colors.foreground }}>
                    Another Card
                  </CardTitle>
                  <CardDescription
                    style={{ color: theme.colors.muted.foreground }}
                  >
                    More content to show theme consistency.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      style={{
                        backgroundColor: theme.colors.primary[500],
                        color: theme.colors.primary.foreground,
                      }}
                    >
                      Action
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      style={{ borderColor: theme.colors.border }}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6 mt-6">
          <div className="space-y-4">
            <h3
              className="text-lg font-semibold"
              style={{ color: theme.colors.foreground }}
            >
              Content Examples
            </h3>

            {/* Article Preview */}
            <article className="space-y-4">
              <header>
                <h1
                  className="text-2xl font-bold"
                  style={{ color: theme.colors.foreground }}
                >
                  Sample Article Title
                </h1>
                <p
                  className="text-sm"
                  style={{ color: theme.colors.muted.foreground }}
                >
                  Published on {new Date().toLocaleDateString()}
                </p>
              </header>

              <div className="space-y-3">
                <p style={{ color: theme.colors.foreground }}>
                  This is a sample paragraph showing how your theme will look in
                  a real article. The text uses your theme's foreground color
                  and maintains good readability.
                </p>
                <p style={{ color: theme.colors.foreground }}>
                  Here's another paragraph with <strong>bold text</strong> and{" "}
                  <em>italic text</em>
                  to demonstrate how different text styles appear in your theme.
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Button
                  size="sm"
                  style={{
                    backgroundColor: theme.colors.primary[500],
                    color: theme.colors.primary.foreground,
                  }}
                >
                  <Heart className="h-4 w-4 mr-1" />
                  Like
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  style={{ borderColor: theme.colors.border }}
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Comment
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  style={{ borderColor: theme.colors.border }}
                >
                  <Star className="h-4 w-4 mr-1" />
                  Save
                </Button>
              </div>
            </article>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
