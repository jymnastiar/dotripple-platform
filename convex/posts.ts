import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";

export const createTask = mutation({
  args: {
    image: v.optional(v.string()),
    title: v.string(),
    body: v.string(),
    tags: v.array(v.string()),
  },
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
      tags: args.tags,
      authorId: user._id,
    });
    return blogArticle;
  },
});

export const getPostsByAuthor = query({
  args: { authorId: v.string() },
  handler: async (ctx, args) => {
    const posts = await ctx.db
      .query("posts")
      .withIndex("by_authorId", (q) => q.eq("authorId", args.authorId))
      .order("desc")
      .collect();

    return Promise.all(
      posts.map(async (post) => ({
        ...post,
        imageUrl: post.image ? await ctx.storage.getUrl(post.image) : null,
      })),
    );
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Not authenticated");
    }
    return await ctx.storage.generateUploadUrl();
  },
});

export const getPosts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").order("desc").collect();
    return Promise.all(
      posts.map(async (post) => {
        const author = await ctx.db
          .query("users")
          .withIndex("by_betterAuthId", (q) =>
            q.eq("betterAuthId", post.authorId),
          )
          .unique();
        return {
          ...post,
          imageUrl: post.image ? await ctx.storage.getUrl(post.image) : null,
          username: author?.username ?? "unknown",
          name: author?.name ?? "Unknown User",
        };
      }),
    );
  },
});

export const getPostsById = query({
  args: { postId: v.string() },
  handler: async (ctx, args) => {
    const postId = ctx.db.normalizeId("posts", args.postId);
    if (!postId) return null;
    const post = await ctx.db.get(postId);
    if (!post) return null;
    const imageUrl = post.image
      ? await ctx.storage.getUrl(post.image)
      : "/images/no-image-available.jpg";
    const postAuthor = await ctx.db
      .query("users")
      .withIndex("by_betterAuthId", (q) => q.eq("betterAuthId", post.authorId))
      .unique();
    return {
      ...post,
      imageUrl,
      username: postAuthor?.username ?? "unknown",
      name: postAuthor?.name ?? "Unknown User",
    };
  },
});

export const getRecentPosts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").order("desc").take(3);
    return Promise.all(
      posts.map(async (post) => {
        const user = await ctx.db
          .query("users")
          .withIndex("by_betterAuthId", (q) =>
            q.eq("betterAuthId", post.authorId),
          )
          .unique();

        return {
          ...post,
          imageUrl: post.image
            ? await ctx.storage.getUrl(post.image)
            : "/images/no-image-available.jpg",
          name: user?.name ?? "Unknown User",
        };
      }),
    );
  },
});
