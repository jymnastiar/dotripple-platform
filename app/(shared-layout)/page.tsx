"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import MarqueeFeature from "@/components/web/home/marquee-feature";
import HomeHeroSection from "@/components/web/home/hero";
import HomeRecentSection from "@/components/web/home/recent";

export default function Home() {
  const recentPost = useQuery(api.posts.getRecentPosts);

  return (
    <div className="flex flex-col gap-24 py-12 md:py-20 w-full">
      <HomeHeroSection />

      {/* comingsoon feature */}
      {/* <HomeSpotlightSection /> */}
      <HomeRecentSection recentPost={recentPost} />
      <MarqueeFeature />
    </div>
  );
}
