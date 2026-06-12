import { CircleOff } from "lucide-react";
import BlogCardLoading from "../../blog/blog-card-skeleton";
import { UserBlogCard } from "../user-blog-card";

interface Post {
  _id: string;
  title: string;
  tags: string[];
  imageUrl: string | null;
  body: string;
}

interface BlogsTabsProps {
  posts: Post[] | undefined;
}

export default function BlogsTabs(posts: BlogsTabsProps) {
  return (
    <section className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {posts.posts === undefined ? (
        <BlogCardLoading />
      ) : posts.posts.length > 0 ? (
        posts.posts.map((blog) => (
          <UserBlogCard
            _id={blog._id}
            key={blog._id}
            title={blog.title}
            tags={blog.tags}
            imageUrl={blog.imageUrl || ""}
            body={blog.body}
          />
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-16 lg:py-32 text-center space-y-6 rounded-3xl lg:rounded-[3rem] border-2 border-dashed border-border px-4">
          <div className="size-20 lg:size-24 rounded-full bg-background flex items-center justify-center relative">
            <CircleOff className="size-8 lg:size-10 text-primary/40" />
          </div>
          <div className="max-w-xs mx-auto">
            <h3 className="text-lg lg:text-xl font-bold italic tracking-tight">
              No blogs yet
            </h3>
            <p className="text-xs lg:text-sm text-muted-foreground mt-2 leading-relaxed">
              This user hasn&apos;t published any blogs yet.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
