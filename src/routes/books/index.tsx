import { SubmitHandler } from '@modular-forms/solid';
import { createQuery } from '@tanstack/solid-query';
import { Suspense, createSignal } from 'solid-js';
import { BookForm } from '~/Book/components/BookForm';
import { Book } from '~/Book/types/book';
import { Loading } from '~/components/Loading';
import { PageTitle } from '~/components/PageTitle';
import { asyncUtil } from '~/core/util/async-util';

// TODO on details/edit, reset the form on cleanup
export default function Books() {
  const [mockId, setMockId] = createSignal(3);

  // TODO remove
  setInterval(() => {
    setMockId((prev) => prev + 1);
  }, 5000);

  const query = createQuery<Book[]>({
    queryKey: () => ['books', mockId()],
    queryFn: async () => {
      // TODO add axios
      const res = await fetch(`http://127.0.0.1:5000/api/Books?$filter=id eq ${mockId()}`);
      await asyncUtil.sleep(2000);
      return await res.json();
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
