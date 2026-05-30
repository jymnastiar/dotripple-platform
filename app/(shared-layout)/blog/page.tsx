import { BlogCard } from "@/components/web/blog-card";
import BlogCardLoading from "@/components/web/blog-card-loading";
import { Suspense } from "react";

export default function BlogPage() {
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
        <BlogCard />
      </Suspense>

      <option value=""></option>
    </section>
  );
}
