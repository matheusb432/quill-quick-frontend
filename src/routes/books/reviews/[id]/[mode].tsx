import { SubmitHandler, setValues } from '@modular-forms/solid';
import { createEffect } from 'solid-js';
import { useParams } from 'solid-start';
import { BookReviewForm } from '~/BookReview/components/BookReviewForm';
import { createBookReview } from '~/BookReview/create-book-review';
import { tBookReviewForm } from '~/BookReview/types';
import { bookReviewUtil } from '~/BookReview/util/book-review-util';
import { PageError } from '~/components/PageError';
import { PageTitle } from '~/components/PageTitle';
import { RoutePaths } from '~/core/constants/route-paths';
import { createDetailPage } from '~/core/store/create-detail-page';
import { dialogStore } from '~/core/store/dialog-store';
import { FormProvider } from '~/core/store/form-context';
import { toastStore } from '~/core/store/toast-store';
import { FormModes } from '~/core/types/form-types';
import { DetailParams } from '~/core/types/router-types';
import { modularFormsUtil } from '~/core/util/modular-forms-util';

export default function BookReviewsDetail() {
  const params = useParams<DetailParams>();
  const id = () => +params.id;

  const { form, queryAs, mutations, redirectToList } = createBookReview();
  const query = queryAs.byId(id);
  const { mode, title } = createDetailPage('Book Review', query, RoutePaths.BookReviews);

  const updateMut = mutations.update;
  const delMut = mutations.del;

  const isLoading = () => query.isLoading || updateMut.isLoading || delMut.isLoading;

  createEffect(() => {
    if (!query.isSuccess) return;

    setValues(form[0], bookReviewUtil.mapToForm(query.data));
  });

  const handleSubmit: SubmitHandler<tBookReviewForm> = () => {
    const data = modularFormsUtil.getAllFormValues(form[0]);

    switch (mode()) {
      case FormModes.Edit:
        updateMut.mutate(bookReviewUtil.mapToUpdate(id(), data));
        break;
      default:
        toastStore.actions.asError('Invalid form submission!');
    }
  };

  function handleDelete() {
    dialogStore.actions.asDanger({
      title: 'Delete Review',
      message: 'Are you sure you want to delete this review?',
      onConfirm: () =>
        delMut.mutate(id(), {
          onSuccess: () => redirectToList(),
        }),
    });
  }

  return (
    <>
      <PageTitle>{title()}</PageTitle>
      <PageError
        when={query.isError}
        message="Failed to load review!"
        onRetry={() => query.refetch()}
        goBackPath={RoutePaths.BookReviews}
      />
      <FormProvider form={form} isLoading={isLoading()} disabled={query.isError} mode={mode()}>
        <BookReviewForm onSubmit={handleSubmit} onDelete={handleDelete} />
      </FormProvider>
    </>
  );
}
