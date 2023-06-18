import { createQuery } from '@tanstack/solid-query';
import { createSignal } from 'solid-js';
import { BookRow, BookTable } from '~/Book/components/BookTable';
import { createBook } from '~/Book/create-book';
import { createBookApi } from '~/Book/store/agent';
import { Button } from '~/components/Button';
import { PageTitle } from '~/components/PageTitle';
import { Pagination } from '~/components/Pagination';
import { createPagination } from '~/core/store/create-pagination';
import { dialogStore } from '~/core/store/dialog-store';
import { paginationUtil } from '~/core/util/pagination-util';

export default function Books() {
  const { mutations, redirectToDetails, redirectToCreate } = createBook();
  const { keyWithParams, paginated } = createBookApi();
  const pagination = createPagination();

  const [filters] = createSignal(paginationUtil.default());
  // TODO no reactive context using queryAs?
  // const query = queryAs.paginated(filters);
  const query = createQuery({
    queryKey: () => keyWithParams(filters()),
    queryFn: () => paginated(filters()),
  });

  const delMut = mutations.del;

  const handleView = (book: BookRow) => redirectToDetails(book.id, 'view');
  const handleEdit = (book: BookRow) => redirectToDetails(book.id, 'edit');
  const handleDuplicate = (book: BookRow) => redirectToDetails(book.id, 'duplicate');

  function handleDelete(book: BookRow) {
    dialogStore.actions.asDanger({
      title: 'Delete Book',
      message: 'Are you sure you want to delete this book?',
      onConfirm: () => delMut.mutate(book.id),
    });
  }

  return (
    <>
      <PageTitle subtitle="Review or add new books">Books</PageTitle>
      <div class="flex justify-end items-center">
        <Button onClick={() => redirectToCreate()}>Add Book</Button>
      </div>
      <section class="flex flex-col items-center justify-center gap-y-6">
        <BookTable
          items={query.data?.items ?? []}
          viewFn={handleView}
          editFn={handleEdit}
          duplicateFn={handleDuplicate}
          removeFn={handleDelete}
        />
        <Pagination total={query.data?.total} pagination={pagination} />
      </section>
    </>
  );
}
