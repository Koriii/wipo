"use client";

import { ThemeToggle } from "./ThemeProvider";

interface HeaderProps {
  email: string;
}

export default function Header({ email }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-lg font-semibold text-slate-900 dark:text-white">WIPO Documents</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {email?.[0]?.toUpperCase() || "U"}
                </span>
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-400 hidden sm:block">
                {email}
              </span>
            </div>
            <ThemeToggle />
            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                className="text-sm px-3 py-1.5 rounded-lg transition-colors text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
