"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import MarqueeFeature from "@/components/web/home/marquee-feature";
import HomeHeroSection from "@/components/web/home/hero";
import HomeRecentSection from "@/components/web/home/recent";
import HomeSpotlightSection from "@/components/web/home/spotlight";

export default function Home() {
  const recentPost = useQuery(api.posts.getRecentPosts);
  const trandingPost = useQuery(api.posts.getTrendingPosts);

  return (
    <div className="flex flex-col gap-24 pb-12 md:pb-20 w-full">
      <HomeHeroSection />

      <HomeSpotlightSection trandingPost={trandingPost} />
      <HomeRecentSection recentPost={recentPost} />
      <MarqueeFeature />
    </div>
  );
}
