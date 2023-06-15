import { SubmitHandler } from '@modular-forms/solid';
import { createMutation } from '@tanstack/solid-query';
import { useNavigate } from 'solid-start';
import { BookForm } from '~/Book/components/BookForm';
import { createBookApi } from '~/Book/store/api';
import { createBookForm } from '~/Book/store/form';
import { Book } from '~/Book/types/book';
import { PageTitle } from '~/components/PageTitle';
import { RoutePaths } from '~/core/constants/route-paths';
import { FormProvider } from '~/core/store/form-context';
import { toastStore } from '~/core/store/toast-store';
import { ToastAs, ToastData } from '~/core/types/toast-types';
import { routerUtil } from '~/core/util/router-util';

export default function BooksCreate() {
  const nextToast = (t: ToastData) => toastStore.actions.next(t);
  const navigate = useNavigate();
  const api = createBookApi();
  const form = createBookForm();

  const createMut = createMutation({
    mutationKey: ['book', 'add'],
    mutationFn: (data: Book) => api.create(data),
    onSuccess: (data) => {
      // TODO to hook?
      const id = data?.id;

      nextToast(ToastAs.success('Book created!'));
      if (!id) {
        nextToast(ToastAs.warning('Failed to redirect to book details!'));
        return;
      }
      // TODO to fn
      const detailPath = routerUtil.replaceDetailParams(RoutePaths.BookDetail, {
        id: id.toString(),
        mode: 'edit',
      });
      navigate(detailPath);
    },
  });

  const handleSubmit: SubmitHandler<Book> = (data) => {
    createMut.mutate(data);
  };

  return (
    <>
      <PageTitle>New Book</PageTitle>
      <FormProvider form={form} isLoading={createMut.isLoading}>
        <BookForm onSubmit={handleSubmit} />
      </FormProvider>
    </>
  );
}
