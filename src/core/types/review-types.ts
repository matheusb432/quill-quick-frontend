import { z } from 'zod';

export enum ReviewCommentType {
  Negative = 0,
  Neutral = 1,
  Positive = 2,
}

export type Review = {
  id: number;
  summary: string;
  rating: number;
  soundtrack: string;
  startedAt: string;
  endedAt: string;
  isPublic: boolean;
};

export type ReviewComment = {
  id: number;
  content: string;
  type: ReviewCommentType;
  isSpoiler: boolean;
  isPublic: boolean;
};

export const zReviewForm = z.object({
  id: z.number().int().optional(),
  summary: z.string().nonempty().max(100),
  soundtrack: z.string().nonempty().max(100),
  rating: z.coerce.number().int().min(1).max(10),
  dateRange: z.string().optional(),
  isPublic: z.boolean().default(false),
});

export const zReviewCommentForm = z.object({
  id: z.number().int().optional(),
  content: z.string().nonempty().max(100),
  isSpoiler: z.boolean().default(false),
  isPublic: z.boolean().default(false),
  type: z.number().int(),
});

export type CreateReviewParams = {
  id: string;
};
