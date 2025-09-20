"use client";

import { Check } from "lucide-react";

const features = [
  {
    name: "Real-time Preview",
    description: "See your changes instantly as you edit your theme.",
  },
  {
    name: "Color Palette Editor",
    description: "Customize your color palette with a simple and intuitive editor.",
  },
  {
    name: "Typography Control",
    description: "Adjust font sizes, weights, and line heights to match your brand.",
  },
  {
    name: "Spacing and Layout",
    description: "Fine-tune spacing and layout options for a polished look.",
  },
  {
    name: "Export to Tailwind CSS",
    description: "Export your theme as a Tailwind CSS config file.",
  },
  {
    name: "Export to CSS Variables",
    description: "Export your theme as CSS variables for use in any project.",
  },
  {
    name: "Export to JSON",
    description: "Export your theme as a JSON file for use with design systems.",
  },
  {
    name: "Theme Presets",
    description: "Choose from a variety of pre-built themes to get started.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Features</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tintly provides all the tools you need to create a stunning
            shadcn/ui theme.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.name} className="space-y-2">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">{feature.name}</h3>
              </div>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
