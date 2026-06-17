import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp } from "lucide-react";

export function HomeSpotlightLoading() {
  return (
    <section className="w-full flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <TrendingUp className="size-5 text-primary" />
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          Today&apos;s Spotlight
        </h2>
      </div>
      <Card className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden border border-border bg-card/50 p-0 gap-0">
        <Skeleton className="lg:col-span-5 h-[300px] lg:h-[400px] rounded-none" />
        <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-4">
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-3/4 h-8" />
            <Skeleton className="w-full h-16" />
          </div>
          <div className="flex items-center gap-3 pt-4 border-t border-border/60">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-16 h-3" />
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
