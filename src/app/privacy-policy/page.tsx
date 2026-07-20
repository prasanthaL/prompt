import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | AIPromptNest",
  description: "Read the Privacy Policy of AIPromptNest to understand how we manage, collect, and safeguard your data.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "June 16, 2026";

  return (
    <main className="min-h-screen mesh-gradient text-foreground">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-32 md:pt-40 mb-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] font-black text-foreground/20 uppercase tracking-[0.2em] mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="opacity-50">/</span>
          <span className="text-foreground/40">Privacy Policy</span>
        </div>

        {/* Header */}
        <div className="mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
            <Shield className="w-3 h-3" />
            Legal Center
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-xs text-white/40">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Content Box */}
        <div className="glass-dark border border-white/[0.08] p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden space-y-8 text-foreground/75 leading-relaxed text-sm md:text-base">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              1. Introduction
            </h2>
            <p>
              At AIPromptNest ("we", "our", "us"), we value your privacy. This Privacy Policy details how we collect, use, and protect your information when you visit our website at <Link href="/" className="text-primary hover:underline font-semibold">aipromptnest.com</Link> and use our curated collection of Google Gemini prompts.
            </p>
            <p>
              By accessing our services, you agree to the practices outlined in this policy. If you do not agree with these terms, please do not use our website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              2. Information We Collect
            </h2>
            <p>
              We aim to collect only the minimum necessary information to provide a smooth prompt browsing experience. We collect information in the following ways:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-white">Usage Information:</strong> Through standard server logs and third-party analytical tools, we automatically collect basic analytics data, including your IP address, browser type, operating system, and pages visited, to analyze platform performance.
              </li>
              <li>
                <strong className="text-white">Communication Data:</strong> If you contact us via our Contact Form or support email, we collect your name, email address, subject, and the contents of your message to answer your support ticket.
              </li>
              <li>
                <strong className="text-white">Prompt Contributions:</strong> If you submit prompt templates to our vaults, we collect the prompt text and associated metadata you provide.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              3. How We Use Your Information
            </h2>
            <p>
              We process information for the following specific purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To supply, optimize, and maintain our free AI prompt library website.</li>
              <li>To respond to user messages, complaints, feedbacks, and technical inquiries.</li>
              <li>To filter, identify, and combat website security threats, automated scraping abuses, or spam.</li>
              <li>To update search engines and compile platform performance indices.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              4. Cookies and Tracking Technologies
            </h2>
            <p>
              We use functional cookies to save local preference states (such as your chosen display theme - light or dark). Third-party services like Google Analytics may collect cookies and generate analytics to measure general audience patterns. You can manage or disable cookie tracking directly inside your personal browser options.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              5. Third-Party Services and External Links
            </h2>
            <p>
              Our website links to external sites (such as Google Gemini, social media pages, and blogs). We do not control or endorse the privacy terms, contents, or activities of these third-party domains. Please review the policies of external platforms prior to navigating their services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              6. Data Security
            </h2>
            <p>
              We employ standard encryption protocols, SSL connections, and server configurations to guard your digital data against unauthorized viewing, destruction, or leak. However, please remember that no web connection or physical network storage is 100% secure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              7. Changes to this Policy
            </h2>
            <p>
              We may revise our Privacy Policy periodically. We recommend checking this page from time to time to view changes. Your continued usage of our services after updates are published indicates your acknowledgment of the changes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              8. Contact Us
            </h2>
            <p>
              If you have any questions, comments, or concerns regarding our Privacy Policy practices, please navigate to our <Link href="/contact" className="text-primary hover:underline font-semibold">Contact Us</Link> page or email us directly at <a href="mailto:hello.aipromptnest@gmail.com" className="text-primary hover:underline font-semibold">hello.aipromptnest@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
