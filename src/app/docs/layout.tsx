"use client";

import { ReactNode } from "react";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return <div className="flex w-full">{children}</div>;
}
