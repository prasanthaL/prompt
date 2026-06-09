import React from "react";
import { getTrendingPrompts, getAllPrompts } from "@/lib/json-db";
import Navbar from "@/components/Navbar";
import TrendingClient from "./TrendingClient";

export const metadata = {
  title: "Trending AI Prompts — Most Popular This Week",
  description:
    "Discover the most viewed and liked AI prompts trending in the community right now. Browse ChatGPT, Gemini, Midjourney, and more.",
};

export default async function TrendingPage() {
  const [prompts, allPrompts] = await Promise.all([
    getTrendingPrompts(40),
    getAllPrompts(),
  ]);

  return (
    <main className="min-h-screen mesh-gradient">
      <Navbar />
      <TrendingClient
        prompts={prompts}
        totalPrompts={allPrompts.length}
      />
    </main>
  );
}
