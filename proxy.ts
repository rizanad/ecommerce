
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAdminLoggedIn = request.cookies.get("admin_session")?.value === "true";

  const loginPath = "/admin-login";

  if (path.startsWith("/admin") && path !== loginPath) {
    if (!isAdminLoggedIn) {
      return NextResponse.redirect(new URL(loginPath, request.url));
    }
  }

  if (path === loginPath && isAdminLoggedIn) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin-login"],
};