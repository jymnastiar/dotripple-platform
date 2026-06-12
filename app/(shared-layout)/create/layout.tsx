import { isAuthenticated } from "@/lib/auth-server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create Post",
  description: "Share your thoughts, stories, and ideas with the world.",
};

export default async function CreatePostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedin = await isAuthenticated();

  if (!isLoggedin) {
    return redirect("/auth/login");
  }
  return <>{children}</>;
}
