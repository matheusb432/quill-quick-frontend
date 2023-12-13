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

function replaceDetailParams(
  path: RoutePaths,
  params: Omit<DetailParams, 'id'> & { id: string | number },
) {
  return replaceParams(path, params);
}

function replaceCreateReviewParams(path: RoutePaths, params: { id: string | number }) {
  return replaceParams(path, params);
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

function toSearchParams(query: string): Record<string, string> {
  return searchParamsToRecord(new URLSearchParams(query));
}

function searchParamsToRecord(searchParams: URLSearchParams): Record<string, string> {
  const obj: Record<string, string> = {};

  for (const [key, value] of searchParams) {
    obj[key] = value;
  }

  return obj;
}

export const routerUtil = {
  replaceParams,
  replaceDetailParams,
  buildTitle,
  replaceCreateReviewParams,
  unsavedChangesGuard,
  toSearchParams,
  searchParamsToRecord,
};
