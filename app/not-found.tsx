"use client";

import { Particles } from "@/components/ui/particles";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import DotRippleIcon from "@/src/logo/dot-ripple-icon";

export default function NotFoundPage() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");
  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 gap-6">
        <span className="pointer-events-none gap-2 flex items-center justify-center bg-linear-to-b from-black to-gray-300/80 bg-clip-text text-[6rem] leading-none font-semibold text-transparent dark:from-white dark:to-slate-900/10 sm:text-[10rem] lg:text-[14rem] select-none">
          4
          <DotRippleIcon className="w-[0.7em] h-[0.7em]" />4
        </span>

        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl -mt-6">
          Page Not Found
        </h1>

        <p className="max-w-md text-lg text-muted-foreground">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 hover:scale-[1.03] active:scale-[0.98]"
          >
            <Home size={15} />
            Go Home
          </Link>

          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-muted hover:scale-[1.03] active:scale-[0.98]"
          >
            {" "}
            <ArrowLeft size={15} />
            Go Back
          </button>
        </div>
      </div>
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
    </section>
  );
}
