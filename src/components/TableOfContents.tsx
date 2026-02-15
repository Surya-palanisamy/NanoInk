"use client";

interface TableOfContentsProps {
  headings: { id: string; text: string; level: number }[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length === 0) {
    return (
      <aside className="hidden xl:block fixed top-[var(--header-height)] right-0 w-[240px] h-[calc(100vh-var(--header-height))] border-l border-dark-border dark:border-dark-border light:border-light-border bg-dark-secondary dark:bg-dark-secondary light:bg-light-secondary overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wide mb-3">
            Contents
          </h3>
          <p className="text-sm text-neutral-500">No headings found</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="hidden xl:block fixed top-[var(--header-height)] right-0 w-[240px] h-[calc(100vh-var(--header-height))] border-l border-dark-border dark:border-dark-border light:border-light-border bg-dark-secondary dark:bg-dark-secondary light:bg-light-secondary overflow-y-auto">
      <div className="p-4">
        <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wide mb-3">
          Contents
        </h3>
        <nav className="space-y-1">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={`block text-sm text-neutral-400 hover:text-accent transition-colors ${
                heading.level === 1 ? "font-medium" : ""
              }`}
              style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
