import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

// Protected and guest route definitions
const PROTECTED_ROUTES = ["/account"];
const GUEST_ROUTES = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
];

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;

  // Cookies set on login
  const refreshToken = (await cookies()).get("refresh-token")?.value;

  const isAuthenticated = Boolean(refreshToken);

  // Protect authenticated pages
  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // Prevent logged-in users from accessing guest pages
  if (GUEST_ROUTES.some((route) => pathname.startsWith(route))) {
    if (isAuthenticated) {
      url.pathname = "/account";
      return NextResponse.redirect(url);
    }
  }

  // Continue as normal
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Run middleware on all routes except API and static files
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
