import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { DM_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ConvexClientProvider } from "@/components/shared/convex-client-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    template: "%s | DotRipple",
    default: "DotRipple - A Modern Blogging Platform",
  },
  description:
    "A modern blogging platform for sharing thoughts, articles, and insights.",
  authors: [{ name: "Jymnastiar" }],
  verification: {
    google: "jbvByng7g4Qa3JZUV8aKHR4aY4tsr4EjoNuhONTgCg8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", dmSans.variable)}
    >
      <body className="min-h-full flex flex-col">
        <main className="min-h-full flex flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ConvexClientProvider>{children}</ConvexClientProvider>
          </ThemeProvider>
        </main>
        <Toaster closeButton />
        <Analytics />
      </body>
    </html>
  );
}
