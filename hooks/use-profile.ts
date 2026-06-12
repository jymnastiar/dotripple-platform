import { api } from "@/convex/_generated/api";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "convex/react";
import { useState } from "react";

export const TABS = ["Blogs", "Comments", "Likes", "Bookmark"];

export function useProfile(username: string) {
  const [activeTab, setActiveTab] = useState("Blogs");

  const user = useQuery(api.users.getUserByUsername, { username });
  const posts = useQuery(
    api.posts.getPostsByAuthor,
    user?.betterAuthId ? { authorId: user.betterAuthId } : "skip",
  );
  const { data: session } = authClient.useSession();
  const isOwner = session?.user?.id === user?.betterAuthId;

  const userComments = useQuery(
    api.comment.getCommentByAuthorId,
    user?.betterAuthId ? { authorId: user.betterAuthId } : "skip",
  );

  return {
    activeTab,
    setActiveTab,
    username,
    user,
    posts,
    isOwner,
    userComments,
  };
}
