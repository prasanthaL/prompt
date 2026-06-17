import { getActiveBlogs } from "@/lib/json-db";
import HomeClient from "./HomeClient";

export default async function Home() {
  const blogs = await getActiveBlogs();
  return <HomeClient initialBlogs={blogs} />;
}
