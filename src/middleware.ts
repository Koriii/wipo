import { authkitMiddleware } from "@workos-inc/authkit-nextjs";

export default authkitMiddleware();

export const config = {
  matcher: [
    // Only match the root and specific paths that need auth
    // Exclude static files, auth callback, and Next.js internals
    "/((?!_next/static|_next/image|favicon.ico|api/auth).*)",
  ],
};
