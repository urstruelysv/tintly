"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Tintly?",
    answer:
      "Tintly is a visual theme editor for shadcn/ui that allows you to create and customize your own themes with a real-time preview.",
  },
  {
    question: "Is it free to use?",
    answer:
      "Yes, Tintly is free for personal and commercial use. We offer a Pro plan with additional features for professional developers and teams.",
  },
  {
    question: "How do I export my theme?",
    answer:
      "You can export your theme as a Tailwind CSS config file, CSS variables, or a JSON file. Simply click the 'Export' button and choose your desired format.",
  },
  {
    question: "Can I use my own fonts?",
    answer:
      "Currently, we only support Google Fonts. However, we are planning to add support for custom fonts in the future.",
  },
  {
    question: "Do you have a Figma plugin?",
    answer:
      "We are currently working on a Figma plugin that will allow you to sync your themes between Tintly and Figma. Stay tuned for updates!",
  },
];

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">FAQ</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Frequently Asked Questions
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}