import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/ui/SessionProvider";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KidPreneur",
  description: "Gamified AI learning platform for kids",
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
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-primary/30">
        <SessionProvider>
          <div className="flex-1 w-full max-w-[430px] mx-auto relative bg-background shadow-2xl flex flex-col min-h-screen border-x border-border/10 overflow-hidden">
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
