import { SubmitHandler } from '@modular-forms/solid';
import { BookForm } from '~/Book/components/BookForm';
import { createBook } from '~/Book/create-book';
import { Book } from '~/Book/types/book';
import { PageTitle } from '~/components/PageTitle';
import { FormProvider } from '~/core/store/form-context';
export default function BooksCreate() {
  const { form, mutations, redirectToDetails } = createBook();

  const addMut = mutations.add;

  const handleSubmit: SubmitHandler<Book> = (data) => {
    addMut.mutate(data, {
      onSuccess(data) {
        redirectToDetails(data?.id);
      },
    });
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
