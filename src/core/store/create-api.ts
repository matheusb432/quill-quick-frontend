import axios from 'axios';
import { apiUtil } from '../util/api-util';
import { Defaults } from '../constants/defaults';

const api = axios.create({
  baseURL: Defaults.ApiUrl as string,
});

type ApiMethod = 'get' | 'post' | 'put' | 'delete';

export function createApi() {
  async function send<TResponse = void, TData = void>(
    method: ApiMethod,
    url: string,
    data?: TData,
  ) {
    const headers = {
      'Content-Type': 'application/json',
      // TODO add auth token
      // # NOTE mo
      // Authorization: `Bearer ${}`
    };

    const responseData = apiUtil.responseToData(
      api.request<TResponse>({
        method,
        headers,
        url,
        data,
      }),
    );

    return responseData;
  }

  const omitId = <T>(obj: T): Omit<T, 'id'> => ({ ...obj, id: undefined });
  const withId = <T>(id: number, obj: T): Omit<T, 'id'> & { id: number } => ({ ...obj, id });

  return {
    send,
    omitId,
    withId,
  };
}
