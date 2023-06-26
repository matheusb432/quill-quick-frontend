import { z } from 'zod';
import { ReviewCommentType } from '~/core/types/review-types';

export type BookReviewComment = {
  id: number;
  content: string;
  isSpoiler: boolean;
  isPublic: boolean;
  reviewId: number;
  type: number;
};

export const zBookReviewCommentForm = z.object({
  // TODO refactor to base form type
  content: z.string().nonempty().max(100),
  isSpoiler: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  type: z
    .number()
    .int()
    .min(ReviewCommentType.Negative)
    .max(ReviewCommentType.Positive)
    .default(ReviewCommentType.Neutral),
  // ?
});

export type tBookReviewCommentForm = z.infer<typeof zBookReviewCommentForm>;
