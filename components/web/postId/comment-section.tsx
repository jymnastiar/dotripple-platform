import { CommentForm } from "./comment-form";
import { CommentList } from "./comment-list";
import { MessageSquare } from "lucide-react";
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
  commentCount: number;
  comments: CommentItem[] | undefined;
  status: string;
  loadMore: (numItems: number) => void;
  userName?: string;
  form: UseFormReturn<z.infer<typeof commentSchema>>;
  onSubmit: (data: z.infer<typeof commentSchema>) => void;
  isPending: boolean;
}

export function CommentSection({
  commentCount,
  comments,
  userName = "",
  form,
  onSubmit,
  isPending,
  status,
  loadMore,
}: CommentSectionProps) {
  return (
    <div className="w-full mx-auto px-4 mt-12">
      <div className="flex items-center gap-2 mb-8">
        <MessageSquare className="size-6 text-primary" />
        <h2 className="text-2xl font-bold tracking-tight">
          Comments ({commentCount})
        </h2>
      </div>

      <CommentForm
        form={form}
        onSubmit={onSubmit}
        isPending={isPending}
        userName={userName}
      />

      <CommentList status={status} loadMore={loadMore} comments={comments} />
    </div>
  );
}
