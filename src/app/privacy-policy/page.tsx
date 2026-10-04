import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | AIPromptNest",
  description: "Read the Privacy Policy of AIPromptNest to understand how we collect, use, and protect your data, including our use of Google AdSense and Google Analytics.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 1, 2026";

  return (
    <main className="min-h-screen mesh-gradient text-foreground">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-32 md:pt-40 mb-10">
        <div className="flex items-center gap-2 text-[10px] font-black text-foreground/20 uppercase tracking-[0.2em] mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="opacity-50">/</span>
          <span className="text-foreground/40">Privacy Policy</span>
        </div>

        <div className="mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
            <Shield className="w-3 h-3" />
            Legal Center
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-xs text-white/40">Last Updated: {lastUpdated}</p>
        </div>

        <div className="glass-dark border border-white/[0.08] p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden space-y-8 text-foreground/75 leading-relaxed text-sm md:text-base">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              1. Introduction
            </h2>
            <p>
              At AIPromptNest (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;), we value your privacy. This Privacy Policy explains how we collect, use, and protect your information when you visit <Link href="/" className="text-primary hover:underline font-semibold">aipromptnest.com</Link>.
            </p>
            <p>By accessing our services, you agree to the practices described in this policy.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-white">Usage Information:</strong> IP address, browser type, OS, and pages visited, collected via server logs and analytics tools.</li>
              <li><strong className="text-white">Communication Data:</strong> Name, email, and message contents when you contact us.</li>
              <li><strong className="text-white">Local Storage Data:</strong> Browser localStorage and cookies for the Prompt Discovery daily pick counter and activity tracking.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              3. Cookies and Tracking Technologies
            </h2>
            <p>
              We use functional cookies and localStorage for core site features including session tracking (cookie <code className="text-xs bg-white/10 px-1.5 py-0.5 rounded text-amber-300">apn_uid</code>) for our Daily Prompt Discovery feature.
            </p>
            <p>
              We use <strong className="text-white">Google Analytics</strong> to understand audience patterns. Google Analytics sets its own cookies and collects aggregated usage data.
            </p>
            <p>You can manage, block, or delete cookies at any time in your browser settings or adjust consent via our Cookie settings.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              4. Google AdSense and Advertising
            </h2>
            <p>
              AIPromptNest uses <strong className="text-white">Google AdSense</strong> to display advertisements. Google AdSense is operated by Google LLC and third-party vendors who use cookies and web beacons to serve ads based on your prior visits to our website or other websites on the internet.
            </p>
            <p>
              Google&apos;s use of advertising cookies enables it and its partners to serve personalized ads based on your browsing activity. You may opt out of personalized advertising by visiting{" "}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">Google Ads Settings</a> or{" "}
              <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">aboutads.info</a>.
            </p>
            <p>
              To learn more about how Google collects and processes data when you use partner websites, please visit{" "}
              <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">How Google uses information from sites or apps that use our services</a>.
            </p>
            <p>
              Google&apos;s Privacy Policy governs their use of data:{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">policies.google.com/privacy</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              5. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To operate and maintain our free AI prompt library website.</li>
              <li>To respond to user messages, feedback, and support inquiries.</li>
              <li>To display relevant advertisements via Google AdSense.</li>
              <li>To analyze website traffic and usage patterns via Google Analytics.</li>
              <li>To detect and prevent spam, scraping, or security threats.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              6. Third-Party Services
            </h2>
            <p>
              Our website links to external sites such as Google Gemini and social media pages. We do not control the privacy practices of these third-party domains. Third-party vendors, including Google, use cookies to serve ads based on prior visits to our site or other sites.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              7. Data Security
            </h2>
            <p>We use standard SSL encryption and secure server configurations to protect your data. No internet transmission is 100% secure.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              8. Your Privacy Choices
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-white">Opt out of Google personalized ads:</strong> <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Ads Settings</a>.</li>
              <li><strong className="text-white">Opt out of Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Browser add-on</a>.</li>
              <li><strong className="text-white">Manage cookies:</strong> Delete or block cookies in your browser settings at any time.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              9. Changes to This Policy
            </h2>
            <p>We may revise this Privacy Policy periodically. Continued use of our services after updates constitutes acceptance of the revised policy.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              10. Contact Us
            </h2>
            <p>
              Questions about this Privacy Policy? Visit our <Link href="/contact" className="text-primary hover:underline font-semibold">Contact page</Link> or email <a href="mailto:hello.aipromptnest@gmail.com" className="text-primary hover:underline font-semibold">hello.aipromptnest@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
