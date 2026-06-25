import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("prasa_session");
    return NextResponse.redirect(new URL("/", req.url));
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("prasa_session");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
