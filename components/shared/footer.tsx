"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/src/icons/social-icon";
import { InstagramLogo } from "@phosphor-icons/react";
import DotRippleIcon from "@/src/logo/dot-ripple-icon";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background/50 backdrop-blur supports-backdrop-filter:bg-background/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="md:grid flex flex-col md:grid-cols-12 gap-8 md:gap-12 pb-8 border-b border-border">
          <div className="justify-center items-center flex flex-col gap-4 md:col-span-4 md:justify-start md:items-start">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/dot-ripple-logo.png"
                alt="DotRipple Logo"
                width={128}
                height={32}
                className="w-32 h-auto object-contain dark:brightness-110"
                style={{ width: "auto", height: "auto" }}
              />
            </Link>
            <p className="text-sm text-center md:text-left text-muted-foreground leading-relaxed max-w-sm">
              Discover thoughts, stories, and insights from our community. A
              personal blog project built by Jymnastiar.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <Link
                href="https://github.com/jymnastiar"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:text-primary transition-all text-muted-foreground"
                aria-label="GitHub"
              >
                <GithubIcon className="size-4" />
              </Link>
              <Link
                href="https://linkedin.com/in/jymnastiar"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:text-primary transition-all text-muted-foreground"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="size-4" />
              </Link>
              <Link
                href="https://www.instagram.com/agymnastiar11"
                className="p-1.5 rounded-lg bg-secondary hover:text-primary transition-all text-muted-foreground"
                aria-label="Email"
              >
                <InstagramLogo className="size-5" />
              </Link>
              <Link
                href="https://dotripple.vercel.app/profile/jymnastiar"
                target="_blank"
                className="p-2 rounded-lg bg-secondary hover:text-primary transition-all text-muted-foreground"
                aria-label="DotRipple Profile"
              >
                <DotRippleIcon className="size-4" variant="gray" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center md:col-span-2 md:items-start md:justify-start">
            <h3 className="text-sm text-center md:text-left font-semibold tracking-wider text-foreground uppercase mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              <li className="text-center md:text-left">
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li className="text-center md:text-left">
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog Feed
                </Link>
              </li>
              <li className="text-center md:text-left">
                <Link
                  href="/create"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Write Post
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-center items-center md:col-span-2 md:items-start md:justify-start">
            <h3 className="text-center md:text-left text-sm font-semibold tracking-wider text-foreground uppercase mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li className="text-center md:text-left">
                <Link
                  href="/blog?q=Accessibility"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Accessibility
                </Link>
              </li>
              <li className="text-center md:text-left">
                <Link
                  href="/blog?q=convex"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Convex
                </Link>
              </li>
              <li className="text-center md:text-left">
                <Link
                  href="/blog?q=typescript"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  TypeScript
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-center items-center md:col-span-2 md:items-start md:justify-start">
            <h3 className="text-center md:text-left text-sm font-semibold tracking-wider text-foreground uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li className="text-center md:text-left">
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="text-center md:text-left">
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li className="text-center md:text-left">
                <Link
                  href="/cookies"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-center items-center md:col-span-2 md:items-start md:justify-start">
            <h3 className="text-sm text-center md:text-left font-semibold tracking-wider text-foreground uppercase mb-4">
              Contact Me
            </h3>
            <p className="text-xs text-center md:text-left text-muted-foreground leading-relaxed mb-3">
              Have questions or feedback? Feel free to reach out directly via
              email.
            </p>
            <Link
              href="mailto:fadhligymnastiar99@gmail.com"
              className="inline-flex w-full max-w-100 items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-all rounded-lg"
            >
              <Mail className="size-3" />
              Send Email
            </Link>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} DotRipple. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="size-3 text-red-500 fill-red-500" /> by
            Jymnastiar.
          </p>
        </div>
      </div>
    </footer>
  );
}
