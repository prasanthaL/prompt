import { HelpCircle, FileQuestion, BookOpen, Key, Users, LucideIcon } from "lucide-react";

export interface FAQItem {
  id: string;
  category: "general" | "prompting" | "licensing" | "submissions";
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  name: string;
  icon: LucideIcon;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: "g1",
    category: "general",
    question: "What is AIPromptNest?",
    answer: "AIPromptNest is a free, expert-curated repository of Gemini AI prompts. We help creators, prompt engineers, and AI developers find organized, high-quality, and tested prompt templates for generating high-definition images, code, and text using Google Gemini."
  },
  {
    id: "g2",
    category: "general",
    question: "Is AIPromptNest free to use?",
    answer: "Yes, 100% free! All prompts in our public catalog can be copied and used directly in your projects without any charges, subscription models, or hidden fees. We believe in democratizing access to high-quality prompt engineering templates."
  },
  {
    id: "p1",
    category: "prompting",
    question: "What are Google Gemini AI image prompts?",
    answer: "These are structured text descriptions specifically tailored to steer Google's Gemini models (like Imagen 3) toward producing high-quality artwork. They utilize specific modifiers, stylistic cues, compositions, lighting instructions, and format settings to yield predictable, visually stunning outputs."
  },
  {
    id: "p2",
    category: "prompting",
    question: "How do I use these prompts?",
    answer: "Find a prompt card you love, click 'Copy Prompt', and paste it directly into the Gemini prompt input box. Many prompts feature brackets like [subject] or [color]—you can swap these placeholders out with your own variables to render custom images in that exact style."
  },
  {
    id: "p3",
    category: "prompting",
    question: "Do these prompts work on other AI generators like ChatGPT?",
    answer: "While specifically optimized for Google Gemini's rendering nuances, styles, and prompt weights, the core compositional language, subjects, lighting instructions, and descriptors will work well on Stable Diffusion as well."
  },
  {
    id: "l1",
    category: "licensing",
    question: "Can I use the images generated with these prompts for commercial work?",
    answer: "Yes. The prompts themselves are open-source. The ownership, licensing, and commercial usage rights of the generated output files depend strictly on Google Gemini's Terms of Service. As of now, Google allows commercial application of Gemini-generated assets."
  },
  {
    id: "l2",
    category: "licensing",
    question: "Do I need to attribute or credit AIPromptNest?",
    answer: "No attribution is required. You are completely free to use the prompts for personal and commercial endeavors. However, sharing AIPromptNest with other creators or giving us a shout-out is always greatly appreciated!"
  }
];

export const CATEGORIES: FAQCategory[] = [
  { id: "all", name: "All Questions", icon: HelpCircle },
  { id: "general", name: "General Info", icon: FileQuestion },
  { id: "prompting", name: "Prompting Tips", icon: BookOpen },
  { id: "licensing", name: "Licensing & Rights", icon: Key }
];
