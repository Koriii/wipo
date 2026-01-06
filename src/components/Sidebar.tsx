"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Moon,
  Sun,
  LogOut,
  LayoutDashboard,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { signOutAction } from "@/app/actions/auth";
import { cn } from "@/lib/utils";

interface SidebarProps {
  email: string;
}

function SidebarThemeToggle({ collapsed }: { collapsed: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size={collapsed ? "icon" : "sm"}
        className={cn("w-full", !collapsed && "justify-start")}
        aria-label="Toggle theme"
      >
        <div className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size={collapsed ? "icon" : "sm"}
      onClick={toggleTheme}
      className={cn("w-full", !collapsed && "justify-start")}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <>
          <Moon className="h-5 w-5" />
          {!collapsed && <span className="ml-2">Dark mode</span>}
        </>
      ) : (
        <>
          <Sun className="h-5 w-5" />
          {!collapsed && <span className="ml-2">Light mode</span>}
        </>
      )}
    </Button>
  );
}

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
];

export default function Sidebar({ email }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "sticky top-0 flex h-screen flex-col border-r border-border bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-border px-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <h1 className="text-lg font-semibold text-foreground">
              WIPO Docs
            </h1>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-border p-2">
        {/* User info */}
        <div
          className={cn(
            "mb-2 flex items-center gap-3 rounded-lg px-3 py-2",
            collapsed && "justify-center px-2"
          )}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
            <span className="text-sm font-medium text-muted-foreground">
              {email?.[0]?.toUpperCase() || "U"}
            </span>
          </div>
          {!collapsed && (
            <span className="truncate text-sm text-muted-foreground">
              {email}
            </span>
          )}
        </div>

        {/* Theme toggle */}
        <SidebarThemeToggle collapsed={collapsed} />

        {/* Sign out */}
        <form action={signOutAction} className="mt-1">
          <Button
            variant="ghost"
            size={collapsed ? "icon" : "sm"}
            type="submit"
            className={cn("w-full", !collapsed && "justify-start")}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="ml-2">Sign out</span>}
          </Button>
        </form>

        {/* Collapse toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className={cn("mt-2 w-full", !collapsed && "justify-start")}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <>
              <ChevronLeft className="h-5 w-5" />
              <span className="ml-2">Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}
