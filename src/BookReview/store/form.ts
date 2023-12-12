import { createForm, zodForm } from '@modular-forms/solid';
import { formUtil } from '~/core/util/form-util';
import { BookReview, BookReviewFilter, zBookReviewFilter, zBookReviewForm } from '../types';

export function createBookReviewForm() {
  return createForm<BookReview>({
    validate: zodForm(zBookReviewForm),
    initialValues: formUtil.getDefaults(zBookReviewForm),
    validateOn: 'blur',
  });
}

export function createBookReviewFilterForm() {
  return createForm<BookReviewFilter>({
    validate: zodForm(zBookReviewFilter),
    initialValues: formUtil.getDefaults(zBookReviewFilter),
  });
}
