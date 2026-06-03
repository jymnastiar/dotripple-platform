"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CircleOff, Edit, Mail } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { authClient } from "@/lib/auth-client";
import { BlogCard } from "@/components/web/blog-card";
import BlogCardLoading from "@/components/web/blog-card-loading";
import { getInitials } from "@/hooks/user-initial";

const TABS = ["Blogs", "Projects", "Likes", "Bookmark"];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Blogs");
  const params = useParams();
  const username = params.username as string;

  const user = useQuery(api.users.getUserByUsername, { username: username });
  const posts = useQuery(
    api.posts.getPostsByAuthor,
    user?.betterAuthId ? { authorId: user.betterAuthId } : "skip",
  );
  const { data: session } = authClient.useSession();

  const isOwner = session?.user?.id === user?.betterAuthId;

  if (user === undefined) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (user === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-2xl font-bold">User not found</h2>
        <p className="text-muted-foreground">
          The user "{username}" does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar / Profile Info */}
      <aside className="w-full lg:w-80 shrink-0 space-y-6">
        <Card className="border-none shadow-2xl bg-background/50 backdrop-blur-2xl ring-1 ring-white/10 overflow-hidden">
          <CardContent className="pt-8">
            <div className="flex flex-col items-center text-center">
              <Avatar>
                <AvatarFallback className="text-primary font-semibold dark:bg-primary dark:text-foreground">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>

              <div className="mt-6 flex flex-col items-center gap-1">
                <h1 className="text-3xl font-bold tracking-tight bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {user.name}
                </h1>
                <p className="text-muted-foreground font-medium">
                  @{user.username}
                </p>
              </div>

              <div className="w-full space-y-3.5 mt-8 p-4 rounded-2xl bg-muted/30 border border-border/50 text-left">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="size-4 text-primary/70 shrink-0" />
                  <span>{user.email}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </aside>

      {/* Main Content */}
      <main className="flex-1 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex gap-5">
          <div className="p-1.5 flex-1 bg-background/40 backdrop-blur-3xl rounded-2xl border border-white/10 shadow-2xl inline-flex justify-between w-full md:w-auto">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  relative flex-1 md:flex-none px-8 py-2.5 text-sm font-bold transition-all rounded-xl
                  ${activeTab === tab ? "text-primary-foreground" : "text-muted-foreground/80 hover:text-foreground hover:bg-white/5"}
                `}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary shadow-lg shadow-primary/30 rounded-xl"
                    transition={{
                      type: "spring",
                      bounce: 0.25,
                      duration: 0.5,
                    }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
          {isOwner && (
            <Button
              variant="outline"
              size="sm"
              className="ml-auto bg-background/20 backdrop-blur-md border-white/10 text-white hover:bg-white/20"
            >
              <Edit className="size-4 mr-2" /> Edit Profile
            </Button>
          )}
        </div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="space-y-8"
        >
          {activeTab === "Blogs" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts === undefined ? (
                <BlogCardLoading />
              ) : posts.length > 0 ? (
                posts.map((post) => (
                  <BlogCard
                    key={post._id}
                    title={post.title}
                    tags={post.tags}
                    imageUrl={post.imageUrl || ""}
                    body={post.body}
                  />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-32 text-center space-y-6 bg-muted/20 rounded-[3rem] border border-dashed border-border/50">
                  <div className="size-24 rounded-full bg-background shadow-xl flex items-center justify-center relative">
                    <CircleOff className="size-10 text-primary/40" />
                  </div>
                  <div className="max-w-xs mx-auto">
                    <h3 className="text-xl font-bold italic tracking-tight">
                      No blogs yet
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      This user hasn't published any blogs yet.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab !== "Blogs" && (
            <div className="flex flex-col items-center justify-center py-32 text-center space-y-6 bg-muted/20 rounded-[3rem] border border-dashed border-border/50">
              <div className="size-24 rounded-full bg-background shadow-xl flex items-center justify-center relative">
                <CircleOff className="size-10 text-primary/40" />
              </div>
              <div className="max-w-xs mx-auto">
                <h3 className="text-xl font-bold italic tracking-tight">
                  Coming Soon
                </h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  The {activeTab} section is currently under development.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
