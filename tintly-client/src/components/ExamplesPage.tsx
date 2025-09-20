"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Search } from "lucide-react";

const exampleThemes = [
  {
    name: "Default",
    description: "The default theme for shadcn/ui.",
    colors: {
      primary: "#000000",
      secondary: "#f1f5f9",
      accent: "#1e293b",
      background: "#ffffff",
    },
    tags: ["Default", "Minimal"],
  },
  {
    name: "Cool Gray",
    description: "A cool, modern theme with a touch of blue.",
    colors: {
      primary: "#4f46e5",
      secondary: "#f1f5f9",
      accent: "#1e293b",
      background: "#ffffff",
    },
    tags: ["Modern", "Blue"],
  },
  {
    name: "Warm Neutral",
    description: "A warm and inviting theme with neutral tones.",
    colors: {
      primary: "#d97706",
      secondary: "#f1f5f9",
      accent: "#1e293b",
      background: "#ffffff",
    },
    tags: ["Warm", "Neutral"],
  },
  {
    name: "Rose",
    description: "A beautiful theme with a rosy touch.",
    colors: {
      primary: "#be123c",
      secondary: "#f1f5f9",
      accent: "#1e293b",
      background: "#ffffff",
    },
    tags: ["Elegant", "Pink"],
  },
  {
    name: "Green",
    description: "A fresh and natural theme with green tones.",
    colors: {
      primary: "#16a34a",
      secondary: "#f1f5f9",
      accent: "#1e293b",
      background: "#ffffff",
    },
    tags: ["Nature", "Green"],
  },
  {
    name: "Blue",
    description: "A cool and calming theme with blue tones.",
    colors: {
      primary: "#2563eb",
      secondary: "#f1f5f9",
      accent: "#1e293b",
      background: "#ffffff",
    },
    tags: ["Calm", "Blue"],
  },
];

export default function ExamplesPage() {
  const [filter, setFilter] = useState("All");

  const filteredThemes = exampleThemes.filter((theme) => {
    if (filter === "All") return true;
    return theme.tags.includes(filter);
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Theme Examples</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore a collection of pre-built themes to get started. Click on a
            theme to see it in action.
          </p>
        </div>

        <div className="flex justify-center gap-2">
          <Button
            variant={filter === "All" ? "default" : "outline"}
            onClick={() => setFilter("All")}
          >
            All
          </Button>
          <Button
            variant={filter === "Modern" ? "default" : "outline"}
            onClick={() => setFilter("Modern")}
          >
            Modern
          </Button>
          <Button
            variant={filter === "Minimal" ? "default" : "outline"}
            onClick={() => setFilter("Minimal")}
          >
            Minimal
          </Button>
          <Button
            variant={filter === "Elegant" ? "default" : "outline"}
            onClick={() => setFilter("Elegant")}
          >
            Elegant
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredThemes.map((theme) => (
            <Card key={theme.name} className="overflow-hidden">
              <div className="h-48 bg-muted flex items-center justify-center">
                <div className="w-32 h-32 rounded-lg bg-background flex items-center justify-center">
                  <div
                    className="w-16 h-16 rounded-full"
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{theme.name}</h3>
                  <p className="text-muted-foreground">
                    {theme.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  {theme.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button className="w-full">
                  View Theme
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
