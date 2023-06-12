import { SubmitHandler } from '@modular-forms/solid';
import { createQuery } from '@tanstack/solid-query';
import { Match, Switch, createSignal } from 'solid-js';
import { BookForm } from '~/Book/components/BookForm';
import { bookApi } from '~/Book/data/api';
import { Book } from '~/Book/types/book';
import { Alert } from '~/components/Alert';
import { PageTitle } from '~/components/PageTitle';

// TODO on details/edit, reset the form on cleanup
export default function Books() {
  const [mockId, setMockId] = createSignal(4);

  // TODO remove
  // setInterval(() => {
  //   setMockId((prev) => prev + 1);
  // }, 1000);

  const query = createQuery<Book>({
    queryKey: () => ['books', mockId()],
    queryFn: () => bookApi.getById(mockId()),
    get enabled() {
      return mockId() > 3;
    },
  });

  const handleSubmit: SubmitHandler<Book> = (data) => {
    // TODO implement
    console.warn(data);
  };

  function handleDelete() {
    // TODO implement
  }

  return (
    <>
      <PageTitle subtitle="Review or add new books">Books - {mockId()}</PageTitle>
      <Alert type="info" canDismiss>
        This is a test alert
      </Alert>
      <Alert type="error" canDismiss>
        This is a test alert
      </Alert>
      <Alert type="success">This is a test alert</Alert>
      <Alert type="warning">This is a test alert</Alert>
      <Switch>
        <Match when={query.isError}>
          <Alert type="error">Failed to load books!</Alert>
        </Match>
        <Match when={query.isSuccess}>{JSON.stringify(query.data)}</Match>
      </Switch>
      <BookForm isLoading={false} onSubmit={handleSubmit} onDelete={handleDelete} />
    </>
  );
}
