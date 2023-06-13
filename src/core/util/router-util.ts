import { RoutePaths } from '../constants/route-paths';
import { DetailParams } from '../types/router-types';
import { strUtil } from './str-util';

function replaceParams<TParams extends Record<string, string>>(path: string, params: TParams) {
  let replacedPath = path;
  for (const key in params) {
    replacedPath = replacedPath.replace(`:${key}`, params[key]);
  }
  return replacedPath === path ? '' : replacedPath;
}

const replaceDetailParams = (path: RoutePaths, params: DetailParams) => replaceParams(path, params);

function getMode(mode: string, validModes = ['edit', 'view', 'duplicate']) {
  return validModes.includes(mode) ? mode : validModes[0];
}

function buildTitle(mode: string, title: string) {
  return `${strUtil.capitalizeFirst(mode)} ${title}`;
}

export const routerUtil = {
  replaceParams,
  replaceDetailParams,
  getMode,
  buildTitle,
};
