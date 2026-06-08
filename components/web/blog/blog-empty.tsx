import { BookOpen } from "lucide-react";

export function BlogEmpty() {
  return (
    <section className="col-span-full flex flex-col items-center justify-center py-24 lg:py-36 text-center space-y-4  px-6">
      <div className="flex items-center justify-center size-24 rounded-full bg-muted">
        <BookOpen className="size-10 text-primary/50" />
      </div>

      <div className="max-w-sm mx-auto space-y-2">
        <h3 className="text-xl font-bold tracking-tight">
          No articles published yet
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          There are no blog posts on this platform yet. Check back soon — great
          content is on its way.
        </p>
      </div>
    </section>
  );
}
