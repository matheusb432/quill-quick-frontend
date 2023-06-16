import { Defaults } from '../constants/defaults';
import {
  ODataFilter,
  ODataFilterValue,
  ODataOperators,
  ODataOptions,
  ODataOrderBy,
  ODataParams,
} from '../types/odata-types';
import { PaginationOptions } from '../types/pagination-types';
import { dateUtil } from './date-util';
import { routerUtil } from './router-util';

function query(url: string, options?: ODataOptions): string {
  return builder.url(url, options);
}

function paginated(url: string, { page, itemsPerPage, options }: PaginationOptions): string {
  page ??= 1;
  itemsPerPage ??= Defaults.ItemsPerPage;

  const skip = (page - 1) * itemsPerPage;
  const top = itemsPerPage;

  return query(url, { count: true, skip, top, ...options });
}

function paginatedParams({ page, itemsPerPage, options }: PaginationOptions): string {
  page ??= 1;
  itemsPerPage ??= Defaults.ItemsPerPage;

  const skip = (page - 1) * itemsPerPage;
  const top = itemsPerPage;

  return params({ count: true, skip, top, ...options });
}

function params(options: ODataOptions): string {
  if (!options) return '';

  const queryString = builder.query(options);

  return queryString;
}

function paramsObj(options: ODataOptions): ODataParams {
  return routerUtil.toSearchParams(params(options));
}

export const odataUtil = {
  query,
  paginated,
  paginatedParams,
  params,
  paramsObj,
};

const builder = {
  url(baseUrl: string, options?: ODataOptions): string {
    let queryUrl = baseUrl;

    if (options) {
      const queryString = builder.query(options);
      queryUrl += `?${queryString}`;
    }

    return queryUrl;
  },
  query(options: ODataOptions): string {
    let queryString = '';

    if (options.select) queryString += `$select=${options.select.join(',')}&`;
    if (options.expand) queryString += `$expand=${options.expand.join(',')}&`;
    queryString += builder.getFilter(options.filter);
    if (options.top != null) queryString += `$top=${options.top}&`;
    if (options.skip != null) queryString += `$skip=${options.skip}&`;
    queryString += builder.getOrderBy(options.orderBy);
    if (options.count) queryString += `$count=${options.count}&`;

    // return queryString.substring(0, -1);
    return queryString.slice(0, -1);
  },
  filter(filter: ODataFilter): string {
    let filterString = '';

    for (const [key, value] of Object.entries(filter)) {
      if (value === undefined) continue;

      if (value instanceof Array) {
        value.forEach(([operator, filterValue]) => {
          const normalized = builder.normalize(filterValue);

          if (normalized === undefined) return;
          if (operator === 'contains') {
            filterString += `contains(${key}, ${normalized}) and `;
            return;
          }

          filterString += `(${key} ${operator} ${normalized}) and `;
        });
      } else {
        const normalized = builder.normalize(value);
        filterString += normalized !== undefined ? `(${key} eq ${normalized}) and ` : '';
      }
    }

    return filterString.slice(0, -5);
  },
  normalize(value: ODataFilterValue): string | undefined {
    if (value == null) return undefined;

    if (value instanceof Date) return dateUtil.toYyyyMmDd(value);

    return typeof value === 'string' ? `'${value}'` : `${value}`;
  },
  getFilter(filter: ODataFilter | undefined): string {
    if (!filter) return '';

    const filterString = builder.filter(filter);

    return filterString ? `$filter=${filterString}&` : '';
  },
  getOrderBy(orderBy: ODataOrderBy | ODataOrderBy[] | undefined): string {
    const orderBys: string[] = [];
    builder.pushOrderBy(orderBys, orderBy);

    const orderByString = orderBys.join(',');

    return orderByString ? `$orderby=${orderByString}&` : '';
  },
  pushOrderBy(orderByRes: string[], orderBy: ODataOrderBy | ODataOrderBy[] | undefined): void {
    if (!orderBy) return;

    if (orderBy[1] === 'asc' || orderBy[1] === 'desc') {
      builder.pushOrderBy(orderByRes, [orderBy as ODataOrderBy]);
      return;
    }
    orderBy.forEach((x) => {
      const [prop, direction] = x;

      orderByRes.push(`${Array.isArray(prop) ? prop.join('/') : prop} ${direction}`);
    });
  },
};
