"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Hobby",
    price: "Free",
    description: "For personal projects and experiments.",
    features: [
      "Unlimited themes",
      "Community support",
      "Export to Tailwind, CSS, and JSON",
    ],
  },
  {
    name: "Pro",
    price: "$10",
    priceSuffix: "/ month",
    description: "For professional developers and teams.",
    features: [
      "All features in Hobby",
      "Priority support",
      "Private themes",
      "Team collaboration",
    ],
  },
  {
    name: "Enterprise",
    price: "Contact Us",
    description: "For large organizations with custom needs.",
    features: [
      "All features in Pro",
      "On-premise deployment",
      "Custom integrations",
      "Dedicated support",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Pricing</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <Card key={tier.name}>
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-3xl font-bold">{tier.price}</p>
                  <p className="text-muted-foreground">
                    {tier.description}
                  </p>
                </div>
                <ul className="space-y-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full">Get Started</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
