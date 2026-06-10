import { FileQuestion } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function PostIdEmpty() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="size-24 rounded-full bg-muted flex items-center justify-center mb-6">
        <FileQuestion className="size-12 text-muted-foreground" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Post Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        The blog post you're looking for doesn't exist, has been removed, or you
        might have a wrong URL.
      </p>
      <Link href="/blog" className={buttonVariants({ variant: "default" })}>
        Return to Blog
      </Link>
    </div>
  );
}
