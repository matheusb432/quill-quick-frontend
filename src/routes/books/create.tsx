import { SubmitHandler } from '@modular-forms/solid';
import { BookForm } from '~/Book/components/BookForm';
import { createBook } from '~/Book/create-book';
import { Book } from '~/Book/types/book';
import { PageTitle } from '~/components/PageTitle';
import { FormProvider } from '~/core/store/form-context';

export default function BooksCreate() {
  const { form, mutationAs } = createBook();

  const addMut = mutationAs.add();

  const handleSubmit: SubmitHandler<Book> = (data) => {
    addMut.mutate(data);
  };

  return (
    <>
      <PageTitle>New Book</PageTitle>
      <FormProvider form={form} isLoading={addMut.isLoading}>
        <BookForm onSubmit={handleSubmit} />
      </FormProvider>
    </>
  );
}
