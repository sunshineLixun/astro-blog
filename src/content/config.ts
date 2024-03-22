import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    spoiler: z.string(),
  }),
});

export const collections = {
  posts: blogCollection,
};
