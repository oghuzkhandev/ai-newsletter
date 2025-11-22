import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/app(.*)",
  "/api/internal(.*)",
  "/api/admin(.*)",
  "/dashboard(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/api/webhooks/stripe")) {
    return NextResponse.next();
  }

  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  if (pathname.startsWith("/api/gateway")) {
    const requestHeaders = new Headers(req.headers);

    if (userId) {
      requestHeaders.set("x-user-id", userId);
    }
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Next.js internalleri ve statik dosyaları atla
    // (Clerk dokümanındaki önerilen pattern) :contentReference[oaicite:1]{index=1}
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // API & tRPC için her zaman çalışsın
    "/(api|trpc)(.*)",
  ],
};
