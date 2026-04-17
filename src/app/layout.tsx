import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/ui/SessionProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KidPreneur — AI Learning for Little Founders",
  description: "Where Kids Become Founders. Learn AI tools through fun missions guided by Quacky your AI duck!",
  openGraph: {
    title: "KidPreneur — AI Learning for Little Founders",
    description: "Where Kids Become Founders. Learn AI tools through fun missions guided by Quacky your AI duck!",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} h-full antialiased dark`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-primary/30">
        <ErrorBoundary>
          <SessionProvider>
            <div className="flex-1 w-full max-w-[430px] mx-auto relative bg-background shadow-2xl flex flex-col min-h-[100dvh] border-x border-border/10 overflow-hidden animate-in fade-in duration-300">
              {children}
            </div>
          </SessionProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
