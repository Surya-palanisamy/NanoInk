"use client";

import { useState } from "react";

interface TableOfContentsProps {
  headings: { id: string; text: string; level: number }[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const hasHeadings = headings.length > 0;

  const renderItems = (onItemClick?: () => void) => {
    if (!hasHeadings) {
      return (
        <p className="text-xs xl:text-sm text-neutral-500 light:text-black">
          No headings found
        </p>
      );
    }

    return (
      <nav className="space-y-1 xl:space-y-1.5 border-l border-white/5 pl-2 xl:pl-3">
        {headings.map((heading, index) => (
          <a
            key={`${heading.id}-${index}`}
            href={`#${heading.id}`}
            title={heading.text}
            onClick={onItemClick}
            className={`group block text-[11px] xl:text-[13px] leading-4 xl:leading-5 text-neutral-400 light:text-black hover:text-neutral-100 light:hover:text-black transition-colors truncate ${
              heading.level === 1 ? "font-semibold" : "font-normal"
            }`}
            style={{ paddingLeft: `${(heading.level - 1) * 8}px` }}
          >
            <span className="block truncate group-hover:translate-x-0.5 transition-transform">
              {heading.text}
            </span>
          </a>
        ))}
      </nav>
    );
  };

  return (
    <>
      {/* Mobile TOC toggle */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="xl:hidden fixed top-[calc(var(--header-height)+8px)] right-2 z-40 p-2 bg-dark-secondary dark:bg-dark-secondary light:bg-light-secondary border border-dark-border dark:border-dark-border light:border-light-border rounded-lg hover:bg-dark-panel-strong transition-colors"
        title="Open contents"
        aria-label="Open table of contents"
        disabled={!hasHeadings}
      >
        <svg
          className="w-5 h-5 text-neutral-300 light:text-black"
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

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="xl:hidden fixed inset-0 top-[var(--header-height)] bg-black/60 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile TOC panel */}
      <aside
        className={`xl:hidden fixed top-[var(--header-height)] right-0 w-[220px] h-[calc(100vh-var(--header-height))] border-l border-dark-border dark:border-dark-border light:border-light-border bg-dark-secondary dark:bg-dark-secondary light:bg-light-secondary overflow-y-auto z-50 transition-transform ${
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-neutral-400 light:text-black uppercase tracking-[0.18em]">
              Contents
            </h3>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-1 rounded-md hover:bg-dark-panel-strong transition-colors"
              aria-label="Close table of contents"
              title="Close contents"
            >
              <svg
                className="w-4 h-4 text-neutral-400 light:text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {renderItems(() => setIsMobileOpen(false))}
        </div>
      </aside>

      {/* Desktop TOC */}
      <aside className="hidden xl:block fixed top-[var(--header-height)] right-0 w-[200px] xl:w-[240px] h-[calc(100vh-var(--header-height))] border-l border-dark-border dark:border-dark-border light:border-light-border bg-dark-secondary dark:bg-dark-secondary light:bg-light-secondary overflow-y-auto">
        <div className="p-3 xl:p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-neutral-400 light:text-black uppercase tracking-[0.18em]">
              Contents
            </h3>
          </div>
          {renderItems()}
        </div>
      </aside>
    </>
  );
}
