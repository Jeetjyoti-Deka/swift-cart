import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/categories",
    "/api/webhook/clerk",
    "/api/webhook/stripe",
  ],
  ignoredRoutes: ["/api/webhook/clerk", "/api/webhook/stripe"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
