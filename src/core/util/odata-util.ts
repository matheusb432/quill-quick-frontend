import { odataQb } from 'odata-qb';
import { Defaults } from '../constants/defaults';

import { PaginationOptions } from '../types/pagination-types';

function paginated(url: string, paginationOpts: PaginationOptions): string {
  const page = paginationOpts.page ?? 1;
  const itemsPerPage = (paginationOpts.itemsPerPage ??= Defaults.ItemsPerPage);

  const skip = (page - 1) * itemsPerPage;
  const top = itemsPerPage;

  return odataQb.query(url, { count: true, skip, top, ...paginationOpts.options });
}

export const odataUtil = {
  paginated,
};
