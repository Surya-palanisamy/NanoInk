import fs from "fs";
import path from "path";
import { marked } from "marked";
import type { Renderer } from "marked";
import hljs from "highlight.js";
// Configure marked with highlight.js
marked.setOptions({
  gfm: true,
  breaks: true,
});
// Custom renderer for code highlighting
const renderer = new marked.Renderer();
const normalizeImageSrc = (href: string | null) => {
  if (!href) return "";
  const trimmed = href.trim();
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("/")
  ) {
    return trimmed;
  }
  let normalized = trimmed;
  while (normalized.startsWith("../")) {
    normalized = normalized.slice(3);
  }
  if (normalized.startsWith("./")) {
    normalized = normalized.slice(2);
  }
  if (normalized.startsWith("images/")) {
    return `/${normalized}`;
  }
  return normalized;
};
renderer.code = function (code: string, language: string | undefined) {
  const lang = language || "";
  let highlighted: string;
  if (lang && hljs.getLanguage(lang)) {
    highlighted = hljs.highlight(code, { language: lang }).value;
  } else {
    highlighted = hljs.highlightAuto(code).value;
  }
  return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`;
};
marked.use({ renderer });
export async function getMarkdownContent(filePath: string): Promise<{
  content: string;
  title: string;
  headings: { id: string; text: string; level: number }[];
}> {
  // Build the full path to the markdown file
  const fullPath = path.join(process.cwd(), filePath);
  try {
    const fileContent = fs.readFileSync(fullPath, "utf-8");
    // Parse headings for TOC (excluding code blocks)
    const headings: { id: string; text: string; level: number }[] = [];
    const idCountMap = new Map<string, number>();
    // Remove code blocks to avoid picking up bash comments as headings
    const contentWithoutCodeBlocks = fileContent.replace(/```[\s\S]*?```/g, "");
    const headingRegex = /^(#{1,2})\s+(.+)$/gm;
    let match;
    while ((match = headingRegex.exec(contentWithoutCodeBlocks)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      let id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      // Handle duplicate IDs by appending a counter
      if (idCountMap.has(id)) {
        const count = idCountMap.get(id)! + 1;
        idCountMap.set(id, count);
        id = `${id}-${count}`;
      } else {
        idCountMap.set(id, 0);
      }
      headings.push({ id, text, level });
    }
    // Extract title from first h1 or filename
    const titleMatch = fileContent.match(/^#\s+(.+)$/m);
    const title = titleMatch
      ? titleMatch[1].trim()
      : filePath.split("/").pop()?.replace(".md", "") || "Untitled";
    // Custom heading renderer to add IDs with duplicate handling
    const headingRenderer = new marked.Renderer();
    const rendererIdCountMap = new Map<string, number>();
    headingRenderer.heading = function (text: string, level: number) {
      let id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      // Handle duplicate IDs by appending a counter
      if (rendererIdCountMap.has(id)) {
        const count = rendererIdCountMap.get(id)! + 1;
        rendererIdCountMap.set(id, count);
        id = `${id}-${count}`;
      } else {
        rendererIdCountMap.set(id, 0);
      }
      return `<h${level} id="${id}">${text}</h${level}>`;
    };
    // Combine renderers
    const combinedRenderer = new marked.Renderer();
    combinedRenderer.code = renderer.code;
    combinedRenderer.heading = headingRenderer.heading;
    (
      combinedRenderer as Renderer & {
        image: (
          href: string | null,
          title: string | null,
          text: string,
        ) => string;
      }
    ).image = (href, title, text) => {
      const src = normalizeImageSrc(href);
      const titleAttr = title ? ` title="${title}"` : "";
      return `<img src="${src}" alt="${text}"${titleAttr} />`;
    };
    marked.use({ renderer: combinedRenderer });
    const content = marked.parse(fileContent) as string;
    return { content, title, headings };
  } catch (error) {
    console.error(`Error reading file: ${filePath}`, error);
    return {
      content: "<p>Could not load this note.</p>",
      title: "Error",
      headings: [],
    };
  }
}
export function getAllMarkdownPaths(): string[] {
  const paths: string[] = [];
  function scanDir(dir: string, basePath = "") {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const relativePath = basePath ? `${basePath}/${item}` : item;
      const stat = fs.statSync(fullPath);
      if (
        stat.isDirectory() &&
        !item.startsWith(".") &&
        !["node_modules", "src", "assets", ".next", "images"].includes(item)
      ) {
        scanDir(fullPath, relativePath);
      } else if (item.endsWith(".md")) {
        // Convert path to slug format
        paths.push(relativePath.replace(".md", ""));
      }
    }
  }
  scanDir(process.cwd());
  return paths;
}
