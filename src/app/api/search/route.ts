import { NextResponse } from "next/server";
import { getManifest, getAllEntries } from "@/lib/manifest";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase();

  if (!query) {
    return NextResponse.json([]);
  }

  const manifest = getManifest();
  const entries = getAllEntries(manifest);

  const results = [];

  for (const entry of entries) {
    if (!entry.path) continue;

    // Check title/path match
    const titleMatch =
      entry.name.toLowerCase().includes(query) ||
      entry.path.toLowerCase().includes(query);

    let isMatch = titleMatch;
    let excerpt = "";
    let anchor = "";

    try {
      const fullPath = path.join(process.cwd(), entry.path);
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, "utf8");
        const contentLower = content.toLowerCase();

        const contentIndex = contentLower.indexOf(query);

        if (contentIndex !== -1) {
          isMatch = true;
          // Extract a snippet
          const snippetRadius = 40;
          let start = Math.max(0, contentIndex - snippetRadius);
          let end = Math.min(
            content.length,
            contentIndex + query.length + snippetRadius,
          );

          excerpt = content
            .substring(start, end)
            .replace(/\n/g, " ")
            .replace(/\s+/g, " ");
          if (start > 0) excerpt = "..." + excerpt;
          if (end < content.length) excerpt = excerpt + "...";

          excerpt = excerpt.replace(/[#*_`]/g, "");

          // Find nearest heading before the match to use as an anchor
          const contentWithoutCodeBlocks = content.replace(
            /```[\s\S]*?```/g,
            (match) => " ".repeat(match.length),
          );
          const headingRegex = /^(#{1,6})\s+(.+)$/gm;
          let headingMatch;
          let lastHeadingId = "";
          const rendererIdCountMap = new Map<string, number>();

          while (
            (headingMatch = headingRegex.exec(contentWithoutCodeBlocks)) !==
            null
          ) {
            if (headingMatch.index > contentIndex) {
              break;
            }

            const text = headingMatch[2].trim();
            let id = text
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-");

            if (rendererIdCountMap.has(id)) {
              const count = rendererIdCountMap.get(id)! + 1;
              rendererIdCountMap.set(id, count);
              id = `${id}-${count}`;
            } else {
              rendererIdCountMap.set(id, 0);
            }

            lastHeadingId = id;
          }

          if (lastHeadingId) {
            anchor = "#" + lastHeadingId;
          }
        }
      }
    } catch (error) {
      console.error(`Error reading file for search: ${entry.path}`, error);
    }

    if (isMatch) {
      results.push({
        name: entry.name,
        path: entry.path,
        parentPath: entry.parentPath,
        excerpt: excerpt || "",
        anchor,
      });
    }
  }

  return NextResponse.json(results.slice(0, 15));
}
