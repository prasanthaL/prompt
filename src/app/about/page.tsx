import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Sparkles, ShieldCheck, Zap, Users, ArrowRight, BookOpen, Heart, Eye, ChevronRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "About Us - Free Google Gemini AI Prompts Library | AIPromptNest",
  description:
    "Learn about AIPromptNest, our curation process, editorial standards, and mission to empower creators with high-quality AI image prompt templates.",
  keywords: [
    "About AIPromptNest",
    "Gemini AI prompts library",
    "Google Gemini prompts",
    "Google Gemini image prompts",
    "free AI image prompts",
    "Gemini prompt engineering",
    "AI image generator prompts",
    "AI art prompt directory",
    "Gemini prompts library",
    "Gemini prompt templates",
    "AI prompt nest about",
  ],
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  category: "Technology",
};

/* JSON-LD structured data schemas for AboutPage, Breadcrumbs, and HowTo */
const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about#webpage`,
  url: `${SITE_URL}/about`,
  name: "About AIPromptNest",
  headline: "Empowering Creativity With Gemini AI Prompts",
  description:
    "AIPromptNest is a free, structured library of Google Gemini AI prompts designed to unleash your creative potential with high-fidelity visual generation.",
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: "AIPromptNest",
    url: SITE_URL,
  },
  mainEntity: {
    "@type": "Organization",
    name: "AIPromptNest",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "AIPromptNest is a free prompt library offering structured AI image prompt templates for Google Gemini and ChatGPT image generation.",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About Us",
      item: `${SITE_URL}/about`,
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use Google Gemini AI Prompts on AIPromptNest",
  description: "Get up and running with Google Gemini image generation in four simple steps using AIPromptNest prompts.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Browse library",
      text: "Explore categories or search for specific visual styles in our library.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "One-click copy",
      text: "Copy the prompt text to your clipboard with one click.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Paste in Gemini",
      text: "Enter the copied prompt directly into Google Gemini to generate images.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Customize art",
      text: "Swap bracketed terms for your custom visual variations and unique styles.",
    },
  ],
};

const FEATURES = [
  {
    icon: Sparkles,
    title: "Free Community Access",
    desc: "Our mission is to keep prompt engineering accessible. Browse and copy every single prompt without any subscription or hidden fees."
  },
  {
    icon: ShieldCheck,
    title: "Structured Prompt Library",
    desc: "Prompts are organized by category, style, model, and use case so you can quickly find what works for your creative project."
  },
  {
    icon: Zap,
    title: "Regularly Updated",
    desc: "We add new prompt templates, styles, and guides on an ongoing basis to keep the library relevant and useful."
  },
  {
    icon: Users,
    title: "Community First",
    desc: "Built for creators, by creators. We support the AI art community and love sharing prompt combinations that work well."
  }
];

