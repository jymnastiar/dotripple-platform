import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Geist, DM_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ConvexClientProvider } from "@/components/web/ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";

const dmSans = DM_Sans({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Project Nextjs 1",
  description: "This is my nextjs leason",
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
        <main className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8">
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
      </body>
    </html>
  );
}
