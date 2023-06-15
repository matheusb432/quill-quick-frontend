import { createForm, reset, zodForm } from '@modular-forms/solid';
import { createRoot } from 'solid-js';
import { createStore } from 'solid-js/store';
import { formUtil } from '~/core/util/form-util';
import { Book, zBook } from '../types/book';

const createBookForm = () =>
  createForm<Book>({
    validate: zodForm(zBook),
    initialValues: formUtil.getDefaults(zBook),
    validateOn: 'blur',
  });

type BookState = {
  formData: ReturnType<typeof createBookForm>;
};

function createBooksStore() {
  const formData = createBookForm();
  // TODO expose only necessary form data
  const [state] = createStore<BookState>({ formData });

  function resetForm(initialValues?: Book) {
    const options = initialValues ? { initialValues } : undefined;

    reset(state.formData[0], options);
  }

  return {
    state,
    actions: {
      resetForm,
    },
  };
}

const { state, actions } = createRoot(createBooksStore);
const useBooksState = <T>(selector: (state: BookState) => T) => selector(state);
export const useBooksForm = () => useBooksState((state) => state.formData);
export const booksActions = actions;
