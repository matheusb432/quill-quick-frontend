import { AxiosResponse } from 'axios';
import { Defaults } from '../constants/defaults';

function createUrl(featureUrl: string): string {
  return `${Defaults.ApiUrl}/${featureUrl}`;
}

async function responseToData<T>(request: Promise<AxiosResponse<T>>): Promise<T> {
  const response = await request;
  return response.data;
}

export const apiUtil = {
  createUrl,
  responseToData,
};
