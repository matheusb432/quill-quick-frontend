import { SubmitHandler } from '@modular-forms/solid';
import { createQuery } from '@tanstack/solid-query';
import { Suspense, createSignal } from 'solid-js';
import { BookForm } from '~/Book/components/BookForm';
import { bookApi } from '~/Book/data/api';
import { Book } from '~/Book/types/book';
import { Loading } from '~/components/Loading';
import { PageTitle } from '~/components/PageTitle';
import { asyncUtil } from '~/core/util/async-util';

// TODO on details/edit, reset the form on cleanup
export default function Books() {
  const [mockId, setMockId] = createSignal(4);

  // TODO remove
  setInterval(() => {
    setMockId((prev) => prev + 1);
  }, 15000);

  const query = createQuery<Book[]>({
    queryKey: () => ['books', mockId()],
    queryFn: async () => {
      const res = await bookApi.get();
      await asyncUtil.sleep(500);
      return res.data;
    },
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
      <Suspense fallback={<Loading />}>{JSON.stringify(query.data)}</Suspense>
      <BookForm isLoading={false} onSubmit={handleSubmit} onDelete={handleDelete} />
    </>
  );
}
