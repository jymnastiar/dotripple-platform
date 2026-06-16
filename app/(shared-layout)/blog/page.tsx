"use client";

import BlogCardLoading from "@/components/web/blog/blog-card-skeleton";
import { Suspense } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, BookOpen } from "lucide-react";
import { useBlogSearch } from "@/hooks/use-blog-search";
import BlogLogic from "@/components/web/blog/blog-logic";

export default function BlogPage() {
  const { searchBlog, setSearchBlog, debounceTitle } = useBlogSearch();

  return (
    <section className="py-12 md:py-16 flex flex-col gap-12 w-full">
      <div className="relative flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 dark:border-primary/40 bg-primary/5 dark:bg-primary/20 text-primary text-xs font-semibold animate-pulse">
          <BookOpen className="size-3" />
          <span>Discover Articles & Perspectives</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
          The Dot<span className="text-primary">Ripple</span> Blog
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
          Explore thoughts, tutorials, and deep dives from our community. Find
          fresh ideas and spark new waves of conversations.
        </p>
      </div>

      <div className="relative w-full max-w-lg mx-auto">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 text-muted-foreground/60 size-5 pointer-events-none" />
          <Input
            className="pl-11 pr-10 h-11 rounded-full border border-border bg-card/40 hover:bg-card/75 dark:bg-input/20 dark:hover:bg-input/30 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary transition-all text-sm shadow-xs placeholder:text-muted-foreground/60"
            type="text"
            placeholder="Search articles by title..."
            value={searchBlog}
            onChange={(e) => setSearchBlog(e.target.value)}
          />
          {searchBlog && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setSearchBlog("")}
              className="absolute right-2 h-7 w-7 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X className="size-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col gap-8">
        <Suspense
          fallback={
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <BlogCardLoading />
            </div>
          }
        >
          <BlogLogic debounceTitle={debounceTitle} />
        </Suspense>
      </div>
    </section>
  );
}
