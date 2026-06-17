import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export function HomeSpotlightEmpty() {
  return (
    <section className="w-full flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <TrendingUp className="size-5 text-primary" />
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          Today&apos;s Spotlight
        </h2>
      </div>
      <Card className="flex flex-col items-center justify-center py-16 text-center border-dashed bg-card/50">
        <TrendingUp className="size-10 text-muted-foreground mb-4 opacity-20" />
        <h3 className="text-lg font-semibold text-foreground">
          No Trending Posts Yet
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Be the first to create a ripple!
        </p>
      </Card>
    </section>
  );
}
