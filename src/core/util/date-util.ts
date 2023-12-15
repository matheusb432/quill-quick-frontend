import { RangeAsDate, RangeAsText } from '../types/date-types';
import { strUtil } from './str-util';

function toYyyyMmDd(date: Date): string {
  if (!date) return '';

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${strUtil.to00(month)}-${strUtil.to00(day)}`;
}

function toDdMmYyyy(dateYyyyMmDd: string): string {
  if (!dateYyyyMmDd) return '';

  const date = dateYyyyMmDd.split('T')[0];

  if (!date) return '';

  const splitDate = date.split('-');

  if (splitDate.length !== 3) return '';

  const [year, month, day] = splitDate;
  return `${day}/${month}/${year}`;
}

function rangeToJsonDates(range: string | undefined, format = 'dd/MM/yyyy'): RangeAsText {
  if (!range) return { start: '', end: '' };

  const [start, ...others] = range.split(' ');
  const end = others[others.length - 1];

  if (format === 'dd/MM/yyyy') {
    if (!start || !end) return { start: '', end: '' };

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

  const startDate = start.split('T')[0];
  const endDate = end.split('T')[0];

  if (!startDate || !endDate) return '';

  const splitStart = startDate.split('-');
  const splitEnd = endDate.split('-');

  if (splitStart.length !== 3 || splitEnd.length !== 3) return '';

  const [startYear, startMonth, startDay] = splitStart;
  const [endYear, endMonth, endDay] = splitEnd;
  return `${startDay}/${startMonth}/${startYear} to ${endDay}/${endMonth}/${endYear}`;
}

/**
 * @description
 * Converts a date in `yyyy-mm-dd` to a Date object.
 */
function fromDateStr(str: string | null): Date | null {
  if (!str) return null;

  const date = str.split('T')[0];

  if (!date) return null;

  const splitDate = date.split('-').map(Number).filter(Number.isInteger);

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
  toDdMmYyyy,
  rangeToJsonDates,
  rangeToDates,
  jsonDatesToRange,
  fromDateStr,
  toDate,
};
