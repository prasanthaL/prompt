import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("prasa_session")?.value;
  const secret = process.env.NEXTAUTH_SECRET || "prompt-marketplace-super-secret-key-2024";
  const isValidSession = session && session === secret;

  // Protect all prasa sub-pages, but allow access to the login page itself (/prasa)
  if (pathname.startsWith("/prasa/") && pathname !== "/prasa") {
    if (!isValidSession) {
      // Redirect to home page
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // If already logged in and visiting the login page, redirect to the dashboard
  if (pathname === "/prasa") {
    if (isValidSession) {
      return NextResponse.redirect(new URL("/prasa/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/prasa/:path*",
};
