import { z } from "zod";

export const editUserSchema = z.object({
  name: z.string().min(3).max(30),
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-z0-9_-]+$/, {
      message:
        "Usernames may only contain lowercase letters, numbers, (-), or (_).",
    })
    .toLowerCase()
    .trim(),
  description: z.optional(z.string().min(10).max(300)),
  profileImage: z.optional(z.string()),
  twitterAccount: z.union([
    z.literal(""),
    z.string().regex(/^[a-z0-9_]{1,15}$/, {
      message: "max 15 chars, letters, numbers, or _",
    }),
  ]),
  instagramAccount: z.union([
    z.literal(""),
    z.string().regex(/^[a-z0-9._]{1,30}$/, {
      message: "max 30 chars, letters, numbers, . or _",
    }),
  ]),
  githubAccount: z.union([
    z.literal(""),
    z.string().regex(/^[a-z0-9](?:[a-z0-9-]{0,37}[a-z0-9])?$/, {
      message: "letters, numbers, or - (cannot start/end with -)",
    }),
  ]),
  linkedinAccount: z.union([
    z.literal(""),
    z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "letters, numbers, or -",
    }),
  ]),
});
