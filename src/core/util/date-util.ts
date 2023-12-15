import { RangeAsDate, RangeAsText } from '../types/date-types';
import { strUtil } from './str-util';

function toYyyyMmDd(date: Date): string {
  if (!date) return '';

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${strUtil.to00(month)}-${strUtil.to00(day)}`;
}

function rangeToJsonDates(range: string | undefined, format = 'dd/MM/yyyy'): RangeAsText {
  if (!range) return { start: '', end: '' };

  const [start, ...others] = range.split(' ');
  const end = others[others.length - 1];

  if (format === 'dd/MM/yyyy') {
    const [startDay, startMonth, startYear] = start.split('/');
    const [endDay, endMonth, endYear] = end.split('/');
    return {
      start: `${startYear}-${startMonth}-${startDay}`,
      end: `${endYear}-${endMonth}-${endDay}`,
    };
  }

  return { start, end };
}

function rangeToDates(range: string | undefined, format = 'dd/MM/yyyy'): RangeAsDate {
  const { start, end } = rangeToJsonDates(range, format);
  return {
    start: fromDateStr(start),
    end: fromDateStr(end),
  };
}

function jsonDatesToRange(start: string, end: string): string {
  if (!start || !end) return '';

  const [startYear, startMonth, startDay] = start.split('T')[0].split('-');
  const [endYear, endMonth, endDay] = end.split('T')[0].split('-');
  return `${startDay}/${startMonth}/${startYear} to ${endDay}/${endMonth}/${endYear}`;
}

/**
 * @description
 * Converts a date in `yyyy-mm-dd` to a Date object.
 */
function fromDateStr(str: string | null): Date | null {
  if (!str) return null;

  const splitDate = str.split('-').map(Number).filter(Number.isInteger);

  if (splitDate.length !== 3) return null;

  const [year, month, day] = splitDate;

  return new Date(year, month - 1, day);
}

function toDate(value: string | Date): Date | null {
  if (!value) return null;

  return typeof value === 'string' ? dateUtil.fromDateStr(value) : value;
}

export const dateUtil = {
  toYyyyMmDd,
  rangeToJsonDates,
  rangeToDates,
  jsonDatesToRange,
  fromDateStr,
  toDate,
};
