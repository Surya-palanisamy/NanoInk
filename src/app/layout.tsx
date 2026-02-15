import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { getManifest } from "@/lib/manifest";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Learning Hub",
  description:
    "Your personal knowledge base for Computer Science & Software Engineering",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const manifest = getManifest();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <ThemeProvider>
          <div className="min-h-screen bg-dark-bg dark:bg-dark-bg light:bg-light-bg transition-colors">
            <Header />
            <div className="flex pt-[var(--header-height)]">
              <Sidebar manifest={manifest} />
              <main className="flex-1 ml-0 lg:ml-[var(--sidebar-width)] transition-all">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
