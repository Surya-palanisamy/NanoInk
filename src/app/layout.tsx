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
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans min-h-screen bg-dark-bg dark:bg-dark-bg light:bg-light-bg text-neutral-100 dark:text-neutral-100 light:text-black transition-colors relative selection:bg-accent/30`}>
        {/* Universal Ambient Gradients & Noise */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen light:mix-blend-multiply opacity-70">
          <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-accent/20 dark:bg-accent/20 light:bg-accent/10 rounded-full blur-[100px] sm:blur-[140px] animate-blob" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-[#06b6d4]/20 dark:bg-[#06b6d4]/20 light:bg-[#06b6d4]/10 rounded-full blur-[100px] sm:blur-[140px] animate-blob animation-delay-2000" />
          <div className="absolute top-[40%] left-[20%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-[#ec4899]/15 dark:bg-[#ec4899]/15 light:bg-[#ec4899]/10 rounded-full blur-[100px] sm:blur-[120px] animate-blob animation-delay-4000 hidden md:block" />
        </div>
        
        {/* Subtle Grain Overlay */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] dark:opacity-[0.03] light:opacity-[0.015] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen relative z-10">
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
