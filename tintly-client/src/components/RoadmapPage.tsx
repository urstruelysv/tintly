"use client";

import { Badge } from "@/components/ui/badge";

const roadmapItems = [
  {
    name: "Q3 2024",
    features: [
      { name: "Team Collaboration", status: "In Progress" },
      { name: "Private Themes", status: "In Progress" },
      { name: "Figma Plugin", status: "Planned" },
    ],
  },
  {
    name: "Q4 2024",
    features: [
      { name: "AI Theme Generation", status: "Planned" },
      { name: "Component Library", status: "Planned" },
      { name: "VS Code Extension", status: "Planned" },
    ],
  },
  {
    name: "2025",
    features: [
      { name: "Animations and Transitions", status: "Planned" },
      { name: "Accessibility Checker", status: "Planned" },
      { name: "More Export Options", status: "Planned" },
    ],
  },
];

export default function RoadmapPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Roadmap</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here's what we're working on and what's coming next.
          </p>
        </div>

        <div className="space-y-8">
          {roadmapItems.map((item) => (
            <div key={item.name} className="space-y-4">
              <h2 className="text-2xl font-bold">{item.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {item.features.map((feature) => (
                  <div key={feature.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        {feature.name}
                      </h3>
                      <Badge
                        variant={
                          feature.status === "In Progress"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {feature.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
