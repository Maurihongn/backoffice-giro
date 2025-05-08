import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface ExtendedJwtPayload {
  exp?: number;
  [key: string]: any;
}

// Add paths that should be accessible without authentication
const publicPaths = [
  "/sign-in",
  "/maintenance",
  "/forget-password",
  "/reset-password",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is public
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check for session cookie
  const session = request.cookies.get("session")?.value;

  if (!session) {
    return redirectToSignIn(request);
  }

  try {
    const sessionData = JSON.parse(session);
    const token = sessionData.token;

    if (!token) {
      return redirectToSignIn(request);
    }

    // Verify token expiration
    const decodedToken = jwtDecode<ExtendedJwtPayload>(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp && decodedToken.exp < currentTime) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("session");
      return response;
    }

    // Verificamos si el usuario tiene acceso a la ruta basado en su rol
    const role = sessionData.role;

    // Ejemplo de protección de rutas por rol
    if (
      pathname.startsWith("/admin") &&
      role !== "ADMIN" &&
      role !== "SUPERADMIN"
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Session validation error:", error);
    return redirectToSignIn(request);
  }
}

function redirectToSignIn(request: NextRequest) {
  const signInUrl = new URL("/sign-in", request.url);
  signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
  const response = NextResponse.redirect(signInUrl);
  response.cookies.delete("session");
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
