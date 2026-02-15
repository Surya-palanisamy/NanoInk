import Link from "next/link";
import { getManifest, countFiles, formatCategoryName } from "@/lib/manifest";

const categoryIcons: Record<string, React.ReactNode> = {
  ComputerNetworks: (
    <svg
      className="w-8 h-8"
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
      className="w-8 h-8"
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
      className="w-8 h-8"
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
      className="w-8 h-8"
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
      className="w-8 h-8"
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
      className="w-8 h-8"
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
      className="w-8 h-8"
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
      className="w-8 h-8"
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
    className="w-8 h-8"
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
  { path: "/docs/Linux/Linux-Guide", label: "Linux Guide", emoji: "🐧" },
  { path: "/docs/DevOps/Docker", label: "Docker Basics", emoji: "🐳" },
  { path: "/docs/WebDev/JavaScript", label: "JavaScript", emoji: "⚡" },
];

export default function HomePage() {
  const manifest = getManifest();
  const categories = manifest.children;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900 mb-4">
          Welcome to Learning Hub
        </h1>
        <p className="text-lg text-neutral-400 dark:text-neutral-400 light:text-neutral-600">
          Your personal knowledge base for Computer Science & Software
          Engineering
        </p>
      </div>

      {/* Categories Grid */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-5">
          Browse Topics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat) => {
            const fileCount = countFiles(cat);
            const readmePath = cat.children?.find(
              (c) => c.name === "README",
            )?.path;
            const href = readmePath
              ? `/docs/${readmePath.replace(".md", "")}`
              : `/docs/${cat.name}/README`;

            return (
              <Link
                key={cat.name}
                href={href}
                className="group flex items-center gap-4 p-5 bg-dark-secondary dark:bg-dark-secondary light:bg-light-secondary border border-dark-border dark:border-dark-border light:border-light-border rounded-xl hover:border-accent hover:bg-dark-panel-strong dark:hover:bg-dark-panel-strong light:hover:bg-light-panel-strong transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-accent-soft rounded-xl text-accent">
                  {categoryIcons[cat.name] || defaultIcon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-100 dark:text-neutral-100 light:text-neutral-900 group-hover:text-accent transition-colors">
                    {formatCategoryName(cat.name)}
                  </h3>
                  <span className="text-sm text-neutral-500">
                    {fileCount} {fileCount === 1 ? "note" : "notes"}
                  </span>
                </div>
                <svg
                  className="w-5 h-5 text-neutral-500 group-hover:text-accent group-hover:translate-x-1 transition-all"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Quick Start */}
      <section>
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-5">
          Quick Start
        </h2>
        <div className="flex flex-wrap gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="inline-flex items-center gap-2 px-5 py-3 bg-dark-secondary dark:bg-dark-secondary light:bg-light-secondary border border-dark-border dark:border-dark-border light:border-light-border rounded-xl text-neutral-300 dark:text-neutral-300 light:text-neutral-700 font-medium text-sm hover:border-accent hover:text-accent hover:bg-accent-soft transition-all"
            >
              <span className="text-lg">{link.emoji}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
