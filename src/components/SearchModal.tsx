"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getManifest, getAllEntries } from "@/lib/manifest";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    { name: string; path: string; parentPath: string }[]
  >([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const entries = useMemo(() => getAllEntries(getManifest()), []);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const filtered = entries
      .filter(
        (entry) =>
          entry.name.toLowerCase().includes(q) ||
          entry.path.toLowerCase().includes(q),
      )
      .slice(0, 10);

    setResults(filtered);
    setSelectedIndex(0);
  }, [query, entries]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!isOpen) {
          // Parent handles opening
        }
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        navigateToResult(results[selectedIndex].path);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  const navigateToResult = useCallback(
    (filePath: string) => {
      // Convert file path to URL path
      const slug = filePath.replace(".md", "").split("/");
      router.push(`/docs/${slug.join("/")}`);
      onClose();
    },
    [router, onClose],
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] sm:pt-[15vh] px-3 sm:px-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-2xl sm:max-w-xl bg-dark-secondary/90 dark:bg-dark-secondary/90 light:bg-light-secondary/90 backdrop-blur-xl rounded-lg sm:rounded-2xl border border-dark-border/50 dark:border-dark-border/50 light:border-light-border/50 shadow-2xl overflow-hidden animate-slide-up">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-3 sm:p-5 border-b border-dark-border/50 dark:border-dark-border/50 light:border-light-border/50">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-500 light:text-black flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation..."
            className="flex-1 bg-transparent text-neutral-100 dark:text-neutral-100 light:text-black placeholder-neutral-500 outline-none text-sm sm:text-base"
            autoFocus
          />
          <kbd className="hidden sm:block px-2 py-1 text-xs bg-dark-panel-strong dark:bg-dark-panel-strong light:bg-light-panel-strong text-neutral-500 light:text-black rounded">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-64 sm:max-h-80 overflow-y-auto">
          {results.length === 0 && query && (
            <div className="p-4 text-center text-sm text-neutral-500 light:text-black">
              No results found
            </div>
          )}
          {results.length === 0 && !query && (
            <div className="p-4 text-center text-sm text-neutral-500 light:text-black">
              Type to search...
            </div>
          )}
          {results.map((result, index) => (
            <button
              key={result.path}
              onClick={() => navigateToResult(result.path)}
              className={`w-full flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 text-left transition-colors ${
                index === selectedIndex
                  ? "bg-accent/20 text-accent"
                  : "hover:bg-dark-panel-strong dark:hover:bg-dark-panel-strong light:hover:bg-light-panel-strong text-neutral-300 dark:text-neutral-300 light:text-black"
              }`}
            >
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm sm:text-base truncate">
                  {result.name}
                </div>
                <div className="text-xs text-neutral-500 light:text-black truncate">
                  {result.parentPath}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
