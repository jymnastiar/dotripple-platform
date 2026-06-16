"use client";

import { useProfile } from "@/hooks/use-profile";
import { ProfileSkeleton } from "@/components/web/profile/profile-skeleton";
import { ProfileEmpty } from "@/components/web/profile/profile-empty";
import { ProfileUserCard } from "@/components/web/profile/profile-user-card";
import { ProfileTabs } from "@/components/web/profile/profile-tabs";
import { ProfileUserContent } from "@/components/web/profile/profile-user-content";

interface ProfileClientProps {
  username: string;
}

export function ProfileClient({ username }: ProfileClientProps) {
  const {
    activeTab,
    setActiveTab,
    user,
    results,
    status,
    loadMore,
    isOwner,
    resultsComments,
    statusComments,
    loadmoreComments,
  } = useProfile(username);

  if (user === undefined) return <ProfileSkeleton />;
  if (user === null) return <ProfileEmpty username={username} />;

  return (
    <div className="min-h-screen py-12">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          User Profile
        </h1>
        {isOwner ? (
          <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
            Welcome back! This is your public profile — manage your posts and
            keep your info up to date.
          </p>
        ) : (
          <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
            Discover who they are — their stories, projects, and everything in
            between.
          </p>
        )}
      </div>

      <div className="container max-w-5xl mx-auto px-4 mt-12 relative z-10">
        <section className="flex flex-col lg:flex-row gap-6 lg:gap-8 p-4 lg:p-0">
          <ProfileUserCard
            name={user.name}
            username={user.username}
            description={user.description}
            email={user.email}
            githubAccount={user.githubAccount}
            twitterAccount={user.twitterAccount}
            instagramAccount={user.instagramAccount}
            linkedinAccount={user.linkedinAccount}
            joinedAt={user._creationTime}
          />

          <main className="flex-1 space-y-6 lg:space-y-8">
            <ProfileTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              isOwner={isOwner}
              username={user.username}
            />
            <ProfileUserContent
              isOwner={isOwner}
              activeTab={activeTab}
              posts={results}
              status={status}
              loadMore={loadMore}
              comments={resultsComments}
              statusComments={statusComments}
              loadmoreComments={loadmoreComments}
            />
          </main>
        </section>
      </div>
    </div>
  );
}
