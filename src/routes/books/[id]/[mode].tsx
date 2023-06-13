import { SubmitHandler, reset } from '@modular-forms/solid';
import { createQuery } from '@tanstack/solid-query';
import { Match, Show, Switch, createSignal, onCleanup } from 'solid-js';
import { useNavigate, useParams } from 'solid-start';
import { BookForm } from '~/Book/components/BookForm';
import { bookApi } from '~/Book/data/api';
import { useBooksForm } from '~/Book/data/store';
import { Book } from '~/Book/types/book';
import { Alert } from '~/components/Alert';
import { Button } from '~/components/Button';
import { PageTitle } from '~/components/PageTitle';
import { RoutePaths } from '~/core/constants/route-paths';
import { FormProvider } from '~/core/data/form-context';
import { DetailParams } from '~/core/types/router-types';
import { routerUtil } from '~/core/util/router-util';

export default function BooksDetail() {
  const params = useParams<DetailParams>();
  const navigate = useNavigate();

  const mode = () => routerUtil.getMode(params.mode);
  const title = () => routerUtil.buildTitle(mode(), 'Book');
  const formData = useBooksForm();

  onCleanup(() => {
    // TODO test
    reset(formData[0]);
  });

  const query = createQuery<Book>({
    queryKey: () => ['books', params.id],
    queryFn: () => bookApi.getById(+params.id),
    get enabled() {
      return !!params.id;
    },
  });
  // TODO add mutations

  const handleSubmit: SubmitHandler<Book> = (data) => {
    // TODO implement
    console.warn(data);
  };

  function handleDelete() {
    // TODO implement modal & logic
  }

  return (
    <>
      <PageTitle>{title()}</PageTitle>
      {/* TODO to component */}
      <Show when={true}>
        <Alert type="error" canDismiss>
          Failed to load book!
          <div class="flex gap-x-6 justify-center items-center mb-4">
            <Button mode="stroked" onClick={() => navigate(RoutePaths.Books)}>
              Go to Books
            </Button>
            <Button onClick={() => query.refetch()}>Try again</Button>
          </div>
        </Alert>
      </Show>
      <FormProvider formData={formData} isLoading={query.isLoading}>
        <BookForm onSubmit={handleSubmit} onDelete={handleDelete} mode={mode()} />
      </FormProvider>
    </>
  );
}
