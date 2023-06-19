import { createSignal } from 'solid-js';
import { BookFilterForm } from '~/Book/components/BookFilterForm';
import { BookRow, BookTable } from '~/Book/components/BookTable';
import { createBook } from '~/Book/create-book';
import { createBookFilterForm } from '~/Book/store/form';
import { BookFilter } from '~/Book/types/filters';
import { Button } from '~/components/Button';
import { PageTitle } from '~/components/PageTitle';
import { Pagination } from '~/components/Pagination';
import { Defaults } from '~/core/constants/defaults';
import { createPagination } from '~/core/store/create-pagination';
import { dialogStore } from '~/core/store/dialog-store';
import { FormProvider } from '~/core/store/form-context';
import { ODataOperators, ODataOptions } from '~/core/types/odata-types';
import { paginationUtil } from '~/core/util/pagination-util';

export default function Books() {
  const { mutations, queryAs, redirectToDetails, redirectToCreate } = createBook();
  const pagination = createPagination();

  const [filters, setFilters] = createSignal<ODataOptions>({});
  const queryFilters = () =>
    paginationUtil.from(pagination.page(), Defaults.ItemsPerPage, filters());
  // eslint-disable-next-line solid/reactivity
  const query = queryAs.paginated(queryFilters);
  const filterForm = createBookFilterForm();

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

  function handleFilter(data: BookFilter) {
    setFilters({
      filter: { title: [[ODataOperators.Contains, data.title]] },
    });
  }

  return (
    <>
      <PageTitle subtitle="Review or add new books">Books</PageTitle>
      <div class="flex justify-between items-center">
        <Button onClick={() => redirectToCreate()}>Add Book</Button>
        <FormProvider form={filterForm}>
          <BookFilterForm onSubmit={handleFilter} onDebounce={handleFilter} />
        </FormProvider>
      </div>
      <section class="flex flex-col items-center justify-center gap-y-6">
        <BookTable
          items={query.data?.items ?? []}
          viewFn={handleView}
          editFn={handleEdit}
          duplicateFn={handleDuplicate}
          removeFn={handleDelete}
          isLoading={query.isLoading}
        />
        <Pagination total={query.data?.total} pagination={pagination} />
      </section>
    </>
  );
}