export default function AboutPage() {
  return (
    <>
      {/* Inject Structured Data for SEO Rich Snippets */}
      <script
        id="about-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([aboutPageJsonLd, breadcrumbJsonLd, howToJsonLd]),
        }}
      />

      <main className="min-h-screen mesh-gradient text-foreground">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 md:pt-40 mb-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em] mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-foreground/20" />
            <span className="text-foreground/60">About Us</span>
          </nav>

          {/* Hero Section */}
          <section className="mb-20 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3 h-3 animate-pulse" />
              Our Mission
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none">
              Empowering Creativity <br />
              With <span className="text-gradient">Gemini Prompts</span>
            </h1>
            <p className="text-foreground/60 max-w-3xl text-lg md:text-xl leading-relaxed">
              Welcome to AIPromptNest, a free AI prompt library built for creators, developers, designers, and AI enthusiasts. We help you find and use structured prompts for Google Gemini and other AI image generators.
            </p>
          </section>

          {/* Story Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-28">
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
                &quot;The limit of your AI is the detail of your prompt. We refine the syntax so you can release the vision.&quot;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-white shadow-lg shadow-primary/20">
                  A
                </div>
                <div>
                  <p className="text-sm font-bold text-white">AIPromptNest Editorial Team</p>
                  <p className="text-xs text-white/40">AI Art & Prompt Library</p>
                </div>
              </div>
            </div>
          </section>

          {/* Who Runs the Site & Curation Process */}
          <section className="mb-28 rounded-[2.5rem] border border-white/[0.08] bg-white/[0.02] p-8 md:p-12 backdrop-blur-md space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[10px] font-bold uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5" />
                Editorial Standards &amp; Transparency
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Who Runs AIPromptNest &amp; How We Curate
              </h2>
              <p className="text-foreground/70 max-w-3xl text-sm md:text-base leading-relaxed">
                AIPromptNest is an independent digital resource created and maintained by the AIPromptNest team. We built this platform to provide a clean, free library of organized AI prompt templates for creators, designers, and enthusiasts. If you have questions, feedback, or would like to suggest new prompt ideas, you can reach us anytime at <Link href="/contact" className="text-primary hover:underline font-semibold">our contact page</Link> or by email at <a href="mailto:hello.aipromptnest@gmail.com" className="text-primary hover:underline font-semibold">hello.aipromptnest@gmail.com</a>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Our Purpose
                </h3>
                <p className="text-foreground/60 text-xs sm:text-sm leading-relaxed">
                  Most online prompt collections share brief, repetitive snippets that produce erratic results. Our mission is to provide creators with practical, well-parameterized prompt blueprints that include lighting directives, aspect ratios, composition guidance, and model-specific adjustments.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  How Prompts Are Collected &amp; Reviewed
                </h3>
                <p className="text-foreground/60 text-xs sm:text-sm leading-relaxed">
                  Prompts are collected, organised into categories, cleaned up, and checked for clarity and completeness before they are published. Results can vary between AI models, so we encourage you to adapt prompts to your own needs.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Organization &amp; Quality Tiers
                </h3>
                <p className="text-foreground/60 text-xs sm:text-sm leading-relaxed">
                  Our catalog is structured to help creators find useful ideas quickly: core indexed prompts include in-depth notes analyzing composition, lighting, common model failure modes, and concrete variation adjustments. Less structured or repetitive prompts remain unindexed.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Library Maintenance &amp; Updates
                </h3>
                <p className="text-foreground/60 text-xs sm:text-sm leading-relaxed">
                  The library is maintained and audited on an ongoing basis. As AI models evolve with new architecture updates and styling capabilities, we review prompt parameters and release new visual concepts to keep the collection relevant.
                </p>
              </div>
            </div>
          </section>

          {/* Feature Highlights Grid */}
          <section className="mb-28 space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What We Offer</h2>
              <p className="text-foreground/40 text-sm max-w-xl mx-auto">
                Our platform is designed from the ground up to support modern AI image generation workflows.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {FEATURES.map((feat, idx) => (
                <article 
                  key={idx}
                  className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.06] hover:border-primary/30 transition-all duration-300 relative group overflow-hidden"
                >
                  <div className="absolute -inset-px bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2rem]" />
                  <div className="w-12 h-12 bg-primary/10 border border-primary/25 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                    <feat.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{feat.title}</h3>
                  <p className="text-foreground/50 text-sm leading-relaxed">{feat.desc}</p>
                </article>
              ))}
            </div>
          </section>

          {/* How It Works Section */}
          <section className="mb-28 rounded-[3rem] bg-white/[0.01] border border-white/[0.04] p-8 md:p-16 relative overflow-hidden backdrop-blur-sm">
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
                  { step: "02", name: "One-click copy", desc: "Copy the prompt text to your clipboard." },
                  { step: "03", name: "Paste in Gemini", desc: "Enter it directly into Gemini to generate images." },
                  { step: "04", name: "Customize art", desc: "Swap bracketed terms for your custom visual variations." },
                ].map((step, i) => (
                  <div key={i} className="space-y-4 relative">
                    <div className="text-3xl font-extrabold text-primary/30 font-mono tracking-wider">{step.step}</div>
                    <h3 className="text-base font-bold text-white">{step.name}</h3>
                    <p className="text-xs text-white/45 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Banner */}
          <section className="text-center rounded-[2.5rem] bg-gradient-to-r from-violet-900/10 via-primary/5 to-blue-900/10 border border-primary/25 p-8 md:p-16 relative overflow-hidden">
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
          </section>
        </div>

        <Footer />
      </main>
    </>
  );
}
