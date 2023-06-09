import { createForm, reset, zodForm } from '@modular-forms/solid';
import { createRoot } from 'solid-js';
import { createStore } from 'solid-js/store';
import { formUtil } from '~/core/util/form-util';
import { Book, zBook } from '../types/book';

const createBookForm = () =>
  createForm<Book>({
    validate: zodForm(zBook),
    initialValues: formUtil.getDefaults(zBook),
  });

type BookState = {
  formData: ReturnType<typeof createBookForm>;
};

function createBooksStore(): [BookState, { resetForm: () => void }] {
  const formData = createBookForm();
  // TODO expose only necessary form data
  const [state] = createStore<BookState>({ formData });

  function resetForm(initialValues?: Book) {
    const options = initialValues ? { initialValues } : undefined;

    reset(state.formData[0], options);
  }

  return [
    state,
    {
      resetForm,
    },
  ];
}

const [state, actions] = createRoot(createBooksStore);
// TODO implement selector?
export const booksState = state;
export const booksActions = actions;
