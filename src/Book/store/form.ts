import { createForm, zodForm } from '@modular-forms/solid';
import { formUtil } from '~/core/util/form-util';
import { Book, zBook } from '../types/book';

export function createBookForm() {
  return createForm<Book>({
    validate: zodForm(zBook),
    initialValues: formUtil.getDefaults(zBook),
    validateOn: 'blur',
  });
}
