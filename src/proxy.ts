import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("prasa_session")?.value;
  const secret = process.env.NEXTAUTH_SECRET || "prompt-marketplace-super-secret-key-2024";
  const isValidSession = session && session === secret;

  // Protect all prompt-admin sub-pages, but allow access to the login page itself (/prompt-admin)
  if (pathname.startsWith("/prompt-admin/") && pathname !== "/prompt-admin") {
    if (!isValidSession) {
      // Redirect to admin login page
      return NextResponse.redirect(new URL("/prompt-admin", request.url));
    }
  }

  // If already logged in and visiting the login page, redirect to the dashboard
  if (pathname === "/prompt-admin") {
    if (isValidSession) {
      return NextResponse.redirect(new URL("/prompt-admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/prompt-admin/:path*",
};
