import { z } from 'zod';

export const zBook = z.object({
  title: z.string().min(1).max(100),
  author: z.string().min(1).max(100),
  publisher: z.string().max(50).optional(),
  summary: z.string().max(300).optional(),
  pageCount: z.number().int().positive().optional(),
});

export type Book = z.infer<typeof zBook>;
