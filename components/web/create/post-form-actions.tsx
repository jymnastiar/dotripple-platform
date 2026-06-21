"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface PostFormActionsProps {
  isPending: boolean;
  onCancel: () => void;
}

export function PostFormActions({ isPending, onCancel }: PostFormActionsProps) {
  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      <Button
        disabled={isPending}
        form="post-form"
        className="w-full cursor-pointer"
      >
        {isPending ? (
          <>
            <Spinner data-icon="inline-start" />
            <span>Loading...</span>
          </>
        ) : (
          "Create Post"
        )}
      </Button>
      <Button
        type="button"
        className="w-full cursor-pointer"
        variant="outline"
        onClick={onCancel}
      >
        Cancel
      </Button>
    </div>
  );
}
