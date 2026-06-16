import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Sparkles, ShieldCheck, Zap, Users, ArrowRight, BookOpen, Heart, Eye } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | AIPromptNest",
  description: "Learn more about AIPromptNest, a free curated library of Google Gemini AI prompts designed to unleash your creative potential.",
  alternates: {
    canonical: "/about",
  },
};

const FEATURES = [
  {
    icon: Sparkles,
    title: "100% Free Forever",
    desc: "Our mission is to keep prompt engineering accessible. Browse and copy every single prompt without any subscription or hidden fees."
  },
  {
    icon: ShieldCheck,
    title: "Expert Curated Quality",
    desc: "We rigorously test and refine our prompts to ensure they generate stunning, high-resolution results in Gemini's models."
  },
  {
    icon: Zap,
    title: "Updated Daily",
    desc: "AI moves fast, and so do we. We publish new prompt templates, styles, and guides every day to keep your creative assets fresh."
  },
  {
    icon: Users,
    title: "Community First",
    desc: "Built for creators, by creators. We support the AI art community and love sharing prompt combinations that work wonders."
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen mesh-gradient text-foreground pb-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 md:pt-40">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] font-black text-foreground/20 uppercase tracking-[0.2em] mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="opacity-50">/</span>
          <span className="text-foreground/40">About Us</span>
        </div>

        {/* Hero Section */}
        <div className="mb-20 space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
            <Sparkles className="w-3 h-3 animate-pulse" />
            Our Mission
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none">
            Empowering Creativity <br />
            With <span className="text-gradient">Gemini Prompts</span>
          </h1>
          <p className="text-foreground/60 max-w-3xl text-lg md:text-xl leading-relaxed">
            Welcome to AIPromptNest, the premier prompt database designed specifically to push the boundaries of Google Gemini. We help developers, designers, writers, and AI enthusiasts get precise, high-fidelity results.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-28">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Why AIPromptNest Exists
            </h2>
            <div className="h-1 w-20 bg-primary rounded" />
            <p className="text-foreground/60 leading-relaxed">
              Generative AI is transforming how we construct visuals, code, and write copy. However, obtaining the exact output you envision requires more than basic commands—it requires refined prompt engineering.
            </p>
            <p className="text-foreground/60 leading-relaxed">
              We founded AIPromptNest to bridge the gap between simple text inputs and professional-grade AI outputs. By curating structured templates with variable styling modifiers, we provide the building blocks you need to excel.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <Eye className="w-4.5 h-4.5 text-violet-400" />
                <span className="text-xs font-semibold text-foreground/85">Visual Clarity</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <BookOpen className="w-4.5 h-4.5 text-violet-400" />
                <span className="text-xs font-semibold text-foreground/85">Educational Value</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <Heart className="w-4.5 h-4.5 text-violet-400" />
                <span className="text-xs font-semibold text-foreground/85">Creative Freedom</span>
              </div>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-white/[0.02] p-8 md:p-12 backdrop-blur-xl flex flex-col justify-center gap-6">
            {/* Ambient light glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[80px]" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Key Philosophy</span>
            <blockquote className="text-xl md:text-2xl font-medium italic leading-relaxed text-foreground/90">
              "The limit of your AI is the detail of your prompt. We refine the syntax so you can release the vision."
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-white shadow-lg shadow-primary/20">
                P
              </div>
              <div>
                <p className="text-sm font-bold text-white">The PromptNest Curators</p>
                <p className="text-xs text-white/40">AI Art & Engineering Group</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mb-28 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What We Offer</h2>
            <p className="text-foreground/40 text-sm max-w-xl mx-auto">
              Our platform is designed from the ground up to support modern AI image generation workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURES.map((feat, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.06] hover:border-primary/30 transition-all duration-300 relative group overflow-hidden"
              >
                <div className="absolute -inset-px bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2rem]" />
                <div className="w-12 h-12 bg-primary/10 border border-primary/25 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <feat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{feat.title}</h3>
                <p className="text-foreground/50 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-28 rounded-[3rem] bg-white/[0.01] border border-white/[0.04] p-8 md:p-16 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-600/[0.03] rounded-full blur-[120px]" />
          
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How It Works</h2>
              <p className="text-foreground/40 text-sm max-w-lg mx-auto">
                Get up and running with Google Gemini image generation in four simple steps.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative">
              {[
                { step: "01", name: "Browse library", desc: "Explore categories or search for specific visual styles." },
                { step: "02", name: "One-click copy", desc: "Copy the fully optimized prompt to your clipboard." },
                { step: "03", name: "Paste in Gemini", desc: "Enter it directly into Gemini to generate images." },
                { step: "04", name: "Customize art", desc: "Swap bracketed terms for your custom visual variations." },
              ].map((step, i) => (
                <div key={i} className="space-y-4 relative">
                  <div className="text-3xl font-extrabold text-primary/30 font-mono tracking-wider">{step.step}</div>
                  <h4 className="text-base font-bold text-white">{step.name}</h4>
                  <p className="text-xs text-white/45 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center rounded-[2.5rem] bg-gradient-to-r from-violet-900/10 via-primary/5 to-blue-900/10 border border-primary/25 p-8 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
          <div className="max-w-2xl mx-auto space-y-8 relative">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Ready to generate stunning AI visuals?
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              Explore our comprehensive database of categorized Google Gemini prompts. Cinematic realism, artistic illustrations, anime styling, and fantasy concept designs are just a click away.
            </p>
            <div>
              <Link 
                href="/browse"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold py-3.5 px-8 rounded-full shadow-lg shadow-primary/30 transition-all hover:scale-105"
              >
                Browse Prompts
                <ArrowRight className="w-4.5 h-4.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
