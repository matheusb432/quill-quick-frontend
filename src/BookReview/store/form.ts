import { createForm, zodForm } from '@modular-forms/solid';
import { formUtil } from '~/core/util/form-util';
import { Book, zBook } from '../types/book';
import { BookFilter, zBookFilter } from '../types/filters';

export function createBookForm() {
  return createForm<Book>({
    validate: zodForm(zBook),
    initialValues: formUtil.getDefaults(zBook),
    validateOn: 'blur',
  });
}

export function createBookFilterForm() {
  return createForm<BookFilter>({
    validate: zodForm(zBookFilter),
    initialValues: formUtil.getDefaults(zBookFilter),
  });
}
