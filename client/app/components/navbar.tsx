"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Logo } from "@/app/components/ui/logo";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Use useEffect only for mounting detection
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return <div className="rounded-lg w-9 h-9 bg-muted animate-pulse" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative flex items-center justify-center transition-colors border rounded-lg w-9 h-9 border-border bg-background hover:bg-muted"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        // Sun icon for light mode
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        // Moon icon for dark mode
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto max-w-8xl">
        <Link href="/" className="font-semibold tracking-tight">
          <Logo size="sm" />
        </Link>

        <div className="flex items-center gap-6">
          <nav className="flex gap-6 text-sm">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    "transition-colors font-medium" +
                    (active
                      ? " text-foreground"
                      : " text-muted-foreground hover:text-foreground")
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
