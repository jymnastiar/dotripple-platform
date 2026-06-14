import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    image: v.optional(v.string()),
    title: v.string(),
    body: v.string(),
    tags: v.array(v.string()),
    authorId: v.string(),
  })
    .index("by_authorId", ["authorId"])
    .searchIndex("search_title", {
      searchField: "title",
    }),
  users: defineTable({
    name: v.string(),
    username: v.string(),
    email: v.string(),
    betterAuthId: v.string(),
    description: v.optional(v.string()),
    profileImage: v.optional(v.string()),
    twitterAccount: v.optional(v.string()),
    instagramAccount: v.optional(v.string()),
    githubAccount: v.optional(v.string()),
    linkedinAccount: v.optional(v.string()),
  })
    .index("by_username", ["username"])
    .index("by_betterAuthId", ["betterAuthId"]),
  comment: defineTable({
    postId: v.id("posts"),
    authorId: v.string(),
    text: v.string(),
  })
    .index("by_authorId", ["authorId"])
    .index("by_postId", ["postId"]),
});
