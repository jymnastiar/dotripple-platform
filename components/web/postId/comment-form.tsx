import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Controller, UseFormReturn } from "react-hook-form";
import { Field, FieldError } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { getInitials } from "@/hooks/user-initial";
import { z } from "zod";
import { commentSchema } from "@/app/schemas/comment";
import avatars from "@/data/avatars.json";

interface CommentFormProps {
  form: UseFormReturn<z.infer<typeof commentSchema>>;
  onSubmit: (data: z.infer<typeof commentSchema>) => void;
  isPending: boolean;
  userName: string;
  avatarId: string | undefined;
}

export function CommentForm({
  form,
  onSubmit,
  isPending,
  userName,
  avatarId,
}: CommentFormProps) {
  return (
    <div className="flex gap-4 mb-10">
      <Avatar className="size-10 shrink-0">
        {avatarId && (
          <AvatarImage
            src={
              (avatars.find((a) => String(a.id) === avatarId) ?? avatars[0]).src
            }
            alt={`${userName}'s avatar`}
          />
        )}
        <AvatarFallback className="text-primary font-semibold dark:bg-primary dark:text-foreground">
          {getInitials(userName || "")}
        </AvatarFallback>
      </Avatar>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-4">
        <Controller
          name="text"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <Textarea
                placeholder="What are your thoughts?"
                className="min-h-[100px] resize-y bg-muted/50 border-border focus-visible:ring-primary"
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.error && (
                <FieldError
                  errors={[{ message: "etleast 1 character for comment" }]}
                />
              )}
            </Field>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Spinner data-icon="inline-start" />
                <span>Loading...</span>
              </>
            ) : (
              "Post Comment"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
