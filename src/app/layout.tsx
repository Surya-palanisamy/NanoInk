import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getManifest } from "@/lib/manifest";
import type { Metadata } from "next";
import Script from "next/script";
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
    "Nano Ink is a computer science knowledge base with notes on programming, data structures, algorithms, web development and system design.",
  applicationName: "Nano Ink",
  authors: [{ name: "Surya palanisamy" }],
  creator: "Surya palanisamy",
  publisher: "Surya palanisamy",
  keywords: [
    "Computer Science",
    "Knowledge Base",
    "Notes",
    "Learning Hub",
    "Tech Notes",
    "Programming",
    "Development",
    "Tech Learning",
    "CS Concepts",
    "Coding Notes",
    "Tech Reference",
    "Nano Ink",
    "computer science notes",
    "data structures and algorithms notes",
    "programming tutorials",
    "web development notes",
    "system design basics",
    "coding interview preparation",
    "Next.js learning notes",
    "Nano Ink knowledge base",
  ],
  metadataBase: new URL("http://ink.suryapalanisamy.tech"),
  openGraph: {
    type: "website",
    siteName: "Nano Ink",
    title: "Nano Ink",
    description:
      "Nano Ink is a computer science knowledge base with notes on programming, data structures, algorithms, web development and system design.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nano Ink",
    description:
      "Nano Ink is a computer science knowledge base with notes on programming, data structures, algorithms, web development and system design.",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-N1W7WM3PSP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-N1W7WM3PSP');
    `}
        </Script>
      </body>
    </html>
  );
}
