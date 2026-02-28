import { NextResponse } from "next/server";
import { getManifest, getAllEntries } from "@/lib/manifest";
import { getMarkdownContent } from "@/lib/markdown";

export async function GET() {
  try {
    const manifest = getManifest();
    const entries = getAllEntries(manifest);

    const pages = await Promise.all(
      entries.map(async (entry) => {
        const { content, title, headings } = await getMarkdownContent(
          entry.path,
        );
        return {
          name: entry.name,
          path: entry.path,
          parentPath: entry.parentPath,
          title,
          content,
          headings,
        };
      }),
    );

    return NextResponse.json({ pages });
  } catch (error) {
    console.error("Failed to fetch all pages:", error);
    return NextResponse.json(
      { error: "Failed to fetch pages" },
      { status: 500 },
    );
  }
}
