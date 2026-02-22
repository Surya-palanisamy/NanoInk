import Link from "next/link";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-3 sm:px-6">
      <h1 className="text-5xl sm:text-6xl font-bold text-neutral-300 light:text-black mb-3 sm:mb-4">
        404
      </h1>
      <h2 className="text-xl sm:text-2xl font-semibold text-neutral-100 light:text-black mb-3 sm:mb-4">
        Page Not Found
      </h2>
      <p className="text-sm sm:text-base text-neutral-400 light:text-black mb-6 sm:mb-8 text-center max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-4 sm:px-6 py-2 sm:py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors text-sm sm:text-base"
      >
        Go to Home
      </Link>
    </div>
  );
}
