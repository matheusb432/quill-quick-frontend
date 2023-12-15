import { dateUtil } from '~/core/util/date-util';
import { BookReview, tBookReviewForm } from '../types';
import { CreateBookReviewCommand, UpdateBookReviewCommand } from '../types/api-types';

function mapToForm(data: BookReview): tBookReviewForm {
  return {
    readingMode: data.readingMode,
    comments: data.comments.map((c) => ({
      id: c.id,
      content: c.content,
      type: c.type,
      isSpoiler: c.isSpoiler,
      isPublic: c.isPublic,
    })),
    dateRange: dateUtil.jsonDatesToRange(data.startedAt, data.endedAt),
    rating: data.rating,
    soundtrack: data.soundtrack,
    summary: data.summary,
    isPublic: data.isPublic,
  };
}

function mapToCreate(bookId: number, data: tBookReviewForm): CreateBookReviewCommand {
  const range = dateUtil.rangeToDates(data.dateRange);
  return {
    bookId,
    readingMode: data.readingMode,
    summary: data.summary,
    soundtrack: data.soundtrack,
    rating: data.rating,
    isPublic: data.isPublic,
    startedAt: range.start ?? undefined,
    endedAt: range.end ?? undefined,
    comments: data.comments,
  };
}

function mapToUpdate(id: number, data: tBookReviewForm): UpdateBookReviewCommand {
  const range = dateUtil.rangeToDates(data.dateRange);
  return {
    id,
    readingMode: data.readingMode,
    summary: data.summary,
    soundtrack: data.soundtrack,
    rating: data.rating,
    isPublic: data.isPublic,
    startedAt: range.start ?? undefined,
    endedAt: range.end ?? undefined,
    comments: data.comments.map((c) => ({
      id: c.id,
      content: c.content,
      type: c.type,
      isSpoiler: c.isSpoiler,
      isPublic: c.isPublic,
    })),
  };
}

export const bookReviewUtil = {
  mapToForm,
  mapToCreate,
  mapToUpdate,
};
