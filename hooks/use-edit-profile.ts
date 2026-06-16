import socialAccounts from "@/data/social-accounts";
import { api } from "@/convex/_generated/api";
import { authClient } from "@/lib/auth-client";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserSchema } from "@/app/schemas/users";
import { toast } from "sonner";

const socialFieldMap: Record<
  "github" | "x" | "instagram" | "linkedin",
  string
> = {
  github: "githubAccount",
  x: "twitterAccount",
  instagram: "instagramAccount",
  linkedin: "linkedinAccount",
};

function getSocialLink(
  account: string,
  accountType: "github" | "x" | "instagram" | "linkedin",
  action: "update" | "get",
) {
  const link =
    socialAccounts.find((s) => s.name === socialFieldMap[accountType])?.link ??
    "";

  if (account === "") return "";

  if (action === "update") {
    return link + account;
  } else {
    return account.startsWith(link) ? account.replace(link, "") : account;
  }
}

export type EditProfileFormValues = {
  name: string;
  username: string;
  description: string;
  avatarId: string;
  twitterAccount: string;
  instagramAccount: string;
  githubAccount: string;
  linkedinAccount: string;
};

export function useEditProfile() {
  const params = useParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const username = params.username as string;
  const user = useQuery(api.users.getUserByUsername, { username });
  const updateProfile = useMutation(api.users.updateProfile);

  const form = useForm({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: "",
      username: "",
      description: "",
      avatarId: "",
      twitterAccount: "",
      instagramAccount: "",
      githubAccount: "",
      linkedinAccount: "",
    },
    values: user
      ? {
          name: user.name,
          username: user.username,
          description: user.description || "",
          avatarId: user.avatarId || "",
          twitterAccount: getSocialLink(user.twitterAccount || "", "x", "get"),
          instagramAccount: getSocialLink(
            user.instagramAccount || "",
            "instagram",
            "get",
          ),
          githubAccount: getSocialLink(
            user.githubAccount || "",
            "github",
            "get",
          ),
          linkedinAccount: getSocialLink(
            user.linkedinAccount || "",
            "linkedin",
            "get",
          ),
        }
      : undefined,
  });

  const { data: session } = authClient.useSession();
  const isOwner = session?.user?.id === user?.betterAuthId;

  function handleEditProfile(data: z.infer<typeof editUserSchema>) {
    startTransition(async () => {
      try {
        const response = await authClient.updateUser({
          name: data.name,
          username: data.username,
        });

        if (response?.error) {
          throw new Error(
            response.error.message || "Failed to update auth profile",
          );
        }

        await updateProfile({
          name: data.name,
          username: data.username,
          description: data.description || "",
          avatarId: data.avatarId || "",
          twitterAccount:
            getSocialLink(data.twitterAccount, "x", "update") || "",
          instagramAccount:
            getSocialLink(data.instagramAccount, "instagram", "update") || "",
          githubAccount:
            getSocialLink(data.githubAccount, "github", "update") || "",
          linkedinAccount:
            getSocialLink(data.linkedinAccount, "linkedin", "update") || "",
        });

        toast.success("Profile updated successfully");
        router.push(`/profile/${data.username}`);
      } catch (err: any) {
        toast.error("An unexpected error occurred while updating your profile");
      }
    });
  }
  return {
    user,
    isOwner,
    form,
    handleEditProfile,
    isPending,
    username,
  };
}
