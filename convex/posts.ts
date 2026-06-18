import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";
import { paginationOptsValidator } from "convex/server";

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
      commentCount: 0,
    });
    return blogArticle;
  },
});

export const getPostsByAuthor = query({
  args: { authorId: v.string(), paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const results = await ctx.db
      .query("posts")
      .withIndex("by_authorId", (q) => q.eq("authorId", args.authorId))
      .order("desc")
      .paginate(args.paginationOpts);

    const enrichedPage = await Promise.all(
      results.page.map(async (post) => ({
        ...post,
        imageUrl: post.image ? await ctx.storage.getUrl(post.image) : null,
      })),
    );

    return {
      ...results,
      page: enrichedPage,
    };
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
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("posts")
      .order("desc")
      .paginate(args.paginationOpts);

    const uniqueAuthorIds = Array.from(
      new Set(result.page.map((p) => p.authorId)),
    );

    const usersArray = await Promise.all(
      uniqueAuthorIds.map(async (authorId) => {
        const user = await ctx.db
          .query("users")
          .withIndex("by_betterAuthId", (q) => q.eq("betterAuthId", authorId))
          .unique();
        return { authorId, user };
      }),
    );

    const userMap = new Map(usersArray.map((u) => [u.authorId, u.user]));

    const enrichedPage = await Promise.all(
      result.page.map(async (post) => {
        const author = userMap.get(post.authorId);
        return {
          ...post,
          imageUrl: post.image ? await ctx.storage.getUrl(post.image) : null,
          username: author?.username ?? "unknown",
          name: author?.name ?? "Unknown User",
          avatarId: author?.avatarId ?? undefined,
        };
      }),
    );

    return {
      ...result,
      page: enrichedPage,
    };
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
      avatarId: postAuthor?.avatarId ?? undefined,
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
          avatarId: user?.avatarId ?? undefined,
        };
      }),
    );
  },
});

export const getTrendingPosts = query({
  args: {},
  handler: async (ctx) => {
    const post = await ctx.db
      .query("posts")
      .withIndex("by_commmentCount")
      .order("desc")
      .first();

    if (!post) {
      return null;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_betterAuthId", (q) => q.eq("betterAuthId", post.authorId))
      .unique();

    return {
      ...post,
      imageUrl: post.image ? await ctx.storage.getUrl(post.image) : null,
      username: user?.username ?? "unknown",
      name: user?.name ?? "Unknown User",
      avatarId: user?.avatarId ?? undefined,
    };
  },
});

export const searchPosts = query({
  args: { title: v.string(), paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("posts")
      .withSearchIndex("search_title", (q) => q.search("title", args.title))
      .paginate(args.paginationOpts);

    const uniqueAuthorIds = Array.from(
      new Set(result.page.map((p) => p.authorId)),
    );

    const usersArray = await Promise.all(
      uniqueAuthorIds.map(async (authorId) => {
        const user = await ctx.db
          .query("users")
          .withIndex("by_betterAuthId", (q) => q.eq("betterAuthId", authorId))
          .unique();
        return { authorId, user };
      }),
    );

    const userMap = new Map(usersArray.map((u) => [u.authorId, u.user]));

    const enrichedPage = await Promise.all(
      result.page.map(async (post) => {
        const author = userMap.get(post.authorId);
        return {
          ...post,
          imageUrl: post.image ? await ctx.storage.getUrl(post.image) : null,
          username: author?.username ?? "unknown",
          name: author?.name ?? "Unknown User",
          avatarId: author?.avatarId ?? undefined,
        };
      }),
    );

    return {
      ...result,
      page: enrichedPage,
    };
  },
});

export const deletePost = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Not authenticated");
    }

    const post = await ctx.db.get(args.id);
    if (!post) {
      throw new ConvexError("Post not found");
    }
    if (post.authorId !== user._id) {
      throw new ConvexError("Not authorized to delete this post");
    }

    // delete image
    if (post.image) {
      await ctx.storage.delete(post.image);
    }

    // delete associated comments
    const comments = await ctx.db
      .query("comment")
      .withIndex("by_postId", (q) => q.eq("postId", args.id))
      .collect();

    for (const comment of comments) {
      await ctx.db.delete(comment._id);
    }

    await ctx.db.delete(args.id);
    return { success: true };
  },
});
