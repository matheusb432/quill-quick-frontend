import { strUtil } from '~/core/util/str-util';

function getCx(className: string | undefined) {
  return strUtil.cx('w-6 h-6', className);
}

export const iconUtil = {
  getCx,
};
