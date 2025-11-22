import { z } from "zod";

export const addFeedSchema = z.object({
  url: z
    .string()
    .trim()
    .url("Invalid URL format")
    .min(10, "URL is too short")
    .max(300, "URL is too long")
    .refine((v) => v.includes("http"), "URL must start with http or https"),

  title: z
    .string()
    .trim()
    .max(80, "Title must be under 80 characters")
    .optional(),

  category: z
    .string()
    .trim()
    .max(40, "Category must be under 40 characters")
    .optional(),
});
