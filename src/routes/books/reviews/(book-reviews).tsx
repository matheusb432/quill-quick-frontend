import { createQuery } from '@tanstack/solid-query';
import { ODataOptions } from 'odata-qb';
import { batch, createSignal } from 'solid-js';
import { HIArrowPath } from '~/assets/icons/HIArrowPath';
import { createBookFilterForm } from '~/Book/store/form';
import { BookReviewFilters } from '~/BookReview/components/BookReviewFilters';
import { BookReviewRow, BookReviewTable } from '~/BookReview/components/BookReviewTable';
import { createBookReview } from '~/BookReview/create-book-review';
import { BookReviewFilter } from '~/BookReview/types';
import { IconButton } from '~/components/IconButton';
import { PageTitle } from '~/components/PageTitle';
import { Pagination } from '~/components/Pagination';
import { Defaults } from '~/core/constants/defaults';
import { createPagination } from '~/core/store/create-pagination';
import { dialogStore } from '~/core/store/dialog-store';
import { FormProvider } from '~/core/store/form-context';
import { FormModes } from '~/core/types/form-types';

import { dateUtil } from '~/core/util/date-util';
import { paginationUtil } from '~/core/util/pagination-util';
import { queryUtil } from '~/core/util/query-util';

export default function BookReviews() {
  const { mutations, api, redirectToDetails } = createBookReview();
  const pagination = createPagination();

  const [filters, setFilters] = createSignal<ODataOptions>({});
  const queryFilters = () =>
    paginationUtil.from(pagination.page(), Defaults.ItemsPerPage, filters());
  const query = createQuery({
    queryKey: () => api.keyWithParams(queryFilters()),
    queryFn: () => api.paginated(queryFilters()),
  });
  const filterForm = createBookFilterForm();

  const delMut = mutations.del;

  function handleDelete(book: BookReviewRow) {
    dialogStore.actions.asDanger({
      title: 'Delete Review',
      message: 'Are you sure you want to delete this review?',
      onConfirm: () => {
        delMut.mutate(book.id);
      },
    });
  }

  function handleFilter(data: BookReviewFilter) {
    batch(() => {
      pagination.setPage(1);
      const dates = dateUtil.rangeToJsonDates(data.dateRange);
      const dateRangeFilter = queryUtil.getDateRangeFilter(dates.start, dates.end);
      setFilters({
        filter: { startedAt: dateRangeFilter, endedAt: dateRangeFilter },
      });
    });
  }

  return (
    <>
      <PageTitle subtitle="View or create reviews">Book Reviews</PageTitle>
      <div class="flex items-center justify-end">
        <div class="flex w-max flex-1 items-center justify-end gap-x-6">
          <IconButton
            iconFn={HIArrowPath}
            class="bottom-3"
            fabSize="md"
            onClick={() => query.refetch()}
            isLoading={query.isLoading}
          />
          <FormProvider form={filterForm} isLoading={query.isLoading} disableOnLoading={false}>
            <BookReviewFilters onSubmit={handleFilter} onDebounce={handleFilter} />
          </FormProvider>
        </div>
      </div>
      <section class="flex flex-col items-center justify-center gap-y-6">
        <BookReviewTable
          items={query.data?.items ?? []}
          viewFn={({ id }) => redirectToDetails(id, FormModes.View)}
          editFn={({ id }) => redirectToDetails(id, FormModes.Edit)}
          removeFn={handleDelete}
          isLoading={query.isLoading}
        />
        <Pagination total={query.data?.total} pagination={pagination} />
      </section>
    </>
  );
}
