import { Button } from "@/components/ui/button";
import { DotPattern } from "@/components/ui/dot-pattern";
import { PenTool } from "lucide-react";
import Link from "next/link";

export default function HomeCTASection() {
  return (
    <section className="relative w-full rounded-3xl border border-border bg-linear-to-r from-primary/10 via-indigo-900/5 to-sky-500/10 dark:from-primary/20 dark:via-indigo-950/10 dark:to-sky-500/10 py-16 px-6 md:px-12 flex flex-col items-center text-center justify-center overflow-hidden">
      <DotPattern
        glow={false}
        className="opacity-20 text-muted-foreground mask-[radial-gradient(ellipse_at_center,black,transparent)]"
      />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Start Your Own Ripple Effect
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Every thought has the potential to spark change. Join thousands of
          creators, publish your first post, and let your voice ripple through
          the community.
        </p>
        <div className="mt-4">
          <Button
            size="lg"
            className="font-semibold shadow-md px-8 hover:scale-[1.03] active:scale-[0.98] transition-transform"
            asChild
          >
            <Link href="/create">
              <PenTool className="size-4 mr-2" />
              Write Your First Post
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
