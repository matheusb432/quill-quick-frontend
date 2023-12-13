import { SubmitHandler } from '@modular-forms/solid';
import { useParams } from 'solid-start';
import { createBook } from '~/Book/create-book';
import { BookReviewForm } from '~/BookReview/components/BookReviewForm';
import { createBookReview } from '~/BookReview/create-book-review';
import { tBookReviewForm } from '~/BookReview/types';
import { CreateBookReviewCommand } from '~/BookReview/types/api-types';
import { PageTitle } from '~/components/PageTitle';
import { RoutePaths } from '~/core/constants/route-paths';
import { createDetailPage } from '~/core/store/create-detail-page';
import { FormProvider } from '~/core/store/form-context';
import { CreateReviewParams } from '~/core/types/review-types';

// TODO should have bookId on url data
export default function BooksReviewsCreate() {
  const params = useParams<CreateReviewParams>();
  const bookId = () => +params.id;
  const { queryAs: bookQueryAs } = createBook();
  const bookQuery = bookQueryAs.byId(bookId);
  createDetailPage('Book', bookQuery, RoutePaths.Books);

  const { form, mutations, redirectToDetails } = createBookReview();

  const addMut = mutations.add;

  const handleSubmit: SubmitHandler<tBookReviewForm> = (data) => {
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
