"use client";

import { useState, useEffect, useRef } from "react";

interface TableOfContentsProps {
  headings: { id: string; text: string; level: number }[];
}

const MIN_WIDTH = 180;
const MAX_WIDTH = 240;
const DEFAULT_WIDTH = 240;

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [activeHeadingId, setActiveHeadingId] = useState<string | null>(null);
  const isResizing = useRef(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);
  const hasHeadings = headings.length > 0;

  // Handle resize
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    isResizing.current = true;
    startXRef.current = e.clientX;
    startWidthRef.current = width;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;
    const deltaX = startXRef.current - e.clientX;
    const newWidth = startWidthRef.current + deltaX;

    if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
      setWidth(newWidth);
      // Update CSS variable for main content margin
      document.documentElement.style.setProperty(
        "--toc-width",
        `${newWidth}px`,
      );
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    document.body.style.userSelect = "auto";
  };

  // Scroll detection for highlighting
  useEffect(() => {
    // Initialize CSS variable
    document.documentElement.style.setProperty("--toc-width", `${width}px`);
  }, [width]);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasHeadings) return;

      const headingElements = headings
        .map((h) => ({
          id: h.id,
          element: document.getElementById(h.id),
        }))
        .filter((h) => h.element !== null);

      let activeId: string | null = null;

      for (const { id, element } of headingElements) {
        const rect = element!.getBoundingClientRect();
        if (rect.top <= 150 && rect.top >= 0) {
          activeId = id;
        }
      }

      if (activeId) {
        setActiveHeadingId(activeId);
      }
    };

    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [headings, hasHeadings]);

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
        {headings.map((heading, index) => {
          const isActive = activeHeadingId === heading.id;
          return (
            <a
              key={`${heading.id}-${index}`}
              href={`#${heading.id}`}
              title={heading.text}
              onClick={onItemClick}
              className={`group block text-[11px] xl:text-[13px] leading-4 xl:leading-5 transition-all truncate ${
                isActive
                  ? "text-accent font-semibold"
                  : "text-neutral-400 light:text-black hover:text-neutral-100 light:hover:text-black"
              } ${heading.level === 1 ? "font-semibold" : "font-normal"}`}
              style={{ paddingLeft: `${(heading.level - 1) * 8}px` }}
            >
              <span
                className={`block truncate transition-transform ${
                  isActive ? "translate-x-1" : "group-hover:translate-x-0.5"
                }`}
              >
                {heading.text}
              </span>
            </a>
          );
        })}
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
        className={`xl:hidden fixed top-[var(--header-height)] right-0 w-[220px] h-[calc(100vh-var(--header-height))] border-l border-dark-border dark:border-dark-border light:border-light-border bg-dark-secondary dark:bg-dark-secondary light:bg-light-secondary overflow-y-auto toc-scrollbar z-50 transition-transform ${
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
      <aside
        className="hidden xl:flex xl:flex-col fixed top-[var(--header-height)] right-0 sticky-toc z-30 h-[calc(100vh-var(--header-height))] border-l border-dark-border dark:border-dark-border light:border-light-border bg-dark-secondary dark:bg-dark-secondary light:bg-light-secondary overflow-hidden"
        style={{ width: `${width}px` }}
      >
        <div className="flex-1 overflow-y-auto toc-scrollbar p-3 xl:p-4 pb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-neutral-400 light:text-black uppercase tracking-[0.18em]">
              Contents
            </h3>
          </div>
          {renderItems()}
        </div>

        {/* Resize handle */}
        <div
          onMouseDown={handleMouseDown}
          className="absolute left-0 top-0 w-1 h-full cursor-col-resize hover:bg-accent/60 bg-transparent transition-all duration-200 hover:w-1.5 group"
          title="Drag to resize table of contents"
        />
      </aside>
    </>
  );
}
