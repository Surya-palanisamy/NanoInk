"use client";
import { useEffect, useRef } from "react";
interface MarkdownContentProps {
  content: string;
}
const COPY_BUTTON_CLASS = "copy-button";
const COPY_BUTTON_CLASSES =
  "absolute top-3 right-3 p-1.5 text-neutral-400 light:text-black bg-white/5 border border-white/10 rounded-md hover:bg-white/10 hover:text-neutral-200 light:hover:text-black transition-colors";
const COPY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
const CHECK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
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
      const wrapper = button.closest(".code-block-wrapper");
      const pre = wrapper ? wrapper.querySelector("pre") : button.closest("pre");
      const code = pre?.querySelector("code");
      const text = code?.textContent ?? "";
      navigator.clipboard
        .writeText(text)
        .then(() => {
          button.innerHTML = CHECK_ICON;
          window.setTimeout(() => {
            button.innerHTML = COPY_ICON;
          }, 1500);
        })
        .catch((error) => {
          console.error("Failed to copy:", error);
        });
    };
    const addButtons = () => {
      const blocks = container.querySelectorAll("pre");
      blocks.forEach((pre) => {
        if (pre.parentElement?.classList.contains("code-block-wrapper")) return;
        const wrapper = document.createElement("div");
        wrapper.className = "code-block-wrapper relative group my-5";
        pre.parentNode?.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
        // Remove vertical margins from pre since the wrapper handles them
        pre.style.marginTop = "0";
        pre.style.marginBottom = "0";
        const button = document.createElement("button");
        button.type = "button";
        button.className = `${COPY_BUTTON_CLASS} ${COPY_BUTTON_CLASSES}`;
        button.innerHTML = COPY_ICON;
        wrapper.appendChild(button);
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
      className="prose prose-sm sm:prose md:prose-base max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
