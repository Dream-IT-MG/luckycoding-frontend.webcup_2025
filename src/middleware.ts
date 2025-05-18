import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  if (!token && pathname.includes("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && (pathname.includes("/login") || pathname.includes("/signup"))) {
    return NextResponse.redirect(new URL("/dashboard/endpage", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|backend|favicon.ico).*)"],
};
