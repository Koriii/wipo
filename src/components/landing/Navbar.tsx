"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { FileText, Menu, X, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

function NavThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Toggle theme">
        <div className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold">WIPO PDF Viewer</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            How It Works
          </Link>
          <Link
            href="#security"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Security
          </Link>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <NavThemeToggle />
          <Button asChild>
            <Link href="/dashboard">Sign In</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <NavThemeToggle />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t md:hidden">
          <div className="space-y-1 px-4 py-4">
            <Link
              href="#features"
              className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#security"
              className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Security
            </Link>
            <div className="pt-4">
              <Button asChild className="w-full">
                <Link href="/dashboard">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
