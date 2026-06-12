"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Heart } from "lucide-react";
import { GithubIcon, XIcon, LinkedinIcon } from "@/src/icons/social-icon";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background/50 backdrop-blur supports-backdrop-filter:bg-background/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-8 border-b border-border">
          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/dot-ripple-logo.png"
                alt="DotRipple Logo"
                width={1000}
                height={1000}
                className="w-32 h-auto object-contain dark:brightness-110"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Discover thoughts, stories, and insights from our community. A
              personal blog project built by Jymnastiar.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-primary/10 hover:text-primary transition-all text-muted-foreground"
                aria-label="GitHub"
              >
                <GithubIcon className="size-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-primary/10 hover:text-primary transition-all text-muted-foreground"
                aria-label="Twitter"
              >
                <XIcon className="size-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-primary/10 hover:text-primary transition-all text-muted-foreground"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="size-4" />
              </a>
              <a
                href="mailto:fadhligymnastiar99@gmail.com"
                className="p-2 rounded-lg bg-secondary hover:bg-primary/10 hover:text-primary transition-all text-muted-foreground"
                aria-label="Email"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="col-span-2 md:col-span-2">
            <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog Feed
                </Link>
              </li>
              <li>
                <Link
                  href="/create"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Write Post
                </Link>
              </li>
            </ul>
          </div>

          {/* Topics Column */}
          <div className="col-span-2 md:col-span-2">
            <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/blog?tag=Tech"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  href="/blog?tag=Design"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Design
                </Link>
              </li>
              <li>
                <Link
                  href="/blog?tag=Lifestyle"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Lifestyle
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="col-span-2 md:col-span-2">
            <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="col-span-2 md:col-span-2">
            <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase mb-4">
              Contact Me
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              Have questions or feedback? Feel free to reach out directly via
              email.
            </p>
            <a
              href="mailto:fadhligymnastiar99@gmail.com"
              className="inline-flex w-full items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-all rounded-lg"
            >
              <Mail className="size-3" />
              Send Email
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
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
