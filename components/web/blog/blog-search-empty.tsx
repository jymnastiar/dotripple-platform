"use client";

import { Search } from "lucide-react";

interface BlogSearchEmptyProps {
  searchTitle: string;
}

export function BlogSearchEmpty({ searchTitle }: BlogSearchEmptyProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 lg:py-28 text-center space-y-4 px-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-center size-20 rounded-full bg-muted border border-border/60 shadow-xs dark:bg-card/40">
        <Search className="size-8 text-muted-foreground/60" />
      </div>

      <div className="max-w-md mx-auto space-y-2">
        <h3 className="text-xl font-bold tracking-tight">
          No matches found for "{searchTitle}"
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We couldn't find any articles matching your search. Please check your spelling or try using different keywords.
        </p>
      </div>
    </div>
  );
}
