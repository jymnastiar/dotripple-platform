import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    image: v.optional(v.string()),
    title: v.string(),
    body: v.string(),
    tags: v.array(v.string()),
    authorId: v.string(),
    username: v.string(),
    name: v.string(),
  }).index("by_authorId", ["authorId"]),
  users: defineTable({
    name: v.string(),
    username: v.string(),
    email: v.string(),
    betterAuthId: v.string(),
  })
    .index("by_username", ["username"])
    .index("by_betterAuthId", ["betterAuthId"]),
});
