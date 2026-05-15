import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const logsCollection = defineCollection({
  // Use the glob loader to find all MDX files in the logs directory
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/logs" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'logs': logsCollection,
};