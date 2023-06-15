import { SubmitHandler } from '@modular-forms/solid';
import { useBeforeLeave, BeforeLeaveEventArgs } from '@solidjs/router';
import { createMutation, createQuery } from '@tanstack/solid-query';
import { Show, createEffect, onCleanup } from 'solid-js';
import { useNavigate, useParams } from 'solid-start';
import { BookForm } from '~/Book/components/BookForm';
import { bookApi } from '~/Book/data/api';
import { booksActions, useBooksForm } from '~/Book/data/store';
import { Book } from '~/Book/types/book';
import { Alert } from '~/components/Alert';
import { Button } from '~/components/Button';
import { PageError } from '~/components/PageError';
import { PageTitle } from '~/components/PageTitle';
import { RoutePaths } from '~/core/constants/route-paths';
import { dialogStore } from '~/core/data/dialog-store';
import { FormProvider } from '~/core/data/form-context';
import { toastStore } from '~/core/data/toast-store';
import { FormModes } from '~/core/types/form-types';
import { DetailParams } from '~/core/types/router-types';
import { ToastAs, ToastData } from '~/core/types/toast-types';
import { routerUtil } from '~/core/util/router-util';

export default function BooksDetail() {
  const nextToast = (t: ToastData) => toastStore.actions.next(t);
  const params = useParams<DetailParams>();
  const id = () => +params.id;
  const navigate = useNavigate();

  // TODO redirect to mode if getMode is invalid
  const mode = () => routerUtil.getMode(params.mode) as FormModes;
  const title = () => routerUtil.buildTitle(mode(), 'Book');
  const formData = useBooksForm();

  onCleanup(() => {
    // TODO test
    // reset(formData[0]);
    booksActions.resetForm();
  });

  // TODO use root dialog
  useBeforeLeave((e: BeforeLeaveEventArgs) => {
    console.log(formData[0].dirty);
    if (formData[0].dirty && !e.defaultPrevented) {
      // preventDefault to block immediately and prompt user async
      e.preventDefault();

      setTimeout(() => {
        if (window.confirm('Discard unsaved changes - are you sure?')) {
          // user wants to proceed anyway so retry with force=true
          e.retry(true);
        }
      }, 100);
    }
  });

  createEffect(() => {
    if (!Number.isNaN(id())) return;

    nextToast(ToastAs.error('Invalid Book ID!'));
    navigate(RoutePaths.Books);
  });

  const query = createQuery<Book>({
    queryKey: () => ['books', id()],
    queryFn: () => bookApi.getById(id()),
    get enabled() {
      return !!id();
    },
  });

  // TODO queries & mutations to hooks?
  // TODO invalidate cache on success
  const updateMut = createMutation({
    mutationKey: ['book', 'update'],
    mutationFn: (data: Book) => bookApi.update(id(), data),
    onSuccess: () => {
      console.log('mutated!');
      nextToast(ToastAs.success('Book successfully updated!'));
    },
  });

  const removeMut = createMutation({
    mutationKey: ['book', 'remove'],
    mutationFn: () => bookApi.remove(id()),
    onSuccess: () => {
      console.log('mutated!');
      nextToast(ToastAs.success('Book successfully deleted!'));
    },
  });

  const duplicateMut = createMutation({
    mutationKey: ['book', 'duplicate'],
    mutationFn: (data: Book) => bookApi.duplicate(data),
    onSuccess: (data) => {
      const createdId = data?.id;

      nextToast(ToastAs.success('Book duplicated!'));
      if (!createdId) {
        nextToast(ToastAs.warning('Failed to redirect to book details!'));
        return;
      }
      const detailPath = routerUtil.replaceDetailParams(RoutePaths.BookDetail, {
        id: createdId.toString(),
        mode: 'edit',
      });
      navigate(detailPath);
    },
  });

  const isLoading = () => query.isLoading || updateMut.isLoading;

  createEffect(() => {
    if (!query.isSuccess) return;

    if (!query.data) {
      nextToast(ToastAs.info(`Book with ID ${id()} not found! Redirecting to Books...`, 7000));
      navigate(RoutePaths.Books);
      return;
    }

    booksActions.resetForm(query.data);
  });

  // TODO test
  const handleSubmit: SubmitHandler<Book> = (data) => {
    switch (mode()) {
      case 'edit':
        updateMut.mutate(data);
        break;
      case 'duplicate':
        duplicateMut.mutate(data);
        break;
      default:
        nextToast(ToastAs.error('Invalid form submission!'));
    }
  };

  function handleDelete() {
    // TODO implement modal & logic
    dialogStore.actions.asDanger({
      title: 'Delete Book',
      message: 'Are you sure you want to delete this book?',
      onConfirm: removeMut.mutate,
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
      <FormProvider
        formData={formData}
        isLoading={isLoading()}
        disabled={query.isError}
        mode={mode()}
      >
        <BookForm onSubmit={handleSubmit} onDelete={handleDelete} />
      </FormProvider>
    </>
  );
}
