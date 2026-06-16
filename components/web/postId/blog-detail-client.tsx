"use client";

import { useBlogDetail } from "@/hooks/use-blog-detail";
import { BlogPostContent } from "@/components/web/postId/blog-post-content";
import { CommentSection } from "@/components/web/postId/comment-section";
import { PostIdEmpty } from "./post-id-empty";
import { PostIdSkeleton } from "./post-id-skeleton";

interface BlogDetailPageClientProps {
  postId: string;
}

export default function BlogDetailPageClient({
  postId,
}: BlogDetailPageClientProps) {
  const {
    post,
    results,
    status,
    loadMore,
    getUser,
    isPending,
    form,
    handlePostComment,
  } = useBlogDetail(postId);

  if (post === undefined) return <PostIdSkeleton />;
  if (post === null) return <PostIdEmpty />;

  return (
    <article className="py-12 max-w-5xl mx-auto">
      <BlogPostContent post={post!} />
      <CommentSection
        status={status}
        loadMore={loadMore}
        comments={results}
        userName={getUser?.name}
        form={form}
        onSubmit={handlePostComment}
        isPending={isPending}
      />
    </article>
  );
}
