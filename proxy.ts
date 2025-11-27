import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createIntlMiddleware from "next-intl/middleware";

const intlMiddleware = createIntlMiddleware({
  locales: ["en", "tr"],
  defaultLocale: "en",
  localePrefix: "always"
});

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/app(.*)",
  "/api/internal(.*)",
  "/api/admin(.*)"
]);

const isPublicApiRoute = createRouteMatcher([
  "/api/webhooks(.*)",
  "/api/health(.*)"
]);

const isQstashRoute = createRouteMatcher([
  "/api/cron(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;

  if (isQstashRoute(req)) {
    return NextResponse.next();
  }

  if (isPublicApiRoute(req)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
    "/(api|trpc)(.*)"
  ]
};
