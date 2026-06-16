import { CircleOff } from "lucide-react";
import { motion } from "motion/react";
import BlogsTabs from "./tabs/blogs-tabs";
import CommentsTabs from "./tabs/comments-tabs";
import { Id } from "@/convex/_generated/dataModel";

interface Post {
  _id: Id<"posts">;
  title: string;
  tags: string[];
  imageUrl: string | null;
  body: string;
}

interface Comments {
  _id: string;
  text: string;
  postId: string;
  _creationTime: number;
  title: string;
}

interface ProfileUserContentProps {
  activeTab: string;
  posts: Post[];
  status: string;
  loadMore: (numItems: number) => void;
  statusComments: string;
  loadmoreComments: (numItems: number) => void;
  comments: Comments[];
  isOwner: boolean;
}

export function ProfileUserContent({
  activeTab,
  posts,
  status,
  loadMore,
  comments,
  statusComments,
  loadmoreComments,
  isOwner,
}: ProfileUserContentProps) {
  return (
    <motion.div
      key={activeTab}
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6 lg:space-y-8"
    >
      {activeTab === "Blogs" && (
        <BlogsTabs
          isOwner={isOwner}
          posts={posts}
          status={status}
          loadMore={loadMore}
        />
      )}

      {activeTab === "Comments" && (
        <CommentsTabs
          isOwner={isOwner}
          comments={comments}
          loadmoreComments={loadmoreComments}
          statusComments={statusComments}
        />
      )}

      {activeTab !== "Blogs" && activeTab !== "Comments" && (
        <section className="flex flex-col items-center justify-center py-16 lg:py-32 text-center space-y-6 rounded-3xl lg:rounded-[3rem] border-2 border-dashed border-border px-4">
          <div className="size-20 lg:size-24 rounded-full bg-background flex items-center justify-center relative">
            <CircleOff className="size-8 lg:size-10 text-primary/40" />
          </div>
          <div className="max-w-xs mx-auto">
            <h3 className="text-lg lg:text-xl font-bold italic tracking-tight">
              Coming Soon
            </h3>
            <p className="text-xs lg:text-sm text-muted-foreground mt-2 leading-relaxed">
              The {activeTab} section is currently under development.
            </p>
          </div>
        </section>
      )}
    </motion.div>
  );
}
