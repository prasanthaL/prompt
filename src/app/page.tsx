import React from "react";
import { getAllPrompts, getActiveBlogs } from "@/lib/json-db";
import HomeClient from "./HomeClient";

export default async function Home() {
  const [prompts, blogs] = await Promise.all([
    getAllPrompts(),
    getActiveBlogs(),
  ]);

  return <HomeClient initialPrompts={prompts} initialBlogs={blogs} />;
}
