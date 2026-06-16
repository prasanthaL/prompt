"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Mail, MessageSquare, ShieldCheck, Zap, AlertCircle, ArrowRight, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "General Inquiry",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (error) setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setError("Please fill out all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    // Simulate sending message to backend
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "General Inquiry",
        message: ""
      });
    }, 1500);
  };

  return (
    <main className="min-h-screen mesh-gradient text-foreground pb-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 md:pt-40">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] font-black text-foreground/20 uppercase tracking-[0.2em] mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="opacity-50">/</span>
          <span className="text-foreground/40">Contact Us</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Info Column (5/12 width) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                <MessageSquare className="w-3.5 h-3.5" />
                Support Hub
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Get in <span className="text-gradient">Touch</span>
              </h1>
              <p className="text-foreground/60 text-lg leading-relaxed">
                Have questions about custom prompts, billing updates, feature requests, or partnerships? Drop us a line and our team will get back to you shortly.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              {/* Email support card */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Email Support</h4>
                  <p className="text-xs text-white/45">Reach us directly at</p>
                  <a href="mailto:support@aipromptnest.com" className="text-sm font-semibold text-primary hover:underline block pt-1">
                    support@aipromptnest.com
                  </a>
                </div>
              </div>

              {/* Response Time support card */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Response Duration</h4>
                  <p className="text-xs text-white/45">We prioritize support requests and typically answer within</p>
                  <p className="text-sm font-semibold text-foreground/80 pt-1">
                    24 to 48 hours
                  </p>
                </div>
              </div>

              {/* Prompt submission card */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Looking to submit prompts?</h4>
                  <p className="text-xs text-white/45 mb-2">Share your creative templates and get featured inside our vaults.</p>
                  <Link href="/premium" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover group">
                    Visit Submit Section
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column (7/12 width) */}
          <div className="lg:col-span-7">
            <div className="glass-dark border border-white/[0.08] p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden">
              {/* Background ambient lighting */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
              
              {submitted ? (
                /* Success Message Display */
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
                    <ShieldCheck className="w-10 h-10 animate-bounce" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold text-white">Message Sent Successfully!</h3>
                    <p className="text-foreground/50 text-sm max-w-md mx-auto leading-relaxed">
                      Thank you for contacting AIPromptNest. We have received your inquiry and our support team will respond to you via email shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full border border-white/[0.1] hover:border-white/[0.2] bg-white/[0.02] hover:bg-white/[0.04] text-xs font-bold transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                /* Contact Form Display */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white">Send a Message</h2>
                    <p className="text-xs text-white/40">Fill out the details below and we will analyze your inquiry immediately.</p>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2.5 p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-400 text-xs font-medium animate-shake">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-bold text-white/70 uppercase tracking-wider">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] focus:border-primary/50 focus:outline-none rounded-xl py-3 px-4 text-sm text-white placeholder-white/20 transition-all focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-bold text-white/70 uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="johndoe@example.com"
                        className="w-full bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] focus:border-primary/50 focus:outline-none rounded-xl py-3 px-4 text-sm text-white placeholder-white/20 transition-all focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="category" className="text-xs font-bold text-white/70 uppercase tracking-wider">Inquiry Category</label>
                      <div className="relative">
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full bg-[#0d0d0f] border border-white/[0.08] hover:border-white/[0.15] focus:border-primary/50 focus:outline-none rounded-xl py-3 px-4 text-sm text-white transition-all focus:ring-2 focus:ring-primary/10 appearance-none cursor-pointer"
                        >
                          <option value="General Inquiry" className="bg-[#0b0b0c]">General Inquiry</option>
                          <option value="Prompt Submission" className="bg-[#0b0b0c]">Prompt Submission</option>
                          <option value="Bug / Technical Issue" className="bg-[#0b0b0c]">Bug / Technical Issue</option>
                          <option value="Partnership Proposal" className="bg-[#0b0b0c]">Partnership Proposal</option>
                          <option value="Feedback / Feature Request" className="bg-[#0b0b0c]">Feedback / Feature Request</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/40">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-xs font-bold text-white/70 uppercase tracking-wider">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="How can we help?"
                        className="w-full bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] focus:border-primary/50 focus:outline-none rounded-xl py-3 px-4 text-sm text-white placeholder-white/20 transition-all focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-bold text-white/70 uppercase tracking-wider">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Write your message here in detail..."
                      className="w-full bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] focus:border-primary/50 focus:outline-none rounded-xl py-3 px-4 text-sm text-white placeholder-white/20 transition-all focus:ring-2 focus:ring-primary/10 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white text-sm font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4.5 h-4.5 animate-spin" />
                        Analyzing & Transmitting...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="w-4.5 h-4.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
