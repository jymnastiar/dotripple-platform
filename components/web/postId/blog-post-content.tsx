import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, CalendarDays } from "lucide-react";
import Link from "next/link";
import { getInitials } from "@/hooks/user-initial";
import { dateFormat } from "@/hooks/date-format";

interface Post {
  title: string;
  body: string;
  tags: string[];
  imageUrl: string | null;
  name: string;
  username: string;
  _creationTime: number;
}

interface BlogPostContentProps {
  post: Post;
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <>
      <div className="w-full mx-auto px-4 mb-8">
        <Link
          href="/blog"
          className={buttonVariants({
            variant: "ghost",
            className: "gap-2 pl-0 hover:pl-2 transition-all",
          })}
        >
          <ArrowLeft className="size-4" />
          Back to Blog
        </Link>
      </div>

      <div className="w-full mx-auto px-4 mb-10">
        <div className="relative overflow-hidden rounded-2xl aspect-video w-full">
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover brightness-90 dark:brightness-70"
            />
          )}
        </div>
      </div>

      <div className="w-full mx-auto px-4 space-y-8">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-6 border-y border-border">
          <div className="flex items-center gap-3">
            <Avatar className="size-11">
              <AvatarFallback className="text-primary font-bold bg-primary/10 dark:bg-primary/20">
                {getInitials(post.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{post.name}</p>
              <Link
                href={`/profile/${post.username.replace("@", "")}`}
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                {post.username}
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:ml-auto text-xs text-muted-foreground">
            <CalendarDays className="size-3.5" />
            {dateFormat(post._creationTime)}
          </div>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4">
          <p className="text-base leading-8 text-foreground/85">{post.body}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 pt-8 border-t border-border">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}
