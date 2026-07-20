"use client";

import React, { useState } from "react";
import { Mail, ShieldCheck, AlertCircle, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
      setError("Please fill out all required fields.");
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
    <div className="glass-dark border border-white/[0.08] p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      {submitted ? (
        /* Success Message Display */
        <div 
          className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in-95 duration-300"
          aria-live="polite"
        >
          <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
            <CheckCircle2 className="w-10 h-10 animate-bounce" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-white">Message Sent Successfully!</h3>
            <p className="text-foreground/50 text-sm max-w-md mx-auto leading-relaxed">
              Thank you for reaching out to AIPromptNest. We have received your inquiry and our support team will respond to you via email within 24 to 48 hours.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-4 px-6 py-2.5 rounded-full border border-white/[0.1] hover:border-white/[0.2] bg-white/[0.02] hover:bg-white/[0.04] text-xs font-bold transition-all text-white hover:text-primary cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        /* Contact Form Display */
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Send a Message</h2>
            <p className="text-xs text-white/50">Fill out the form below and our team will analyze your inquiry prompt response.</p>
          </div>

          {error && (
            <div 
              className="flex items-center gap-2.5 p-4 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400 text-xs font-medium animate-shake"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-bold text-white/70 uppercase tracking-wider">
                Your Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] focus:border-primary/50 focus:outline-none rounded-xl py-3 px-4 text-sm text-white placeholder-white/20 transition-all focus:ring-2 focus:ring-primary/10"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-bold text-white/70 uppercase tracking-wider">
                Email Address <span className="text-rose-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="johndoe@example.com"
                className="w-full bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] focus:border-primary/50 focus:outline-none rounded-xl py-3 px-4 text-sm text-white placeholder-white/20 transition-all focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="category" className="text-xs font-bold text-white/70 uppercase tracking-wider">
                Inquiry Category
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-[#0d0d0f] border border-white/[0.08] hover:border-white/[0.15] focus:border-primary/50 focus:outline-none rounded-xl py-3 px-4 text-sm text-white transition-all focus:ring-2 focus:ring-primary/10 appearance-none cursor-pointer"
                >
                  <option value="General Inquiry" className="bg-[#0b0b0c]">General Inquiry</option>
                  <option value="Bug / Technical Issue" className="bg-[#0b0b0c]">Bug / Technical Issue</option>
                  <option value="Partnership Proposal" className="bg-[#0b0b0c]">Partnership Proposal</option>
                  <option value="Feedback / Feature Request" className="bg-[#0b0b0c]">Feedback / Feature Request</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/40">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-xs font-bold text-white/70 uppercase tracking-wider">
                Subject <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="How can we help?"
                className="w-full bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] focus:border-primary/50 focus:outline-none rounded-xl py-3 px-4 text-sm text-white placeholder-white/20 transition-all focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-xs font-bold text-white/70 uppercase tracking-wider">
              Your Message <span className="text-rose-400">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
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
                Transmitting Message...
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
  );
}
