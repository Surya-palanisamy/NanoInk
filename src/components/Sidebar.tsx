"use client";

import { useState, useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ManifestRoot, ManifestNode } from "@/lib/manifest";

interface SidebarProps {
  manifest: ManifestRoot;
}

const MIN_SIDEBAR_WIDTH = 220;
const MAX_SIDEBAR_WIDTH = 360;
const SIDEBAR_WIDTH_KEY = "sidebar-width";

export function Sidebar({ manifest }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [collapsedFolders, setCollapsedFolders] = useState<Set<string>>(
    new Set(),
  );
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [isResizing, setIsResizing] = useState(false);
  const resizeStartX = useRef(0);
  const resizeStartWidth = useRef(280);
  const pathname = usePathname();

  useEffect(() => {
    const savedWidth = Number(localStorage.getItem(SIDEBAR_WIDTH_KEY));
    if (!Number.isNaN(savedWidth) && savedWidth > 0) {
      const clamped = Math.min(
        MAX_SIDEBAR_WIDTH,
        Math.max(MIN_SIDEBAR_WIDTH, savedWidth),
      );
      setSidebarWidth(clamped);
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      `${sidebarWidth}px`,
    );
    localStorage.setItem(SIDEBAR_WIDTH_KEY, String(sidebarWidth));
  }, [sidebarWidth]);

  useEffect(() => {
    if (!isResizing) return;
    const previousCursor = document.body.style.cursor;
    const previousUserSelect = document.body.style.userSelect;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    return () => {
      document.body.style.cursor = previousCursor;
      document.body.style.userSelect = previousUserSelect;
    };
  }, [isResizing]);

  // Initialize collapsed state - collapse all by default
  useEffect(() => {
    const topLevelFolders = manifest.children.map((c) => c.name);
    setCollapsedFolders(new Set(topLevelFolders));
  }, [manifest]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle swipe gestures for mobile
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const swipeDistanceX = touchEndX - touchStartX;
      const swipeDistanceY = Math.abs(touchEndY - touchStartY);

      if (swipeDistanceY > Math.abs(swipeDistanceX) * 0.5) return;

      if (swipeDistanceX > 50 && touchStartX < 30 && !isOpen) {
        setIsOpen(true);
      }
      if (swipeDistanceX < -50 && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isOpen]);

  const toggleFolder = (folderId: string) => {
    setCollapsedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(folderId)) {
        next.delete(folderId);
      } else {
        next.add(folderId);
      }
      return next;
    });
  };

  const startResize = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    resizeStartX.current = event.clientX;
    resizeStartWidth.current = sidebarWidth;
    setIsResizing(true);

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const delta = moveEvent.clientX - resizeStartX.current;
      const nextWidth = resizeStartWidth.current + delta;
      const clamped = Math.min(
        MAX_SIDEBAR_WIDTH,
        Math.max(MIN_SIDEBAR_WIDTH, nextWidth),
      );
      setSidebarWidth(clamped);
    };

    const handlePointerUp = () => {
      setIsResizing(false);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const renderNode = (
    node: ManifestNode,
    depth = 0,
    parentId = "",
  ): React.ReactNode => {
    const nodeId = parentId ? `${parentId}/${node.name}` : node.name;
    const isFolder = !!node.children;
    const isCollapsed = collapsedFolders.has(nodeId);

    if (isFolder) {
      return (
        <div key={nodeId} className="flex flex-col">
          <button
            onClick={() => toggleFolder(nodeId)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-400 hover:text-neutral-200 hover:bg-dark-panel-strong dark:hover:bg-dark-panel-strong light:hover:bg-light-panel-strong transition-colors"
            style={{ paddingLeft: `${depth * 16 + 16}px` }}
          >
            <svg
              className={`w-4 h-4 transition-transform ${isCollapsed ? "" : "rotate-90"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className="font-medium">{node.name}</span>
          </button>
          {!isCollapsed && (
            <div className="flex flex-col">
              {node.children?.map((child) =>
                renderNode(child, depth + 1, nodeId),
              )}
            </div>
          )}
        </div>
      );
    }

    // File node
    const href = `/docs/${node.path?.replace(".md", "").split("/").join("/")}`;
    const isActive = pathname === href;

    return (
      <Link
        key={node.path}
        href={href}
        className={`block px-4 py-2 text-sm transition-colors ${
          isActive
            ? "text-accent bg-accent-soft font-medium"
            : "text-neutral-400 hover:text-neutral-200 hover:bg-dark-panel-strong dark:hover:bg-dark-panel-strong light:hover:bg-light-panel-strong"
        }`}
        style={{ paddingLeft: `${depth * 16 + 32}px` }}
      >
        {node.name}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-[calc(var(--header-height)+12px)] left-3 z-40 p-2.5 bg-dark-secondary dark:bg-dark-secondary light:bg-light-secondary border border-dark-border dark:border-dark-border light:border-light-border rounded-lg"
      >
        <svg
          className="w-5 h-5 text-neutral-300"
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

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 top-[var(--header-height)] bg-black/60 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-[var(--header-height)] left-0 h-[calc(100vh-var(--header-height))] bg-dark-secondary dark:bg-dark-secondary light:bg-light-secondary border-r border-dark-border dark:border-dark-border light:border-light-border overflow-y-auto z-50 transition-transform lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: `${sidebarWidth}px` }}
      >
        <div
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize sidebar"
          onPointerDown={startResize}
          className={`hidden lg:block absolute right-0 top-0 h-full w-3 cursor-col-resize group ${
            isResizing ? "bg-accent/10" : "bg-transparent"
          }`}
        >
          <span className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-accent opacity-70 transition-opacity group-hover:opacity-100" />
        </div>
        {/* Home button */}
        <div className="p-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 bg-accent-soft text-accent rounded-lg font-medium text-sm hover:bg-accent hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>Home</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="py-2">
          {manifest.children.map((child) => renderNode(child))}
        </nav>

        {/* Footer */}
        <div className="mt-auto p-4 border-t border-dark-border dark:border-dark-border light:border-light-border">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-dark-panel-strong dark:bg-dark-panel-strong light:bg-light-panel-strong border border-dark-border dark:border-dark-border light:border-light-border rounded-lg text-neutral-300 hover:text-neutral-100 text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Go to GitHub
          </a>
        </div>
      </aside>
    </>
  );
}
