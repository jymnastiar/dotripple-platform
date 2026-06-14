"use client";

import { BlogCard } from "@/components/web/blog/blog-card";
import BlogCardLoading from "@/components/web/blog/blog-card-skeleton";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function AllBlogs() {
  const blogs = useQuery(api.posts.getPosts);
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogs === undefined ? (
        <BlogCardLoading />
      ) : (
        blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            {...blog}
            imageUrl={blog.imageUrl || ""}
          />
        ))
      )}
    </div>
  );
}
