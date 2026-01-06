import type { Metadata } from "next";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { listPDFs } from "@/lib/r2";
import PDFList from "@/components/PDFList";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Dashboard | WIPO PDF Viewer",
  description: "View and download your WIPO provisional refusal documents.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardPage() {
  // ensureSignedIn: true will redirect to WorkOS sign-in if not authenticated
  const { user } = await withAuth({ ensureSignedIn: true });

  // Fetch PDF list
  let files: Awaited<ReturnType<typeof listPDFs>> = [];
  let error: string | null = null;

  try {
    files = await listPDFs();
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load PDFs";
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar email={user.email || ""} />

      <main className="flex-1 overflow-auto p-8">
        <div className="mx-auto max-w-6xl">
          {error ? (
            <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-6 text-destructive">
              <div className="flex items-center gap-3">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="font-medium">Error loading PDFs</p>
                  <p className="text-sm opacity-80">{error}</p>
                </div>
              </div>
            </div>
          ) : (
            <PDFList initialFiles={files} />
          )}
        </div>
      </main>
    </div>
  );
}
