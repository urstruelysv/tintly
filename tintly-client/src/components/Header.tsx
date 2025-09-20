"use client";

import { Button } from "@/components/ui/button";
import { Github, Sun, Moon, ArrowRight, Wrench } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  scrollToEditor: () => void;
}

export function Header({ scrollToEditor }: HeaderProps) {
  const [darkMode, setDarkMode] = useState(false);

  return (
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
  );
}