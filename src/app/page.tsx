import { withAuth, signOut, getSignInUrl } from "@workos-inc/authkit-nextjs";
import { listPDFs } from "@/lib/r2";
import PDFList from "@/components/PDFList";
import Header from "@/components/Header";

export default async function Home() {
  const { user } = await withAuth();

  // If not authenticated, show sign-in page
  if (!user) {
    const signInUrl = await getSignInUrl();
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 mb-4">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h1 className="text-2xl font-semibold text-white">WIPO PDF Viewer</h1>
              <p className="mt-2 text-slate-400">
                Sign in to access provisional refusal documents
              </p>
            </div>
            <a
              href={signInUrl}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition-all font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Sign In
            </a>
          </div>
          <p className="text-center mt-6 text-slate-500 text-sm">
            Secure authentication powered by WorkOS
          </p>
        </div>
      </div>
    );
  }

  // Fetch initial PDF list
  let files: Awaited<ReturnType<typeof listPDFs>> = [];
  let error: string | null = null;
  try {
    files = await listPDFs();
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load PDFs";
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header email={user.email || ""} />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-red-700 dark:text-red-400">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-medium">Error loading PDFs</p>
                <p className="text-sm text-red-600 dark:text-red-500">{error}</p>
              </div>
            </div>
          </div>
        ) : (
          <PDFList initialFiles={files} />
        )}
      </main>
    </div>
  );
}
