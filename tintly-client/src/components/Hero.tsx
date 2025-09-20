"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Check } from "lucide-react";

interface HeroProps {
  scrollToEditor: () => void;
}

export function Hero({ scrollToEditor }: HeroProps) {
  return (
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
            Customize colors, typography, and layouts with a real-time preview.
            No signup required.
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
  );
}