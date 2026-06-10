import { Skeleton } from "@/components/ui/skeleton";

export function PostIdSkeleton() {
  return (
    <article className="py-12 max-w-5xl mx-auto">
      <div className="w-full mx-auto px-4 mb-8">
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>

      <div className="w-full mx-auto px-4 mb-10">
        <Skeleton className="w-full aspect-video rounded-2xl" />
      </div>

      <div className="w-full mx-auto px-4 space-y-8">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>

        <div className="space-y-3">
          <Skeleton className="h-12 w-3/4 lg:w-2/3" />
          <Skeleton className="h-12 w-1/2 lg:w-1/3" />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-6 border-y border-border">
          <div className="flex items-center gap-3">
            <Skeleton className="size-11 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <div className="sm:ml-auto">
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[98%]" />
          <Skeleton className="h-4 w-[95%]" />
          <Skeleton className="h-4 w-[90%]" />
        </div>
      </div>
    </article>
  );
}
