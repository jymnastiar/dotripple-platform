"use client";

import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Particles } from "@/components/ui/particles";
import { motion } from "motion/react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isSignUp = pathname === "/auth/sign-up";
  const [particleColor, setParticleColor] = useState("#ffffff");

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setParticleColor(isDark ? "#ffffff" : "#000000");
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const xForm = isDesktop ? (isSignUp ? "100%" : "0%") : "0%";
  const xDecorative = isDesktop ? (isSignUp ? "-100%" : "0%") : "0%";

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden flex flex-col lg:flex-row">
      {!isDesktop && (
        <Particles
          className="absolute inset-0 z-0 pointer-events-none"
          quantity={50}
          color={particleColor}
          ease={80}
        />
      )}

      <motion.div
        className="w-full lg:w-1/2 min-h-screen flex items-center justify-center p-6 sm:p-12 relative z-10"
        animate={{ x: xForm }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0 }}
        initial={false}
      >
        <div className="w-full max-w-sm flex flex-col gap-6 relative z-10">
          <div className="lg:hidden flex items-center justify-between w-full mb-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/dot-ripple-logo.png"
                alt="DotRipple Logo"
                width={120}
                height={120}
                className="object-contain"
              />
            </Link>
            <Link
              href="/"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              <ArrowLeft className="size-4" />
              Back
            </Link>
          </div>
          {children}
        </div>
      </motion.div>

      <motion.div
        className={`hidden lg:flex absolute top-0 bottom-0 right-0 w-1/2 flex-col justify-between p-12 overflow-hidden bg-slate-50/50 dark:bg-slate-900/10 backdrop-blur-xs z-20 ${
          isSignUp ? "border-r border-border" : "border-l border-border"
        }`}
        animate={{ x: xDecorative }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0 }}
        initial={false}
      >
        <div className="absolute top-[-20%] left-[-20%] size-[80%] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-20%] size-[80%] rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <Particles
          className="absolute inset-0 z-0 pointer-events-none"
          quantity={120}
          color={particleColor}
          ease={80}
        />

        <div className="relative z-10 flex flex-col justify-between h-full">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/dot-ripple-logo.png"
                alt="DotRipple Logo"
                width={150}
                height={150}
                className="object-contain"
              />
            </Link>
            <Link
              href="/"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              <ArrowLeft className="size-4" />
              Back to Home
            </Link>
          </div>

          <div className="my-auto flex flex-col gap-4 max-w-md">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary w-fit">
                {isSignUp ? "Join the community" : "Welcome back"}
              </span>
              <blockquote className="text-3xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
                {isSignUp
                  ? "Create a ripple that spreads inspiration across the world."
                  : "Every great story starts with a single ripple of thought."}
              </blockquote>
              <p className="text-sm text-muted-foreground">
                {isSignUp
                  ? "Set up your account and start publishing your ideas today."
                  : "Sign in to manage your content and engage with other creators."}
              </p>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} DotRipple. All rights reserved.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
