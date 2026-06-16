import { mutation } from "./_generated/server";

export const delteColumn = mutation({
  handler: async (ctx) => {
    const allData = await ctx.db.query("users").collect();

    for (const data of allData) {
      await ctx.db.patch("users", data._id, {
        // profileImage: undefined,
      });
    }
  },
});
