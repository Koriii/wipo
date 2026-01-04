import { authkitMiddleware } from "@workos-inc/authkit-nextjs";

export default authkitMiddleware();

export const config = {
  matcher: [
    // Match all paths except static files and API routes that don't need auth
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
