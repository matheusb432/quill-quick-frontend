import axios from 'axios';
import { apiUtil } from '../util/api-util';
import { Defaults } from '../constants/defaults';

const api = axios.create({
  baseURL: Defaults.ApiUrl as string,
});

type ApiMethod = 'get' | 'post' | 'put' | 'delete';

export function createApi(featureUrl: string) {
  async function send<TResponse = void, TData = void>(
    method: ApiMethod,
    url: string,
    data?: TData,
  ) {
    const headers = {
      'Content-Type': 'application/json',
      // TODO add auth token
      // Authorization: `Bearer ${}`
    };

    const requestUrl = `${featureUrl}${url}`;

    return apiUtil.responseToData(
      api.request<TResponse>({
        method,
        headers,
        url: requestUrl,
        data,
      }),
    );
  }

  const omitId = <T>(obj: T): Omit<T, 'id'> => ({ ...obj, id: undefined });
  const withId = <T>(id: number, obj: T): Omit<T, 'id'> & { id: number } => ({ ...obj, id });

  function keyFromUrl(url: string | undefined): string[] {
    return url?.split('/')?.filter((x) => !!x) || [];
  }

  function appendParamsToKey(key: string[], params: Record<string, unknown>) {
    return [...key, params].filter((x) => !!x);
  }

  const baseKey = keyFromUrl(featureUrl);

  return {
    send,
    omitId,
    withId,
    keys: {
      base: baseKey,
      add: [...baseKey, 'add'],
      duplicate: [...baseKey, 'duplicate'],
      update: [...baseKey, 'update'],
      del: [...baseKey, 'del'],
    },
    appendParamsToKey,
  };
}
