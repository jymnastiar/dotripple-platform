import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function BlogCardLoading() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="w-full max-w-sm">
          <CardContent>
            <Skeleton className="aspect-video w-full" />
          </CardContent>
          <CardHeader>
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="mt-3 h-8 w-full" />
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
