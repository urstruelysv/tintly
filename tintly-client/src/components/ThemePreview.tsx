"use client";

import React from "react";
import { Theme } from "@/lib/api";

interface ThemePreviewProps {
  theme: Theme;
}

export function ThemePreview({ theme }: ThemePreviewProps) {
  const styles = {
    "--background": theme.colors?.background || "#ffffff",
    "--foreground": theme.colors?.foreground || "#000000",
    "--primary": theme.colors?.primary?.[500] || "#3b82f6",
    "--primary-foreground": theme.colors?.primary?.foreground || "#ffffff",
    "--secondary": theme.colors?.secondary?.[500] || "#6b7280",
    "--secondary-foreground": theme.colors?.secondary?.foreground || "#ffffff",
    "--accent": theme.colors?.accent?.[500] || "#22d3ee",
    "--accent-foreground": theme.colors?.accent?.foreground || "#000000",
    "--muted": theme.colors?.muted?.[100] || "#f1f5f9",
    "--muted-foreground": theme.colors?.muted?.foreground || "#6b7280",
    "--border": theme.colors?.border || "#e5e7eb",
    "--ring": theme.colors?.ring || "#3b82f6",
    "--card": theme.colors?.card?.DEFAULT || "#ffffff",
    "--card-foreground":
      theme.colors?.card?.foreground || theme.colors?.foreground || "#000000",
    "--popover": theme.colors?.popover?.DEFAULT || "#ffffff",
    "--popover-foreground":
      theme.colors?.popover?.foreground ||
      theme.colors?.foreground ||
      "#000000",
  } as React.CSSProperties;

  return (
    <div className="rounded-lg border p-6 space-y-4" style={styles}>
      <h2
        className="text-xl font-semibold"
        style={{ color: "var(--foreground)" }}
      >
        Theme Preview
      </h2>
      <p style={{ color: "var(--muted-foreground)" }}>
        This is a sample text to show how your theme looks.
      </p>
      <button
        className="px-4 py-2 rounded-md"
        style={{
          backgroundColor: "var(--primary)",
          color: "var(--primary-foreground)",
        }}
      >
        Primary Button
      </button>
      <button
        className="px-4 py-2 rounded-md border"
        style={{
          backgroundColor: "var(--secondary)",
          color: "var(--secondary-foreground)",
          borderColor: "var(--border)",
        }}
      >
        Secondary Button
      </button>
      <div
        className="p-4 rounded-md"
        style={{
          backgroundColor: "var(--card)",
          color: "var(--card-foreground)",
          border: "1px solid var(--border)",
        }}
      >
        Card Example
      </div>
    </div>
  );
}
