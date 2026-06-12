import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getInitials } from "@/hooks/user-initial";
import { TrendingUp } from "lucide-react";
import Link from "next/link";

const FEATURED_POST = {
  id: "feat-1",
  title: "The Rise of Agentic AI: Collaborative Coding in the Modern Era",
  description:
    "Explore the profound shifts in software development as autonomous AI agents move from simple code completion tools to active pair-programming collaborators.",
  body: "AI models are no longer just static autocomplete helpers. Today, agentic systems can research architectures, run tests, debug compile errors, and optimize performance. In this post, we discuss the practical workflows, tools, and cultural shifts needed for developers to master this human-agent collaboration and build high-quality software faster than ever.",
  category: "Technology",
  imageUrl:
    "bg-linear-to-br from-slate-900 to-indigo-950 dark:from-slate-950 dark:to-indigo-900",
  author: "Jymnastiar",
  username: "@jymnastiar",
  date: "June 10, 2026",
  readTime: "6 min read",
  commentsCount: 28,
  likesCount: 142,
};

export default function HomeSpotlightSection() {
  return (
    <section className="w-full flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <TrendingUp className="size-5 text-primary" />
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          Today&apos;s Spotlight
        </h2>
      </div>

      <Card className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden border border-border bg-card/50 hover:bg-card/75 transition-all">
        <div
          className={`lg:col-span-5 min-h-[240px] relative flex flex-col items-center justify-center p-8 text-center text-white ${FEATURED_POST.imageUrl}`}
        >
          <div className="absolute inset-0 bg-black/10 dark:bg-black/30 backdrop-blur-xs pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur">
              {FEATURED_POST.category}
            </span>
            <h3 className="text-xl md:text-2xl font-bold leading-snug px-4">
              {FEATURED_POST.title}
            </h3>
            <p className="text-xs text-indigo-200">
              {FEATURED_POST.date} • {FEATURED_POST.readTime}
            </p>
          </div>
          <div className="absolute size-40 rounded-full border border-white/10 animate-ping opacity-20" />
        </div>

        <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Featured Author</span>
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-500" />
                Trending Ripple
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground hover:text-primary transition-colors cursor-pointer">
              {FEATURED_POST.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {FEATURED_POST.body}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border/60">
            <div className="flex items-center gap-3">
              <Avatar className="size-10 border border-border">
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  {getInitials(FEATURED_POST.author)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">
                  {FEATURED_POST.author}
                </span>
                <span className="text-xs text-muted-foreground">
                  {FEATURED_POST.username}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-none"
                asChild
              >
                <Link href={`/blog/${FEATURED_POST.id}`}>Read Full Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
