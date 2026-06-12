import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Post",
  description: "Share your thoughts, stories, and ideas with the world.",
};

export default function CreatePostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
