"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import MarqueeFeature from "@/components/web/home/marquee-feature";
import HomeHeroSection from "@/components/web/home/hero";
import HomeRecentSection from "@/components/web/home/recent";
import HomeSpotlightSection from "@/components/web/home/spotlight";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getInitials } from "@/hooks/user-initial";
import { Trophy, Zap } from "lucide-react";

const DUMMY_CREATORS = [
  {
    name: "Aria Sterling",
    username: "aria_writes",
    storiesCount: 45,
    ripplesCount: "8.9k",
    bio: "Tech optimist & indie builder writing about the future of AI and web development.",
    badge: "Top Contributor",
  },
  {
    name: "Devon Miller",
    username: "devon_codes",
    storiesCount: 32,
    ripplesCount: "5.4k",
    bio: "Next.js enthusiast & UI/UX designer. Making complex code feel simple and beautiful.",
    badge: "Rising Star",
  },
  {
    name: "Elena Rostova",
    username: "elena_dev",
    storiesCount: 28,
    ripplesCount: "6.2k",
    bio: "Backend architect and serverless explorer. Sharing lessons on database scaling.",
    badge: "Tech Guru",
  },
];

export default function Home() {
  const recentPost = useQuery(api.posts.getRecentPosts);
  const trandingPost = useQuery(api.posts.getTrendingPosts);

  return (
    <div className="flex flex-col gap-24 pb-12 md:pb-20 w-full">
      <HomeHeroSection />

      <HomeSpotlightSection trandingPost={trandingPost} />

      {/* Cooming soon feature */}
      {/* <section className="w-full flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <Trophy className="size-4 animate-bounce" />
            <span>COMMUNITY LEADERS</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Featured Creators
          </h2>
          <p className="text-sm text-muted-foreground">
            Meet the most active minds shaping the conversations and ripples on
            DotRipple.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DUMMY_CREATORS.map((creator, index) => (
            <Card
              key={index}
              className="border border-border/60 bg-card/40 hover:bg-card/80 transition-all duration-300 hover:shadow-lg group flex flex-col justify-between"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                <Avatar className="size-12 border border-border group-hover:scale-105 transition-transform duration-300">
                  <AvatarFallback className="bg-primary/10 text-primary font-extrabold text-sm">
                    {getInitials(creator.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground text-base group-hover:text-primary transition-colors">
                      {creator.name}
                    </span>
                    <Badge
                      variant="secondary"
                      className="text-[10px] py-0 px-2 font-semibold"
                    >
                      {creator.badge}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    @{creator.username}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {creator.bio}
                </p>
                <div className="flex items-center justify-between border-t border-border/40 pt-4 text-xs">
                  <div className="flex flex-col">
                    <span className="font-extrabold text-foreground text-sm">
                      {creator.storiesCount}
                    </span>
                    <span className="text-muted-foreground text-[11px]">
                      Stories Published
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-extrabold text-foreground text-sm flex items-center gap-1">
                      <Zap className="size-3 text-amber-500 fill-amber-500" />
                      {creator.ripplesCount}
                    </span>
                    <span className="text-muted-foreground text-[11px]">
                      Ripples Earned
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section> */}

      <HomeRecentSection recentPost={recentPost} />

      <MarqueeFeature />
    </div>
  );
}
