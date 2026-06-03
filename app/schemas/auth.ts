import { z } from "zod";

export const signUpSchema = z.object({
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
  email: z.string().email(),
  password: z.string().min(8).max(30),
});

export const loginSchema = z.object({
  account: z.string().min(3).toLowerCase().trim(),
  password: z.string().min(8).max(30),
});
