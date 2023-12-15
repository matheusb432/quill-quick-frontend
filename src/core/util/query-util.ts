import { ODataFilterData, ODataOperators } from '../types/odata-types';
import { Nullish } from '../types/utility-types';
import { dateUtil } from './date-util';

/**
 * @description
 * Creates a OData filter for a date range, with inclusive start and end dates and an OR operator.
 */
function getDateRangeFilter<T extends Date | string>(
  start: T | Nullish,
  end: T | Nullish,
): ODataFilterData {
  if (!start) return undefined;

  if (!end) return dateUtil.toDate(start);

  return [
    [
      ODataOperators.BetweenInclusive,
      [dateUtil.toDate(start), dateUtil.toDate(end)],
      ODataOperators.Or,
    ],
  ];
}

export const queryUtil = {
  getDateRangeFilter,
};
