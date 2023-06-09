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

export const strUtil = {
  cx,
};
