import { arrUtil } from './arr-util';

/**
 * @description
 * Adds class names together, filtering out any falsy values.
 */
function cx(...names: (string | undefined)[]) {
  if (arrUtil.isEmpty(names)) return '';

  return names.filter(Boolean).join(' ');
}

export const strUtil = {
  cx,
};
