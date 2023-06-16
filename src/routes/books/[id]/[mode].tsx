import { SubmitHandler, reset } from '@modular-forms/solid';
import { useBeforeLeave } from '@solidjs/router';
import { createEffect } from 'solid-js';
import { useParams } from 'solid-start';
import { BookForm } from '~/Book/components/BookForm';
import { createBook } from '~/Book/create-book';
import { Book } from '~/Book/types/book';
import { PageError } from '~/components/PageError';
import { PageTitle } from '~/components/PageTitle';
import { RoutePaths } from '~/core/constants/route-paths';
import { createDetailPage } from '~/core/store/create-detail-page';
import { dialogStore } from '~/core/store/dialog-store';
import { FormProvider } from '~/core/store/form-context';
import { toastStore } from '~/core/store/toast-store';
import { DetailParams } from '~/core/types/router-types';

export default function BooksDetail() {
  const params = useParams<DetailParams>();
  const id = () => +params.id;

  const { form, queryAs, mutationAs, onBeforeLeave } = createBook();
  const query = queryAs.byId(id);

  const { mode, title } = createDetailPage('Book', query, RoutePaths.Books);

  useBeforeLeave(onBeforeLeave);

  const updateMut = mutationAs.update(id);
  const delMut = mutationAs.del(id, true);
  const duplicateMut = mutationAs.duplicate();

  const isLoading = () =>
    query.isLoading || updateMut.isLoading || delMut.isLoading || duplicateMut.isLoading;

  createEffect(() => {
    if (!query.isSuccess) return;

    reset(form[0], { initialValues: query.data });
  });

  const handleSubmit: SubmitHandler<Book> = (data) => {
    switch (mode()) {
      case 'edit':
        updateMut.mutate(data);
        break;
      case 'duplicate':
        duplicateMut.mutate(data);
        break;
      default:
        toastStore.actions.asError('Invalid form submission!');
    }
  };

  function handleDelete() {
    dialogStore.actions.asDanger({
      title: 'Delete Book',
      message: 'Are you sure you want to delete this book?',
      onConfirm: delMut.mutate,
    });
  }

  return (
    <>
      <PageTitle>{title()}</PageTitle>
      <PageError
        when={query.isError}
        message="Failed to load book!"
        onRetry={() => query.refetch()}
        goBackPath={RoutePaths.Books}
      />
      <FormProvider form={form} isLoading={isLoading()} disabled={query.isError} mode={mode()}>
        <BookForm onSubmit={handleSubmit} onDelete={handleDelete} />
      </FormProvider>
    </>
  );
}
