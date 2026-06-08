import {
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

export type SocialAccountField =
  | "githubAccount"
  | "twitterAccount"
  | "instagramAccount"
  | "linkedinAccount";

export type SocialAccount = {
  name: SocialAccountField;
  label: string;
  icon: Icon;
  link: string;
};

const socialAccounts: SocialAccount[] = [
  {
    name: "githubAccount",
    label: "GitHub",
    icon: GithubLogoIcon,
    link: "https://github.com/",
  },
  {
    name: "twitterAccount",
    label: "X/Twitter",
    icon: XLogoIcon,
    link: "https://x.com/",
  },
  {
    name: "instagramAccount",
    label: "Instagram",
    icon: InstagramLogoIcon,
    link: "https://www.instagram.com/",
  },
  {
    name: "linkedinAccount",
    label: "LinkedIn",
    icon: LinkedinLogoIcon,
    link: "https://www.linkedin.com/in/",
  },
];

export default socialAccounts;
