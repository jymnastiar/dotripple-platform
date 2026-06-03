"use client";

import { BlogCard } from "@/components/web/blog-card";
import BlogCardLoading from "@/components/web/blog-card-loading";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { useQuery } from "convex/react";
import { Suspense } from "react";

export default function BlogPage() {
  const blogs = useQuery(api.posts.getPosts);
  return (
    <section className="py-12">
      <div className="text-center pb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Our Blog
        </h1>
        <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae,
          iste.
        </p>
      </div>

      <Suspense fallback={<BlogCardLoading />}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs === undefined ? (
            <BlogCardLoading />
          ) : blogs.length > 0 ? (
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
          ) : (
            <h1>No blog here</h1>
          )}
        </div>
      </Suspense>

      <option value=""></option>
    </section>
  );
}
