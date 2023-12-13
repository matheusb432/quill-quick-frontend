import { batch, createSignal } from 'solid-js';
import { BookCardsGrid } from '~/Book/components/BookCardsGrid';
import { BookFilters } from '~/Book/components/BookFilters';
import { BookRow, BookTable } from '~/Book/components/BookTable';
import { createBook } from '~/Book/create-book';
import { createBookFilterForm } from '~/Book/store/form';
import { BookFilter } from '~/Book/types/book';
import { Button } from '~/components/Button';
import { PageTitle } from '~/components/PageTitle';
import { Pagination } from '~/components/Pagination';
import { Defaults } from '~/core/constants/defaults';
import { createPagination } from '~/core/store/create-pagination';
import { dialogStore } from '~/core/store/dialog-store';
import { FormProvider } from '~/core/store/form-context';
import { FormModes } from '~/core/types/form-types';
import { ODataOperators, ODataOptions } from '~/core/types/odata-types';
import { paginationUtil } from '~/core/util/pagination-util';

export default function Books() {
  const { mutations, queryAs, redirectToDetails, redirectToCreate, redirectToCreateReview } =
    createBook();
  const pagination = createPagination();

  const [filters, setFilters] = createSignal<ODataOptions>({});
  const queryFilters = () =>
    paginationUtil.from(pagination.page(), Defaults.ItemsPerPage, filters());
  const query = () => queryAs.paginated(queryFilters);
  const filterForm = createBookFilterForm();

  const delMut = mutations.del;

  function handleDelete(book: BookRow) {
    dialogStore.actions.asDanger({
      title: 'Delete Book',
      message: 'Are you sure you want to delete this book?',
      onConfirm: () => delMut.mutate(book.id),
    });
  }

  function handleFilter(data: BookFilter) {
    batch(() => {
      pagination.setPage(1);
      setFilters({
        filter: { title: [[ODataOperators.Contains, data.title]] },
      });
    });
  }

  return (
    <>
      <PageTitle subtitle="Review or add new books">Books</PageTitle>
      <div class="flex items-center justify-between">
        <Button onClick={() => redirectToCreate()}>Add Book</Button>
        <FormProvider form={filterForm} isLoading={query().isLoading} disableOnLoading={false}>
          <BookFilters onSubmit={handleFilter} onDebounce={handleFilter} />
        </FormProvider>
      </div>
      <section class="flex flex-col items-center justify-center gap-y-6">
        <BookTable
          items={query().data?.items ?? []}
          viewFn={({ id }) => redirectToDetails(id, FormModes.View)}
          editFn={({ id }) => redirectToDetails(id, FormModes.Edit)}
          duplicateFn={({ id }) => redirectToDetails(id, FormModes.Duplicate)}
          reviewFn={({ id }) => redirectToCreateReview(id)}
          removeFn={handleDelete}
          isLoading={query().isLoading}
        />
        <Pagination total={query().data?.total} pagination={pagination} />
      </section>
    </>
  );
}
