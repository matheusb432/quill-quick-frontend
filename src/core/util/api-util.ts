import { Defaults } from '../constants/defaults';

function createUrl(featureUrl: string): string {
  return `${Defaults.ApiUrl}/${featureUrl}`;
}

export const apiUtil = {
  createUrl,
};
