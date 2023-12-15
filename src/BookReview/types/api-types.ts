import { ReviewCommentType } from '~/core/types/review-types';

export type CreateBookReviewCommand = {
  bookId: number;
  readingMode: string | undefined;
  summary: string;
  soundtrack: string;
  rating: number;
  isPublic: boolean | undefined;
  startedAt: Date | undefined;
  endedAt: Date | undefined;
  comments: BookReviewCommentCreateDto[];
};

export type UpdateBookReviewCommand = {
  id: number;
  readingMode: string | undefined;
  summary: string;
  soundtrack: string;
  rating: number;
  isPublic: boolean | undefined;
  startedAt: Date | undefined;
  endedAt: Date | undefined;
  comments: BookReviewCommentUpdateDto[];
};

export type BookReviewCommentCreateDto = {
  content: string;
  isSpoiler?: boolean;
  isPublic?: boolean;
  type: number;
};

export type BookReviewCommentUpdateDto = {
  id: number | undefined;
  content: string;
  isSpoiler?: boolean;
  isPublic?: boolean;
  type: number;
};
