import { Metadata } from "next";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { ProfileClient } from "../../../../components/web/profile/profile-client";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;

  try {
    const user = await convex.query(api.users.getUserByUsername, { username });

    if (!user) {
      return {
        title: "User Not Found",
        description: "The user you are looking for does not exist.",
      };
    }

    return {
      title: `${user.name} (@${user.username})`,
      description:
        user.description || `Check out ${user.name}'s profile and posts.`,
    };
  } catch (error) {
    return {
      title: "Profile",
    };
  }
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  return <ProfileClient username={username} />;
}
