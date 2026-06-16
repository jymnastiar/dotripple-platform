import { internalMutation, mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";

export const getUserByUsername = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .unique();

    return user;
  },
});

export const getUserByBetterAuthId = query({
  args: { betterAuthId: v.string() },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_betterAuthId", (q) =>
        q.eq("betterAuthId", args.betterAuthId),
      )
      .unique();
    return existingUser;
  },
});

export const getCurrentUserWithProfile = query({
  args: {},
  handler: async (ctx) => {
    try {
      const authUser = await authComponent.getAuthUser(ctx);
      if (!authUser) return null;

      const profile = await ctx.db
        .query("users")
        .withIndex("by_betterAuthId", (q) => q.eq("betterAuthId", authUser._id))
        .unique();

      return profile;
    } catch {
      return null;
    }
  },
});

export const storeUser = internalMutation({
  args: {
    name: v.string(),
    email: v.string(),
    username: v.string(),
    betterAuthId: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_betterAuthId", (q) =>
        q.eq("betterAuthId", args.betterAuthId),
      )
      .unique();

    if (!existingUser) {
      await ctx.db.insert("users", args);
    } else {
      // Sync the data if user already exists
      await ctx.db.patch(existingUser._id, {
        name: args.name,
        username: args.username,
        email: args.email,
      });
    }
  },
});

export const updateProfile = mutation({
  args: {
    name: v.optional(v.string()),
    username: v.optional(v.string()),
    description: v.optional(v.string()),
    avatarId: v.optional(v.string()),
    twitterAccount: v.optional(v.string()),
    instagramAccount: v.optional(v.string()),
    githubAccount: v.optional(v.string()),
    linkedinAccount: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    //todo return user login data betterAuth
    if (!user) {
      throw new ConvexError("Not authenticated");
    }

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_betterAuthId", (q) => q.eq("betterAuthId", user._id))
      .unique();
    //todo return object user data

    if (!existingUser) {
      throw new ConvexError("User not found");
    }

    // Check if the new username is already taken by someone else
    if (args.username && args.username !== existingUser.username) {
      const usernameTaken = await ctx.db
        .query("users")
        .withIndex("by_username", (q) => q.eq("username", args.username!))
        .unique();

      if (usernameTaken) {
        throw new ConvexError("Username is already taken");
      }
    }

    await ctx.db.patch(existingUser._id, args);

    return { success: true };
  },
});
