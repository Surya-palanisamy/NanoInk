"use client";

import { useState, useEffect } from "react";
import { TableOfContents } from "@/components/TableOfContents";
import { MarkdownContent } from "@/components/MarkdownContent";

interface ClientPageWrapperProps {
  initialContent: string;
  initialHeadings: { id: string; text: string; level: number }[];
  filePath: string;
  breadcrumb: React.ReactNode;
}

export function ClientPageWrapper({
  initialContent,
  initialHeadings,
  filePath,
  breadcrumb,
}: ClientPageWrapperProps) {
  const [content, setContent] = useState(initialContent);
  const [headings, setHeadings] = useState(initialHeadings);

  useEffect(() => {
    // Check local storage for this page
    const storedPages = localStorage.getItem("nanoink_pages");
    if (storedPages) {
      try {
        const pages = JSON.parse(storedPages);
        const page = pages.find((p: any) => p.path === filePath);
        if (page) {
          setContent(page.content);
          setHeadings(page.headings);
        }
      } catch (e) {
        console.error("Local storage error:", e);
      }
    }

    // Listen for custom event when refresh happens
    const handleRefresh = (e: CustomEvent) => {
      const page = e.detail?.pages?.find((p: any) => p.path === filePath);
      if (page) {
        setContent(page.content);
        setHeadings(page.headings);
      }
    };

    // Check on initial load
    const eventName = "nanoink_pages_updated";
    window.addEventListener(eventName, handleRefresh as EventListener);
    return () =>
      window.removeEventListener(eventName, handleRefresh as EventListener);
  }, [filePath]);

  return (
    <>
      <TableOfContents headings={headings} />
      <div className="page-enter flex-1 w-full xl:pr-[var(--toc-width,240px)] mb-20 md:mb-0">
        <div className="max-w-4xl mx-auto lg:mx-0 px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
          {breadcrumb}
          <article>
            <MarkdownContent content={content} />
          </article>
        </div>
      </div>
    </>
  );
}
