import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export async function BlogCard() {
  const data = await fetchQuery(api.posts.getPosts);
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data?.map((post) => {
        return (
          <Card key={post._id} className="mx-auto w-full max-w-sm">
            <img
              src={post.imageUrl || "/images/no-image-available.jpg"}
              alt="Event cover"
              className="relative z-20 aspect-video w-full object-cover brightness-80 dark:brightness-60"
            />
            <CardHeader className="h-20">
              <CardAction>
                <Badge variant="secondary">{post.tags[0]}</Badge>
              </CardAction>
              <CardTitle className="truncate">{post.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {post.body}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link
                className={`w-full cursor-pointer${buttonVariants()}`}
                href={`/blog/${post._id}`}
              >
                View Blog
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
