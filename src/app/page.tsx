import React from "react";
import { getAllPrompts } from "@/lib/json-db";
import HomeClient from "./HomeClient";

export default async function Home() {
  const prompts = await getAllPrompts();
  return <HomeClient initialPrompts={prompts} />;
}
