import { RangeAsText } from '../types/date-types';
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

export const dateUtil = {
  toYyyyMmDd,
  rangeToJsonDates,
};
