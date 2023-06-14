import { SubmitHandler } from '@modular-forms/solid';
import { createMutation } from '@tanstack/solid-query';
import { createSignal } from 'solid-js';
import { useNavigate } from 'solid-start';
import { BookForm } from '~/Book/components/BookForm';
import { bookApi } from '~/Book/data/api';
import { useBooksForm } from '~/Book/data/store';
import { Book } from '~/Book/types/book';
import { PageTitle } from '~/components/PageTitle';
import { RoutePaths } from '~/core/constants/route-paths';
import { FormProvider } from '~/core/data/form-context';
import { toastStore } from '~/core/data/toast-store';
import { ToastAs, ToastData } from '~/core/types/toast-types';
import { routerUtil } from '~/core/util/router-util';

export default function BooksCreate() {
  const nextToast = (t: ToastData) => toastStore.actions.next(t);
  const navigate = useNavigate();
  const mutation = createMutation({
    mutationKey: ['book', 'add'],
    mutationFn: (data: Book) => bookApi.create(data),
    onSuccess: (data) => {
      console.log(data);
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

  // TODO test
  const handleSubmit: SubmitHandler<Book> = (data) => {
    mutation.mutate(data);
    console.warn('MUTATED!');
    return Promise.resolve();
  };

  return (
    <>
      <PageTitle>New Book</PageTitle>
      <FormProvider formData={useBooksForm()} isLoading={mutation.isLoading}>
        <BookForm onSubmit={handleSubmit} />
      </FormProvider>
    </>
  );
}
