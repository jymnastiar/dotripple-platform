import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Loader2 } from "lucide-react";
import { getInitials } from "@/hooks/user-initial";
import { timeAgo } from "@/hooks/date-format";
import { Button } from "@/components/ui/button";
import avatars from "@/data/avatars.json";

interface CommentItem {
  _id: string;
  name: string;
  _creationTime: number;
  text: string;
  avatarId?: string;
}

interface CommentListProps {
  comments: CommentItem[] | undefined;
  status: string;
  loadMore: (numItems: number) => void;
}

export function CommentList({ comments, status, loadMore }: CommentListProps) {
  if (comments === undefined) {
    return (
      <div className="flex justify-center py-8">
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading comments...
        </p>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center bg-muted/20 border border-dashed border-border rounded-xl">
        <MessageSquare className="size-12 text-muted-foreground/30 mb-4" />
        <h3 className="text-lg font-semibold mb-2">No comments yet</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Be the first to share your thoughts on this post!
        </p>
      </div>
    );
  }

  return (
    <>
      <section className="space-y-8">
        {comments.map((comment) => (
          <div key={comment._id} className="flex gap-4">
            <Avatar className="size-10 shrink-0">
              {comment.avatarId && (
                <AvatarImage
                  src={
                    (
                      avatars.find((a) => String(a.id) === comment.avatarId) ??
                      avatars[0]
                    ).src
                  }
                  alt="User avatar"
                />
              )}
              <AvatarFallback className="bg-blue-500/10 text-blue-500 font-semibold">
                {getInitials(comment.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
                <span className="font-semibold text-sm">{comment.name}</span>
                <span className="text-xs text-muted-foreground">
                  {timeAgo(comment._creationTime)}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-foreground/90">
                {comment.text}
              </p>
            </div>
          </div>
        ))}
      </section>
      <div className="flex w-full justify-center items-center">
        <Button
          variant={"link"}
          onClick={() => loadMore(10)}
          disabled={status !== "CanLoadMore"}
        >
          {status === "LoadingMore" ? (
            <>
              <Loader2 className="size-4 mr-2 animate-spin" />
              Loading...
            </>
          ) : (
            "Load More"
          )}
        </Button>
      </div>
    </>
  );
}
