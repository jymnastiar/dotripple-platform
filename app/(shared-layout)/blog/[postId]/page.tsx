import { Metadata } from "next";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import BlogDetailPageClient from "../../../../components/web/postId/blog-detail-client";
import { isAuthenticated } from "@/lib/auth-server";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ postId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { postId } = await params;

  try {
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    const post = await convex.query(api.posts.getPostsById, { postId });

    if (!post) {
      return {
        title: "Post Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    const shortDescription =
      post.body.length > 150 ? `${post.body.slice(0, 150)}...` : post.body;

    return {
      title: post.title,
      description: shortDescription,
      openGraph: {
        title: post.title,
        description: shortDescription,
        images: post.imageUrl ? [{ url: post.imageUrl }] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Post",
      description: "Read the blog post on our site.",
    };
  }
}

export default async function Page({ params }: Props) {
  const { postId } = await params;
  const isLoggedin = await isAuthenticated();

  if (!isLoggedin) {
    return redirect("/auth/login");
  }
  return <BlogDetailPageClient postId={postId} />;
}
