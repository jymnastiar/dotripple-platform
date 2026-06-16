import { api } from "@/convex/_generated/api";
import { authClient } from "@/lib/auth-client";
import { usePaginatedQuery, useQuery } from "convex/react";
import { useState } from "react";

export const TABS = ["Blogs", "Comments", "Likes", "Bookmark"];

export function useProfile(username: string) {
  const [activeTab, setActiveTab] = useState("Blogs");

  const user = useQuery(api.users.getUserByUsername, { username });

  const { results, status, loadMore } = usePaginatedQuery(
    api.posts.getPostsByAuthor,
    user?.betterAuthId ? { authorId: user.betterAuthId } : "skip",
    { initialNumItems: 6 },
  );

  const { data: session } = authClient.useSession();
  const isOwner = session?.user?.id === user?.betterAuthId;

  const {
    results: resultsComments,
    status: statusComments,
    loadMore: loadmoreComments,
  } = usePaginatedQuery(
    api.comment.getCommentByAuthorId,
    user?.betterAuthId ? { authorId: user.betterAuthId } : "skip",
    { initialNumItems: 6 },
  );

  return {
    activeTab,
    setActiveTab,
    username,
    user,
    results,
    status,
    loadMore,
    isOwner,
    resultsComments,
    statusComments,
    loadmoreComments,
  };
}
