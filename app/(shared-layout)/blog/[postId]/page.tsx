"use client";

import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { PostIdSkeleton } from "@/components/web/postId/post-id-skeleton";
import { PostIdEmpty } from "@/components/web/postId/post-id-empty";
import { useBlogDetail } from "@/hooks/use-blog-detail";
import { BlogPostContent } from "@/components/web/postId/blog-post-content";
import { CommentSection } from "@/components/web/postId/comment-section";

export default function BlogDetailPage() {
  const params = useParams();
  const postId = params.postId as Id<"posts">;

  const {
    post,
    comments,
    isLoggedIn,
    getUser,
    isPending,
    form,
    handlePostComment,
  } = useBlogDetail(postId);

  if (post === undefined) return <PostIdSkeleton />;
  if (!post) return <PostIdEmpty />;

  return (
    <article className="py-12 max-w-5xl mx-auto">
      <BlogPostContent post={post} />
      <CommentSection
        comments={comments}
        isLoggedIn={isLoggedIn}
        userName={getUser?.name}
        form={form}
        onSubmit={handlePostComment}
        isPending={isPending}
      />
    </article>
  );
}
