"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog";
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
import { Button, buttonVariants } from "../../ui/button";
import { Trash2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface BlogCard {
  _id: Id<"posts">;
  title: string;
  body: string;
  tags: string[];
  imageUrl?: string | null;
  isOwner: boolean;
}

export function UserBlogCard(blogs: BlogCard) {
  const deletePost = useMutation(api.posts.deletePost);
  async function handleDeletePosts(blogsId: Id<"posts">) {
    await deletePost({ id: blogsId });
  }
  return (
    <Card key={blogs._id} className="mx-auto lg:gap-2 lg:py-0 w-full max-w-sm">
      <img
        src={blogs.imageUrl || "/images/no-image-available.jpg"}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-80 dark:brightness-60"
      />
      <CardHeader className="h-20 lg:p-3">
        <CardAction>
          <Badge variant="secondary">{blogs.tags[0]}</Badge>
        </CardAction>
        <CardTitle className="truncate">{blogs.title}</CardTitle>
        <CardDescription
          className="line-clamp-2 tiptap-card"
          dangerouslySetInnerHTML={{ __html: blogs.body }}
        ></CardDescription>
      </CardHeader>
      <CardFooter className="lg:p-3 flex gap-2">
        <Link
          className={`flex-1 cursor-pointer ${buttonVariants({ variant: "default" })}`}
          href={`/blog/${blogs._id}`}
        >
          View Blog
        </Link>
        {blogs.isOwner && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon" className="shrink-0">
                <Trash2 className="size-4" />
                <span className="sr-only">Delete Post</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogMedia className="text-destructive dark:text-destructive">
                  <Trash2 />
                </AlertDialogMedia>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your post and remove it from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDeletePosts(blogs._id)}
                  variant="destructive"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardFooter>
    </Card>
  );
}
