import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Badge } from "../../ui/badge";
import Link from "next/link";
import { buttonVariants } from "../../ui/button";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { getInitials } from "@/hooks/user-initial";

interface BlogCard {
  _id: string;
  title: string;
  body: string;
  tags: string[];
  imageUrl?: string | null;
  username: string;
  name: string;
}

export function BlogCard(blogs: BlogCard) {
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
      <CardContent className="flex items-center gap-3">
        <Avatar className="size-8">
          <AvatarFallback>{getInitials(blogs.name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col overflow-hidden">
          <span className="text-sm font-semibold truncate">{blogs.name}</span>
          <span className="text-xs text-muted-foreground truncate">
            {blogs.username}
          </span>
        </div>
      </CardContent>
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
