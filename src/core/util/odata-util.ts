import { Defaults } from '../constants/defaults';
import {
  Guid,
  ODataFilter,
  ODataFilterValue,
  ODataOperators,
  ODataOptions,
  ODataOrderBy,
  ODataParams,
} from '../types/odata-types';
import { PaginationOptions } from '../types/pagination-types';
import { dateUtil } from './date-util';

/**
 * @description
 * Creates a OData URL based on `url` & `options`.
 *
 * @example
 * odataUtil.build('https://website.com', {
 *       filter: { name: 'John', age: [[ODataOperators.LessThanOrEqualTo, 25]] },
 *       orderBy: ['name', 'asc'],
 *     })
 * // Result: "https://website.com?$filter=(name eq 'John') and (age le 25)&$orderby=name asc"
 */
function query(url: string, options?: ODataOptions): string {
  return builder.url(url, options);
}

function paginated(url: string, options: PaginationOptions): string {
  return builder.mergeUrlToRawParams(url, paginatedParams(options));
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

export const odataUtil = {
  query,
  paginated,
  params,
};

const orSeparator = ` ${ODataOperators.Or} `;
const andSeparator = ` ${ODataOperators.And} `;

const builder = {
  url(baseUrl: string, options?: ODataOptions): string {
    let queryUrl = baseUrl;

    if (options) {
      const queryString = builder.query(options);
      queryUrl += `?${queryString}`;
    }

    return queryUrl;
  },
  mergeUrlToRawParams(url: string, params: string): string {
    if (!params) return url;

    return `${url}?${params}`;
  },
  query(options: ODataOptions): string {
    let queryStr = '';

    if (options.select) queryStr += `$select=${options.select.join(',')}&`;
    if (options.expand) queryStr += `$expand=${options.expand.join(',')}&`;
    queryStr += builder.getFilter(options.filter);
    if (options.top != null) queryStr += `$top=${options.top}&`;
    if (options.skip != null) queryStr += `$skip=${options.skip}&`;
    queryStr += builder.getOrderBy(options.orderBy);
    if (options.count) queryStr += `$count=${options.count}&`;

    return queryStr.slice(0, -1);
  },
  filter(filter: ODataFilter): string {
    let filterStr = '';
    let lastJoinOperator: ODataOperators | undefined;

    for (const key in filter) {
      const value = filter[key];
      if (value === undefined) continue;

      if (!Array.isArray(value)) {
        filterStr += builder.createFilter(key, ODataOperators.EqualTo, value);
        continue;
      }

      for (const [operator, filterValue, joinOperator] of value) {
        let filters: string | undefined;
        if (Array.isArray(filterValue)) {
          filters = builder.createOrFilters(key, operator, filterValue, joinOperator);
        } else {
          filters = builder.createFilter(key, operator, filterValue, joinOperator);
        }

        if (!filters) continue;
        filterStr += filters;
        lastJoinOperator = joinOperator;
      }
    }
    const separator = lastJoinOperator === ODataOperators.Or ? orSeparator : andSeparator;

    return builder.sliceSeparator(filterStr, separator);
  },
  createOrFilters(
    key: string,
    operator: ODataOperators,
    values: ODataFilterValue[],
    joinOperator: ODataOperators.And | ODataOperators.Or = ODataOperators.And,
  ): string {
    const separator = joinOperator === ODataOperators.Or ? orSeparator : andSeparator;

    if (operator === ODataOperators.In) {
      const inFilterValue = `(${values.map((x) => builder.normalize(x)).join(',')})`;

      return `(${key} in ${inFilterValue})${separator}`;
    }
    let orFilterStr = '';

    for (const value of values) {
      orFilterStr += builder.createFilter(key, operator, value, ODataOperators.Or);
    }

    if (!orFilterStr) return '';

    return `(${builder.sliceSeparator(orFilterStr, orSeparator)})${separator}`;
  },
  sliceSeparator(str: string, separator: string): string {
    return str.slice(0, -separator.length);
  },
  createFilter(
    key: string,
    operator: ODataOperators,
    value: ODataFilterValue,
    joinOperator: ODataOperators.And | ODataOperators.Or = ODataOperators.And,
  ): string {
    const separator = joinOperator === ODataOperators.Or ? orSeparator : andSeparator;
    if (operator === ODataOperators.AsRaw) return `(${key}${value})${separator}`;

    const normalized = builder.normalize(value);

    if (normalized === undefined) return '';
    if (operator === ODataOperators.Contains) {
      return `contains(${key}, ${normalized})${separator}`;
    }

    return `(${key} ${operator} ${normalized})${separator}`;
  },
  normalize(value: ODataFilterValue): string | undefined {
    if (value == null || Number.isNaN(value)) return undefined;

    if (typeof value === 'string') return `'${value}'`;
    if (value instanceof Date) return dateUtil.toYyyyMmDd(value);
    if (value instanceof Guid) return value.inner;

    return value.toString();
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
      orderByRes.push(builder.formatNestableItem(orderBy as ODataOrderBy));
      return;
    }

    for (const item of orderBy as ODataOrderBy[]) {
      orderByRes.push(builder.formatNestableItem(item));
    }
  },
  formatNestableItem(item: ODataOrderBy): string {
    return `${Array.isArray(item[0]) ? item[0].join('/') : item[0]} ${item[1]}`;
  },
};
