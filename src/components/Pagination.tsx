import { For, mergeProps } from 'solid-js';
import { Defaults } from '~/core/constants/defaults';
import { arrUtil } from '~/core/util/arr-util';
import { Button } from './Button';
import { createPagination } from '~/core/store/create-pagination';
import { HIPaperAirplane } from '~/assets/icons/HIPaperAirplane';

type PaginationProps = {
  pagination: ReturnType<typeof createPagination>;
  total?: number;
  pageLimit?: number;
  itemsPerPage?: number;
};

export function Pagination(props: PaginationProps) {
  const merged = mergeProps(
    { total: 1, pageLimit: 10, itemsPerPage: Defaults.ItemsPerPage as number },
    props,
  );

  const maxPages = () => Math.max(Math.ceil((merged.total ?? 1) / merged.itemsPerPage), 1);
  const pageNumbers = () => getPageNumbers(maxPages(), merged?.pageLimit, merged.pagination.page());
  const isFirstPage = () => merged.pagination.page() === 1;
  const isLastPage = () => merged.pagination.page() === maxPages();

  return (
    <div class="join">
      <Button onClick={() => merged.pagination.previous()} disabled={isFirstPage()}>
        <HIPaperAirplane class="transform rotate-180" />
      </Button>
      <For each={pageNumbers()}>
        {(pageNumber, index) => {
          const isFirst = () => index() === 0;
          const isLast = () => index() === pageNumbers().length - 1;
          const isMiddle = () => !isFirst() && !isLast();
          const isCurrent = () => pageNumber === merged.pagination.page();

          return (
            <Button
              class={`join-item ${isFirst() && 'border-r-0'} ${isMiddle() && 'border-x-0'} ${
                isLast() && 'border-l-0'
              } ${isCurrent() && 'bg-primary text-primary-content'}`}
              onClick={() => merged.pagination.setPage(pageNumber)}
            >
              {pageNumber}
            </Button>
          );
        }}
      </For>
      <Button onClick={() => merged.pagination.next()} disabled={isLastPage()}>
        <HIPaperAirplane />
      </Button>
    </div>
  );
}

function getFirstPageNumber(maxPages: number, pageLimit: number, currentPage: number) {
  const excessPages = maxPages - pageLimit;
  return excessPages > 0 ? Math.min(excessPages, currentPage) : 1;
}

function getPageNumbers(maxPages: number, pageLimit: number, currentPage: number) {
  const totalPages = Math.min(pageLimit, maxPages);
  const firstPageNum = getFirstPageNumber(maxPages, pageLimit, currentPage);
  return arrUtil.arrayFrom(totalPages, firstPageNum);
}
