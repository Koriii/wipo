"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { FileText, Moon, Sun, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { signOutAction } from "@/app/actions/auth";

interface HeaderProps {
  email: string;
}

function HeaderThemeToggle() {
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

export default function Header({ email }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-semibold text-foreground">
              WIPO Documents
            </h1>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <span className="text-sm font-medium text-muted-foreground">
                  {email?.[0]?.toUpperCase() || "U"}
                </span>
              </div>
              <span className="hidden text-sm text-muted-foreground sm:block">
                {email}
              </span>
            </div>
            <HeaderThemeToggle />
            <form action={signOutAction}>
              <Button variant="ghost" size="sm" type="submit">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
