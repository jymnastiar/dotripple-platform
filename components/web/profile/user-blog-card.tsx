import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Badge } from "../../ui/badge";
import Link from "next/link";
import { buttonVariants } from "../../ui/button";

interface BlogCard {
  _id: string;
  title: string;
  body: string;
  tags: string[];
  imageUrl?: string | null;
}

export function UserBlogCard(blogs: BlogCard) {
  return (
    <Card key={blogs._id} className="mx-auto w-full max-w-sm">
      <img
        src={blogs.imageUrl || "/images/no-image-available.jpg"}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-80 dark:brightness-60"
      />
      <CardHeader className="h-20">
        <CardAction>
          <Badge variant="secondary">{blogs.tags[0]}</Badge>
        </CardAction>
        <CardTitle className="truncate">{blogs.title}</CardTitle>
        <CardDescription className="line-clamp-2">{blogs.body}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Link
          className={`w-full cursor-pointer${buttonVariants()}`}
          href={`/blog/${blogs._id}`}
        >
          View Blog
        </Link>
      </CardFooter>
    </Card>
  );
}
