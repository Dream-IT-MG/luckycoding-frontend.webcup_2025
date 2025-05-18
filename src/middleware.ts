import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  // if (!token && pathname === "/dashboard") {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  // if (token && pathname === "/login") {
  //   return NextResponse.redirect(new URL("/dashboard", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|backend|favicon.ico).*)"],
};
