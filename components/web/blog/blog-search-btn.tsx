"use client";

import { BlogCard } from "@/components/web/blog/blog-card";
import BlogCardLoading from "@/components/web/blog/blog-card-skeleton";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { BlogSearchEmpty } from "./blog-search-empty";

interface BlogsSearchProps {
  searchTitle: string;
}

export default function BlogsSearch({ searchTitle }: BlogsSearchProps) {
  const blogs = useQuery(api.posts.searchPosts, { title: searchTitle });
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogs === undefined ? (
        <BlogCardLoading />
      ) : blogs.length !== 0 ? (
        blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            {...blog}
            imageUrl={blog.imageUrl || ""}
          />
        ))
      ) : (
        <BlogSearchEmpty searchTitle={searchTitle} />
      )}
    </div>
  );
}
