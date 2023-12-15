import { createForm, zodForm } from '@modular-forms/solid';
import { formUtil } from '~/core/util/form-util';
import { BookReviewFilter, tBookReviewForm, zBookReviewFilter, zBookReviewForm } from '../types';

export function createBookReviewForm() {
  return createForm<tBookReviewForm>({
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
