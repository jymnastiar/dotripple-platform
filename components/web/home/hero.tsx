import { Button } from "@/components/ui/button";
import { Meteors } from "@/components/ui/meteors";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HomeHeroSection() {
  return (
    <section className="relative w-full rounded-3xl bg-background/40 dark:bg-card/20 py-20 md:py-28 px-6 md:px-12 text-center flex flex-col items-center justify-center overflow-hidden">
      <Meteors />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold animate-pulse">
          <Sparkles className="size-3" />
          <span>Discover the Ripple Effect</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight select-none">
          Unleash Your Thoughts. <br />
          Join the Dot<span className="text-primary">Ripple</span>.
        </h1>

        <p className="text-base sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          A modern workspace where creators, writers, and thinkers publish their
          stories, connect with readers, and spark waves of conversation.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <Button
            size="lg"
            className="w-full sm:w-auto font-semibold px-8 hover:scale-[1.03] active:scale-[0.98] transition-transform"
            asChild
          >
            <Link href="/blog">
              Explore Articles
              <ArrowRight className="size-4 ml-1" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto font-semibold px-8 hover:bg-muted/50 hover:scale-[1.03] active:scale-[0.98] transition-transform"
            asChild
          >
            <Link href="/create">Start Writing</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
