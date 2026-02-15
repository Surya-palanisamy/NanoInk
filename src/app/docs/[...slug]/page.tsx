import { getMarkdownContent, getAllMarkdownPaths } from "@/lib/markdown";
import { TableOfContents } from "@/components/TableOfContents";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getManifest } from "@/lib/manifest";
import { notFound } from "next/navigation";

interface DocPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

function isDirectory(slug: string[], manifest = getManifest()): boolean {
  let current: any = manifest;

  for (const part of slug) {
    if (!current.children) return false;
    const found = current.children.find((child: any) => child.name === part);
    if (!found) return false;
    current = found;
  }

  return !!current.children && current.children.length > 0;
}

// Generate static params for all markdown files
export async function generateStaticParams() {
  const paths = getAllMarkdownPaths();
  return paths.map((path) => ({
    slug: path.split("/"),
  }));
}

export async function generateMetadata({ params }: DocPageProps) {
  const { slug } = await params;
  const finalSlug = isDirectory(slug) ? [...slug, "README"] : slug;
  const filePath = finalSlug.join("/") + ".md";
  const { title } = await getMarkdownContent(filePath);

  return {
    title: `${title} | Nano Ink`,
  };
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params;

  // If slug points to a directory, load its README instead
  const finalSlug = isDirectory(slug) ? [...slug, "README"] : slug;
  const filePath = finalSlug.join("/") + ".md";
  const { content, title, headings } = await getMarkdownContent(filePath);

  if (content === "<p>Could not load this note.</p>") {
    notFound();
  }

  // Build breadcrumb
  const breadcrumbParts = slug.slice(0, -1);

  return (
    <div className="flex flex-col lg:flex-row w-full">
      {/* Main content */}
      <div className="flex-1 w-full">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 xl:pr-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-neutral-500 mb-4 sm:mb-6 overflow-x-auto pb-2">
            {breadcrumbParts.map((part, index) => (
              <span
                key={index}
                className="flex items-center gap-1 sm:gap-2 whitespace-nowrap"
              >
                <span className="text-neutral-400 text-xs sm:text-sm truncate">
                  {part}
                </span>
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            ))}
            <span className="text-neutral-200 dark:text-neutral-200 light:text-neutral-800 text-xs sm:text-sm truncate">
              {finalSlug[finalSlug.length - 1]}
            </span>
          </nav>

          {/* Article */}
          <article>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900 mb-6 sm:mb-8 break-words">
              {title}
            </h1>
            <MarkdownContent content={content} />
          </article>
        </div>
      </div>

      {/* Table of Contents */}
      <TableOfContents headings={headings} />
    </div>
  );
}
