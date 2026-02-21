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
const MAX_SIDEBAR_WIDTH = 280;
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

  useEffect(() => {
    if (!pathname.startsWith("/docs/")) return;
    const slug = decodeURIComponent(pathname.replace("/docs/", ""));
    const targetPath = `${slug}.md`;

    const findAncestorFolderIds = (root: ManifestRoot, path: string) => {
      const walk = (
        node: ManifestNode,
        parentId: string,
        ancestors: string[],
      ): string[] | null => {
        const nodeId = parentId ? `${parentId}/${node.name}` : node.name;

        if (node.path && node.path === path) {
          return ancestors;
        }

        if (node.children) {
          const nextAncestors = [...ancestors, nodeId];
          for (const child of node.children) {
            const result = walk(child, nodeId, nextAncestors);
            if (result) return result;
          }
        }

        return null;
      };

      for (const child of root.children) {
        const result = walk(child, "", []);
        if (result) return result;
      }
      return [];
    };

    const openFolders = findAncestorFolderIds(manifest, targetPath);
    if (openFolders.length === 0) return;

    setCollapsedFolders((prev) => {
      const next = new Set(prev);
      openFolders.forEach((folderId) => {
        next.delete(folderId);
      });
      return next;
    });
  }, [pathname, manifest]);

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
            className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-neutral-400 light:text-black hover:text-neutral-200 light:hover:text-black hover:bg-dark-panel-strong dark:hover:bg-dark-panel-strong light:hover:bg-light-panel-strong transition-colors"
            style={{ paddingLeft: `${depth * 16 + 12}px` }}
          >
            <svg
              className={`w-4 h-4 flex-shrink-0 transition-transform ${isCollapsed ? "" : "rotate-90"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className="font-medium truncate">{node.name}</span>
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
        className={`block px-3 sm:px-4 py-2 text-xs sm:text-sm transition-colors truncate ${
          isActive
            ? "text-accent bg-accent-soft font-medium"
            : "text-neutral-400 light:text-black hover:text-neutral-200 light:hover:text-black hover:bg-dark-panel-strong dark:hover:bg-dark-panel-strong light:hover:bg-light-panel-strong"
        }`}
        style={{ paddingLeft: `${depth * 16 + 28}px` }}
        title={node.name}
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
        className="lg:hidden fixed top-[calc(var(--header-height)+8px)] left-2 z-40 p-2 bg-dark-secondary dark:bg-dark-secondary light:bg-light-secondary border border-dark-border dark:border-dark-border light:border-light-border rounded-lg hover:bg-dark-panel-strong transition-colors"
        title="Open navigation"
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

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 top-[var(--header-height)] bg-black/60 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar-toc fixed top-[var(--header-height)] left-0 h-[calc(100vh-var(--header-height))] bg-dark-secondary dark:bg-dark-secondary light:bg-light-secondary border-r border-dark-border dark:border-dark-border light:border-light-border overflow-y-auto z-50 transition-transform lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          width: `${sidebarWidth}px`,
          minWidth: 220,
          maxWidth: 280,
        }}
      >
        <div
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize sidebar"
          onPointerDown={startResize}
          className={`absolute right-0 top-0 h-full w-3 cursor-col-resize group ${
            isResizing ? "bg-accent/10" : "bg-transparent"
          }`}
        >
          <span className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-accent opacity-70 transition-opacity group-hover:opacity-100" />
        </div>

        {/* Navigation */}
        <nav className="py-2">
          {manifest.children.map((child) => renderNode(child))}
        </nav>

        {/* Footer */}
      </aside>
    </>
  );
}
