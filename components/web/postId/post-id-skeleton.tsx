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
        </div>

        <div className="space-y-3">
          <Skeleton className="h-12 w-3/4 lg:w-2/3" />
        </div>
      </div>
    </article>
  );
}
