import { z } from 'zod';

export const zBookFilter = z.object({
  title: z.string().optional(),
});

export type BookFilter = z.infer<typeof zBookFilter>;
