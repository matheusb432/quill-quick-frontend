import { BookForm } from '~/Book/components/BookForm';
import { Book } from '~/Book/types/book';
import { PageTitle } from '~/components/PageTitle';

export default function Books() {
  function handleSubmit(data: Book) {
    console.warn(data);
  }

  return (
    <>
      <PageTitle subtitle="Review or add new books">Books</PageTitle>
      <BookForm isLoading={false} onSubmit={handleSubmit} />
      {/* <BookList books={[]} /> */}
    </>
  );
}
