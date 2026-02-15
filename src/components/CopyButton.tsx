"use client";

interface CopyButtonProps {
  code: string;
}

export function CopyButton({ code }: CopyButtonProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 px-3 py-1.5 text-xs font-medium text-neutral-400 bg-white/5 border border-white/10 rounded-md hover:bg-white/10 hover:text-neutral-200 transition-colors"
    >
      Copy
    </button>
  );
}
