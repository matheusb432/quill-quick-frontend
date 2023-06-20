import { z } from 'zod';

export const zBook = z.object({
  id: z.number().int().positive().optional(),
  title: z.string().nonempty().max(100),
  author: z.string().nonempty().max(100),
  publisher: z.string().max(50).optional(),
  summary: z.string().max(300).optional(),
  pageCount: z.coerce.number().int().positive(),
  // TODO add in review model
  rating: z.coerce.number().int().min(1).max(10),
  dateRange: z.string().optional(),
});

export type Book = z.infer<typeof zBook>;
