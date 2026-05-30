import z from "zod";

export const postSchema = z.object({
  image: z.string().optional(),
  title: z.string().min(3).max(50),
  content: z.string().min(10),
});
