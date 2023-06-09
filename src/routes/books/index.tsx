import { createForm, zodForm } from '@modular-forms/solid';
import { BookForm } from '~/Book/components/BookForm';
import { Book, zBook } from '~/Book/types/book';
import { PageTitle } from '~/components/PageTitle';
import { ShowFormErrors } from '~/components/_dev-utils/ShowFormErrors';

export default function Books() {
  // TODO create form store
  const [bookForm] = createForm<Book>({
    validate: zodForm(zBook),
  });

  function handleSubmit(data: Book) {
    console.warn(data);
  }

  function handleCancel() {
    console.log('Cancel');
  }

  function handleDelete() {
    console.log('Delete');
  }

  return (
    <>
      <ShowFormErrors form={bookForm} />
      <PageTitle subtitle="Review or add new books">Books</PageTitle>
      <BookForm
        isLoading={false}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        onDelete={handleDelete}
      />
      {/* <BookList books={[]} /> */}
    </>
  );
}
