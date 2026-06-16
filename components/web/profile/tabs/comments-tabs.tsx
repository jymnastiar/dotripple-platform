import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { dateFormat } from "@/hooks/date-format";
import { ArrowRight, Calendar, CircleOff, FileText } from "lucide-react";
import Link from "next/link";

interface Comments {
  _id: string;
  text: string;
  postId: string;
  _creationTime: number;
  title: string;
}

interface CommentsTabsProps {
  comments: Comments[];
  statusComments: string;
  loadmoreComments: (numItems: number) => void;
}

export default function CommentsTabs({
  comments,
  statusComments,
  loadmoreComments,
}: CommentsTabsProps) {
  return (
    <>
      <section className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {statusComments === "LoadingFirstPage" ? (
          <div>Loading comments...</div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <Card
              key={comment._id}
              size="sm"
              className="group flex flex-col gap-3 p-5 hover:border-border/60 transition-colors duration-200"
            >
              <div className="flex items-start gap-3">
                <div className="size-8 rounded-md bg-muted border border-border flex items-center justify-center shrink-0">
                  <FileText className="size-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground/70 mb-0.5">
                    Commented on
                  </p>
                  <Link
                    href={`/blog/${comment.postId}`}
                    className="text-sm font-medium text-primary hover:opacity-75 truncate block transition-opacity"
                  >
                    {comment.title}
                  </Link>
                </div>
              </div>

              <div className="text-sm leading-relaxed line-clamp-4 text-foreground border-l-2 border-border pl-3">
                {comment.text}
              </div>

              <div className="flex mt-auto items-center gap-2 justify-between">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
                  <Calendar className="size-3.5" />
                  {dateFormat(comment._creationTime)}
                </span>
                <Link
                  href={`/blog/${comment.postId}`}
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:opacity-75 transition-opacity group/link"
                >
                  Go to discussion
                  <ArrowRight className="size-3.5 group-hover/link:translate-x-0.5 transition-transform duration-150" />
                </Link>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 lg:py-32 text-center space-y-6 rounded-3xl lg:rounded-[3rem] border-2 border-dashed border-border px-4">
            <div className="size-20 lg:size-24 rounded-full bg-background flex items-center justify-center relative">
              <CircleOff className="size-8 lg:size-10 text-primary/40" />
            </div>
            <div className="max-w-xs mx-auto">
              <h3 className="text-lg lg:text-xl font-bold italic tracking-tight">
                No Comments
              </h3>
              <p className="text-xs lg:text-sm text-muted-foreground mt-2 leading-relaxed">
                This user hasn&apos;t commented to any blogs yet.
              </p>
            </div>
          </div>
        )}
      </section>
      <div className="flex w-full justify-center items-center">
        <Button
          variant={"link"}
          onClick={() => loadmoreComments(6)}
          disabled={statusComments !== "CanLoadMore"}
        >
          Load More
        </Button>
      </div>
    </>
  );
}
