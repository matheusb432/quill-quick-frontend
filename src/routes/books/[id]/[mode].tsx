import { SubmitHandler, setValues } from '@modular-forms/solid';
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
import { FormModes } from '~/core/types/form-types';
import { DetailParams } from '~/core/types/router-types';
import { modularFormsUtil } from '~/core/util/modular-forms-util';

export default function BooksDetail() {
  const params = useParams<DetailParams>();
  const id = () => +params.id;

  const { form, queryAs, mutations, redirectToDetails } = createBook();
  const query = queryAs.byId(id);
  const { mode, title } = createDetailPage('Book', query, RoutePaths.Books);

  const updateMut = mutations.update;
  const delMut = mutations.del;
  const duplicateMut = mutations.duplicate;

  const isLoading = () =>
    query.isLoading || updateMut.isLoading || delMut.isLoading || duplicateMut.isLoading;

  createEffect(() => {
    if (!query.isSuccess || query.data == null) return;

    setValues(form[0], query.data);
  });

  const handleSubmit: SubmitHandler<Book> = () => {
    const data = modularFormsUtil.getAllFormValues(form[0]);

    switch (mode()) {
      case FormModes.Edit:
        updateMut.mutate({ ...data, id: id() });
        break;
      case FormModes.Duplicate:
        duplicateMut.mutate(data, {
          onSuccess: (data) => redirectToDetails(data?.id),
        });
        break;
      default:
        toastStore.actions.asError('Invalid form submission!');
    }
  };

  function handleDelete() {
    dialogStore.actions.asDanger({
      title: 'Delete Book',
      message: 'Are you sure you want to delete this book?',
      onConfirm: () => delMut.mutate(id()),
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
