import { buttonVariants } from "@/components/ui/button";
import { ShieldX } from "lucide-react";
import Link from "next/link";

export function EditNoPermission() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-24 space-y-6">
      <div className="relative flex items-center justify-center size-24 rounded-full bg-destructive/10">
        <ShieldX className="size-10 text-destructive/70" />
      </div>
      <div className="max-w-sm space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Access Denied</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          You don&apos;t have permission to edit this profile. Only the profile
          owner can make changes.
        </p>
      </div>
      <Link href="/" className={buttonVariants({ size: "sm" })}>
        Back to Home
      </Link>
    </div>
  );
}
