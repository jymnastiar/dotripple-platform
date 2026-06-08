import { buttonVariants } from "@/components/ui/button";
import { UserX } from "lucide-react";
import Link from "next/link";

interface ProfileEmptyProps {
  username: string;
}

export function ProfileEmpty({ username }: ProfileEmptyProps) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-24 space-y-6">
      <div className="relative flex items-center justify-center size-24 rounded-full bg-muted">
        <UserX className="size-10 text-primary/50" />
      </div>
      <div className="max-w-sm space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">User not found</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The user{" "}
          <span className="font-semibold text-foreground">@{username}</span>{" "}
          doesn&apos;t exist or may have been removed.
        </p>
      </div>
      <Link href="/" className={buttonVariants({ size: "sm" })}>
        Back to Home
      </Link>
    </div>
  );
}
