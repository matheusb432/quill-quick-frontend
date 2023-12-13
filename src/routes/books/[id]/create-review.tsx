import { SubmitHandler } from '@modular-forms/solid';
import { useParams } from 'solid-start';
import { BookReviewForm } from '~/BookReview/components/BookReviewForm';
import { createBookReview } from '~/BookReview/create-book-review';
import { tBookReviewForm } from '~/BookReview/types';
import { CreateBookReviewCommand } from '~/BookReview/types/api-types';
import { PageTitle } from '~/components/PageTitle';
import { FormProvider } from '~/core/store/form-context';
import { CreateReviewParams } from '~/core/types/review-types';

// TODO should have bookId on url data
export default function BooksReviewsCreate() {
  const params = useParams<CreateReviewParams>();
  const bookId = () => +params.id;

  const { form, mutations, redirectToDetails } = createBookReview();

  const addMut = mutations.add;

  const handleSubmit: SubmitHandler<tBookReviewForm> = (data) => {
    console.log(data);
    const dto: CreateBookReviewCommand = {
      ...data,
      bookId: bookId(),
    };

    // TODO test
    addMut.mutate(dto, {
      onSuccess(data) {
        redirectToDetails(data?.id);
      },
    });
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
