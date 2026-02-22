import Link from "next/link";
import { getManifest, countFiles, formatCategoryName } from "@/lib/manifest";

const categoryIcons: Record<string, React.ReactNode> = {
  ComputerNetworks: (
    <svg
      className="w-full h-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  Database: (
    <svg
      className="w-full h-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  DevOps: (
    <svg
      className="w-full h-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  DSA: (
    <svg
      className="w-full h-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  Linux: (
    <svg
      className="w-full h-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M4 17l6-6-6-6" />
      <path d="M12 19h8" />
    </svg>
  ),
  OperatingSystems: (
    <svg
      className="w-full h-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
    </svg>
  ),
  Tools: (
    <svg
      className="w-full h-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  WebDev: (
    <svg
      className="w-full h-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
};

const defaultIcon = (
  <svg
    className="w-full h-full"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const quickLinks = [
  {
    path: "/docs/DSA/README",
    label: "Data Structures & Algorithms",
    emoji: "🚀",
  },
  { path: "/docs/Linux/Linux", label: "Linux", emoji: "🐧" },
  { path: "/docs/DevOps/Docker", label: "Docker Basics", emoji: "🐳" },
  { path: "/docs/WebDev/JavaScript", label: "JavaScript", emoji: "⚡" },
];

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
        }
      `}} />
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-accent/20 blur-[120px] rounded-full pointer-events-none -mr-40" />
      
      {/* Hero */}
      <div className="mb-10 sm:mb-14 relative z-10 text-center lg:text-left mt-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 to-neutral-400 dark:from-neutral-100 dark:to-neutral-400 light:from-black light:to-neutral-600 mb-4 sm:mb-6 tracking-tight">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#06b6d4]">Nano Ink</span>
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-neutral-400 dark:text-neutral-400 light:text-neutral-600 max-w-2xl mx-auto lg:mx-0">
          Your personal knowledge base for Computer Science & Software
          Engineering
        </p>
      </div>

      {/* Categories Grid */}
      <section className="mb-12 sm:mb-16 relative z-10">
        <h2 className="text-xs sm:text-sm font-semibold text-neutral-500 light:text-black uppercase tracking-wide mb-4 sm:mb-5">
          Browse Topics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
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
                className={`animate-slide-up stagger-${staggerDelay} group flex flex-col sm:flex-row sm:items-center gap-4 p-5 sm:p-6 bg-dark-secondary dark:bg-dark-secondary light:bg-light-secondary border border-dark-border dark:border-dark-border light:border-light-border rounded-xl sm:rounded-2xl hover:border-accent/50 hover:bg-dark-panel-strong dark:hover:bg-dark-panel-strong light:hover:bg-light-panel-strong transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] light:hover:shadow-[0_8px_30px_rgba(139,92,246,0.1)] w-full relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-transparent transition-colors duration-500" />
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-accent-soft rounded-xl text-accent flex-shrink-0 self-center sm:self-auto relative z-10 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-6 h-6 sm:w-7 sm:h-7">
                    {categoryIcons[cat.name] || defaultIcon}
                  </div>
                </div>
                <div className="flex-1 min-w-0 self-center sm:self-auto relative z-10">
                  <h3 className="font-semibold text-base sm:text-lg text-neutral-100 dark:text-neutral-100 light:text-black group-hover:text-accent transition-colors">
                    {formatCategoryName(cat.name)}
                  </h3>
                  <span className="text-xs sm:text-sm text-neutral-500 light:text-neutral-500 self-center sm:self-auto block mt-1">
                    {fileCount} {fileCount === 1 ? "note" : "notes"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Quick Start */}
      <section>
        <h2 className="text-xs sm:text-sm font-semibold text-neutral-500 light:text-black uppercase tracking-wide mb-4 sm:mb-5">
          Quick Start
        </h2>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {quickLinks.map((link, i) => (
            <Link
              key={link.path}
              href={link.path}
              className={`animate-slide-up stagger-${(i % 8) + 1} inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 bg-dark-secondary dark:bg-dark-secondary light:bg-light-secondary border border-dark-border dark:border-dark-border light:border-light-border rounded-xl sm:rounded-2xl text-neutral-300 dark:text-neutral-300 light:text-black font-medium text-sm sm:text-base hover:border-accent/50 hover:text-accent hover:bg-accent-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
            >
              <span className="text-lg sm:text-xl group-hover:scale-110 transition-transform">{link.emoji}</span>
              <span className="hidden sm:inline">{link.label}</span>
              <span className="sm:hidden">{link.label.split(" ")[0]}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
