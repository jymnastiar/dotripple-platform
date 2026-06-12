import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeRecentSkeleton() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <Card
          key={i}
          className="flex flex-col py-0 w-full justify-between overflow-hidden border border-border bg-card/40"
        >
          <CardHeader className="p-0">
            <Skeleton className="relative z-20 aspect-video w-full rounded-none" />
          </CardHeader>

          <CardContent className="pt-6 flex-1 flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-6 w-full mt-1" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>

            <div className="pt-3 border-t border-border/40">
              <Skeleton className="h-3 w-24" />
            </div>
          </CardContent>

          <CardFooter className="pb-6 pt-0 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="size-8 rounded-full" />
              <div className="flex flex-col">
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <Skeleton className="h-8 w-20" />
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
