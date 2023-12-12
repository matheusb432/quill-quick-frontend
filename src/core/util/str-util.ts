import { twMerge } from 'tailwind-merge';
import { arrUtil } from './arr-util';
import { ClassNameValue } from 'tailwind-merge/dist/lib/tw-join';

/**
 * @description
 * Merges tailwind classes together, filtering out any falsy values.
 */
function cx(...names: ClassNameValue[]) {
  if (arrUtil.isEmpty(names)) return '';

  return twMerge(names);
}

function capitalizeWords(str: string) {
  if (!str) return '';
  return str.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
}

function capitalizeFirst(str: string) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function to00(value: number | string): string {
  if (!value) return '00';
  if (typeof value === 'string') value = parseInt(value, 10);

  return value < 10 ? `0${value}` : `${value}`;
}

function isNumber(str: string) {
  return !isNaN(Number(str));
}

export const strUtil = {
  cx,
  capitalizeFirst,
  capitalizeWords,
  to00,
  isNumber,
};
