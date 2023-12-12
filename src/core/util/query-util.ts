import { ODataFilterData, ODataOperators } from '../types/odata-types';
import { Nullish } from '../types/utility-types';
import { dateUtil } from './date-util';

function getDateRangeFilter<T extends Date | string>(
  start: T | Nullish,
  end: T | Nullish,
): ODataFilterData {
  if (!start) return undefined;

  if (!end) return dateUtil.toDate(start);

  return [
    [ODataOperators.GreaterThanOrEqualTo, dateUtil.toDate(start), ODataOperators.Or],
    [ODataOperators.LessThanOrEqualTo, dateUtil.toDate(end), ODataOperators.Or],
  ];
}

export const queryUtil = {
  getDateRangeFilter,
};
