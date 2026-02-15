"use client";

interface TableOfContentsProps {
  headings: { id: string; text: string; level: number }[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length === 0) {
    return (
      <aside className="hidden xl:block fixed top-[var(--header-height)] right-0 w-[200px] xl:w-[240px] h-[calc(100vh-var(--header-height))] border-l border-dark-border dark:border-dark-border light:border-light-border bg-dark-secondary dark:bg-dark-secondary light:bg-light-secondary overflow-y-auto">
        <div className="p-3 xl:p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.18em]">
              Contents
            </h3>
          </div>
          <p className="text-xs xl:text-sm text-neutral-500">
            No headings found
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="hidden xl:block fixed top-[var(--header-height)] right-0 w-[200px] xl:w-[240px] h-[calc(100vh-var(--header-height))] border-l border-dark-border dark:border-dark-border light:border-light-border bg-dark-secondary dark:bg-dark-secondary light:bg-light-secondary overflow-y-auto">
      <div className="p-3 xl:p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.18em]">
            Contents
          </h3>
        </div>
        <nav className="space-y-1 xl:space-y-1.5 border-l border-white/5 pl-2 xl:pl-3">
          {headings.map((heading, index) => (
            <a
              key={`${heading.id}-${index}`}
              href={`#${heading.id}`}
              title={heading.text}
              className={`group block text-[11px] xl:text-[13px] leading-4 xl:leading-5 text-neutral-400 hover:text-neutral-100 transition-colors truncate ${
                heading.level === 1 ? "font-semibold" : "font-normal"
              }`}
              style={{ paddingLeft: `${(heading.level - 1) * 8}px` }}
            >
              <span className="block truncate group-hover:translate-x-0.5 transition-transform">
                {heading.text}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
