import { getSignInUrl } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  // Get the WorkOS sign-in URL and redirect
  const signInUrl = await getSignInUrl();
  redirect(signInUrl);
}
