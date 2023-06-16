import { AxiosResponse } from 'axios';
import { Defaults } from '../constants/defaults';

function createUrl(featureUrl: string): string {
  return `${Defaults.ApiUrl}/${featureUrl}`;
}

async function responseToData<T>(request: Promise<AxiosResponse<T>>): Promise<T> {
  const response = await request;
  return response.data;
}

function buildNotifications(name: string) {
  return {
    success: {
      create: `${name} created successfully!`,
      update: `${name} updated successfully!`,
      delete: `${name} deleted successfully!`,
      duplicate: `${name} duplicated successfully!`,
    },
  };
}

export const apiUtil = {
  createUrl,
  responseToData,
  buildNotifications,
};
