import { AxiosResponse } from 'axios';
import { Defaults } from '../constants/defaults';

function createUrl(featureUrl: string): string {
  return `${Defaults.ApiUrl}/${featureUrl}`;
}

async function reqToData<T>(request: Promise<AxiosResponse<T>>): Promise<T> {
  const response = await request;
  return response.data;
}

function resToData<T>(response: AxiosResponse<T>): T {
  return response.data;
}

export const apiUtil = {
  createUrl,
  resToData,
  reqToData,
};
