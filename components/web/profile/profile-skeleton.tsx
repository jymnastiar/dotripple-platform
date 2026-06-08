import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TABS } from "@/hooks/use-profile";

export function ProfileSkeleton() {
  return (
    <div className="min-h-screen py-12">
      <div className="text-center">
        <Skeleton className="h-10 w-48 mx-auto" />
        <Skeleton className="h-5 w-80 mx-auto mt-4" />
      </div>
      <div className="container max-w-5xl mx-auto px-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 p-4 lg:p-0">
          <aside className="w-full lg:w-80 shrink-0">
            <Card className="border-none overflow-hidden">
              <CardHeader className="flex flex-col items-center text-center pt-8 gap-4">
                <Skeleton className="size-20 lg:size-16 rounded-full" />
                <div className="flex flex-col items-center gap-2 w-full">
                  <Skeleton className="h-7 w-36" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-2 text-center space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5 mx-auto" />
                <Skeleton className="h-3 w-2/3 mx-auto" />
              </CardContent>
              <CardFooter className="justify-center pb-6 pt-2">
                <div className="flex gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="size-9 rounded-full" />
                  ))}
                </div>
              </CardFooter>
            </Card>
          </aside>

          <main className="flex-1 space-y-6">
            <div className="flex gap-2">
              {TABS.map((tab) => (
                <Skeleton key={tab} className="h-9 w-20 rounded-xl" />
              ))}
            </div>
            <Card className="w-full max-w-xs">
              <CardHeader>
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="aspect-video w-full" />
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
