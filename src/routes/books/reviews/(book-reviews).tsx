import { batch, createSignal } from 'solid-js';
import { BookFilters } from '~/Book/components/BookFilters';
import { BookRow, BookTable } from '~/Book/components/BookTable';
import { createBook } from '~/Book/create-book';
import { createBookFilterForm } from '~/Book/store/form';
import { BookFilter } from '~/Book/types/book';
import { BookReviewFilters } from '~/BookReview/components/BookReviewFilters';
import { BookReviewRow, BookReviewTable } from '~/BookReview/components/BookReviewTable';
import { createBookReview } from '~/BookReview/create-book-review';
import { BookReviewFilter } from '~/BookReview/types';
import { Button } from '~/components/Button';
import { PageTitle } from '~/components/PageTitle';
import { Pagination } from '~/components/Pagination';
import { Defaults } from '~/core/constants/defaults';
import { createPagination } from '~/core/store/create-pagination';
import { dialogStore } from '~/core/store/dialog-store';
import { FormProvider } from '~/core/store/form-context';
import { ODataOperators, ODataOptions } from '~/core/types/odata-types';
import { paginationUtil } from '~/core/util/pagination-util';

export default function BookReviews() {
  const { mutations, queryAs, redirectToDetails, redirectToCreate } = createBookReview();
  const pagination = createPagination();

  const [filters, setFilters] = createSignal<ODataOptions>({});
  const queryFilters = () =>
    paginationUtil.from(pagination.page(), Defaults.ItemsPerPage, filters());
  // eslint-disable-next-line solid/reactivity
  const query = queryAs.paginated(queryFilters);
  const filterForm = createBookFilterForm();

  const delMut = mutations.del;

  function handleDelete(book: BookReviewRow) {
    dialogStore.actions.asDanger({
      title: 'Delete Book',
      message: 'Are you sure you want to delete this book?',
      onConfirm: () => delMut.mutate(book.id),
    });
  }

  function handleFilter(data: BookReviewFilter) {
    batch(() => {
      pagination.setPage(1);
      setFilters({
        // TODO configure data range filter via odata
        filter: { title: [[ODataOperators.Contains, data.dateRange]] },
      });
    });
  }

  return (
    <>
      <PageTitle subtitle="View or create reviews">Book Reviews</PageTitle>
      <div class="flex items-center justify-between">
        <Button onClick={() => redirectToCreate()}>Add Review</Button>
        <FormProvider form={filterForm} isLoading={query.isLoading} disableOnLoading={false}>
          <BookReviewFilters onSubmit={handleFilter} onDebounce={handleFilter} />
        </FormProvider>
      </div>
      <section class="flex flex-col items-center justify-center gap-y-6">
        <BookReviewTable
          items={query.data?.items ?? []}
          viewFn={({ id }) => redirectToDetails(id, 'view')}
          editFn={({ id }) => redirectToDetails(id, 'edit')}
          removeFn={handleDelete}
          isLoading={query.isLoading}
        />
        <Pagination total={query.data?.total} pagination={pagination} />
      </section>
    </>
  );
}
