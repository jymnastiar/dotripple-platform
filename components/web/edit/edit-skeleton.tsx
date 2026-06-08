import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function EditSkeleton() {
  return (
    <div className="max-w-2xl mx-auto space-y-8 py-12 px-4 sm:px-0">
      <div className="text-center space-y-4">
        <Skeleton className="h-10 w-56 mx-auto" />
        <Skeleton className="h-5 w-80 mx-auto" />
      </div>

      <div className="grid gap-8">
        <Card>
          <CardHeader className="space-y-1">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-56" />
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center gap-8">
            <Skeleton className="size-24 rounded-full shrink-0" />
            <div className="flex flex-col gap-3 w-full sm:w-auto">
              <div className="flex gap-2 justify-center sm:justify-start">
                <Skeleton className="h-9 w-28 rounded-md" />
                <Skeleton className="h-9 w-20 rounded-md" />
              </div>
              <Skeleton className="h-3 w-44 mx-auto sm:mx-0" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-44" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-9 w-full rounded-md" />
              <Skeleton className="h-3 w-72" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
