import { createAuthClient } from "better-auth/react";
import { convexClient } from "@convex-dev/better-auth/client/plugins";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: true,
        input: true,
      } as const,
    },
  },
  plugins: [convexClient(), inferAdditionalFields()],
});
