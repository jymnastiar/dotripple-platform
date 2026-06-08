"use client";

import Link from "next/link";
import { MailIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
} from "@/src/icons/social-icon";

type SocialDockProps = {
  email: string;
  githubAccount?: string | null;
  twitterAccount?: string | null;
  instagramAccount?: string | null;
  linkedinAccount?: string | null;
};

export function SocialDock({
  email,
  githubAccount,
  twitterAccount,
  instagramAccount,
  linkedinAccount,
}: SocialDockProps) {
  const socialLinks = [
    { key: "github", url: githubAccount, icon: GithubIcon, label: "GitHub" },
    { key: "x", url: twitterAccount, icon: XIcon, label: "X / Twitter" },
    {
      key: "instagram",
      url: instagramAccount,
      icon: InstagramIcon,
      label: "Instagram",
    },
    {
      key: "linkedin",
      url: linkedinAccount,
      icon: LinkedinIcon,
      label: "LinkedIn",
    },
  ].filter((s) => s.url);

  const hasSocials = socialLinks.length > 0;

  return (
    <TooltipProvider>
      <div className="inline-flex items-center rounded-lg border border-border p-1 gap-1 sm:p-2 sm:gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`mailto:${email}`}
              aria-label="Send Email"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "size-8 rounded-full sm:p-5",
              )}
            >
              <MailIcon className="size-4" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{email}</p>
          </TooltipContent>
        </Tooltip>

        {hasSocials && (
          <Separator orientation="vertical" className="h-8 w-0.5 my-auto" />
        )}

        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <Tooltip key={social.key}>
              <TooltipTrigger asChild>
                <Link
                  href={social.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-8 rounded-full sm:p-5",
                  )}
                >
                  <Icon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{social.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
