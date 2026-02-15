"use client";

import { useEffect, useRef } from "react";

interface MarkdownContentProps {
  content: string;
}

const COPY_BUTTON_CLASS = "copy-button";
const COPY_BUTTON_CLASSES =
  "absolute top-3 right-3 px-3 py-1.5 text-xs font-medium text-neutral-400 bg-white/5 border border-white/10 rounded-md hover:bg-white/10 hover:text-neutral-200 transition-colors";

export function MarkdownContent({ content }: MarkdownContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const button = target.closest(
        `.${COPY_BUTTON_CLASS}`,
      ) as HTMLButtonElement | null;
      if (!button || !container.contains(button)) return;

      const pre = button.closest("pre");
      const code = pre?.querySelector("code");
      const text = code?.textContent ?? "";

      navigator.clipboard
        .writeText(text)
        .then(() => {
          const original = button.textContent;
          button.textContent = "Copied";
          window.setTimeout(() => {
            button.textContent = original || "Copy";
          }, 1500);
        })
        .catch((error) => {
          console.error("Failed to copy:", error);
        });
    };

    const addButtons = () => {
      const blocks = container.querySelectorAll("pre");
      blocks.forEach((pre) => {
        if (pre.querySelector(`.${COPY_BUTTON_CLASS}`)) return;
        const button = document.createElement("button");
        button.type = "button";
        button.className = `${COPY_BUTTON_CLASS} ${COPY_BUTTON_CLASSES}`;
        button.textContent = "Copy";
        pre.appendChild(button);
      });
    };

    addButtons();
    container.addEventListener("click", handleClick);

    return () => {
      container.removeEventListener("click", handleClick);
    };
  }, [content]);

  return (
    <div
      ref={containerRef}
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
