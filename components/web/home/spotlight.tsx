import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { getInitials } from "@/hooks/user-initial";
import { MessageSquare, TrendingUp } from "lucide-react";
import Link from "next/link";
import { dateFormat } from "@/hooks/date-format";
import { HomeSpotlightLoading } from "./spotlight-loading";
import { HomeSpotlightEmpty } from "./spotlight-empty";
import avatars from "@/data/avatars.json";

interface HomeSpotlightSectionProps {
  trandingPost: typeof api.posts.getTrendingPosts._returnType | undefined;
}

export default function HomeSpotlightSection({
  trandingPost,
}: HomeSpotlightSectionProps) {
  if (trandingPost === undefined) return <HomeSpotlightLoading />;
  if (trandingPost === null) return <HomeSpotlightEmpty />;

  return (
    <section className="w-full flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <TrendingUp className="size-5 text-primary" />
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          Today&apos;s Spotlight
        </h2>
      </div>

      <Card className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden border border-border bg-card/50 hover:bg-card/75 transition-all p-0 gap-0 min-h-80">
        <div className="lg:col-span-5 h-full min-h-[300px] lg:min-h-full relative flex flex-col items-center justify-center p-8 text-center text-white bg-linear-to-br from-slate-900 to-indigo-950 dark:from-slate-950 dark:to-indigo-900">
          <img
            src={trandingPost.imageUrl || "/images/no-image-available.jpg"}
            alt={trandingPost.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-[2px] pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center gap-4 drop-shadow-md">
            {trandingPost.tags?.[0] && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/30 border border-white/20 text-white backdrop-blur-md">
                {trandingPost.tags[0]}
              </span>
            )}
            <h3 className="text-xl md:text-2xl font-bold leading-snug px-4 text-white">
              {trandingPost.title}
            </h3>
            <div className="flex items-center gap-3 text-white/90">
              <span className="text-xs text-indigo-100 font-medium drop-shadow">
                {dateFormat(trandingPost._creationTime)}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Featured Author</span>
              <span className="flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
                </span>
                Trending Ripple
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground hover:text-primary transition-colors cursor-pointer">
              {trandingPost.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-5">
              {trandingPost.body}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border/60">
            <div className="flex items-center gap-3">
              <Avatar className="size-10 border border-border">
                {trandingPost.avatarId && (
                  <AvatarImage
                    src={
                      (
                        avatars.find(
                          (a) => String(a.id) === trandingPost.avatarId,
                        ) ?? avatars[0]
                      ).src
                    }
                    alt="User avatar"
                  />
                )}
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  {getInitials(trandingPost.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">
                  {trandingPost.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  @{trandingPost.username}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MessageSquare className="size-4" />
                <span className="font-semibold text-foreground">
                  {trandingPost.commentCount ?? 0}
                </span>
                comments
              </span>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-none"
                asChild
              >
                <Link href={`/blog/${trandingPost._id}`}>Read Full Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
