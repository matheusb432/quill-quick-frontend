import { z } from 'zod';
import { Review, zReviewForm } from '~/core/types/review-types';
import { BookReviewComment, zBookReviewCommentForm } from './book-review-comment';

export type BookReview = Review & {
  bookId: number;
  readingMode: string;
  comments: BookReviewComment[];
};

export const zBookReviewFilter = z.object({
  dateRange: z.string().optional(),
});

export type BookReviewFilter = z.infer<typeof zBookReviewFilter>;

export const zBookReviewForm = z.object({
  // TODO review's bookId via url ?
  // bookId: z.number().int().positive().optional(),
  readingMode: z.string().nonempty().max(50),
  comments: z.array(zBookReviewCommentForm).optional(),
  ...zReviewForm.shape,
});

export type tBookReviewForm = z.infer<typeof zBookReviewForm>;
