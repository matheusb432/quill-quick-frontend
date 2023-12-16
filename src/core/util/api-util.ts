import { AxiosResponse } from 'axios';

function createUrl(featureUrl: string): string {
  return `${import.meta.env.VITE_API_URL}/${featureUrl}`;
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
