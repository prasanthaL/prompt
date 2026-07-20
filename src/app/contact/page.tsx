import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { Mail, MessageSquare, ShieldCheck, ChevronRight, HelpCircle, Sparkles, Send } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aipromptnest.com"),
  title: "Contact Us - Support & Inquiries | AIPromptNest",
  description:
    "Get in touch with AIPromptNest. Reach out for prompt assistance, technical support, feature requests, or explore partnership opportunities.",
  keywords: [
    "Contact AIPromptNest",
    "AI prompt nest contact",
    "Gemini prompt support",
    "AI prompt feedback",
    "Google Gemini prompts support",
    "AI prompt engineering contact",
    "AI art support team",
    "AIPromptNest help desk",
  ],
  alternates: {
    canonical: "https://www.aipromptnest.com/contact",
  },
  category: "Technology",
};

/* Structured Data for ContactPage, Breadcrumbs, and Contact FAQ */
const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://www.aipromptnest.com/contact#webpage",
  url: "https://www.aipromptnest.com/contact",
  name: "Contact AIPromptNest Support",
  headline: "Get in Touch with AIPromptNest Support",
  description:
    "Reach out to AIPromptNest for support, feature requests, or business partnership inquiries.",
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: "AIPromptNest",
    url: "https://www.aipromptnest.com",
  },
  mainEntity: {
    "@type": "Organization",
    name: "AIPromptNest",
    url: "https://www.aipromptnest.com",
    email: "hello.aipromptnest@gmail.com",
    logo: "https://www.aipromptnest.com/logo.png",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "hello.aipromptnest@gmail.com",
        availableLanguage: ["English"],
      },
    ],
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
      item: "https://www.aipromptnest.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Contact Us",
      item: "https://www.aipromptnest.com/contact",
    },
  ],
};

const contactFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How quickly does AIPromptNest respond to support inquiries?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our support team typically responds to all inquiries and feedback within 24 to 48 hours.",
      },
    },
    {
      "@type": "Question",
      name: "Are prompt templates on AIPromptNest free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, all AI prompt templates hosted on AIPromptNest are 100% free for commercial and personal visual generation projects.",
      },
    }
  ],
};

export default function ContactPage() {
  return (
    <>
      {/* Inject JSON-LD Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([contactPageJsonLd, breadcrumbJsonLd, contactFaqJsonLd]),
        }}
      />

      <main className="min-h-screen mesh-gradient text-foreground">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 md:pt-40 mb-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em] mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-foreground/20" />
            <span className="text-foreground/60">Contact Us</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
            {/* Left Info Column (5/12 width) */}
            <header className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Support & Help Hub
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Get in <span className="text-gradient">Touch</span>
                </h1>
                <p className="text-foreground/60 text-lg leading-relaxed">
                  Have questions about custom Google Gemini prompts, feature requests, or partnership opportunities? Drop us a line and our team will respond shortly.
                </p>
              </div>

              <div className="space-y-5 pt-2">
                {/* Email support card */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12] transition-all">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-sm font-bold text-white">Email Support</h2>
                    <p className="text-xs text-white/45">Reach our dedicated support inbox</p>
                    <a 
                      href="mailto:hello.aipromptnest@gmail.com" 
                      className="text-sm font-semibold text-primary hover:underline block pt-1"
                    >
                      hello.aipromptnest@gmail.com
                    </a>
                  </div>
                </div>

                {/* Response Duration support card */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12] transition-all">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-sm font-bold text-white">Response Duration</h2>
                    <p className="text-xs text-white/45">We prioritize incoming queries and answer within</p>
                    <p className="text-sm font-semibold text-foreground/80 pt-1">
                      24 to 48 hours
                    </p>
                  </div>
                </div>

                {/* Feedback & Feature Request card */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12] transition-all">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-sm font-bold text-white">Feature Requests</h2>
                    <p className="text-xs text-white/45">Have suggestions or new feature ideas?</p>
                    <p className="text-xs font-semibold text-foreground/80 pt-1">
                      We value community feedback!
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Links Section */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/[0.06] space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4 text-primary" />
                  Need Immediate Answers?
                </div>
                <p className="text-xs text-white/50 leading-relaxed">
                  Check out our Frequently Asked Questions section to find answers to common questions about prompts, licensing, and usage.
                </p>
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline pt-1"
                >
                  Visit FAQ Center
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </header>

            {/* Right Form Column (7/12 width) */}
            <section className="lg:col-span-7" aria-labelledby="contact-form-heading">
              <ContactForm />
            </section>
          </div>

          {/* Bottom Help Highlight Cards */}
          <section className="border-t border-white/[0.06] pt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-primary" />
                General Support
              </h3>
              <p className="text-xs text-foreground/50 leading-relaxed">
                Questions about navigating the directory, prompt formatting, or using prompt outputs in Google Gemini.
              </p>
            </article>

            <article className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-400" />
                Custom Prompts & Requests
              </h3>
              <p className="text-xs text-foreground/50 leading-relaxed">
                Looking for a specialized visual style or domain-specific prompt set? Let us know what you need.
              </p>
            </article>

            <article className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Partnerships & Collaboration
              </h3>
              <p className="text-xs text-foreground/50 leading-relaxed">
                Interested in collaborating, featuring tools, or cross-promoting prompt engineering resources?
              </p>
            </article>
          </section>
        </div>

        <Footer />
      </main>
    </>
  );
}
