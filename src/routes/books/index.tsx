import { SubmitHandler } from '@modular-forms/solid';
import { BookForm } from '~/Book/components/BookForm';
import { Book } from '~/Book/types/book';
import { PageTitle } from '~/components/PageTitle';

// TODO on details/edit, reset the form on cleanup
export default function Books() {
  const handleSubmit: SubmitHandler<Book> = (data) => {
    // TODO implement
    console.warn(data);
  };

  function handleDelete() {
    // TODO implement
  }

  return (
    <>
      <PageTitle subtitle="Review or add new books">Books</PageTitle>
      <BookForm isLoading={false} onSubmit={handleSubmit} onDelete={handleDelete} />
    </>
  );
}
