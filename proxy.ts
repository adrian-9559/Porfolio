import { NextResponse, type NextRequest } from "next/server";

// Server-side route guard: block protected pages before render when there is no
// session cookie (set httpOnly by the BFF proxy). Role checks stay client-side.
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/admin",
  "/settings",
  "/notifications",
  "/perfil",
  "/configuracion",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession =
    !!request.cookies.get("access_token")?.value ||
    !!request.cookies.get("refresh_token")?.value;

  if (
    !hasSession &&
    PROTECTED_PREFIXES.some(
      (p) => pathname === p || pathname.startsWith(`${p}/`),
    )
  ) {
    const url = new URL("/", request.url);

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/settings/:path*",
    "/notifications/:path*",
    "/perfil/:path*",
    "/configuracion/:path*",
  ],
};
