import { z } from 'zod';

export const zBook = z.object({
  id: z.number().int().positive().optional(),
  title: z.string().nonempty().max(100),
  author: z.string().nonempty().max(100),
  publisher: z.string().max(50).optional(),
  summary: z.string().max(300).optional(),
  pageCount: z.coerce.number().int().positive(),
});

export type Book = z.infer<typeof zBook>;
