import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { authClient } from "@/lib/auth-client";
import { commentSchema } from "@/app/schemas/comment";

export function useBlogDetail(postId: Id<"posts">) {
  const post = useQuery(api.posts.getPostsById, { postId });
  const comments = useQuery(api.comment.getComment, { postId });
  const getUser = useQuery(api.auth.getCurrentUser);
  const postComment = useMutation(api.comment.createComment);
  const [isPending, startTransition] = useTransition();

  const { data: session } = authClient.useSession();
  const isLoggedIn = !!session?.user;

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      text: "",
    },
  });

  function handlePostComment(data: z.infer<typeof commentSchema>) {
    startTransition(async () => {
      await postComment({ postId, text: data.text });
      form.reset();
    });
  }

  return {
    post,
    comments,
    isLoggedIn,
    getUser,
    isPending,
    form,
    handlePostComment,
  };
}
