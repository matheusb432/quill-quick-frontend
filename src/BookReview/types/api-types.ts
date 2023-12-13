export type CreateBookReviewCommand = {
  bookId: number;
  readingMode?: string;
  summary: string;
  soundtrack: string;
  rating: number;
  isPublic?: boolean;
  startedAt?: Date;
  endedAt?: Date;
};

export type UpdateBookReviewCommand = {
  id: number;
  readingMode?: string;
  summary: string;
  soundtrack: string;
  rating: number;
  isPublic?: boolean;
  startedAt?: Date;
  endedAt?: Date;
};
