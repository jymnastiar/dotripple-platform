import { mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";

export const createTask = mutation({
  args: { image: v.optional(v.string()), title: v.string(), body: v.string() },
  handler: async (ctx, args) => {
    //ctx = object for interaction
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError("Not authenticated");
    }

    const blogArticle = await ctx.db.insert("posts", {
      image: args.image,
      title: args.title,
      body: args.body,
      authorId: user._id,
    });
    return blogArticle;
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const user = authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Not authenticated");
    }
    return await ctx.storage.generateUploadUrl();
  },
});
