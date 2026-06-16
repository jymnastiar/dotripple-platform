import { useBlogLogic } from "@/hooks/use-blog-logic";
import BlogCardLoading from "./blog-card-skeleton";
import { BlogCard } from "./blog-card";
import { BlogSearchEmpty } from "./blog-search-empty";
import { Button } from "@/components/ui/button";

interface BlogsLogicProps {
  debounceTitle: string;
}

export default function BlogLogic({ debounceTitle }: BlogsLogicProps) {
  const { blogs, activeStatus, activeLoadMore, isLoading, pageNum } =
    useBlogLogic(debounceTitle);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <BlogCardLoading />
        ) : blogs.length !== 0 ? (
          blogs.map((blog) => (
            <BlogCard key={blog._id} {...blog} imageUrl={blog.imageUrl || ""} />
          ))
        ) : (
          <BlogSearchEmpty searchTitle={debounceTitle} />
        )}
      </div>
      <div className="flex w-full justify-center items-center">
        <Button
          className="w-full max-w-sm"
          variant={"outline"}
          onClick={() => activeLoadMore(pageNum)}
          disabled={activeStatus !== "CanLoadMore"}
        >
          Load More
        </Button>
      </div>
    </>
  );
}
