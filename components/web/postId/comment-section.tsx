import { CommentForm } from "./comment-form";
import { CommentList } from "./comment-list";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { commentSchema } from "@/app/schemas/comment";

interface CommentItem {
  _id: string;
  name: string;
  _creationTime: number;
  text: string;
}

interface CommentSectionProps {
  comments: CommentItem[] | undefined;
  isLoggedIn: boolean;
  userName?: string;
  form: UseFormReturn<z.infer<typeof commentSchema>>;
  onSubmit: (data: z.infer<typeof commentSchema>) => void;
  isPending: boolean;
}

export function CommentSection({
  comments,
  isLoggedIn,
  userName = "",
  form,
  onSubmit,
  isPending,
}: CommentSectionProps) {
  return (
    <div className="w-full mx-auto px-4 mt-12">
      <div className="flex items-center gap-2 mb-8">
        <MessageSquare className="size-6 text-primary" />
        <h2 className="text-2xl font-bold tracking-tight">
          Comments ({comments?.length ?? 0})
        </h2>
      </div>

      {isLoggedIn ? (
        <CommentForm
          form={form}
          onSubmit={onSubmit}
          isPending={isPending}
          userName={userName}
        />
      ) : (
        <div className="bg-muted/30 border border-border rounded-2xl py-12 sm:py-24 px-6 sm:px-14 text-center mb-12 flex flex-col items-center justify-center">
          <h3 className="text-xl font-bold tracking-tight mb-3">
            Join the conversation
          </h3>
          <p className="text-muted-foreground text-sm max-w-md mb-8 leading-relaxed">
            You need to be logged in to leave a comment. Join our community to
            share your thoughts!
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/auth/login"
              className={buttonVariants({ variant: "default" })}
            >
              Login
            </Link>
            <Link
              href="/auth/sign-up"
              className={buttonVariants({ variant: "outline" })}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}

      <CommentList comments={comments} />
    </div>
  );
}
