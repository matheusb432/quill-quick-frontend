import { strUtil } from './str-util';

function toYyyyMmDd(date: Date): string {
  if (!date) return '';

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${strUtil.to00(month)}-${strUtil.to00(day)}`;
}

export const dateUtil = {
  toYyyyMmDd,
};
