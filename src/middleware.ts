import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Protects /internal/* with HTTP Basic Auth when FUNNEL_INTERNAL_USER and
 * FUNNEL_INTERNAL_PASSWORD are set (Vercel env). Without them: dev allows
 * access; production returns 503 so the route is not accidentally public.
 */
export function middleware(request: NextRequest) {
  const user = process.env.FUNNEL_INTERNAL_USER;
  const pass = process.env.FUNNEL_INTERNAL_PASSWORD;

  if (!user || !pass) {
    if (process.env.NODE_ENV === "development") {
      return NextResponse.next();
    }
    return new NextResponse(
      "Internal routes require FUNNEL_INTERNAL_USER and FUNNEL_INTERNAL_PASSWORD in project env.",
      { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  }

  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) {
    return basicChallenge();
  }

  let decoded: string;
  try {
    decoded = atob(auth.slice(6));
  } catch {
    return basicChallenge();
  }

  const colon = decoded.indexOf(":");
  const u = colon === -1 ? decoded : decoded.slice(0, colon);
  const p = colon === -1 ? "" : decoded.slice(colon + 1);

  if (u !== user || p !== pass) {
    return basicChallenge();
  }

  return NextResponse.next();
}

function basicChallenge() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="GlowGuide Internal"',
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

export const config = {
  matcher: "/internal/:path*",
};
