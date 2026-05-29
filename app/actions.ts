"use server";

import { z } from "zod";
import { postSchema } from "./schemas/blog";
import { api } from "@/convex/_generated/api";
import { fetchAuthMutation } from "@/lib/auth-server";
import { revalidatePath } from "next/cache";

export async function createBlogAction(data: z.infer<typeof postSchema>) {
  const parsed = postSchema.safeParse(data); //? zod methode

  if (!parsed.success) {
    return { success: false, error: "Invalid data" };
  }
  try {
    await fetchAuthMutation(api.posts.createTask, {
      title: parsed.data.title,
      body: parsed.data.content,
    });
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    if (error.message?.includes("Not authenticated")) {
      return {
        success: false,
        error: "You must be logged in to create a post",
      };
    }
    return {
      success: false,
      error: "Failed to create post. Please try again.",
    };
  }
}
