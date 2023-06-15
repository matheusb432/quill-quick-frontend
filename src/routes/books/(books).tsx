import { SubmitHandler } from '@modular-forms/solid';
import { BookForm } from '~/Book/components/BookForm';
import { useBooksForm } from '~/Book/store/store';
import { Book } from '~/Book/types/book';
import { PageTitle } from '~/components/PageTitle';
import { FormProvider } from '~/core/store/form-context';

export default function Books() {
  const handleSubmit: SubmitHandler<Book> = (data) => {
    // TODO implement
    console.warn(data);
  };

  function handleDelete() {
    // TODO implement modal & logic
  }

  return (
    <>
      <PageTitle subtitle="Review or add new books">Books</PageTitle>
      <FormProvider formData={useBooksForm()}>
        <BookForm onSubmit={handleSubmit} onDelete={handleDelete} />
      </FormProvider>
    </>
  );
}
