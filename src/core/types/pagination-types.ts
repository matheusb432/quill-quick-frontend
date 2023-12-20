import { ODataOptions } from 'odata-qb';

export type PaginationOptions = {
  page?: number;
  itemsPerPage?: number;
  options?: ODataOptions;
};

export type PaginatedResult<T = unknown> = {
  total: number;
  items: T[];
};
