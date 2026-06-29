import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    publishedAt: z.date(),
    readingTime: z.number(),
    intro: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
