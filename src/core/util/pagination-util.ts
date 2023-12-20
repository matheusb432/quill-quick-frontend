import { ODataOptions } from 'odata-qb';
import { Defaults } from '../constants/defaults';
import { PaginationOptions } from '../types/pagination-types';

const defaultPage = 1;
const defaultItemsPerPage = Defaults.ItemsPerPage;

function createPaginationOptions(
  page?: number,
  itemsPerPage?: number,
  options?: ODataOptions,
): PaginationOptions {
  return {
    page,
    itemsPerPage,
    options,
  };
}

function defaultOptions(): PaginationOptions {
  return createPaginationOptions(defaultPage, defaultItemsPerPage);
}

function first(itemsPerPage?: number, options?: ODataOptions): PaginationOptions {
  return createPaginationOptions(1, itemsPerPage ?? defaultItemsPerPage, options);
}

function from(page: number, itemsPerPage: number, options?: ODataOptions): PaginationOptions {
  return createPaginationOptions(page, itemsPerPage, options);
}

function fromOptions(options: ODataOptions): PaginationOptions {
  return {
    ...defaultOptions(),
    options,
  };
}

export const paginationUtil = {
  default: defaultOptions,
  first,
  from,
  fromOptions,
};
