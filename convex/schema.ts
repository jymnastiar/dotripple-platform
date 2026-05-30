import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    image: v.optional(v.string()),
    title: v.string(),
    body: v.string(),
    authorId: v.string(),
  }),
});
