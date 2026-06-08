"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";

import { useEditProfile } from "@/hooks/use-edit-profile";
import { EditSkeleton } from "@/components/web/edit/edit-skeleton";
import { EditEmpty } from "@/components/web/edit/edit-empty";
import { EditNoPermission } from "@/components/web/edit/edit-no-permission";
import { EditProfilePicture } from "@/components/web/edit/edit-profile-picture";
import { EditBasicInformation } from "@/components/web/edit/edit-basic-information";
import { EditSocialAccounts } from "@/components/web/edit/edit-social-accounts";

export default function EditProfilePage() {
  const { user, isOwner, form, handleEditProfile, isPending, username } =
    useEditProfile();

  if (user === undefined) return <EditSkeleton />;
  if (user === null) return <EditEmpty username={username} />;

  if (!isOwner) return <EditNoPermission />;

  return (
    <form
      onSubmit={form.handleSubmit(handleEditProfile)}
      className="max-w-2xl mx-auto space-y-8 py-12"
    >
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Edit Profile
        </h1>
        <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Update your personal information and how others see you.
        </p>
      </div>

      <div className="grid gap-8 px-4 sm:px-0">
        <EditProfilePicture
          name={user.name}
          profileImage={user.profileImage ?? undefined}
        />

        <EditBasicInformation control={form.control} email={user.email} />

        <EditSocialAccounts control={form.control} />

        <div className="flex flex-col gap-3">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full cursor-pointer"
          >
            {isPending ? (
              <Loader2 className="size-4 mr-2 animate-spin" />
            ) : (
              <Save className="size-4 mr-2" />
            )}
            Save Changes
          </Button>

          <Button
            type="button"
            className="w-full cursor-pointer"
            variant={"outline"}
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
