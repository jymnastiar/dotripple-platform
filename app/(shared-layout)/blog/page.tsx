"use client";

import { BlogCard } from "@/components/web/blog/blog-card";
import BlogCardLoading from "@/components/web/blog/blog-card-skeleton";
import { BlogEmpty } from "@/components/web/blog/blog-empty";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Suspense } from "react";

export default function BlogPage() {
  const blogs = useQuery(api.posts.getPosts);
  if (blogs !== undefined && blogs.length === 0) {
    return <BlogEmpty />;
  }
  return (
    <section className="py-12">
      <div className="text-center pb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Our Blog
        </h1>
        <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Explore ideas, stories, and insights written by our community. Fresh
          perspectives on topics that matter.
        </p>
      </div>

      <Suspense fallback={<BlogCardLoading />}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs === undefined ? (
            <BlogCardLoading />
          ) : (
            blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                title={blog.title}
                tags={blog.tags}
                imageUrl={blog.imageUrl || ""}
                body={blog.body}
                username={blog.username}
                name={blog.name}
              />
            ))
          )}
        </div>
      </Suspense>

      <option value=""></option>
    </section>
  );
}
