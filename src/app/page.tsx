import Link from "next/link";
import { getManifest, countFiles, formatCategoryName } from "@/lib/manifest";

export default function HomePage() {
  const manifest = getManifest();
  const categories = manifest.children;
  return (
    <div className="page-enter max-w-6xl mx-auto lg:mx-0 px-3 sm:px-4 lg:px-6 py-8 sm:py-12 relative">
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --color-accent: #f87171 !important;
          --color-accent-hover: #fca5a5 !important;
          --color-accent-soft: rgba(248, 113, 113, 0.1) !important;
          --color-dark-bg: #000000 !important;
        }
      `}} />

      {/* Hero */}
      <div className="mb-10 sm:mb-14 relative z-10 text-center lg:text-left mt-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-100 dark:text-neutral-100 light:text-black mb-4 sm:mb-6 tracking-tight">
          Welcome to <span className="text-accent">Nano Ink</span>
        </h1>
        <p className="text-base sm:text-lg lg:text-lg text-neutral-400 dark:text-neutral-400 light:text-neutral-600 max-w-2xl mx-auto lg:mx-0">
          Your personal knowledge base for Computer Science
        </p>
      </div>
      {/* Categories Grid */}
      <section className="mb-12 sm:mb-16 relative z-10">
        <h2 className="text-xs sm:text-sm font-semibold text-neutral-500 light:text-black uppercase tracking-wide mb-4 sm:mb-5">
          Browse Topics
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {categories.map((cat, index) => {
            const fileCount = countFiles(cat);
            const readmePath = cat.children?.find(
              (c) => c.name === "README",
            )?.path;
            const href = readmePath
              ? `/docs/${readmePath.replace(".md", "")}`
              : `/docs/${cat.name}/README`;
            const staggerDelay = (index % 8) + 1;
            return (
              <Link
                key={cat.name}
                href={href}
                className={`animate-slide-up stagger-${staggerDelay} group flex flex-col items-center justify-center p-4 sm:p-6 bg-dark-secondary dark:bg-dark-secondary light:bg-light-secondary border border-dark-border dark:border-dark-border light:border-light-border rounded-xl sm:rounded-2xl hover:border-accent/50 hover:bg-dark-panel-strong dark:hover:bg-dark-panel-strong light:hover:bg-light-panel-strong transition-colors duration-300 w-full relative overflow-hidden aspect-[2/1] sm:aspect-auto sm:min-h-[120px]`}
              >
                <div className="absolute inset-0 bg-transparent group-hover:bg-accent/5 transition-colors duration-500" />
                
                <div className="flex flex-col items-center justify-center text-center relative z-10 w-full">
                  <h3 className="font-semibold text-sm sm:text-lg text-neutral-100 dark:text-neutral-100 light:text-black group-hover:text-accent transition-colors leading-tight line-clamp-2">
                    {formatCategoryName(cat.name)}
                  </h3>
                  <span className="text-xs sm:text-sm text-neutral-500 light:text-neutral-500 block mt-1.5">
                    {fileCount} {fileCount === 1 ? "note" : "notes"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    
    </div>
  );
}
