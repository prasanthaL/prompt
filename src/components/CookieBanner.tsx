"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, ShieldCheck, ShieldAlert } from "lucide-react";

const CONSENT_KEY = "apn_cookie_consent";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Safely check local storage after hydration
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      // Delay slightly for smooth entrance
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }

    // Handler to reopen banner from Footer or elsewhere
    const handleOpenBanner = () => {
      setIsVisible(true);
    };

    window.addEventListener("open-cookie-banner", handleOpenBanner);
    return () => window.removeEventListener("open-cookie-banner", handleOpenBanner);
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    window.gtag?.("consent", "update", {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
    });
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem(CONSENT_KEY, "essential");
    window.gtag?.("consent", "update", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-auto"
    >
      <div className="relative overflow-hidden bg-[#0d0d15]/95 backdrop-blur-xl border border-white/15 p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(139,92,246,0.2)] text-white">
        {/* Glow ambient accent background */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-primary">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm md:text-base text-white tracking-tight leading-none">
                Cookie &amp; Privacy Notice
              </h3>
              <p className="text-[10px] text-white/50 font-medium uppercase tracking-wider mt-0.5">
                AIPromptNest Policy
              </p>
            </div>
          </div>

          <button
            onClick={handleRejectAll}
            className="text-white/40 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            title="Close notice"
            aria-label="Close cookie banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description */}
        <p className="text-xs md:text-sm text-white/75 leading-relaxed mb-3">
          We use cookies and local storage to personalize advertisements, analyze website traffic, and remember your preferences on our site.
        </p>

        {/* Feature Mention Pill */}
        <div className="mb-4 inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11px] text-white/60">
          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          <span>Google AdSense &amp; Analytics Consent Mode v2 Supported</span>
        </div>

        {/* Action Buttons — Equal prominence */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            onClick={handleAcceptAll}
            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-2.5 px-3 rounded-xl border border-primary shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-200 active:scale-[0.98] cursor-pointer text-xs md:text-sm flex items-center justify-center gap-1.5 text-center"
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Accept All</span>
          </button>

          <button
            onClick={handleRejectAll}
            className="w-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold py-2.5 px-3 rounded-xl transition-all duration-200 active:scale-[0.98] cursor-pointer text-xs md:text-sm flex items-center justify-center gap-1.5 text-center"
          >
            <ShieldAlert className="w-4 h-4 shrink-0 text-white/70" />
            <span>Reject Non-Essential</span>
          </button>
        </div>

        {/* Privacy Policy Link Footer */}
        <div className="mt-3 text-center sm:text-left">
          <Link
            href="/privacy-policy"
            className="text-[11px] text-white/40 hover:text-primary transition-colors underline underline-offset-2"
          >
            Read full Privacy Policy &amp; Cookie terms
          </Link>
        </div>
      </div>
    </div>
  );
}
