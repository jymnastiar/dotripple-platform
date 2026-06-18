import z from "zod";

export const postSchema = z.object({
  image: z.string().optional(),
  title: z.string().min(3).max(100),
  content: z.string().min(10),
  tags: z.array(z.string()).min(1, "Please select at least one tag."),
});
