import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Bot } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Policy | AIPromptNest",
  description:
    "Read the AI Policy of AIPromptNest: how we use AI in our prompt library, how AI-generated content is labeled, and your responsibilities when using prompts with AI tools.",
  alternates: {
    canonical: "/ai-policy",
  },
};

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-bold text-white flex items-center gap-2">
    <span className="w-1.5 h-6 bg-primary rounded-full" />
    {children}
  </h2>
);

export default function AIPolicyPage() {
  const lastUpdated = "October 3, 2026";
  const link = "text-primary hover:underline font-semibold";

  return (
    <main className="min-h-screen mesh-gradient text-foreground">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-32 md:pt-40 mb-10">
        <div className="flex items-center gap-2 text-[10px] font-black text-foreground/20 uppercase tracking-[0.2em] mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="opacity-50">/</span>
          <span className="text-foreground/40">AI Policy</span>
        </div>

        <div className="mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
            <Bot className="w-3 h-3" />
            Legal Center
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">AI Policy</h1>
          <p className="text-xs text-white/40">Last Updated: {lastUpdated}</p>
        </div>

        <div className="glass-dark border border-white/[0.08] p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden space-y-8 text-foreground/75 leading-relaxed text-sm md:text-base">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

          <section className="space-y-3">
            <H2>1. Purpose</H2>
            <p>
              AIPromptNest is a free library of prompts for AI image generators such as Google Gemini and ChatGPT. This AI Policy explains how artificial intelligence relates to the content on our site and what we expect from people who use it.
            </p>
          </section>

          <section className="space-y-3">
            <H2>2. AI-Assisted Content</H2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Prompts, descriptions, and preview images on AIPromptNest may be created or refined with the help of AI tools.</li>
              <li>Where AI is used, content is reviewed and curated by our team before publication.</li>
              <li>Preview images shown with a prompt are examples of what an AI model can produce. Results will vary by model, version, and settings.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <H2>3. No Guarantee of Results</H2>
            <p>
              AI models are probabilistic. The same prompt can generate different output each time or on different platforms. We do not guarantee that any prompt will reproduce a particular image, style, or quality.
            </p>
          </section>

          <section className="space-y-3">
            <H2>4. Responsible Use</H2>
            <p>When using prompts from AIPromptNest, you agree not to use them to create content that:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Is illegal, hateful, harassing, or sexually explicit involving minors or non-consenting people.</li>
              <li>Deceptively impersonates real people, including deepfakes intended to mislead.</li>
              <li>Infringes the intellectual property, likeness, or privacy rights of others.</li>
              <li>Violates the terms or usage policies of the AI platform you are using.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <H2>5. Disclosure and Transparency</H2>
            <p>
              We encourage you to disclose when images or text were generated with AI, especially when publishing commercially or on social media, and to follow any labeling rules that apply on those platforms or in your jurisdiction.
            </p>
          </section>

          <section className="space-y-3">
            <H2>6. Ownership and Third-Party Platforms</H2>
            <p>
              Ownership and commercial-use rights for AI-generated output depend on the AI platform you use and applicable law. Please review the terms of that provider, such as{" "}
              <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className={link}>Google</a> or{" "}
              <a href="https://openai.com/policies/terms-of-use" target="_blank" rel="noopener noreferrer" className={link}>OpenAI</a>. AIPromptNest does not operate these services and is not responsible for their output.
            </p>
          </section>

          <section className="space-y-3">
            <H2>7. Your Data and AI</H2>
            <p>
              The prompts you copy from our site are used on third-party AI tools that have their own data practices. Avoid entering personal, confidential, or sensitive information into any AI tool. For how we handle data on our own site, see our{" "}
              <Link href="/privacy-policy" className={link}>Privacy Policy</Link>.
            </p>
          </section>

          <section className="space-y-3">
            <H2>8. Reporting Concerns</H2>
            <p>
              If you believe a prompt or image on AIPromptNest is inaccurate, harmful, or infringes your rights, please tell us and we will review and, where appropriate, remove it.
            </p>
          </section>

          <section className="space-y-3">
            <H2>9. Changes to This Policy</H2>
            <p>We may update this AI Policy as AI technology and regulations evolve. Continued use of our services after updates constitutes acceptance of the revised policy.</p>
          </section>

          <section className="space-y-3">
            <H2>10. Contact Us</H2>
            <p>
              Questions about this AI Policy? Visit our <Link href="/contact" className={link}>Contact page</Link> or email{" "}
              <a href="mailto:hello.aipromptnest@gmail.com" className={link}>hello.aipromptnest@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
