import { SubmitHandler } from '@modular-forms/solid';
import { BookReviewForm } from '~/BookReview/components/BookReviewForm';
import { createBookReview } from '~/BookReview/create-book-review';
import { tBookReviewForm } from '~/BookReview/types';
import { PageTitle } from '~/components/PageTitle';
import { FormProvider } from '~/core/store/form-context';

// TODO should have bookId on url data
export default function BooksReviewsCreate() {
  const { form, mutations, redirectToDetails } = createBookReview();

  const addMut = mutations.add;

  const handleSubmit: SubmitHandler<tBookReviewForm> = (data) => {
    console.log(data);
    // TODO uncomment
    // addMut.mutate(data, {
    //   onSuccess(data) {
    //     redirectToDetails(data?.id);
    //   },
    // });
  };

  return (
    <>
      <PageTitle>New Book Review</PageTitle>
      <FormProvider form={form} isLoading={addMut.isLoading}>
        <BookReviewForm onSubmit={handleSubmit} />
      </FormProvider>
    </>
  );
}
