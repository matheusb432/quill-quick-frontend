import { z } from 'zod';
import { BookReviewComment } from './book-review-comment';

export type BookReview = {
  id: number;
  bookId: number;
  readingMode: string;
  summary: string;
  soundtrack: string;
  startedAt: string;
  endedAt: string;
  comments: BookReviewComment[];
};

export const zBookReviewForm = z.object({
  bookId: z.number().int().positive().optional(),
  readingMode: z.string().nonempty().max(50),
  // TODO refactor to base form type
  summary: z.string().nonempty().max(100),
  soundtrack: z.string().nonempty().max(100),
  rating: z.coerce.number().int().min(1).max(10),
  dateRange: z.string().optional(),
  // ?
});

export type tBookReviewForm = z.infer<typeof zBookReviewForm>;
