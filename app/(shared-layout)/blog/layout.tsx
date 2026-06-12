import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Explore ideas, stories, and insights written by our community on DotRipple.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
