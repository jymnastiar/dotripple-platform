import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";
import { Id } from "./_generated/dataModel";
import { paginationOptsValidator } from "convex/server";

export const createComment = mutation({
  args: {
    postId: v.id("posts"),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    const post = await ctx.db.get(args.postId as Id<"posts">);

    if (!post) {
      throw new ConvexError("Post not found");
    }

    if (!user) {
      throw new ConvexError("Not authenticated");
    }

    const comment = await ctx.db.insert("comment", {
      postId: args.postId,
      text: args.text,
      authorId: user._id,
    });
    return comment;
  },
});

export const getComment = query({
  args: { postId: v.string(), paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const postId = ctx.db.normalizeId("posts", args.postId);
    if (!postId) return { page: [], isDone: true, continueCursor: "" };
    const comments = await ctx.db
      .query("comment")
      .withIndex("by_postId", (q) => q.eq("postId", postId))
      .order("desc")
      .paginate(args.paginationOpts);

    const enrichedComments = await Promise.all(
      comments.page.map(async (comment) => {
        const author = await ctx.db
          .query("users")
          .withIndex("by_betterAuthId", (q) =>
            q.eq("betterAuthId", comment.authorId),
          )
          .unique();
        return {
          ...comment,
          name: author?.name ?? "Unknown User",
        };
      }),
    );

    return {
      ...comments,
      page: enrichedComments,
    };
  },
});

export const getCommentByAuthorId = query({
  args: { authorId: v.string(), paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comment")
      .withIndex("by_authorId", (q) => q.eq("authorId", args.authorId))
      .order("desc")
      .paginate(args.paginationOpts);

    const enrichedComments = await Promise.all(
      comments.page.map(async (comment) => {
        const post = await ctx.db.get(comment.postId as Id<"posts">);
        return {
          ...comment,
          title: post?.title ?? "Deleted Post/Unknown",
        };
      }),
    );

    return {
      ...comments,
      page: enrichedComments,
    };
  },
});
