import Link from "next/link";
import HomeRecentSkeleton from "./recent-skeleton";
import { api } from "@/convex/_generated/api";
import { BookOpen, ArrowRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { dateFormat } from "@/hooks/date-format";
import { getInitials } from "@/hooks/user-initial";
import { BlogEmpty } from "../blog/blog-empty";

interface HomeRecentSectionProps {
  recentPost: typeof api.posts.getRecentPosts._returnType | undefined;
}

export default function HomeRecentSection({
  recentPost,
}: HomeRecentSectionProps) {
  return (
    <section className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="size-5 text-primary" />
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Recent Ripples
          </h2>
        </div>
        <Link
          href="/blog"
          className={`${buttonVariants({ variant: "ghost", size: "sm" })}flex items-center gap-2 pr-0 hover:pr-2 transition-all`}
        >
          View All
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentPost === undefined ? (
          <HomeRecentSkeleton />
        ) : recentPost !== undefined && recentPost.length === 0 ? (
          <BlogEmpty />
        ) : (
          recentPost?.map((post) => (
            <Card
              key={post._id}
              className="flex flex-col py-0 justify-between overflow-hidden border border-border bg-card/40 hover:bg-card/80 transition-all hover:scale-[1.01]"
            >
              <CardHeader className="p-0">
                <img
                  src={post.imageUrl!}
                  alt="Event cover"
                  className="relative z-20 aspect-video w-full object-cover brightness-80 dark:brightness-60"
                />
              </CardHeader>

              <CardContent className="pt-3 flex-1 flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <CardAction className="flex gap-2 flex-wrap">
                    {post.tags.slice(0, 8).map((item) => (
                      <Badge key={item} variant="secondary" className="w-fit">
                        {item}
                      </Badge>
                    ))}
                  </CardAction>
                  <CardTitle className="text-lg font-bold tracking-tight line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {post.body}
                  </CardDescription>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/40">
                  <span>{dateFormat(post._creationTime)}</span>
                </div>
              </CardContent>

              <CardFooter className="pb-6 pt-0 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Avatar className="size-8 border border-border">
                    <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                      {getInitials(post.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-foreground">
                      {post.name}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/blog/${post._id}`}
                  className={`${buttonVariants({ variant: "secondary", size: "sm" })} text-xs`}
                >
                  Read Post
                </Link>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </section>
  );
}
