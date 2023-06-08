import { twMerge } from 'tailwind-merge';
import { arrUtil } from './arr-util';

/**
 * @description
 * Merges tailwind classes together, filtering out any falsy values.
 */
function cx(...names: (string | undefined)[]) {
  if (arrUtil.isEmpty(names)) return '';
  return twMerge(names);

  return names.filter(Boolean).join(' ');
}

export const strUtil = {
  cx,
};
