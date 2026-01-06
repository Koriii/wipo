import Link from "next/link";
import { FileText } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <FileText className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">WIPO PDF Viewer</span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link
              href="#features"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              How It Works
            </Link>
            <Link
              href="#security"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Security
            </Link>
            <Link
              href="/dashboard"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign In
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} WIPO PDF Viewer
          </p>
        </div>
      </div>
    </footer>
  );
}
