import { internalMutation, query } from "./_generated/server";
import { v } from "convex/values";

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
      throw new Error("Username already taken");
    }
  },
});
