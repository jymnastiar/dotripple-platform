import { ReactNode } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          User Profile
        </h1>
        <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto,
          minus.
        </p>
      </div>

      <div className="container max-w-5xl mx-auto px-4 mt-12 relative z-10">
        {children}
      </div>
    </div>
  );
}
