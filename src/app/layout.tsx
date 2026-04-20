import { LocaleProvider } from '@/components/LocaleProvider'
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
      className={`${nunito.variable} h-full antialiased`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#FFF8E7" />
      </head>
      <body className="min-h-full flex flex-col font-sans selection:bg-primary/30" style={{ backgroundColor: "#FFF8E7", color: "#2C2C2A" }}>
        <ErrorBoundary>
          <SessionProvider>
            <div
              className="flex-1 w-full max-w-[430px] mx-auto relative shadow-2xl flex flex-col min-h-[100dvh] overflow-hidden animate-in fade-in duration-300"
              style={{ backgroundColor: "#FFF8E7" }}
            >
              <LocaleProvider>{children}</LocaleProvider>
            </div>
          </SessionProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
