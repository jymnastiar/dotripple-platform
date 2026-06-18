import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, usePaginatedQuery, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { commentSchema } from "@/app/schemas/comment";

export function useBlogDetail(postId: string) {
  const post = useQuery(api.posts.getPostsById, { postId });
  const { results, status, loadMore } = usePaginatedQuery(
    api.comment.getComment,
    { postId },
    { initialNumItems: 10 },
  );
  const getUser = useQuery(api.auth.getCurrentUser);
  const getUserInfo = useQuery(
    api.users.getUserByBetterAuthId,
    getUser?._id ? { betterAuthId: getUser._id } : "skip",
  );
  const postComment = useMutation(api.comment.createComment);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      text: "",
    },
  });

  function handlePostComment(data: z.infer<typeof commentSchema>) {
    startTransition(async () => {
      await postComment({ postId: postId as Id<"posts">, text: data.text });
      form.reset();
    });
  }

  return {
    post,
    results,
    status,
    loadMore,
    getUser,
    getUserInfo,
    isPending,
    form,
    handlePostComment,
  };
}
