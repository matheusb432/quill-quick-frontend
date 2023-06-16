import { BeforeLeaveEventArgs } from '@solidjs/router';
import { RoutePaths } from '../constants/route-paths';
import { dialogStore } from '../store/dialog-store';
import { DetailParams } from '../types/router-types';
import { strUtil } from './str-util';

function replaceParams<TParams extends Record<string, string | number>>(
  path: string,
  params: TParams,
) {
  let replacedPath = path;
  for (const key in params) {
    replacedPath = replacedPath.replace(`:${key}`, params[key] as string);
  }
  return replacedPath === path ? '' : replacedPath;
}

const replaceDetailParams = (
  path: RoutePaths,
  params: Omit<DetailParams, 'id'> & { id: string | number },
) => replaceParams(path, params);

function getMode(mode: string, validModes = ['edit', 'view', 'duplicate']) {
  return validModes.includes(mode) ? mode : validModes[0];
}

function buildTitle(mode: string, title: string) {
  return `${strUtil.capitalizeFirst(mode)} ${title}`;
}

function unsavedChangesGuard(e: BeforeLeaveEventArgs, dirty: boolean, submitted: boolean) {
  const canLeave = !dirty || submitted;
  if (canLeave || e.defaultPrevented) return;

  e.preventDefault();

  dialogStore.actions.asWarning({
    title: 'Unsaved Changes',
    message: 'Are you sure you want to discard unsaved changes?',
    onConfirm: () => e.retry(true),
  });
}

export const routerUtil = {
  replaceParams,
  replaceDetailParams,
  getMode,
  buildTitle,
  unsavedChangesGuard,
};
