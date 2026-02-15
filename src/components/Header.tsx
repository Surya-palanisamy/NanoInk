"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { SearchModal } from "./SearchModal";
import { useState } from "react";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-[var(--header-height)] bg-dark-secondary dark:bg-dark-secondary light:bg-light-secondary border-b border-dark-border dark:border-dark-border light:border-light-border z-50 transition-colors">
        <div className="flex items-center justify-between h-full px-3 sm:px-4 lg:px-6">
          {/* Left: Logo */}
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            <Link
              href="/"
              className="flex items-center gap-2 text-accent hover:text-accent-hover transition-colors flex-shrink-0"
            >
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
              </svg>
              <span className="hidden sm:inline text-base sm:text-lg font-semibold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
                Nano Ink
              </span>
            </Link>
          </div>

          {/* Right: Search, Theme, GitHub */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto flex-shrink-0">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-dark-panel-strong dark:bg-dark-panel-strong light:bg-light-panel-strong border border-dark-border dark:border-dark-border light:border-light-border rounded-lg text-neutral-400 hover:text-neutral-200 transition-colors text-sm"
              title="Search (⌘K)"
            >
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden md:inline px-1.5 py-0.5 text-xs bg-dark-bg dark:bg-dark-bg light:bg-light-bg rounded">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg hover:bg-dark-panel-strong dark:hover:bg-dark-panel-strong light:hover:bg-light-panel-strong transition-colors flex-shrink-0"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg
                  className="w-7 h-7 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-neutral-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* GitHub Link */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-dark-panel-strong dark:hover:bg-dark-panel-strong light:hover:bg-light-panel-strong transition-colors flex-shrink-0 hidden sm:block"
            >
              <svg
                className="w-5 h-5 text-neutral-400 hover:text-neutral-200"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-dark-panel-strong dark:hover:bg-dark-panel-strong light:hover:bg-light-panel-strong transition-colors sm:hidden flex-shrink-0"
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
