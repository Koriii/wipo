import { authkitMiddleware } from "@workos-inc/authkit-nextjs";

export default authkitMiddleware();

export const config = {
  matcher: [
    // Only protect /dashboard and /api routes (except auth)
    // Exclude: landing page (/), static files, images, auth routes
    "/dashboard/:path*",
    "/api/((?!auth).*)",
  ],
};

// Note: /auth/login/* routes are public (not in matcher) and redirect to WorkOS
