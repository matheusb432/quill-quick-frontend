import { z } from 'zod';
import { ReviewComment, zReviewCommentForm } from '~/core/types/review-types';

export type BookReviewComment = ReviewComment & {
  reviewId: number;
};

export const zBookReviewCommentForm = z.object(zReviewCommentForm.shape);

export type tBookReviewCommentForm = z.infer<typeof zBookReviewCommentForm>;
