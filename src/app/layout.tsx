import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getManifest } from "@/lib/manifest";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});
export const metadata: Metadata = {
  title: {
    default: "Nano Ink",
    template: "%s | Nano Ink",
  },
  description:
    "Your personal knowledge base for Computer Science & Software Engineering",
  applicationName: "Nano Ink",
  authors: [{ name: "Surya palanisamy" }],
  creator: "Surya palanisamy",
  publisher: "Surya palanisamy",
  keywords: [
    "Computer Science",
    "Software Engineering",
    "Knowledge Base",
    "Notes",
    "Learning Hub",
    "Tech Notes",
    "Programming",
    "Development",
    "Tech Learning",
    "CS Concepts",
    "Software Design",
    "Coding Notes",
    "Tech Reference",
    "Nano Ink",
  ],
  metadataBase: new URL("https://nano-ink.vercel.app"),
  openGraph: {
    type: "website",
    siteName: "Nano Ink",
    title: "Nano Ink",
    description:
      "Your personal knowledge base for Computer Science & Software Engineering",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nano Ink",
    description:
      "Your personal knowledge base for Computer Science & Software Engineering",
  },
  icons: {
    icon: "/favicon.ico",
  },
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
              <main className="flex-1 w-full min-h-[calc(100vh-var(--header-height))] lg:ml-[var(--sidebar-width)] transition-all overflow-x-hidden">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
