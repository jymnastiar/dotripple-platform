import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { username } from "better-auth/plugins";
import { isRunMutationCtx } from "@convex-dev/better-auth/utils";
import { components, internal } from "./_generated/api";
import { DataModel } from "./_generated/dataModel";
import { query } from "./_generated/server";
import { betterAuth } from "better-auth/minimal";
import authConfig from "./auth.config";

declare const process: { env?: { SITE_URL?: string } };
const siteUrl = process.env?.SITE_URL ?? "";

// The component client has methods needed for integrating Convex with Better Auth,
// as well as helper methods for general use.
export const authComponent = createClient<DataModel>(components.betterAuth);

export const createAuth = (ctx: GenericCtx<DataModel>) => {
  return betterAuth({
    baseURL: siteUrl,
    database: authComponent.adapter(ctx),
    // Configure simple, non-verified email/password to get started
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    databaseHooks: {
      user: {
        create: {
          after: async (user) => {
            if (isRunMutationCtx(ctx)) {
              await ctx.runMutation(internal.users.storeUser, {
                name: user.name,
                email: user.email,
                username: user.username as string,
                betterAuthId: user.id,
              });
            }
          },
        },
      },
    },
    plugins: [
      // The Convex plugin is required for Convex compatibility
      convex({ authConfig }),
      username(),
    ],
  });
};

// Function get current user
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    try {
      return await authComponent.getAuthUser(ctx);
    } catch (error) {
      return null;
    }
  },
});
