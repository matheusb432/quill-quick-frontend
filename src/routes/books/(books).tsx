import { SubmitHandler } from '@modular-forms/solid';
import { createSignal } from 'solid-js';
import { BookForm } from '~/Book/components/BookForm';
import { useBooksForm } from '~/Book/store/store';
import { Book } from '~/Book/types/book';
import { PageTitle } from '~/components/PageTitle';
import { FormProvider } from '~/core/store/form-context';

// TODO on details/edit, reset the form on cleanup
export default function Books() {
  const [mockId, setMockId] = createSignal(4);
  // TODO remove
  // setInterval(() => {
  //   setMockId((prev) => prev + 1);
  // }, 1000);

  // const query = createQuery<Book>({
  //   queryKey: () => ['books', mockId()],
  //   queryFn: () => bookApi.getById(mockId()),
  //   get enabled() {
  //     return mockId() > 3;
  //   },
  // });

  const handleSubmit: SubmitHandler<Book> = (data) => {
    // TODO implement
    console.warn(data);
  };

  function handleDelete() {
    // TODO implement modal & logic
  }

  return (
    <>
      <PageTitle subtitle="Review or add new books">Books - {mockId()}</PageTitle>
      {/* <Switch>
        <Match when={query.isError}>
          <Alert type="error">Failed to load books!</Alert>
        </Match>
        <Match when={query.isSuccess}>{JSON.stringify(query.data)}</Match>
      </Switch> */}
      <FormProvider formData={useBooksForm()}>
        <BookForm onSubmit={handleSubmit} onDelete={handleDelete} />
      </FormProvider>
    </>
  );
}
