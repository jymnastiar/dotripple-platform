import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { ReactNode } from "react";

export default function SharedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
