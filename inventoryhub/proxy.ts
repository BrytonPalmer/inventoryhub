import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

type Role = "Employee" | "Admin" | "Owner";

async function getRole(request: NextRequest): Promise<Role | null> {
  const token = request.cookies.get("inventory_session")?.value;
  const secret = process.env.JWT_SECRET;
  if (!token || !secret) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
    );
    const role = payload.role;
    return role === "Employee" || role === "Admin" || role === "Owner"
      ? role
      : null;
  } catch {
    // Expired, tampered with, or malformed token
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role = await getRole(request);

  if (!role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/owner") && role !== "Owner") {
    return NextResponse.redirect(new URL("/products", request.url));
  }

  if (pathname.startsWith("/users") && role === "Employee") {
    return NextResponse.redirect(new URL("/products", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/products/:path*", "/owner/:path*", "/users/:path*"],
};
